import type { Metadata } from "next";
import FadeUp from "@/components/animations/FadeUp";
import RealisationGallery from "@/components/features/RealisationGallery";

export const metadata: Metadata = {
  title: "Nos Réalisations",
  description:
    "Découvrez les études de cas de nos déménagements : résidentiel, entreprise, international. Plus de 4 800 déménagements réalisés avec succès.",
};

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary-900 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent-400 mb-4">
              Études de cas
            </p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Nos Réalisations
            </h1>
            <p className="max-w-2xl mx-auto text-neutral-300">
              Découvrez une sélection de nos déménagements les plus marquants — de l&apos;appartement
              haussmannien au transfert intercontinental, chaque mission est une histoire à part entière.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RealisationGallery />
        </div>
      </section>
    </>
  );
}
