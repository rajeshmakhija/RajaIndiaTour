/*
THESIS: A field notebook for planning India, with useful tools embedded in travel stories rather than a dashboard of generic cards.
OWN-WORLD: Raja's white, deep blue and burgundy palette; large destination photography; Playfair chapter titles; quiet paper-like reading fields.
STORY: A French traveller discovers seven questions, enters one through a vivid scene, uses the tool, and leaves with a clearer journey.
FIRST VIEWPORT: A Rajasthan photograph owns the right half; the left introduces the guide collection and leads directly to the region quiz.
FORM: Existing-world extension, "carnet de route interactif", code-led; seed key: local-extension-no-roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
*/

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Button, JsonLd } from "@/components/ui";
import { travelGuides } from "@/lib/data/guides";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Guides et outils pour préparer un voyage en Inde",
  description:
    "Cartes, calendriers, checklist, quiz et conseils racontés pour préparer un voyage en Inde à votre rythme.",
  path: "/guides",
});

export default function GuidesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guides et outils pour préparer un voyage en Inde",
    url: `${siteConfig.url}/guides`,
    inLanguage: "fr-FR",
    hasPart: travelGuides.map((guide) => ({
      "@type": "Article",
      headline: guide.title,
      url: `${siteConfig.url}/guides/${guide.slug}`,
    })),
  };

  return (
    <div className="bg-white">
      <span
        className="hidden"
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html:
            "<!-- THESIS: A field notebook for planning India, with useful tools embedded in travel stories rather than a generic dashboard. OWN-WORLD: Raja's white, deep blue and burgundy palette, destination photography, Playfair chapter titles and quiet reading fields. STORY: A French traveller enters through a vivid scene, answers a planning question and leaves with a clearer journey. FIRST VIEWPORT: Editorial introduction on the left, Rajasthan photography on the right and the region quiz as the primary action. FORM: Existing-world extension, code-led; seed key: local-extension-no-roll. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance. -->",
        }}
      />
      <JsonLd data={collectionSchema} />

      <section className="border-b border-cream-dark">
        <div className="mx-auto grid min-h-[620px] max-w-[1440px] lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex items-center px-5 py-16 md:px-12 lg:px-20">
            <div className="max-w-xl">
              <Compass className="text-brand-red" size={34} strokeWidth={1.7} />
              <h1 className="mt-7 text-balance font-display text-5xl font-bold leading-[1.05] text-ink md:text-6xl">
                L&apos;Inde commence bien avant le départ
              </h1>
              <p className="mt-7 max-w-[62ch] text-lg leading-8 text-muted">
                Elle commence sur une carte, dans une date entourée au calendrier, dans une valise encore vide. Ces guides transforment vos premières questions en un voyage qui prend doucement forme.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/guides/quelle-region-inde" variant="primary">
                  Trouver ma région <ArrowRight size={17} />
                </Button>
                <Button href="#tous-les-guides" variant="outline">Explorer les guides</Button>
              </div>
            </div>
          </div>
          <div className="relative min-h-[430px] overflow-hidden lg:min-h-full">
            <Image src="/images/destinations/rajasthan.jpg" alt="Palais et paysage du Rajasthan" fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 58vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/55 via-transparent to-transparent" />
            <p className="absolute bottom-7 left-7 max-w-sm font-display text-2xl font-bold text-white md:bottom-10 md:left-10">
              « Un itinéraire devient personnel au moment où l&apos;on comprend pourquoi chaque étape est là. »
            </p>
          </div>
        </div>
      </section>

      <section id="tous-les-guides" className="scroll-mt-24 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Sept portes d&apos;entrée, un voyage à votre image</h2>
            <p className="mt-5 text-lg leading-8 text-muted">Commencez par la question qui vous occupe aujourd&apos;hui. Les autres trouveront naturellement leur place au fil de la préparation.</p>
          </div>

          <div className="mt-14 divide-y divide-cream-dark border-y border-cream-dark">
            {travelGuides.map((guide) => (
              <article key={guide.slug} className="grid gap-7 py-9 md:grid-cols-[220px_1fr_auto] md:items-center">
                <Link href={`/guides/${guide.slug}`} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={guide.heroImage} alt={guide.heroAlt} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="220px" />
                </Link>
                <div>
                  <h2 className="font-display text-3xl font-bold text-ink">
                    <Link href={`/guides/${guide.slug}`} className="hover:text-brand-blue">{guide.shortTitle}</Link>
                  </h2>
                  <p className="mt-3 max-w-2xl leading-7 text-muted">{guide.description}</p>
                </div>
                <Link href={`/guides/${guide.slug}`} className="inline-flex items-center gap-2 font-semibold text-brand-blue hover:text-brand-red">
                  Ouvrir <ArrowRight size={17} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-blue-dark px-4 py-16 text-white md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Vous avez les idées. Raja relie les étapes.</h2>
            <p className="mt-4 text-lg leading-8 text-white/75">Partagez vos dates, votre rythme et ce qui vous fait rêver. Vous recevrez une première proposition adaptée, sans itinéraire copié-collé.</p>
          </div>
          <Button href="/creer-mon-itineraire" variant="primary">Créer mon itinéraire <ArrowRight size={17} /></Button>
        </div>
      </section>
    </div>
  );
}
