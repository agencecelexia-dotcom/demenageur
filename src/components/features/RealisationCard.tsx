import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Realisation } from "@/types";
import { REALISATION_CATEGORY_LABELS } from "@/types";

interface RealisationCardProps {
  realisation: Realisation;
  className?: string;
}

export default function RealisationCard({ realisation, className }: RealisationCardProps) {
  return (
    <Link
      href={`/realisations/${realisation.slug}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-neutral-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={realisation.featuredImage}
          alt={realisation.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold">
            {REALISATION_CATEGORY_LABELS[realisation.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-3 group-hover:text-primary-900 transition-colors line-clamp-2">
          {realisation.title}
        </h3>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-neutral-500 mb-4">
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>{realisation.volume}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>{realisation.distance}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{realisation.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{realisation.team}</span>
          </div>
        </div>

        {/* Trajet */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 border-t border-neutral-100 pt-3">
          <span className="font-medium text-neutral-700">{realisation.origin}</span>
          <svg className="h-3 w-3 text-accent-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-neutral-700">{realisation.destination}</span>
        </div>
      </div>
    </Link>
  );
}
