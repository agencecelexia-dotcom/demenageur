import type { Metadata } from "next";
import FadeUp from "@/components/animations/FadeUp";
import ContactForm from "@/components/features/ContactForm";
import GoogleMap from "@/components/features/GoogleMap";
import { company } from "@/data/company";
import { clientConfig } from "@/config/client.config";

export const metadata: Metadata = {
  title: "Contact — Demandez un Devis Gratuit",
  description: `Contactez ${clientConfig.NOM_ENTREPRISE} pour un devis de déménagement gratuit sous 24h. ${clientConfig.VILLE} et international. Appelez le ${clientConfig.TELEPHONE} ou remplissez notre formulaire.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400 mb-4">Devis gratuit</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">Parlons de Votre Déménagement</h1>
            <p className="max-w-xl mx-auto text-neutral-300">
              Remplissez le formulaire ci-dessous et nous vous rappelons dans les 24 heures.
              Ou appelez-nous directement — nous sommes disponibles du lundi au samedi.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeUp>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">Demander un devis</h2>
                  <ContactForm />
                </div>
              </FadeUp>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeUp delay={0.1}>
                <div className="p-6 rounded-2xl bg-primary-50 border border-primary-100">
                  <h3 className="font-heading text-lg font-bold text-primary-900 mb-4">Nos coordonnées</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-xs text-neutral-500 mb-0.5">Téléphone</p>
                        <a href={`tel:${company.phone}`} className="text-sm font-semibold text-primary-900 hover:text-accent-600 transition-colors">
                          {company.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-xs text-neutral-500 mb-0.5">Email</p>
                        <a href={`mailto:${company.email}`} className="text-sm font-semibold text-primary-900 hover:text-accent-600 transition-colors">
                          {company.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-xs text-neutral-500 mb-0.5">Adresse</p>
                        <p className="text-sm font-semibold text-primary-900">
                          {company.address.street}<br />
                          {company.address.postalCode} {company.address.city}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-5 w-5 text-accent-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs text-neutral-500 mb-0.5">Horaires</p>
                        <p className="text-sm font-semibold text-primary-900">{company.hours}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <GoogleMap />
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
