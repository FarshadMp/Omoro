"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        title="Terms of Use"
        subtitle="The rules and regulations for using the Omoro website."
        backgroundImage="/img/PRO-2.jpg"
      />

      <section className="py-20 px-6 md:px-12 lg:px-16 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-gray-600 max-w-none">
            <h2 className="text-3xl font-bold text-[#121212] mb-6">1. Terms</h2>
            <p className="mb-8 leading-relaxed">
              By accessing this website, you are agreeing to be bound by these
              Terms of Use, all applicable laws and regulations, and agree that
              you are responsible for compliance with any applicable local laws.
            </p>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              2. Use License
            </h2>
            <p className="mb-8 leading-relaxed">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Omoro&apos;s website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title.
            </p>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              3. Disclaimer
            </h2>
            <p className="mb-8 leading-relaxed">
              The materials on Omoro&apos;s website are provided on an &apos;as
              is&apos; basis. Omoro makes no warranties, expressed or implied,
              and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </p>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              4. Limitations
            </h2>
            <p className="mb-8 leading-relaxed">
              In no event shall Omoro or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on Omoro&apos;s website.
            </p>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              5. Governing Law
            </h2>
            <p className="leading-relaxed">
              Any claim relating to Omoro&apos;s website shall be governed by
              the laws of the State of Maharashtra, India, without regard to its
              conflict of law provisions.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
