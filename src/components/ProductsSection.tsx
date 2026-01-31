"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products as initialProducts } from "@/data/products";
import { getItem } from "@/utils/storage";

export default function ProductsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const loadData = async () => {
      // Check for full override list first
      const fullList = await getItem<any[]>("products_full_list");
      if (fullList) {
        setProducts(fullList);
        return;
      }

      // Fallback merge
      const localProducts = await getItem<any[]>("local_products");
      if (localProducts) {
        setProducts([...localProducts, ...initialProducts]);
      }
    };
    loadData();
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft } = scrollContainerRef.current;
      const firstChild = scrollContainerRef.current.children[0];
      if (!firstChild) return;

      const itemWidth = firstChild.clientWidth + 24; // Width + Gap
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(Math.max(0, index), products.length - 1));
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0];
      if (!firstChild) return;

      const itemWidth = firstChild.clientWidth + 24; // Width + Gap
      const targetIndex =
        direction === "right"
          ? Math.min(activeIndex + 1, products.length - 1)
          : Math.max(activeIndex - 1, 0);

      scrollContainerRef.current.scrollTo({
        left: targetIndex * itemWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section id="products" className="bg-white overflow-hidden">
      <div className="flex flex-col items-center w-full">
        {/* ... Header ... */}
        <motion.div
          // ... existing header code ...
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="container mx-auto px-6 md:px-12 lg:px-16 text-center mb-10 md:mb-16 max-w-4xl"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal tracking-tight text-[#121212] leading-[1.1] mb-8">
            Smarter Systems.
            <br />
            Smoother Journeys.
          </h2>
          <div className="inline-flex items-center justify-center px-6 py-2 bg-gray-100 rounded-full">
            <span className="text-sm font-medium text-gray-900">
              Our Products
            </span>
          </div>
        </motion.div>

        {/* Carousel Section - Full Width */}
        <div className="relative w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-6 md:px-12 lg:px-16"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative shrink-0 w-[85vw] md:w-[300px] h-auto rounded-none snap-center group cursor-pointer"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="block w-full h-full relative"
                >
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-2 bg-gray-100 border border-gray-100">
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
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="px-6 md:px-12 lg:px-16 mt-2 md:mt-8 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Previous product"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="group w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary transition-colors duration-300 shadow-none hover:shadow-lg hover:shadow-primary/20"
                aria-label="Next product"
              >
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {products.map((_, index) => {
                // Sliding window logic: show 5 dots max centered on active
                const maxDots = 5;
                let start = Math.max(0, activeIndex - 2);
                const end = Math.min(products.length, start + maxDots);

                // Adjust if near end
                if (end - start < maxDots) {
                  start = Math.max(0, end - maxDots);
                }

                if (index < start || index >= end) return null;

                return (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-black scale-125 ring-2 ring-black/20"
                        : "bg-gray-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
