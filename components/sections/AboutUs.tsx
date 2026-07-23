import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { siteConfig } from "@/lib/site";

const highlights = [
  "Guide agréé gouvernement indien",
  "25 ans avec des voyageurs français",
  "Voyages sur mesure sans intermédiaire",
];

export function AboutUs() {
  return (
    <section
      id="a-propos"
      className="border-b border-cream-dark bg-white px-4 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Votre agence locale en Inde
            </p>
            <h2 className="mt-3 max-w-md font-display text-4xl font-bold leading-[1.08] text-ink md:text-5xl">
              Découvrez l&apos;Inde avec Raja
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Guide francophone sur place depuis {siteConfig.founder.experience}, Raja crée des voyages
              privés qui vous ressemblent.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-ink">
                  <CheckCircle size={17} className="mt-0.5 shrink-0 text-brand-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button href="/contact" variant="primary" className="mt-8">
              Parler à Raja
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="border-t border-cream-dark pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="font-display text-2xl font-semibold leading-snug text-brand-blue md:text-3xl">
              Un voyage réussi commence par une vraie conversation.
            </p>

            <div className="mt-7 space-y-5 text-base leading-7 text-muted md:text-lg md:leading-8">
              <p>
                Je m&apos;appelle Rajesh, mais tous mes voyageurs m&apos;appellent Raja. Depuis 25 ans,
                j&apos;accompagne des visiteurs francophones en Inde et dans les pays voisins.
              </p>
              <p>
                Je prépare chaque itinéraire moi-même, selon votre rythme, vos centres d&apos;intérêt et
                votre budget. Vous voyagez sans intermédiaire, avec des étapes bien choisies, des hôtels
                de charme et du temps pour rencontrer la population locale.
              </p>
              <p className="font-medium text-ink">
                Petits groupes, liberté et attention personnelle. Loin des circuits standardisés et des
                cars bondés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
