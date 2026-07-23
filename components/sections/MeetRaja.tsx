import Image from "next/image";
import { Award, CheckCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { SectionHeading, Button } from "@/components/ui";

const points = [
  "Guide agréé par le gouvernement indien",
  "25 ans d'expérience avec des voyageurs français",
  "Voyages hors des sentiers battus, petits groupes",
  "Sans intermédiaire — prix inférieur aux tour-opérateurs",
  "Hôtels de charme soigneusement sélectionnés",
];

export function MeetRaja() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80"
              alt="Rajesh (Raja) — guide francophone en Inde"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-brand-blue backdrop-blur-sm shadow">
              <Award size={16} className="text-brand-red" />
              Guide certifié
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Votre guide"
              title={`Rencontrez ${siteConfig.founder.name}`}
            />
            <p className="mt-6 text-muted leading-relaxed">
              Je m&apos;appelle Rajesh, mais tout le monde m&apos;appelle Raja. Depuis {siteConfig.founder.experience},
              je travaille comme guide français en Inde. J&apos;organise des voyages sur mesure pour les voyageurs
              français qui cherchent l&apos;Inde authentique — loin des cars bondés de touristes.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Je vous fais découvrir villes, monuments, marchés et villages, au contact de la population
              pour des découvertes extraordinaires. Le soir, halte dans des hôtels de charme dont vous
              conserverez le souvenir pour toujours.
            </p>

            <ul className="mt-6 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-ink/80">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-brand-blue" />
                  {point}
                </li>
              ))}
            </ul>

            <Button href="/a-propos" variant="outline" className="mt-8">
              En savoir plus sur Raja
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
