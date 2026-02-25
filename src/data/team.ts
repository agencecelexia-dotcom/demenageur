import type { TeamMember } from "@/types";
import { clientConfig } from "@/config/client.config";

const c = clientConfig;

// Genre-aware helper: "il"/"elle", "dirigeant"/"dirigeante", etc.
const genre = c.GENRE_DIRIGEANT as string;
const il = genre === "F" ? "Elle" : "Il";
const dirigeLabel = genre === "F" ? "Gérante" : "Gérant";

export const team: TeamMember[] = [
  {
    id: "tm1",
    name: `${c.PRENOM_DIRIGEANT} ${c.NOM_DIRIGEANT}`,
    role: dirigeLabel,
    bio: `${c.PRENOM_DIRIGEANT} dirige ${c.NOM_ENTREPRISE} avec passion depuis la reprise de la société. ${il} possède une solide expérience dans le transport routier en ${c.REGION}, pilote la stratégie de l'entreprise, développe les partenariats et veille à la satisfaction de chaque client.`,
    image: "/images/team/laurent-mercier.png",
    specialties: [
      "Direction d'exploitation",
      "Développement commercial",
      "Transport européen",
    ],
  },
  {
    id: "tm2",
    name: c.FONDATEUR_NOM,
    role: "Fondateur & Conseiller",
    bio: `Fondateur de ${c.NOM_ENTREPRISE} en ${c.ANNEE_CREATION}, il a bâti l'entreprise en ${c.REGION} avec une seule conviction : la fiabilité avant tout. Après plus de ${c.ANNEES_EXPERIENCE} ans à la tête de la société, il reste présent comme conseiller et garant des valeurs qui ont fait la réputation de l'entreprise.`,
    image: "/images/team/karim-ait-ahmed.png",
    specialties: [
      "Transport routier",
      `Réseau ${c.REGION}`,
      "Gestion de flotte",
    ],
  },
  {
    id: "tm3",
    name: "Responsable Exploitation",
    role: "Responsable Exploitation",
    bio: `Coordination quotidienne des tournées, des chauffeurs et des relations avec les clients. Rigueur et sens de l'organisation permettent de tenir les engagements de livraison même en situation d'urgence. La tour de contrôle opérationnelle de ${c.NOM_ENTREPRISE}.`,
    image: "/images/team/sophie-blanchard.png",
    specialties: [
      "Gestion des tournées",
      "Relations transporteurs",
      "Optimisation logistique",
    ],
  },
  {
    id: "tm4",
    name: "Responsable Commercial",
    role: "Responsable Commercial",
    bio: `Prospection et fidélisation des clients professionnels de ${c.NOM_ENTREPRISE}. Spécialiste des solutions sur mesure pour les industriels et les négoces régionaux, interlocuteur de référence pour toute demande de devis ou de partenariat logistique durable.`,
    image: "/images/team/emilie-fontaine.png",
    specialties: [
      "Développement client",
      "Devis transport et logistique",
      "Partenariats industriels",
    ],
  },
];
