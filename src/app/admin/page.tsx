"use client";

import React, { useState, useEffect } from "react";
import { products as staticProducts } from "@/data/products";
import { projects as staticProjects } from "@/data/projects";
import { galleryImages as staticGalleryImages } from "@/data/gallery";
import {
  Package,
  FolderKanban,
  ArrowUpRight,
  Plus,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { getItem } from "@/utils/storage";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(staticProducts.length);
  const [projectCount, setProjectCount] = useState(staticProjects.length);
  const [galleryCount, setGalleryCount] = useState(staticGalleryImages.length);

  useEffect(() => {
    const loadCounts = async () => {
      // Load Products Count
      const productFullList = await getItem<any[]>("products_full_list");
      if (productFullList) {
        setProductCount(productFullList.length);
      } else {
        const localProducts = await getItem<any[]>("local_products");
        if (localProducts) {
          setProductCount(staticProducts.length + localProducts.length);
        }
      }

      // Load Projects Count
      const projectFullList = await getItem<any[]>("projects_full_list");
      if (projectFullList) {
        setProjectCount(projectFullList.length);
      } else {
        const localProjects = await getItem<any[]>("local_projects");
        if (localProjects) {
          setProjectCount(staticProjects.length + localProjects.length);
        }
      }

      // Load Gallery Count
      const galleryFullList = await getItem<any[]>("gallery_full_list");
      if (galleryFullList) {
        setGalleryCount(galleryFullList.length);
      } else {
        const localGallery = await getItem<any[]>("local_gallery");
        if (localGallery) {
          setGalleryCount(staticGalleryImages.length + localGallery.length);
        }
      }
    };
    loadCounts();
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: productCount,
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/admin/products",
    },
    {
      label: "Total Projects",
      value: projectCount,
      icon: FolderKanban,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      href: "/admin/projects",
    },
    {
      label: "Gallery Images",
      value: galleryCount,
      icon: ImageIcon,
      color: "text-primary",
      bgColor: "bg-primary/10",
      href: "/admin/gallery",
    },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Overview
        </h2>
        <p className="text-gray-500 mt-2">
          Welcome back to the Omoro Admin Dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-gray-500 font-medium mb-1">{stat.label}</p>
                <h3 className="text-4xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}>
                <stat.icon size={24} className="currentColor" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between relative z-10">
              <Link
                href={stat.href}
                className="text-sm font-medium text-gray-600 hover:text-primary flex items-center gap-1 transition-colors"
              >
                View all <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Decorative Background */}
            <div
              className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full group-hover:scale-110 transition-transform duration-500 ${stat.bgColor} opacity-50`}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Manage Products */}
        <div className="bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Products</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Add new lighting products to the catalog, update details, or
              manage inventory.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/admin/products/add"
                className="flex items-center gap-2 bg-primary hover:bg-sky-500 text-white px-5 py-3 rounded-full font-medium transition-colors w-fit"
              >
                <Plus size={18} /> Add New
              </Link>
              <Link
                href="/admin/products"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full font-medium transition-colors backdrop-blur-sm w-fit"
              >
                View List
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Package size={180} />
          </div>
        </div>

        {/* Manage Projects */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Projects</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Showcase new projects, update locations, and manage portfolio
              images.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/admin/projects/add"
                className="flex items-center gap-2 bg-secondary hover:bg-teal-600 text-white px-5 py-3 rounded-full font-medium transition-colors w-fit"
              >
                <Plus size={18} /> Add New
              </Link>
              <Link
                href="/admin/projects"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-3 rounded-full font-medium transition-colors w-fit"
              >
                View List
              </Link>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none text-gray-900">
            <FolderKanban size={200} />
          </div>
        </div>

        {/* Manage Gallery */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Gallery</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Upload high-quality images to your gallery and organize them.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/admin/gallery/add"
                className="flex items-center gap-2 bg-primary hover:bg-sky-500 text-white px-5 py-3 rounded-full font-medium transition-colors w-fit"
              >
                <Plus size={18} /> Add New
              </Link>
              <Link
                href="/admin/gallery"
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-3 rounded-full font-medium transition-colors w-fit"
              >
                View List
              </Link>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none text-gray-900">
            <ImageIcon size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
