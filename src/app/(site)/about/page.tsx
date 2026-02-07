import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import TimelineSection from "@/components/TimelineSection";
import CtaSection from "@/components/CtaSection";

import CoreValuesSection from "@/components/CoreValuesSection";
import FounderSection from "@/components/FounderSection";

export const metadata: Metadata = {
  title: "About | Omoro Lighting Future",
  description:
    "Learn about Omoro's mission to redefine the future of outdoor adventure through innovation and sustainable design.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header forceDark={false} />
      <PageHero
        title="About Omoro"
        subtitle="Redefining the future of outdoor adventure through sustainable innovation and cutting-edge design."
        backgroundImage="/img/ab_ban.png"
        mobileBackgroundImage="/img/ab_ban_mob.png"
      />
      <AboutSection />
      <FounderSection />
      <StatsSection />
      <TimelineSection />
      <CoreValuesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
