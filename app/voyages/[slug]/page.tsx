import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { Button, JsonLd, SectionHeading } from "@/components/ui";
import { FORMALITIES, PRICE_FAQ, PracticalFaq, TIME_DIFFERENCE, VISA_FAQ } from "@/components/sections/PracticalFaq";
import { getLandingBySlug, landings } from "@/lib/data/landings";
import { getTourBySlug, type Tour } from "@/lib/data/tours";
import { getDestinationBySlug, type DestinationPage } from "@/lib/data/destinations";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return landings.map((landing) => ({ slug: landing.slug }));
}

export async function generateMetadata({ params }: Props) {
  const landing = getLandingBySlug((await params).slug);
  if (!landing) return {};
  return createMetadata({ title: landing.seoTitle, description: landing.description, path: `/voyages/${landing.slug}` });
}

export default async function LandingPage({ params }: Props) {
  const landing = getLandingBySlug((await params).slug);
  if (!landing) notFound();

  const tours = landing.tourSlugs.map(getTourBySlug).filter((t): t is Tour => Boolean(t));
  const destinations = landing.destinationSlugs
    .map(getDestinationBySlug)
    .filter((d): d is DestinationPage => Boolean(d));
  const contactHref = `/contact?style=${landing.ctaStyle}`;

  return (
    <div className="bg-white">
      <JsonLd data={breadcrumbSchema([[landing.title, `/voyages/${landing.slug}`]])} />

      {/* Hero */}
      <section className="relative h-[min(72vh,560px)] w-full overflow-hidden">
        <Image src={landing.heroImage} alt={landing.title} fill priority fetchPriority="high" className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">{landing.eyebrow}</p>
            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">{landing.title}</h1>
            <p className="mt-3 max-w-xl text-lg text-white/90 md:text-xl">{landing.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={contactHref} variant="primary">
                Demander un devis gratuit
                <ArrowRight size={16} />
              </Button>
              <Button href="#circuits" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-brand-blue">
                Voir les circuits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + highlights */}
      <section className="border-b border-cream-dark px-4 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          <div className="space-y-4 text-base leading-relaxed text-muted md:text-lg lg:col-span-3">
            {landing.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-cream-dark bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold text-ink">L&apos;essentiel</h2>
              <ul className="mt-4 space-y-3">
                {landing.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-ink">
                    <Check size={18} className="mt-0.5 shrink-0 text-brand-blue" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Raja */}
      <section className="border-b border-cream-dark bg-[#f7f9fc] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Pourquoi Raja" title="Un voyage organisé par un guide local" />
          <div className={`grid gap-5 sm:grid-cols-2 ${landing.reasons.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {landing.reasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl border border-cream-dark bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-ink">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended circuits */}
      <section id="circuits" className="scroll-mt-28 border-b border-cream-dark px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Circuits conseillés"
            title="Des itinéraires pour commencer"
            subtitle="Chaque circuit est un point de départ : Raja l'adapte à vos dates, à votre rythme et à vos envies."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {tours.map((tour) => (
              <Link
                key={tour.slug}
                href={`/circuits/${tour.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-cream-dark bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={tour.gallery[0]}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex items-center gap-1 text-xs text-muted">
                    <Calendar size={12} /> {tour.facts.duration}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-brand-blue">
                    {tour.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-blue">
                    Voir le circuit <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="border-b border-cream-dark px-4 py-12 md:py-14">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Les destinations idéales</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="rounded-full border border-cream-dark bg-white px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                {dest.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PracticalFaq
        practical={[
          ["Meilleure période", landing.bestSeason],
          ["Durée conseillée", landing.duration],
          ["Décalage horaire", TIME_DIFFERENCE],
          ["Formalités", FORMALITIES],
        ]}
        faq={[...landing.faq, PRICE_FAQ, VISA_FAQ]}
      />

      {/* CTA */}
      <section className="px-4 py-14 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-brand-blue px-6 py-12 text-center text-white md:px-12">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Parlons de votre voyage</h2>
          <p className="mt-4 text-white/85">
            Décrivez vos envies : Raja vous propose un itinéraire et un devis détaillé, gratuitement et sans engagement.
          </p>
          <Button href={contactHref} variant="secondary" className="mt-6">
            Demander mon devis gratuit
            <ArrowRight size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
