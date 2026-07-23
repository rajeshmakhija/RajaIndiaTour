export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "quand-partir-en-inde",
    title: "Quand partir en Inde ? Les meilleures périodes par région",
    excerpt:
      "Rajasthan, Kerala, Ladakh… Chaque région a sa saison idéale. Guide pratique pour les voyageurs français.",
    date: "15 mars 2026",
    category: "Conseils voyage",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    content: [
      "L'Inde est un continent en soi. La meilleure période dépend donc avant tout de la région que vous souhaitez visiter.",
      "Pour le Rajasthan et le Triangle d'Or (Delhi, Agra, Jaipur), la saison idéale s'étend d'octobre à mars, lorsque les températures restent agréables et que le ciel est dégagé.",
      "Le Kerala et le sud de l'Inde se visitent mieux de novembre à février, entre les moussons. C'est la période parfaite pour les backwaters et les plages.",
      "Le Ladakh et l'Himalaya sont accessibles de juin à septembre, une fois les cols de montagne ouverts après la fonte des neiges.",
      "Raja organise chaque circuit en fonction de la saison et de vos envies. Contactez-nous pour un itinéraire adapté à votre date de départ.",
    ],
  },
  {
    slug: "budget-voyage-inde",
    title: "Quel budget prévoir pour un voyage en Inde ?",
    excerpt:
      "Hébergement, transport, repas, visa… Tout ce qu'un voyageur français doit savoir pour budgétiser son séjour.",
    date: "2 mars 2026",
    category: "Budget",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
    content: [
      "Le budget d'un voyage en Inde dépend surtout de la durée du circuit, du niveau de confort des hôtels et de la saison choisie. Un circuit sur mesure avec guide francophone et hébergements de charme s'adapte à toutes les envies.",
      "Pensez à prévoir quelques postes en plus du circuit : le visa électronique indien, une assurance voyage couvrant l'Inde et les vols internationaux, à réserver de préférence à l'avance.",
      "En réservant directement avec une agence locale comme Raja India Tour, vous évitez les marges des tour-opérateurs intermédiaires — une vraie économie sur un circuit équivalent.",
      "Les pourboires (guides, chauffeurs, porteurs) sont d'usage en Inde : prévoyez une petite enveloppe pour remercier ceux qui vous accompagnent.",
      "Demandez un devis personnalisé gratuit : Raja vous répond sous 24h avec un budget détaillé selon vos dates et votre niveau de confort.",
    ],
  },
  {
    slug: "visa-inde-voyageurs-francais",
    title: "Visa Inde pour les voyageurs français : mode d'emploi",
    excerpt:
      "e-Visa, documents nécessaires, délais… Toutes les étapes pour obtenir votre visa avant le départ.",
    date: "18 février 2026",
    category: "Formalités",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    content: [
      "Les ressortissants français ont besoin d'un visa pour entrer en Inde. L'e-Visa touristique est la solution la plus simple pour un séjour jusqu'à 30 jours.",
      "La demande se fait en ligne sur le site officiel du gouvernement indien. Prévoyez un passeport valide 6 mois après la date de retour et une photo d'identité récente.",
      "Le délai de traitement est généralement de 3 à 5 jours ouvrés. Nous recommandons de faire la demande au moins 3 semaines avant le départ.",
      "À l'arrivée, conservez une copie imprimée de votre e-Visa et votre billet retour — les autorités peuvent les demander.",
      "Raja vous accompagne dans la préparation de votre dossier et vous rappelle les documents à prévoir avant votre circuit.",
    ],
  },
  {
    slug: "rajasthan-guide-francophone",
    title: "Rajasthan : pourquoi voyager avec un guide francophone ?",
    excerpt:
      "Entre palais, désert et villages, le Rajasthan mérite un accompagnement expert. Les avantages d'un guide sur place.",
    date: "5 février 2026",
    category: "Destinations",
    readTime: "6 min",
    image: "/images/destinations/rajasthan.jpg",
    content: [
      "Le Rajasthan est la région la plus visitée d'Inde par les Français — et pour cause : palais majestueux, désert du Thar, cités colorées et traditions vivantes.",
      "Un guide francophone agréé comme Raja vous fait gagner un temps précieux : réservations d'hôtels de charme, accès aux sites hors horaires de foule, explications culturelles en temps réel.",
      "Sans guide, les distances entre villes (Jaipur, Jodhpur, Udaipur, Jaisalmer) peuvent être mal estimées. Raja optimise chaque étape pour un rythme confortable.",
      "Les marchés, les temples et les villages ne se visitent pas de la même manière avec un accompagnateur qui connaît les codes locaux et parle votre langue.",
      "Découvrez nos circuits Rajasthan sur mesure — départ garanti, modifiables selon vos envies.",
    ],
  },
  {
    slug: "ladakh-premiere-fois",
    title: "Première fois au Ladakh : ce qu'il faut savoir",
    excerpt:
      "Altitude, saison, acclimatation et itinéraire type pour découvrir Leh, Nubra et Pangong sans stress.",
    date: "28 janvier 2026",
    category: "Destinations",
    readTime: "5 min",
    image: "/images/destinations/ladakh.jpg",
    content: [
      "Le Ladakh se visite principalement de juin à septembre, lorsque les cols himalayens sont ouverts.",
      "L'altitude (Leh à 3 500 m) demande une acclimatation : prévoyez 1 à 2 jours calmes à l'arrivée avant de monter vers Nubra ou Pangong.",
      "Raja organise des circuits avec chauffeurs habitués aux routes de montagne et des hébergements adaptés au climat d'altitude.",
      "Monastères tibétains, lacs turquoise et paysages lunaires : le Ladakh reste l'une des expériences les plus marquantes d'un voyage en Inde.",
    ],
  },
  {
    slug: "varanasi-ghats-guide",
    title: "Varanasi : comment vivre les ghats du Gange",
    excerpt:
      "Aarti du soir, bateau au lever du soleil, Sarnath… Conseils pour un séjour spirituel et respectueux.",
    date: "12 janvier 2026",
    category: "Destinations",
    readTime: "5 min",
    image: "/images/destinations/varanasi.jpg",
    content: [
      "Varanasi est une ville intense : les ghats du Gange, les cérémonies et la vie quotidienne s'entrelacent depuis des millénaires.",
      "Le lever du soleil en bateau et l'aarti du soir à Dashashwamedh sont les moments les plus marquants — Raja vous y accompagne avec discrétion.",
      "Prévoir 3 à 5 jours permet de sentir la ville sans précipitation, avec une excursion à Sarnath.",
      "Varanasi se combine très bien avec le Triangle d'Or ou un circuit Rajasthan.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
