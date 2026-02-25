import type { Realisation } from "@/types";
import { clientConfig } from "@/config/client.config";

const c = clientConfig;

export const realisations: Realisation[] = [
  {
    id: "r1",
    slug: "livraison-urgente-ciments-lafarge",
    title: `Livraison urgente — 3 semi-remorques de ciment pour Lafarge ${c.REGION}`,
    category: "local",
    client: `Lafarge ${c.REGION}`,
    origin: c.VILLE,
    destination: c.COMMUNE_1,
    volume: "90 t",
    distance: "88 km",
    duration: "1 journée",
    team: "3 chauffeurs + responsable exploitation",
    challenge:
      "Approvisionnement d'urgence suite à une rupture de stock sur chantier. Trois semi-remorques bâchés devaient être chargés, routés et déchargés en moins de 10 heures pour permettre la reprise des travaux dès le lendemain matin.",
    solution:
      "Mobilisation immédiate de trois camions disponibles, coordination avec le chef de chantier pour les horaires de déchargement, optimisation des temps de trajet et respect des fenêtres de livraison.",
    result:
      `Les trois livraisons effectuées en moins de 9 heures. Le chantier a repris à 6h le lendemain comme prévu. Lafarge a intégré ${c.NOM_ENTREPRISE} à son panel de transporteurs régionaux.`,
    featuredImage: "/images/realisations/appartement-haussmannien.png",
    images: ["/images/realisations/appartement-haussmannien.png"],
    featured: true,
    date: "2024-11-10",
    tags: ["urgence", "ciment", "semi-remorque", "industrie"],
  },
  {
    id: "r2",
    slug: "transfert-usine-industrielle",
    title: `Transfert d'équipements industriels — ${c.COMMUNE_2} → ${c.VILLE}`,
    category: "entreprise",
    client: `PME Métallurgie ${c.REGION}`,
    origin: c.COMMUNE_2,
    destination: `Zone Industrielle ${c.VILLE}`,
    volume: "35 t",
    distance: "42 km",
    duration: "2 jours",
    team: "4 manutentionnaires + 2 chauffeurs",
    challenge:
      "Machines-outils de précision pesant jusqu'à 8 tonnes pièce, nécessitant un arrimage spécialisé et un transport à vitesse réduite. Délai contraint à 48 heures pour limiter l'arrêt de production.",
    solution:
      "Utilisation de plateaux aménagés avec sangles et cales sur mesure, transport hors gabarit avec escorte sur les tronçons sensibles, coordination avec le service de sécurité de la zone industrielle.",
    result:
      "Transfert réalisé sans incident en 2 jours. Toutes les machines remises en service dans les 72 heures suivant la livraison. Aucune pièce abîmée, aucun retard de production supplémentaire.",
    featuredImage: "/images/realisations/cabinet-architectes.png",
    images: ["/images/realisations/cabinet-architectes.png"],
    featured: true,
    date: "2024-09-14",
    tags: ["industriel", "machines-outils", "hors-gabarit", "usine"],
  },
  {
    id: "r3",
    slug: "export-conteneur-benelux",
    title: `Groupage export — ${c.VILLE} → Benelux`,
    category: "international",
    client: "Exportateur de produits agroalimentaires régionaux",
    origin: `${c.VILLE} (port)`,
    destination: "Rotterdam, Pays-Bas",
    volume: "24 t",
    distance: "410 km",
    duration: "2 jours (transit douanier inclus)",
    team: "1 chauffeur + coordinatrice internationale",
    challenge:
      "Coordonner l'enlèvement de marchandises agroalimentaires (contrôlées phytosanitaires) depuis deux entrepôts distincts, grouper dans un seul conteneur et assurer le transit douanier dans des délais très serrés.",
    solution:
      `Ramassage coordonné en deux points le même matin, constitution du dossier douanier en amont par notre service, chargement au terminal de ${c.VILLE}, départ conteneur le soir même.`,
    result:
      `Dédouanement à Rotterdam en 4 heures ouvrées. Livraison au destinataire final dans les délais. Le client a depuis confié l'ensemble de ses exports Benelux à ${c.NOM_ENTREPRISE}.`,
    featuredImage: "/images/realisations/demenagement-canada.png",
    images: ["/images/realisations/demenagement-canada.png"],
    featured: true,
    date: "2024-08-22",
    tags: ["export", "benelux", "agroalimentaire", "conteneur"],
  },
  {
    id: "r4",
    slug: "logistique-evenementielle",
    title: `Logistique événementielle — Salon Maritime ${c.VILLE}`,
    category: "entreprise",
    client: "Organisateur événementiel maritime",
    origin: `Paris et ${c.COMMUNE_1}`,
    destination: `Parc des expositions ${c.VILLE}`,
    volume: "60 m³",
    distance: "200 km max",
    duration: "3 jours",
    team: "6 manutentionnaires + 2 chauffeurs",
    challenge:
      "Réception de matériel d'exposition provenant de plusieurs fournisseurs, stockage temporaire dans notre entrepôt, puis livraison et installation au parc des expositions dans un timing millimétré.",
    solution:
      "Coordination de 4 enlèvements sur 2 jours, stockage intermédiaire avec inventaire photographique, livraison sur rendez-vous créneau imposé par l'organisateur, équipe de manutention disponible pour l'installation des stands.",
    result:
      "100% du matériel livré et installé à l'heure. Aucune avarie constatée. L'organisateur nous a confié la logistique retour et a signé un contrat-cadre pour les éditions suivantes.",
    featuredImage: "/images/realisations/techflow-startup.png",
    images: ["/images/realisations/techflow-startup.png"],
    featured: false,
    date: "2024-10-18",
    tags: ["événementiel", "maritime", "stockage", "manutention"],
  },
  {
    id: "r5",
    slug: "tournee-distribution-departement",
    title: `Tournée de distribution — 45 points de livraison en ${c.DEPARTEMENT}`,
    category: "longue-distance",
    client: "Distributeur de produits alimentaires régionaux",
    origin: c.VILLE,
    destination: `${c.DEPARTEMENT} (45 points)`,
    volume: "12 t",
    distance: "380 km (tournée complète)",
    duration: "1 journée",
    team: "2 chauffeurs-livreurs",
    challenge:
      `Optimiser une tournée de 45 points de livraison en ${c.DEPARTEMENT} pour deux chauffeurs, avec des créneaux de livraison imposés par certains clients et un respect strict de la chaîne du froid sur une partie du chargement.`,
    solution:
      "Planification optimisée de la tournée par notre service exploitation, respect des créneaux imposés, chargement chronologique du camion, matériel frigorifique adapté pour les produits sensibles.",
    result:
      "45/45 livraisons effectuées dans la journée. Zéro rupture de chaîne du froid. Le client a augmenté la fréquence à deux tournées hebdomadaires depuis.",
    featuredImage: "/images/realisations/famille-rousseau.png",
    images: ["/images/realisations/famille-rousseau.png"],
    featured: false,
    date: "2024-07-11",
    tags: ["distribution", "tournée", "alimentaire", "optimisation"],
  },
  {
    id: "r6",
    slug: "affretement-exceptionnel-longue-distance",
    title: `Affrètement exceptionnel — Matériel BTP ${c.VILLE} → ${c.COMMUNE_3}`,
    category: "local",
    client: `Entreprise de génie civil de ${c.VILLE}`,
    origin: c.VILLE,
    destination: c.COMMUNE_3,
    volume: "28 t",
    distance: "570 km",
    duration: "2 jours",
    team: "1 chauffeur grand routier + 1 escorte",
    challenge:
      "Transport d'une foreuse de génie civil de 28 tonnes en pièces détachées nécessitant une autorisation de transport exceptionnel (convoi), à livrer dans un délai de 48 heures.",
    solution:
      "Obtention des autorisations préfectorales en urgence, itinéraire validé avec les services routiers, convoi encadré sur les sections sensibles, coordination avec le chef de chantier pour l'accueil.",
    result:
      "Transport exceptionnel réalisé en 2 jours sans incident. La foreuse remontée et opérationnelle dès le 3e jour. Le client est devenu un partenaire régulier pour ses opérations de transport exceptionnel.",
    featuredImage: "/images/realisations/collection-bernard.png",
    images: ["/images/realisations/collection-bernard.png"],
    featured: false,
    date: "2025-01-20",
    tags: ["BTP", "transport-exceptionnel", "convoi", "affrètement"],
  },
];
