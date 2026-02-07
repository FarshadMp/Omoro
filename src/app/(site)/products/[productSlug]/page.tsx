"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products as staticProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import ProductImageSlider from "@/components/ProductImageSlider";
import EnquireButton from "@/components/EnquireButton";
import { getItem } from "@/utils/storage";
import {
  ArrowLeft,
  Check,
  Tag,
  Lightbulb,
  Maximize,
  Zap,
  Palette,
  Layers,
  ShieldCheck,
  Box,
} from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const productSlug = params?.productSlug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productSlug) return;

    const loadData = async () => {
      let allProducts = [...staticProducts];

      // Check for full override list first
      const fullList = await getItem<any[]>("products_full_list");
      if (fullList) {
        allProducts = fullList;
      } else {
        // Fallback to local additions
        const localProducts = await getItem<any[]>("local_products");
        if (localProducts) {
          allProducts = [...localProducts, ...staticProducts];
        }
      }

      const found = allProducts.find((p) => p.slug === productSlug);
      setProduct(found || null);
      setLoading(false);
    };
    loadData();
  }, [productSlug]);

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

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Header forceDark={true} />
        <div className="pt-40 pb-20 px-6 text-center">
          <h1 className="text-3xl font-bold mb-4 text-[#121212]">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We couldn&apos;t find the product you&apos;re looking for. It might
            have been moved or removed.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#121212] text-white rounded-full font-medium hover:bg-black/80 transition-colors"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header forceDark={true} />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          {/* Left Column: Image & Specs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="mb-5">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
            </div>

            {/* Top Header Section */}
            <div className="flex flex-col items-start md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight mb-1">
                  {product.title}
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  {product.brand}
                </p>
              </div>
              <span className="inline-flex items-center justify-center px-2 py-0.5 bg-white text-gray-600 rounded text-[10px] font-medium uppercase tracking-wider border border-gray-300">
                {product.modelNumber.split("-")[0]}
              </span>
            </div>
            {/* Image Slider */}
            <div className="w-full">
              <ProductImageSlider
                images={product.images || [product.image]}
                title={product.title}
              />
            </div>

            {/* Main Details Card */}
            <div className="bg-white rounded-[1rem] p-5 md:p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2 md:mb-6">
                Main Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 md:gap-y-6 gap-x-12">
                <SpecItem
                  icon={<Tag className="w-4 h-4" />}
                  label="Model Number"
                  value={product.modelNumber}
                />
                <SpecItem
                  icon={<Lightbulb className="w-4 h-4" />}
                  label="Lamp Type"
                  value={product.lampType}
                />
                <SpecItem
                  icon={<Maximize className="w-4 h-4" />}
                  label="Total Size"
                  value={product.size}
                />
                <SpecItem
                  icon={<Zap className="w-4 h-4" />}
                  label="Power Rating"
                  value={product.power}
                />
                <SpecItem
                  icon={<Palette className="w-4 h-4" />}
                  label="Body Finish"
                  value={product.bodyColor}
                />
                <SpecItem
                  icon={<Layers className="w-4 h-4" />}
                  label="Material Composition"
                  value={product.material}
                />
                <SpecItem
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="Warranty Period"
                  value={product.warranty}
                />
                <SpecItem
                  icon={<Box className="w-4 h-4" />}
                  label="Stock Status"
                  value="Available"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-3 sticky top-20">
            <div className="bg-white rounded-[1.2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Description & Highlights
              </h3>

              <div className="text-gray-600 leading-relaxed mb-6">
                <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                  {product.description ||
                    `Experience the perfect blend of style and functionality with our ${product.title}. Designed to elevate your space with premium materials and cutting-edge lighting technology.`}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#04AFE2] shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      Premium finish and durable construction
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#04AFE2] shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      Energy efficient lighting technology
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#04AFE2] shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      Easy installation and maintenance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-[#04AFE2] shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      Certified safety standards
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center py-2 mb-4">
                  <span className="text-gray-500 text-sm font-medium">
                    Included Warranty
                  </span>
                  <span className="font-bold text-gray-900">
                    {product.warranty}
                  </span>
                </div>

                <div className="bg-gradient-to-br from-[#04AFE2] to-[#04AFE2] rounded-3xl p-6 text-white text-center">
                  <p className="text-white/90 text-sm font-medium mb-4">
                    Contact us for price details and exclusive offers
                  </p>

                  <EnquireButton
                    productName={product.title}
                    modelNumber={product.modelNumber}
                    mrp={product.mrp}
                    className="w-full py-3 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Contact for Price
                  </EnquireButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 z-50 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900">{product.title}</h4>
            <p className="text-xs text-gray-500">{product.modelNumber}</p>
          </div>
          <EnquireButton
            productName={product.title}
            modelNumber={product.modelNumber}
            mrp={product.mrp}
            className="flex-1 py-3.5 bg-gradient-to-r from-[#04AFE2] to-[#04AFE2] text-white rounded-full font-bold text-sm shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all flex items-center justify-center"
          >
            Contact for Price
          </EnquireButton>
        </div>
      </div>

      <CtaSection />
      <Footer />
    </main>
  );
}

function SpecItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between md:items-start md:flex-row py-3 md:py-0 border-b md:border-b-0 border-gray-100 last:border-0 group">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-[#04AFE2] transition-colors">
            {icon}
          </span>
        )}
        <div>
          <p className="text-gray-400 text-xs md:text-sm mb-0.5">{label}</p>
          <p className="text-gray-900 text-sm md:text-base font-semibold">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
