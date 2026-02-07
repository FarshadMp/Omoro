"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div className="absolute inset-0 w-full h-full md:hidden">
          <Image
            src="/img/cta_ban_mob.png"
            alt="CTA Background Mobile"
            fill
            className="object-cover"
          />
        </div>
        {/* Desktop Background */}
        <div className="absolute inset-0 w-full h-full hidden md:block">
          <Image
            src="/img/cta_ban.png" // Using an existing project image as placeholder/background
            alt="CTA Background"
            fill
            className="object-cover"
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#000]/60" />
      </div>

      <div className="px-6 md:px-12 lg:px-16 relative z-10 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-[48px] font-normal tracking-tight mb-8 leading-[1.1]">
            Unlock Your Project’s Potential
          </h2>
          <p className="text-[15px] font-normal text-white max-w-2xl mb-12 leading-relaxed">
            Share your project details with a timeline, and we will return a
            customised programme, cost and ROI model within a week.
          </p>

          <a
            href="tel:+919947073112"
            className="flex items-stretch group cursor-pointer w-fit mx-auto"
          >
            <div className="bg-primary group-hover:bg-secondary text-white px-4 md:px-6 py-2 md:py-3 text-base font-normal tracking-wide transition-colors duration-300 flex items-center">
              Book A Discovery Call
            </div>
            <div className="bg-primary group-hover:bg-secondary text-white px-3 md:px-5 py-2 md:py-3 flex items-center justify-center border-l border-white/20 transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
