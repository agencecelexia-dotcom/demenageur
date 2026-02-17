import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "TransLog Pro | Déménageur Professionnel Paris & International",
  description:
    "Déménageur professionnel à Paris depuis 2007. Résidentiel, entreprise, international, garde-meuble. Assurance tous risques incluse. Devis gratuit sous 24h.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <FeaturedProjects />
      <StatsSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
