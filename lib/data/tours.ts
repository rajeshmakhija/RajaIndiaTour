export interface TourDay {
  day: number;
  title: string;
  description: string;
  image: string;
}

export interface TourHighlight {
  title: string;
  description: string;
  image: string;
}

export interface TourFacts {
  tourType: string;
  duration: string;
  group: string;
  meals: string;
  bestFor: string;
  price: string;
}

export interface Tour {
  slug: string;
  breadcrumb: string[];
  title: string;
  subtitle: string;
  intro: string;
  /** [large, small1, small2] */
  gallery: string[];
  facts: TourFacts;
  highlights: TourHighlight[];
  mapImage: string;
  cities: string[];
  days: TourDay[];
}

export const tours: Tour[] = [
  {
    slug: "tour-inde-du-nord-16-jours",
    breadcrumb: ["Asie", "Inde", "Rajasthan"],
    title: "Tour de l'Inde du Nord — la beauté du Rajasthan avec Bénarès",
    subtitle:
      "Un grand voyage privé à travers Delhi, les cités royales et le désert du Rajasthan, Agra, Orchha, Khajuraho et la ville sainte de Bénarès.",
    intro:
      "De la capitale trépidante aux dunes du Thar, des palais de maharajas au Taj Mahal, jusqu'aux ghats du Gange : ce circuit trace un fil complet à travers le nord de l'Inde. Vous êtes accompagné d'un guide francophone qui prépare et adapte chaque étape à votre rythme et à vos envies — un itinéraire exemple, entièrement personnalisable avec Raja.",
    gallery: [
      "/images/destinations/rajasthan.jpg",
      "/images/destinations/places/taj-reflect.jpg",
      "/images/destinations/rajasthan-jaipur.jpg",
    ],
    facts: {
      tourType: "Circuit privé sur mesure",
      duration: "16 jours / 15 nuits",
      group: "Voyage privé — vous et votre guide",
      meals: "Petits-déjeuners quotidiens et dîners",
      bestFor: "Culture, patrimoine & désert",
      price: "Sur devis — sans intermédiaire",
    },
    highlights: [
      {
        title: "Lever de soleil au Taj Mahal",
        description:
          "Découvrez le mausolée de marbre blanc dans la lumière dorée du matin, avant l'arrivée de la foule — l'émotion la plus forte du voyage.",
        image: "/images/destinations/places/taj-reflect.jpg",
      },
      {
        title: "Nuit sous les étoiles dans le désert du Thar",
        description:
          "Promenade à dos de chameau au coucher du soleil, dîner et danses traditionnelles autour d'un feu de camp, nuit en campement près de Jaisalmer.",
        image: "/images/hotels/camping-sand-dunes.jpg",
      },
      {
        title: "Cérémonie de l'Aarti sur le Gange",
        description:
          "À Bénarès, assistez depuis une barque à la cérémonie du soir : bougies flottantes, chants et prières dans une atmosphère mystique.",
        image: "/images/destinations/places/varanasi-ghats.jpg",
      },
      {
        title: "Barque au crépuscule sur le lac Pichola",
        description:
          "À Udaipur, glissez sur l'eau face au City Palace et au Lake Palace pour le moment le plus romantique du Rajasthan.",
        image: "/images/hotels/resort-udaivilas-wide.jpg",
      },
    ],
    mapImage: "/images/destinations/maps/nord.jpg",
    cities: [
      "Delhi",
      "Mandawa",
      "Bikaner",
      "Jaisalmer",
      "Jodhpur",
      "Udaipur",
      "Jaipur",
      "Agra",
      "Orchha",
      "Khajuraho",
      "Varanasi",
    ],
    days: [
      {
        day: 1,
        title: "Arrivée à Delhi",
        description:
          "Arrivée à New Delhi et accueil par votre guide francophone. Découverte du Vieux Delhi : promenade en rickshaw dans les ruelles de Chandni Chowk, la grande mosquée Jama Masjid et passage devant le Fort Rouge. L'après-midi, New Delhi : le temple sikh de Bangla Sahib, Connaught Place, la voie royale Rajpath jusqu'à l'India Gate, le Qutub Minar et le tombeau d'Humayun. Nuit à l'hôtel.",
        image: "/images/destinations/places/delhi-india-gate.jpg",
      },
      {
        day: 2,
        title: "Delhi → Mandawa (Shekhawati)",
        description:
          "Route vers le Shekhawati, porte d'entrée et « galerie d'art à ciel ouvert » du Rajasthan. Cette région aride de steppes et de dunes est célèbre pour ses havelis délicatement décorés de fresques colorées, balcons et colonnes sculptées, héritage des riches marchands marwaris des XVIIIe et XIXe siècles.",
        image: "/images/destinations/places/pushkar.jpg",
      },
      {
        day: 3,
        title: "Mandawa → Bikaner",
        description:
          "Route vers Bikaner, aux portes du désert du Thar, sur l'ancienne route des caravanes. Découverte du fort de Junagarh, imposant ensemble du XVIe siècle et de ses palais de maharajahs. Tour de la vieille ville en rickshaw entre havelis de grès rouge, visite du temple jaïn Bhandasar et flânerie au marché. Étape dans un village pour rencontrer une famille rajasthanie.",
        image: "/images/destinations/places/jal-mahal.jpg",
      },
      {
        day: 4,
        title: "Bikaner → Jaisalmer",
        description:
          "Route vers Jaisalmer, ville fascinante en plein désert, cité médiévale aux airs de « Carcassonne des sables ». À l'arrivée, visite de Bada Bagh et de ses chattris (cénotaphes des princes de Jaisalmer), particulièrement évocateurs au coucher du soleil.",
        image: "/images/destinations/rajasthan-jaipur.jpg",
      },
      {
        day: 5,
        title: "Jaisalmer & désert du Thar",
        description:
          "Journée dans la « Cité d'Or ». Visite du fort de Jaisalmer, l'une des rares forteresses encore habitées, fondée au XIIe siècle, puis des havelis de grès finement ciselé et des temples jaïns sculptés. Temps libre dans les ruelles animées et dégustation d'un thé masala. En soirée, promenade à dos de chameau dans les dunes de sable, dîner et spectacle de danses traditionnelles sous les étoiles autour d'un feu de camp.",
        image: "/images/hotels/camping-sand-dunes.jpg",
      },
      {
        day: 6,
        title: "Jaisalmer → Pokhran → Jodhpur",
        description:
          "Départ pour Jodhpur, ancienne capitale du Marwar. Découverte du spectaculaire fort de Mehrangarh, nid d'aigle du XVe siècle en surplomb de la vieille ville aux maisons indigo, aujourd'hui un vaste musée. Balade dans le labyrinthe de ruelles jusqu'à la tour de l'horloge, visite du mausolée de marbre blanc de Jaswant Thada et jeep safari dans les villages Bishnoi.",
        image: "/images/destinations/places/mehrangarh.jpg",
      },
      {
        day: 7,
        title: "Jodhpur → Ranakpur → Udaipur",
        description:
          "Sur la route d'Udaipur, visite des temples jaïns de Ranakpur, parmi les plus remarquables de l'Inde : l'immense sanctuaire de marbre blanc d'Adinath, dont les 29 salles sont soutenues par 1 444 colonnes toutes différentes. Arrivée à Udaipur, « la Cité de l'Aurore », posée entre lacs bleus et collines verdoyantes.",
        image: "/images/destinations/places/udaipur-city-palace.jpg",
      },
      {
        day: 8,
        title: "Udaipur → Jaipur (train de nuit)",
        description:
          "Découverte d'Udaipur, la « Perle du Rajasthan » : le somptueux City Palace, dédale de cours et de pavillons dominant le lac, les jardins de Sahelion Ki Bari et le temple de Jagdish. Promenade en bateau sur le lac Pichola avec arrêt sur l'îlot de Jag Mandir, flânerie dans les bazars, puis transfert à la gare pour le train de nuit vers Jaipur.",
        image: "/images/hotels/resort-udaivilas-wide.jpg",
      },
      {
        day: 9,
        title: "Jaipur, la ville rose",
        description:
          "Capitale du Rajasthan, Jaipur doit son surnom de « ville rose » à la couleur du grès de ses palais, havelis et forts. Fondée en 1727 par Sawai Jai Singh II selon un plan remarquable, elle est cernée d'une enceinte fortifiée. Temps libre pour flâner dans les bazars et la vieille ville, visite du temple Laxmi Narayan (Birla Temple) et séance de cinéma « Bollywood ».",
        image: "/images/destinations/rajasthan.jpg",
      },
      {
        day: 10,
        title: "Jaipur — Amber, Hawa Mahal & Jantar Mantar",
        description:
          "Arrêt photo devant la célèbre façade rose du Hawa Mahal, le Palais des Vents. Dans les environs, visite du fort d'Amber, perché sur sa colline au-dessus d'un lac, avec ses cours, pavillons et Palais des Miroirs. Découverte du City Palace, ancienne résidence des maharajahs, et de l'observatoire astronomique de Jantar Mantar. Le soir, dîner-spectacle de marionnettes.",
        image: "/images/destinations/places/jaipur-amber.jpg",
      },
      {
        day: 11,
        title: "Jaipur → Fatehpur Sikri → Agra",
        description:
          "Route vers Fatehpur Sikri, ville-fantôme de grès rouge classée à l'UNESCO, capitale éphémère de l'empereur moghol Akbar au XVIe siècle. Poursuite vers Agra et visite du Fort Rouge, sur les rives de la Yamuna. En fin de journée, découverte du Taj Mahal, lumineux mausolée de marbre blanc élevé par Shah Jahan pour son épouse Mumtaz Mahal, le plus beau poème d'amour gravé dans la pierre.",
        image: "/images/destinations/places/taj-classic.jpg",
      },
      {
        day: 12,
        title: "Agra → Jhansi → Orchha",
        description:
          "Transfert à la gare et train vers Jhansi, puis route pour Orchha, ancienne capitale des rois Bundela perchée au bord de la rivière Betwa. Découverte du Jahangir Mahal, splendide forteresse de grès rouge mêlant styles hindou et moghol, du Raj Mahal et de ses fresques, et des temples Ram Raja et Chaturbhuj. Cérémonie du soir dans un temple, au cœur de l'ambiance locale.",
        image: "/images/destinations/places/orchha.jpg",
      },
      {
        day: 13,
        title: "Orchha → Khajuraho",
        description:
          "Route vers Khajuraho et visite de ses célèbres temples classés à l'UNESCO, ornés de frises sculptées d'une finesse exceptionnelle. Le groupe Ouest réunit les plus majestueux : le temple de Lakshmana dédié à Vishnou et le Kandariya Mahadev consacré à Shiva, dont la flèche centrale s'élève à 31 mètres, décoré de près de 900 statues.",
        image: "/images/destinations/places/khajuraho.jpg",
      },
      {
        day: 14,
        title: "Khajuraho → Varanasi (avion)",
        description:
          "Envol pour Varanasi, la ville sainte célèbre pour ses ghats, ces berges de marches de pierre où les pèlerins hindous descendent au Gange pour leurs ablutions. Le soir, tour en rickshaw jusqu'aux ghats pour assister à la cérémonie de l'Aarti au bord du fleuve : bougies flottantes, prières et incantations dans une atmosphère mystique au coucher du soleil.",
        image: "/images/destinations/places/varanasi-ghats.jpg",
      },
      {
        day: 15,
        title: "Varanasi & Sarnath",
        description:
          "Départ au lever du soleil pour une croisière sur le Gange : la vie s'éveille sur les rives et les ghats dans une lumière sublime. Visite du temple de Durga et du temple d'or dédié à Shiva, puis excursion à Sarnath, lieu du premier sermon du Bouddha et l'un des quatre sites saints du bouddhisme, avec ses ruines et son musée de sculptures.",
        image: "/images/destinations/places/sarnath.jpg",
      },
      {
        day: 16,
        title: "Varanasi → Delhi → vol retour",
        description:
          "Retour vers Delhi. Selon votre horaire, dernières visites ou temps libre avant le transfert à l'aéroport international pour votre vol retour, des souvenirs plein la tête.",
        image: "/images/destinations/nord-delhi.jpg",
      },
    ],
  },
  {
    slug: "tour-inde-du-sud-14-jours",
    breadcrumb: ["Asie", "Inde", "Inde du Sud"],
    title: "Tour de l'Inde du Sud — les perles du Sud",
    subtitle:
      "Un grand voyage privé du Tamil Nadu au Kerala et au Karnataka : temples dravidiens, comptoirs coloniaux, collines de thé, backwaters et palais du Sud.",
    intro:
      "Des gopurams sculptés de Madurai aux backwaters d'Alleppey, des plantations de thé de Munnar aux palais de Mysore, ce circuit dévoile la douceur et la richesse du sud de l'Inde. Accompagné d'un guide francophone, vous avancez à votre rythme — un itinéraire exemple, entièrement personnalisable avec Raja.",
    gallery: [
      "/images/destinations/places/meenakshi.jpg",
      "/images/destinations/places/kerala-houseboat.jpg",
      "/images/destinations/places/munnar.jpg",
    ],
    facts: {
      tourType: "Circuit privé sur mesure",
      duration: "14 jours / 13 nuits",
      group: "Voyage privé — vous et votre guide",
      meals: "Petits-déjeuners quotidiens et dîners",
      bestFor: "Temples, nature & backwaters",
      price: "Sur devis — sans intermédiaire",
    },
    highlights: [
      {
        title: "Nuit en houseboat sur les backwaters",
        description:
          "À bord d'un kettuvallam traditionnel, glissez entre rizières, cocotiers et villages d'eau — dîner aux épices douces et réveil sur le canal.",
        image: "/images/destinations/places/kerala-houseboat.jpg",
      },
      {
        title: "Le temple de Meenakshi à Madurai",
        description:
          "Des gopurams sculptés de 48 mètres, une salle aux mille colonnes et la cérémonie du soir : le cœur spirituel du Tamil Nadu.",
        image: "/images/destinations/places/meenakshi.jpg",
      },
      {
        title: "Les plantations de thé de Munnar",
        description:
          "Collines de thé à perte de vue dans les Ghats occidentaux, air frais et brume matinale — l'échappée nature du Kerala intérieur.",
        image: "/images/destinations/places/munnar.jpg",
      },
      {
        title: "Fort Kochi et son héritage colonial",
        description:
          "Filets de pêche chinois, palais hollandais, synagogue et spectacle de kathakali dans l'ancien comptoir portugais du Kerala.",
        image: "/images/destinations/places/kochi.jpg",
      },
    ],
    mapImage: "/images/destinations/maps/sud.jpg",
    cities: [
      "Chennai",
      "Mahabalipuram",
      "Pondichéry",
      "Tanjore",
      "Trichy",
      "Madurai",
      "Munnar",
      "Périyar",
      "Alleppey",
      "Kochi",
      "Wayanad",
      "Mysore",
      "Hassan",
      "Bangalore",
    ],
    days: [
      {
        day: 1,
        title: "Chennai & Mahabalipuram",
        description:
          "Accueil à l'aéroport de Chennai (Madras), ancienne capitale de la Compagnie des Indes, et tour d'orientation : Fort Saint-Georges et front de mer. Route vers Mahabalipuram, ancien port pallava classé à l'UNESCO — les Cinq Ratha taillés dans le roc, le grand bas-relief de la Descente du Gange et le Temple du Rivage qui défie l'océan depuis douze siècles.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 2,
        title: "Mahabalipuram → Pondichéry",
        description:
          "Route vers Pondichéry, ancien comptoir français au bord de l'océan. Découverte à pied et en rickshaw de la « ville blanche » au charme colonial : avenues à angle droit, rue Dumas, ancien palais du gouverneur, ashram de Sri Aurobindo, quartier tamoul et grand marché Goubert.",
        image: "/images/destinations/goa.jpg",
      },
      {
        day: 3,
        title: "Pondichéry → Chidambaram → Tanjore",
        description:
          "Départ vers Tanjore, le « grenier à riz » de l'Inde. En chemin, arrêt à Chidambaram et son sanctuaire de Nataraja, le « danseur cosmique », puis à Darasuram pour le temple d'Airavatesvara (UNESCO). À Tanjore, capitale de la dynastie Chola, visite du grand temple de Brihadishvara et de sa remarquable galerie de bronzes.",
        image: "/images/destinations/places/hampi.jpg",
      },
      {
        day: 4,
        title: "Tanjore → Trichy → Tanjore",
        description:
          "Excursion à Trichy (Tiruchirapalli), capitale religieuse du Tamil Nadu. Visite de l'île de Srirangam et de l'immense temple de Sri Ranganathaswamy dédié à Vishnou, avec son mandapa aux mille piliers, puis du fort perché sur son rocher. Retour à Tanjore.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 5,
        title: "Tanjore → Chettinad → Madurai",
        description:
          "Route par le Chettinad et ses somptueuses demeures baroques de marchands. Arrivée à Madurai, haut lieu de pèlerinage : le palais de Tirumalai Nayak puis le temple de Meenakshi, dédié à Shiva et à son épouse, avec ses gopurams sculptés hauts de 48 mètres. En soirée, cérémonie du coucher des divinités.",
        image: "/images/destinations/places/meenakshi.jpg",
      },
      {
        day: 6,
        title: "Madurai → Munnar",
        description:
          "Route vers Munnar, station d'altitude du Kerala nichée à 1 600 m dans les Ghats occidentaux, à travers forêts et plantations de thé et de cardamome. Visite du musée du thé et dégustation. Possibilité d'un cours de cuisine kéralaise chez l'habitant et flânerie au marché aux épices.",
        image: "/images/destinations/places/munnar.jpg",
      },
      {
        day: 7,
        title: "Munnar — plantations de thé",
        description:
          "Journée de randonnée dans les plantations de thé de Kolukkumalai, les plus hautes du pays. Marche à travers les collines jusqu'au point culminant, panorama sur les Ghats, déjeuner pique-nique, puis visite d'une manufacture pour comprendre la culture et la transformation du thé.",
        image: "/images/destinations/places/munnar.jpg",
      },
      {
        day: 8,
        title: "Munnar → Périyar (Thekkady)",
        description:
          "Route vers la réserve de Périyar, fondée en 1934 dans les Ghats occidentaux. Croisière en bateau sur le lac à la rencontre de la faune (éléphants, bisons, oiseaux), promenade dans les plantations d'épices — poivre, cardamome, girofle — et, en soirée, spectacle de Kalaripayattu, l'art martial du Kerala.",
        image: "/images/destinations/places/tiger.jpg",
      },
      {
        day: 9,
        title: "Périyar → Houseboat sur les backwaters",
        description:
          "Embarquement à bord d'un houseboat traditionnel (kettuvallam), autrefois péniche à riz. Croisière paisible sur les backwaters : villages au fil de l'eau, rizières, cocotiers et cuisine kéralaise aux douces épices. Déjeuner, dîner et nuit à bord.",
        image: "/images/destinations/places/kerala-houseboat.jpg",
      },
      {
        day: 10,
        title: "Houseboat → Cochin (Kochi)",
        description:
          "Route vers Cochin, ancien comptoir colonial. Visite du quartier de Mattancherry : le palais hollandais et ses fresques du Ramayana, la synagogue et le quartier juif, l'église Saint-François et la cathédrale Santa Cruz. En soirée, spectacle de danse kathakali.",
        image: "/images/destinations/places/kochi.jpg",
      },
      {
        day: 11,
        title: "Cochin → Wayanad",
        description:
          "Train jusqu'à Calicut puis route vers le Wayanad, superbe région de collines, forêts et plantations d'épices du nord du Kerala — des paysages verdoyants loin des foules.",
        image: "/images/destinations/places/kerala-canoe.jpg",
      },
      {
        day: 12,
        title: "Wayanad → Mysore",
        description:
          "Route vers Mysore, gardienne des traditions royales du Karnataka. Visite du fastueux palais du Maharaja, l'un des plus beaux de l'Inde, découverte de l'artisanat local (soie, bois de santal) et excursion à la colline de Chamundi et son temple.",
        image: "/images/destinations/places/hampi.jpg",
      },
      {
        day: 13,
        title: "Mysore → Hassan (Belur & Halebid)",
        description:
          "Route vers Hassan avec, en chemin, Shravanabelagola et sa statue monolithe jaïne de 18 mètres. Visite des chefs-d'œuvre hoysala : le temple de Chennakeshava à Belur et celui de Hoysaleshwara à Halebid, joyaux d'orfèvrerie sculptés dans la stéatite.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 14,
        title: "Hassan → Bangalore → vol retour",
        description:
          "Route vers Bangalore, capitale-jardin du Karnataka. Visite du parc botanique de Lal Bagh avant le transfert à l'aéroport pour votre vol retour, des images plein la tête.",
        image: "/images/destinations/kerala-2.jpg",
      },
    ],
  },
  {
    slug: "tour-ladakh-14-jours",
    breadcrumb: ["Asie", "Inde", "Ladakh"],
    title: "Tour du Ladakh — la beauté de l'Himalaya",
    subtitle:
      "Un grand voyage privé au cœur de l'Himalaya bouddhiste : Leh et les monastères de la vallée de l'Indus, la vallée de la Nubra par le Khardung La, et les lacs d'altitude Tso Moriri et Tso Kar.",
    intro:
      "Déserts d'altitude, monastères tibétains perchés, cols mythiques au-dessus de 5 000 mètres et lacs turquoise habités par les nomades changpa : le Ladakh est un voyage d'aventure maîtrisé, entre 3 200 et 5 600 mètres. Les premières journées à Leh sont pensées pour une acclimatation en douceur — un itinéraire exemple, entièrement personnalisable avec Raja.",
    gallery: [
      "/images/destinations/places/pangong.jpg",
      "/images/destinations/places/thiksey.jpg",
      "/images/destinations/places/himalaya-pass.jpg",
    ],
    facts: {
      tourType: "Circuit privé sur mesure",
      duration: "14 jours / 13 nuits",
      group: "Voyage privé — vous et votre guide",
      meals: "Petits-déjeuners quotidiens et dîners",
      bestFor: "Haute montagne, monastères & lacs",
      price: "Sur devis — sans intermédiaire",
    },
    highlights: [
      {
        title: "Le col de Khardung La (5 359 m)",
        description:
          "L'une des plus hautes routes carrossables du monde, porte d'entrée de la Nubra et panorama immense sur les massifs du Zanskar et du Karakoram.",
        image: "/images/destinations/places/himalaya-pass.jpg",
      },
      {
        title: "La vallée de la Nubra & ses dunes",
        description:
          "Un désert froid verdoyant encadré de sommets : monastère de Diskit, dunes de Hundar et safari à dos de chameau de Bactriane.",
        image: "/images/destinations/places/nubra.jpg",
      },
      {
        title: "Le lac Tso Moriri à 4 400 m",
        description:
          "Des eaux d'un bleu intense où se reflètent les sommets enneigés, au milieu du plateau changthang et de ses campements de nomades changpa.",
        image: "/images/destinations/places/pangong.jpg",
      },
      {
        title: "Les monastères de la vallée de l'Indus",
        description:
          "Hemis, Thiksey le « petit Potala », Alchi et ses fresques cachemiries millénaires : un voyage au cœur du bouddhisme tibétain.",
        image: "/images/destinations/places/thiksey.jpg",
      },
    ],
    mapImage: "/images/destinations/maps/ladakh.jpg",
    cities: [
      "Delhi",
      "Leh",
      "Uley Topko",
      "Lamayuru",
      "Alchi",
      "Nubra",
      "Tso Moriri",
      "Tso Kar",
      "Taglang La",
    ],
    days: [
      {
        day: 1,
        title: "Delhi → Leh (3 505 m)",
        description:
          "Vol pour Leh, capitale du Ladakh blottie dans la haute vallée de l'Indus. Journée d'acclimatation en douceur — l'altitude se ressent les premiers jours : bazar, poste et temple de Lakhang Soma, premier contact avec la culture bouddhiste tibétaine.",
        image: "/images/destinations/ladakh-2.jpg",
      },
      {
        day: 2,
        title: "Leh — vallée de l'Indus",
        description:
          "Découverte des grands monastères de la vallée de l'Indus, bâtis sous la dynastie des Namgyal : Hemis, le plus vénéré, Thiksey le « petit Potala » et son Bouddha Maitreya, et le palais de Shey avec son Shakyamuni géant. Si le temps le permet, arrêt au palais de Stok, résidence de la famille royale.",
        image: "/images/destinations/places/thiksey.jpg",
      },
      {
        day: 3,
        title: "Leh → Likir → Uley Topko",
        description:
          "Route le long de l'Indus jusqu'à Likir, l'un des plus grands monastères gelugpa, et son musée de thangkas. Continuation vers Yangthang, puis belle descente à pied jusqu'au monastère de Rizong, adossé à un cirque de roches basaltiques. Nuit en campement à Uley Topko.",
        image: "/images/destinations/places/prayer-wheels.jpg",
      },
      {
        day: 4,
        title: "Uley Topko → Temisgam → Wanla",
        description:
          "Route vers Temisgam, riche village aux belles maisons, vergers et monastère perché. Continuation vers Wanla à travers des paysages spectaculaires, laissant la vallée de l'Indus filer vers le Pakistan.",
        image: "/images/destinations/places/nubra.jpg",
      },
      {
        day: 5,
        title: "Lamayuru & petite randonnée",
        description:
          "Randonnée par le col de Printiki La (3 750 m) jusqu'au monastère de Lamayuru, l'un des plus anciens du Ladakh, posé dans un paysage géologique « lunaire » exceptionnel. Visite du Sengge Lakhang et de la grotte où médita le sage Naropa.",
        image: "/images/destinations/places/thiksey.jpg",
      },
      {
        day: 6,
        title: "Wanla → Alchi → Leh",
        description:
          "Retour vers Leh en visitant le superbe monastère d'Alchi et ses fresques murales de style cachemiri d'une grande finesse, œuvre du « précieux traducteur » Rinchen Zangpo. En chemin, monastères de Phyang et Spituk, avec la chance d'assister à une cérémonie en fin de journée.",
        image: "/images/destinations/places/prayer-wheels.jpg",
      },
      {
        day: 7,
        title: "Leh → Khardung La → Nubra",
        description:
          "Franchissement du col de Khardung La (5 359 m), l'une des plus hautes routes carrossables du monde, vers la vallée de la Nubra, sur l'ancienne route caravanière de Leh à Kashgar. Descente vers des villages-oasis et nuit en campement à Tirith, dans un verger au bord de la rivière.",
        image: "/images/destinations/places/himalaya-pass.jpg",
      },
      {
        day: 8,
        title: "Nubra — Diskit & Hundar",
        description:
          "Journée dans la Nubra : montée au monastère de Diskit et sa grande statue de Maitreya dominant la vallée, puis Hundar et ses dunes de sable. En fin de journée, petit safari à dos de chameau de Bactriane, vestige des caravanes d'autrefois.",
        image: "/images/destinations/places/nubra.jpg",
      },
      {
        day: 9,
        title: "Nubra → Wari La (5 600 m) → Shakti",
        description:
          "Route vers le monastère de Samsthaling, puis longue et belle route peu fréquentée le long de la Shyok. Passage du col de Wari La (5 600 m) et descente vers le monastère de Tak Tak, niché autour d'une grotte de méditation. Campement près de Shakti.",
        image: "/images/destinations/ladakh-2.jpg",
      },
      {
        day: 10,
        title: "Vers le lac Tso Moriri (4 395 m)",
        description:
          "Route vers le lac Tso Moriri : des sommets enneigés se reflètent dans des eaux d'un bleu intense. Campement près du village de Karzok, à proximité des campements de nomades changpa.",
        image: "/images/destinations/places/pangong.jpg",
      },
      {
        day: 11,
        title: "Tso Moriri → Tso Kar",
        description:
          "Visite de Karzok et de son petit monastère, balade au bord du lac et rencontre des nomades changpa et de leurs troupeaux de chèvres pashmina et de yaks. Route vers le lac salé de Tso Kar, où l'on aperçoit souvent les ânes sauvages (kyangs) du plateau tibétain.",
        image: "/images/destinations/ladakh-2.jpg",
      },
      {
        day: 12,
        title: "Tso Kar → Taglang La → Leh",
        description:
          "Balade autour du lac blanc de Tso Kar avant de reprendre la route de Leh par le col de Taglang La (5 330 m), avec une vue superbe sur la vallée de Rupshu. Descente par des gorges étroites jusqu'à l'Indus. Fin de journée libre à Leh.",
        image: "/images/destinations/places/himalaya-pass.jpg",
      },
      {
        day: 13,
        title: "Leh → Delhi",
        description:
          "Vol du matin de Leh vers Delhi (soumis aux aléas climatiques de la montagne), puis temps libre dans la capitale.",
        image: "/images/destinations/places/thiksey.jpg",
      },
      {
        day: 14,
        title: "Delhi → vol retour",
        description:
          "Journée à Delhi, qui sert aussi de marge de sécurité en cas d'aléa sur le vol de montagne. Chambres à disposition pour vous rafraîchir avant le transfert à l'aéroport pour votre vol retour.",
        image: "/images/destinations/nord-delhi.jpg",
      },
    ],
  },
  {
    slug: "tour-triangle-dor-5-jours",
    breadcrumb: ["Asie", "Inde", "Inde du Nord"],
    title: "Le Triangle d'Or — Delhi, Jaipur & Agra",
    subtitle:
      "Le circuit essentiel de l'Inde du Nord en cinq jours : la capitale entre Vieux et New Delhi, la ville rose de Jaipur, la cité fantôme de Fatehpur Sikri et le Taj Mahal.",
    intro:
      "Trois villes, trois visages de l'Inde du Nord. Delhi mêle bazars moghols et avenues impériales, Jaipur déploie ses palais de grès rose au pied du fort d'Amber, et Agra garde le plus célèbre monument du monde. C'est le premier voyage idéal : des distances courtes, des sites classés à l'UNESCO à chaque étape, et un rythme confortable. Vous êtes accompagné d'un guide francophone du premier au dernier jour — cet itinéraire est un exemple, entièrement modulable avec Raja, notamment en l'étendant vers le Rajasthan ou Bénarès.",
    gallery: [
      "/images/destinations/triangle-dor.jpg",
      "/images/destinations/places/jaipur-hawa.jpg",
      "/images/destinations/places/fatehpur-sikri.jpg",
    ],
    facts: {
      tourType: "Circuit privé sur mesure",
      duration: "5 jours / 4 nuits",
      group: "Voyage privé — vous et votre guide",
      meals: "Petits-déjeuners quotidiens et dîners",
      bestFor: "Première découverte de l'Inde",
      price: "Sur devis — sans intermédiaire",
    },
    highlights: [
      {
        title: "Le Taj Mahal au petit matin",
        description:
          "Le mausolée de marbre blanc élevé par Shah Jahan pour son épouse Mumtaz, découvert dans la lumière douce du matin — le point d'orgue du circuit.",
        image: "/images/destinations/places/taj-reflect.jpg",
      },
      {
        title: "Rickshaw dans Chandni Chowk",
        description:
          "Plongée dans le Vieux Delhi : les ruelles encombrées du « point de rencontre illuminé par la lune », ses échoppes d'épices, de tissus et de fruits.",
        image: "/images/destinations/places/delhi-india-gate.jpg",
      },
      {
        title: "Le fort d'Amber et le Palais des Miroirs",
        description:
          "Montée au fort perché au-dessus de son lac, entre cours, pavillons et le fameux Sheesh Mahal aux milliers d'éclats de miroir.",
        image: "/images/destinations/places/jaipur-amber.jpg",
      },
      {
        title: "Fatehpur Sikri, la cité fantôme",
        description:
          "La capitale de grès rouge d'Akbar, abandonnée faute d'eau et intacte depuis le XVIe siècle — palais, kiosques, mosquées et la monumentale Buland Darwaza.",
        image: "/images/destinations/places/fatehpur-sikri.jpg",
      },
    ],
    mapImage: "/images/destinations/maps/triangle-dor.jpg",
    cities: ["Delhi", "Jaipur", "Fatehpur Sikri", "Agra"],
    days: [
      {
        day: 1,
        title: "Arrivée à Delhi",
        description:
          "Arrivée matinale à New Delhi et accueil par votre guide francophone. Visite du Vieux Delhi : promenade en rickshaw dans les ruelles du marché de Chandni Chowk, la Jama Masjid — plus grande mosquée du sous-continent, bâtie par Shah Jahan entre 1644 et 1658 — et passage devant le Fort Rouge. L'après-midi, New Delhi : le temple sikh de Bangla Sahib où des volontaires servent des repas sans distinction de caste, Connaught Place, la voie royale de Rajpath entre l'India Gate et le Rashtrapati Bhavan, le Qutub Minar (72 m, XIIe siècle) et le tombeau d'Humayun, ancêtre architectural du Taj Mahal. Nuit à l'hôtel.",
        image: "/images/destinations/places/delhi-india-gate.jpg",
      },
      {
        day: 2,
        title: "Delhi → Jaipur",
        description:
          "Route (environ 5 h) vers la capitale historique du Rajasthan. Jaipur doit son surnom de « ville rose » à la couleur du grès de ses palais, havelis et forts. Fondée en 1727 par Sawai Jai Singh II selon le Shilpa Shastra, ancien traité d'architecture hindoue, elle est cernée d'une enceinte fortifiée percée de sept portes. Installation à l'hôtel, puis temps libre pour flâner dans les bazars et la vieille ville. Visite du temple Laxmi Narayan (Birla Temple) et séance de cinéma « Bollywood » en soirée.",
        image: "/images/destinations/places/jal-mahal.jpg",
      },
      {
        day: 3,
        title: "Jaipur — Amber, Hawa Mahal & Jantar Mantar",
        description:
          "Arrêt photo devant la façade rose du Hawa Mahal, le Palais des Vents, dont les loges saillantes permettaient aux femmes de la cour d'observer la rue sans être vues. Dans les environs, visite du fort d'Amber, perché sur sa colline au-dessus d'un lac qui reflète ses terrasses : cours, pavillons, Palais des Miroirs et temple dédié à la déesse Kali. Retour en ville pour le City Palace, ancienne résidence des maharajahs et son musée de costumes royaux et de miniatures, puis l'observatoire astronomique de Jantar Mantar (début du XVIIIe siècle), dont les instruments monumentaux étonnent encore. Promenade en rickshaw dans la vieille ville et dîner-spectacle de marionnettes.",
        image: "/images/destinations/places/jaipur-amber.jpg",
      },
      {
        day: 4,
        title: "Jaipur → Fatehpur Sikri → Agra",
        description:
          "Route vers Fatehpur Sikri, classée au patrimoine mondial de l'UNESCO. Cette citadelle de grès rouge, bâtie par l'empereur moghol Akbar au XVIe siècle et abandonnée faute d'eau, mêle architecture indienne, iranienne et d'Asie centrale : palais, bâtiments à colonnades, kiosques, cours et bassins, le tout ceint d'une muraille à neuf portes. Déjeuner puis poursuite vers Agra et visite du Fort Rouge, classé à l'UNESCO. Construit sur une éminence dominant la Yamuna, il abrite de nombreux palais aux décors raffinés et raconte, en pierre, toute l'histoire de l'empire moghol.",
        image: "/images/destinations/places/fatehpur-sikri.jpg",
      },
      {
        day: 5,
        title: "Agra → Delhi & vol retour",
        description:
          "Découverte du Taj Mahal, lumineux mausolée de marbre blanc édifié par Shah Jahan pour son épouse Mumtaz Mahal. Étape dans un atelier d'incrustation de pierres précieuses sur marbre, où se perpétue la technique du pietra dura utilisée sur le monument. Route vers Delhi et transfert à l'aéroport international pour votre vol retour.",
        image: "/images/destinations/places/taj-classic.jpg",
      },
    ],
  },
  {
    slug: "tour-inde-du-sud-goa-20-jours",
    breadcrumb: ["Asie", "Inde", "Goa"],
    title: "Splendeur du Sud — du Tamil Nadu à Goa",
    subtitle:
      "Le grand traversée du sud de l'Inde en vingt jours : temples dravidiens, comptoirs français, plantations de thé, backwaters, ruines de Hampi et arrivée en douceur sur les plages de Goa.",
    intro:
      "Goa ne se visite jamais seul : c'est le point final naturel d'un voyage à travers le sud de l'Inde. Ce grand circuit part de Chennai, longe la côte de Coromandel et ses temples, traverse le Kerala des montagnes de thé aux canaux des backwaters, remonte au Karnataka par Mysore et les cités-temples de Hampi et Badami, puis descend vers la côte pour finir les pieds dans le sable, entre églises portugaises et cocotiers. Vous êtes accompagné d'un guide francophone du premier au dernier jour — un itinéraire exemple, que Raja raccourcit ou prolonge selon le temps dont vous disposez.",
    gallery: [
      "/images/destinations/goa.jpg",
      "/images/destinations/places/hampi.jpg",
      "/images/destinations/places/meenakshi.jpg",
    ],
    facts: {
      tourType: "Circuit privé sur mesure",
      duration: "20 jours / 19 nuits",
      group: "Voyage privé — vous et votre guide",
      meals: "Petits-déjeuners quotidiens et dîners",
      bestFor: "Temples, nature & plages",
      price: "Sur devis — sans intermédiaire",
    },
    highlights: [
      {
        title: "Les ruines de Hampi",
        description:
          "L'ancienne Vijayanagar, capitale d'un des plus vastes États hindous de l'histoire, réputée plus grande que Rome à son apogée : un site classé à l'UNESCO parmi les plus fabuleux d'Inde.",
        image: "/images/destinations/places/hampi.jpg",
      },
      {
        title: "Une nuit sur les backwaters",
        description:
          "Croisière et nuit à bord d'un kettuvallam, ancienne péniche à riz aménagée, au fil des canaux du Kerala, entre villages, églises et cuisine kéralaise aux épices douces.",
        image: "/images/destinations/places/kerala-houseboat.jpg",
      },
      {
        title: "Le temple de Meenakshi à Madurai",
        description:
          "Quatorze tours sculptées dont la plus haute dépasse 48 mètres, un bassin aux lotus dorés et la salle aux mille colonnes — et le soir, la cérémonie du coucher de la déesse.",
        image: "/images/destinations/places/meenakshi.jpg",
      },
      {
        title: "Goa, l'arrivée en douceur",
        description:
          "Les églises blanches de Velha Goa, l'estuaire de la Mandovi et les collines fleuries de Panaji, puis une journée entière de plage pour clore le voyage.",
        image: "/images/destinations/goa.jpg",
      },
    ],
    mapImage: "/images/destinations/maps/sud.jpg",
    cities: [
      "Chennai",
      "Mahabalipuram",
      "Pondichéry",
      "Tanjore",
      "Trichy",
      "Madurai",
      "Munnar",
      "Periyar",
      "Backwaters",
      "Cochin",
      "Wayanad",
      "Mysore",
      "Hassan",
      "Bangalore",
      "Hampi",
      "Badami",
      "Goa",
    ],
    days: [
      {
        day: 1,
        title: "Arrivée à Chennai → Mahabalipuram",
        description:
          "Accueil à l'aéroport et tour d'orientation de Chennai, l'ancienne Madras, site de la première Compagnie des Indes britanniques fondée en 1639 et aujourd'hui quatrième ville d'Inde : passage devant le fort Saint-Georges (XVIIe siècle), églises et temples. Route vers Mahabalipuram, ancien port de la dynastie Pallava. Découverte des Cinq Ratha taillés dans le roc, du bas-relief de la Descente du Gange — 27 m sur 9, le plus grand du monde — et du temple du Rivage, qui défie les vagues de l'océan depuis douze siècles.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 2,
        title: "Mahabalipuram → Pondichéry",
        description:
          "Route vers Pondichéry, ancien comptoir français au bord de la plage. Promenade dans la « ville blanche » au charme colonial, aux avenues à angle droit et aux noms qui rappellent l'époque de Dupleix, gouverneur général en 1742. Visite de l'ashram de Sri Aurobindo, du couvent des sœurs de Cluny et du quartier tamoul aux maisons colorées. Arrêt au grand marché Goubert, profusion de tissus, fleurs et légumes, puis temps libre pour chiner dans les boutiques de la ville.",
        image: "/images/destinations/goa.jpg",
      },
      {
        day: 3,
        title: "Pondichéry → Chidambaram → Darasuram → Tanjore",
        description:
          "Départ vers Gangaikondacholapuram, capitale de l'empire Chola bâtie par le roi Rajendra vers 1025, où l'on raconte que les princes vaincus du Bengale durent porter l'eau sacrée du Gange. Arrêt à Chidambaram devant le sanctuaire de Nataraja, le « danseur cosmique », l'une des plus célèbres représentations de Shiva. Puis Darasuram et le temple d'Airavatesvara (XIIe siècle), inscrit à l'UNESCO en 2004. Arrivée à Tanjore, capitale de la danse et de la musique, et visite du palais et de sa collection de bronzes des IXe-XIIe siècles.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 4,
        title: "Tanjore → Trichy → Tanjore",
        description:
          "Journée à Trichy, capitale religieuse du Tamil Nadu. Visite de l'île de Srirangam et du sanctuaire vishnouite de Sri Ranganathaswamy, véritable cité-temple où l'on vénère Vishnou étendu sur le serpent primordial : le mandapa des mille piliers et la cour des chevaux en sont les points forts. Montée au fort perché sur sa colline et à ses temples. Retour à Tanjore pour le temple de Brihadishvara, élevé par Rajaraja Chola Ier au début du XIe siècle, et le musée du bronze avec l'atelier d'un artisan.",
        image: "/images/destinations/places/hampi.jpg",
      },
      {
        day: 5,
        title: "Tanjore → Chettinad → Madurai",
        description:
          "Départ matinal vers Karaikudi, au cœur du Chettinad, région des Chettiars — une communauté de riches marchands qui y bâtirent des demeures baroques uniques, tout autre visage de la culture tamoule que celui des sanctuaires. Route vers Madurai, haut lieu de pèlerinage hindou. Visite du palais de Tirumalai Nayak et du temple de Meenakshi, dédié à Shiva et à son épouse, bâti entre 1623 et 1660 : bassin aux lotus dorés, salle aux mille colonnes et quatorze tours visibles à des kilomètres. Le soir, départ en tuk-tuk pour la cérémonie du coucher de la déesse Parvati.",
        image: "/images/destinations/places/meenakshi.jpg",
      },
      {
        day: 6,
        title: "Madurai → Munnar",
        description:
          "Route vers Munnar au Kerala (160 km, environ 7 h), à travers les Ghats occidentaux et les Nilgiris. La route traverse forêts primaires, plantations de thé et de cardamome ; la région s'étage entre 1 650 et 2 650 m et abrite éléphants, gaurs, nilgiri tahrs, langurs et une grande variété d'oiseaux. Visite du musée du thé et dégustation, initiation à la cuisine kéralaise chez l'habitant, puis promenade au marché aux épices en fin d'après-midi.",
        image: "/images/destinations/places/munnar.jpg",
      },
      {
        day: 7,
        title: "Munnar — randonnée à Kolukkumalai",
        description:
          "Journée de marche dans les plantations de thé les plus hautes du pays. Court transfert en voiture puis quatre heures de montée à travers forêts et théiers jusqu'au point culminant de Kolukkumalai, avec un panorama superbe sur le mont Meesapulimala, deuxième sommet de l'Inde du Sud. Pique-nique au sommet. L'après-midi, descente jusqu'à la manufacture de thé pour comprendre les étapes de la culture et de la récolte, puis retour à l'hôtel.",
        image: "/images/destinations/places/munnar.jpg",
      },
      {
        day: 8,
        title: "Munnar → Periyar (Thekkady)",
        description:
          "Route vers la réserve de Periyar, fondée en 1934 dans la chaîne des Ghats occidentaux, pour apprécier la luxuriance sauvage des High Ranges. Le parc abrite tigres, éléphants, bisons, antilopes, singes et une avifaune abondante ; des croisières en bateau d'environ deux heures y sont organisées. Les collines alentour sont couvertes de plantations de thé, poivre, cardamome, cumin, café et clous de girofle. En soirée, représentation de kalarippayatt, l'art martial du Kerala.",
        image: "/images/destinations/places/tiger.jpg",
      },
      {
        day: 9,
        title: "Periyar → nuit sur les backwaters",
        description:
          "Embarquement vers midi à bord d'un house boat (kettuvallam), ancienne péniche à riz aujourd'hui aménagée pour la croisière. Découverte de la vie des habitants au bord des backwaters du Kerala, des villages et des églises qui bordent les canaux et les rivières, et dégustation de plats kéralais aux épices douces. Déjeuner, dîner et nuit à bord.",
        image: "/images/destinations/places/kerala-houseboat.jpg",
      },
      {
        day: 10,
        title: "Backwaters → Cochin",
        description:
          "Route vers Cochin, ancien comptoir colonial. Visite du palais hollandais de Mattancherry, célèbre pour ses peintures murales du Ramayana, de la synagogue au cœur du quartier juif (fermée le samedi), de l'église Saint-François et de la cathédrale Santa Cruz. Promenade à pied dans le quartier des antiquaires et après-midi libre pour flâner. En soirée, spectacle de danse kathakali et dîner de fruits de mer.",
        image: "/images/destinations/places/kochi.jpg",
      },
      {
        day: 11,
        title: "Cochin → Calicut → Wayanad",
        description:
          "Train jusqu'à Calicut, puis route vers le Wayanad, très belle région de collines aux paysages superbes, couverte de plantations d'épices. Une étape verte et paisible, loin des circuits touristiques classiques.",
        image: "/images/destinations/places/kerala-canoe.jpg",
      },
      {
        day: 12,
        title: "Wayanad → Mysore",
        description:
          "Quatre heures de route jusqu'à Mysore, gardienne des traditions face à la moderne Bangalore : chaque année, la cité perpétue le faste du royaume de Vijayanagar lors des fêtes de Dasara, sous l'autorité morale du descendant du maharaja. Visite du fastueux palais du maharaja, considéré comme l'un des plus beaux d'Inde, puis découverte de l'artisanat local — soieries, bois de santal, mosaïques. Excursion à la colline de Chamundi avec halte au temple de Sri Chamundeshwari.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 13,
        title: "Mysore → Shravanabelagola → Hassan",
        description:
          "En route, visite de Shravanabelagola, grand centre des jaïns Digambara : le pic est surmonté d'une statue colossale et nue de 18 mètres, au visage d'un calme saisissant. Près de Hassan, le temple de Chennakeshava à Belur, merveille hoysala bâtie sur un plan en étoile, déploie des reliefs admirables de scènes de bataille et de mythologie. À Halebid, le temple inachevé de Hoysaleshvara, dédié à Shiva et Parvati, est un véritable joyau d'orfèvrerie sculpté dans la stéatite. Repas traditionnel en tenue locale — sari et dhoti.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 14,
        title: "Hassan → Bangalore",
        description:
          "Route vers Bangalore, capitale du Karnataka. Visite du musée et flânerie dans le parc botanique de Lal Bagh, l'un des plus beaux jardins d'Inde, créé au XVIIIe siècle. Une journée plus douce entre deux grandes étapes.",
        image: "/images/destinations/kerala-2.jpg",
      },
      {
        day: 15,
        title: "Bangalore → Hospet",
        description:
          "Longue route vers Hospet, base de départ pour Hampi. Arrêts photo sur les paysages du plateau du Deccan et visite d'une école de village en chemin, pour un moment de rencontre en dehors des sites.",
        image: "/images/destinations/places/hampi.jpg",
      },
      {
        day: 16,
        title: "Hampi, la cité de Vijayanagar",
        description:
          "Journée entière au cœur de l'un des sites les plus fabuleux d'Inde : les vestiges de Vijayanagar et le temple de Vittala. Capitale de l'un des plus vastes États hindous de l'histoire, la ville fut, dit-on, plus grande que Rome et prospéra deux siècles durant comme centre de commerce international, avant d'être mise à sac au XVIe siècle. Un chaos de blocs de granit, de temples et de bazars royaux à perte de vue.",
        image: "/images/destinations/places/hampi.jpg",
      },
      {
        day: 17,
        title: "Hospet → Badami → Hubli",
        description:
          "Route vers Badami (215 km), ancienne capitale de l'empire Chalukya, célèbre pour ses grottes taillées dans le grès rouge et dédiées à Shiva, à Vishnou et au jaïnisme — un témoignage de plus de la multiplicité des religions nées sur ce territoire. Visite de Pattadakal et d'Aihole, deux des plus beaux ensembles de temples dravidiens : la première connut son apogée au VIIe siècle, la seconde, dont les plus anciens temples remontent au IVe, est considérée comme le berceau de l'architecture indienne. Route vers Hubli.",
        image: "/images/destinations/places/temple-gopuram.jpg",
      },
      {
        day: 18,
        title: "Hubli → Goa",
        description:
          "Route vers Goa. Toute la nostalgie coloniale se retrouve dans cet ancien comptoir portugais, où les petites églises blanches et les cathédrales de Velha Goa évoquent davantage l'Amérique latine que l'Asie. Dans l'estuaire de la Mandovi, sillonné de barges et de bateaux à vapeur, Panaji étale son architecture coloniale sur une colline verdoyante et fleurie — la capitale de l'État, fondée par les Portugais en 1760 sous le nom de Nova Goa.",
        image: "/images/destinations/goa.jpg",
      },
      {
        day: 19,
        title: "Goa — journée libre",
        description:
          "Journée entière à la plage, sans programme. Baignade, cuisine goanaise et coucher de soleil sur la mer d'Oman : la respiration qui referme trois semaines de route et de temples.",
        image: "/images/destinations/places/palolem.jpg",
      },
      {
        day: 20,
        title: "Goa → Bombay → vol retour",
        description:
          "Selon votre horaire, dernière matinée libre au bord de l'eau, puis transfert à l'aéroport pour votre vol retour via Bombay.",
        image: "/images/destinations/places/goa-beach.jpg",
      },
    ],
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getAllTourSlugs(): string[] {
  return tours.map((t) => t.slug);
}
