import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";
import { clientConfig } from "@/config/client.config";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <Image
        src="/images/cta-bg.png"
        alt={`Transport routier ${clientConfig.NOM_ENTREPRISE} ${clientConfig.VILLE}`}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary-950/82" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Besoin d&apos;un Transporteur de Confiance ?
          </h2>
          <p className="text-base text-neutral-300 mb-3 max-w-lg mx-auto leading-relaxed">
            Obtenez votre devis en moins de 2 heures.
            Notre équipe est disponible du lundi au vendredi, 9h–18h.
          </p>
          <p className="text-sm text-accent-400 mb-12 tracking-wide">
            Flotte Euro 6 · Suivi GPS temps réel · {clientConfig.ANNEES_EXPERIENCE} ans d&apos;expérience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent-500 text-white font-semibold text-sm rounded-2xl hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Demander un Devis Rapide
            </Link>
            <a
              href={`tel:${clientConfig.TELEPHONE}`}
              className="flex items-center gap-2.5 px-8 py-4 border border-white/30 text-white font-semibold text-sm rounded-2xl hover:bg-white/8 hover:border-white/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {clientConfig.TELEPHONE.replace("+33 ", "0")}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
