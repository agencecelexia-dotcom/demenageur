import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { realisations } from "@/data/realisations";
import { REALISATION_CATEGORY_LABELS } from "@/types";
import FadeUp from "@/components/animations/FadeUp";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const realisation = realisations.find((r) => r.slug === slug);
  if (!realisation) return {};
  return { title: realisation.title };
}

export default async function RealisationDetailPage({ params }: Props) {
  const { slug } = await params;
  const realisation = realisations.find((r) => r.slug === slug);
  if (!realisation) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={realisation.featuredImage} alt={realisation.title} fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeUp>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold mb-4">
              {REALISATION_CATEGORY_LABELS[realisation.category]}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              {realisation.title}
            </h1>
            <p className="text-neutral-300">{realisation.origin} → {realisation.destination}</p>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-10">
              <FadeUp>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image src={realisation.featuredImage} alt={realisation.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-3">Le défi</h2>
                  <p className="text-neutral-600 leading-relaxed">{realisation.challenge}</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-3">Notre solution</h2>
                  <p className="text-neutral-600 leading-relaxed">{realisation.solution}</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="p-6 rounded-2xl bg-primary-50 border-l-4 border-accent-500">
                  <h2 className="font-heading text-lg font-bold text-primary-900 mb-2">Résultat</h2>
                  <p className="text-neutral-700 leading-relaxed">{realisation.result}</p>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <FadeUp delay={0.1}>
                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <h3 className="font-heading text-lg font-bold text-neutral-900 mb-4">Détails du déménagement</h3>
                  <dl className="space-y-3 text-sm">
                    {[
                      { label: "Client", value: realisation.client },
                      { label: "Départ", value: realisation.origin },
                      { label: "Arrivée", value: realisation.destination },
                      { label: "Volume", value: realisation.volume },
                      { label: "Distance", value: realisation.distance },
                      { label: "Durée", value: realisation.duration },
                      { label: "Équipe", value: realisation.team },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4">
                        <dt className="text-neutral-500 shrink-0">{label}</dt>
                        <dd className="text-neutral-900 font-medium text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="p-6 rounded-2xl bg-accent-50 border border-accent-100">
                  <p className="text-sm font-semibold text-accent-800 mb-3">Un projet similaire ?</p>
                  <Link href="/contact"
                    className="block w-full text-center px-4 py-3 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors text-sm">
                    Demander un devis gratuit
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <div className="py-8 bg-neutral-50 text-center">
        <Link href="/realisations" className="text-sm text-primary-700 hover:text-primary-900 transition-colors">
          ← Retour aux réalisations
        </Link>
      </div>
    </>
  );
}
