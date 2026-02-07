"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Loader2, CheckCircle2, X } from "lucide-react";
import { getItem, setItem } from "@/utils/storage";

export default function EditProductPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    brand: "LEGERO",
    category: "indoor-lighting",
    modelNumber: "",
    mrp: "",
    size: "",
    lampType: "",
    power: "",
    bodyColor: "",
    material: "",
    warranty: "",
    description: "",
  });
  const [images, setImages] = useState<string[]>([]);

  // Use a string ID for comparison since params.id is a string
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      setDataLoading(true);
      try {
        const id = parseInt(params.id);
        setProductId(id);

        // Try to find in full list first
        let allProducts = await getItem<any[]>("products_full_list");
        if (!allProducts) {
          const localProducts = await getItem<any[]>("local_products");
          if (localProducts) {
            allProducts = [...localProducts];
            // Note: we might need to merge with static if not found, but typically
            // the full list or local list handles edits.
            // For now let's assume if it's editable it's in our storage or we load static
            // to support editing static items (which effectively "creates" them in storage)
          } else {
            allProducts = [];
          }

          // If extremely fresh, import static data to find the item
          const { products: initialProducts } = await import("@/data/products");
          if (!allProducts || allProducts.length === 0) {
            allProducts = initialProducts;
          } else {
            // Merge just in case
            allProducts = [...allProducts, ...initialProducts];
            // Remove duplicates by ID if any
            allProducts = Array.from(
              new Map(allProducts.map((item) => [item.id, item])).values(),
            );
          }
        }

        const product = allProducts.find((p: any) => p.id === id);

        if (product) {
          setFormData({
            title: product.title || "",
            brand: product.brand || "",
            category: product.category || "indoor-lighting",
            modelNumber: product.modelNumber || "",
            mrp: product.mrp || "",
            size: product.size || "",
            lampType: product.lampType || "",
            power: product.power || "",
            bodyColor: product.bodyColor || "",
            material: product.material || "",
            warranty: product.warranty || "",
            description: product.description || "",
          });
          // Handle single image or array of images
          if (product.images && Array.isArray(product.images)) {
            setImages(product.images);
          } else if (product.image) {
            setImages([product.image]);
          }
        } else {
          alert("Product not found");
          router.push("/admin/products");
        }
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (params.id) {
      loadProduct();
    }
  }, [params.id, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        newImages.push(base64);
      }

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const categories = [
    { value: "indoor-lighting", label: "Indoor Lighting" },
    { value: "architectural-lighting", label: "Architectural Lighting" },
    { value: "industrial-lighting", label: "Industrial Lighting" },
    { value: "outdoor-lighting", label: "Outdoor Lighting" },
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
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Update product object
    const updatedProduct = {
      id: productId, // Keep original ID
      slug: formData.title.toLowerCase().replace(/ /g, "-"), // Update slug if title changed
      image: images[0] || "/img/fallback.jpg",
      images: images,
      location: "Updated",
      ...formData,
    };

    try {
      // We need to update this in "products_full_list" primarily as that is the source of truth now
      let fullList = await getItem<any[]>("products_full_list");

      // If fullList doesn't exist yet (first time editing a static item effectively), we need to create it from a merge
      if (!fullList) {
        const { products: initialProducts } = await import("@/data/products");
        const localProducts = (await getItem<any[]>("local_products")) || [];
        // Merge and dedupe
        const merged = [...localProducts, ...initialProducts];
        fullList = Array.from(
          new Map(merged.map((item) => [item.id, item])).values(),
        );
      }

      // Find index and update
      const index = fullList.findIndex((p: any) => p.id === productId);
      if (index !== -1) {
        fullList[index] = { ...fullList[index], ...updatedProduct };
      } else {
        // Should normally find it, but if not, maybe push it?
        // For safety, let's push it assuming it was lost or something weird.
        // fullList.push(updatedProduct);
      }

      await setItem("products_full_list", fullList);

      // Also strictly update local_products if it was a local product originally?
      // It's safer to just rely on full_list, but let's update local if found there too to keep them in sync
      const localProducts = await getItem<any[]>("local_products");
      if (localProducts) {
        const localIndex = localProducts.findIndex((p) => p.id === productId);
        if (localIndex !== -1) {
          localProducts[localIndex] = {
            ...localProducts[localIndex],
            ...updatedProduct,
          };
          await setItem("local_products", localProducts);
        }
      }

      console.log("Product Data Updated:", updatedProduct);
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    } catch (error) {
      console.error("Failed to update product", error);
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-[#04AFE2]" size={40} />
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 mt-2">Update product details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Upload */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Product Images
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group"
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <label className="w-full aspect-[3/2] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-50/50 hover:border-[#04AFE2]/50 transition-colors cursor-pointer group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#04AFE2]" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload images
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  SVG, PNG, JPG or GIF (max. 5MB)
                </p>
              </label>
            </div>
          </div>

          {/* Right Column - Form Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-semibold text-gray-900 pb-2 border-b border-gray-100">
                General Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Residential Series"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Model Number
                  </label>
                  <input
                    type="text"
                    name="modelNumber"
                    value={formData.modelNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="font-semibold text-gray-900 pb-2 border-b border-gray-100">
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Total Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Lamp Type
                  </label>
                  <input
                    type="text"
                    name="lampType"
                    value={formData.lampType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Power Rating
                  </label>
                  <input
                    type="text"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Body Finish
                  </label>
                  <input
                    type="text"
                    name="bodyColor"
                    value={formData.bodyColor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Material Composition
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Warranty Period
                  </label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04AFE2]/20 focus:border-[#04AFE2] transition-colors"
                  />
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
                    <Loader2 size={20} className="animate-spin" /> Saving...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 size={20} /> Saved Successfully
                  </>
                ) : (
                  "Update Product"
                )}
              </button>
              <Link
                href="/admin/products"
                className="px-6 py-3 rounded-xl font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
