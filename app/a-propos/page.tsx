import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";
import { SectionHeading } from "@/components/ui";
import { Award, Users, MapPin } from "lucide-react";

export const metadata = createMetadata({
  title: "À propos de Raja",
  description:
    "Découvrez Rajesh (Raja), guide francophone agréé en Inde depuis 25 ans. Voyages sur mesure pour voyageurs français.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="À propos"
          title={`${siteConfig.founder.name} — ${siteConfig.founder.title}`}
        />

        <div className="prose prose-lg max-w-none text-muted leading-relaxed space-y-6">
          <p>
            Je m&apos;appelle Rajesh, mais tout le monde m&apos;appelle Raja. Depuis {siteConfig.founder.experience},
            je travaille comme guide français en Inde et dans les pays voisins. Je suis approuvé par le gouvernement
            indien et le ministère du tourisme.
          </p>
          <p>
            J&apos;organise des voyages avec mon agence Raja India Tour pour les voyageurs français qui recherchent
            des expériences authentiques, hors des sentiers battus. Sans intermédiaire, pour un prix réduit par rapport
            aux tour-opérateurs classiques.
          </p>
          <p>
            Venez découvrir l&apos;Inde qui vous fascinera : en liberté et à votre rythme, en compagnie d&apos;un guide
            chevronné qui a à cœur de vous faire aimer son pays.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Award, label: "25 ans d'expérience", sub: "Guide agréé" },
            { icon: Users, label: "500+ voyageurs", sub: "Clients français" },
            { icon: MapPin, label: "Basé en Inde", sub: "Expertise locale" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="rounded-xl bg-white p-6 text-center shadow-sm">
              <Icon className="mx-auto text-brand-red" size={28} />
              <p className="mt-3 font-semibold text-ink">{label}</p>
              <p className="text-sm text-muted">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
