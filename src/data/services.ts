import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "s1",
    slug: "demenagement-residentiel",
    title: "Déménagement Résidentiel",
    shortDescription:
      "Du studio au château, nous prenons en charge votre déménagement résidentiel avec soin et précision.",
    fullDescription:
      "Que vous déménagiez d'un studio parisien ou d'une grande maison en banlieue, notre équipe s'adapte à chaque configuration. Nous gérons l'intégralité de votre déménagement : du premier carton emballé jusqu'au dernier meuble installé dans votre nouveau logement. Un interlocuteur dédié vous accompagne du devis jusqu'au jour J.",
    icon: "Home",
    image: "/images/services/demenagement-residentiel.jpg",
    features: [
      "Emballage professionnel de tous vos effets",
      "Démontage et remontage des meubles",
      "Transport sécurisé en camion équipé",
      "Assurance tous risques incluse",
      "Équipe de 2 à 4 déménageurs selon volume",
      "Nettoyage post-déménagement disponible",
    ],
    price: "À partir de 450€",
    duration: "1 à 3 jours",
    featured: true,
    order: 1,
  },
  {
    id: "s2",
    slug: "demenagement-entreprise",
    title: "Déménagement d'Entreprise",
    shortDescription:
      "Transferts de bureaux, laboratoires ou entrepôts — nous minimisons l'interruption d'activité de votre entreprise.",
    fullDescription:
      "Le déménagement d'entreprise exige une coordination millimétrée. Nous intervenons le plus souvent en dehors des heures de bureau pour garantir la continuité de votre activité. Un chef de projet dédié pilote l'opération de A à Z, depuis le plan de déménagement jusqu'à la reconnexion informatique dans vos nouveaux locaux.",
    icon: "Building2",
    image: "/images/services/demenagement-entreprise.jpg",
    features: [
      "Planning coordonné hors heures ouvrées",
      "Déconnexion et reconnexion informatique",
      "Étiquetage et inventaire détaillé",
      "Déménagement de serveurs et matériel sensible",
      "Chef de projet dédié",
      "Gestion des archives et documents",
    ],
    price: "Devis sur mesure",
    duration: "1 à 5 jours",
    featured: true,
    order: 2,
  },
  {
    id: "s3",
    slug: "demenagement-longue-distance",
    title: "Déménagement Longue Distance",
    shortDescription:
      "Paris, province, DOM-TOM — nos convois longue distance maintiennent les mêmes standards qu'un déménagement local.",
    fullDescription:
      "La distance ne doit pas être synonyme de stress. Nos camions GPS tracés assurent une livraison à date et heure garanties, avec un suivi en temps réel transmis à votre chargée de clientèle. Nous couvrons toute la France métropolitaine et les DOM-TOM, avec un réseau de partenaires certifiés en région.",
    icon: "Route",
    image: "/images/services/demenagement-longue-distance.jpg",
    features: [
      "Camions GPS tracés en temps réel",
      "Livraison à date et heure garanties",
      "Stockage intermédiaire si nécessaire",
      "Réseau de partenaires sur toute la France",
      "Assurance spécifique longue distance",
      "Suivi client par SMS/email",
    ],
    price: "À partir de 950€",
    duration: "1 à 4 jours",
    featured: false,
    order: 3,
  },
  {
    id: "s4",
    slug: "demenagement-international",
    title: "Déménagement International",
    shortDescription:
      "Europe, Afrique, Amériques — nous gérons la logistique complète de vos déménagements transfrontaliers.",
    fullDescription:
      "Expatriation professionnelle ou projet de vie à l'étranger : nous prenons en charge l'intégralité du processus douanier, logistique et assurantiel pour que vos affaires arrivent à bon port, où que ce soit dans le monde. Nos correspondants locaux dans 40+ pays garantissent une livraison porte-à-porte sans mauvaise surprise.",
    icon: "Globe",
    image: "/images/services/demenagement-international.jpg",
    features: [
      "Formalités douanières prises en charge",
      "Conteneurs maritimes ou fret aérien",
      "Correspondants locaux dans 40+ pays",
      "Emballage certifié ISPM-15 pour le bois",
      "Assurance internationale tous risques",
      "Coordination porte-à-porte",
    ],
    price: "Devis sur mesure",
    duration: "2 semaines à 3 mois",
    featured: true,
    order: 4,
  },
  {
    id: "s5",
    slug: "garde-meuble-stockage",
    title: "Garde-Meuble & Stockage",
    shortDescription:
      "Nos entrepôts sécurisés en Île-de-France accueillent vos affaires le temps qu'il faut, sans engagement de durée.",
    fullDescription:
      "Entre deux déménagements, en attente de signature, ou simplement pour désencombrer votre espace de vie : nos box de stockage individuels sont disponibles à la semaine ou au mois, sans engagement minimum de durée. Chaque bien est inventorié photographiquement à l'entrée pour votre tranquillité.",
    icon: "Warehouse",
    image: "/images/services/garde-meuble-stockage.jpg",
    features: [
      "Box individuels de 1 à 50 m²",
      "Vidéosurveillance 24h/24",
      "Accès client 6j/7",
      "Contrôle d'humidité et température",
      "Inventaire photographié à l'entrée",
      "Contrat sans engagement minimum",
    ],
    price: "À partir de 89€/mois",
    duration: "Sans engagement",
    featured: false,
    order: 5,
  },
  {
    id: "s6",
    slug: "emballage-manutention",
    title: "Emballage & Manutention",
    shortDescription:
      "Cartons, bulles, caisses sur mesure — nous emballons vos objets précieux, fragiles ou volumineux avec expertise.",
    fullDescription:
      "Nos spécialistes de l'emballage protègent vos biens les plus précieux : œuvres d'art, instruments de musique, collection de vinyles, mobilier de luxe. Chaque objet est traité avec le protocole adapté à sa fragilité et sa valeur. Nous prenons également en charge le déballage et l'installation dans votre nouveau domicile.",
    icon: "PackageCheck",
    image: "/images/services/emballage-manutention.jpg",
    features: [
      "Matériaux d'emballage professionnels fournis",
      "Spécialistes objets d'art et antiquités",
      "Caissage bois sur mesure",
      "Piano, coffre-fort, objets lourds",
      "Service de déballage et installation",
      "Reprise des cartons après déménagement",
    ],
    price: "À partir de 180€",
    duration: "Demi-journée à 2 jours",
    featured: false,
    order: 6,
  },
];
