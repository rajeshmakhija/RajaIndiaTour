import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Route,
  Clock,
  Users,
  Utensils,
  Heart,
  Tag,
  MapPin,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui";
import { ItineraryOverview } from "@/components/tours/ItineraryOverview";
import { getAllTourSlugs, getTourBySlug } from "@/lib/data/tours";
import { getDestinationForTour } from "@/lib/data/destinations";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};
  return createMetadata({
    title: tour.title,
    description: tour.subtitle,
    path: `/circuits/${tour.slug}`,
  });
}

export default async function TourPage({ params }: Props) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const destination = getDestinationForTour(tour.slug);

  const factRows = [
    { icon: Route, label: "Type de circuit", value: tour.facts.tourType },
    { icon: Clock, label: "Durée", value: tour.facts.duration },
    { icon: Users, label: "Formule", value: tour.facts.group },
    { icon: Utensils, label: "Repas inclus", value: tour.facts.meals },
    { icon: Heart, label: "Idéal pour", value: tour.facts.bestFor },
    { icon: Tag, label: "Tarif", value: tour.facts.price },
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Bonjour Raja, je souhaite en savoir plus sur le circuit « ${tour.title} ».`
  )}`;
  const [heroLarge, heroSmall1, heroSmall2] = tour.gallery;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="border-b border-cream-dark px-4 pt-10 pb-12 md:pt-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              {tour.breadcrumb.map((b, i) => (
                <span key={b} className="flex items-center gap-2">
                  {i > 0 && <span className="text-cream-dark">•</span>}
                  {b}
                </span>
              ))}
            </nav>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] text-ink md:text-5xl">
              {tour.title}
            </h1>
            <p className="mt-5 text-lg font-medium leading-relaxed text-ink/80">{tour.subtitle}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={`/contact?circuit=${tour.slug}`} variant="primary">
                Demander un devis
                <ArrowRight size={16} />
              </Button>
              <Button href="#itineraire" variant="outline">
                Voir l&apos;itinéraire
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[280px] md:h-[380px]">
            <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-sm">
              <Image src={heroLarge} alt={tour.title} fill className="object-cover" sizes="(max-width:768px) 66vw, 400px" priority />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <Image src={heroSmall1} alt={tour.title} fill className="object-cover" sizes="200px" />
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              <Image src={heroSmall2} alt={tour.title} fill className="object-cover" sizes="200px" />
            </div>
          </div>
        </div>

        {/* Facts bar */}
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="grid gap-x-8 gap-y-5 rounded-2xl border border-cream-dark bg-cream-dark/30 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {factRows.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <f.icon size={22} className="mt-0.5 shrink-0 text-brand-blue" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{f.label}</p>
                  <p className="text-sm font-semibold text-ink">{f.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="border-b border-cream-dark px-4 py-12 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted md:text-xl md:leading-9">{tour.intro}</p>
        </div>
      </section>

      {/* Itinerary overview carousel */}
      <section className="border-b border-cream-dark bg-[#f7f9fc] px-4 py-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
            Aperçu de l&apos;itinéraire
          </h2>
          <ItineraryOverview days={tour.days} />
        </div>
      </section>

      {/* Highlights of trip */}
      <section className="border-b border-cream-dark px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-red">
              Temps forts du voyage
            </p>
            <h2 className="font-display text-2xl font-bold text-ink md:text-4xl">
              Les moments que vous garderez en mémoire
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tour.highlights.map((h) => (
              <article
                key={h.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-cream-dark bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={h.image} alt={h.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 280px" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-brand-red/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-red">
                    <Check size={11} /> Inclus
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{h.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Day-by-day with sticky map */}
      <section id="itineraire" className="scroll-mt-24 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-4xl">
            Itinéraire jour par jour
          </h2>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Timeline */}
            <ol className="lg:col-span-2">
              {tour.days.map((d) => (
                <li
                  key={d.day}
                  id={`jour-${d.day}`}
                  className="relative scroll-mt-24 border-l-2 border-dashed border-cream-dark pb-12 pl-7 last:pb-0"
                >
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-brand-red shadow" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Jour {d.day}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
                    {d.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted md:text-lg md:leading-8">{d.description}</p>

                  <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl shadow-sm">
                    <Image src={d.image} alt={d.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 680px" />
                  </div>
                </li>
              ))}
            </ol>

            {/* Sticky aside: map + personalise */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-5">
                <div className="overflow-hidden rounded-2xl border border-cream-dark shadow-sm">
                  <div className="relative aspect-[4/3] w-full bg-[#f4f1ea]">
                    <Image src={tour.mapImage} alt={`Carte du circuit ${tour.title}`} fill className="object-cover" sizes="380px" />
                  </div>
                  <div className="border-t border-cream-dark p-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                      <MapPin size={13} className="text-brand-blue" /> Itinéraire du circuit
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {tour.cities.map((c) => (
                        <span key={c} className="rounded-full border border-cream-dark bg-white px-2 py-0.5 text-[11px] font-medium text-muted">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-cream-dark bg-white p-5 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink">Personnaliser votre voyage</h3>
                  <p className="mt-1.5 text-sm text-muted">
                    Raja adapte cet itinéraire à vos dates, votre rythme et votre budget. Réponse sous 24h.
                  </p>
                  <Button href={`/contact?circuit=${tour.slug}`} variant="primary" className="mt-4 w-full">
                    Demander un devis gratuit
                  </Button>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-full border-2 border-brand-blue px-6 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white">
                    <Phone size={15} /> WhatsApp — Raja
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-brand-blue">
                    <Mail size={15} /> {siteConfig.email}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-cream-dark px-4 py-14 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-brand-blue px-6 py-12 text-center text-white md:px-12">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Envie de ce voyage ?</h2>
          <p className="mt-4 text-white/85">
            Demandez votre devis personnalisé gratuit — Raja prépare chaque circuit lui-même, sans intermédiaire.
          </p>
          <Button href={`/contact?circuit=${tour.slug}`} variant="primary" className="mt-8">
            Obtenir mon devis gratuit
            <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {destination && (
        <div className="border-t border-cream-dark px-4 py-6">
          <div className="mx-auto max-w-6xl">
            <Link
              href={`/destinations/${destination.slug}`}
              className="text-sm font-semibold text-brand-blue hover:underline"
            >
              ← Retour à la destination {destination.name}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
