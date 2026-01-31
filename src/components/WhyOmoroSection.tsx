"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Lightbulb, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Globe,
    title: "Global Presence",
    description:
      "With a footprint spanning over 60 countries, we understand diverse market needs and deliver localized solutions with global standards.",
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Innovative Solutions",
    description:
      "We pioneer the future of lighting with smart, energy-efficient technologies that transform spaces and enhance experiences.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Our rigorous quality control ensures that every product meets the highest international standards for durability and performance.",
  },
  {
    id: 4,
    icon: Users,
    title: "Customer Centric",
    description:
      "We prioritize our partnerships, offering dedicated support and tailored services to ensure your project's success from start to finish.",
  },
];

export default function WhyOmoroSection() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-normal text-[#121212] mb-6"
          >
            Why Choose <span className="text-[#04AFE2]">Omoro</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl leading-relaxed"
          >
            We combine expertise, innovation, and a commitment to excellence to
            light up the world.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#04AFE2]/10 flex items-center justify-center text-[#04AFE2] mb-6">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-medium text-[#121212] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
