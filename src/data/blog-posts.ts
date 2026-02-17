import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "checklist-demenagement-parfait",
    title: "La checklist complète pour un déménagement parfait",
    excerpt:
      "8 semaines avant le jour J jusqu'au soir de l'emménagement : tout ce qu'il faut faire, et dans quel ordre pour ne rien oublier.",
    category: "Conseils",
    readTime: "8 min",
    date: "2025-01-15",
    featuredImage: "/images/blog/checklist-demenagement.png",
    author: "Émilie Fontaine",
    tags: ["checklist", "organisation", "déménagement", "conseils"],
    content: [
      {
        type: "paragraph",
        content:
          "Un déménagement réussi se prépare bien en avance. La règle d'or : commencez à planifier au moins 8 semaines avant votre date de déménagement. Voici notre checklist professionnelle, testée et affinée sur plus de 4 800 déménagements.",
      },
      {
        type: "h2",
        content: "8 semaines avant : les grandes décisions",
      },
      {
        type: "list",
        items: [
          "Fixez une date de déménagement précise",
          "Demandez des devis à 3 déménageurs minimum",
          "Prévenez votre propriétaire ou bailleur",
          "Vérifiez les conditions de votre contrat de location",
          "Évaluez le volume de vos affaires (en m³)",
        ],
      },
      {
        type: "h2",
        content: "4 semaines avant : l'organisation pratique",
      },
      {
        type: "list",
        items: [
          "Commandez vos cartons et fournitures d'emballage",
          "Triez et désencombrez (vente, don, recyclage)",
          "Informez les administrations de votre changement d'adresse",
          "Transférez vos abonnements (électricité, gaz, internet)",
          "Réservez un monte-meuble si nécessaire",
          "Demandez l'arrêté de stationnement pour le camion",
        ],
      },
      {
        type: "h2",
        content: "La veille du déménagement",
      },
      {
        type: "paragraph",
        content:
          "La veille est une étape cruciale souvent négligée. Préparez un sac 'survie' avec tout ce dont vous aurez besoin dans les premières 24 heures : médicaments, chargeurs, vêtements de rechange, documents importants, et quelques ustensiles de cuisine.",
      },
      {
        type: "quote",
        content:
          "Un déménagement bien préparé, c'est 80% du stress en moins le jour J.",
        author: "Laurent Mercier, Directeur de TransLog Pro",
      },
    ],
  },
  {
    id: "b2",
    slug: "emballer-objets-fragiles",
    title: "Comment emballer vos objets fragiles comme un professionnel",
    excerpt:
      "Vaisselle, verres, tableaux, électronique : les techniques d'emballage que nous utilisons chez TransLog Pro pour protéger vos biens les plus fragiles.",
    category: "Guide",
    readTime: "6 min",
    date: "2025-01-28",
    featuredImage: "/images/blog/emballage-fragiles.png",
    author: "Karim Aït-Ahmed",
    tags: ["emballage", "fragiles", "vaisselle", "technique", "conseils"],
    content: [
      {
        type: "paragraph",
        content:
          "L'emballage est l'étape la plus chronophage d'un déménagement, et celle où se jouent la plupart des dommages. Voici les techniques que nos professionnels utilisent au quotidien pour une protection optimale.",
      },
      {
        type: "h2",
        content: "La vaisselle et les verres",
      },
      {
        type: "list",
        items: [
          "Enveloppez chaque pièce individuellement dans du papier bulle ou du papier journal",
          "Placez les assiettes debout (jamais à plat) dans le carton",
          "Les verres vont toujours dans des cartons spéciaux avec alvéoles",
          "Remplissez les espaces vides avec du papier froissé",
          "Étiquetez les cartons FRAGILE sur 4 faces",
        ],
      },
      {
        type: "h2",
        content: "Les tableaux et miroirs",
      },
      {
        type: "paragraph",
        content:
          "Les tableaux méritent une attention particulière. Utilisez des cornières en carton pour protéger les angles, puis enveloppez dans du papier bulle. Pour les grands formats, nous recommandons le caissage bois sur mesure — ne lésinez pas sur cette protection pour les œuvres de valeur.",
      },
      {
        type: "h2",
        content: "L'électroménager et l'électronique",
      },
      {
        type: "list",
        items: [
          "Conservez les emballages d'origine quand c'est possible",
          "Débranchez et faites défrosting du réfrigérateur 24h avant",
          "Protégez les écrans avec du carton et du film à bulles",
          "Ne posez jamais un écran à plat — toujours debout",
          "Photographiez les câblages avant déconnexion",
        ],
      },
    ],
  },
  {
    id: "b3",
    slug: "demenagement-paris-guide",
    title: "Déménager à Paris : règles, autorisations et astuces",
    excerpt:
      "Stationnement, monte-meuble, arrêté de voirie, ascenseur — tout ce que vous devez savoir pour un déménagement parisien sans accroc.",
    category: "Paris",
    readTime: "7 min",
    date: "2025-02-10",
    featuredImage: "/images/blog/demenagement-paris.png",
    author: "Sophie Blanchard",
    tags: ["paris", "stationnement", "arrêté", "réglementation", "monte-meuble"],
    content: [
      {
        type: "paragraph",
        content:
          "Déménager à Paris est une discipline à part entière. La densité du bâti, les rues étroites et la réglementation municipale rendent chaque déménagement parisien unique. Voici notre guide complet pour éviter les mauvaises surprises.",
      },
      {
        type: "h2",
        content: "L'arrêté de stationnement : indispensable",
      },
      {
        type: "paragraph",
        content:
          "Pour stationner un camion de déménagement à Paris, vous devez obtenir un arrêté de stationnement auprès de la mairie d'arrondissement. Cette démarche doit être effectuée au moins 5 jours ouvrés avant le déménagement. Le coût est d'environ 20€ par jour et par place. Chez TransLog Pro, nous prenons en charge cette démarche pour vous.",
      },
      {
        type: "h2",
        content: "Le monte-meuble : quand l'utiliser",
      },
      {
        type: "list",
        items: [
          "À partir du 3e étage sans ascenseur, le monte-meuble est recommandé",
          "Indispensable pour les escaliers en colimaçon ou trop étroits",
          "Obligatoire pour les pianos et meubles volumineux aux étages élevés",
          "Nécessite une autorisation spécifique de la mairie",
          "Son utilisation est incluse dans nos devis sur demande",
        ],
      },
      {
        type: "h2",
        content: "Les règles de l'ascenseur",
      },
      {
        type: "paragraph",
        content:
          "Avant de déménager, renseignez-vous auprès de votre gardien ou syndic sur les règles d'utilisation de l'ascenseur : horaires autorisés, nécessité d'une protection des parois, restrictions de charge. Ces informations évitent des conflits avec le voisinage et des dommages aux parties communes.",
      },
    ],
  },
  {
    id: "b4",
    slug: "demenagement-international-douane",
    title: "Douane et déménagement international : évitez les pièges",
    excerpt:
      "Documents requis, marchandises interdites, délais de dédouanement — notre guide complet pour les expatriés qui déménagent à l'international.",
    category: "International",
    readTime: "10 min",
    date: "2025-02-20",
    featuredImage: "/images/blog/demenagement-international.png",
    author: "Laurent Mercier",
    tags: ["international", "douane", "expatriation", "formalités", "visa"],
    content: [
      {
        type: "paragraph",
        content:
          "Un déménagement international comporte une dimension administrative souvent sous-estimée. Les formalités douanières varient d'un pays à l'autre et peuvent considérablement retarder la livraison de vos biens. Voici ce que vous devez savoir.",
      },
      {
        type: "h2",
        content: "Les documents indispensables",
      },
      {
        type: "list",
        items: [
          "Passeport ou carte d'identité en cours de validité",
          "Visa ou titre de séjour dans le pays de destination",
          "Inventaire détaillé de tous les biens (en français et en anglais)",
          "Valeur estimée de chaque objet (pour l'assurance et la douane)",
          "Preuve de résidence dans le pays de départ et d'arrivée",
          "Formulaire de franchise douanière (selon les pays)",
        ],
      },
      {
        type: "h2",
        content: "Les marchandises soumises à restrictions",
      },
      {
        type: "paragraph",
        content:
          "Certains objets sont soumis à des restrictions ou interdictions dans de nombreux pays : produits alimentaires, plantes, médicaments en grandes quantités, armes, objets en bois exotique non certifié ISPM-15. Notre équipe vous conseille pays par pays sur les restrictions spécifiques.",
      },
      {
        type: "h2",
        content: "Les délais à anticiper",
      },
      {
        type: "list",
        items: [
          "Europe : 1 à 2 semaines par camion",
          "Afrique du Nord : 2 à 3 semaines par mer",
          "Amérique du Nord : 3 à 6 semaines par conteneur maritime",
          "Asie/Océanie : 4 à 8 semaines par conteneur maritime",
          "Aérien : 1 à 2 semaines (coût 3 à 5 fois supérieur)",
        ],
      },
    ],
  },
  {
    id: "b5",
    slug: "choisir-garde-meuble",
    title: "Comment choisir un garde-meuble : 7 critères essentiels",
    excerpt:
      "Superficie, sécurité, accessibilité, prix — les questions à poser avant de signer un contrat de garde-meuble pour stocker vos affaires en toute sérénité.",
    category: "Conseils",
    readTime: "5 min",
    date: "2025-03-05",
    featuredImage: "/images/blog/garde-meuble.png",
    author: "Émilie Fontaine",
    tags: ["garde-meuble", "stockage", "conseils", "sécurité", "box"],
    content: [
      {
        type: "paragraph",
        content:
          "Que ce soit pour un entre-deux déménagements ou pour stocker des affaires encombrant votre logement, le choix d'un garde-meuble mérite réflexion. Voici les 7 critères que nos clients négligent souvent.",
      },
      {
        type: "h2",
        content: "1. La superficie et le volume réel",
      },
      {
        type: "paragraph",
        content:
          "Un box de 5 m² ne signifie pas 5 m³ de stockage ! La hauteur sous plafond (généralement 2,5 m) est cruciale. Calculez votre volume en m³ (surface × hauteur utilisable) avant de choisir votre box.",
      },
      {
        type: "h2",
        content: "Les 6 autres critères à vérifier",
      },
      {
        type: "list",
        items: [
          "Sécurité : vidéosurveillance 24h/24, contrôle d'accès par badge, alarme individuelle par box",
          "Accessibilité : horaires d'accès (idéal : 7j/7), quai de déchargement couvert",
          "Conditions climatiques : humidité contrôlée pour protéger les meubles en bois et les livres",
          "Assurance : vérifiez que votre contrat couvre le stockage ou souscrivez une assurance spécifique",
          "Engagement : privilégiez les contrats sans engagement minimum ou à la semaine",
          "Localisation : un box trop loin de chez vous sera sous-utilisé — 30 min maximum",
        ],
      },
      {
        type: "quote",
        content:
          "Nos clients qui optent pour notre garde-meuble pendant un déménagement réduisent leur stress de moitié. Savoir que ses affaires sont en sécurité change tout.",
        author: "Sophie Blanchard, Responsable Logistique TransLog Pro",
      },
    ],
  },
  {
    id: "b6",
    slug: "demenagement-entreprise-sans-interruption",
    title: "Déménager votre entreprise sans interrompre l'activité",
    excerpt:
      "Notre méthode en 5 phases pour transférer bureaux et entrepôts avec une interruption réduite à zéro — appliquée sur plus de 200 déménagements d'entreprise.",
    category: "Entreprise",
    readTime: "9 min",
    date: "2025-03-18",
    featuredImage: "/images/blog/demenagement-entreprise.jpeg",
    author: "Sophie Blanchard",
    tags: ["entreprise", "bureau", "déménagement", "méthode", "continuité"],
    content: [
      {
        type: "paragraph",
        content:
          "Le déménagement d'entreprise est l'opération la plus redoutée des dirigeants : chaque heure d'interruption coûte de l'argent. Voici la méthode en 5 phases que TransLog Pro a développée pour garantir une continuité d'activité maximale.",
      },
      {
        type: "h2",
        content: "Phase 1 : L'audit pré-déménagement (J-30)",
      },
      {
        type: "paragraph",
        content:
          "Notre chef de projet visite vos locaux actuels et futurs pour établir un plan de déménagement détaillé : inventaire du mobilier, cartographie des postes informatiques, identification des contraintes (horaires, accès, ascenseurs), planning jour par jour.",
      },
      {
        type: "h2",
        content: "Phase 2 : La préparation en parallèle (J-14 à J-7)",
      },
      {
        type: "list",
        items: [
          "Étiquetage de chaque poste de travail avec son numéro de destination",
          "Constitution des caisses de mobilier (plantes, archives, objets personnels)",
          "Coordination avec le prestataire informatique pour la déconnexion",
          "Réservation des ascenseurs et monte-charges dans les deux bâtiments",
          "Brief de l'équipe de déménagement sur le plan de charge",
        ],
      },
      {
        type: "h2",
        content: "Phase 3 : Le déménagement nocturne ou de week-end",
      },
      {
        type: "paragraph",
        content:
          "Nous intervenons systématiquement hors heures ouvrées pour minimiser la gêne. Le vendredi soir à 18h, nos équipes prennent le relais. Le lundi matin à 8h, vos collaborateurs retrouvent leur poste de travail opérationnel, parfois sans même réaliser que le déménagement a eu lieu.",
      },
      {
        type: "h2",
        content: "Phases 4 et 5 : La reconnexion et le bilan",
      },
      {
        type: "list",
        items: [
          "Reconnexion informatique par les techniciens IT en parallèle de la manutention",
          "Vérification de chaque poste avant ouverture de l'entreprise",
          "Remontage du mobilier et installation selon le plan d'aménagement",
          "Bilan contradictoire avec le client dans les 48h",
          "Reprise des cartons et emballages dans les 5 jours",
        ],
      },
    ],
  },
];
