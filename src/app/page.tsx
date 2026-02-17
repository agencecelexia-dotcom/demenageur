import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Transports Boulocher | Transporteur Routier de Fret — Le Havre & Normandie",
  description:
    "Transporteur routier de fret depuis Le Havre depuis 1999. Transport interurbain, logistique, affrètement et transport européen. Devis sous 2h.",
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
