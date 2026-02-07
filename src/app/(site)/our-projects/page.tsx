"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Image from "next/image";
import { projects as initialProjects } from "@/data/projects";
import {
  ArrowRight,
  Layers,
  Armchair,
  Home,
  Factory,
  Trees,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getItem } from "@/utils/storage";

export default function OurProjectsPage() {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", label: "All", icon: Layers },
    {
      id: "Residential",
      label: "Residential",
      icon: Home,
    },
    {
      id: "Commercial",
      label: "Commercial",
      icon: Armchair,
    },
    { id: "Industrial", label: "Industrial", icon: Factory },
    { id: "Outdoor", label: "Outdoor", icon: Trees },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project: any) => project.category === activeCategory);

  useEffect(() => {
    const loadData = async () => {
      // Check for full override list first
      const fullList = await getItem<any[]>("projects_full_list");
      if (fullList) {
        setProjects(fullList);
        return;
      }

      const localProjects = await getItem<any[]>("local_projects");
      if (localProjects) {
        setProjects([...localProjects, ...initialProjects]);
      }
    };
    loadData();
  }, []);
  return (
    <main className="min-h-screen bg-white">
      <Header forceDark={false} />

      <PageHero
        title="Our Projects"
        subtitle="Exploring our showcase of premium lighting installations across various sectors."
        backgroundImage="/img/pro_ban.png"
        mobileBackgroundImage="/img/pro_ban_mob.png"
      />

      <section className="py-20 lg:py-22 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Filter Categories */}
          <div className="flex flex-wrap md:flex-nowrap gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col bg-[#FAFAFA] transition-shadow duration-300"
              >
                <Link
                  href={`/our-projects/${project.slug}`}
                  className="flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>

                  <div className="flex flex-col gap-10 p-6">
                    <h3 className="text-2xl font-medium text-[#121212] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-black group-hover:text-[#04AFE2] transition-colors">
                      <span className="text-sm font-medium">More Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
