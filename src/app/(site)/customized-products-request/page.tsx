import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import CustomizedProductForm from "@/components/CustomizedProductForm";

export const metadata: Metadata = {
  title: "Request Customized Products | Omoro",
  description:
    "Ask for customized light designs. Submit your requirements and we will get back to you.",
};

export default function CustomizedProductsRequestPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        title="Ask For Customized Light"
        subtitle="Any design in mind?"
        backgroundImage="/img/cz_ban.png"
        mobileBackgroundImage="/img/cz_ban_mob.png"
      />
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <CustomizedProductForm />
        </div>
      </div>
      <CtaSection />
      <Footer />
    </main>
  );
}
