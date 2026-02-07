"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects as staticProjects } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Tag,
  CheckCircle2,
  User,
} from "lucide-react";
import { getItem } from "@/utils/storage";
import ProductImageSlider from "@/components/ProductImageSlider";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectSlug = params?.projectSlug as string;
  const [project, setProject] = useState<any>(null);
  const [prevProject, setPrevProject] = useState<any>(null);
  const [nextProject, setNextProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectSlug) return;

    const loadData = async () => {
      let allProjects = [...staticProjects];

      // Check for full override list first
      const fullList = await getItem<any[]>("projects_full_list");
      if (fullList) {
        allProjects = fullList;
      } else {
        // Fallback to local additions
        const localProjects = await getItem<any[]>("local_projects");
        if (localProjects) {
          allProjects = [...localProjects, ...staticProjects];
        }
      }

      const index = allProjects.findIndex((p) => p.slug === projectSlug);

      if (index !== -1) {
        setProject(allProjects[index]);
        setPrevProject(index > 0 ? allProjects[index - 1] : null);
        setNextProject(
          index < allProjects.length - 1 ? allProjects[index + 1] : null,
        );
      } else {
        setProject(null);
      }
      setLoading(false);
    };
    loadData();
  }, [projectSlug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header forceDark={true} />
        <div className="pt-40 pb-20 px-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-white">
        <Header forceDark={true} />
        <div className="pt-40 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link
            href="/our-projects"
            className="text-[#04AFE2] font-medium hover:underline"
          >
            Back to All Projects
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header forceDark={true} />

      {/* Top Image Slider Section */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-16 lg:pt-40">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/our-projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Our Projects
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Image Slider - 75% */}
            <div className="w-full lg:w-[75%]">
              <ProductImageSlider
                images={project.images || [project.image]}
                title={project.title}
              />
            </div>

            {/* Content Sidebar - 25% */}
            <div className="w-full lg:w-[25%] lg:sticky lg:top-32">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#04AFE2]/10 text-[#04AFE2] rounded-full text-xs font-bold uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#121212] mb-4 leading-tight">
                {project.title}
              </h1>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="space-y-4 pt-6 border-t border-gray-100">
                {project.client && (
                  <div className="flex items-center justify-between lg:block lg:space-y-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-1">
                      <User className="w-4 h-4" /> Client
                    </span>
                    <span className="text-[#121212] font-semibold text-sm">
                      {project.client}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between lg:block lg:space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4" /> Year
                  </span>
                  <span className="text-[#121212] font-semibold text-sm">
                    2024
                  </span>
                </div>

                <div className="flex items-center justify-between lg:block lg:space-y-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-1">
                    <Tag className="w-4 h-4" /> Type
                  </span>
                  <span className="text-[#121212] font-semibold text-sm">
                    {project.category} Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gray-50 px-6 md:px-12 lg:px-16">
        <div className="">
          <div className="bg-white rounded-[1rem] md:rounded-[2rem] p-6 md:p-12 border border-gray-200">
            <h2 className="text-xl md:text-3xl font-bold text-[#121212] mb-5 md:mb-6">
              Project Overview
            </h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-6 text-base">
                This project was a comprehensive lighting redesign aimed at
                creating a harmonious balance between aesthetics and efficiency.
                Our team focused on implementing the latest LED technologies
                while ensuring the lighting complemented the architectural
                intent.
              </p>
              <p className="mb-10 text-base">
                We utilized a combination of ambient, task, and accent lighting
                to create layers of dimension within the space. The result is a
                transformative experience that enhances the user&apos;s journey
                while maintaining a sustainable footprint.
              </p>

              <h3 className="text-xl font-bold text-[#121212] mb-6">
                Key Achievements
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  "40% reduction in energy consumption",
                  "Integrated smart control systems",
                  "Enhanced architectural features",
                  "Optimized light distribution",
                  "Improved occupant well-being",
                  "Sustainable material usage",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#04AFE2]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="py-12 bg-white px-6 md:px-12 lg:px-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {prevProject ? (
            <Link
              href={`/our-projects/${prevProject.slug}`}
              className="group flex flex-col items-start gap-1 text-left"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-[#04AFE2] transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
                Previous
              </span>
              <span className="text-lg md:text-xl font-bold text-[#121212] group-hover:text-[#04AFE2] transition-colors line-clamp-1 max-w-[200px] md:max-w-xs">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/our-projects/${nextProject.slug}`}
              className="group flex flex-col items-end gap-1 text-right"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 group-hover:text-[#04AFE2] transition-colors">
                Next{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-lg md:text-xl font-bold text-[#121212] group-hover:text-[#04AFE2] transition-colors line-clamp-1 max-w-[200px] md:max-w-xs">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <CtaSection />
      <Footer />
    </main>
  );
}
