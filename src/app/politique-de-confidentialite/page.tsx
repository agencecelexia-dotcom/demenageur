import type { Metadata } from "next";
import { company } from "@/data/company";
import { clientConfig } from "@/config/client.config";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: `Politique de confidentialité et protection des données de ${clientConfig.NOM_ENTREPRISE}.`,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="font-heading text-4xl font-bold text-neutral-900 mb-8">
          Politique de Confidentialité
        </h1>

        <div className="space-y-8 text-neutral-700">
          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Responsable du traitement</h2>
            <p>
              {company.legalName} — {company.address.street}, {company.address.postalCode} {company.address.city}<br />
              Email : {company.email}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Données collectées</h2>
            <p>Nous collectons les données suivantes via notre formulaire de contact :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Informations relatives à votre projet de déménagement</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Finalité du traitement</h2>
            <p>
              Ces données sont utilisées exclusivement pour répondre à vos demandes de devis et vous
              fournir nos services de déménagement. Elles ne sont ni vendues ni transmises à des tiers
              sans votre consentement explicite.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant 3 ans à compter de notre dernier contact, conformément
              à la réglementation française.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm">
              <li>Droit d&apos;accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit d&apos;opposition au traitement</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à : <a href={`mailto:${company.email}`} className="text-primary-600 hover:underline">{company.email}</a>
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">Réclamation</h2>
            <p>
              Vous pouvez également déposer une réclamation auprès de la CNIL (Commission Nationale
              de l&apos;Informatique et des Libertés) : www.cnil.fr
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
