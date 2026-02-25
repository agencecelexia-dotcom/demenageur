import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "Arnaud Lefevre",
    location: "Directeur Achats, Groupe {REGION} Bois",
    rating: 5,
    quote:
      "Nous travaillons avec {NOM_ENTREPRISE} depuis 6 ans pour nos livraisons chantiers en {REGION}. Ponctualité irréprochable, conducteurs professionnels, et l'équipe répond toujours présente quand on a une urgence. Un partenaire de confiance.",
    projectType: "Transport régulier {REGION}",
    date: "Décembre 2024",
  },
  {
    id: "t2",
    clientName: "Sophie Vanhoorelbeke",
    location: "Responsable Logistique, Cerabati {VILLE}",
    rating: 5,
    quote:
      "La réactivité de l'équipe lors de nos pics d'activité est remarquable. {NOM_ENTREPRISE} a su adapter ses capacités à nos besoins variables sans jamais nous laisser en difficulté. On leur fait confiance les yeux fermés.",
    projectType: "Transport industriel & affrètement",
    date: "Octobre 2024",
  },
  {
    id: "t3",
    clientName: "Thomas Guillemot",
    location: "Gérant, Négoce Maritime Guillemot",
    rating: 5,
    quote:
      "Pour nos transports et nos tournées de livraison dans le {DEPARTEMENT}, {NOM_ENTREPRISE} est notre premier choix depuis des années. L'équipe comprend nos contraintes et sa flexibilité nous est précieuse.",
    projectType: "Transport {VILLE}",
    date: "Septembre 2024",
  },
  {
    id: "t4",
    clientName: "Nathalie Aubert",
    location: "DAF, SARL Aubert Distribution",
    rating: 5,
    quote:
      "Après avoir testé plusieurs prestataires, nous sommes revenus à {NOM_ENTREPRISE}. Le rapport qualité-prix est imbattable, et la traçabilité de nos colis nous permet de rassurer nos propres clients en temps réel.",
    projectType: "Logistique & distribution régionale",
    date: "Janvier 2025",
  },
  {
    id: "t5",
    clientName: "Pierre-Yves Mahé",
    location: "Directeur, Mahé Industries",
    rating: 5,
    quote:
      "{NOM_ENTREPRISE} a géré notre transfert d'outillage industriel entre {COMMUNE_1} et {VILLE} avec une précision et un soin remarquables. Matériel fragile, délais serrés : zéro incident, zéro retard. Je recommande sans hésiter.",
    projectType: "Transport de matériel industriel",
    date: "Mars 2025",
  },
  {
    id: "t6",
    clientName: "Éric Fontaine",
    location: "Gérant, Fontaine & Fils Travaux Publics",
    rating: 5,
    quote:
      "Devis obtenu en moins d'une heure, livraison le lendemain matin à 7h comme convenu. Pour une PME comme la nôtre, avoir un transporteur aussi réactif et fiable change tout. Merci à toute l'équipe.",
    projectType: "Transport BTP {REGION}",
    date: "Novembre 2024",
  },
];
