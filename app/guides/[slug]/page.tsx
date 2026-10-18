import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GuideInteractive } from "@/components/guides/GuideInteractive";
import { Button, JsonLd } from "@/components/ui";
import { getAllGuideSlugs, getGuideBySlug, travelGuides } from "@/lib/data/guides";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return createMetadata({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}` });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const relatedGuides = travelGuides.filter((item) => item.slug !== guide.slug).slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: `${siteConfig.url}${guide.heroImage}`,
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: siteConfig.founder.name },
    publisher: { "@type": "TravelAgency", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/guides/${guide.slug}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
      { "@type": "ListItem", position: 3, name: guide.shortTitle, item: `${siteConfig.url}/guides/${guide.slug}` },
    ],
  };

  return (
    <article className="bg-white">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="relative min-h-[650px] overflow-hidden bg-brand-blue-dark">
        <Image src={guide.heroImage} alt={guide.heroAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/72 to-brand-blue-dark/20" />
        <div className="relative mx-auto flex min-h-[650px] max-w-6xl flex-col justify-between px-4 py-9 text-white md:py-14">
          <Link href="/guides" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"><ArrowLeft size={16} /> Tous les guides</Link>
          <div className="max-w-3xl pb-8">
            <h1 className="text-balance font-display text-5xl font-bold leading-[1.04] md:text-7xl">{guide.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">{guide.description}</p>
          </div>
        </div>
      </header>

      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6">
          {guide.intro.map((paragraph, index) => <p key={paragraph.slice(0, 40)} className={index === 0 ? "font-display text-2xl font-bold leading-10 text-ink md:text-3xl" : "text-lg leading-8 text-muted"}>{paragraph}</p>)}
        </div>
      </section>

      <section className="px-4 pb-14 md:pb-20">
        <div className="mx-auto max-w-6xl"><GuideInteractive slug={guide.slug} /></div>
      </section>

      {guide.sections.map((section, index) => (
        <section key={section.title} className={`border-t border-cream-dark px-4 py-14 md:py-20 ${index % 2 === 1 ? "bg-[#f7f9fc]" : "bg-white"}`}>
          <div className={`mx-auto grid max-w-6xl gap-10 ${section.image ? "items-center lg:grid-cols-2" : "max-w-3xl"}`}>
            <div className={section.image && index % 2 === 1 ? "lg:order-2" : ""}>
              <h2 className="text-balance font-display text-3xl font-bold text-ink md:text-4xl">{section.title}</h2>
              <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
                {section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 42)}>{paragraph}</p>)}
              </div>
            </div>
            {section.image && (
              <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-brand-blue/10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <Image src={section.image} alt={section.imageAlt ?? "Voyage en Inde"} fill className="object-cover" sizes="(max-width:1024px) 100vw, 550px" />
              </div>
            )}
          </div>
        </section>
      ))}

      <section className="border-t border-cream-dark px-4 py-14 md:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-brand-blue-dark px-6 py-11 text-center text-white md:px-12 md:py-14">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Le guide vous a donné une direction ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">Raja peut maintenant transformer cette première idée en un itinéraire réaliste, adapté à vos dates et à votre rythme.</p>
          <Button href={guide.relatedHref} variant="primary" className="mt-7">{guide.relatedLabel} <ArrowRight size={17} /></Button>
        </div>
      </section>

      <section className="border-t border-cream-dark bg-[#f7f9fc] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-bold text-ink">Continuer à préparer le voyage</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {relatedGuides.map((item) => (
              <Link key={item.slug} href={`/guides/${item.slug}`} className="group bg-white">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl"><Image src={item.heroImage} alt={item.heroAlt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="380px" /></div>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink group-hover:text-brand-blue">{item.shortTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
