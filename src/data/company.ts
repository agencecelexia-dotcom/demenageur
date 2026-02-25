import type { CompanyInfo } from "@/types";
import { clientConfig } from "@/config/client.config";

const c = clientConfig;

export const company: CompanyInfo = {
  name: c.NOM_ENTREPRISE,
  legalName: c.NOM_LEGAL,
  tagline: c.SLOGAN,
  description: c.DESCRIPTION_ENTREPRISE,
  founded: parseInt(c.ANNEE_CREATION),
  siret: c.SIRET,
  phone: c.TELEPHONE,
  email: c.EMAIL,
  address: {
    street: c.ADRESSE,
    postalCode: c.CODE_POSTAL,
    city: c.VILLE,
    country: c.PAYS,
  },
  hours: c.HORAIRES,
  coordinates: {
    lat: parseFloat(c.LATITUDE),
    lng: parseFloat(c.LONGITUDE),
  },
  socialLinks: {
    facebook: c.FACEBOOK_URL,
    instagram: c.INSTAGRAM_URL,
    linkedin: c.LINKEDIN_URL,
  },
};
