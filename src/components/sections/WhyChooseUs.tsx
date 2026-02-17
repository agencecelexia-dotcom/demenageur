import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";

const reasons = [
  {
    title: "Assurance tous risques incluse",
    desc: "Chaque déménagement est couvert par notre RC professionnelle et une garantie tous risques sur vos biens, sans franchise cachée.",
  },
  {
    title: "Ponctualité garantie",
    desc: "Nous nous engageons sur des créneaux horaires précis. En retard de plus de 30 minutes, nous offrons 10% sur la prestation.",
  },
  {
    title: "Équipes salariées certifiées",
    desc: "Tous nos déménageurs sont salariés, formés en interne, en uniforme. Aucun sous-traitant inconnu ne touche à vos affaires.",
  },
  {
    title: "Devis transparent, prix ferme",
    desc: "Notre devis détaillé est un prix ferme et définitif. Aucune mauvaise surprise le jour J. Ce que vous signez, vous payez.",
  },
  {
    title: "Démarche éco-responsable",
    desc: "Camions Euro 6, cartons recyclables récupérés après déménagement, optimisation des trajets — nous réduisons notre empreinte carbone.",
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
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80"
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
                Pourquoi nous choisir
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
                L&apos;Excellence au Service de Votre Déménagement
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
