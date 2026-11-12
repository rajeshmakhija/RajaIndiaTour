import type { FaqItem } from "@/components/sections/PracticalFaq";

/** Trip-type landing pages (/voyages/[slug]), one per search intent. */
export interface Landing {
  slug: string;
  /** Search-result title (<title>); the visible H1 is `title`. */
  seoTitle: string;
  description: string;
  eyebrow: string;
  title: string;
  tagline: string;
  heroImage: string;
  intro: string[];
  highlights: string[];
  reasons: { title: string; text: string }[];
  /** Slugs from lib/data/tours.ts */
  tourSlugs: string[];
  /** Slugs from lib/data/destinations.ts */
  destinationSlugs: string[];
  bestSeason: string;
  duration: string;
  faq: FaqItem[];
  /** Query string passed to the itinerary form. */
  ctaStyle: string;
}

export const landings: Landing[] = [
  {
    slug: "circuit-prive-inde-avec-chauffeur",
    seoTitle: "Circuit privé en Inde avec chauffeur et guide francophone",
    description:
      "Voyagez en Inde en circuit privé : voiture avec chauffeur rien que pour vous, guides francophones et itinéraire sur mesure, organisé sans intermédiaire par Raja.",
    eyebrow: "Circuit privé",
    title: "Circuit privé en Inde avec chauffeur",
    tagline: "Votre voiture, votre chauffeur, votre rythme — et un guide francophone pour les grandes visites.",
    heroImage: "/images/destinations/rajasthan.jpg",
    intro: [
      "Un circuit privé en Inde, c'est voyager sans groupe : une voiture climatisée et un chauffeur rien que pour vous, du premier au dernier jour. Vous partez quand vous voulez, vous vous arrêtez dans un village, un temple ou un marché qui vous attire, et le programme s'adapte à vos envies plutôt que l'inverse.",
      "Pour les visites importantes — le Taj Mahal, le fort d'Amber, Jodhpur, Varanasi — un guide local francophone vous accompagne. Entre les étapes, votre chauffeur connaît les routes, les temps de trajet réels et les bons endroits pour faire une pause.",
      "Raja, guide francophone agréé par le ministère du Tourisme indien depuis 25 ans, organise ces circuits lui-même, sans intermédiaire. Il reste joignable pendant tout le voyage.",
    ],
    highlights: [
      "Voiture climatisée et chauffeur privés",
      "Guides francophones pour les grandes visites",
      "Départ à la date de votre choix",
      "Itinéraire et rythme modifiables",
      "Organisation directe, sans intermédiaire",
    ],
    reasons: [
      {
        title: "Aucun groupe",
        text: "Vous voyagez seuls, en couple, en famille ou entre amis. Pas d'horaires imposés, pas d'attente : la journée commence quand vous êtes prêts.",
      },
      {
        title: "Un chauffeur qui connaît la route",
        text: "En Inde, 250 km représentent souvent cinq à six heures de route. Votre chauffeur sait où s'arrêter et comment rendre les trajets agréables.",
      },
      {
        title: "Des guides francophones",
        text: "Dans les grandes villes, un guide local francophone vous raconte l'histoire des monuments et répond à vos questions.",
      },
      {
        title: "Un interlocuteur unique",
        text: "Raja construit le circuit avec vous, puis suit votre voyage au quotidien. En cas d'imprévu, il ajuste le programme.",
      },
    ],
    tourSlugs: ["rajasthan-classique-12-jours", "tour-inde-du-nord-16-jours", "tour-inde-du-sud-14-jours"],
    destinationSlugs: ["rajasthan", "triangle-dor", "sud", "kerala", "varanasi"],
    bestSeason: "Octobre à mars pour la plupart des régions",
    duration: "5 à 20 jours selon l'itinéraire",
    faq: [
      {
        question: "Comment fonctionne un circuit privé avec chauffeur ?",
        answer:
          "Un chauffeur vient vous chercher à l'aéroport, puis vous accompagne d'étape en étape avec sa voiture pendant tout le circuit. Il loge à proximité de vos hôtels. Dans les grandes villes, un guide local francophone vous rejoint pour les visites.",
      },
      {
        question: "Le chauffeur parle-t-il français ?",
        answer:
          "Les chauffeurs parlent généralement anglais ; les visites se font avec des guides locaux francophones. Raja, lui, parle français et reste joignable pendant tout le voyage.",
      },
      {
        question: "Peut-on modifier le programme pendant le voyage ?",
        answer:
          "Oui, dans la mesure du possible : prolonger une visite, ajouter un arrêt ou ralentir le rythme. Les changements d'hôtels ou d'étapes se font en lien avec Raja.",
      },
    ],
    ctaStyle: "prive",
  },
  {
    slug: "voyage-sur-mesure-inde",
    seoTitle: "Voyage sur mesure en Inde : itinéraire personnalisé",
    description:
      "Un voyage sur mesure en Inde construit autour de vos envies : régions, durée, rythme et hôtels choisis avec Raja, guide francophone agréé. Devis gratuit.",
    eyebrow: "Sur mesure",
    title: "Voyage sur mesure en Inde",
    tagline: "Un itinéraire construit autour de vous : vos dates, vos envies, votre rythme.",
    heroImage: "/images/destinations/rajasthan-jaisalmer.jpg",
    intro: [
      "Un voyage sur mesure en Inde part de vous, pas d'un catalogue. Combien de temps avez-vous ? Préférez-vous les palais du Rajasthan, les temples du Sud, l'Himalaya ou la spiritualité de Varanasi ? Voulez-vous des journées bien remplies ou du temps pour flâner ? Ces réponses dessinent votre itinéraire.",
      "Raja propose ensuite un premier programme jour par jour, avec les temps de trajet réels et une sélection d'hébergements : hôtels simples et confortables, havelis de charme ou palais de maharajas. Vous l'ajustez ensemble jusqu'à ce qu'il vous ressemble.",
      "Les circuits présentés sur ce site sont des points de départ : chaque étape peut être raccourcie, prolongée, remplacée ou combinée avec une autre région.",
    ],
    highlights: [
      "Programme construit à partir de vos envies",
      "Choix de la catégorie d'hôtels",
      "Combinaisons de régions (Rajasthan, Sud, Himalaya…)",
      "Rythme adapté à votre façon de voyager",
      "Devis détaillé et gratuit",
    ],
    reasons: [
      {
        title: "Vos priorités d'abord",
        text: "Culture, nature, spiritualité, gastronomie ou repos : le circuit met l'accent sur ce qui compte pour vous.",
      },
      {
        title: "Un rythme réaliste",
        text: "Raja connaît les distances et évite les journées de route trop longues. Moins d'étapes, mieux choisies, pour profiter de chaque lieu.",
      },
      {
        title: "Des hébergements choisis",
        text: "Du confort simple au palais historique, chaque nuit est choisie selon votre budget et l'ambiance que vous cherchez.",
      },
      {
        title: "25 ans de terrain",
        text: "Guide agréé par le ministère du Tourisme indien, Raja conseille les étapes, les saisons et les moments qu'on ne trouve pas dans les guides.",
      },
    ],
    tourSlugs: ["tour-triangle-dor-5-jours", "rajasthan-classique-12-jours", "tour-inde-du-sud-goa-20-jours"],
    destinationSlugs: ["rajasthan", "sud", "ladakh", "madhya-pradesh", "varanasi", "nepal"],
    bestSeason: "Selon les régions : octobre à mars, juin à septembre pour le Ladakh",
    duration: "À partir de 5 jours",
    faq: [
      {
        question: "Comment se déroule la création d'un voyage sur mesure ?",
        answer:
          "Vous décrivez vos envies, vos dates et votre budget via le formulaire ou WhatsApp. Raja vous propose un programme jour par jour et un devis détaillé, puis l'ajuste avec vous jusqu'à ce qu'il vous convienne.",
      },
      {
        question: "Peut-on combiner plusieurs régions ?",
        answer:
          "Oui. Le Rajasthan se combine bien avec Varanasi, l'Inde du Sud avec Goa, et le Nord avec le Népal. Les longues distances se font en train ou en vol intérieur pour éviter les journées entières de route.",
      },
      {
        question: "Combien de temps à l'avance faut-il réserver ?",
        answer:
          "Idéalement deux à quatre mois avant le départ pour la haute saison (octobre à mars), afin de choisir les meilleurs hébergements, guides et vols intérieurs.",
      },
    ],
    ctaStyle: "sur-mesure",
  },
  {
    slug: "inde-en-famille",
    seoTitle: "Voyage en Inde en famille : circuits adaptés aux enfants",
    description:
      "Voyager en Inde en famille : rythme adapté aux enfants, étapes courtes, hôtels avec piscine et chauffeur privé. Itinéraires conseillés par Raja, guide francophone.",
    eyebrow: "En famille",
    title: "Voyage en Inde en famille",
    tagline: "Forts, palais, safaris et rickshaws : une Inde à la hauteur des enfants, sans les épuiser.",
    heroImage: "/images/destinations/triangle-dor.jpg",
    intro: [
      "L'Inde émerveille les enfants : les forts aux passages secrets, les palais de conte de fées, les marchés colorés, les tuk-tuks et, avec un peu de chance, un tigre au détour d'une piste. Le secret d'un voyage réussi en famille est le rythme.",
      "Raja construit des circuits familiaux avec moins d'étapes et deux nuits au même endroit, des trajets coupés de pauses, et des hôtels avec piscine ou jardin pour souffler l'après-midi. La voiture privée avec chauffeur permet de s'arrêter quand les enfants en ont besoin.",
      "Le Triangle d'Or et le Rajasthan sont parfaits pour une première fois ; le Kerala, avec ses backwaters et ses plages, offre un voyage plus doux, idéal avec de jeunes enfants.",
    ],
    highlights: [
      "Étapes courtes et deux nuits par étape",
      "Hôtels avec piscine ou jardin",
      "Voiture privée : pauses à la demande",
      "Activités adaptées : safari, bateau, cuisine",
      "Raja joignable pendant tout le voyage",
    ],
    reasons: [
      {
        title: "Un rythme d'enfant",
        text: "Une visite le matin, du repos l'après-midi, une promenade le soir : la journée garde son énergie au lieu de devenir une course.",
      },
      {
        title: "Des souvenirs marquants",
        text: "Une nuit sous les étoiles du désert, un safari en jeep, une nuit en houseboat : des expériences qui parlent aux enfants.",
      },
      {
        title: "Une logistique simple",
        text: "Chauffeur privé, hôtels réservés et vouchers remis à l'arrivée : vous vous occupez des enfants, Raja s'occupe du reste.",
      },
    ],
    tourSlugs: ["tour-triangle-dor-5-jours", "rajasthan-classique-12-jours", "tour-inde-du-sud-14-jours"],
    destinationSlugs: ["triangle-dor", "rajasthan", "kerala", "goa"],
    bestSeason: "Octobre à mars, idéalement pendant les vacances de la Toussaint, de Noël ou de février",
    duration: "8 à 15 jours",
    faq: [
      {
        question: "À partir de quel âge peut-on voyager en Inde avec des enfants ?",
        answer:
          "Il n'y a pas d'âge minimum, mais un circuit avec peu d'étapes convient mieux aux jeunes enfants. Demandez conseil à votre médecin pour les vaccins et la santé avant le départ.",
      },
      {
        question: "Quelle région choisir pour un premier voyage en famille ?",
        answer:
          "Le Triangle d'Or (Delhi, Agra, Jaipur) pour un premier contact, prolongé par le Rajasthan pour les plus grands. Le Kerala offre un voyage plus calme, avec houseboat et plages.",
      },
      {
        question: "Comment gérer les longs trajets avec des enfants ?",
        answer:
          "En limitant le nombre d'étapes, en coupant les trajets de pauses et en utilisant le train ou l'avion pour les longues distances. La voiture privée permet de s'arrêter à tout moment.",
      },
    ],
    ctaStyle: "famille",
  },
  {
    slug: "voyage-de-noces-inde",
    seoTitle: "Voyage de noces en Inde : itinéraire romantique sur mesure",
    description:
      "Un voyage de noces en Inde : palais au bord des lacs, houseboat privé au Kerala, plages de Goa. Itinéraires romantiques sur mesure avec Raja, guide francophone.",
    eyebrow: "Lune de miel",
    title: "Voyage de noces en Inde",
    tagline: "Palais au bord de l'eau, houseboat privé et plages : une Inde à vivre à deux.",
    heroImage: "/images/hotels/resort-lake-palace.jpg",
    intro: [
      "Pour un voyage de noces, l'Inde offre des moments rares : un dîner sur une terrasse face au lac Pichola à Udaipur, une nuit dans un ancien palais de maharaja, une croisière privée en houseboat sur les backwaters du Kerala, puis quelques jours de plage à Goa.",
      "Raja construit des itinéraires romantiques avec un rythme tranquille, des hébergements de caractère et des moments réservés aux couples. La voiture privée avec chauffeur vous laisse libres de vos journées.",
      "Deux grandes options : le Rajasthan des palais et des lacs, ou le Sud des backwaters et des plages. Les deux se combinent avec un vol intérieur pour un voyage de deux à trois semaines.",
    ],
    highlights: [
      "Nuits dans des palais et havelis de charme",
      "Houseboat privé sur les backwaters",
      "Udaipur, la ville des lacs",
      "Fin de voyage à la plage (Goa, Kerala)",
      "Rythme tranquille, voiture privée",
    ],
    reasons: [
      {
        title: "Des lieux d'exception",
        text: "Palais au bord de l'eau, havelis aux cours intérieures, houseboats : chaque nuit peut devenir un souvenir.",
      },
      {
        title: "Du temps à deux",
        text: "Des journées moins chargées, des soirées libres et une fin de voyage au calme pour profiter de votre lune de miel.",
      },
      {
        title: "Tout est organisé",
        text: "Transferts, hôtels, visites et guides : Raja s'occupe de la logistique, vous vous occupez de vous.",
      },
    ],
    tourSlugs: ["rajasthan-classique-12-jours", "tour-inde-du-sud-goa-20-jours", "tour-inde-du-sud-14-jours"],
    destinationSlugs: ["rajasthan", "kerala", "goa", "triangle-dor"],
    bestSeason: "Novembre à mars",
    duration: "12 à 20 jours",
    faq: [
      {
        question: "Rajasthan ou Kerala pour un voyage de noces ?",
        answer:
          "Le Rajasthan pour les palais, les forts et les lacs d'Udaipur ; le Kerala pour la nature, les backwaters et la détente. Les deux se combinent très bien avec un vol intérieur.",
      },
      {
        question: "Peut-on terminer le voyage par quelques jours de plage ?",
        answer:
          "Oui. Goa ou les plages du Kerala sont idéales pour finir en douceur après un circuit culturel.",
      },
      {
        question: "Combien de jours prévoir pour une lune de miel en Inde ?",
        answer:
          "Comptez 12 à 15 jours pour un seul grand ensemble (Rajasthan ou Sud), et environ trois semaines pour combiner deux régions et quelques jours de plage.",
      },
    ],
    ctaStyle: "lune-de-miel",
  },
];

export function getLandingBySlug(slug: string): Landing | undefined {
  return landings.find((landing) => landing.slug === slug);
}
