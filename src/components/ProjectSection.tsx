"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import Image from "next/image";

import { projects as initialProjects } from "@/data/projects";
import Link from "next/link";
import { getItem } from "@/utils/storage";

export default function ProjectSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    const loadData = async () => {
      // Check for full override list first
      const fullList = await getItem<any[]>("projects_full_list");
      if (fullList) {
        setProjects(fullList);
        return;
      }

      // Fallback merge
      const localProjects = await getItem<any[]>("local_projects");
      if (localProjects) {
        setProjects([...localProjects, ...initialProjects]);
      }
    };
    loadData();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      // Calculate approximately which item is center-ish or active
      // Using a simple logic: scrollLeft / (cardWidth + gap)
      // Card width is responsive, so approximating by scroll ratio
      const itemWidth =
        scrollContainerRef.current.children[0]?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(0, index), projects.length - 1));
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        scrollContainerRef.current.children[0]?.clientWidth || 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="bg-white pb-20 lg:pb-28 overflow-hidden">
      <div className="flex flex-col items-center w-full">
        {/* Header Section - Container Constrained */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 md:px-12 lg:px-16 text-center mb-10 md:mb-16 max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal tracking-tight text-[#121212] leading-[1.1] mb-8">
            Smarter Systems.
            <br />
            Smoother Journeys.
          </h2>
          <div className="inline-flex items-center justify-center px-6 py-2 bg-gray-100 rounded-full">
            <span className="text-sm font-medium text-gray-900">
              Our Projects
            </span>
          </div>
        </motion.div>

        {/* Carousel Section - Full Width */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-6 md:px-12 lg:px-16"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative shrink-0 w-[85vw] md:w-[400px] h-[450px] md:h-[500px] rounded-2xl overflow-hidden snap-center group cursor-pointer"
              >
                <Link href={`/our-projects/${project.slug}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-sm font-semibold tracking-wide uppercase opacity-90">
                        {project.location}
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <h3 className="text-[22px] font-medium leading-tight max-w-[80%]">
                        {project.title}
                      </h3>
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#04AFE2] transition-colors duration-300">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls - Matching Reference */}
          <div className="px-6 md:px-12 lg:px-16 mt-2 md:mt-8 flex items-center gap-6">
            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Next project"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-black scale-125 ring-2 ring-black/20"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
