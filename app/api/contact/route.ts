import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { sendMetaCapiEvents } from "@/lib/meta/capi";

function clientIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}

/** Mail domain must not include www. */
function mailDomain(): string {
  return siteConfig.domain.replace(/^www\./, "");
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.firstName) {
      return NextResponse.json({ error: "Email et prénom requis" }, { status: 400 });
    }

    const payload = {
      to: siteConfig.email,
      from: data.email,
      subject: `[${mailDomain()}] Nouvelle demande de devis — ${data.firstName}`,
      body: JSON.stringify(data, null, 2),
      receivedAt: new Date().toISOString(),
    };

    console.log("Nouvelle demande de contact:", payload);

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY manquant — email non envoyé");
      return NextResponse.json(
        { error: "Service email non configuré" },
        { status: 500 },
      );
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Raja India Tour <noreply@${mailDomain()}>`,
        to: siteConfig.email,
        subject: payload.subject,
        text: [
          `Nouvelle demande de devis`,
          ``,
          `Prénom : ${data.firstName ?? ""}`,
          `Email : ${data.email ?? ""}`,
          `Ville : ${data.city ?? ""}`,
          `Pays : ${data.country ?? ""}`,
          `Destination : ${data.destination ?? data.regions ?? ""}`,
          `Centres d'intérêt : ${data.interests ?? ""}`,
          `Régions : ${data.regions ?? ""}`,
          `Hébergement : ${data.lodging ?? ""}`,
          `Budget : ${data.budget ?? ""} ${data.budgetRange ? `(${data.budgetRange})` : ""}`,
          `Date : ${data.travelDate ?? ""}`,
          `Durée : ${data.duration ?? ""}`,
          `Voyageurs : ${data.travelers ?? ""}`,
          `Tranche d'âge : ${data.ageRange ?? ""}`,
          `Comment connu : ${data.heardFrom ?? ""}`,
          `Source : ${data.source ?? "formulaire"}`,
          ``,
          `Message :`,
          `${data.message ?? ""}`,
          ``,
          `Détails complets :`,
          JSON.stringify(data, null, 2),
        ].join("\n"),
        reply_to: data.email,
      }),
    });

    const resendBody = await resendRes.json().catch(() => ({}));
    if (!resendRes.ok) {
      console.error("Resend error:", resendRes.status, resendBody);
      return NextResponse.json(
        { error: "Échec d'envoi email", details: resendBody },
        { status: 502 },
      );
    }

    console.log("Email envoyé via Resend:", resendBody);

    // Meta Conversions API: Lead + Contact (after successful form submit)
    const meta = data.meta as
      | {
          marketingConsent?: boolean;
          fromMeta?: boolean;
          eventSourceUrl?: string;
          clientUserAgent?: string;
          fbp?: string;
          fbc?: string;
          leadEventId?: string;
          contactEventId?: string;
        }
      | undefined;

    // Only Meta ad traffic (fbclid / _fbc) + cookie consent — not organic visits
    const hasMetaClickId =
      Boolean(meta?.fbc) ||
      Boolean(meta?.eventSourceUrl && meta.eventSourceUrl.includes("fbclid="));

    if (
      meta?.fromMeta &&
      hasMetaClickId &&
      meta.marketingConsent &&
      meta.eventSourceUrl &&
      meta.clientUserAgent
    ) {
      const ip = clientIp(request);
      const base = {
        event_source_url: meta.eventSourceUrl,
        client_user_agent: meta.clientUserAgent,
        email: String(data.email),
        fbp: meta.fbp,
        fbc: meta.fbc,
        client_ip_address: ip,
      };
      void sendMetaCapiEvents([
        {
          ...base,
          event_name: "Lead",
          event_id: meta.leadEventId || crypto.randomUUID(),
        },
        {
          ...base,
          event_name: "Contact",
          event_id: meta.contactEventId || crypto.randomUUID(),
        },
      ]).catch((err) => console.error("Meta CAPI after contact failed:", err));
    }

    return NextResponse.json({ success: true, id: resendBody.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
