import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { sendMetaCapiEvents } from "@/lib/meta/capi";

const MAX_BODY_BYTES = 16_384;
const FIELD_LIMITS = {
  city: 120,
  country: 120,
  destination: 200,
  regions: 500,
  interests: 500,
  lodging: 500,
  budget: 100,
  budgetRange: 100,
  travelDate: 120,
  duration: 100,
  travelers: 100,
  ageRange: 100,
  heardFrom: 200,
  source: 100,
  message: 4_000,
} as const;

type ContactData = { firstName: string; email: string } & Record<keyof typeof FIELD_LIMITS, string>;

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

function mailDomain(): string {
  return siteConfig.domain.replace(/^www\./, "");
}

async function readLimitedJson(request: Request): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length"));
  if (declaredLength > MAX_BODY_BYTES) throw new Error("body_too_large");

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

function parseContactData(raw: unknown): ContactData | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const input = raw as Record<string, unknown>;
  if (typeof input.firstName !== "string" || typeof input.email !== "string") return null;
  const firstName = input.firstName.trim();
  const email = input.email.trim();
  if (!firstName || firstName.length > 100 || /[\x00-\x1f\x7f]/.test(firstName)) return null;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  const data = { firstName, email } as ContactData;
  for (const [field, maxLength] of Object.entries(FIELD_LIMITS) as [keyof typeof FIELD_LIMITS, number][]) {
    const value = input[field];
    if (value != null && typeof value !== "string") return null;
    const text = (value ?? "") as string;
    if (text.length > maxLength) return null;
    data[field] = text.trim();
  }
  return data;
}

function validMetaContext(raw: unknown, request: Request) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const meta = raw as Record<string, unknown>;
  if (meta.marketingConsent !== true || meta.fromMeta !== true) return null;
  if (typeof meta.eventSourceUrl !== "string" || typeof meta.fbc !== "string") return null;
  if (!/^fb\.1\.\d{10,13}\.[A-Za-z0-9_-]{8,512}$/.test(meta.fbc)) return null;
  let source: URL;
  try {
    source = new URL(meta.eventSourceUrl);
  } catch {
    return null;
  }
  const requestOrigin = new URL(request.url).origin;
  if (source.origin !== requestOrigin && source.origin !== new URL(siteConfig.url).origin) return null;

  const eventId = (value: unknown) =>
    typeof value === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(value) ? value : crypto.randomUUID();
  return {
    event_source_url: source.href,
    client_user_agent: (request.headers.get("user-agent") ?? "").slice(0, 512),
    fbc: meta.fbc,
    fbp: typeof meta.fbp === "string" && meta.fbp.length <= 200 ? meta.fbp : undefined,
    leadEventId: eventId(meta.leadEventId),
    contactEventId: eventId(meta.contactEventId),
  };
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [new URL(request.url).origin, new URL(siteConfig.url).origin];
  if ((origin && !allowedOrigins.includes(origin)) || request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json({ error: "Origine invalide" }, { status: 403 });
  }

  let raw: unknown;
  try {
    raw = await readLimitedJson(request);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error && error.message === "body_too_large" ? "Demande trop volumineuse" : "Demande invalide" },
      { status: error instanceof Error && error.message === "body_too_large" ? 413 : 400 },
    );
  }

  const data = parseContactData(raw);
  if (!data) return NextResponse.json({ error: "Coordonnées invalides" }, { status: 400 });
  if (!process.env.RESEND_API_KEY) {
    console.error("Contact email service is not configured");
    return NextResponse.json({ error: "Service email indisponible" }, { status: 503 });
  }

  const subject = `[${mailDomain()}] Nouvelle demande de devis — ${data.firstName}`;
  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Raja India Tour <noreply@${mailDomain()}>`,
        to: siteConfig.email,
        subject,
        text: [
          "Nouvelle demande de devis",
          "",
          `Prénom : ${data.firstName}`,
          `Email : ${data.email}`,
          `Ville : ${data.city}`,
          `Pays : ${data.country}`,
          `Destination : ${data.destination || data.regions}`,
          `Centres d'intérêt : ${data.interests}`,
          `Régions : ${data.regions}`,
          `Hébergement : ${data.lodging}`,
          `Budget : ${data.budget} ${data.budgetRange ? `(${data.budgetRange})` : ""}`,
          `Date : ${data.travelDate}`,
          `Durée : ${data.duration}`,
          `Voyageurs : ${data.travelers}`,
          `Tranche d'âge : ${data.ageRange}`,
          `Comment connu : ${data.heardFrom}`,
          `Source : ${data.source || "formulaire"}`,
          "",
          "Message :",
          data.message,
        ].join("\n"),
        reply_to: data.email,
      }),
    });

    if (!resendRes.ok) {
      console.error("Contact email delivery failed with status", resendRes.status);
      return NextResponse.json({ error: "Échec d'envoi email" }, { status: 502 });
    }
    const resendBody = (await resendRes.json().catch(() => ({}))) as { id?: unknown };

    const meta = validMetaContext((raw as Record<string, unknown>).meta, request);
    if (meta) {
      const base = {
        event_source_url: meta.event_source_url,
        client_user_agent: meta.client_user_agent,
        email: data.email,
        fbp: meta.fbp,
        fbc: meta.fbc,
        client_ip_address: clientIp(request),
      };
      try {
        const result = await sendMetaCapiEvents([
          { ...base, event_name: "Lead", event_id: meta.leadEventId },
          { ...base, event_name: "Contact", event_id: meta.contactEventId },
        ]);
        if (result?.error) console.error("Contact Meta CAPI delivery failed");
      } catch {
        console.error("Contact Meta CAPI request failed");
      }
    }

    return NextResponse.json({ success: true, id: typeof resendBody.id === "string" ? resendBody.id : undefined });
  } catch {
    console.error("Contact email request failed");
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
