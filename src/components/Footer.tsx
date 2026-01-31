"use client";

import React from "react";
import Link from "next/link";

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
                  { name: "Why Omoro", href: "/why-omoro" },
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
                <p>+44 (0) 20 7183 3710</p>
                <a
                  href="mailto:enquiries.uk@omoro.com"
                  className="hover:text-[#04AFE2] transition-colors"
                >
                  enquiries.uk@omoro.com
                </a>
              </div>
            </div>
          </div>

          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block w-[1px] bg-gray-200 mx-12"></div>

          {/* Right Column Group */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 lg:mt-0">
            {/* Head Office & Mauritius */}
            <div className="flex flex-col gap-12">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                  Head Office
                </h3>
                <div className="flex flex-col gap-4 text-[#121212] text-sm">
                  <p className="leading-relaxed">
                    A-82, MIDC Industrial Estate, Indapur,
                    <br />
                    Dist Pune 413132, Maharashtra, India
                  </p>
                  <p>+91 2111 299 200</p>
                  <a
                    href="mailto:enquiries.india@omoro.in"
                    className="hover:text-[#04AFE2] transition-colors"
                  >
                    enquiries.india@omoro.in
                  </a>
                </div>
              </div>
            </div>

            {/* India Factory */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                India Factory
              </h3>
              <div className="flex flex-col gap-4 text-[#121212] text-sm">
                <p className="leading-relaxed">
                  A-82, MIDC Industrial Estate, Indapur,
                  <br />
                  Dist Pune 413132, Maharashtra, India
                </p>
                <p>+91 2111 299 200</p>
                <a
                  href="mailto:enquiries.india@omoro.in"
                  className="hover:text-[#04AFE2] transition-colors"
                >
                  enquiries.india@omoro.in
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
          <p className="mt-4 md:mt-0">Website by Farshad</p>
        </div>
      </div>
    </footer>
  );
}
