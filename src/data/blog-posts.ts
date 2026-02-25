import type { BlogPost } from "@/types";
import { clientConfig } from "@/config/client.config";

const c = clientConfig;

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "bien-preparer-envoi-fret",
    title: "Comment bien préparer votre envoi de fret routier",
    excerpt:
      "Conditionnement, documents, délais : tout ce que vous devez prévoir en amont pour que votre expédition se déroule sans accroc.",
    category: "Conseils",
    readTime: "7 min",
    date: "2025-01-20",
    featuredImage: "/images/blog/checklist-demenagement.png",
    author: "Isabelle Renard",
    tags: ["fret", "expédition", "conditionnement", "conseils", "transport"],
    content: [
      {
        type: "paragraph",
        content:
          "Un transport routier réussi commence bien avant que le camion arrive à votre porte. La préparation de votre envoi conditionne à la fois la sécurité de vos marchandises et le respect des délais. Voici les étapes incontournables.",
      },
      {
        type: "h2",
        content: "1. Conditionner correctement vos marchandises",
      },
      {
        type: "list",
        items: [
          "Utilisez des palettes EUR conformes (1,20 m × 0,80 m) en bon état",
          "Filmez chaque palette avec un film étirable résistant",
          "Protégez les angles avec des cornières en carton ou plastique",
          "Ne dépassez pas 1,20 m de hauteur par palette pour la stabilité",
          "Indiquez le sens de transport (flèches haut/bas) sur chaque colis",
        ],
      },
      {
        type: "h2",
        content: "2. Préparer les documents obligatoires",
      },
      {
        type: "list",
        items: [
          "La lettre de voiture (CMR ou LV nationale) correctement remplie",
          "Le bon de livraison avec quantités et poids exacts",
          "Les fiches de données de sécurité pour les matières dangereuses (ADR)",
          "Le bordereau douanier pour les envois hors UE",
          "Le certificat d'assurance marchandises si nécessaire",
        ],
      },
      {
        type: "h2",
        content: "3. Communiquer les bonnes informations",
      },
      {
        type: "paragraph",
        content:
          "Indiquez-nous systématiquement le poids exact (non estimé), les dimensions réelles, la nature des marchandises, et les contraintes de livraison (horaires imposés, quai requis, hayon nécessaire). Ces informations permettent d'affecter le bon véhicule et d'optimiser le planning.",
      },
      {
        type: "quote",
        content:
          "Un colis bien préparé est un colis qui arrive intact. On peut rattraper un retard, on ne répare pas une marchandise abîmée.",
        author: "Isabelle Renard, Responsable Exploitation",
      },
    ],
  },
  {
    id: "b2",
    slug: "transport-exceptionnel-reglementation",
    title: `Transport exceptionnel : autorisations et réglementation en ${c.REGION}`,
    excerpt:
      `Convoi exceptionnel, transport hors gabarit : quelles démarches, quels délais et quels itinéraires sont à prévoir pour vos charges lourdes en ${c.DEPARTEMENT} ?`,
    category: "Réglementation",
    readTime: "8 min",
    date: "2025-02-03",
    featuredImage: "/images/blog/emballage-fragiles.png",
    author: `${c.PRENOM_DIRIGEANT} ${c.NOM_DIRIGEANT}`,
    tags: ["transport-exceptionnel", "convoi", "réglementation", "hors-gabarit"],
    content: [
      {
        type: "paragraph",
        content:
          "Dès lors qu'un véhicule dépasse les limites légales en poids (44 t avec autorisation), longueur (18,75 m) ou gabarit (2,55 m de large), vous entrez dans le domaine du transport exceptionnel. Une réglementation stricte s'applique, avec des autorisations obligatoires.",
      },
      {
        type: "h2",
        content: "Les seuils qui déclenchent le transport exceptionnel",
      },
      {
        type: "list",
        items: [
          "Poids total supérieur à 48 t (catégorie 1) ou 72 t (catégorie 2)",
          "Largeur supérieure à 3 m",
          "Hauteur totale supérieure à 4,30 m",
          "Longueur supérieure à 25 m",
          "Porte-à-faux avant ou arrière dépassant certains seuils",
        ],
      },
      {
        type: "h2",
        content: "La procédure d'autorisation",
      },
      {
        type: "paragraph",
        content:
          `L'autorisation de transport exceptionnel est délivrée par les préfectures de chaque département traversé. Elle doit être demandée au minimum 5 jours ouvrés avant le départ (jusqu'à 30 jours pour les catégories 3 et 4). En ${c.REGION}, la DREAL coordonne l'instruction des dossiers pour les itinéraires les plus complexes.`,
      },
      {
        type: "h2",
        content: `Itinéraires préférentiels en ${c.DEPARTEMENT}`,
      },
      {
        type: "list",
        items: [
          "Axes autoroutiers principaux : autorisés pour les catégories 1 et 2, sur autorisation pour les catégories 3+",
          "Axes secondaires : itinéraires fréquemment utilisés, restrictions possibles la nuit",
          "Routes nationales : vérifier les passages sous pont et gabarits limités",
          "Alternatives recommandées pour les gabarits très larges",
          `Zone portuaire de ${c.VILLE} : protocole spécifique, coordonnez-vous avec le terminal`,
        ],
      },
    ],
  },
  {
    id: "b3",
    slug: "axes-routiers-fret-regional",
    title: `Axes routiers principaux : le réseau incontournable du fret en ${c.REGION}`,
    excerpt:
      "Trafic, travaux, restrictions de circulation : tout ce que les chargeurs et transporteurs doivent savoir sur les axes régionaux pour optimiser leurs flux.",
    category: "Infrastructure",
    readTime: "6 min",
    date: "2025-02-17",
    featuredImage: "/images/blog/demenagement-paris.png",
    author: c.FONDATEUR_NOM,
    tags: ["transport", "logistique", "infrastructure"],
    content: [
      {
        type: "paragraph",
        content:
          `Les axes autoroutiers principaux sont la colonne vertébrale du transport routier dans notre région. Ils concentrent des enjeux considérables pour les transporteurs de ${c.REGION}.`,
      },
      {
        type: "h2",
        content: "Les points de vigilance sur les axes principaux",
      },
      {
        type: "list",
        items: [
          "Passages sous tunnels : gabarits limités, restrictions pour les TMD le week-end",
          "Traversées urbaines : bouchons récurrents aux heures de pointe",
          "Péages : goulots d'étranglement en période estivale",
          "Échangeurs principaux : points de divergence critiques, prévoir les reports",
          "Zones de travaux récurrents : prévoir des détours",
        ],
      },
      {
        type: "h2",
        content: "Nos conseils pour optimiser vos temps de transit",
      },
      {
        type: "paragraph",
        content:
          `Chez ${c.NOM_ENTREPRISE}, nos chauffeurs connaissent les axes régionaux par cœur après ${c.ANNEES_EXPERIENCE} ans de service. Nous privilégions les départs matinaux entre 4h et 6h pour les livraisons en agglomération, et entre 10h et 14h pour éviter les pointes de trafic en milieu de journée.`,
      },
      {
        type: "quote",
        content:
          "Sur les grands axes, une heure de marge au départ, c'est souvent deux heures de retard évitées à l'arrivée.",
        author: `${c.FONDATEUR_NOM}, Fondateur`,
      },
    ],
  },
  {
    id: "b4",
    slug: "affretement-vs-commissionnement",
    title: "Affrètement ou commissionnement de transport : quelle différence ?",
    excerpt:
      "Deux prestations souvent confondues, mais des responsabilités très différentes. Comprendre laquelle vous convient pour mieux choisir votre prestataire.",
    category: "Guide",
    readTime: "9 min",
    date: "2025-01-08",
    featuredImage: "/images/blog/demenagement-international.png",
    author: "Maxime Duval",
    tags: ["affrètement", "commissionnement", "transport", "responsabilité", "contrat"],
    content: [
      {
        type: "paragraph",
        content:
          "Vous contactez un transporteur pour expédier vos marchandises. Il vous propose un affrètement ou un commissionnement de transport. Ces deux prestations sont encadrées par des régimes juridiques distincts, avec des implications importantes pour la responsabilité en cas de litige.",
      },
      {
        type: "h2",
        content: "L'affrètement : location d'un véhicule",
      },
      {
        type: "paragraph",
        content:
          "Dans l'affrètement, le transporteur met un véhicule à disposition du chargeur. C'est le chargeur (ou le fréteur) qui prend en charge l'organisation du transport. La responsabilité du voiturier s'applique pour les avaries ou pertes. Le contrat d'affrètement définit précisément le véhicule, l'itinéraire et les conditions.",
      },
      {
        type: "h2",
        content: "Le commissionnement : organisation globale",
      },
      {
        type: "list",
        items: [
          "Le commissionnaire organise le transport en son nom propre",
          "Il sélectionne et mandate les transporteurs exécutants",
          "Il assume une responsabilité de résultat envers le chargeur",
          "La CMR s'applique pour les transports internationaux",
          "Il peut combiner plusieurs modes de transport (multimodal)",
          "Il gère les formalités douanières le cas échéant",
        ],
      },
      {
        type: "h2",
        content: "Que choisir selon votre situation ?",
      },
      {
        type: "paragraph",
        content:
          `Pour un transport ponctuel avec un véhicule spécifique : optez pour l'affrètement. Pour une chaîne logistique complexe, multi-étapes ou multi-modes : préférez le commissionnement. Chez ${c.NOM_ENTREPRISE}, nous proposons les deux formules et vous conseillons sur la plus adaptée à votre besoin.`,
      },
    ],
  },
  {
    id: "b5",
    slug: "port-hub-logistique",
    title: `Le port de ${c.VILLE} : hub logistique et opportunité pour les transporteurs`,
    excerpt:
      "Container, roll-on roll-off, vrac solide : comprendre les flux portuaires pour mieux organiser vos transports pré et post-portuaires.",
    category: "Logistique",
    readTime: "7 min",
    date: "2024-12-10",
    featuredImage: "/images/blog/garde-meuble.png",
    author: `${c.PRENOM_DIRIGEANT} ${c.NOM_DIRIGEANT}`,
    tags: ["port", "conteneur", "logistique", "import-export", "maritime"],
    content: [
      {
        type: "paragraph",
        content:
          `Les infrastructures portuaires de ${c.VILLE} représentent une opportunité et un défi logistique quotidien pour les transporteurs de ${c.REGION} comme ${c.NOM_ENTREPRISE}.`,
      },
      {
        type: "h2",
        content: "Les principaux terminaux",
      },
      {
        type: "list",
        items: [
          "Terminal conteneurs principal : le plus grand du port",
          "Terminal conteneurs secondaire",
          "Terminal roulier : voitures, engins",
          "Terminal multivrac : vrac solide (céréales, ciment, sucre)",
          "Terminal pétrolier : hydrocarbures",
        ],
      },
      {
        type: "h2",
        content: "Organiser vos transports pré et post-portuaires",
      },
      {
        type: "paragraph",
        content:
          "La zone portuaire est soumise à des réglementations spécifiques : badges et accréditations pour les chauffeurs, créneaux de livraison imposés par les terminaux, règles de circulation interne. Notre implantation à proximité nous permet d'intervenir dans les meilleurs délais pour vos enlèvements et livraisons portuaires.",
      },
      {
        type: "quote",
        content:
          `Être à ${c.VILLE}, c'est être au cœur des flux. Notre position géographique est notre premier avantage compétitif.`,
        author: `${c.PRENOM_DIRIGEANT} ${c.NOM_DIRIGEANT}, Gérant`,
      },
    ],
  },
  {
    id: "b6",
    slug: "choisir-transporteur-routier",
    title: "Comment choisir un transporteur routier : 8 critères décisifs",
    excerpt:
      "Licence, assurance, flotte, réactivité, traçabilité — les questions à poser avant de confier vos marchandises à un transporteur.",
    category: "Conseils",
    readTime: "6 min",
    date: "2024-11-28",
    featuredImage: "/images/blog/demenagement-entreprise.jpeg",
    author: "Maxime Duval",
    tags: ["choisir-transporteur", "critères", "assurance", "fiabilité", "conseils"],
    content: [
      {
        type: "paragraph",
        content:
          "Confier vos marchandises à un transporteur, c'est lui accorder une responsabilité importante. Avant de signer un contrat ou de passer une commande, voici les 8 critères que nous recommandons de vérifier systématiquement.",
      },
      {
        type: "h2",
        content: "1. La licence de transport et les certifications",
      },
      {
        type: "paragraph",
        content:
          "Tout transporteur professionnel doit disposer d'une licence de transport intérieur (ou communautaire pour les transports UE). Vérifiez également s'il est certifié OEA (Opérateur Économique Agréé) pour les flux douaniers, et s'il est adhérent à un groupement professionnel reconnu (TLF, FNTR, etc.).",
      },
      {
        type: "h2",
        content: "Les 7 autres critères à évaluer",
      },
      {
        type: "list",
        items: [
          "Assurance responsabilité civile et assurance marchandises : montants et exclusions",
          "État de la flotte : âge des véhicules, normes Euro (6 recommandé), entretien",
          "Traçabilité : GPS temps réel, accès client aux informations de suivi",
          "Réactivité : délai de réponse aux demandes de devis et aux urgences",
          "Références clients : demandez des recommandations dans votre secteur",
          "Stabilité financière : consultez les bilans déposés sur societe.com ou pappers.fr",
          "Politique RSE : empreinte carbone, plans de réduction des émissions",
        ],
      },
      {
        type: "quote",
        content:
          "Le prix le moins cher n'est jamais le vrai critère. Ce qui compte, c'est le coût total d'une avarie ou d'un retard.",
        author: "Maxime Duval, Responsable Commercial",
      },
    ],
  },
];
