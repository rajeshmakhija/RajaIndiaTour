import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

const FAQ_RESPONSES: Record<string, string> = {
  visa: "Les ressortissants français peuvent obtenir un e-Visa Inde en ligne sur le site officiel indianvisaonline.gov.in. Comptez 3 à 5 jours ouvrés. Raja vous guide dans les démarches après réservation.",
  prix: "Chaque circuit est sur mesure : le tarif dépend de la durée, de la saison, du niveau de confort et de vos envies. Demandez un devis personnalisé gratuit à Raja, qui vous répond sous 24h avec un tarif exact.",
  rajasthan: "La meilleure période pour le Rajasthan est d'octobre à mars. Évitez la mousson (juillet-août). Un circuit classique de 10-12 jours couvre Delhi, Agra, Jaipur, Jodhpur et Udaipur.",
  kerala: "Le Kerala se visite toute l'année. Les backwaters, Munnar et les plages du sud sont nos incontournables. Comptez 10 jours pour un beau circuit.",
  ladakh: "Le Ladakh est accessible de juin à septembre. Acclimatation nécessaire à Leh (3 500 m). Circuit type : 10 jours, Leh, Nubra Valley, Pangong.",
  quand: "Octobre à mars pour le Nord et le Rajasthan. Avril-juin pour le Ladakh. Le Kerala toute l'année. Évitez la mousson (juin-septembre) dans le Nord.",
  budget: "Trois niveaux au choix : économique, confort et luxe. Chaque formule inclut l'hébergement, le transport privé et un guide francophone. Raja adapte le circuit à votre budget — demandez un devis gratuit pour un tarif exact.",
};

function getReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("visa")) return FAQ_RESPONSES.visa;
  if (lower.includes("prix") || lower.includes("coût") || lower.includes("cout") || lower.includes("budget") || lower.includes("combien")) return FAQ_RESPONSES.prix;
  if (lower.includes("rajasthan")) return FAQ_RESPONSES.rajasthan;
  if (lower.includes("kerala")) return FAQ_RESPONSES.kerala;
  if (lower.includes("ladakh")) return FAQ_RESPONSES.ladakh;
  if (lower.includes("quand") || lower.includes("période") || lower.includes("periode") || lower.includes("meilleur")) return FAQ_RESPONSES.quand;

  if (lower.includes("devis") || lower.includes("réserver") || lower.includes("reserver") || lower.includes("contact")) {
    return `Pour un devis personnalisé gratuit, remplissez le formulaire sur ${siteConfig.url}/contact ou contactez Raja directement sur WhatsApp. Il vous répond sous 24h avec un itinéraire adapté à vos envies.`;
  }

  return `Merci pour votre question ! Pour une réponse précise et un devis adapté, je vous recommande de contacter Raja directement. Demandez un devis gratuit via le formulaire. Raja parle français et prépare chaque voyage personnellement.`;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    // If OpenAI key is set, could enhance here — MVP uses rule-based responses
    const reply = getReply(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
