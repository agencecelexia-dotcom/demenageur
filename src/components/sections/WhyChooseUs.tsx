import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";
import { clientConfig } from "@/config/client.config";

const reasons = [
  {
    title: "Flotte moderne Euro 6 GPS tracée",
    desc: "Nos camions répondent aux normes Euro 6. Chaque véhicule est équipé d'un GPS temps réel pour un suivi précis de vos expéditions.",
  },
  {
    title: "Ponctualité et fiabilité",
    desc: `Depuis ${clientConfig.ANNEES_EXPERIENCE} ans, nous honorons nos engagements de livraison. Notre taux de respect des délais dépasse 97% sur l'ensemble de nos tournées.`,
  },
  {
    title: "Équipe locale et réactive",
    desc: `Basés à ${clientConfig.VILLE}, nos équipes connaissent le tissu industriel de ${clientConfig.REGION} et les contraintes locales. Un devis en moins de 2 heures sur demande.`,
  },
  {
    title: "Tarification claire et compétitive",
    desc: "Nos devis sont détaillés et sans frais cachés. Vous payez exactement ce qui est convenu, quelle que soit la distance ou la complexité.",
  },
  {
    title: "Engagement RSE et réduction carbone",
    desc: "Flotte Euro 6, optimisation des tournées à plein chargement, plans de réduction d'émissions — nous agissons pour un transport plus responsable.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <FadeUp>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-team.png"
                alt={`Équipe ${clientConfig.NOM_ENTREPRISE} au travail`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeUp>

          {/* Content */}
          <div>
            <FadeUp>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent-600 mb-4">
                Nos engagements
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-12">
                Pourquoi Confier Votre Fret à {clientConfig.NOM_ENTREPRISE} ?
              </h2>
            </FadeUp>

            <div className="space-y-8">
              {reasons.map((r, i) => (
                <FadeUp key={r.title} delay={i * 0.07}>
                  <div className="flex items-start gap-5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-500 ring-4 ring-accent-100" />
                    <div>
                      <p className="font-semibold text-neutral-900 mb-1">{r.title}</p>
                      <p className="text-sm text-neutral-500 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
