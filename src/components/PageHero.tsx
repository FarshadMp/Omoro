"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  mobileBackgroundImage?: string;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage = "/img/PRO-3.jpg", // Default reuse
  mobileBackgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        {mobileBackgroundImage ? (
          <>
            {/* Mobile Background */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center md:hidden opacity-60"
              style={{ backgroundImage: `url(${mobileBackgroundImage})` }}
            />
            {/* Desktop Background */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center hidden md:block opacity-60"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          </>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="w-full px-6 md:px-12 relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[30px] md:text-[40px] font-medium tracking-tight mb-2"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-sm font-normal opacity-90 mx-auto max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
