"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delicate stagger for line-by-line feel
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-80 relative">
          {/* Left Column (Metadata/Tag) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="shrink-0"
          >
            <div className="flex items-center gap-3 mt-0 md:mt-4">
              <div className="w-3 h-3 bg-secondary rounded-sm"></div>
              <span className="text-sm font-semibold tracking-widest text-[#121212] uppercase font-mono">
                About us
              </span>
            </div>
          </motion.div>

          {/* Right Column (Content) */}
          <motion.div
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight mb-8 text-[#121212]"
            >
              Combining smart lighting, energy efficiency, and design
              intelligence into a{" "}
              <span className="text-gray-300">future-ready ecosystem.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base text-gray-600 leading-relaxed max-w-2xl mb-8 md:mb-12"
            >
              Our platform enables precise, dynamic control of lighting
              environments and pathways, generating high-fidelity atmospheres
              that, combined with advanced AI, unlock systematic exploration of
              previously inaccessible design spaces. At its core are our
              ultra-efficient, in-house smart led datasets, which provide a rich
              foundation for architectural identification and therapeutic
              discovery.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-stretch group cursor-pointer w-fit"
            >
              <div className="bg-[#121212] group-hover:bg-primary text-white px-4 md:px-6 py-3 md:py-3 text-sm font-normal tracking-wide transition-colors duration-300 flex items-center">
                Omoro Platform
              </div>
              <div className="bg-[#121212] group-hover:bg-primary text-white px-3 md:px-5 py-3 md:py-3 flex items-center justify-center border-l border-white/20 transition-colors duration-300">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
