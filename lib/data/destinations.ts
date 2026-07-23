export interface DestinationItinerary {
  slug: string;
  title: string;
  days: number;
  priceFrom: number;
  summary: string;
  highlights: string[];
  image: string;
}


export interface DestinationPlace {
  name: string;
  description: string;
  image: string;
}

export interface DestinationPage {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  gallery: { src: string; alt: string }[];
  intro: string[];
  highlights: string[];
  bestSeason: string;
  cities: string[];
  /** Detailed static map image of the region */
  mapImage: string;
  mapCaption: string;
  /** Optional coords for “open full map” link */
  map: {
    lat: number;
    lng: number;
  };
  /** Cities / sites with written content + photo */
  places: DestinationPlace[];
  itineraries: DestinationItinerary[];
  blogKeywords: string[];
}

export const destinationPages: DestinationPage[] = [
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "Palais, désert du Thar et cités royales",
    heroImage: "/images/destinations/rajasthan.jpg",
    gallery: [
      { src: "/images/destinations/place-jaipur.jpg", alt: "Fort Amber à Jaipur" },
      { src: "/images/destinations/rajasthan.jpg", alt: "Hawa Mahal, Jaipur" },
      { src: "/images/hotels/resort-udaivilas-wide.jpg", alt: "Palais et lacs d'Udaipur" },
      { src: "/images/hotels/camping-sand-dunes.jpg", alt: "Dunes du désert du Thar" },
    ],
    intro: [
      "Le Rajasthan, « pays des rois », est la destination favorite des voyageurs français en Inde. Forts majestueux, palais de maharajas, dunes dorées du Thar et bazars colorés composent un voyage inoubliable.",
      "De Jaipur la rose à Udaipur la romantique, en passant par la ville bleue de Jodhpur et le fort doré de Jaisalmer, chaque cité raconte une histoire. Raja construit votre circuit selon vos envies — culture, désert, heritage hotels ou rythme familial.",
      "Les distances sont importantes : un bon guide local optimise les étapes, choisit les bons hôtels et ouvre des portes hors des bus de touristes.",
    ],
    highlights: [
      "Jaipur — Fort Amber et Hawa Mahal",
      "Jodhpur — Mehrangarh et la ville bleue",
      "Jaisalmer — dunes et fort doré",
      "Udaipur — lacs et palais romantiques",
      "Safaris chameau et nuits dans le désert",
    ],
    bestSeason: "Octobre à mars",
    cities: ["Jaipur", "Jodhpur", "Jaisalmer", "Udaipur", "Pushkar", "Bikaner"],
    mapImage: "/images/destinations/maps/rajasthan.jpg",
    map: {
      lat: 26.9124,
      lng: 75.7873,
    },
    mapCaption: "Le Rajasthan au nord-ouest de l'Inde — situer Jaipur, Jodhpur, Jaisalmer et Udaipur sur votre futur circuit.",
    places: [
      {
        name: "Fort Amber — Jaipur",
        description:
          "Le fort le plus visité du Rajasthan domine le lac Maota. Remparts, cours intérieures et Sheesh Mahal aux mille miroirs : deux heures d'immersion dans l'architecture rajput.",
        image: "/images/destinations/places/jaipur-amber.jpg",
      },
      {
        name: "Hawa Mahal — Jaipur",
        description:
          "Le « palais des vents » et ses 953 jharokhas est l'icône de la ville rose. Meilleure lumière tôt le matin, depuis le café d'en face — Raja connaît le bon spot.",
        image: "/images/destinations/places/jaipur-hawa.jpg",
      },
      {
        name: "Jal Mahal — Jaipur",
        description:
          "Palais posé sur le lac Man Sagar, entouré d'oiseaux migrateurs. Un arrêt photo incontournable sur la route entre Jaipur et Amber.",
        image: "/images/destinations/places/jal-mahal.jpg",
      },
      {
        name: "Mehrangarh — Jodhpur",
        description:
          "L'un des forts les plus impressionnants d'Inde surplombe la ville bleue de 120 mètres. Musée remarquable et vue panoramique sur les maisons indigo.",
        image: "/images/destinations/places/mehrangarh.jpg",
      },
      {
        name: "Jaisalmer & dunes du Thar",
        description:
          "Fort doré, havelis sculptées puis coucher de soleil sur les dunes de Sam ou Khuri. La nuit en camp dans le désert reste le souvenir le plus cité de nos voyageurs.",
        image: "/images/hotels/camping-sand-dunes.jpg",
      },
      {
        name: "City Palace — Udaipur",
        description:
          "Le plus grand palais du Rajasthan s'étire le long du lac Pichola. Cours, miniatures et balcons sur l'eau : la visite phare de la cité romantique.",
        image: "/images/destinations/places/udaipur-city-palace.jpg",
      },
      {
        name: "Lac Pichola — Udaipur",
        description:
          "Balade en barque au crépuscule face au Lake Palace et aux ghats. Le moment le plus doux d'un circuit Rajasthan — parfait pour conclure le voyage.",
        image: "/images/hotels/resort-udaivilas-wide.jpg",
      },
      {
        name: "Pushkar",
        description:
          "Petite ville sainte autour de son lac sacré, entre ghats, temples et bazars. En novembre, la foire aux chameaux attire des visiteurs du monde entier.",
        image: "/images/destinations/places/pushkar.jpg",
      },
      {
        name: "Ranthambore",
        description:
          "L'ancien terrain de chasse des maharajas est aujourd'hui l'un des meilleurs endroits d'Inde pour apercevoir le tigre du Bengale en safari.",
        image: "/images/destinations/places/tiger.jpg",
      },
    ],
    itineraries: [
      {
        slug: "tour-inde-du-nord-16-jours",
        title: "Tour de l'Inde du Nord — 16 jours",
        days: 16,
        priceFrom: 2450,
        summary: "Delhi, les cités royales et le désert du Rajasthan, Agra, Orchha, Khajuraho et Bénarès avec guide francophone.",
        highlights: ["Rajasthan", "Taj Mahal", "Désert du Thar", "Bénarès"],
        image: "/images/destinations/rajasthan.jpg",
      },
      {
        slug: "rajasthan-classique-10-jours",
        title: "Rajasthan classique — 10 jours",
        days: 10,
        priceFrom: 1980,
        summary: "Les cités royales essentielles : Jaipur, Jodhpur et Udaipur, sans précipitation.",
        highlights: ["Amber Fort", "Mehrangarh", "Lac Pichola"],
        image: "/images/destinations/place-jaipur.jpg",
      },
      {
        slug: "rajasthan-desert-8-jours",
        title: "Rajasthan & désert — 8 jours",
        days: 8,
        priceFrom: 1650,
        summary: "Focus désert : Jaisalmer, dunes du Thar et nuit sous les étoiles.",
        highlights: ["Camp de dunes", "Fort doré", "Villages"],
        image: "/images/hotels/camping-sand-dunes.jpg",
      },
    ],
    blogKeywords: ["rajasthan", "jaipur", "désert", "jodhpur"],
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    tagline: "Himalaya, monastères et paysages lunaires",
    heroImage: "/images/destinations/ladakh.jpg",
    gallery: [
      { src: "/images/destinations/ladakh.jpg", alt: "Paysages du Ladakh" },
      { src: "/images/destinations/ladakh-2.jpg", alt: "Route himalayenne au Ladakh" },
      { src: "/images/destinations/ladakh-3.jpg", alt: "Sommets du Ladakh" },
      { src: "/images/destinations/place-nepal.jpg", alt: "Lumières d'altitude himalayennes" },
    ],
    intro: [
      "Le Ladakh offre l'un des décors les plus saisissants d'Asie : déserts d'altitude, lacs turquoise, monastères tibétains et villages isolés entre 3 500 et 5 000 mètres.",
      "Accessible surtout de juin à septembre, la région demande une acclimatation sérieuse. Raja prévoit des journées douces à Leh avant Nubra ou Pangong, avec chauffeurs habitués aux cols.",
      "C'est un voyage d'aventure maîtrisé : paysages lunaires, culture bouddhiste vivante, et silence des hauts plateaux.",
    ],
    highlights: [
      "Leh et le palais royal",
      "Vallée de Nubra et dunes de Hunder",
      "Lac Pangong Tso",
      "Monastères de Hemis, Thiksey et Diskit",
      "Routes de cols mythiques",
    ],
    bestSeason: "Juin à septembre",
    cities: ["Leh", "Nubra", "Pangong", "Alchi", "Khardung La"],
    mapImage: "/images/destinations/maps/ladakh.jpg",
    map: {
      lat: 34.1526,
      lng: 77.5771,
    },
    mapCaption: "Le Ladakh au nord de l'Inde — Leh comme base, puis Nubra et Pangong vers l'est.",
    places: [
      {
        name: "Leh",
        description:
          "Capitale du Ladakh à 3 500 m : palais royal, bazar et lumière d'altitude. Deux jours d'acclimatation ici préparent tout le reste du circuit.",
        image: "/images/destinations/ladakh.jpg",
      },
      {
        name: "Monastère de Thiksey",
        description:
          "Le plus photogénique des monastères de la vallée de l'Indus, étagé comme un petit Potala. La prière de l'aube, au son des conques, est un moment rare.",
        image: "/images/destinations/places/thiksey.jpg",
      },
      {
        name: "Monastère de Hemis",
        description:
          "Le plus grand monastère du Ladakh, niché dans une gorge. Moulins à prières, fresques anciennes et grand festival masqué en été.",
        image: "/images/destinations/places/prayer-wheels.jpg",
      },
      {
        name: "Khardung La",
        description:
          "L'une des plus hautes routes carrossables du monde, à plus de 5 300 m. Le passage obligé — et spectaculaire — vers la vallée de Nubra.",
        image: "/images/destinations/places/himalaya-pass.jpg",
      },
      {
        name: "Vallée de Nubra",
        description:
          "Dunes de sable, chameaux de Bactriane et monastère de Diskit : un désert froid verdoyant, encadré de sommets — l'étape la plus contrastée du Ladakh.",
        image: "/images/destinations/places/nubra.jpg",
      },
      {
        name: "Lac Pangong",
        description:
          "Lac turquoise à plus de 4 000 m, aux couleurs changeantes selon l'heure. Une journée (ou une nuit en camp) qui marque durablement.",
        image: "/images/destinations/places/pangong.jpg",
      },
      {
        name: "Vallée de Sham & Alchi",
        description:
          "La « vallée des abricotiers », plus basse et plus douce : monastère d'Alchi aux peintures millénaires, villages et confluent Indus-Zanskar.",
        image: "/images/destinations/ladakh-2.jpg",
      },
      {
        name: "Lamayuru",
        description:
          "Paysages « lunaires » spectaculaires autour de l'un des plus anciens monastères du Ladakh, sur la route de Kargil.",
        image: "/images/destinations/ladakh-3.jpg",
      },
    ],
    itineraries: [
      {
        slug: "tour-ladakh-14-jours",
        title: "Tour du Ladakh — 14 jours",
        days: 14,
        priceFrom: 2100,
        summary: "Leh et les monastères de l'Indus, la Nubra par le Khardung La, et les lacs Tso Moriri et Tso Kar.",
        highlights: ["Monastères", "Khardung La", "Nubra", "Lacs d'altitude"],
        image: "/images/destinations/places/pangong.jpg",
      },
      {
        slug: "ladakh-essentiel-8-jours",
        title: "Ladakh essentiel — 8 jours",
        days: 8,
        priceFrom: 1750,
        summary: "Découverte concentrée de Leh et des monastères environnants.",
        highlights: ["Leh", "Thiksey", "Sham Valley"],
        image: "/images/destinations/ladakh-2.jpg",
      },
      {
        slug: "ladakh-trekking-12-jours",
        title: "Ladakh & trekking — 12 jours",
        days: 12,
        priceFrom: 2480,
        summary: "Circuit culturel + trek doux pour voyageurs sportifs.",
        highlights: ["Trek", "Lacs", "Villages"],
        image: "/images/destinations/place-nepal.jpg",
      },
    ],
    blogKeywords: ["ladakh", "himalaya", "leh"],
  },
  {
    slug: "nord",
    name: "L'Inde du Nord",
    tagline: "Delhi, Taj Mahal et trésors du nord indien",
    heroImage: "/images/destinations/nord.jpg",
    gallery: [
      { src: "/images/destinations/nord.jpg", alt: "India Gate, New Delhi" },
      { src: "/images/destinations/triangle-dor.jpg", alt: "Taj Mahal à Agra" },
      { src: "/images/destinations/place-jaipur.jpg", alt: "Fort Amber à Jaipur" },
      { src: "/images/destinations/varanasi.jpg", alt: "Ghats de Varanasi" },
    ],
    intro: [
      "L'Inde du Nord concentre les icônes : Delhi cosmopolite, le Taj Mahal à Agra, Jaipur la rose, et souvent une extension vers Varanasi ou le Rajasthan.",
      "C'est le meilleur point d'entrée pour une première découverte. Les distances sont gérables en une à deux semaines, avec un rythme confortable et des hôtels bien choisis.",
      "Raja affine chaque étape : Old Delhi authentique, lever de soleil au Taj, et Jaipur hors des grands bus.",
    ],
    highlights: [
      "Old Delhi et New Delhi",
      "Taj Mahal au lever du soleil",
      "Fort d'Agra et Fatehpur Sikri",
      "Jaipur et Amber Fort",
      "Extension possible vers Varanasi",
    ],
    bestSeason: "Octobre à mars",
    cities: ["Delhi", "Agra", "Jaipur", "Varanasi", "Amritsar"],
    mapImage: "/images/destinations/maps/nord.jpg",
    map: {
      lat: 28.6139,
      lng: 77.209,
    },
    mapCaption: "Le nord de l'Inde — Delhi comme hub, puis Agra, Jaipur et éventuellement Varanasi.",
    places: [
      {
        name: "Delhi",
        description:
          "India Gate, Old Delhi et ses bazars, Jama Masjid : la capitale mérite 1 à 2 jours pour entrer dans le rythme du pays avant de partir vers Agra.",
        image: "/images/destinations/places/delhi-india-gate.jpg",
      },
      {
        name: "Taj Mahal — Agra",
        description:
          "Le chef-d'œuvre moghol, à découvrir au lever du soleil pour éviter la foule. L'émotion la plus forte d'un premier voyage en Inde.",
        image: "/images/destinations/places/taj-classic.jpg",
      },
      {
        name: "Fatehpur Sikri",
        description:
          "Capitale abandonnée d'Akbar, classée UNESCO, sur la route entre Agra et Jaipur. Le Buland Darwaza, porte monumentale de grès rouge, coupe le souffle.",
        image: "/images/destinations/places/fatehpur-sikri.jpg",
      },
      {
        name: "Jaipur",
        description:
          "La ville rose ferme le Triangle d'Or : Fort Amber, Hawa Mahal, City Palace et bazars de bijoux — et ouvre la route du Grand Rajasthan.",
        image: "/images/destinations/place-jaipur.jpg",
      },
      {
        name: "Varanasi",
        description:
          "Les ghats du Gange, la ville sacrée la plus intense d'Inde. Balade en bateau à l'aube et aarti du soir : une immersion spirituelle inoubliable.",
        image: "/images/destinations/places/varanasi-ghats.jpg",
      },
      {
        name: "Sarnath",
        description:
          "À quelques kilomètres de Varanasi, le lieu du premier enseignement du Bouddha. Stupa de Dhamek, musée et jardins paisibles.",
        image: "/images/destinations/places/sarnath.jpg",
      },
      {
        name: "Amritsar",
        description:
          "Le Temple d'Or des sikhs, posé sur son bassin sacré, est l'un des lieux les plus émouvants d'Inde. Ne manquez pas le repas communautaire du langar.",
        image: "/images/destinations/places/amritsar.jpg",
      },
      {
        name: "Rishikesh",
        description:
          "Capitale mondiale du yoga, au bord du Gange à la sortie de l'Himalaya. Ashrams, ponts suspendus et aarti au bord de l'eau.",
        image: "/images/destinations/places/rishikesh.jpg",
      },
      {
        name: "Shimla",
        description:
          "Ancienne capitale d'été du Raj britannique, étagée à 2 200 m dans les contreforts himalayens. Train à vapeur, promenades et fraîcheur.",
        image: "/images/destinations/places/shimla.jpg",
      },
      {
        name: "Gwalior",
        description:
          "Un fort colossal aux tours ornées de mosaïques bleues, souvent ignoré des circuits classiques — parfait entre Agra et Khajuraho.",
        image: "/images/destinations/places/gwalior.jpg",
      },
    ],
    itineraries: [
      {
        slug: "tour-triangle-dor-5-jours",
        title: "Le Triangle d'Or — 5 jours",
        days: 5,
        priceFrom: 1100,
        summary:
          "Delhi, Jaipur et Agra : le circuit essentiel de l'Inde du Nord, du Vieux Delhi au Taj Mahal.",
        highlights: ["Taj Mahal", "Fort d'Amber", "Fatehpur Sikri"],
        image: "/images/destinations/triangle-dor.jpg",
      },
      {
        slug: "nord-complet-12-jours",
        title: "Grand Nord — 12 jours",
        days: 12,
        priceFrom: 2200,
        summary: "Triangle d'Or prolongé vers Varanasi et la spiritualité du Gange.",
        highlights: ["Taj Mahal", "Varanasi", "Jaipur"],
        image: "/images/destinations/varanasi.jpg",
      },
      {
        slug: "nord-famille-10-jours",
        title: "Inde du Nord en famille — 10 jours",
        days: 10,
        priceFrom: 1850,
        summary: "Rythme doux, hôtels confortables et expériences adaptées aux enfants.",
        highlights: ["Delhi", "Agra", "Jaipur"],
        image: "/images/destinations/nord.jpg",
      },
    ],
    blogKeywords: ["nord", "delhi", "agra", "taj", "triangle"],
  },
  {
    slug: "sud",
    name: "L'Inde du Sud",
    tagline: "Kerala, Tamil Nadu et backwaters tropicaux",
    heroImage: "/images/destinations/sud.jpg",
    gallery: [
      { src: "/images/destinations/kerala.jpg", alt: "Houseboat sur les backwaters" },
      { src: "/images/destinations/sud.jpg", alt: "Backwaters du Kerala" },
      { src: "/images/destinations/kerala-2.jpg", alt: "Canaux du Kerala" },
      { src: "/images/destinations/goa.jpg", alt: "Côtes du sud de l'Inde" },
    ],
    intro: [
      "L'Inde du Sud séduit par sa douceur : backwaters du Kerala, plantations de thé de Munnar, temples du Tamil Nadu et plages de Varkala ou Kovalam.",
      "Plus verdoyante et souvent plus zen que le Nord, elle convient parfaitement en circuit dédié ou après un Rajasthan.",
      "Raja compose des itinéraires fluides entre Kochi, Alleppey, Munnar et, selon vos envies, Madurai, Pondichéry ou Hampi.",
    ],
    highlights: [
      "Houseboat sur les backwaters",
      "Munnar et plantations de thé",
      "Temples de Madurai ou Hampi",
      "Plages du Kerala",
      "Ayurveda et spas",
    ],
    bestSeason: "Novembre à février",
    cities: ["Kochi", "Alleppey", "Munnar", "Madurai", "Pondichéry", "Hampi"],
    mapImage: "/images/destinations/maps/sud.jpg",
    map: {
      lat: 9.9312,
      lng: 76.2673,
    },
    mapCaption: "Le sud de l'Inde — Kerala côtier, collines de Munnar et temples du Tamil Nadu.",
    places: [
      {
        name: "Kochi (Cochin)",
        description:
          "Porte d'entrée du Kerala : filets de pêche chinois, Fort Kochi colonial, églises et synagogues. Une ambiance maritime unique pour démarrer.",
        image: "/images/destinations/places/kochi.jpg",
      },
      {
        name: "Alleppey & backwaters",
        description:
          "L'expérience signature du Sud : nuit en houseboat, villages d'eau, cocotiers et rythme lent. Raja sélectionne des bateaux confortables, pas les plus bondés.",
        image: "/images/destinations/places/kerala-houseboat.jpg",
      },
      {
        name: "Villages des canaux",
        description:
          "En pirogue sur les petits canaux, loin des grands bateaux : rizières, martin-pêcheurs et vie quotidienne au fil de l'eau.",
        image: "/images/destinations/places/kerala-canoe.jpg",
      },
      {
        name: "Munnar",
        description:
          "Dans les Western Ghats, des collines de thé à perte de vue. Air frais, brume matinale et plantations : le contraste parfait après la côte.",
        image: "/images/destinations/places/munnar.jpg",
      },
      {
        name: "Thekkady (Périyar)",
        description:
          "Réserve de tigres autour d'un lac de montagne : balades en bateau, plantations d'épices et forêts des Ghats occidentaux.",
        image: "/images/destinations/places/tiger.jpg",
      },
      {
        name: "Madurai",
        description:
          "Le temple de Meenakshi et ses gopurams multicolores, cœur spirituel du Tamil Nadu. La cérémonie du soir est un moment fort.",
        image: "/images/destinations/places/meenakshi.jpg",
      },
      {
        name: "Temples du Tamil Nadu",
        description:
          "De Thanjavur à Chidambaram, les tours-portes sculptées des temples dravidiens rythment la route — un autre visage de l'Inde du Sud.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        name: "Hampi",
        description:
          "Les ruines de l'empire de Vijayanagara, éparpillées dans un paysage de rochers granitiques surréaliste. Classé UNESCO, inoubliable à vélo.",
        image: "/images/destinations/places/hampi.jpg",
      },
      {
        name: "Varkala & les plages",
        description:
          "Falaises rouges, ayurveda et océan Indien pour terminer en douceur : 2 à 3 nuits de détente idéales en fin de circuit.",
        image: "/images/destinations/goa.jpg",
      },
    ],
    itineraries: [
      {
        slug: "voyage-kerala-10-jours",
        title: "Kerala nature & détente — 10 jours",
        days: 10,
        priceFrom: 1890,
        summary: "Backwaters en houseboat, Munnar et plages du Kerala.",
        highlights: ["Houseboat", "Munnar", "Plages"],
        image: "/images/destinations/kerala.jpg",
      },
      {
        slug: "sud-temples-12-jours",
        title: "Sud temples & Kerala — 12 jours",
        days: 12,
        priceFrom: 2150,
        summary: "Tamil Nadu spirituel puis douceur des backwaters.",
        highlights: ["Madurai", "Pondichéry", "Alleppey"],
        image: "/images/destinations/sud.jpg",
      },
      {
        slug: "sud-ayurveda-8-jours",
        title: "Kerala ayurveda — 8 jours",
        days: 8,
        priceFrom: 1680,
        summary: "Cure et repos dans un cadre tropical, rythme très doux.",
        highlights: ["Ayurveda", "Backwaters", "Spa"],
        image: "/images/destinations/kerala-2.jpg",
      },
    ],
    blogKeywords: ["kerala", "sud", "backwaters", "munnar"],
  },
  {
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    tagline: "Cœur de l'Inde — temples, forêts et patrimoine",
    heroImage: "/images/destinations/place-jaipur.jpg",
    gallery: [
      { src: "/images/destinations/place-jaipur.jpg", alt: "Architecture et patrimoine de l'Inde centrale" },
      { src: "/images/destinations/rajasthan-2.jpg", alt: "Forts et temples" },
      { src: "/images/hotels/heritage-rambagh.jpg", alt: "Hébergements heritage" },
      { src: "/images/destinations/varanasi.jpg", alt: "Spiritualité indienne" },
    ],
    intro: [
      "Le Madhya Pradesh, cœur géographique de l'Inde, reste hors des circuits de masse — et c'est sa force. Khajuraho (UNESCO), Orchha, Bhopal, Sanchi et les parcs à tigres offrent une Inde authentique.",
      "Moins fréquenté que le Rajasthan, il séduit les voyageurs qui veulent du patrimoine fort et de la nature, sans la densité touristique des grandes étapes.",
      "Raja y conçoit des itinéraires sur mesure, souvent combinés avec Varanasi ou le Triangle d'Or.",
    ],
    highlights: [
      "Temples de Khajuraho (UNESCO)",
      "Orchha et ses cenotaphes",
      "Bhopal et Sanchi",
      "Parcs de Kanha ou Bandhavgarh",
      "Artisanat et villages",
    ],
    bestSeason: "Octobre à mars",
    cities: ["Khajuraho", "Orchha", "Bhopal", "Sanchi", "Kanha"],
    mapImage: "/images/destinations/maps/madhya-pradesh.jpg",
    map: {
      lat: 24.8318,
      lng: 79.9199,
    },
    mapCaption: "Le Madhya Pradesh au centre de l'Inde — Khajuraho, Orchha et Bhopal comme axes principaux.",
    places: [
      {
        name: "Khajuraho",
        description:
          "Les temples aux sculptures célèbres dans le monde entier, classés UNESCO. Une étape culturelle majeure, loin des foules du Taj.",
        image: "/images/destinations/places/khajuraho.jpg",
      },
      {
        name: "Orchha",
        description:
          "Petite cité endormie sur la Betwa : palais, cenotaphes et ambiance de village. Une nuit calme idéale entre Gwalior et Khajuraho.",
        image: "/images/destinations/places/orchha.jpg",
      },
      {
        name: "Gwalior",
        description:
          "Un fort colossal aux tours ornées de mosaïques bleues et de palais rajput — l'une des plus belles forteresses d'Inde, encore préservée du tourisme de masse.",
        image: "/images/destinations/places/gwalior.jpg",
      },
      {
        name: "Sanchi",
        description:
          "Le grand stupa bouddhiste et ses portiques sculptés, joyau UNESCO vieux de 2 000 ans, à une heure de Bhopal.",
        image: "/images/destinations/places/sanchi.jpg",
      },
      {
        name: "Kanha & Bandhavgarh",
        description:
          "Les parcs qui ont inspiré le Livre de la Jungle : safaris à l'aube parmi les plus fortes densités de tigres du pays.",
        image: "/images/destinations/places/tiger.jpg",
      },
    ],
    itineraries: [
      {
        slug: "voyage-madhya-pradesh-10-jours",
        title: "Madhya Pradesh — 10 jours",
        days: 10,
        priceFrom: 1750,
        summary: "Khajuraho, Orchha, Bhopal et temples de l'Inde centrale.",
        highlights: ["Khajuraho", "Orchha", "Sanchi"],
        image: "/images/destinations/place-jaipur.jpg",
      },
      {
        slug: "mp-safari-8-jours",
        title: "Madhya Pradesh safari — 8 jours",
        days: 8,
        priceFrom: 1920,
        summary: "Temples et safari tigre dans les parcs nationaux.",
        highlights: ["Kanha", "Bandhavgarh", "Nature"],
        image: "/images/destinations/ladakh-3.jpg",
      },
      {
        slug: "mp-patrimoine-7-jours",
        title: "Patrimoine central — 7 jours",
        days: 7,
        priceFrom: 1450,
        summary: "Focus UNESCO : Khajuraho, Orchha et Sanchi.",
        highlights: ["UNESCO", "Temples", "Orchha"],
        image: "/images/destinations/rajasthan-2.jpg",
      },
    ],
    blogKeywords: ["madhya", "khajuraho", "orchha", "centrale"],
  },
  {
    slug: "nepal",
    name: "Népal",
    tagline: "Kathmandou, Annapurna et Himalaya népalais",
    heroImage: "/images/destinations/nepal.jpg",
    gallery: [
      { src: "/images/destinations/nepal.jpg", alt: "Stupa de Boudhanath, Kathmandou" },
      { src: "/images/destinations/place-nepal.jpg", alt: "Paysages himalayens" },
      { src: "/images/destinations/ladakh.jpg", alt: "Haute montagne" },
      { src: "/images/destinations/ladakh-3.jpg", alt: "Sommets népalais" },
    ],
    intro: [
      "Le Népal combine spiritualité bouddhiste et hindoue, vallées verdoyantes et panoramas himalayens parmi les plus beaux du monde.",
      "Kathmandou, Pokhara et Chitwan forment un circuit classique ; les trekkeurs ajoutent l'Annapurna. Raja organise visas, rythmes et hébergements adaptés.",
      "Souvent combiné avec l'Inde du Nord ou le Bhoutan pour un grand voyage himalayen.",
    ],
    highlights: [
      "Vallée de Kathmandou",
      "Boudhanath et Pashupatinath",
      "Pokhara et lac Phewa",
      "Parc de Chitwan",
      "Treks Annapurna (option)",
    ],
    bestSeason: "Octobre à novembre · Mars à avril",
    cities: ["Kathmandou", "Pokhara", "Chitwan", "Bhaktapur", "Patan"],
    mapImage: "/images/destinations/maps/nepal.jpg",
    map: {
      lat: 27.7172,
      lng: 85.324,
    },
    mapCaption: "Le Népal au nord de l'Inde — Kathmandou au centre, Pokhara à l'ouest, Chitwan au sud.",
    places: [
      {
        name: "Kathmandou & Boudhanath",
        description:
          "Le grand stupa aux yeux du Bouddha, Durbar Square et Pashupatinath : une capitale intense et spirituelle, point de départ de tous les circuits.",
        image: "/images/destinations/nepal.jpg",
      },
      {
        name: "Swayambhunath",
        description:
          "Le « temple des singes » domine la vallée de Kathmandou : stupa doré, drapeaux de prière et vue panoramique au coucher du soleil.",
        image: "/images/destinations/places/swayambhunath.jpg",
      },
      {
        name: "Bhaktapur",
        description:
          "La plus préservée des trois cités royales de la vallée : places médiévales, pagodes à cinq toits et artisans potiers.",
        image: "/images/destinations/places/bhaktapur.jpg",
      },
      {
        name: "Pokhara & lac Phewa",
        description:
          "Au pied de l'Annapurna, barques sur le lac et vue sur le Machhapuchhre. Base idéale avant un trek — ou simple halte contemplative.",
        image: "/images/destinations/places/phewa.jpg",
      },
      {
        name: "Sanctuaire des Annapurnas",
        description:
          "Panoramas himalayens parmi les plus beaux du monde, accessibles en trek doux depuis Pokhara ou en balcon depuis Sarangkot.",
        image: "/images/destinations/place-nepal.jpg",
      },
      {
        name: "Chitwan",
        description:
          "Jungle du Teraï pour safari en jeep ou pirogue : rhinocéros unicornes, oiseaux, parfois tigre. Un contraste bienvenu après les montagnes.",
        image: "/images/destinations/places/chitwan.jpg",
      },
      {
        name: "Région de l'Everest",
        description:
          "Namche Bazaar, stupas d'altitude et vues sur le toit du monde — en trek, ou en vol panoramique au départ de Kathmandou.",
        image: "/images/destinations/places/everest-stupa.jpg",
      },
    ],
    itineraries: [
      {
        slug: "nepal-classique-10-jours",
        title: "Népal classique — 10 jours",
        days: 10,
        priceFrom: 1890,
        summary: "Kathmandou, Pokhara et Chitwan — culture, lacs et jungle.",
        highlights: ["Kathmandou", "Pokhara", "Chitwan"],
        image: "/images/destinations/nepal.jpg",
      },
      {
        slug: "nepal-trekking-12-jours",
        title: "Népal & Annapurna — 12 jours",
        days: 12,
        priceFrom: 2350,
        summary: "Circuit culturel + trek de l'Annapurna (niveau modéré).",
        highlights: ["ABC Trek", "Pokhara", "Villages"],
        image: "/images/destinations/place-nepal.jpg",
      },
      {
        slug: "nepal-doux-8-jours",
        title: "Népal en douceur — 8 jours",
        days: 8,
        priceFrom: 1580,
        summary: "Sans trek exigeant — temples, lacs et panoramas accessibles.",
        highlights: ["Patan", "Bhaktapur", "Pokhara"],
        image: "/images/destinations/ladakh.jpg",
      },
    ],
    blogKeywords: ["népal", "nepal", "kathmandou", "annapurna"],
  },
  {
    slug: "bhoutan",
    name: "Bhoutan",
    tagline: "Dzongs, monastères et Bonheur National Brut",
    heroImage: "/images/destinations/bhoutan.jpg",
    gallery: [
      { src: "/images/destinations/bhoutan.jpg", alt: "Montagnes du Bhoutan" },
      { src: "/images/destinations/bhoutan-2.jpg", alt: "Paysages himalayens du Bhoutan" },
      { src: "/images/destinations/nepal.jpg", alt: "Spiritualité himalayenne" },
      { src: "/images/destinations/place-nepal.jpg", alt: "Hauts plateaux" },
    ],
    intro: [
      "Le Bhoutan, royaume himalayen, fascine par ses dzongs fortifiés, ses monastères perchés et sa philosophie du Bonheur National Brut.",
      "Paro, Thimphu, Punakha et la montée vers le Nid du Tigre forment le cœur du voyage. Les formalités sont spécifiques : Raja vous guide pas à pas.",
      "Un voyage rare, plus exclusif, souvent combiné avec le Népal pour les amateurs d'Himalaya culturel.",
    ],
    highlights: [
      "Paro et le Nid du Tigre",
      "Thimphu, capitale du royaume",
      "Dzong de Punakha",
      "Vallées et villages traditionnels",
      "Culture bouddhiste vivante",
    ],
    bestSeason: "Mars à mai · Septembre à novembre",
    cities: ["Paro", "Thimphu", "Punakha", "Wangdue"],
    mapImage: "/images/destinations/maps/bhoutan.jpg",
    map: {
      lat: 27.5142,
      lng: 89.6459,
    },
    mapCaption: "Le Bhoutan à l'est du Népal — Paro et Thimphu à l'ouest, Punakha dans la vallée centrale.",
    places: [
      {
        name: "Nid du Tigre (Taktsang)",
        description:
          "Le monastère accroché à sa falaise à 3 100 m, image iconique du Bhoutan. Trois heures de montée récompensées par un lieu hors du temps.",
        image: "/images/destinations/places/tigers-nest.jpg",
      },
      {
        name: "Vallée de Paro",
        description:
          "Vallée d'arrivée des vols internationaux : rizières, fermes traditionnelles et dzong de Rinpung. Le Bhoutan rural dès la descente d'avion.",
        image: "/images/destinations/bhoutan.jpg",
      },
      {
        name: "Thimphu",
        description:
          "Capitale sans feux de circulation : Tashichho Dzong, marchés et musées. Le Bhoutan contemporain, à l'architecture toujours codifiée.",
        image: "/images/destinations/places/thimphu.jpg",
      },
      {
        name: "Dzong de Punakha",
        description:
          "Le plus beau dzong du royaume, posé au confluent de deux rivières et entouré de jacarandas au printemps. L'ancienne capitale d'hiver.",
        image: "/images/destinations/places/punakha.jpg",
      },
      {
        name: "Cols & vallées centrales",
        description:
          "Du col de Dochula et ses 108 chortens aux vallées de Wangdue : routes de montagne, forêts de rhododendrons et villages traditionnels.",
        image: "/images/destinations/bhoutan-2.jpg",
      },
    ],
    itineraries: [
      {
        slug: "bhoutan-essentiel-8-jours",
        title: "Bhoutan essentiel — 8 jours",
        days: 8,
        priceFrom: 2890,
        summary: "Paro, Thimphu et Punakha — le cœur du royaume.",
        highlights: ["Nid du Tigre", "Thimphu", "Punakha"],
        image: "/images/destinations/bhoutan.jpg",
      },
      {
        slug: "bhoutan-complet-12-jours",
        title: "Grand Bhoutan — 12 jours",
        days: 12,
        priceFrom: 3650,
        summary: "Itinéraire élargi vers l'est du pays et festivals selon saison.",
        highlights: ["Paro", "Bumthang", "Festivals"],
        image: "/images/destinations/bhoutan-2.jpg",
      },
      {
        slug: "bhoutan-spiritualite-10-jours",
        title: "Bhoutan spirituel — 10 jours",
        days: 10,
        priceFrom: 3200,
        summary: "Monastères, méditation et rencontres avec la culture locale.",
        highlights: ["Monastères", "Punakha", "Villages"],
        image: "/images/destinations/nepal.jpg",
      },
    ],
    blogKeywords: ["bhoutan", "bhutan", "paro", "thimphu"],
  },
  {
    slug: "kerala",
    name: "Kerala",
    tagline: "Backwaters, plages et nature tropicale",
    heroImage: "/images/destinations/kerala.jpg",
    gallery: [
      { src: "/images/destinations/kerala.jpg", alt: "Houseboat Kerala" },
      { src: "/images/destinations/kerala-2.jpg", alt: "Backwaters d'Alleppey" },
      { src: "/images/destinations/sud.jpg", alt: "Canaux du Kerala" },
      { src: "/images/destinations/goa.jpg", alt: "Côte tropicale" },
    ],
    intro: [
      "Le Kerala, « pays de Dieu », invite à la lenteur : houseboats sur les backwaters, collines de thé de Munnar, ayurveda et plages de l'océan Indien.",
      "C'est l'un des circuits les plus demandés après le Rajasthan — plus vert, plus doux, parfait en couple ou en solo.",
      "Raja personnalise durée, niveau d'hôtel et équilibre entre nature, culture et repos.",
    ],
    highlights: [
      "Nuit en houseboat à Alleppey",
      "Plantations de thé de Munnar",
      "Kochi et son héritage colonial",
      "Plages de Varkala ou Kovalam",
      "Soins ayurvédiques",
    ],
    bestSeason: "Novembre à février",
    cities: ["Kochi", "Alleppey", "Munnar", "Thekkady", "Varkala"],
    mapImage: "/images/destinations/maps/kerala.jpg",
    map: {
      lat: 9.4981,
      lng: 76.3388,
    },
    mapCaption: "Le Kerala sur la côte sud-ouest — de Kochi aux backwaters, puis Munnar et les plages.",
    places: [
      {
        name: "Kochi",
        description:
          "Ancienne cité portuaire aux influences portugaises, hollandaises et britanniques. Filets de pêche chinois, Fort Kochi et cafés : une entrée charmante.",
        image: "/images/destinations/places/kochi.jpg",
      },
      {
        name: "Alleppey (Alappuzha)",
        description:
          "Capitale des backwaters. Une nuit en houseboat reste le souvenir le plus cité des voyageurs : dîner à bord, villages d'eau, réveil sur le canal.",
        image: "/images/destinations/places/kerala-houseboat.jpg",
      },
      {
        name: "Kumarakom",
        description:
          "L'autre visage des backwaters, sur le lac Vembanad : resorts au bord de l'eau, sanctuaire d'oiseaux et villages plus confidentiels.",
        image: "/images/destinations/places/kerala-houseboat-2.jpg",
      },
      {
        name: "Canaux en pirogue",
        description:
          "En shikara ou pirogue sur les petits canaux : rizières, cocotiers et vie locale au fil de l'eau, là où les grands bateaux ne passent pas.",
        image: "/images/destinations/places/kerala-canoe.jpg",
      },
      {
        name: "Munnar",
        description:
          "Station d'altitude au milieu des plantations de thé. Balades, points de vue et air frais : l'étape nature incontournable du Kerala intérieur.",
        image: "/images/destinations/places/munnar.jpg",
      },
      {
        name: "Thekkady (Périyar)",
        description:
          "Réserve de tigres autour d'un lac : bateau, plantations d'épices et forêts. La montagne sauvage entre Munnar et la côte.",
        image: "/images/destinations/places/tiger.jpg",
      },
      {
        name: "Varkala & Kovalam",
        description:
          "Falaises et plages pour terminer le voyage. Spas ayurvédiques, couchers de soleil et rythme très lent — idéal après une semaine de découvertes.",
        image: "/images/destinations/goa.jpg",
      },
    ],
    itineraries: [
      {
        slug: "tour-inde-du-sud-14-jours",
        title: "Tour de l'Inde du Sud — 14 jours",
        days: 14,
        priceFrom: 1890,
        summary: "Temples du Tamil Nadu, Munnar, backwaters du Kerala et palais de Mysore avec guide francophone.",
        highlights: ["Madurai", "Backwaters", "Munnar", "Mysore"],
        image: "/images/destinations/places/meenakshi.jpg",
      },
      {
        slug: "kerala-court-7-jours",
        title: "Kerala express — 7 jours",
        days: 7,
        priceFrom: 1420,
        summary: "L'essentiel du Kerala pour un premier séjour.",
        highlights: ["Kochi", "Alleppey", "Munnar"],
        image: "/images/destinations/sud.jpg",
      },
      {
        slug: "kerala-luxe-9-jours",
        title: "Kerala charme — 9 jours",
        days: 9,
        priceFrom: 2280,
        summary: "Hôtels boutique, houseboat premium et spas.",
        highlights: ["Boutique hotels", "Ayurveda", "Backwaters"],
        image: "/images/destinations/kerala-2.jpg",
      },
    ],
    blogKeywords: ["kerala", "backwaters", "munnar", "houseboat"],
  },
  {
    slug: "goa",
    name: "Goa",
    tagline: "Plages, héritage portugais et détente",
    heroImage: "/images/destinations/goa.jpg",
    gallery: [
      { src: "/images/destinations/goa.jpg", alt: "Plages de Goa" },
      { src: "/images/destinations/goa-2.jpg", alt: "Côte goanaise" },
      { src: "/images/destinations/kerala.jpg", alt: "Ambiance tropicale" },
      { src: "/images/destinations/sud.jpg", alt: "Sud de l'Inde" },
    ],
    intro: [
      "Goa mêle plages dorées, églises coloniales portugaises, marchés colorés et une atmosphère détendue unique en Inde.",
      "Nos circuits Goa se conçoivent toujours en prolongement d'un voyage en Inde du Sud : après les temples du Tamil Nadu, les plantations de thé et les backwaters du Kerala, Goa referme le voyage en douceur, les pieds dans le sable. C'est aussi la formule la plus logique en termes de trajets — et la plus appréciée de nos voyageurs.",
      "Raja choisit le bon « Goa » selon votre profil : Nord plus animé, Sud plus calme et authentique. Goa peut aussi se greffer en simple extension de 4 à 5 jours après un circuit Rajasthan.",
    ],
    highlights: [
      "Plages du Nord et du Sud",
      "Old Goa et églises UNESCO",
      "Marchés et cuisine goanaise",
      "Villages de pêcheurs",
      "Coucher de soleil à Palolem",
    ],
    bestSeason: "Novembre à mars",
    cities: ["Panaji", "Old Goa", "Calangute", "Palolem", "Anjuna"],
    mapImage: "/images/destinations/maps/goa.jpg",
    map: {
      lat: 15.2993,
      lng: 74.124,
    },
    mapCaption: "Goa sur la côte ouest — entre Mumbai et le Kerala, petite enclavée idéale pour la plage.",
    places: [
      {
        name: "Panaji & Old Goa",
        description:
          "Capitale colorée et quartier colonial d'Old Goa, classé UNESCO. Églises baroques, ruelles latines et cuisine métissée : le Goa culturel.",
        image: "/images/destinations/goa-2.jpg",
      },
      {
        name: "Calangute & Baga",
        description:
          "Les grandes plages du Nord, animées et faciles : idéales pour une première découverte, les marchés et la vie nocturne légère.",
        image: "/images/destinations/goa.jpg",
      },
      {
        name: "Anjuna & Vagator",
        description:
          "Criques bordées de palmiers, marché aux puces du mercredi et couchers de soleil depuis le fort de Chapora.",
        image: "/images/destinations/places/goa-beach.jpg",
      },
      {
        name: "Palolem & le Sud",
        description:
          "Crique en forme de croissant, villages plus calmes, ambiance « slow ». Le choix préféré des couples qui veulent vraiment déconnecter.",
        image: "/images/destinations/places/palolem.jpg",
      },
    ],
    itineraries: [
      {
        slug: "tour-inde-du-sud-goa-20-jours",
        title: "Splendeur du Sud, de Chennai à Goa — 20 jours",
        days: 20,
        priceFrom: 1200,
        summary:
          "Le grand circuit du sud : temples du Tamil Nadu, Kerala, Hampi, puis les plages de Goa pour finir.",
        highlights: ["Hampi", "Backwaters", "Plages de Goa"],
        image: "/images/destinations/goa.jpg",
      },
      {
        slug: "goa-detente-7-jours",
        title: "Goa détente — 7 jours",
        days: 7,
        priceFrom: 1200,
        summary: "Plages, patrimoine et rythme lent.",
        highlights: ["Plages", "Old Goa", "Cuisine"],
        image: "/images/destinations/goa.jpg",
      },
      {
        slug: "goa-extension-5-jours",
        title: "Extension Goa — 5 jours",
        days: 5,
        priceFrom: 890,
        summary: "À combiner après un circuit Rajasthan ou Kerala.",
        highlights: ["Plages", "Old Goa", "Détente"],
        image: "/images/destinations/goa-2.jpg",
      },
      {
        slug: "goa-sud-8-jours",
        title: "Goa Sud authentique — 8 jours",
        days: 8,
        priceFrom: 1350,
        summary: "Focus Sud : Palolem, villages et nature.",
        highlights: ["Palolem", "Villages", "Nature"],
        image: "/images/destinations/goa.jpg",
      },
    ],
    blogKeywords: ["goa", "plages", "portugais"],
  },
  {
    slug: "triangle-dor",
    name: "Triangle d'Or",
    tagline: "Delhi, Agra, Jaipur — le classique incontournable",
    heroImage: "/images/destinations/triangle-dor.jpg",
    gallery: [
      { src: "/images/destinations/triangle-dor.jpg", alt: "Taj Mahal" },
      { src: "/images/destinations/nord.jpg", alt: "India Gate, Delhi" },
      { src: "/images/destinations/place-jaipur.jpg", alt: "Fort Amber, Jaipur" },
      { src: "/images/destinations/rajasthan.jpg", alt: "Hawa Mahal, Jaipur" },
    ],
    intro: [
      "Le Triangle d'Or — Delhi, Agra, Jaipur — reste la porte d'entrée idéale pour découvrir l'Inde en une semaine.",
      "Trois villes, trois ambiances : capitale moderne et vieux Delhi, merveille moghole du Taj, puis la ville rose du Rajasthan.",
      "Raja affine chaque journée : horaires anti-foule, bons restaurants, et option d'étendre vers le Rajasthan ou Varanasi.",
    ],
    highlights: [
      "Taj Mahal au lever du soleil",
      "Fort Rouge et Jama Masjid",
      "Amber Fort et City Palace",
      "Bazar de Jaipur",
      "Rythme confortable en 7 jours",
    ],
    bestSeason: "Octobre à mars",
    cities: ["Delhi", "Agra", "Jaipur"],
    mapImage: "/images/destinations/maps/triangle-dor.jpg",
    map: {
      lat: 27.1751,
      lng: 78.0421,
    },
    mapCaption: "Le Triangle d'Or — trois villes reliées en boucle depuis Delhi.",
    places: [
      {
        name: "Delhi",
        description:
          "Début ou fin de circuit. Old Delhi pour l'intensité, New Delhi pour les avenues et India Gate. Une journée bien construite donne le ton de l'Inde.",
        image: "/images/destinations/places/delhi-india-gate.jpg",
      },
      {
        name: "Taj Mahal — Agra",
        description:
          "Le mausolée de marbre blanc, merveille du monde. Symétrie parfaite, incrustations de pierres fines : l'émotion forte du voyage.",
        image: "/images/destinations/places/taj-classic.jpg",
      },
      {
        name: "Lever de soleil au Taj",
        description:
          "Raja réserve les premières entrées du matin : lumière rose sur le marbre, reflets dans les bassins et beaucoup moins de monde.",
        image: "/images/destinations/places/taj-reflect.jpg",
      },
      {
        name: "La grande porte du Taj",
        description:
          "Le Darwaza-i-Rauza, monumental portail de grès rouge et marbre, ménage la première vision du mausolée — un moment que l'on n'oublie pas.",
        image: "/images/destinations/places/taj-gate.jpg",
      },
      {
        name: "Fatehpur Sikri",
        description:
          "La capitale abandonnée d'Akbar, classée UNESCO, sur la route d'Agra à Jaipur. Palais de grès rouge et porte monumentale du Buland Darwaza.",
        image: "/images/destinations/places/fatehpur-sikri.jpg",
      },
      {
        name: "Fort Amber — Jaipur",
        description:
          "La forteresse rajput au-dessus du lac Maota : remparts, cours et salle des miroirs. La visite phare de la ville rose.",
        image: "/images/destinations/places/jaipur-amber.jpg",
      },
      {
        name: "Hawa Mahal — Jaipur",
        description:
          "La façade aux 953 fenêtres, construite pour que les dames de la cour observent la rue sans être vues. L'icône de Jaipur.",
        image: "/images/destinations/places/jaipur-hawa.jpg",
      },
      {
        name: "Jal Mahal — Jaipur",
        description:
          "Le palais sur l'eau du lac Man Sagar, arrêt photo incontournable entre la vieille ville et Amber.",
        image: "/images/destinations/places/jal-mahal.jpg",
      },
    ],
    itineraries: [
      {
        slug: "tour-triangle-dor-5-jours",
        title: "Le Triangle d'Or — 5 jours",
        days: 5,
        priceFrom: 1100,
        summary: "Le circuit classique, entièrement privé, jour par jour.",
        highlights: ["Delhi", "Agra", "Jaipur"],
        image: "/images/destinations/triangle-dor.jpg",
      },
      {
        slug: "triangle-dor-luxe-8-jours",
        title: "Triangle d'Or charme — 8 jours",
        days: 8,
        priceFrom: 1680,
        summary: "Hôtels heritage et expériences exclusives.",
        highlights: ["Heritage hotels", "Taj", "Jaipur"],
        image: "/images/hotels/heritage-rambagh.jpg",
      },
      {
        slug: "triangle-dor-express-5-jours",
        title: "Triangle d'Or express — 5 jours",
        days: 5,
        priceFrom: 920,
        summary: "L'essentiel pour un court séjour.",
        highlights: ["Taj Mahal", "Jaipur", "Delhi"],
        image: "/images/destinations/nord.jpg",
      },
    ],
    blogKeywords: ["triangle", "delhi", "agra", "taj", "jaipur"],
  },
  {
    slug: "varanasi",
    name: "Varanasi",
    tagline: "Spiritualité et ghats du Gange",
    heroImage: "/images/destinations/varanasi.jpg",
    gallery: [
      { src: "/images/destinations/varanasi.jpg", alt: "Ghats de Varanasi sur le Gange" },
      { src: "/images/destinations/place-varanasi.jpg", alt: "Rive du Gange à Varanasi" },
      { src: "/images/hotels/resort-aloha-ganges.jpg", alt: "Ambiance Gange" },
      { src: "/images/destinations/nord.jpg", alt: "Inde du Nord" },
    ],
    intro: [
      "Varanasi (Bénarès) est l'une des plus anciennes villes habitées du monde. Les ghats du Gange, les cérémonies de l'aarti et les ruelles du vieux quartier offrent une immersion spirituelle unique.",
      "C'est une ville intense : Raja organise des séjours attentifs — bateau au lever du soleil, aarti du soir, Sarnath — avec un hôtel bien situé pour souffler.",
      "Parfaite en 3 à 5 jours, ou en extension après le Triangle d'Or / le Rajasthan.",
    ],
    highlights: [
      "Aarti du soir à Dashashwamedh",
      "Balade en bateau au lever du soleil",
      "Ruelles et temples du vieux Varanasi",
      "Sarnath, lieu de prédication du Bouddha",
      "Vie quotidienne sur les ghats",
    ],
    bestSeason: "Octobre à mars",
    cities: ["Varanasi", "Sarnath"],
    mapImage: "/images/destinations/maps/varanasi.jpg",
    map: {
      lat: 25.3176,
      lng: 82.9739,
    },
    mapCaption: "Varanasi en Uttar Pradesh, sur le Gange — Sarnath à quelques kilomètres au nord.",
    places: [
      {
        name: "Les ghats du Gange",
        description:
          "Cœur de Varanasi : marches de pierre, rituels, barques et vie quotidienne au bord du fleuve sacré. L'un des spectacles humains les plus forts d'Inde.",
        image: "/images/destinations/places/varanasi-ghats.jpg",
      },
      {
        name: "Dashashwamedh & aarti",
        description:
          "Chaque soir, la cérémonie de l'aarti illumine le ghat principal. Feux, chants, foule recueillie : un moment fort à vivre avec un guide.",
        image: "/images/destinations/varanasi.jpg",
      },
      {
        name: "Bateau au lever du soleil",
        description:
          "La balade en barque à l'aube révèle la ville sous son meilleur angle — lumière douce sur les ghats, ambiance méditative.",
        image: "/images/destinations/place-varanasi.jpg",
      },
      {
        name: "Sarnath",
        description:
          "Le lieu du premier enseignement du Bouddha, à quelques kilomètres. Stupa de Dhamek, musée et calme : le complément spirituel idéal.",
        image: "/images/destinations/places/sarnath.jpg",
      },
    ],
    itineraries: [
      {
        slug: "tour-inde-du-nord-16-jours",
        title: "Le Rajasthan avec Bénarès — 16 jours",
        days: 16,
        priceFrom: 2450,
        summary:
          "Le grand circuit du Nord qui se termine sur les ghats du Gange : Delhi, les cités royales du Rajasthan, Agra, Orchha, Khajuraho puis Bénarès.",
        highlights: ["Bénarès", "Sarnath", "Taj Mahal", "Rajasthan"],
        image: "/images/destinations/varanasi.jpg",
      },
      {
        slug: "varanasi-spirituel-5-jours",
        title: "Varanasi spirituel — 5 jours",
        days: 5,
        priceFrom: 980,
        summary: "Ghats, aarti, Sarnath et immersion dans la ville sacrée.",
        highlights: ["Aarti", "Bateau", "Sarnath"],
        image: "/images/destinations/varanasi.jpg",
      },
      {
        slug: "varanasi-triangle-10-jours",
        title: "Varanasi & Triangle d'Or — 10 jours",
        days: 10,
        priceFrom: 1850,
        summary: "Classiques du Nord + spiritualité de Bénarès.",
        highlights: ["Taj Mahal", "Varanasi", "Delhi"],
        image: "/images/destinations/triangle-dor.jpg",
      },
      {
        slug: "varanasi-extension-3-jours",
        title: "Extension Varanasi — 3 jours",
        days: 3,
        priceFrom: 520,
        summary: "À ajouter après un circuit Rajasthan ou Triangle d'Or.",
        highlights: ["Ghats", "Aarti", "Ruelles"],
        image: "/images/destinations/place-varanasi.jpg",
      },
    ],
    blogKeywords: ["varanasi", "bénéarès", "benarès", "gange", "ghats"],
  },
];

export function getDestinationBySlug(slug: string): DestinationPage | undefined {
  return destinationPages.find((d) => d.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return destinationPages.map((d) => d.slug);
}

/** Find the destination page that features a given tour in its itineraries. */
export function getDestinationForTour(tourSlug: string): DestinationPage | undefined {
  return destinationPages.find((d) => d.itineraries.some((i) => i.slug === tourSlug));
}
