export const destinations = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "Palais, désert et traditions royales",
    image: "/images/destinations/rajasthan.jpg",
    priceFrom: 1450,
    days: 10,
  },
  {
    slug: "kerala",
    name: "Kerala",
    tagline: "Backwaters, plages et nature tropicale",
    image: "/images/destinations/kerala.jpg",
    priceFrom: 1380,
    days: 10,
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    tagline: "Himalaya, monastères et paysages lunaires",
    image: "/images/destinations/ladakh.jpg",
    priceFrom: 1680,
    days: 12,
  },
  {
    slug: "goa",
    name: "Goa",
    tagline: "Plages, culture portugaise et détente",
    image: "/images/destinations/goa.jpg",
    priceFrom: 1200,
    days: 7,
  },
  {
    slug: "triangle-dor",
    name: "Triangle d'Or",
    tagline: "Delhi, Agra, Jaipur — le classique incontournable",
    image: "/images/destinations/triangle-dor.jpg",
    priceFrom: 1100,
    days: 7,
  },
  {
    slug: "varanasi",
    name: "Varanasi",
    tagline: "Spiritualité et ghats du Gange",
    image: "/images/destinations/varanasi.jpg",
    priceFrom: 980,
    days: 5,
  },
];

export const circuits = [
  {
    slug: "voyage-rajasthan-12-jours",
    title: "Grand Rajasthan — 12 jours",
    destination: "Rajasthan",
    region: "rajasthan",
    days: 12,
    priceFrom: 2450,
    image: "/images/destinations/rajasthan.jpg",
    summary: "Delhi, Taj Mahal, Jaipur, Jodhpur, Jaisalmer et Udaipur avec guide francophone.",
  },
  {
    slug: "tour-triangle-dor-5-jours",
    title: "Le Triangle d'Or",
    destination: "Nord de l'Inde",
    region: "nord",
    days: 5,
    priceFrom: 1100,
    image: "/images/destinations/triangle-dor.jpg",
    summary: "Le circuit incontournable : Delhi, Agra et Jaipur à votre rythme.",
  },
  {
    slug: "voyage-kerala-10-jours",
    title: "Kerala — nature et détente",
    destination: "Kerala",
    region: "sud",
    days: 10,
    priceFrom: 1890,
    image: "/images/destinations/kerala.jpg",
    summary: "Backwaters en houseboat, Munnar et plages du Kerala.",
  },
  {
    slug: "aventure-ladakh-10-jours",
    title: "Ladakh aventure",
    destination: "Ladakh",
    region: "ladakh",
    days: 10,
    priceFrom: 2100,
    image: "/images/destinations/ladakh.jpg",
    summary: "Leh, Nubra Valley, Pangong et monastères tibétains.",
  },
  {
    slug: "voyage-madhya-pradesh-10-jours",
    title: "Madhya Pradesh — cœur de l'Inde",
    destination: "Madhya Pradesh",
    region: "madhya-pradesh",
    days: 10,
    priceFrom: 1750,
    image: "/images/destinations/rajasthan-2.jpg",
    summary: "Khajuraho, Orchha, Bhopal et les temples de l'Inde centrale.",
  },
];

/**
 * Real posts from the Routard thread "Agence Raja India tour en Inde" (topic 195424),
 * quoted verbatim (shortened with "…"). Forum posts carry no star rating.
 */
const ROUTARD_THREAD = "https://www.routard.com/forums/t/agence-raja-india-tour-en-inde/195424";

export const routardReviews = [
  {
    author: "jacques-fauveau",
    date: "Décembre 2018",
    text: "Je viens de rentrer d'un séjour en Inde de 20 jours (2 semaines Rajasthan-5 jours au Kerala) organisé par Rajesh de Raja india tour. Tout a été parfait… Organisation sans faille, chauffeur et guides (dont la plupart parlaient français) ponctuels, hôtels (principalement hôtels de charme) conformes à nos attentes… Je ne pourrai que recommander Raja India Tour sans restriction.",
    url: `${ROUTARD_THREAD}/36`,
  },
  {
    author: "oups33",
    date: "Mars 2019",
    text: "Nous venons de faire un voyage avec Raja tour de 23 jours… Nous avons eu aucun problème. Les différents chauffeurs que nous avons eu dans les régions ont tous été sérieux, très attentionnés et prudents… Si on retourne en Inde on recontactera cette agence les yeux fermés.",
    url: `${ROUTARD_THREAD}/39`,
  },
  {
    author: "claude-et-eliane",
    date: "Mars 2019",
    text: "Nous revenons d'un séjour au Rajasthan avec Raja India Tour… Des hôtels de charme magnifiques. Des chauffeurs disponibles et des véhicules très propres. Le circuit que nous avions défini a été respecté dans sa totalité. Il n'y a pas de mauvaises surprises. Faites confiance à Raja India Tour, vous ne serez pas déçu.",
    url: `${ROUTARD_THREAD}/40`,
  },
];

export const reviews = [
  {
    name: "Marie D.",
    city: "Lyon",
    date: "Mars 2026",
    rating: 5,
    text: "Voyage parfaitement organisé par Raja. Hôtels de charme, guide attentionné, et un vrai contact avec la culture indienne. Je recommande vivement !",
  },
  {
    name: "Pierre L.",
    city: "Paris",
    date: "Février 2026",
    rating: 5,
    text: "Circuit Rajasthan sur mesure exactement comme nous l'avions imaginé. Sans intermédiaire, le rapport qualité-prix est excellent.",
  },
  {
    name: "Sophie M.",
    city: "Marseille",
    date: "Janvier 2026",
    rating: 5,
    text: "Raja parle un français impeccable et connaît chaque recoin. Le Kerala en houseboat restera un souvenir inoubliable.",
  },
  {
    name: "Jean-Claude B.",
    city: "Bordeaux",
    date: "Décembre 2025",
    rating: 4,
    text: "Très belle découverte de l'Inde du Nord. Organisation fluide, réactivité de Raja au top. Nous repartons avec le Ladakh en tête !",
  },
];

export const faqItems = [
  {
    question: "Est-ce une agence fiable ?",
    answer:
      "Raja est guide agréé par le gouvernement indien et le ministère du tourisme, avec 25 ans d'expérience auprès de voyageurs français. Avis clients vérifiables et devis détaillé avant tout engagement.",
  },
  {
    question: "Faut-il parler anglais en Inde ?",
    answer:
      "Non. Raja et son équipe parlent français. Vous serez accompagnés par un guide francophone tout au long du circuit.",
  },
  {
    question: "Combien coûte un voyage en Inde ?",
    answer:
      "Chaque circuit est sur mesure : le tarif dépend de la durée, de la saison, du niveau de confort et de vos envies. Demandez un devis personnalisé gratuit à Raja, qui vous répond sous 24h.",
  },
  {
    question: "Comment obtenir le visa pour l'Inde ?",
    answer:
      "Les ressortissants français peuvent demander un e-Visa en ligne sur le site officiel du gouvernement indien. Raja vous guide dans les démarches après réservation.",
  },
  {
    question: "Quelle est la meilleure période pour visiter l'Inde ?",
    answer:
      "Octobre à mars pour le Nord et le Rajasthan. Le Kerala se visite toute l'année. Le Ladakh est accessible de juin à septembre.",
  },
  {
    question: "Comment réserver et payer ?",
    answer:
      "Demandez un devis gratuit via le formulaire ou WhatsApp. Après validation, un acompte de 30 % sécurise votre réservation. Le solde est dû 30 jours avant le départ.",
  },
];
