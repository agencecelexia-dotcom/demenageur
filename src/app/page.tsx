import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ServicesOverview from "@/components/sections/ServicesOverview";
import ProcessSection from "@/components/sections/ProcessSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import { clientConfig } from "@/config/client.config";

export const metadata: Metadata = {
  title: clientConfig.META_TITLE,
  description: clientConfig.META_DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <ProcessSection />
      <FeaturedProjects />
      <StatsSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <FAQSection />
      <CTASection />
    </>
  );
}
