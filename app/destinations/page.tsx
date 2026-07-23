import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { SectionHeading } from "@/components/ui";
import { destinationPages } from "@/lib/data/destinations";

export const metadata = createMetadata({
  title: "Destinations",
  description:
    "Rajasthan, Kerala, Ladakh, Varanasi, Népal, Bhoutan… Explorez toutes nos destinations avec circuits sur mesure et guide francophone.",
  path: "/destinations",
});

export default function DestinationsIndexPage() {
  return (
    <div className="border-b border-cream-dark bg-white px-4 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Destinations"
          title="Où souhaitez-vous voyager ?"
          subtitle="Chaque page présente la région, une carte, plusieurs itinéraires et des articles pour préparer votre circuit."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationPages.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md"
            >
              <Image
                src={dest.heroImage}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h2 className="font-display text-2xl font-bold">{dest.name}</h2>
                <p className="mt-1 text-sm text-white/80">{dest.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Découvrir <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
