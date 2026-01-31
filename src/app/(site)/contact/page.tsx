"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { saveEnquiry } from "@/services/db";

// ... existing imports

import Captcha, { CaptchaHandle } from "@/components/Captcha"; // Adjust path as needed

// ... existing imports

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState("general");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const [formData, setFormData] = useState({
    //...
    // IMPORTANT: I need to preserve existing state fields, so I will copy them back or use ...prev
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    message: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      alert("Please enter both the correct security code.");
      return;
    }

    // Save to Admin DB
    try {
      await saveEnquiry({
        type: enquiryType,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        message: formData.message,
      });

      // Send Email via API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `Enquiry: ${enquiryType}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: `
Type: ${enquiryType}
Company: ${formData.company || "N/A"}
Location: ${formData.location || "N/A"}
Message: ${formData.message}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Email sending failed:", errorData);
        alert(`Error: ${errorData.message || "Failed to send email"}`);
        return; // specific return to avoid showing success message
      }

      alert("Enquiry Submitted Successfully! We will contact you soon.");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        location: "",
        message: "",
        consent: false,
      });
      // Optionally reset captcha validation if needed, though usually reset on reload or manual reset
      // We might want to trigger a route refresh or just clear state.
    } catch (error) {
      console.error("Failed to save enquiry", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team for any inquiries or support."
        backgroundImage="/img/PRO-4.jpg"
      />

      {/* Branches Section */}
      <section className="pt-20 lg:pt-28 bg-white px-6 md:px-12 lg:px-16 border-t border-gray-100">
        <div>
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
              OUR BRANCHES
            </span>
            <h2 className="text-[35px] md:text-[50px] font-medium text-[#121212] leading-[1.1] mb-6">
              Where We Operate
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our team operates locally, combining international best practices
              with deep regional expertise. Omoro is equipped to support
              projects worldwide, efficiently and seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                title: "Mukkam Branch",
                image: "/img/mukkam_branch.png",
                address: "OGGI BRAND FACTORY, Mukkam, Kozhikode, Kerala 673602",
                phones: ["+91 9544061145", "+91 2111 299 200"],
                email: "enquiries@omoro.in",
              },
              {
                title: "Karamoola Branch",
                image: "/img/karamoola_branch.png",
                address:
                  "Near Karamoola Junction, Kozhikode District, Kerala 673601",
                phones: ["+91 9544061145", "+91 9123456789"],
                email: "office.karamoola@omoro.in",
              },
            ].map((branch, idx) => (
              <div
                key={idx}
                className="bg-[#F8F8F8] overflow-hidden flex flex-col group transition-all duration-500"
              >
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image
                    src={branch.image}
                    alt={branch.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-medium text-[#121212] mb-2">
                    {branch.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {branch.address}
                  </p>
                  <div className="mt-auto space-y-4">
                    <div className="flex flex-col gap-1">
                      {branch.phones.map((phone, pIdx) => (
                        <a
                          key={pIdx}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <span className="opacity-60">P:</span> {phone}
                        </a>
                      ))}
                    </div>
                    <a
                      href={`mailto:${branch.email}`}
                      className="inline-flex items-center gap-2 text-primary text-sm font-semibold group/link"
                    >
                      <span className="p-2 border border-primary/20 rounded-full group-hover/link:bg-primary group-hover/link:text-white transition-all">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </span>
                      {branch.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pt-10 border-t border-gray-100">
            <div>
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
                GET IN TOUCH
              </span>
              <h2 className="text-[40px] md:text-[50px] font-medium text-[#121212] leading-[1.1] tracking-tight">
                Reach Out To Us
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-gray-600 leading-relaxed">
                We welcome all types of inquiries, whether you&apos;re looking
                to collaborate, discuss a specific project, or explore
                opportunities with Omoro.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  First Name*
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-black"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Last Name*
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-black"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-black"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email*
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-black"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number*
                </label>
                <div className="flex">
                  <div className="w-24 px-4 py-3 border border-r-0 border-gray-200 bg-gray-50 text-gray-500 rounded-l-sm flex items-center justify-between cursor-default">
                    <span>+91</span>
                    <ChevronDown size={14} />
                  </div>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-r-sm focus:outline-none focus:border-primary transition-colors text-black"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Your city or region"
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-primary transition-colors text-black"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Write a message
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  maxLength={150}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-primary transition-colors resize-none text-black"
                />
                <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {formData.message.length}/150
                </span>
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-6">
              <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
                We would like to keep in touch with you. We may send you news,
                reports, marketing updates, sales communications and invitations
                to exclusive events. You can always change your preferences or
                stop at any time.
              </p>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    required
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="peer appearance-none w-5 h-5 border border-gray-300 rounded-sm bg-white checked:bg-primary checked:border-primary transition-all"
                  />
                  <svg
                    className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">
                  I agree with this website&apos;s{" "}
                  <a href="#" className="underline hover:text-primary">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline hover:text-primary">
                    Privacy Notice
                  </a>
                </span>
              </label>
            </div>

            {/* Consent */}
            <div className="space-y-6">
              {/* ... consent checkbox ... */}
              {/* ... */}
            </div>

            {/* Captcha */}
            <div className="max-w-md">
              <Captcha onValidate={setIsCaptchaValid} />
            </div>

            {/* Submit */}
            <div className="pt-4 flex">
              <button
                type="submit"
                className="flex items-stretch group cursor-pointer"
              >
                <div className="bg-primary group-hover:bg-secondary text-white px-10 py-3 font-semibold text-base transition-colors duration-300 flex items-center">
                  Submit
                </div>
                <div className="bg-primary group-hover:bg-secondary text-white px-5 py-3 flex items-center justify-center border-l border-white/20 transition-colors duration-300">
                  <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="w-full h-[450px] bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.2410570613706!2d75.99433397441948!3d11.317083348989836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba641006ad9064d%3A0xf47bf411d3e8e3af!2sOGGI%20BRAND%20FACTORY%20MUKKAM!5e0!3m2!1sen!2sin!4v1769707309073!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Omoro Office Location"
        />
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
