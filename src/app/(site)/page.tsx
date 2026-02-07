import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProjectSection from "@/components/ProjectSection";
import StatsSection from "@/components/StatsSection";
import SolutionsSection from "@/components/SolutionsSection";
import ProductsSection from "@/components/ProductsSection";
import TimelineSection from "@/components/TimelineSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Omoro Lighting Future | Smart & Innovative Lighting Solutions",
  description:
    "Omoro Lighting Future delivers cutting-edge smart lighting solutions, innovative designs, and future-ready illumination technologies. Trusted for quality, efficiency, and modern lighting excellence.",
  keywords: [
    "Omoro Lighting Future",
    "Smart Lighting Solutions",
    "LED Lighting",
    "Architectural Lighting",
    "Energy Efficient Lighting",
    "Future Lighting Technology",
    "Lighting Design",
  ],
  openGraph: {
    title: "Omoro Lighting Future | Smart & Innovative Lighting Solutions",
    description:
      "Omoro Lighting Future delivers cutting-edge smart lighting solutions, innovative designs, and future-ready illumination technologies. Trusted for quality, efficiency, and modern lighting excellence.",
    type: "website",
    locale: "en_US",
    siteName: "Omoro Lighting Future",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <AboutSection isHomePage={true} />
      <ProductsSection />
      <StatsSection />
      <ProjectSection />
      <SolutionsSection />
      <TimelineSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
