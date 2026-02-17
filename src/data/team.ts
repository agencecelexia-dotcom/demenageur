import type { TeamMember } from "@/types";

export const team: TeamMember[] = [
  {
    id: "tm1",
    name: "Laurent Mercier",
    role: "Directeur & Fondateur",
    bio: "Fort de 18 ans dans le secteur du déménagement, Laurent a fondé TransLog Pro en 2007 avec une vision claire : offrir à chaque client le soin d'un déménagement haut de gamme, quel que soit le budget. Ancien responsable logistique chez un grand groupe, il apporte une rigueur opérationnelle qui distingue l'entreprise.",
    image: "/images/team/laurent-mercier.jpg",
    specialties: [
      "Déménagements internationaux",
      "Grands comptes entreprises",
      "Stratégie logistique",
    ],
  },
  {
    id: "tm2",
    name: "Sophie Blanchard",
    role: "Responsable Logistique",
    bio: "Diplômée en supply chain et management logistique, Sophie orchestre chaque déménagement comme une opération militaire. Aucun détail n'échappe à sa coordination méticuleuse. Elle est l'architecte invisible de chaque déménagement réussi chez TransLog Pro.",
    image: "/images/team/sophie-blanchard.jpg",
    specialties: [
      "Planification logistique",
      "Déménagements d'entreprise",
      "Gestion des imprévus",
    ],
  },
  {
    id: "tm3",
    name: "Karim Aït-Ahmed",
    role: "Chef d'Équipe Senior",
    bio: "15 ans de terrain, Karim est le référent technique de TransLog Pro. Spécialiste du levage, du piano et des objets d'art, il forme également les nouvelles recrues avec exigence et bienveillance. Sa force et sa dextérité sont légendaires dans l'équipe.",
    image: "/images/team/karim-ait-ahmed.jpg",
    specialties: [
      "Manutention spéciale",
      "Emballage d'œuvres d'art",
      "Formation des équipes",
    ],
  },
  {
    id: "tm4",
    name: "Émilie Fontaine",
    role: "Chargée de Clientèle",
    bio: "Premier contact de nos clients, Émilie accompagne chaque famille ou entreprise de la demande de devis jusqu'au jour J et au-delà. Sa disponibilité, son écoute et son empathie sont unanimement saluées dans les avis clients. Elle transforme une expérience potentiellement stressante en moment serein.",
    image: "/images/team/emilie-fontaine.jpg",
    specialties: [
      "Relation client",
      "Devis personnalisés",
      "Coordination internationale",
    ],
  },
];
