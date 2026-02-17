import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";

const reasons = [
  {
    title: "Flotte moderne Euro 6 GPS tracée",
    desc: "Nos camions répondent aux normes Euro 6. Chaque véhicule est équipé d'un GPS temps réel pour un suivi précis de vos expéditions.",
  },
  {
    title: "Ponctualité et fiabilité",
    desc: "Depuis 25 ans, nous honorons nos engagements de livraison. Notre taux de respect des délais dépasse 97% sur l'ensemble de nos tournées.",
  },
  {
    title: "Équipe locale et réactive",
    desc: "Basés à Le Havre, nos équipes connaissent le tissu industriel normand et les contraintes du port. Un devis en moins de 2 heures sur demande.",
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
    <section className="py-24 bg-primary-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <FadeUp>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/about-team.png"
                alt="Équipe TransLog Pro au travail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeUp>

          {/* Content */}
          <div>
            <FadeUp>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-600 mb-4">
                Nos engagements
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
                Pourquoi Confier Votre Fret à Boulocher ?
              </h2>
            </FadeUp>

            <div className="space-y-5">
              {reasons.map((r, i) => (
                <FadeUp key={r.title} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 h-6 w-6 rounded-full bg-accent-500 flex items-center justify-center">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{r.title}</p>
                      <p className="text-sm text-neutral-600 mt-0.5">{r.desc}</p>
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
