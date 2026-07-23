import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { SectionHeading, Button } from "@/components/ui";
import { CircuitCard } from "@/components/circuits/CircuitCard";
import { circuits } from "@/lib/data/content";
import { circuitRegions } from "@/lib/data/navigation";

export const metadata = createMetadata({
  title: "Nos circuits",
  description:
    "Circuits sur mesure en Inde, Ladakh, Rajasthan, Madhya Pradesh, Népal et Bhoutan. Départ garanti avec guide francophone Raja.",
  path: "/circuits",
});

export default function CircuitsPage() {
  return (
    <div className="border-b border-cream-dark bg-white px-4 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Voyages sur mesure"
          title="Nos circuits"
          subtitle="Itinéraires personnalisés pour les voyageurs français — départ garanti, modifiables selon vos envies."
        />

        <nav className="mb-10 flex flex-wrap justify-center gap-2">
          {circuitRegions.map((region) => (
            <Link
              key={region.slug}
              href={`#${region.slug}`}
              className="rounded-full border border-cream-dark px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              {region.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-14">
          {circuitRegions.map((region) => {
            const regionCircuits = circuits.filter((c) => c.region === region.slug);

            return (
              <section key={region.slug} id={region.slug} className="scroll-mt-28">
                <div className="mb-6 border-b border-cream-dark pb-4">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                        {region.label}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm text-muted md:text-base">
                        {region.description}
                      </p>
                    </div>
                    <Link
                      href={`/destinations/${region.slug}`}
                      className="text-sm font-semibold text-brand-blue hover:underline"
                    >
                      Page destination →
                    </Link>
                  </div>
                </div>

                {regionCircuits.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {regionCircuits.map((circuit) => (
                      <CircuitCard key={circuit.slug} circuit={circuit} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-cream-dark bg-white p-6 text-center shadow-sm">
                    <p className="text-muted">
                      Circuit sur mesure disponible pour {region.label}.
                    </p>
                    <Button
                      href={`/contact?destination=${region.slug}`}
                      variant="primary"
                      className="mt-4"
                    >
                      Demander un devis
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
