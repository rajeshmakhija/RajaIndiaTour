import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data/content";
import { SectionHeading } from "@/components/ui";

export function DestinationGrid() {
  return (
    <section id="destinations" className="border-b border-cream-dark bg-white py-12 px-4 md:py-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Destinations"
          title="Explorez l'Inde authentique sur mesure"
          subtitle="Des circuits sur mesure dans les régions les plus fascinantes du sous-continent indien."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, i) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              prefetch={i < 3}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                loading={i < 3 ? "eager" : "lazy"}
                quality={72}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-display text-xl font-bold">{dest.name}</h3>
                <p className="mt-1 text-sm text-cream/80">{dest.tagline}</p>
                <p className="mt-2 text-sm font-semibold text-brand-red">
                  {dest.days} jours
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Découvrir <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
