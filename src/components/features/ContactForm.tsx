"use client";

import { useState } from "react";
import { contactFormSchema } from "@/lib/validation";
import { clientConfig } from "@/config/client.config";

const serviceOptions = [
  { value: "residentiel", label: "Déménagement résidentiel" },
  { value: "entreprise", label: "Déménagement d'entreprise" },
  { value: "longue-distance", label: "Déménagement longue distance" },
  { value: "international", label: "Déménagement international" },
  { value: "garde-meuble", label: "Garde-meuble & Stockage" },
  { value: "emballage", label: "Emballage & Manutention" },
  { value: "autre", label: "Autre / Je ne sais pas encore" },
];

const volumeOptions = [
  { value: "studio", label: "Studio (< 15 m³)" },
  { value: "2pieces", label: "2 pièces (15–25 m³)" },
  { value: "3pieces", label: "3 pièces (25–40 m³)" },
  { value: "4pieces", label: "4 pièces (40–60 m³)" },
  { value: "grande-maison", label: "Grande maison (> 60 m³)" },
  { value: "entreprise", label: "Bureau / Entreprise" },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  moveVolume: string;
  projectDescription: string;
  rgpdConsent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  serviceType: "",
  moveVolume: "",
  projectDescription: "",
  rgpdConsent: false,
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(initialState);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">Message envoyé !</h3>
        <p className="text-neutral-600">Nous vous répondons sous 24h, généralement beaucoup plus vite.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-accent-600 hover:text-accent-700 underline underline-offset-4"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="Jean"
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="Dupont"
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email & Téléphone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="jean@exemple.fr"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="06 12 34 56 78"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Service souhaité <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
        >
          <option value="">Sélectionnez un service</option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.serviceType && <p className="mt-1 text-xs text-red-600">{errors.serviceType}</p>}
      </div>

      {/* Volume */}
      <div>
        <label htmlFor="moveVolume" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Volume estimé <span className="text-red-500">*</span>
        </label>
        <select
          id="moveVolume"
          name="moveVolume"
          value={form.moveVolume}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
        >
          <option value="">Sélectionnez un volume</option>
          {volumeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.moveVolume && <p className="mt-1 text-xs text-red-600">{errors.moveVolume}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="projectDescription" className="block text-sm font-medium text-neutral-700 mb-1.5">
          Décrivez votre déménagement <span className="text-red-500">*</span>
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows={4}
          value={form.projectDescription}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
          placeholder="Adresse de départ, adresse d'arrivée, date souhaitée, particularités (piano, objets fragiles, étage sans ascenseur...)..."
        />
        {errors.projectDescription && <p className="mt-1 text-xs text-red-600">{errors.projectDescription}</p>}
      </div>

      {/* RGPD */}
      <div className="flex items-start gap-3">
        <input
          id="rgpdConsent"
          name="rgpdConsent"
          type="checkbox"
          checked={form.rgpdConsent}
          onChange={handleChange}
          className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="rgpdConsent" className="text-xs text-neutral-600 leading-relaxed">
          J&apos;accepte que {clientConfig.NOM_ENTREPRISE} utilise mes données pour répondre à ma demande de devis.
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès et de suppression de vos données.
          Consultez notre{" "}
          <a href="/politique-de-confidentialite" className="text-primary-600 hover:underline">
            politique de confidentialité
          </a>.
          <span className="text-red-500"> *</span>
        </label>
      </div>
      {errors.rgpdConsent && <p className="text-xs text-red-600">{errors.rgpdConsent}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 rounded-xl bg-accent-500 text-white font-semibold hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande de devis"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600 text-center">
          Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
        </p>
      )}
    </form>
  );
}
