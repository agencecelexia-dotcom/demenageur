import type { CompanyInfo } from "@/types";

export const company: CompanyInfo = {
  name: "{NOM_ENTREPRISE}",
  legalName: "{NOM_ENTREPRISE} SARL",
  tagline: "Votre fret, notre fiabilité.",
  description:
    "Depuis 1999, {NOM_ENTREPRISE} assure le transport routier de fret en {REGION} et sur les axes nationaux avec rigueur et ponctualité. Transport interurbain, logistique, affrètement et commissionnement au service des professionnels.",
  founded: 1999,
  siret: "{SIRET}",
  phone: "{TELEPHONE}",
  email: "{EMAIL}",
  address: {
    street: "{ADRESSE}",
    postalCode: "{CODE_POSTAL}",
    city: "{VILLE}",
    country: "France",
  },
  hours: "Lun–Ven : 9h–12h / 14h–18h",
  coordinates: {
    lat: 49.4844,
    lng: 0.1079,
  },
  socialLinks: {
    facebook: "https://facebook.com/{NOM_ENTREPRISE_SLUG}",
    instagram: "https://instagram.com/{NOM_ENTREPRISE_SLUG}",
    linkedin: "https://linkedin.com/company/{NOM_ENTREPRISE_SLUG}",
  },
};
