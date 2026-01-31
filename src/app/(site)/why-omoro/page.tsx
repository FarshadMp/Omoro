import React from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import WhyOmoroSection from "@/components/WhyOmoroSection";

export default function WhyOmoroPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        title="Why Choose Omoro"
        subtitle="Discover the advantages of partnering with us."
      />
      <WhyOmoroSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
