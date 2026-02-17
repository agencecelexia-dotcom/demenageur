import FadeUp from "@/components/animations/FadeUp";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const displayed = testimonials.slice(0, 3);
  return (
    <section className="py-28 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeUp className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent-600 mb-4">
            Témoignages
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight">
            Ce que Disent nos Clients
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayed.map((t, i) => (
            <FadeUp key={t.id} delay={i * 0.1}>
              <div className="h-full flex flex-col bg-white border border-neutral-200 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg
                      key={j}
                      className={`h-4 w-4 ${j < t.rating ? "text-accent-500" : "text-neutral-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="flex-1 text-sm text-neutral-700 leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="border-t border-neutral-100 pt-6">
                  <p className="text-sm font-semibold text-neutral-900">{t.clientName}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{t.location} · {t.projectType}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
