"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal data."
        backgroundImage="/img/PRO-1.jpg"
      />

      <section className="py-20 px-6 md:px-12 lg:px-16 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg text-gray-600 max-w-none">
            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              1. Introduction
            </h2>
            <p className="mb-8 leading-relaxed">
              At Omoro, we are committed to protecting your privacy and ensuring
              that your personal data is handled in a safe and responsible
              manner. This Privacy Policy outlines how we collect, use, and
              protect your information when you visit our website.
            </p>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              2. Information We Collect
            </h2>
            <p className="mb-4 leading-relaxed">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>
                Personal identification information (Name, email address, phone
                number, etc.) when you fill out a contact form.
              </li>
              <li>
                Project details and requirements you provide for customized
                lighting solutions.
              </li>
              <li>
                Usage data such as your IP address, browser type, and pages
                visited on our site.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              3. How We Use Your Information
            </h2>
            <p className="mb-4 leading-relaxed">
              We use the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>To provide and maintain our services.</li>
              <li>To notify you about changes to our project updates.</li>
              <li>
                To provide customer support and respond to your enquiries via
                WhatsApp or email.
              </li>
              <li>
                To gather analysis or valuable information so that we can
                improve our lighting solutions.
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              4. Data Protection
            </h2>
            <p className="mb-8 leading-relaxed">
              We implement a variety of security measures to maintain the safety
              of your personal information. Your data is stored behind secured
              networks and is only accessible by a limited number of persons who
              have special access rights to such systems.
            </p>

            <h2 className="text-3xl font-bold text-[#121212] mb-6">
              5. Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at enquiries@omoro.in.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
