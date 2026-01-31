"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    date: "October 29, 2025",
    title: "Intention to Float",
    number: "01",
  },
  {
    id: 2,
    date: "November 5, 2025",
    title: "Price Range Announcement",
    number: "02",
  },
  {
    id: 3,
    date: "November 5-11, 2025",
    title: "Institutional Book-building Period",
    number: "03",
  },
  {
    id: 4,
    date: "November 17, 2025",
    title: "Final Offer Price Announcement",
    number: "04",
  },
  {
    id: 5,
    date: "November 2025",
    title: "Retail Offering Period",
    number: "05",
  },
  {
    id: 6,
    date: "December 2025",
    title: "Allocation & Refund",
    number: "06",
  },
  {
    id: 7,
    date: "December 2025",
    title: "Listing Submission",
    number: "07",
  },
  {
    id: 8,
    date: "December 2025",
    title: "Trading Commences",
    number: "08",
  },
];

export default function TimelineSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Pagination visual "01-08" is static based on design reference for now.

  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Approx card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-[#1a1a1a] py-20 lg:py-28 text-white overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16 flex flex-col h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
            Omoro <span className="text-primary">Timeline.</span>
          </h2>
        </motion.div>

        {/* Horizontal Scroll List */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className={`flex gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-hide border-t border-white/10 border-b border-white/10 ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab"}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {timelineEvents.map((event) => (
              <motion.div
                key={event.id}
                className="relative shrink-0 w-[300px] md:w-[350px] h-[400px] p-8 flex flex-col justify-between border-l border-r border-white/10 -ml-[1px] first:ml-0 snap-start group hover:bg-white/5 transition-colors duration-300 select-none"
              >
                <div>
                  <p className="text-sm text-gray-400 mb-4">{event.date}</p>
                  <h3 className="text-2xl font-normal leading-tight">
                    {event.title}
                  </h3>
                </div>
                <div className="text-6xl font-light text-white/20 group-hover:text-white/40 transition-colors">
                  {event.number}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-end mt-12 gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => scroll("left")}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-8 h-8" strokeWidth={1} />
            </button>
            <span className="text-lg font-light tracking-widest">01—08</span>
            <button
              onClick={() => scroll("right")}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowRight className="w-8 h-8" strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
