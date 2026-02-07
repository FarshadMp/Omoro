"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/img/service/residential.png",
    label: "Residential Lighting",
    heading: "Residential Lighting",
    description:
      "Residential lighting includes indoor and outdoor lighting solutions that enhance your home’s beauty and comfort. It improves visibility while creating a warm and inviting atmosphere. With the right lighting, even simple spaces can feel premium and elegant. From installation to maintenance, Omoro Lighting offers stylish and reliable lighting for every home.",
  },
  {
    id: 2,
    image: "/img/service/commercial.png",
    label: "Commercial Lighting",
    heading: "Commercial Lighting",
    description:
      "Commercial lighting is designed for offices, shops, hospitals, institutions, and other large spaces. It delivers high brightness, long-lasting performance, and energy efficiency for everyday use. These lights improve productivity, comfort, and ambiance in commercial environments. Omoro Lighting provides durable commercial lighting solutions with modern designs and excellent efficiency.",
  },
  {
    id: 3,
    image: "/img/service/wall-fancy.png",
    label: "Wall Fancy",
    heading: "Wall Fancy",
    description:
      "Wall fancy lights are a timeless lighting option that adds style and character to any room. They create a soft glow while enhancing interior décor with a premium touch. Perfect for bedrooms, living areas, and hallways, they bring both elegance and functionality. Omoro Lighting offers modern wall fancy designs to match every interior theme.",
  },
  {
    id: 4,
    image: "/img/service/hanging-fancy.png",
    label: "Hanging Fancy",
    heading: "Hanging Fancy",
    description:
      "Hanging fancy lights are designed to add refined charm and luxury to your interiors. They highlight specific areas like dining tables, kitchens, and living spaces with focused lighting. Available in different shapes and shades, they enhance your home’s décor beautifully. Omoro Lighting provides stylish hanging fancy lights for a sophisticated and modern look.",
  },
  {
    id: 5,
    image: "/img/service/ceiling-fancy.png",
    label: "Ceiling Fancy",
    heading: "Ceiling Fancy",
    description:
      "Decorative ceiling fancy lights are one of the easiest ways to transform your room instantly. They brighten dark corners and create a balanced glow across the space. With elegant designs, ceiling lights enhance both lighting and interior appeal. Omoro Lighting offers premium ceiling fancy lights that bring beauty, comfort, and brightness to every room.",
  },
  {
    id: 6,
    image: "/img/service/profile-lights.png",
    label: "Profile Lights",
    heading: "Profile Lights",
    description:
      "Profile lights are a modern architectural lighting solution that creates uniform and seamless illumination. They combine aluminum profile channels, LED strip lights, and power supplies into one smart lighting concept. These lights are ideal for ceilings, walls, and decorative interiors for a clean finish. Omoro Lighting provides high-quality profile lighting for contemporary spaces.",
  },
  {
    id: 7,
    image: "/img/service/light-consultancy.png",
    label: "Light Consultancy",
    heading: "Light Consultancy",
    description:
      "Omoro Lighting offers professional light consultancy to help you choose the best lighting for your space. Our experts provide personalized recommendations based on design, brightness, and energy efficiency needs. Whether for home, office, or outdoor projects, we ensure the perfect lighting plan. From concept to execution, we make your lighting journey smooth and stress-free.",
  },
  {
    id: 8,
    image: "/img/service/strip-lights.png",
    label: "Strip Lights",
    heading: "Strip Lights",
    description:
      "Strip lights are flexible LED lighting boards that can be installed almost anywhere for powerful illumination. They are perfect for ceilings, cabinets, mirrors, and decorative areas to create modern lighting effects. Available in multiple colors and brightness levels, they enhance both beauty and functionality. Omoro Lighting offers premium LED strip lights for stylish and energy-saving interiors.",
  },
  {
    id: 9,
    image: "/img/service/foot-lights.png",
    label: "Foot Lights",
    heading: "Foot Lights",
    description:
      "Foot lights are installed near the floor level to provide subtle and decorative lighting. They are commonly used for staircases, walkways, corridors, and stage-style lighting effects. These lights improve safety by enhancing visibility while adding a premium ambiance. Omoro Lighting provides modern foot light solutions that combine elegance, durability, and energy efficiency.",
  },
  {
    id: 10,
    image: "/img/service/garden-bollards.png",
    label: "Garden Bollards",
    heading: "Garden Bollards",
    description:
      "Garden bollards are outdoor lights designed to illuminate pathways, entrances, and landscapes beautifully. They improve safety while adding a stylish and welcoming look to your outdoor space. Perfect for villas, gardens, and commercial landscapes, bollards create a premium outdoor ambiance. Omoro Lighting offers high-quality garden bollards that combine security, elegance, and durability.",
  },
  {
    id: 11,
    image: "/img/service/mirror-lights.png",
    label: "Mirror Lights",
    heading: "Mirror Lights",
    description:
      "Mirror lights, also known as illuminated mirror lights, enhance the look and functionality of your mirror space. They provide clear and shadow-free lighting, making them ideal for bathrooms and dressing areas. These lights add elegance and improve visibility for daily routines. Omoro Lighting offers stylish mirror lights that bring brightness, beauty, and a modern touch to your interiors.",
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
                SERVICES
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
              <a
                href="https://wa.me/919544061145"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-stretch group cursor-pointer w-fit"
              >
                <div className="bg-[#121212] group-hover:bg-[#04AFE2] text-white px-6 md:px-8 py-3 md:py-4 text-base font-normal tracking-wide transition-colors duration-300 flex items-center">
                  Our Services
                </div>
                <div className="bg-[#121212] group-hover:bg-[#04AFE2] text-white px-4 md:px-5 py-3 md:py-4 flex items-center justify-center border-l border-white/20 transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </a>
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
            <div className="relative aspect-[3/4] md:aspect-[4/4] w-full">
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
