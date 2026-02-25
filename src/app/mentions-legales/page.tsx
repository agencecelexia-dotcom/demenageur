import type { Metadata } from "next";
import { company } from "@/data/company";
import { clientConfig } from "@/config/client.config";
import FadeUp from "@/components/animations/FadeUp";
import { Building2, Server, ShieldCheck, AlertTriangle, Cookie, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: `Mentions légales de ${clientConfig.NOM_ENTREPRISE}.`,
};

const sections = [
  {
    icon: Building2,
    title: "Éditeur du site",
    content: (
      <div className="space-y-1 text-sm leading-relaxed">
        <p className="font-semibold text-primary-900">{company.legalName}</p>
        <p>SIRET : {company.siret}</p>
        <p>{company.address.street}</p>
        <p>
          {company.address.postalCode} {company.address.city},{" "}
          {company.address.country}
        </p>
        <p className="pt-2">
          Tél :{" "}
          <a
            href={`tel:${company.phone}`}
            className="text-accent-600 hover:underline"
          >
            {company.phone}
          </a>
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
    icon: Server,
    title: "Hébergement",
    content: (
      <p className="text-sm leading-relaxed">
        Ce site est hébergé par <strong>Vercel Inc.</strong>
        <br />
        440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
      </p>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Propriété intellectuelle",
    content: (
      <p className="text-sm leading-relaxed">
        L&apos;ensemble du contenu de ce site (textes, images, graphiques,
        logo) est la propriété exclusive de {company.legalName}, sauf mention
        contraire. Toute reproduction, même partielle, est interdite sans
        autorisation préalable écrite.
      </p>
    ),
  },
  {
    icon: AlertTriangle,
    title: "Limitation de responsabilité",
    content: (
      <p className="text-sm leading-relaxed">
        Les informations contenues sur ce site sont données à titre indicatif
        et peuvent évoluer. {company.name} ne saurait être tenu responsable
        des erreurs ou omissions présentes sur ce site.
      </p>
    ),
  },
  {
    icon: Cookie,
    title: "Cookies",
    content: (
      <p className="text-sm leading-relaxed">
        Ce site peut utiliser des cookies techniques nécessaires à son
        fonctionnement. Aucun cookie de tracking publicitaire tiers
        n&apos;est utilisé sans votre consentement explicite.
      </p>
    ),
  },
  {
    icon: Scale,
    title: "Droit applicable",
    content: (
      <p className="text-sm leading-relaxed">
        Le présent site et son contenu sont régis par le droit français. Tout
        litige relatif à l&apos;utilisation de ce site sera soumis à la
        compétence des tribunaux compétents de {company.address.city}.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400 mb-4">
              Informations légales
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Mentions Légales
            </h1>
            <p className="max-w-xl mx-auto text-neutral-300">
              Toutes les informations légales relatives à {company.name} et à
              l&apos;utilisation de ce site internet.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Content cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <FadeUp key={section.title} delay={i * 0.08}>
                  <div className="h-full p-6 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="font-heading text-lg font-bold text-primary-900">
                        {section.title}
                      </h2>
                    </div>
                    <div className="text-neutral-600">{section.content}</div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
