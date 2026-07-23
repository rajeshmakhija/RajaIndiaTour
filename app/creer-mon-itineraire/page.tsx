import Image from "next/image";
import { Compass, HandHeart, Clock, MapPin } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { ItineraryBuilder } from "@/components/itinerary/ItineraryBuilder";

export const metadata = createMetadata({
  title: "Créez votre itinéraire sur mesure",
  description:
    "Composez votre voyage en Inde en trois étapes : vos centres d'intérêt, vos préférences et vos dates. Raja vous répond sous 24h avec une proposition personnalisée et gratuite.",
  path: "/creer-mon-itineraire",
});

const atouts = [
  {
    icon: Compass,
    title: "Un itinéraire vraiment à vous",
    text: "Aucun circuit préfabriqué : chaque étape est dessinée selon vos envies, votre rythme et la saison.",
  },
  {
    icon: HandHeart,
    title: "Sans intermédiaire",
    text: "Vous échangez directement avec Rajesh, guide francophone agréé, installé en Inde depuis 25 ans.",
  },
  {
    icon: Clock,
    title: "Réponse sous 24 heures",
    text: "Une proposition détaillée, gratuite et sans engagement, rédigée personnellement par Raja.",
  },
];

export default function CreerMonItinerairePage() {
  return (
    <div className="bg-[#f7f9fc]">
      {/* Hero */}
      <section className="relative h-[min(58vh,440px)] w-full overflow-hidden">
        <Image
          src="/images/destinations/rajasthan.jpg"
          alt="Créez votre voyage sur mesure en Inde"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 flex flex-col justify-center px-4">
          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              <MapPin size={13} /> Voyage sur mesure
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] text-white md:text-6xl">
              Créez votre itinéraire
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
              Dites-nous ce qui vous fait rêver — l&apos;Inde des palais, des montagnes ou des
              backwaters. En trois étapes, Raja compose le voyage qui vous ressemble.
            </p>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Votre projet en 3 étapes
            </p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
              Composez votre voyage idéal
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Quelques clics suffisent. Rien n&apos;est définitif : ce formulaire sert de point de
              départ à la conversation avec Raja.
            </p>
          </div>

          <ItineraryBuilder />
        </div>
      </section>

      {/* Atouts */}
      <section className="border-t border-cream-dark bg-white px-4 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {atouts.map((a) => (
              <div key={a.title} className="text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <a.icon size={24} />
                </span>
                <h3 className="font-display text-xl font-bold text-ink">{a.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
