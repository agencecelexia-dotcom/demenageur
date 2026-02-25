import type { Service } from "@/types";
import { clientConfig } from "@/config/client.config";

const c = clientConfig;

export const services: Service[] = [
  {
    id: "s1",
    slug: "transport-routier-fret",
    title: "Transport Routier de Fret",
    shortDescription:
      `Transport interurbain de marchandises en ${c.REGION} et toute la France, avec une flotte moderne et GPS tracée.`,
    fullDescription:
      `Notre activité principale : le transport routier de fret interurbain. Camions bâchés, fourgons et semi-remorques sillonnent quotidiennement les axes entre ${c.VILLE} et les principales villes françaises. Chaque expédition est tracée en temps réel. Nous prenons en charge tous types de marchandises : produits industriels, matériaux de construction, biens de consommation, fret palettisé.`,
    icon: "Truck",
    image: "/images/services/demenagement-residentiel.png",
    features: [
      "Flotte de camions Euro 6 GPS tracés",
      "Livraison à date et heure garanties",
      "Transport de fret palettisé et en vrac",
      "Couverture nationale et régionale",
      "Suivi en temps réel de vos expéditions",
      "Assurance marchandises transportées incluse",
    ],
    price: "Devis sur mesure",
    duration: "Selon distance et volume",
    featured: true,
    order: 1,
  },
  {
    id: "s2",
    slug: "logistique-entreposage",
    title: "Logistique & Entreposage",
    shortDescription:
      `Plateforme logistique à ${c.VILLE} : stockage sécurisé, gestion des flux entrants et sortants, préparation de commandes.`,
    fullDescription:
      `Notre entrepôt, idéalement situé à ${c.VILLE}, offre une solution logistique complète pour les entreprises. Réception, stockage, préparation de commandes et expédition : nous gérons l'intégralité de vos flux logistiques avec rigueur et traçabilité. Adapté aux entreprises de toute taille.`,
    icon: "Warehouse",
    image: "/images/services/demenagement-entreprise.png",
    features: [
      `Entrepôt sécurisé à ${c.VILLE}`,
      "Gestion des entrées et sorties de stock",
      "Préparation de commandes",
      "Étiquetage et conditionnement",
      "Reporting et traçabilité en temps réel",
      `Accès direct aux infrastructures de ${c.VILLE}`,
    ],
    price: "Devis sur mesure",
    duration: "Sans engagement de durée",
    featured: true,
    order: 2,
  },
  {
    id: "s3",
    slug: "affretement",
    title: "Affrètement",
    shortDescription:
      "Besoin d'un camion pour un chargement ponctuel ? Notre service d'affrètement mobilise les bonnes ressources au bon moment.",
    fullDescription:
      "Lorsque vos besoins de transport dépassent votre capacité habituelle ou nécessitent un véhicule spécifique, notre service d'affrètement vous apporte une solution rapide et fiable. Nous mobilisons notre réseau de partenaires transporteurs pour affecter le véhicule adapté à votre chargement, dans les meilleurs délais.",
    icon: "Route",
    image: "/images/services/demenagement-longue-distance.jpeg",
    features: [
      "Mobilisation rapide de capacités de transport",
      "Tous types de véhicules : fourgon, porteur, semi",
      "Réseau de transporteurs partenaires qualifiés",
      "Couverture nationale et européenne",
      "Suivi de l'acheminement",
      "Tarification transparente",
    ],
    price: "Devis immédiat sur demande",
    duration: "Selon la mission",
    featured: false,
    order: 3,
  },
  {
    id: "s4",
    slug: "transport-europeen",
    title: "Transport Européen",
    shortDescription:
      `Envois vers l'Europe depuis ${c.VILLE} : Benelux, Allemagne, Espagne, Portugal et au-delà avec nos partenaires certifiés.`,
    fullDescription:
      `Depuis notre base à ${c.VILLE}, porte d'entrée naturelle vers l'Europe, nous organisons vos transports internationaux vers les principaux pays européens. En groupage ou en lot complet, vos marchandises sont acheminées dans le respect des délais et de la réglementation douanière. Nos partenaires européens certifiés garantissent la continuité de la chaîne logistique.`,
    icon: "Globe",
    image: "/images/services/demenagement-international.jpeg",
    features: [
      "Transport en lot complet ou groupage",
      "Gestion des formalités douanières",
      "Partenaires certifiés dans toute l'Europe",
      `Départ depuis ${c.VILLE}`,
      "Documents de transport conformes",
      "Assurance internationale incluse",
    ],
    price: "Devis sur mesure",
    duration: "2 à 10 jours selon destination",
    featured: true,
    order: 4,
  },
  {
    id: "s5",
    slug: "commissionnaire-transport",
    title: "Commissionnement de Transport",
    shortDescription:
      "Nous organisons et coordonnons vos chaînes de transport multi-modes en tant que commissionnaire responsable.",
    fullDescription:
      `En tant que commissionnaire de transport, ${c.NOM_ENTREPRISE} se charge d'organiser l'acheminement de vos marchandises de bout en bout, en sélectionnant les modes de transport les plus adaptés. Nous assumons la responsabilité de toute la chaîne logistique, de l'enlèvement à la livraison finale, pour vous offrir une tranquillité totale.`,
    icon: "ClipboardList",
    image: "/images/services/garde-meuble-stockage.png",
    features: [
      "Responsabilité contractuelle complète",
      "Organisation multi-modes (route, mer, air)",
      "Interlocuteur unique pour toute la chaîne",
      "Optimisation des coûts de transport",
      "Gestion des imprévus et des litiges",
      "Reporting et suivi de performance",
    ],
    price: "Devis sur mesure",
    duration: "Selon le projet",
    featured: false,
    order: 5,
  },
  {
    id: "s6",
    slug: "manutention",
    title: "Manutention",
    shortDescription:
      `Chargement, déchargement, gerbage et mise en place de marchandises — nos équipes interviennent sur site à ${c.VILLE} et en ${c.REGION}.`,
    fullDescription:
      `Nos équipes de manutentionnaires qualifiés interviennent pour le chargement et déchargement de vos véhicules, la mise en palette, le gerbage et la mise en place de marchandises lourdes ou volumineuses. Disponibles à ${c.VILLE} et dans toute la ${c.REGION}, ils s'adaptent à vos contraintes horaires et à vos exigences de sécurité.`,
    icon: "PackageCheck",
    image: "/images/services/emballage-manutention.png",
    features: [
      "Chargement et déchargement tous types de véhicules",
      "Mise en palette et filmage",
      "Gerbage et dégerbage",
      "Manutention de charges lourdes",
      "Interventions sur site et en entrepôt",
      `Équipes disponibles en ${c.REGION}`,
    ],
    price: "À partir de 45€/h",
    duration: "À la demi-journée ou journée",
    featured: false,
    order: 6,
  },
];
