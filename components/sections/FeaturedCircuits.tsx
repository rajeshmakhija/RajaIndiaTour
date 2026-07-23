import { circuits } from "@/lib/data/content";
import { SectionHeading } from "@/components/ui";
import { CircuitCard } from "@/components/circuits/CircuitCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedCircuits() {
  return (
    <section id="circuits" className="border-b border-cream-dark bg-white py-12 px-4 md:py-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Circuits vedettes"
          title="Nos voyages les plus demandés"
          subtitle="Itinéraires pensés pour les voyageurs français — départ garanti, modifiables selon vos envies."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {circuits.slice(0, 4).map((circuit) => (
            <CircuitCard key={circuit.slug} circuit={circuit} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/circuits"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
          >
            Voir tous nos circuits
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
