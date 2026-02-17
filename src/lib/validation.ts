import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
  serviceType: z.string().min(1, "Veuillez sélectionner un service"),
  moveVolume: z.string().min(1, "Veuillez sélectionner un volume estimé"),
  projectDescription: z
    .string()
    .min(20, "La description doit contenir au moins 20 caractères"),
  rgpdConsent: z
    .boolean()
    .refine((val) => val === true, "Vous devez accepter notre politique de confidentialité"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
