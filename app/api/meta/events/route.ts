import { NextResponse } from "next/server";
import {
  isMetaConfigured,
  sendMetaCapiEvents,
  type MetaCapiEvent,
  type MetaStandardEvent,
} from "@/lib/meta/capi";

const ALLOWED: MetaStandardEvent[] = ["ViewContent", "Contact", "Search", "Lead"];

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

export async function POST(request: Request) {
  if (!isMetaConfigured()) {
    return NextResponse.json({ skipped: true, reason: "not_configured" });
  }

  try {
    const body = await request.json();
    const raw = Array.isArray(body?.events) ? body.events : [];
    const ip = clientIp(request);

    // Require Meta click id (fbc) or fbclid in the source URL — blocks organic traffic
    const events: MetaCapiEvent[] = raw
      .filter((e: Record<string, unknown>) => {
        if (
          !e ||
          typeof e.event_name !== "string" ||
          !ALLOWED.includes(e.event_name as MetaStandardEvent) ||
          typeof e.event_id !== "string" ||
          typeof e.event_source_url !== "string" ||
          typeof e.client_user_agent !== "string"
        ) {
          return false;
        }
        const url = String(e.event_source_url);
        const hasFbclid = url.includes("fbclid=");
        const hasFbc = typeof e.fbc === "string" && e.fbc.length > 0;
        return hasFbclid || hasFbc;
      })
      .map((e: Record<string, unknown>) => ({
        event_name: e.event_name as MetaStandardEvent,
        event_id: e.event_id as string,
        event_source_url: e.event_source_url as string,
        client_user_agent: e.client_user_agent as string,
        email: typeof e.email === "string" ? e.email : undefined,
        fbp: typeof e.fbp === "string" ? e.fbp : undefined,
        fbc: typeof e.fbc === "string" ? e.fbc : undefined,
        search_string: typeof e.search_string === "string" ? e.search_string : undefined,
        client_ip_address: ip,
      }));

    if (!events.length) {
      return NextResponse.json({ skipped: true, reason: "not_meta_traffic" });
    }

    const result = await sendMetaCapiEvents(events);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Meta events route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
