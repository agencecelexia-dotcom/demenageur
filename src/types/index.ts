export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  founded: number;
  siret: string;
  phone: string;
  email: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  features: string[];
  price: string;
  duration: string;
  featured: boolean;
  order: number;
}

export type RealisationCategory =
  | "local"
  | "longue-distance"
  | "international"
  | "entreprise"
  | "stockage";

export const REALISATION_CATEGORY_LABELS: Record<RealisationCategory, string> = {
  local: "Local Paris/IDF",
  "longue-distance": "Longue Distance",
  international: "International",
  entreprise: "Entreprise",
  stockage: "Garde-Meuble",
};

export interface Realisation {
  id: string;
  slug: string;
  title: string;
  category: RealisationCategory;
  client: string;
  origin: string;
  destination: string;
  volume: string;
  distance: string;
  duration: string;
  team: string;
  challenge: string;
  solution: string;
  result: string;
  featuredImage: string;
  images: string[];
  featured: boolean;
  date: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  rating: number;
  quote: string;
  projectType: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: BlogSection[];
  category: string;
  readTime: string;
  date: string;
  featuredImage: string;
  author: string;
  tags: string[];
}

export type BlogSection =
  | { type: "paragraph"; content: string }
  | { type: "h2"; content: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; content: string; author?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  moveVolume: string;
  projectDescription: string;
  rgpdConsent: boolean;
}
