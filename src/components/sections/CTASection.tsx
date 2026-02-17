import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[500px]">

        {/* Gauche — texte sur fond sombre */}
        <div className="relative z-10 bg-primary-950 flex flex-col justify-center px-8 md:px-16 py-20 lg:py-28 lg:w-1/2 xl:w-[55%]">
          <FadeUp>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-10 bg-accent-400 shrink-0" />
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400">
                Besoin d&apos;un devis ?
              </p>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Transporteur de Confiance
              <br />
              depuis Le Havre
            </h2>

            <p className="text-neutral-400 text-base leading-relaxed mb-8 max-w-sm">
              Notre équipe répond sous 2h, du lundi au vendredi de 9h à 18h.
              Flotte Euro 6 · Suivi GPS temps réel · 25 ans d&apos;expérience.
            </p>

            {/* Téléphone en grand */}
            <a
              href="tel:+33642087060"
              className="font-heading font-bold text-accent-400 hover:text-accent-300 transition-colors mb-8 block"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              06 42 08 70 60
            </a>

            {/* CTA bouton */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-accent-500 text-white font-semibold text-sm hover:bg-accent-600 transition-colors rounded-none border-l-[3px] border-accent-300"
            >
              Demander un Devis Rapide
            </Link>
          </FadeUp>
        </div>

        {/* Droite — image avec bord diagonal */}
        <div className="relative lg:w-1/2 xl:w-[45%] min-h-[300px] lg:min-h-0 clip-diagonal">
          <Image
            src="/images/cta-bg.png"
            alt="Camion Transports Boulocher"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          {/* Overlay très léger pour lisibilité */}
          <div className="absolute inset-0 bg-primary-950/10" />
        </div>
      </div>
    </section>
  );
}
