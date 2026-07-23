import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Sun,
  Check,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { SectionHeading, Button } from "@/components/ui";
import { PlacesCarousel } from "@/components/destinations/PlacesCarousel";
import { getTourBySlug } from "@/lib/data/tours";
import {
  getAllDestinationSlugs,
  getDestinationBySlug,
  type DestinationPage,
} from "@/lib/data/destinations";
import { blogPosts } from "@/lib/data/blog";
import { destinationPages } from "@/lib/data/destinations";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  return createMetadata({
    title: `${dest.name} — circuits sur mesure`,
    description: `${dest.tagline}. Découvrez ${dest.name} avec Raja : itinéraires personnalisés, guide francophone et photos de voyage.`,
    path: `/destinations/${dest.slug}`,
  });
}

function relatedBlogs(dest: DestinationPage) {
  const keys = dest.blogKeywords.map((k) => k.toLowerCase());
  return blogPosts.filter((post) => {
    const hay = `${post.title} ${post.excerpt} ${post.content.join(" ")}`.toLowerCase();
    return keys.some((k) => hay.includes(k));
  });
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const blogs = relatedBlogs(dest);
  const others = destinationPages.filter((d) => d.slug !== dest.slug).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[min(72vh,560px)] w-full overflow-hidden">
        <Image
          src={dest.heroImage}
          alt={dest.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">
              Destination
            </p>
            <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
              {dest.name}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-white/90 md:text-xl">{dest.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`/contact?destination=${dest.slug}`} variant="primary">
                Demander un devis
                <ArrowRight size={16} />
              </Button>
              <Button href="#itineraires" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-brand-blue">
                Voir les itinéraires
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + highlights */}
      <section className="border-b border-cream-dark px-4 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              À propos
            </p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
              Voyager à {dest.name}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {dest.intro.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream-dark bg-cream-dark/40 px-4 py-2 text-sm text-ink">
              <Sun size={16} className="text-brand-red" />
              Meilleure saison : <strong>{dest.bestSeason}</strong>
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-cream-dark bg-white p-6 shadow-sm">
              <h3 className="font-display text-xl font-bold text-ink">Points forts</h3>
              <ul className="mt-4 space-y-3">
                {dest.highlights.map((h) => (
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

      {/* Places — horizontal scrollable carousel of most visited spots */}
      <section className="border-b border-cream-dark px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="À découvrir"
            title={`Les lieux incontournables de ${dest.name}`}
            subtitle="Les sites les plus visités — faites défiler pour explorer ce que vous vivrez avec Raja."
          />
          <PlacesCarousel places={dest.places} />
        </div>
      </section>

      {/* Itineraries */}
      <section id="itineraires" className="scroll-mt-28 border-b border-cream-dark bg-white px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Itinéraires"
            title={`Circuits ${dest.name}`}
            subtitle="Plusieurs durées et styles — tous personnalisables avec Raja."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dest.itineraries.map((it) => {
              const tour = getTourBySlug(it.slug);
              const tourHref = tour ? `/circuits/${it.slug}` : undefined;
              return (
                <article
                  key={it.slug}
                  className="flex flex-col overflow-hidden rounded-2xl border border-cream-dark bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link href={tourHref ?? `/contact?destination=${dest.slug}&circuit=${it.slug}`} className="group relative block aspect-[16/10]">
                    <Image src={it.image} alt={it.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="400px" />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} /> {it.days} jours
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> {dest.name}
                      </span>
                    </div>
                    {tourHref ? (
                      <Link href={tourHref} className="mt-2">
                        <h3 className="font-display text-lg font-bold text-ink hover:text-brand-blue">{it.title}</h3>
                      </Link>
                    ) : (
                      <h3 className="mt-2 font-display text-lg font-bold text-ink">{it.title}</h3>
                    )}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{it.summary}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {it.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-full bg-brand-blue/5 px-2.5 py-0.5 text-[11px] font-medium text-brand-blue"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Button
                      href={tourHref ?? `/contact?destination=${dest.slug}&circuit=${it.slug}`}
                      variant="secondary"
                      className="mt-4 !py-2 !px-4 text-sm"
                    >
                      {tourHref ? "Voir l'itinéraire jour par jour" : "Demander ce circuit"}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery — lustrous photos */}
      <section className="border-b border-cream-dark bg-[#f7f9fc] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Galerie"
            title={`Ambiances de ${dest.name}`}
            subtitle="Des images pour rêver votre prochain circuit avec Raja."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dest.gallery.map((shot, i) => (
              <div
                key={shot.src + i}
                className={`relative overflow-hidden rounded-2xl shadow-md ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[420px]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  loading="lazy"
                  quality={70}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes={i === 0 ? "(max-width:768px) 100vw, 50vw" : "25vw"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed map image */}
      <section className="border-b border-cream-dark px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Carte"
            title={`Où se trouve ${dest.name} ?`}
            subtitle={dest.mapCaption}
          />
          <div className="overflow-hidden rounded-2xl border border-cream-dark bg-white shadow-sm">
            <div className="relative aspect-[16/10] w-full bg-[#f4f1ea]">
              <Image
                src={dest.mapImage}
                alt={`Carte détaillée de ${dest.name}`}
                fill
                loading="lazy"
                quality={65}
                className="object-cover object-center"
                sizes="(max-width:768px) 100vw, 1152px"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream-dark px-4 py-3">
              <p className="text-sm text-muted">
                <MapPin size={14} className="mr-1 inline text-brand-blue" />
                Carte détaillée — villes et routes de {dest.name}
              </p>
              <a
                href={`https://www.openstreetmap.org/?mlat=${dest.map.lat}&mlon=${dest.map.lng}#map=8/${dest.map.lat}/${dest.map.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-brand-blue hover:underline"
              >
                Explorer en ligne →
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {dest.cities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-cream-dark bg-white px-3 py-1.5 text-xs font-medium text-ink"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related blogs */}
      <section className="border-b border-cream-dark bg-[#f7f9fc] px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Blog"
            title={`Articles sur ${dest.name}`}
            subtitle="Conseils et inspirations pour préparer votre voyage."
          />
          {blogs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl border border-cream-dark bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="400px"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                      {post.category} · {post.readTime}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold text-ink group-hover:text-brand-blue">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-cream-dark bg-white p-8 text-center">
              <p className="text-muted">
                Nos articles généraux sur le voyage en Inde peuvent aussi vous aider.
              </p>
              <Button href="/blog" variant="outline" className="mt-4">
                Voir le blog
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-cream-dark px-4 py-14 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-brand-blue px-6 py-12 text-center text-white md:px-12">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Créez votre circuit {dest.name}
          </h2>
          <p className="mt-4 text-white/85">
            Raja vous répond sous 24h avec un itinéraire et un budget adaptés à vos dates.
          </p>
          <Button href={`/contact?destination=${dest.slug}`} variant="primary" className="mt-8">
            Obtenir mon devis gratuit
            <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      {/* Other destinations */}
      <section className="px-4 py-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 font-display text-2xl font-bold text-ink">Autres destinations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={d.heroImage}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <span className="absolute bottom-3 left-3 font-display text-lg font-bold text-white">
                  {d.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
