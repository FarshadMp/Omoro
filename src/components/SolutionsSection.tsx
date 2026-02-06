"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/img/PRO-1.jpg",
    label: "Utility Pods - Kitchen Pods",
    heading: "From Bathroom Pods To Kitchen Units, All Factory-Built.",
    description:
      "Whether it's a standalone pod or a full volumetric structure, our solutions are based on pre-engineered steel modules that are durable, fire-safe & compliant with global standards.",
  },
  {
    id: 2,
    image: "/img/PRO-2.jpg",
    label: "Bathroom Pods",
    heading: "Precision Engineered Bathroom Pods.",
    description:
      "Our bathroom pods differ from traditional construction by offering consistent quality, rapid installation, and superior finish, ensuring every detail meets rigorous standards.",
  },
  {
    id: 3,
    image: "/img/PRO-3.jpg",
    label: "Modular Units",
    heading: "Flexible Modular Units for Any Application.",
    description:
      "Adaptable, scalable, and sustainable. Our modular units are designed to meet the diverse needs of modern infrastructure with minimal environmental impact.",
  },
];

export default function SolutionsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="bg-white pb-20 lg:pb-22 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          {/* Left Column: Content */}
          <div className="flex-1 max-w-xl">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-bold tracking-widest text-[#04AFE2] uppercase mb-6 block">
                SOLUTIONS
              </span>
              <h2 className="text-[32px] md:text-[55px] font-normal text-[#121212] leading-[1.1] mb-6 md:mb-8">
                {slides[currentIndex].heading}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10">
                {slides[currentIndex].description}
              </p>
            </motion.div>

            {/* Composite Button (Matching About Section) */}
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <div className="flex items-stretch group cursor-pointer w-fit">
                <div className="bg-[#121212] group-hover:bg-[#04AFE2] text-white px-6 md:px-8 py-3 md:py-4 text-base font-normal tracking-wide transition-colors duration-300 flex items-center">
                  Our Solutions
                </div>
                <div className="bg-[#121212] group-hover:bg-[#04AFE2] text-white px-4 md:px-5 py-3 md:py-4 flex items-center justify-center border-l border-white/20 transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors group"
              >
                <ArrowRight className="w-5 h-5 text-[#04AFE2] group-hover:text-[#0388B0] transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Column: Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] w-full">
              {/* Image Container with Chamfer */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0 100%)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].label}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay Label */}
                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-xl font-medium">
                        {slides[currentIndex].label}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
