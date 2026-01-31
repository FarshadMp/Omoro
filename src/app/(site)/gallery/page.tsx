import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Gallery | Omoro",
  description:
    "Explore our collection of innovative lighting projects and designs. See how Omoro transforms spaces with light.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        title="Our Gallery"
        subtitle="Visualizing perfection in every beam of light."
        backgroundImage="/img/PRO-1.jpg"
      />

      <GalleryGrid />
      <CtaSection />
      <Footer />
    </main>
  );
}
