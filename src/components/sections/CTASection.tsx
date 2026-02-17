import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/animations/FadeUp";

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=600&fit=crop&q=80"
        alt="Déménagement professionnel TransLog Pro"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary-900/80" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <FadeUp>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt pour Votre Prochain Déménagement ?
          </h2>
          <p className="text-lg text-neutral-200 mb-4 max-w-xl mx-auto">
            Obtenez votre devis personnalisé en moins de 24 heures.
            Nos chargées de clientèle sont disponibles du lundi au samedi.
          </p>
          <p className="text-sm text-accent-300 mb-10">
            Assurance tous risques incluse · Prix ferme sans surprise · Équipes certifiées
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors"
            >
              Demander un Devis Gratuit
            </Link>
            <a
              href="tel:+33142601122"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              01 42 60 11 22
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
