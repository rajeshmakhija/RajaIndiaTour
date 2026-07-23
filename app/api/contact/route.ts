import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.firstName) {
      return NextResponse.json({ error: "Email et prénom requis" }, { status: 400 });
    }

    const payload = {
      to: siteConfig.email,
      from: data.email,
      subject: `[${siteConfig.domain}] Nouvelle demande de devis — ${data.firstName}`,
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
        from: `Raja India Tour <noreply@${siteConfig.domain}>`,
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
    return NextResponse.json({ success: true, id: resendBody.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
