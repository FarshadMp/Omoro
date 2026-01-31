"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import CtaSection from "@/components/CtaSection";
import Image from "next/image";
import { projects as initialProjects } from "@/data/projects";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getItem } from "@/utils/storage";

export default function OurProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);

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
        backgroundImage="/img/PRO-1.jpg"
      />

      <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col"
              >
                <Link href={`/our-projects/${project.slug}`}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-gray-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                    <div className="absolute bottom-6 right-6">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black group-hover:bg-[#04AFE2] group-hover:text-white transition-all duration-300 shadow-lg">
                        <Plus className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] font-bold tracking-widest text-[#04AFE2] uppercase">
                        {project.location}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span className="text-[12px] font-medium text-gray-500 uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#121212] group-hover:text-[#04AFE2] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed max-w-xl">
                      {project.description}
                    </p>
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
