export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
  /** Internal links shown under the article ("Pour aller plus loin"). */
  links?: { href: string; label: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "circuit-inde-du-sud",
    title: "Circuit Inde du Sud : l'itinéraire idéal en 2 ou 3 semaines",
    excerpt:
      "Tamil Nadu, Kerala, Karnataka : comment construire un circuit en Inde du Sud, quelle durée prévoir et à quelle saison partir.",
    date: "13 novembre 2026",
    category: "Destinations",
    readTime: "9 min",
    image: "/images/destinations/places/kerala-houseboat.jpg",
    content: [
      "Un circuit en Inde du Sud se construit idéalement en 14 jours : on part de Chennai, on descend la côte du Tamil Nadu jusqu'à Pondichéry, on traverse les grandes villes-temples jusqu'à Madurai, puis on monte dans les plantations de thé de Munnar avant de finir sur les backwaters du Kerala et à Cochin. Avec 20 jours, on ajoute le Karnataka (Mysore, Hampi) et quelques jours à Goa. La meilleure période va de décembre à mars.",
      "Quand partir ? Le Sud a deux moussons. Le Kerala reçoit la grande mousson de juin à septembre, tandis que la côte du Tamil Nadu reçoit l'essentiel de ses pluies d'octobre à décembre. Pour combiner les deux États sans mauvaise surprise, la fenêtre la plus sûre va de décembre à mars. En avril et mai, la chaleur devient forte en plaine, mais les collines de Munnar restent agréables.",
      "Première étape : la côte de Coromandel. Depuis Chennai, environ une heure et demie de route mène à Mahabalipuram, ses temples du rivage et ses bas-reliefs classés à l'UNESCO. Pondichéry suit, avec son quartier français aux façades ocre et jaunes, ses rues calmes et sa promenade face au golfe du Bengale. C'est une entrée en douceur, idéale après le vol depuis la France.",
      "Le cœur spirituel du voyage, ce sont les villes-temples du Tamil Nadu. À Tanjore, le temple de Brihadishvara, chef-d'œuvre de la dynastie Chola, est classé à l'UNESCO. Trichy et son temple de Srirangam, l'un des plus vastes d'Inde, se visitent dans la foulée. À Madurai, le temple de Meenakshi et ses tours couvertes de milliers de sculptures colorées sont un sommet du voyage : y revenir le soir, pendant la cérémonie qui accompagne le dieu Shiva vers la chambre de la déesse, change complètement la visite.",
      "Entre Tanjore et Madurai, le pays Chettinad mérite une nuit. Ses grandes demeures de marchands, avec leurs cours intérieures, leurs colonnes de teck et leurs carrelages importés, sont uniques en Inde. C'est aussi le berceau d'une cuisine épicée réputée dans tout le pays.",
      "Ensuite, la route monte vers les Ghâts occidentaux. Comptez environ cinq heures de Madurai à Munnar, à plus de 1 500 mètres d'altitude, au milieu des plantations de thé. Deux nuits sont un minimum pour marcher entre les théiers, visiter une fabrique et profiter de la fraîcheur. Thekkady et la réserve de Periyar, à quelques heures, ajoutent les plantations d'épices et la forêt.",
      "Le Kerala se découvre ensuite au fil de l'eau. Une nuit à bord d'un kettuvallam, la péniche traditionnelle des backwaters autour d'Alleppey, est souvent le souvenir le plus fort du voyage : les villages au bord des canaux, les rizières, le coucher de soleil sur les lagunes. Cochin conclut le circuit avec Fort Kochi, ses filets de pêche chinois, son quartier juif et un spectacle de kathakali.",
      "Avec trois semaines, le Karnataka complète parfaitement le tableau : le palais de Mysore, les temples hoysala de Belur et Halebid, puis Hampi, ancienne capitale de l'empire de Vijayanagar, dont les ruines dispersées au milieu des rochers sont classées à l'UNESCO. Goa offre ensuite quelques jours de plage et d'héritage portugais avant le vol retour.",
      "Erreur fréquente à éviter : vouloir tout voir en dix jours. Les distances sont importantes et les routes de montagne lentes. Il vaut mieux renoncer à une étape que d'enchaîner les journées de six heures de voiture. Un circuit réussi en Inde du Sud alterne une journée de route et une journée sur place.",
      "Raja, guide francophone agréé depuis 25 ans, construit ces circuits sur mesure avec chauffeur privé, guides locaux francophones lorsque c'est possible et hébergements de caractère. Les deux itinéraires ci-dessous servent de point de départ : ils s'adaptent à vos dates, à votre rythme et à vos envies.",
    ],
    links: [
      { href: "/circuits/tour-inde-du-sud-14-jours", label: "Circuit Inde du Sud — 14 jours" },
      { href: "/circuits/tour-inde-du-sud-goa-20-jours", label: "Du Tamil Nadu à Goa — 20 jours" },
      { href: "/destinations/sud", label: "Destination Inde du Sud" },
      { href: "/destinations/kerala", label: "Destination Kerala" },
    ],
  },
  {
    slug: "inde-du-sud-incontournables",
    title: "Inde du Sud : les 10 incontournables à ne pas manquer",
    excerpt:
      "Temples du Tamil Nadu, backwaters du Kerala, ruines de Hampi : les étapes essentielles d'un premier voyage en Inde du Sud.",
    date: "12 novembre 2026",
    category: "Destinations",
    readTime: "8 min",
    image: "/images/destinations/places/meenakshi.jpg",
    content: [
      "Les incontournables de l'Inde du Sud sont le temple de Meenakshi à Madurai, les backwaters du Kerala, les plantations de thé de Munnar, Fort Kochi, le temple de Tanjore, Pondichéry, Mahabalipuram, Hampi, le palais de Mysore et les plages de Goa. Un circuit de deux semaines permet d'en voir sept ; trois semaines sont nécessaires pour les dix.",
      "1. Le temple de Meenakshi, à Madurai. C'est le temple le plus spectaculaire du Sud : un ensemble de tours monumentales, les gopurams, couvertes de milliers de divinités peintes. Le temple vit jour et nuit, et la visite du soir, plus recueillie, est souvent la plus marquante.",
      "2. Les backwaters du Kerala. Ce réseau de canaux, de lagunes et de rizières autour d'Alleppey et de Kumarakom se découvre à bord d'un kettuvallam, une péniche traditionnelle en bois. Une nuit à bord est l'expérience la plus emblématique du Kerala.",
      "3. Munnar et ses plantations de thé. À plus de 1 500 mètres d'altitude, les collines couvertes de théiers offrent une fraîcheur bienvenue et de belles randonnées. Prévoyez au moins deux nuits pour en profiter sans courir.",
      "4. Fort Kochi. Filets de pêche chinois sur le front de mer, églises portugaises, synagogue de Paradesi, entrepôts d'épices : Cochin résume des siècles d'échanges entre l'Inde et le monde. Le soir, un spectacle de kathakali, avec son maquillage impressionnant, est un vrai moment de culture keralaise.",
      "5. Le temple de Brihadishvara, à Tanjore. Construit il y a environ mille ans par la dynastie Chola et classé à l'UNESCO, il impressionne par la hauteur de sa tour de granit. C'est l'un des sommets de l'architecture tamoule.",
      "6. Pondichéry. L'ancien comptoir français garde son quartier blanc, ses rues aux noms français, ses villas coloniales et sa promenade en bord de mer. Une étape reposante, souvent appréciée pour son ambiance et sa cuisine.",
      "7. Mahabalipuram. Les temples du rivage et la grande Descente du Gange, un bas-relief sculpté dans la roche, comptent parmi les plus anciens monuments du Sud. Le site est classé à l'UNESCO et se trouve à environ une heure et demie de Chennai.",
      "8. Hampi. Au Karnataka, les ruines de l'ancienne capitale de l'empire de Vijayanagar s'étendent au milieu d'un paysage de rochers et de bananeraies. Temples, bazars et palais se visitent à pied ou à vélo ; deux jours sont un minimum.",
      "9. Le palais de Mysore. Résidence des maharajas de Mysore, il est illuminé de milliers d'ampoules certains soirs, notamment le dimanche. La ville est aussi connue pour son marché aux fleurs et ses encens.",
      "10. Goa. Pour finir le voyage en douceur : plages, églises baroques de Old Goa classées à l'UNESCO et maisons portugaises colorées. Goa se combine facilement avec Hampi ou en fin de circuit.",
      "Comment tout combiner ? Les étapes 1 à 7 forment un circuit classique de deux semaines entre Chennai et Cochin. Hampi, Mysore et Goa demandent une semaine de plus. Raja adapte l'ordre des étapes à la saison et à vos dates pour limiter les longues journées de route.",
    ],
    links: [
      { href: "/destinations/sud", label: "Destination Inde du Sud" },
      { href: "/circuits/tour-inde-du-sud-14-jours", label: "Circuit Inde du Sud — 14 jours" },
      { href: "/circuits/tour-inde-du-sud-goa-20-jours", label: "Du Tamil Nadu à Goa — 20 jours" },
      { href: "/destinations/goa", label: "Destination Goa" },
    ],
  },
  {
    slug: "safari-tigre-inde",
    title: "Safari tigre en Inde : quels parcs choisir et quand partir ?",
    excerpt:
      "Ranthambore, Kanha, Bandhavgarh : où voir le tigre du Bengale, à quelle saison, et comment organiser ses safaris en jeep.",
    date: "11 novembre 2026",
    category: "Nature & safari",
    readTime: "8 min",
    image: "/images/destinations/places/tiger.jpg",
    content: [
      "Pour un safari tigre en Inde, les meilleurs parcs sont Ranthambore au Rajasthan, facile à intégrer à un circuit classique, et Kanha ou Bandhavgarh au Madhya Pradesh, plus sauvages. Les parcs sont ouverts d'octobre à juin ; leurs zones principales ferment pendant la mousson, du 1er juillet au 30 septembre. Comptez trois ou quatre safaris pour avoir de bonnes chances d'observer un tigre.",
      "Ranthambore est le parc le plus simple à combiner avec un premier voyage. Situé entre Jaipur et Agra, il s'ajoute naturellement à un circuit au Rajasthan ou au Triangle d'Or. Ses paysages sont uniques : un ancien fort perché au-dessus de la jungle, des lacs et des ruines où les tigres ont l'habitude de passer.",
      "Kanha et Bandhavgarh, au Madhya Pradesh, sont les parcs des amateurs de nature. Kanha, avec ses grandes prairies et ses forêts de sal, est le décor qui aurait inspiré le Livre de la Jungle. Bandhavgarh est réputé pour sa forte densité de tigres. Ces parcs se combinent bien avec les temples de Khajuraho. Pench et, au Maharashtra, Tadoba sont d'autres excellentes options.",
      "Quand partir ? D'octobre à février, le climat est agréable et la forêt verdoyante, mais les matinées peuvent être froides en jeep découverte : prévoyez une polaire et un bonnet. De mars à juin, la chaleur devient forte, la végétation s'éclaircit et les animaux se rassemblent autour des points d'eau : c'est la période où les observations sont les plus fréquentes. Pendant la mousson, seules quelques zones tampons restent ouvertes, comme les zones 6 à 10 de Ranthambore.",
      "Comment se déroule un safari ? Il y a deux sorties par jour : tôt le matin, dès le lever du soleil, et l'après-midi jusqu'au coucher. Chaque sortie dure environ trois à quatre heures, dans une zone attribuée à l'avance. Le véhicule idéal est la jeep (gypsy) de six passagers, plus calme et plus mobile que le canter, un camion découvert d'une vingtaine de places.",
      "Les permis de safari sont nominatifs et se réservent sur les portails officiels des parcs, avec les informations du passeport. Les places sont limitées et partent vite en haute saison et pendant les vacances indiennes : il faut réserver plusieurs semaines, voire plusieurs mois, à l'avance. Certains parcs du Madhya Pradesh ferment par ailleurs leurs zones principales un après-midi par semaine, généralement le mercredi.",
      "Voir un tigre n'est jamais garanti. Il s'agit d'animaux sauvages sur de vastes territoires. Trois ou quatre safaris sur deux jours augmentent nettement les chances, et même sans tigre, l'expérience reste forte : léopards parfois, cerfs, sambars, singes langurs, crocodiles, et une avifaune remarquable.",
      "Quelques règles à respecter : silence pendant les observations, pas de vêtements aux couleurs vives, ne jamais demander au chauffeur de quitter la piste ou de s'approcher trop près d'un animal. Les guides naturalistes et les chauffeurs connaissent les habitudes des animaux : leur faire confiance, c'est aussi protéger la faune.",
      "Combien de jours prévoir ? Deux nuits sur place suffisent pour Ranthambore dans un circuit au Rajasthan. Pour Kanha ou Bandhavgarh, trois nuits sont préférables, car les parcs sont plus éloignés et plus vastes. Raja s'occupe des réservations de permis et choisit des lodges proches de l'entrée des parcs pour éviter les trajets inutiles avant l'aube.",
    ],
    links: [
      { href: "/destinations/madhya-pradesh", label: "Destination Madhya Pradesh" },
      { href: "/destinations/rajasthan", label: "Destination Rajasthan" },
      { href: "/circuits/tour-triangle-dor-5-jours", label: "Le Triangle d'Or — 5 jours" },
      { href: "/creer-mon-itineraire", label: "Créer mon itinéraire avec safari" },
    ],
  },
  {
    slug: "circuit-rajasthan",
    title: "Circuit Rajasthan : quel itinéraire en 8, 12 ou 16 jours ?",
    excerpt:
      "Jaipur, Jodhpur, Udaipur, Jaisalmer : les itinéraires conseillés au Rajasthan selon votre durée de voyage, avec temps de trajet réels.",
    date: "10 novembre 2026",
    category: "Destinations",
    readTime: "9 min",
    image: "/images/destinations/places/udaipur-city-palace.jpg",
    content: [
      "Le circuit Rajasthan idéal dure 12 jours : Delhi, le Shekhawati, Bikaner, Jaisalmer et le désert du Thar, Jodhpur, Ranakpur, Udaipur, Pushkar, Jaipur, puis Agra et le Taj Mahal. En 8 jours, il vaut mieux se concentrer sur le Triangle d'Or et une ou deux villes royales ; en 16 jours, on ajoute Varanasi et le Gange. La meilleure saison va d'octobre à mars.",
      "En 8 jours : Delhi, Agra, Jaipur, puis Jodhpur ou Udaipur. C'est le format d'un premier aperçu. Il permet de voir le Taj Mahal, le fort d'Amber et une grande cité royale sans passer ses journées en voiture. Le désert de Jaisalmer, trop éloigné, est à garder pour un circuit plus long.",
      "En 12 jours : la grande boucle. Depuis Delhi, on rejoint Mandawa et ses havelis peintes du Shekhawati (environ 265 km, six heures et demie de route), puis Bikaner (environ quatre heures) et Jaisalmer (environ cinq heures et demie). La forteresse dorée de Jaisalmer et une nuit dans le désert du Thar, avec coucher de soleil sur les dunes, sont souvent le moment préféré des voyageurs.",
      "La boucle continue vers Jodhpur, la ville bleue dominée par le fort de Mehrangarh (environ cinq heures depuis Jaisalmer), puis Udaipur en passant par le temple jaïn de Ranakpur, une merveille de marbre aux 1 444 colonnes toutes différentes. Udaipur, ses palais au bord du lac Pichola et sa promenade en barque au crépuscule méritent deux nuits.",
      "La fin du circuit passe par Pushkar, petite ville sainte autour de son lac, puis Jaipur, la ville rose : le fort d'Amber, le Hawa Mahal, l'observatoire du Jantar Mantar et les bazars. Sur la route d'Agra, la cité abandonnée de Fatehpur Sikri précède le Taj Mahal, à découvrir de préférence au lever du soleil.",
      "En 16 jours : le Rajasthan et Bénarès. Après la boucle du Rajasthan, un train de nuit ou un vol rejoint Varanasi, la ville sainte au bord du Gange. Les ghats à l'aube, la cérémonie de l'aarti le soir et une promenade en barque complètent le voyage par une dimension spirituelle très forte.",
      "Quand partir ? D'octobre à mars, les journées sont ensoleillées et douces, avec des nuits fraîches dans le désert de décembre à février. La foire de Pushkar, en octobre ou novembre selon le calendrier lunaire, et la fête de Holi, en mars, sont des moments forts mais très fréquentés. D'avril à juin, la chaleur dépasse souvent 40 °C.",
      "Voiture avec chauffeur ou train ? Pour un circuit au Rajasthan, la voiture avec chauffeur est la solution la plus confortable : elle permet de s'arrêter dans les villages, à Ranakpur ou dans les havelis du Shekhawati, que le train ne dessert pas. Le train reste utile sur certains axes, comme Udaipur–Jaipur ou Delhi–Agra.",
      "L'erreur classique est de vouloir voir toutes les villes en une semaine. Au Rajasthan, 250 km représentent souvent cinq à six heures de route. Mieux vaut deux nuits par étape importante et une journée de route sur deux.",
      "Raja, guide francophone agréé, organise ces circuits sans intermédiaire : chauffeur privé, guides francophones dans les villes, havelis et palais transformés en hôtels de charme. Les itinéraires ci-dessous sont un point de départ, entièrement modulables.",
    ],
    links: [
      { href: "/circuits/rajasthan-classique-12-jours", label: "Rajasthan classique — 12 jours" },
      { href: "/circuits/tour-inde-du-nord-16-jours", label: "Rajasthan et Bénarès — 16 jours" },
      { href: "/destinations/rajasthan", label: "Destination Rajasthan" },
      { href: "/guides/carte-interactive-rajasthan", label: "Carte interactive du Rajasthan" },
    ],
  },
  {
    slug: "voyager-en-inde-avec-des-enfants",
    title: "Voyager en Inde avec des enfants : une aventure à leur hauteur",
    excerpt:
      "Rythme, étapes et rencontres : comment imaginer un voyage familial en Inde qui émerveille les enfants sans les épuiser.",
    date: "18 octobre 2026",
    category: "Voyage en famille",
    readTime: "8 min",
    image: "/images/destinations/places/jaipur-amber.jpg",
    content: [
      "Au lever du jour, Jaipur n'est encore qu'un murmure. Les marchands soulèvent leurs rideaux de métal, un vendeur de chai fait danser le thé entre deux gobelets et, au loin, les remparts d'Amber prennent la couleur du miel. Pour un enfant, l'Inde commence souvent ainsi : non par une longue explication, mais par une scène qu'il n'oubliera pas.",
      "Voyager en Inde en famille ne consiste pas à suivre un circuit d'adultes en demandant aux plus jeunes de tenir le rythme. Le voyage devient plus beau lorsque chaque journée leur laisse le temps de regarder, de poser des questions et de transformer un palais, un marché ou un trajet en véritable histoire.",
      "Le Rajasthan se prête particulièrement bien à cette première rencontre. À Delhi, les enfants découvrent les tuk-tuks et les grands jardins. À Agra, le Taj Mahal ressemble à un décor sorti d'un conte. À Jaipur, les passages secrets des forts réveillent l'imagination. Plus à l'ouest, Jodhpur et Jaisalmer ouvrent la route du désert et de ses nuits étoilées.",
      "La clé n'est pas de multiplier les villes, mais de choisir quelques étapes qui ont chacune une personnalité forte. Deux nuits au même endroit changent tout : une matinée peut être consacrée à une visite, l'après-midi à la piscine ou au jardin de l'hôtel, puis la soirée à une promenade tranquille. Le voyage garde ainsi son énergie au lieu de devenir une course.",
      "Les trajets font eux aussi partie du récit. Depuis la voiture, les paysages passent des faubourgs animés aux champs de moutarde, puis aux villages où les troupeaux traversent encore la route. Avec un chauffeur qui connaît les habitudes de la famille, une pause peut se décider au bon moment et une longue liaison devenir une succession de petites découvertes.",
      "Les hébergements de caractère donnent une autre dimension au séjour. Une ancienne haveli avec une cour intérieure, une demeure familiale ou un petit palais racontent l'Inde même lorsque la journée de visite est terminée. Les enfants se souviennent souvent autant d'un escalier caché ou d'un petit déjeuner sur une terrasse que d'un monument célèbre.",
      "L'Inde invite aussi à la rencontre. Quelques mots échangés avec une famille, l'observation d'un artisan ou un atelier de cuisine créent un lien plus direct que n'importe quel discours. Encadrées avec simplicité et respect, ces rencontres permettent aux enfants de comprendre que le voyage n'est pas seulement une collection de lieux, mais une manière de regarder le monde autrement.",
      "Un itinéraire familial réussi garde enfin une part de souplesse. La chaleur, la fatigue ou l'enthousiasme du moment peuvent modifier le programme. Renoncer à une visite pour prolonger une promenade ou rentrer plus tôt n'enlève rien au voyage. C'est souvent dans ces respirations que naissent les meilleurs souvenirs.",
      "Raja construit chaque circuit familial autour de l'âge des enfants, du temps disponible et du rythme réel de la famille. L'objectif n'est pas de tout montrer, mais de créer une première Inde que petits et grands auront envie de continuer à raconter longtemps après leur retour.",
    ],
  },
  {
    slug: "train-ou-voiture-avec-chauffeur-en-inde",
    title: "Train ou voiture avec chauffeur : comment voyager à travers l'Inde ?",
    excerpt:
      "Deux façons de traverser le pays, deux expériences très différentes. Voici comment choisir selon les distances et le rythme du voyage.",
    date: "14 octobre 2026",
    category: "Transports",
    readTime: "8 min",
    image: "/images/destinations/nord-delhi.jpg",
    content: [
      "À la gare de Delhi, les quais racontent déjà le voyage. Des familles partagent un repas, les vendeurs avancent entre les voyageurs et le nom des villes résonne sous la grande toiture. Quelques heures plus tard, sur une route du Rajasthan, le décor est tout autre : villages, temples, camions peints et troupeaux apparaissent derrière la vitre. Le train et la voiture ne montrent pas la même Inde.",
      "Le train est une expérience à part entière. Il relie efficacement certaines grandes villes et permet de traverser de longues distances sans passer toute la journée sur la route. Entre Delhi, Agra, Jaipur ou Varanasi, il peut offrir un moment vivant, ponctué de conversations et de paysages observés depuis la fenêtre.",
      "Mais un voyage en train suit son propre rythme. Il faut rejoindre la gare, trouver le bon quai, composer avec les horaires et organiser séparément les déplacements à l'arrivée. Pour certains voyageurs, cette énergie fait partie du plaisir. Pour d'autres, elle ajoute une contrainte à une journée déjà dense.",
      "La voiture avec chauffeur apporte une liberté différente. Elle attend devant l'hôtel, accueille les bagages et permet de partir quand la journée commence réellement. Sur la route de Jaipur à Jodhpur ou de Jodhpur à Udaipur, elle ouvre aussi la porte à des étapes que le train laisse de côté : un village, un temple isolé, un marché ou le sanctuaire de Ranakpur.",
      "Cette souplesse compte particulièrement dans un circuit comprenant plusieurs villes. Le chauffeur ne remplace pas le guide dans les monuments, mais il devient un repère constant entre les étapes. Il connaît les routes, les temps de parcours réalistes et les endroits où une pause a du sens.",
      "Le choix dépend donc moins d'une préférence absolue que de chaque liaison. Un train rapide peut être idéal entre Delhi et Agra. Une voiture devient plus naturelle pour explorer le Rajasthan en profondeur. Un train de nuit ou un vol intérieur peut éviter une journée trop longue lorsque les distances changent d'échelle.",
      "Les meilleurs itinéraires combinent souvent plusieurs moyens de transport. Le train apporte une immersion et économise du temps sur certains axes. La voiture crée de la continuité et permet d'atteindre les lieux situés entre les grandes villes. L'avion garde sa place lorsque deux régions éloignées doivent être reliées sans sacrifier plusieurs jours.",
      "Sur une carte, deux étapes peuvent sembler proches. En Inde, la circulation, l'état des routes et les traversées de villages transforment pourtant les kilomètres en temps vécu. Prévoir moins d'étapes et mieux choisir les liaisons donne au voyage une respiration que les itinéraires trop serrés n'ont jamais.",
      "Raja étudie chaque trajet séparément avant de construire le circuit. Le résultat n'est ni un voyage entièrement en train ni une succession automatique de journées en voiture, mais un itinéraire où chaque déplacement sert l'expérience au lieu de simplement remplir l'espace entre deux hôtels.",
    ],
  },
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
      "Hôtels, voiture avec chauffeur, guides, vols, visa, pourboires : les postes qui font varier le budget d'un circuit en Inde, et comment l'ajuster.",
    date: "2 mars 2026",
    category: "Budget",
    readTime: "8 min",
    image: "/images/destinations/places/jaipur-hawa.jpg",
    content: [
      "Le budget d'un voyage en Inde dépend avant tout de quatre choix : la catégorie des hôtels, la durée du circuit, la saison et le nombre de voyageurs. Le vol international, le visa et l'assurance s'ajoutent au prix du circuit. À prestations égales, un voyage organisé directement avec une agence locale coûte moins cher qu'en passant par un tour-opérateur, puisqu'il n'y a pas d'intermédiaire.",
      "L'hébergement est le poste qui fait le plus varier le prix. L'Inde offre trois grandes familles : les guesthouses et hôtels simples, les havelis et hôtels de charme (anciennes demeures restaurées, souvent les plus appréciées des voyageurs) et les palais de maharajas devenus hôtels de luxe. Un même itinéraire peut ainsi doubler ou tripler de prix selon la gamme choisie, sans changer une seule étape.",
      "La voiture avec chauffeur se paie par véhicule, et non par personne. C'est pourquoi un circuit privé revient sensiblement moins cher par personne à quatre qu'à deux : le coût du véhicule, du chauffeur et de son hébergement est partagé. Le prix tient compte du nombre de jours et des kilomètres parcourus.",
      "Les guides locaux francophones sont réservés ville par ville, pour les visites importantes : le Taj Mahal, le fort d'Amber, Jodhpur, Varanasi… Les guides francophones sont moins nombreux que les anglophones, surtout dans le Sud et les petites villes ; il faut les réserver tôt en haute saison.",
      "La saison change aussi le prix. D'octobre à mars, la haute saison, les hôtels affichent leurs tarifs les plus élevés, avec un pic entre Noël et le Nouvel An et pendant certaines fêtes comme la foire de Pushkar. Avril et septembre offrent souvent de meilleurs prix, avec un climat plus chaud ou plus humide.",
      "Les droits d'entrée des monuments sont plus élevés pour les visiteurs étrangers que pour les Indiens. Ils restent modestes à l'échelle d'un voyage, mais s'additionnent sur un long circuit ; un circuit organisé les inclut généralement, ce qui évite les files d'attente aux guichets.",
      "Les vols intérieurs entrent dans le budget dès que le circuit relie des régions éloignées : Rajasthan et Varanasi, Delhi et le Kerala, ou le Ladakh. Ils évitent des journées entières de route ou de train et sont à réserver le plus tôt possible.",
      "En dehors du circuit, prévoyez : le vol international depuis la France, le visa électronique indien (e-Visa, à demander uniquement sur le site officiel du gouvernement indien), une assurance voyage couvrant les frais médicaux en Inde, les repas non inclus et vos achats.",
      "Les pourboires sont d'usage en Inde, en particulier pour le chauffeur et les guides à la fin de leur service. Ils ne sont pas obligatoires, mais ils font partie de la culture du voyage. Un conseil : prévoyez une enveloppe en roupies dès le début du voyage pour ne pas être pris de court.",
      "Comment réduire le budget sans perdre en qualité ? Voyager à quatre, partir en avril ou en septembre, limiter le nombre d'étapes pour réduire les kilomètres, et mélanger les catégories d'hôtels : un palais pour une nuit d'exception, des havelis de charme le reste du temps.",
      "Raja établit un devis détaillé et gratuit, poste par poste, selon vos dates, votre nombre de voyageurs et votre niveau de confort. Vous savez exactement ce qui est inclus avant de réserver, sans frais d'agence intermédiaire.",
    ],
    links: [
      { href: "/creer-mon-itineraire", label: "Demander un devis détaillé" },
      { href: "/blog/circuit-rajasthan", label: "Circuit Rajasthan : quel itinéraire ?" },
      { href: "/blog/visa-inde-voyageurs-francais", label: "Visa Inde : mode d'emploi" },
      { href: "/blog/quand-partir-en-inde", label: "Quand partir en Inde ?" },
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
