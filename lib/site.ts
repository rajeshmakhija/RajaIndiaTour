export const siteConfig = {
  name: "Raja India Tour",
  domain: "rajaindiatour.fr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rajaindiatour.fr",
  locale: "fr-FR",
  email: process.env.CONTACT_EMAIL ?? "rajeshmakhija07@gmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "0091-9868607853",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "+919868607853",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919868607853",
  founder: {
    name: "Rajesh (Raja)",
    title: "Fondateur & guide francophone",
    experience: "25 ans",
    description:
      "Guide agréé par le gouvernement indien et le ministère du tourisme. Je organise des voyages sur mesure, sans intermédiaire, pour les voyageurs français.",
  },
  trust: {
    rating: 4.8,
    reviews: 120,
    travelers: 500,
  },
} as const;

export type TravelStyle = "economique" | "confort" | "luxe";

export type DestinationSlug =
  | "rajasthan"
  | "kerala"
  | "ladakh"
  | "goa"
  | "triangle-dor"
  | "inde-complete";
