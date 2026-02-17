import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";

const engagements = [
  {
    value: "25",
    unit: "ans",
    label: "d'expérience en transport routier de fret depuis Le Havre",
  },
  {
    value: "98%",
    unit: "",
    label: "de clients satisfaits selon nos enquêtes annuelles de qualité",
  },
  {
    value: "2h",
    unit: "",
    label: "délai maximum pour vous répondre avec un devis personnalisé",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden">
      {/* Image pleine largeur */}
      <div className="relative h-[480px] md:h-[560px] w-full">
        <Image
          src="/images/about-team.png"
          alt="L'équipe Transports Boulocher"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay sombre progressif */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 to-transparent" />

        {/* Texte flottant sur l'image */}
        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-12 max-w-7xl mx-auto w-full">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-10 bg-accent-400 shrink-0" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400">
                Notre Engagement
              </p>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-2xl">
              La rigueur normande au service de votre fret
            </h2>
          </FadeUp>
        </div>
      </div>

      {/* Barre de stats flottante */}
      <div className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {engagements.map((e) => (
              <FadeUp key={e.value} className="py-10 px-6 md:px-10 first:pl-0 last:pr-0">
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-heading font-black text-5xl text-primary-900 leading-none">
                    {e.value}
                  </span>
                  {e.unit && (
                    <span className="font-heading font-bold text-2xl text-accent-500">
                      {e.unit}
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{e.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
