"use client";

import React, { useState } from "react";
import { galleryImages as initialImages } from "@/data/gallery";
import Link from "next/link";
import Image from "next/image";
import { Search, Plus, Trash2, Eye, Filter, X } from "lucide-react";
import { getItem, setItem } from "@/utils/storage";

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      // Check for a full override list first
      const fullList = await getItem<any[]>("gallery_full_list");
      if (fullList) {
        setImages(fullList);
        return;
      }

      // Fallback: merge local additions with initial
      const localImages = await getItem<any[]>("local_gallery");
      if (localImages) {
        setImages([...localImages, ...initialImages]);
      }
    };
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      const updatedImages = images.filter((img) => img.id !== id);
      setImages(updatedImages);
      await setItem("gallery_full_list", updatedImages);
    }
  };

  const filteredImages = images.filter(
    (img) =>
      img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
          <p className="text-gray-500 text-sm">Manage your gallery images</p>
        </div>
        <Link
          href="/admin/gallery/add"
          className="flex items-center justify-center gap-2 bg-[#04AFE2] hover:bg-[#039bc9] text-white px-5 py-2.5 rounded-full font-medium transition-colors"
        >
          <Plus size={18} /> Add Image
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search images..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={18} /> <span>Filter</span>
          </button>
        </div>

        {/* Grid View */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] relative">
                {img.src.startsWith("data:") ? (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() => setSelectedImage(img)}
                      className="p-2 bg-white/90 rounded-lg text-gray-700 hover:text-[#04AFE2] transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="p-2 bg-white/90 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3
                  className="font-medium text-gray-900 truncate"
                  title={img.alt}
                >
                  {img.alt}
                </h3>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p>No images found matching &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>

      {/* Admin Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-10 h-10" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedImage.src.startsWith("data:") ? (
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
