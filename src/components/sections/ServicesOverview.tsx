"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { services } from "@/data/services";
import FadeUp from "@/components/animations/FadeUp";

export default function ServicesOverview() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <FadeUp className="flex items-end justify-between mb-0 pb-8 border-b border-neutral-200">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-600 mb-3">
              Nos Expertises
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
              Des Services Complets
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-primary-900 transition-colors pb-1 shrink-0"
          >
            Tous nos services
            <span className="text-accent-500">→</span>
          </Link>
        </FadeUp>

        {/* Liste numérotée */}
        <div>
          {services.map((svc, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            const isHovered = hovered === svc.id;

            return (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                onMouseEnter={() => setHovered(svc.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group flex items-center gap-6 py-7 border-b border-neutral-200 transition-all duration-300 ${
                  isHovered ? "bg-primary-950 px-6 -mx-6" : ""
                }`}
              >
                {/* Numéro */}
                <span
                  className={`font-heading italic font-bold text-5xl shrink-0 w-16 text-right transition-colors duration-300 leading-none ${
                    isHovered ? "text-accent-400/60" : "text-neutral-200"
                  }`}
                >
                  {num}
                </span>

                {/* Titre + description */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-heading text-xl md:text-2xl font-semibold transition-colors duration-300 ${
                      isHovered ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm leading-relaxed transition-all duration-300 overflow-hidden ${
                      isHovered
                        ? "max-h-20 opacity-100 text-neutral-400"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {svc.shortDescription}
                  </p>
                </div>

                {/* Image reveal */}
                <div
                  className={`shrink-0 overflow-hidden transition-all duration-500 ${
                    isHovered ? "w-[160px] h-[110px] opacity-100" : "w-0 h-[110px] opacity-0"
                  }`}
                  style={{
                    clipPath: isHovered
                      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                      : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                    transition: "width 0.4s ease, opacity 0.3s ease, clip-path 0.4s ease",
                  }}
                >
                  <div className="relative w-[160px] h-[110px]">
                    <Image
                      src={`/images/services/${svc.slug}.jpg`}
                      alt={svc.title}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                </div>

                {/* Flèche */}
                <span
                  className={`shrink-0 text-lg transition-all duration-300 ${
                    isHovered ? "text-accent-400 translate-x-1" : "text-neutral-300"
                  }`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-primary-900 transition-colors"
          >
            Tous nos services <span className="text-accent-500">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
