export type GuideSection = {
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
};

export type TravelGuide = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  intro: string[];
  sections: GuideSection[];
  relatedHref: string;
  relatedLabel: string;
};

export const travelGuides: TravelGuide[] = [
  {
    slug: "carte-interactive-rajasthan",
    title: "Carte interactive du Rajasthan",
    shortTitle: "Explorer le Rajasthan",
    description:
      "Suivez les routes du Rajasthan, de Delhi au désert du Thar, et comprenez comment relier Jaipur, Jodhpur, Udaipur et Jaisalmer sans courir.",
    heroImage: "/images/destinations/rajasthan-jaisalmer.jpg",
    heroAlt: "Fort doré de Jaisalmer au Rajasthan",
    intro: [
      "Au Rajasthan, les distances ne se mesurent pas seulement en kilomètres. Elles se racontent en champs de moutarde, en dromadaires aperçus sur le bas-côté et en petites haltes où le thé arrive brûlant dans un verre minuscule.",
      "Cette carte vous aide à voir le voyage comme une route continue. Touchez une étape pour découvrir son caractère, le temps qu'elle mérite et la prochaine ville qui s'accorde naturellement avec elle.",
    ],
    sections: [
      {
        title: "La boucle qui raconte le mieux le Rajasthan",
        paragraphs: [
          "Pour une première rencontre, Delhi, Mandawa, Bikaner, Jaisalmer, Jodhpur, Udaipur, Pushkar, Jaipur et Agra forment un récit cohérent. Les paysages deviennent progressivement plus secs, les citadelles changent de couleur, puis le Taj Mahal referme le voyage comme un dernier silence.",
          "Douze à seize jours permettent de vivre cette boucle sans transformer chaque matin en départ précipité. En dessous de dix jours, mieux vaut choisir un axe plus court, par exemple Jaipur, Jodhpur et Udaipur.",
        ],
        image: "/images/destinations/pdf/jodhpur-mehrangarh.jpg",
        imageAlt: "Fort de Mehrangarh dominant Jodhpur",
      },
      {
        title: "Laisser de la place aux détours",
        paragraphs: [
          "Un itinéraire réussi ne remplit pas toutes les cases. Il garde du temps pour un marché, une cérémonie improvisée ou une soirée sur un toit. Au Rajasthan, une étape de deux nuits change souvent tout : la ville cesse d'être un décor et commence à devenir un souvenir.",
        ],
      },
    ],
    relatedHref: "/destinations/rajasthan",
    relatedLabel: "Découvrir tous nos voyages au Rajasthan",
  },
  {
    slug: "calendrier-voyage-inde",
    title: "Quand partir en Inde ? Le calendrier mois par mois",
    shortTitle: "Choisir le bon mois",
    description:
      "Un calendrier interactif pour choisir la région de l'Inde qui correspond à votre mois de départ, à votre climat idéal et à votre manière de voyager.",
    heroImage: "/images/destinations/places/kerala-houseboat.jpg",
    heroAlt: "Houseboat dans les backwaters du Kerala",
    intro: [
      "Il n'existe pas une seule bonne saison pour l'Inde. En janvier, le Rajasthan se réveille dans une lumière fraîche pendant que les plages du Kerala vivent leurs journées les plus douces. En juillet, les vallées du Ladakh s'ouvrent lorsque la mousson enveloppe une partie du pays.",
      "Choisissez un mois. Le calendrier ne vous dira pas seulement où le ciel est bleu : il vous montrera quel voyage a du sens à cette période.",
    ],
    sections: [
      {
        title: "Penser en régions, jamais en météo nationale",
        paragraphs: [
          "L'Inde est presque un continent. Les températures du désert, l'altitude himalayenne et l'humidité du Sud ne suivent pas le même rythme. Une prévision moyenne pour « l'Inde » cache donc plus qu'elle n'explique.",
          "Commencez par vos dates, puis choisissez la région. Cette logique évite de forcer une destination au mauvais moment et révèle parfois un voyage auquel vous n'aviez pas pensé.",
        ],
        image: "/images/destinations/ladakh-2.jpg",
        imageAlt: "Route de montagne au Ladakh",
      },
      {
        title: "La saison parfaite dépend aussi de vous",
        paragraphs: [
          "Certains voyageurs aiment les matinées fraîches, d'autres préfèrent la chaleur et les paysages très verts. Les périodes intermédiaires offrent souvent moins de monde, mais demandent davantage de souplesse. Votre meilleur mois est celui qui convient à votre rythme, pas celui qu'un tableau qualifie simplement de parfait.",
        ],
      },
    ],
    relatedHref: "/destinations",
    relatedLabel: "Comparer les destinations",
  },
  {
    slug: "checklist-valise-inde",
    title: "La checklist complète pour préparer sa valise en Inde",
    shortTitle: "Préparer sa valise",
    description:
      "Une liste interactive, pensée pour l'Inde, à cocher avant le départ : documents, vêtements, santé, technologie et petits objets vraiment utiles.",
    heroImage: "/images/destinations/nord-delhi.jpg",
    heroAlt: "Voyageur découvrant Delhi en Inde du Nord",
    intro: [
      "La veille du départ, la valise ouverte sur le lit semble toujours trop petite. On ajoute une veste, on retire une paire de chaussures, puis on cherche le passeport que l'on avait pourtant rangé « dans un endroit sûr ».",
      "Cette checklist remet de l'ordre dans ce moment. Cochez ce qui est prêt, gardez votre progression sur cet appareil et imprimez une version simple si vous aimez préparer le voyage avec un stylo à la main.",
    ],
    sections: [
      {
        title: "Emporter moins, choisir mieux",
        paragraphs: [
          "Dans la plupart des circuits, il est possible de faire laver quelques vêtements en route. Des tenues légères, respirantes et couvrant épaules et genoux sont plus polyvalentes qu'une valise différente pour chaque journée.",
          "Gardez médicaments essentiels, documents, chargeur et une tenue de rechange dans le bagage cabine. Le reste peut attendre ; ces quelques objets, non.",
        ],
        image: "/images/destinations/places/jaipur-hawa.jpg",
        imageAlt: "Façade du Hawa Mahal à Jaipur",
      },
      {
        title: "Adapter la liste au voyage réel",
        paragraphs: [
          "Le Ladakh demande des couches chaudes et une protection solaire sérieuse. Le Kerala appelle des tissus légers et une protection contre la pluie. Un safari commence tôt, souvent dans le froid. Utilisez la checklist comme une base, puis laissez votre itinéraire décider des derniers objets.",
        ],
      },
    ],
    relatedHref: "/contact",
    relatedLabel: "Faire vérifier mon projet de voyage",
  },
  {
    slug: "premier-voyage-inde",
    title: "Premier voyage en Inde : le guide qui vous accompagne vraiment",
    shortTitle: "Réussir un premier voyage",
    description:
      "Un guide rassurant et concret pour préparer une première arrivée en Inde, trouver le bon rythme et transformer l'inconnu en plaisir de voyager.",
    heroImage: "/images/destinations/places/taj-reflect.jpg",
    heroAlt: "Taj Mahal se reflétant dans le bassin central",
    intro: [
      "La porte de l'aéroport s'ouvre. L'air est plus chaud, les klaxons composent une musique inconnue et, pendant quelques secondes, tout semble arriver en même temps. C'est souvent ainsi que commence un premier voyage en Inde : avec une intensité qui déroute avant de devenir fascinante.",
      "Ce guide a été conçu pour ce passage précis. Il vous aide à préparer l'essentiel sans chercher à contrôler chaque minute, puis à trouver le rythme qui permet d'aimer le pays plutôt que de simplement le traverser.",
    ],
    sections: [
      {
        title: "Les premiers jours donnent le ton",
        paragraphs: [
          "Évitez de prévoir une longue route immédiatement après un vol de nuit. Une première journée légère, un hôtel bien situé et une personne attendue à l'arrivée retirent beaucoup de fatigue mentale.",
          "Commencez par regarder. Un marché, un chai, quelques mots échangés avec un chauffeur : ces détails apprennent davantage sur le pays qu'une course entre cinq monuments.",
        ],
        image: "/images/destinations/places/delhi-india-gate.jpg",
        imageAlt: "India Gate à Delhi",
      },
      {
        title: "Accepter que tout ne ressemble pas à chez soi",
        paragraphs: [
          "Les temps de route peuvent bouger, les repas arrivent parfois dans un autre ordre et une rue calme peut devenir animée en quelques minutes. Ce n'est pas un défaut du voyage : c'est une partie de son langage.",
          "Un itinéraire préparé avec quelqu'un qui connaît le terrain conserve cette spontanéité tout en protégeant les éléments importants : transferts, hébergements, étapes et temps de repos.",
        ],
      },
      {
        title: "Comprendre le pays avant de le parcourir",
        paragraphs: [
          "L'Inde réunit de nombreuses langues, cuisines, religions et histoires régionales. Passer du Rajasthan au Kerala, ou de Delhi à Varanasi, ne consiste pas seulement à changer de paysage : chaque étape révèle une autre manière de vivre, de recevoir et de raconter le pays.",
        ],
      },
    ],
    relatedHref: "/creer-mon-itineraire",
    relatedLabel: "Créer mon premier itinéraire en Inde",
  },
  {
    slug: "calendrier-festivals-inde",
    title: "Le calendrier des festivals en Inde",
    shortTitle: "Voyager au rythme des fêtes",
    description:
      "Holi, Diwali, Pushkar, Onam et fêtes himalayennes : découvrez les grands rendez-vous indiens et la manière juste de les intégrer à un voyage.",
    heroImage: "/images/destinations/rajasthan-jaipur.jpg",
    heroAlt: "Architecture colorée de Jaipur au Rajasthan",
    intro: [
      "Un matin ordinaire peut soudain changer de couleur. Une rue se couvre de fleurs, les familles allument des lampes devant les maisons et un tambour attire tout un quartier. En Inde, les fêtes ne sont pas seulement des dates : elles transforment les villes et la façon de les habiter.",
      "Explorez le calendrier par saison. Les dates exactes de nombreuses fêtes suivent des calendriers lunaires ou locaux ; elles doivent toujours être confirmées avant de réserver.",
    ],
    sections: [
      {
        title: "Assister sans transformer la fête en spectacle",
        paragraphs: [
          "Demandez avant de photographier, observez la manière dont les habitants participent et acceptez que certains espaces restent privés. Une tenue adaptée et quelques explications données par un guide changent profondément l'expérience.",
          "Les grandes fêtes attirent aussi beaucoup de monde. Il faut réserver plus tôt, prévoir des temps de circulation plus longs et parfois choisir une ville secondaire pour vivre une célébration plus humaine.",
        ],
        image: "/images/destinations/pdf/pushkar-lake.jpg",
        imageAlt: "Lac sacré de Pushkar au Rajasthan",
      },
      {
        title: "Construire le voyage autour d'un moment, pas d'une seule date",
        paragraphs: [
          "Une fête peut devenir le cœur d'un itinéraire, mais elle ne devrait pas en être l'unique raison. Entourez-la de deux ou trois étapes complémentaires : villes patrimoniales, campagne, nature ou quelques journées plus lentes.",
        ],
      },
    ],
    relatedHref: "/contact",
    relatedLabel: "Organiser un voyage autour d'un festival",
  },
  {
    slug: "temps-trajets-inde",
    title: "Temps de trajet entre les grandes villes d'Inde",
    shortTitle: "Comprendre les distances",
    description:
      "Comparez des temps de route indicatifs entre les principales étapes et construisez un itinéraire indien qui respire vraiment.",
    heroImage: "/images/destinations/maps/rajasthan-itinerary.png",
    heroAlt: "Carte d'un itinéraire à travers le Rajasthan",
    intro: [
      "Sur une carte, Jaipur et Jodhpur semblent voisines. Sur la route, la journée déroule des villages, des camions peints, des troupeaux et des pauses imprévues. Le temps vécu n'est jamais exactement celui tracé par une ligne droite.",
      "Choisissez deux villes pour obtenir un ordre de grandeur. Ces durées sont volontairement indicatives : circulation, météo, travaux, saison et pauses peuvent les modifier.",
    ],
    sections: [
      {
        title: "Une étape de route fait partie du voyage",
        paragraphs: [
          "Avec un chauffeur privé, une longue liaison peut inclure un temple, un déjeuner simple ou une petite ville que les circuits pressés ignorent. Le trajet cesse d'être un vide entre deux hôtels.",
          "Mais il faut rester réaliste. Après six heures de route, une visite majeure mérite rarement d'être ajoutée au programme. Une arrivée tranquille et une promenade au coucher du soleil produisent souvent un meilleur souvenir.",
        ],
        image: "/images/destinations/pdf/mandawa-haveli.jpg",
        imageAlt: "Haveli peinte de Mandawa",
      },
      {
        title: "Alterner mouvement et respiration",
        paragraphs: [
          "Après deux journées avec changement d'hôtel, prévoyez si possible une étape de deux nuits. Ce rythme protège l'énergie, laisse une place aux rencontres et rend le voyage plus agréable pour les enfants comme pour les adultes.",
        ],
      },
    ],
    relatedHref: "/creer-mon-itineraire",
    relatedLabel: "Construire un itinéraire réaliste",
  },
  {
    slug: "quelle-region-inde",
    title: "Quelle région de l'Inde est faite pour vous ?",
    shortTitle: "Trouver votre Inde",
    description:
      "Répondez à quelques questions sur votre rythme, vos paysages et vos envies pour découvrir la région indienne qui correspond à votre voyage.",
    heroImage: "/images/destinations/places/prayer-flags.jpg",
    heroAlt: "Drapeaux de prière dans l'Himalaya indien",
    intro: [
      "Certains rêvent de palais couleur miel et de nuits dans le désert. D'autres imaginent des montagnes silencieuses, des rizières, des temples ou le mouvement hypnotique du Gange. Toutes ces images appartiennent à l'Inde, mais elles ne racontent pas le même voyage.",
      "Ce quiz ne décide pas à votre place. Il écoute simplement ce qui vous attire et vous ouvre une première porte.",
    ],
    sections: [
      {
        title: "Il existe plusieurs premières fois en Inde",
        paragraphs: [
          "Le Triangle d'Or offre des repères célèbres et une entrée intense. Le Rajasthan développe un grand récit de palais, de désert et de villes anciennes. Le Kerala ralentit le voyage entre végétation, eau et cuisine du Sud. Le Ladakh demande plus d'adaptation, mais offre une sensation d'espace incomparable.",
          "Votre résultat est un point de départ. La saison, la durée et votre manière de voyager peuvent ensuite rapprocher plusieurs régions dans un même itinéraire.",
        ],
        image: "/images/destinations/places/kerala-canoe.jpg",
        imageAlt: "Canoë dans la végétation du Kerala",
      },
      {
        title: "Le meilleur voyage est celui qui vous ressemble",
        paragraphs: [
          "Un itinéraire sur mesure ne consiste pas à ajouter davantage d'étapes. Il consiste à choisir les bonnes, puis à leur donner assez de temps. Utilisez le résultat pour commencer la conversation, pas pour enfermer votre voyage dans une catégorie.",
        ],
      },
    ],
    relatedHref: "/creer-mon-itineraire",
    relatedLabel: "Transformer mon résultat en itinéraire",
  },
];

export function getGuideBySlug(slug: string): TravelGuide | undefined {
  return travelGuides.find((guide) => guide.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return travelGuides.map((guide) => guide.slug);
}
