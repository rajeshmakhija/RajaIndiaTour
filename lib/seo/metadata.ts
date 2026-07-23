import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — Circuits sur mesure en Inde pour voyageurs français`;
  const desc =
    description ??
    "Voyagez en Inde sur mesure avec Raja, guide francophone agréé depuis 25 ans. Circuits privés, sans intermédiaire, devis personnalisé gratuit.";

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: { "fr-FR": `${siteConfig.url}${path}` },
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      locale: "fr_FR",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}
