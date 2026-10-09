import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { isMetaConfigured, sendMetaCapiEvents, type MetaCapiEvent } from "@/lib/meta/capi";

const MAX_BODY_BYTES = 4_096;

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

async function readLimitedJson(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) throw new Error("body_too_large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_body");
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => undefined);
      throw new Error("body_too_large");
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("invalid_body");
  }
}

function sameSiteSource(value: unknown, request: Request): URL | null {
  if (typeof value !== "string" || value.length > 2_048) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const requestOrigin = new URL(request.url).origin;
    const siteOrigin = new URL(siteConfig.url).origin;
    return url.origin === requestOrigin || url.origin === siteOrigin ? url : null;
  } catch {
    return null;
  }
}

function parseEvent(raw: unknown, request: Request): MetaCapiEvent | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const event = raw as Record<string, unknown>;
  if (event.event_name !== "ViewContent" && event.event_name !== "Search") return null;
  if (typeof event.event_id !== "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(event.event_id)) return null;
  const source = sameSiteSource(event.event_source_url, request);
  if (!source) return null;
  const fbc = typeof event.fbc === "string" && /^fb\.1\.\d{10,13}\.[A-Za-z0-9_-]{8,512}$/.test(event.fbc)
    ? event.fbc : undefined;
  const fbclid = source.searchParams.get("fbclid");
  if (!fbc && (!fbclid || fbclid.length < 8 || fbclid.length > 512)) return null;
  if (event.search_string != null && (typeof event.search_string !== "string" || event.search_string.length > 300)) return null;

  return {
    event_name: event.event_name,
    event_id: event.event_id,
    event_source_url: source.href,
    client_user_agent: (request.headers.get("user-agent") ?? "").slice(0, 512),
    fbc,
    fbp: typeof event.fbp === "string" && event.fbp.length <= 200 ? event.fbp : undefined,
    search_string: typeof event.search_string === "string" ? event.search_string : undefined,
    client_ip_address: clientIp(request),
  };
}

export async function POST(request: Request) {
  if (!isMetaConfigured()) return NextResponse.json({ skipped: true, reason: "not_configured" });

  const allowedOrigins = [new URL(request.url).origin, new URL(siteConfig.url).origin];
  const origin = request.headers.get("origin");
  if ((origin && !allowedOrigins.includes(origin)) || request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "Origine invalide" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await readLimitedJson(request);
  } catch (error) {
    return NextResponse.json(
      { error: "Demande invalide" },
      { status: error instanceof Error && error.message === "body_too_large" ? 413 : 400 },
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Demande invalide" }, { status: 400 });
  }
  const rawEvents = (body as Record<string, unknown>).events;
  if (!Array.isArray(rawEvents) || rawEvents.length !== 1) {
    return NextResponse.json({ error: "Événement invalide" }, { status: 400 });
  }
  const event = parseEvent(rawEvents[0], request);
  if (!event) return NextResponse.json({ skipped: true, reason: "invalid_event" });

  const result = await sendMetaCapiEvents([event]);
  if (result?.error) return NextResponse.json({ error: "Meta indisponible" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
