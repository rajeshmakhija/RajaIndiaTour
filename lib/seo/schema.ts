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
    email: siteConfig.email,
    telephone: siteConfig.phoneTel,
    knowsLanguage: ["fr", "en"],
    ...(siteConfig.profiles.length ? { sameAs: siteConfig.profiles } : {}),
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: "Guide francophone agréé",
    },
    // No aggregateRating: Google treats self-declared ratings without a verifiable
    // review source as spammy markup. Add it back once it can cite real reviews.
  };
}

/** BreadcrumbList from [name, path] pairs, starting after "Accueil". */
export function breadcrumbSchema(items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [["Accueil", ""] as const, ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${siteConfig.url}${path}`,
    })),
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
