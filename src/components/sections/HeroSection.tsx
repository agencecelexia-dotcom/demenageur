"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[680px] flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-main.jpeg"
        alt="Transports Boulocher — transporteur routier de fret Le Havre"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay : gradient uniquement vers le bas */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/40 to-transparent" />

      {/* Watermark année */}
      <div
        aria-hidden
        className="absolute bottom-0 right-0 font-heading font-black text-white select-none pointer-events-none leading-none"
        style={{ fontSize: "22vw", opacity: 0.04, lineHeight: 1 }}
      >
        1999
      </div>

      {/* Téléphone vertical — droite */}
      <motion.a
        href="tel:+33642087060"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Appeler Transports Boulocher"
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 text-white/40 hover:text-accent-400 transition-colors z-10"
        style={{ writingMode: "vertical-rl", letterSpacing: "0.12em" }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase">06 42 08 70 60</span>
      </motion.a>

      {/* Contenu principal — ancré en bas à gauche */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 pb-16 md:pb-20">
        <div className="max-w-4xl">

          {/* Ligne accent + label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-16 bg-accent-400 shrink-0" />
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-300">
              Transporteur routier — Le Havre & Europe depuis 1999
            </p>
          </motion.div>

          {/* Titre massif */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hero-title font-heading font-black text-white"
          >
            Votre Fret,
            <br />
            <em className="not-italic text-accent-400">Notre</em> Fiabilité.
          </motion.h1>

          {/* Sous-titre + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col sm:flex-row sm:items-end gap-8"
          >
            <p className="text-base text-white/70 leading-relaxed max-w-sm">
              Transport routier, logistique et affrètement depuis Le Havre
              vers toute la France et l&apos;Europe. Flotte Euro 6, suivi GPS, devis sous 2h.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent-500 text-white font-semibold text-sm hover:bg-accent-600 transition-colors rounded-none border-l-[3px] border-accent-300"
              >
                Devis sous 2h
              </Link>
              <Link
                href="/realisations"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold text-sm hover:border-white/60 hover:bg-white/5 transition-colors rounded-none"
              >
                Nos références →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Barre de crédentiels en bas */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="relative z-10 border-t border-white/10 bg-primary-950/60 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3 flex flex-wrap items-center gap-x-8 gap-y-2">
          {[
            { label: "Flotte Euro 6 GPS", value: "" },
            { label: "ans d'expérience", value: "25" },
            { label: "Devis sous 2h", value: "" },
            { label: "pays desservis", value: "15+" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-accent-400 shrink-0" />
              <span className="text-xs text-white/60">
                {item.value && <strong className="text-accent-400 font-semibold">{item.value} </strong>}
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
