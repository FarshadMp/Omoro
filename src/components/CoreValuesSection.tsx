"use client";

import React from "react";
import { motion } from "framer-motion";

const values = [
  {
    id: 1,
    number: "01",
    title: "Professionalism",
    description:
      "Our entire team brings a consistent level of professionalism to each project. We strive to be the best in our field and use every opportunity to reach toward that goal.",
  },
  {
    id: 2,
    number: "02",
    title: "Quality",
    description:
      "Only the best products are suitable for our customers. We source components from leading names in the market and make them available to discerning buyers.",
  },
  {
    id: 3,
    number: "03",
    title: "Progress",
    description:
      "The status quo is never good enough at Omoro. We strive to continue to grow and progress with each project – learning from our experiences and expanding our capabilities.",
  },
];

export default function CoreValuesSection() {
  return (
    <section className="bg-white py-20 lg:py-22">
      <div className="px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-normal text-[#121212] mb-6"
          >
            Our Core <span className="text-gray-400">Values</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Excellence is at the heart of everything we do, and it is supported
            by these three core values.
          </motion.p>
        </div>

        <div className="border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 md:p-12"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500 mb-8">
                  {value.number}
                </div>
                <h3 className="text-2xl md:text-3xl font-normal text-[#121212] mb-6">
                  {value.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
