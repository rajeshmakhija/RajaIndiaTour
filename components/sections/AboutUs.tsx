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
            <div className="space-y-5 text-base leading-7 text-muted md:text-lg md:leading-8">
              <p>
                Je m&apos;appelle Rajesh (Raja). Depuis 25 ans, je travaille comme guide français en Inde et dans les pays voisins. Je suis approuvé par le gouvernement Indien et le ministère du tourisme.
              </p>
              <p>
                J’organise des voyages avec mon agence RAJA INDIA TOUR. Si vous recherchez des voyages authentiques, hors des sentiers battus, pour vous imprégner au mieux de la vie et des traditions indiennes, contactez-moi. Je vous propose des voyages sur mesure, adaptés à vos attentes et vos centres d’intérêts, sans intermédiaire pour un prix réduit.
              </p>
              <p className="font-medium text-ink">
                Je réside en Inde et je parle le français, profitez de mon expérience et de ma connaissance du pays. Au sein de petits groupes, accompagnés par un guide à l’écoute et proche de vous, venez vivre des séjours inoubliables au cœur de l’Inde traditionnelle. Je vous ferai découvrir villes, monuments, marchés, villages… et vous conduirai au contact de la population.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
