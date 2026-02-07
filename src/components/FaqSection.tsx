"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is Omoro Lighting?",
    answer:
      "Omoro Lighting is a trusted lighting showroom and solution provider offering premium LED and decorative lighting products for homes, offices, and commercial spaces. From stylish designs to energy-saving solutions, we help you light up every space perfectly.",
  },
  {
    id: 2,
    question: "How does Omoro Lighting work?",
    answer:
      "Our process is simple: you visit our showroom or contact us, share your lighting requirement, and our team suggests the best products based on your space, budget, and design preferences. We also support selection, consultation, and delivery for a smooth experience.",
  },
  {
    id: 3,
    question: "How are you different from other lighting shops?",
    answer:
      "Unlike regular lighting stores, Omoro Lighting provides expert guidance, premium collections, and genuine branded products. We focus on quality, modern designs, and customer satisfaction, ensuring you get the right lighting solution without confusion.",
  },
  {
    id: 4,
    question: "What products does Omoro Lighting offer?",
    answer:
      "Omoro Lighting offers a wide range of products including LED bulbs, panel lights, tube lights, chandeliers, pendant lights, wall lights, ceiling lights, outdoor lights, street lights, and decorative lighting solutions. We also provide modern lighting options for both residential and commercial projects.",
  },
  {
    id: 5,
    question: "How much do your products cost?",
    answer:
      "Our pricing depends on the product type, design, and brand. We provide lighting solutions for every budget—from affordable LED options to premium decorative lights. Contact us or visit our showroom for the latest pricing and offers.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 lg:py-22">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
          {/* Header Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <span className="text-sm font-bold tracking-widest text-[#04AFE2] uppercase mb-2 md:mb-6 block">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-normal text-[#121212] leading-[1.1]">
              Frequently
              <br />
              asked questions.
            </h2>
          </motion.div>

          {/* Accordion Column */}
          <div className="lg:w-2/3">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-gray-200 last:border-0"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span
                      className={`text-xl md:text-2xl font-medium transition-colors duration-300 ${
                        activeIndex === index
                          ? "text-[#04AFE2]"
                          : "text-[#121212]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      className={`flex items-center justify-center w-8 h-8 shrink-0 rounded-full border transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-[#04AFE2] border-[#04AFE2] text-white rotate-180"
                          : "border-gray-300 text-gray-500 group-hover:border-[#04AFE2] group-hover:text-[#04AFE2]"
                      }`}
                    >
                      {activeIndex === index ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-gray-600 text-lg leading-relaxed max-w-2xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
