"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Zap, ShieldCheck, Award } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Lightbulb,
    value: "500+",
    label: "Innovative Designs",
  },
  {
    id: 2,
    icon: Zap,
    value: "70%",
    label: "Energy Savings",
  },
  {
    id: 3,
    icon: ShieldCheck,
    value: "5 Yrs",
    label: "Quality Warranty",
  },
  {
    id: 4,
    icon: Award,
    value: "10k+",
    label: "Happy Customers",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-white pt-20 lg:pt-28 pb-20 lg:pb-28">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group h-[300px] min-w-[300px] md:min-w-0 snap-center shrink-0"
            >
              {/* Card Container with Chamfer effect using SVG filter or clip-path */}
              {/* Approach: Nested div with clip-path for border simulation */}
              <div
                className="absolute inset-0 bg-gray-200 transition-colors duration-300 group-hover:bg-[#04AFE2]"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
                }}
              />
              <div
                className="absolute inset-[1px] bg-white flex flex-col justify-between p-8"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 39px), calc(100% - 39px) 100%, 0 100%)",
                }}
              >
                {/* Icon */}
                <div className="w-12 h-12">
                  <stat.icon
                    strokeWidth={1.5}
                    className="w-full h-full text-[#04AFE2]"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-5xl md:text-6xl font-normal text-[#121212] tracking-tight mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-lg font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
