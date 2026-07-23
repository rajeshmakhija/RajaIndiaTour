import { siteConfig } from "@/lib/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    description:
      "Agence de voyage en Inde spécialisée pour les clients français. Circuits sur mesure avec guide francophone.",
    areaServed: { "@type": "Country", name: "France" },
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: "Guide francophone agréé",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.trust.rating,
      reviewCount: siteConfig.trust.reviews,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "fr-FR",
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
