import type { CompanyInfo } from "@/types";

export const company: CompanyInfo = {
  name: "TransLog Pro",
  legalName: "TransLog Pro SARL",
  tagline: "Votre déménagement, notre expertise.",
  description:
    "Depuis 2007, TransLog Pro accompagne particuliers et entreprises dans leurs déménagements en Île-de-France et à l'international avec professionnalisme et transparence.",
  founded: 2007,
  siret: "823 456 789 00017",
  phone: "+33 1 42 60 11 22",
  email: "contact@translogpro.fr",
  address: {
    street: "14 Rue de la Paix",
    postalCode: "75001",
    city: "Paris",
    country: "France",
  },
  hours: "Lun–Ven : 8h–19h · Sam : 9h–17h",
  coordinates: {
    lat: 48.8698,
    lng: 2.3307,
  },
  socialLinks: {
    facebook: "https://facebook.com/translogpro",
    instagram: "https://instagram.com/translogpro",
    linkedin: "https://linkedin.com/company/translogpro",
  },
};
