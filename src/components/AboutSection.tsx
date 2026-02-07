"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function AboutSection({
  isHomePage = false,
}: {
  isHomePage?: boolean;
}) {
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
    <section className="bg-white py-20 lg:py-22 overflow-hidden">
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
              Lighting Spaces. Elevating Lifestyles. Perfect{" "}
              <span className="text-gray-300">Lighting for Every Space.</span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className={`space-y-6 ${isHomePage ? "mb-12" : ""}`}
            >
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                Omoro Lighting is a modern lighting destination created to bring
                premium design and reliable performance into every home and
                commercial space. We focus on delivering lighting that is not
                only functional, but also enhances the beauty and mood of your
                interiors.
              </p>
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                From elegant decorative fixtures to advanced LED solutions, our
                collection is carefully selected to match today’s architectural
                trends and lifestyle needs. Whether it’s a cozy home setup, a
                luxury villa, a showroom, or a corporate space, Omoro Lighting
                provides the right balance of style, brightness, and energy
                efficiency.
              </p>

              {!isHomePage && (
                <>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    We offer a wide range of lighting solutions including wall
                    lights, hanging lights, ceiling lights, profile lights,
                    strip lights, garden lighting, mirror lights, and customized
                    lighting concepts. Every product we provide is chosen with
                    attention to quality, durability, and modern aesthetics.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                    At Omoro Lighting, we believe lighting is an art that
                    transforms spaces. With expert guidance, innovative designs,
                    and customer-focused service, we are committed to creating
                    brighter environments that leave a lasting impression.
                  </p>
                </>
              )}
            </motion.div>

            {isHomePage && (
              <motion.div
                variants={itemVariants}
                className="flex items-stretch group cursor-pointer w-fit"
              >
                <a
                  href="/about"
                  className="flex items-stretch group cursor-pointer w-fit"
                >
                  <div className="bg-[#121212] group-hover:bg-[#04AFE2] text-white px-4 md:px-6 py-3 md:py-3 text-sm font-normal tracking-wide transition-colors duration-300 flex items-center">
                    View More
                  </div>
                  <div className="bg-[#121212] group-hover:bg-[#04AFE2] text-white px-3 md:px-5 py-3 md:py-3 flex items-center justify-center border-l border-white/20 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
