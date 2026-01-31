"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What makes Omoro lighting solutions different?",
    answer:
      "Our solutions combine advanced LED technology with sustainable, modular designs. We prioritize energy efficiency and aesthetic flexibility, allowing for seamless integration into any architectural environment.",
  },
  {
    id: 2,
    question: "Do you offer custom lighting designs?",
    answer:
      "Yes, we specialize in bespoke lighting solutions tailored to specific project requirements. Our team works closely with architects and designers to create unique installations.",
  },
  {
    id: 3,
    question: "Are your products energy efficient?",
    answer:
      "Absolutely. Our entire product line is built on high-efficiency LED platforms designed to minimize power consumption while maximizing lumen output and longevity.",
  },
  {
    id: 4,
    question: "What is the warranty period for your products?",
    answer:
      "We offer an industry-leading warranty of 5 years on most of our commercial lighting fixtures, ensuring peace of mind and long-term reliability.",
  },
  {
    id: 5,
    question: "How can I request a quote?",
    answer:
      "You can request a quote by contacting our sales team through the 'Contact' page or by using the inquiry form on specific product pages.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 lg:py-28">
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
