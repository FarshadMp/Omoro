"use client";

import React from "react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import { use } from "react";

// Helper to format category slug to title
const formatTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap params using React.use() or await (in async component)
  // Since this is a client component, we use the `use` hook or async wrapping.
  // Actually, for client components in Next.js 15+, params is a Promise.
  // But wait, "use client" implies we need to handle the promise or receive it as resolved if possible?
  // In Next.js 15, `params` is async. Let's strictly follow async pattern or use `use`.
  // To avoid complexity with `use` (experimental/new), let's make it an async component (server component) if possible?
  // But I need state for filters. So it must be a Client Component.
  // In Client Component, we can use `use(params)`.

  const { slug } = use(params);
  const categoryTitle = formatTitle(slug);

  // Products filtered by category only
  const categoryProducts = products.filter(
    (product) => product.category === slug,
  );

  return (
    <main className="min-h-screen bg-white">
      <Header forceDark={true} />

      <div className="pt-32 pb-20 lg:pb-28 px-6 md:px-12 lg:px-16">
        <div className="mb-2 md:mb-8 flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <span>/</span>
          <span className="text-black font-medium">{categoryTitle}</span>
        </div>

        <div className="mb-8 text-center md:text-left">
          <h1 className="text-1xl md:text-4xl font-bold text-[#121212] uppercase tracking-tight">
            {categoryTitle}
          </h1>
        </div>

        {/* Product Grid */}
        <div className="w-full">
          {categoryProducts.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <p className="text-lg">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {categoryProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-2 bg-gray-100 border border-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-1 text-left">
                    <h3 className="text-xl md:text-1xl font-semibold text-[#121212] mb-1 group-hover:text-gray-700 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {product.brand}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <CtaSection />
      <Footer />
    </main>
  );
}
