"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SplitText from "@/components/animations/SplitText";
import { clientConfig } from "@/config/client.config";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/images/hero-main.jpeg"
        alt={`${clientConfig.NOM_ENTREPRISE} — transporteur routier de fret ${clientConfig.VILLE}`}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/75 via-primary-950/60 to-primary-950/80" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-xs font-semibold tracking-[0.22em] uppercase text-accent-300"
        >
          {clientConfig.ACCROCHE_HERO}
        </motion.p>

        {/* H1 */}
        <SplitText
          text={clientConfig.SLOGAN}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
          delay={0.15}
        />

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl mx-auto text-base md:text-lg text-white/75 leading-relaxed"
        >
          {clientConfig.DESCRIPTION_ENTREPRISE}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-accent-500 text-white font-semibold text-sm rounded-2xl hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            Demander un Devis Rapide
          </Link>
          <Link
            href="/realisations"
            className="px-8 py-4 border border-white/35 text-white font-semibold text-sm rounded-2xl hover:bg-white/10 hover:border-white/55 hover:-translate-y-0.5 transition-all duration-300"
          >
            Voir nos Références
          </Link>
        </motion.div>
      </div>

      {/* Barre crédentiels bas de page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-primary-950/50 backdrop-blur-sm rounded-t-3xl"
      >
        <div className="mx-auto max-w-5xl px-6 py-4 flex flex-wrap justify-center items-center gap-x-10 gap-y-2">
          {[
            "Flotte Euro 6 GPS tracée",
            "Devis sous 2h",
            "Livraison garantie",
            `+${clientConfig.ANNEES_EXPERIENCE} ans d'expérience`,
          ].map((item) => (
            <span key={item} className="flex items-center gap-2 text-xs text-white/55">
              <span className="h-1 w-1 rounded-full bg-accent-400 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
