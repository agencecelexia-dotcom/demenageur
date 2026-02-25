import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    id: "tm1",
    name: "{PRENOM_DIRIGEANT} {NOM_DIRIGEANT}",
    role: "Gérant",
    bio: "{PRENOM_DIRIGEANT} dirige {NOM_ENTREPRISE} avec passion depuis la reprise de la société. Fort d'une solide expérience dans le transport routier en {REGION}, il pilote la stratégie de l'entreprise, développe les partenariats et veille à la satisfaction de chaque client. Sa connaissance du tissu économique de {VILLE} est un atout précieux.",
    image: "/images/team/laurent-mercier.png",
    specialties: [
      "Direction d'exploitation",
      "Développement commercial",
      "Transport européen",
    ],
  },
  {
    id: "tm2",
    name: "{FONDATEUR_NOM}",
    role: "Fondateur & Conseiller",
    bio: "Fondateur de {NOM_ENTREPRISE} en {ANNEE_CREATION}, il a bâti l'entreprise en {REGION} avec une seule conviction : la fiabilité avant tout. Après plus de {ANNEES_EXPERIENCE} ans à la tête de la société, il reste présent comme conseiller et garant des valeurs qui ont fait la réputation de l'entreprise.",
    image: "/images/team/karim-ait-ahmed.png",
    specialties: [
      "Transport routier",
      "Réseau {REGION}",
      "Gestion de flotte",
    ],
  },
  {
    id: "tm3",
    name: "Isabelle Renard",
    role: "Responsable Exploitation",
    bio: "Isabelle coordonne quotidiennement les tournées, les chauffeurs et les relations avec les clients. Sa rigueur et son sens de l'organisation permettent de tenir les engagements de livraison même en situation d'urgence. Elle est la tour de contrôle opérationnelle de {NOM_ENTREPRISE}.",
    image: "/images/team/sophie-blanchard.png",
    specialties: [
      "Gestion des tournées",
      "Relations transporteurs",
      "Optimisation logistique",
    ],
  },
  {
    id: "tm4",
    name: "Maxime Duval",
    role: "Responsable Commercial",
    bio: "Maxime prospecte et fidélise les clients professionnels de {NOM_ENTREPRISE}. Spécialiste des solutions sur mesure pour les industriels et les négoces régionaux, il est l'interlocuteur de référence pour toute demande de devis ou de partenariat logistique durable.",
    image: "/images/team/emilie-fontaine.png",
    specialties: [
      "Développement client",
      "Devis transport et logistique",
      "Partenariats industriels",
    ],
  },
];
