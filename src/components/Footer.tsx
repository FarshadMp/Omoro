"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row mb-20">
          {/* Left Column Group */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-12 lg:pr-12">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  { name: "About", href: "/about" },
                  { name: "All Products", href: "/products" },
                  {
                    name: "Customized Lighting",
                    href: "/customized-products-request",
                  },
                  { name: "Gallery", href: "/gallery" },
                  { name: "Our Projects", href: "/our-projects" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-[#121212] text-sm hover:text-[#04AFE2] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Contact Us
              </h3>
              <div className="flex text-sm flex-col gap-4 text-[#121212]">
                <a
                  href="tel:+919544061145"
                  className="hover:text-[#04AFE2] transition-colors"
                >
                  +91 9544061145
                </a>
                <a
                  href="mailto:enquiries@omoro.in"
                  className="hover:text-[#04AFE2] transition-colors"
                >
                  enquiries@omoro.in
                </a>
              </div>

              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 mt-12">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/omoro.lighting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#04AFE2] hover:border-[#04AFE2] hover:text-white transition-all text-gray-600"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#04AFE2] hover:border-[#04AFE2] hover:text-white transition-all text-gray-600"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#04AFE2] hover:border-[#04AFE2] hover:text-white transition-all text-gray-600"
                >
                  <Youtube size={18} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-[#04AFE2] hover:border-[#04AFE2] hover:text-white transition-all text-gray-600"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-[1px] bg-gray-200 mx-12"></div>

          {/* Right Column Group */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 lg:mt-0">
            {/* Mukkam Branch */}
            <div className="flex flex-col gap-12">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                  Mukkam Branch
                </h3>
                <div className="flex flex-col gap-4 text-[#121212] text-sm">
                  <p className="leading-relaxed">
                    Areekode Road, Mukkam,
                    <br />
                    Kozhikode, Kerala 673602
                  </p>
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+919544061145"
                      className="hover:text-[#04AFE2] transition-colors"
                    >
                      +91 9544061145
                    </a>
                    <a
                      href="tel:+912111299200"
                      className="hover:text-[#04AFE2] transition-colors"
                    >
                      +91 2111 299 200
                    </a>
                  </div>
                  <a
                    href="mailto:enquiries@omoro.in"
                    className="hover:text-[#04AFE2] transition-colors"
                  >
                    enquiries@omoro.in
                  </a>
                </div>
              </div>
            </div>

            {/* Karamoola Branch */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Karamoola Branch
              </h3>
              <div className="flex flex-col gap-4 text-[#121212] text-sm">
                <p className="leading-relaxed">
                  Night Light, Mukkam - Koodaranji Rd,
                  <br />
                  Kumaranallur, Kerala 673602
                </p>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919544061145"
                    className="hover:text-[#04AFE2] transition-colors"
                  >
                    +91 9544061145
                  </a>
                  <a
                    href="tel:+919123456789"
                    className="hover:text-[#04AFE2] transition-colors"
                  >
                    +91 9123456789
                  </a>
                </div>
                <a
                  href="mailto:office.karamoola@omoro.in"
                  className="hover:text-[#04AFE2] transition-colors"
                >
                  office.karamoola@omoro.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>Copyright 2026, Omoro.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="hover:text-[#121212] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="hover:text-[#121212] transition-colors"
            >
              Terms of Use
            </Link>
          </div>
          <p className="mt-4 md:mt-0">
            Website by{" "}
            <a
              href="https://farshad.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#121212] transition-colors"
            >
              Farshad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
