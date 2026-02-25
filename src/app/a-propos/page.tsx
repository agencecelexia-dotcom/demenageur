import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import { team } from "@/data/team";
import { company } from "@/data/company";
import { clientConfig } from "@/config/client.config";

export const metadata: Metadata = {
  title: `À Propos — ${clientConfig.NOM_ENTREPRISE}`,
  description: `Découvrez l'histoire de ${clientConfig.NOM_ENTREPRISE}, transporteur routier de fret basé à ${clientConfig.VILLE} depuis ${clientConfig.ANNEE_CREATION}. Rencontrez notre équipe et découvrez nos valeurs.`,
};

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400 mb-4">Notre histoire</p>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                25 ans au service du transport routier normand
              </h1>
              <p className="text-neutral-300 leading-relaxed mb-8">
                {company.description}
              </p>
              <Link href="/contact"
                className="inline-flex px-6 py-3 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors">
                Nous contacter
              </Link>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-about.png"
                  alt={`Équipe ${clientConfig.NOM_ENTREPRISE}`}
                  fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900">Nos Valeurs</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: "Fiabilité", desc: "Chaque livraison est un engagement. Nous planifions, coordonnons et exécutons avec la même rigueur que pour notre premier client.", icon: "🏆" },
              { title: "Transparence", desc: "Un devis est un contrat. Nous ne pratiquons aucuns frais cachés et informons proactivement sur chaque étape de l'acheminement.", icon: "🤝" },
              { title: "Proximité", desc: `Ancrés en ${clientConfig.REGION} depuis ${clientConfig.ANNEE_CREATION}, nous connaissons le tissu économique local et cultivons des relations durables avec nos clients.`, icon: "🚛" },
            ].map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div className="text-center p-8 rounded-2xl bg-primary-50 border border-primary-100">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">{v.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-600 mb-4">Les experts</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900">Notre Équipe</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <FadeUp key={member.id} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
                  <div className="relative aspect-[3/4] bg-primary-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-neutral-900">{member.name}</h3>
                    <p className="text-sm text-accent-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.specialties.slice(0, 2).map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1999", label: "Année de fondation" },
              { value: "20+", label: "Collaborateurs" },
              { value: "15+", label: "Pays desservis" },
              { value: "98%", label: "Clients satisfaits" },
            ].map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div>
                  <p className="font-heading text-4xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-neutral-400">{stat.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
