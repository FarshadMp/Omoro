"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="bg-[#F5F5F5] py-20 lg:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-normal text-[#121212] mb-16"
        >
          Founder
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[350px] shrink-0"
          >
            <div
              className="relative w-full aspect-[4/5] bg-gray-300 overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
              }}
            >
              <Image
                src="/img/founder.jpg" // Placeholder path, user will need to replace
                alt="Ansar Mukkam"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                {/* Fallback if image missing */}
                <span>Founder Image</span>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16"
          >
            {/* Name & Title */}
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-semibold text-[#121212] mb-2">
                Ansar Mukkam
              </h3>
              <p className="text-gray-500 mb-6">Founder & CEO</p>
              <a
                href="#"
                className="inline-block text-gray-400 hover:text-[#0077b5] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            {/* Bio */}
            <div className="lg:w-2/3 text-gray-600 leading-relaxed text-lg space-y-6">
              <p>
                Ansar Mukkam is a visionary leader with a deep passion for
                innovation in the field of sustainable technology and
                architectural lighting. With years of experience driving
                transformative projects, he founded Omoro to redefine how we
                interact with light and space.
              </p>
              <p>
                His commitment to eco-friendly solutions and cutting-edge design
                has positioned Omoro at the forefront of the industry. Ansar
                believes in building businesses that not only deliver
                exceptional value but also leave a positive impact on the
                environment and communities they serve.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
