"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SplitText from "@/components/animations/SplitText";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-main.jpeg"
        alt="Déménageurs professionnels TransLog Pro"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/80 via-primary-900/70 to-primary-950/85" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent-300 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]"
        >
          Transporteur routier de fret — Normandie & Europe depuis 1999
        </motion.p>

        {/* H1 animated */}
        <SplitText
          text="Votre Fret, Notre Fiabilité."
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] [text-shadow:0_2px_16px_rgba(0,0,0,0.8)]"
          delay={0.2}
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl mx-auto text-lg text-white/90 leading-relaxed [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]"
        >
          Transports Boulocher assure le transport routier de fret, la logistique et
          l&apos;affrètement depuis Le Havre vers toute la France et l&apos;Europe.
          Flotte Euro 6, suivi GPS, devis sous 2h.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {["Flotte Euro 6 GPS tracée", "Devis sous 2h", "Livraison garantie", "+25 ans d'expérience"].map((badge) => (
            <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white/90">
              <svg className="h-3 w-3 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {badge}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors text-sm"
          >
            Demander un Devis Rapide
          </Link>
          <Link
            href="/realisations"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors text-sm"
          >
            Voir nos Références
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50 tracking-widest uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
