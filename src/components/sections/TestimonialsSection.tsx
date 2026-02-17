"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[2px] w-12 bg-accent-500 shrink-0" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-600">
            Témoignages Clients
          </p>
        </div>

        {/* Citation */}
        <div className="relative">
          {/* Guillemet décorative */}
          <div
            aria-hidden
            className="absolute -top-4 left-0 font-heading font-black text-primary-900 select-none pointer-events-none leading-none"
            style={{ fontSize: "15vw", opacity: 0.04 }}
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              {/* Quote text */}
              <blockquote className="font-heading italic text-2xl md:text-3xl lg:text-4xl text-neutral-900 leading-snug max-w-4xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-10 flex items-center gap-6">
                <div className="h-[2px] w-10 bg-accent-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent-600">
                    {t.clientName}
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {t.location} · {t.projectType}
                  </p>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5 ml-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="h-3.5 w-3.5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center gap-6">
          <button
            onClick={prev}
            aria-label="Témoignage précédent"
            className="w-12 h-12 flex items-center justify-center border border-neutral-300 text-neutral-500 hover:border-primary-900 hover:text-primary-900 hover:bg-primary-50 transition-colors rounded-none"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Témoignage suivant"
            className="w-12 h-12 flex items-center justify-center border border-neutral-300 text-neutral-500 hover:border-primary-900 hover:text-primary-900 hover:bg-primary-50 transition-colors rounded-none"
          >
            →
          </button>
          <span className="text-xs text-neutral-400 font-semibold tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
