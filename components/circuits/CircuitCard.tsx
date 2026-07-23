import Image from "next/image";
import { Calendar, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui";

export interface Circuit {
  slug: string;
  title: string;
  destination: string;
  region: string;
  days: number;
  priceFrom: number;
  image: string;
  summary: string;
}

export function CircuitCard({ circuit }: { circuit: Circuit }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-cream-dark bg-white shadow-sm sm:flex-row">
      <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0">
        <Image
          src={circuit.image}
          alt={circuit.title}
          fill
          className="object-cover"
          sizes="300px"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white shadow-sm">
          <ShieldCheck size={12} />
          Départ garanti
        </span>
      </div>
      <div className="flex flex-col justify-between p-5 md:p-6">
        <div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {circuit.destination}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {circuit.days} jours
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl font-bold text-ink">{circuit.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{circuit.summary}</p>
        </div>
        <Button
          href={`/contact?circuit=${circuit.slug}`}
          variant="secondary"
          className="mt-4 self-start !py-2 !px-4 text-sm"
        >
          Demander ce circuit
        </Button>
      </div>
    </article>
  );
}
