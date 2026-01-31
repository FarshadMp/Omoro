"use client";

import React from "react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { getItem } from "@/utils/storage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";

export default function AllProductsPage() {
  const categoryTitle = "All Products";
  const [allProducts, setAllProducts] = React.useState(products);

  React.useEffect(() => {
    const loadData = async () => {
      // Check for full override list first
      const fullList = await getItem<any[]>("products_full_list");
      if (fullList) {
        setAllProducts(fullList);
        return;
      }

      // Load local products from local storage fallback
      const localProducts = await getItem<any[]>("local_products");
      if (localProducts) {
        setAllProducts([...localProducts, ...products]);
      }
    };
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Header forceDark={true} />

      <div className="pt-32 pb-20 lg:pb-28 px-6 md:px-12 lg:px-16">
        <div className="mb-2 md:mb-8 flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-500 font-medium">{categoryTitle}</span>
        </div>

        <div className="mb-8 text-center md:text-left">
          <h1 className="text-1xl md:text-4xl font-bold text-[#121212] uppercase tracking-tight">
            {categoryTitle}
          </h1>
        </div>

        {/* Product Grid - Full Width */}
        <div className="w-full">
          {allProducts.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <p className="text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {allProducts.map((product) => (
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
