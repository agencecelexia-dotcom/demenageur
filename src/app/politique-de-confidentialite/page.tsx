import type { Metadata } from "next";
import { company } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import FadeUp from "@/components/animations/FadeUp";
import {
  UserCheck,
  Database,
  Target,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: `Politique de confidentialité et protection des données de ${clientConfig.NOM_ENTREPRISE}.`,
};

const sections = [
  {
    icon: UserCheck,
    title: "Responsable du traitement",
    content: (
      <div className="text-sm leading-relaxed space-y-1">
        <p className="font-semibold text-primary-900">{company.legalName}</p>
        <p>
          {company.address.street}, {company.address.postalCode}{" "}
          {company.address.city}
        </p>
        <p>
          Email :{" "}
          <a
            href={`mailto:${company.email}`}
            className="text-accent-600 hover:underline"
          >
            {company.email}
          </a>
        </p>
      </div>
    ),
  },
  {
    icon: Database,
    title: "Données collectées",
    content: (
      <div className="text-sm leading-relaxed">
        <p className="mb-3">
          Nous collectons les données suivantes via notre formulaire de
          contact :
        </p>
        <ul className="space-y-2">
          {[
            "Nom et prénom",
            "Adresse email",
            "Numéro de téléphone",
            "Informations relatives à votre projet de transport",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    icon: Target,
    title: "Finalité du traitement",
    content: (
      <p className="text-sm leading-relaxed">
        Ces données sont utilisées exclusivement pour répondre à vos demandes
        de devis et vous fournir nos services de transport. Elles ne sont ni
        vendues ni transmises à des tiers sans votre consentement explicite.
      </p>
    ),
  },
  {
    icon: Clock,
    title: "Durée de conservation",
    content: (
      <p className="text-sm leading-relaxed">
        Vos données sont conservées pendant <strong>3 ans</strong> à compter
        de notre dernier contact, conformément à la réglementation française.
      </p>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Vos droits (RGPD)",
    content: (
      <div className="text-sm leading-relaxed">
        <p className="mb-3">
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="space-y-2 mb-4">
          {[
            "Droit d'accès à vos données personnelles",
            "Droit de rectification des données inexactes",
            "Droit à l'effacement (droit à l'oubli)",
            "Droit à la portabilité de vos données",
            "Droit d'opposition au traitement",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à :{" "}
          <a
            href={`mailto:${company.email}`}
            className="text-accent-600 font-semibold hover:underline"
          >
            {company.email}
          </a>
        </p>
      </div>
    ),
  },
  {
    icon: AlertCircle,
    title: "Réclamation",
    content: (
      <p className="text-sm leading-relaxed">
        Vous pouvez également déposer une réclamation auprès de la{" "}
        <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et
        des Libertés) :{" "}
        <span className="text-accent-600 font-semibold">www.cnil.fr</span>
      </p>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400 mb-4">
              Protection des données
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Politique de Confidentialité
            </h1>
            <p className="max-w-xl mx-auto text-neutral-300">
              Nous prenons la protection de vos données personnelles très au
              sérieux. Voici comment nous les collectons, les utilisons et les
              protégeons.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Content cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <FadeUp key={section.title} delay={i * 0.08}>
                <div className="p-6 md:p-8 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-heading text-lg font-bold text-primary-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-neutral-600 pl-13">
                    {section.content}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>
    </>
  );
}
