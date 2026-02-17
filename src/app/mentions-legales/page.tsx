import type { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales de TransLog Pro.",
};

export default function MentionsLegalesPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-8">Mentions Légales</h1>

        <div className="prose prose-neutral max-w-none space-y-8 text-neutral-700">
          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Éditeur du site</h2>
            <p>
              <strong>{company.legalName}</strong><br />
              SIRET : {company.siret}<br />
              {company.address.street}<br />
              {company.address.postalCode} {company.address.city}, {company.address.country}<br />
              Téléphone : {company.phone}<br />
              Email : {company.email}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc.<br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, graphiques, logo) est la propriété
              exclusive de {company.legalName}, sauf mention contraire. Toute reproduction, même partielle,
              est interdite sans autorisation préalable écrite.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Limitation de responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont données à titre indicatif et peuvent évoluer.
              {company.name} ne saurait être tenu responsable des erreurs ou omissions présentes dans ce site.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Cookies</h2>
            <p>
              Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun cookie
              de tracking publicitaire tiers n&apos;est utilisé sans votre consentement explicite.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
