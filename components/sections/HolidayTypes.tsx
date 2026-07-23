import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const holidayTypes = [
  {
    id: "safaris",
    eyebrow: "Nature & tigres",
    title: "Safaris",
    description:
      "Kanha, Bandhavgarh, Ranthambore : partez à l'aube en jeep sur les traces du tigre du Bengale, avec un naturaliste qui lit la forêt pour vous.",
    href: "/destinations/madhya-pradesh",
    image: "/images/destinations/places/tiger.jpg",
    className: "md:row-span-2 min-h-[320px] md:min-h-0",
    featured: true,
  },
  {
    id: "famille",
    eyebrow: "Souvenirs partagés",
    title: "Vacances en famille",
    description:
      "Éléphants, forts et rickshaws : un rythme adapté aux enfants, des étapes courtes et des hôtels avec piscine.",
    href: "/contact?style=famille",
    image: "/images/destinations/rajasthan.jpg",
    className: "min-h-[240px] md:min-h-0",
  },
  {
    id: "lune-de-miel",
    eyebrow: "À deux, à votre rythme",
    title: "Lunes de miel",
    description:
      "Backwaters en houseboat privé, palais au bord de l'eau et dîners aux chandelles.",
    href: "/destinations/kerala",
    image: "/images/destinations/places/kerala-canoe.jpg",
    className: "min-h-[240px] md:min-h-0",
  },
  {
    id: "plages",
    eyebrow: "Cocotiers & océan",
    title: "Séjours plage",
    description:
      "Goa, Varkala ou Kovalam : quelques jours de sable et d'ayurveda pour clore un circuit en douceur.",
    href: "/destinations/goa",
    image: "/images/destinations/places/palolem.jpg",
    className: "min-h-[240px] md:min-h-0",
  },
  {
    id: "heritage",
    eyebrow: "Palais & cités royales",
    title: "Circuits heritage",
    description:
      "Dormez dans d'anciens palais de maharajas et traversez le Rajasthan des forts et des havelis.",
    href: "/destinations/rajasthan",
    image: "/images/destinations/places/jaipur-amber.jpg",
    className: "min-h-[240px] md:min-h-0",
  },
];

export function HolidayTypes() {
  return (
    <section className="border-b border-cream-dark bg-[#f7f9fc] px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
            Types de voyage
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl">
            Vivez l&apos;Inde à votre façon
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Il n&apos;y a pas une Inde, mais mille. Dites-nous laquelle vous attire — Raja construit
            le circuit autour de l&apos;expérience que vous cherchez, jamais l&apos;inverse.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:h-[560px] md:grid-cols-3 md:grid-rows-2 md:gap-5">
          {holidayTypes.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 400px"
              />
              {/* Legibility scrim: stronger at the bottom where the text sits */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
                  {item.eyebrow}
                </p>
                <h3
                  className={`mt-1.5 font-display font-bold leading-tight ${
                    item.featured ? "text-3xl md:text-4xl" : "text-2xl"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2 leading-relaxed text-white/85 ${
                    item.featured ? "text-sm md:text-base" : "text-[13px]"
                  }`}
                >
                  {item.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                  Découvrir
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
