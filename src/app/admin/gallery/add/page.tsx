"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2, CheckCircle2, X } from "lucide-react";
import { getItem, setItem } from "@/utils/storage";

export default function AddGalleryImagePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    alt: "",
    category: "Interior",
    image: "",
  });
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      setImage(base64);
      setFormData((prev) => ({ ...prev, image: base64 }));
    }
  };

  const removeImage = () => {
    setImage("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const categories = [
    { value: "Interior", label: "Interior" },
    { value: "Exterior", label: "Exterior" },
    { value: "Commercial", label: "Commercial" },
    { value: "Residential", label: "Residential" },
    { value: "Office", label: "Office" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create new gallery item
    const newImage = {
      id: Date.now(),
      src: image || "/img/fallback.jpg",
      ...formData,
    };

    try {
      const existing = await getItem<any[]>("local_gallery");
      const gallery = existing || [];
      gallery.unshift(newImage);
      await setItem("local_gallery", gallery);

      // Also update full list if it exists to keep everything in sync
      const fullList = await getItem<any[]>("gallery_full_list");
      if (fullList) {
        fullList.unshift(newImage);
        await setItem("gallery_full_list", fullList);
      }

      console.log("Gallery Image Data Saved:", newImage);
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push("/admin/gallery");
      }, 1000);
    } catch (error) {
      console.error("Failed to save gallery image", error);
      setLoading(false);
    }
  };

  return (
    <div className="pb-12">
      <div className="mb-8">
        <Link
          href="/admin/gallery"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Gallery
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Image</h1>
        <p className="text-gray-500 mt-2">
          Upload a new image to your portfolio gallery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Upload
              </label>
              {image ? (
                <div className="relative h-64 w-full rounded-xl overflow-hidden border border-gray-200 group">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="w-full h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-50/50 hover:border-[#04AFE2]/50 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#04AFE2]" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description / Alt Text
                </label>
                <input
                  type="text"
                  name="alt"
                  required
                  value={formData.alt}
                  onChange={handleChange}
                  placeholder="e.g. Modern Office Lighting"
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#04AFE2] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#039bc9] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#04AFE2]/20"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Uploading...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={20} /> Uploaded
                </>
              ) : (
                "Upload Image"
              )}
            </button>
            <Link
              href="/admin/gallery"
              className="px-6 py-3 rounded-xl font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
