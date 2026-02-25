"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "@/components/animations/FadeUp";
import { clientConfig } from "@/config/client.config";

const faqs = [
  {
    q: "Quels sont vos délais pour un devis ?",
    a: `Nous nous engageons à vous fournir un devis détaillé sous 2 heures pour toute demande standard. Pour les projets complexes (transport international, matériel spécifique), comptez 24h maximum. Le devis est gratuit et sans engagement.`,
  },
  {
    q: "Quelle est votre zone d'intervention ?",
    a: `Nous intervenons principalement en ${clientConfig.REGION} et sur l'ensemble du territoire national. Nous assurons également le transport européen vers le Benelux, l'Allemagne, l'Espagne, le Portugal et au-delà via notre réseau de partenaires certifiés.`,
  },
  {
    q: "Mes marchandises sont-elles assurées pendant le transport ?",
    a: "Oui, toutes les marchandises transportées sont couvertes par notre assurance professionnelle. Une assurance complémentaire ad valorem peut être souscrite pour les chargements de valeur. Les détails de couverture sont précisés dans chaque devis.",
  },
  {
    q: "Quels types de véhicules avez-vous dans votre flotte ?",
    a: "Notre flotte comprend des fourgons (3,5t), des porteurs (7,5t à 19t) et des semi-remorques (jusqu'à 24t de charge utile). Tous nos véhicules sont aux normes Euro 6, équipés GPS et entretenus rigoureusement. Nous pouvons aussi mobiliser des véhicules spéciaux via notre service d'affrètement.",
  },
  {
    q: "Proposez-vous des solutions de stockage ?",
    a: `Oui, notre entrepôt situé à ${clientConfig.VILLE} offre des solutions logistiques complètes : stockage sécurisé, gestion de stock, préparation de commandes et expédition. Nous proposons des contrats flexibles, sans engagement de durée minimum.`,
  },
  {
    q: "Comment puis-je suivre mes expéditions ?",
    a: "Chaque expédition est tracée en temps réel grâce au GPS embarqué dans nos véhicules. Vous recevez un lien de suivi par email à l'enlèvement, et pouvez consulter l'avancement de la livraison à tout moment. Notre équipe reste joignable par téléphone pour toute question.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden hover:border-primary-200 transition-colors">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-neutral-900">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-28 bg-neutral-50">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent-600 mb-4">
            Questions Fréquentes
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            On Vous Répond
          </h2>
        </FadeUp>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
