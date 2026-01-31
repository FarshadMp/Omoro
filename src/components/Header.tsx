"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ forceDark = false }: { forceDark?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine visibility based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold -> Hide
        setIsVisible(false);
      } else {
        // Scrolling up or at top -> Show
        setIsVisible(true);
      }

      // Determine background style
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const textColorClass =
    isScrolled || forceDark ? "text-[#121212]" : "text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`relative z-50 flex items-center px-6 md:px-16 py-5 transition-colors duration-500 ${isScrolled || forceDark ? "bg-white" : "bg-transparent"} ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="flex items-center">
          <Link href="/" className="relative h-10 w-[150px]">
            {/* Light Logo (visible when NOT scrolled and NOT forced dark) */}
            <Image
              src="/img/logo.svg"
              alt="Omoro Logo"
              fill
              className={`object-contain transition-opacity duration-500 ${
                isScrolled || forceDark ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            {/* Dark Logo (visible when scrolled OR forced dark) */}
            <Image
              src="/img/logo-dark.svg"
              alt="Omoro Logo Dark"
              fill
              className={`object-contain transition-opacity duration-500 absolute inset-0 ${
                isScrolled || forceDark ? "opacity-100" : "opacity-0"
              }`}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:flex items-center gap-8 md:gap-10 text-[15px] font-normal transition-colors duration-500 ml-auto ${textColorClass}`}
        >
          <Link
            href="/about"
            className={`flex items-center py-4 transition-colors duration-500 hover:text-[#04AFE2]`}
          >
            About
          </Link>
          <Link
            href="/why-omoro"
            className={`flex items-center py-4 transition-colors duration-500 hover:text-[#04AFE2]`}
          >
            Why Omoro
          </Link>

          <div className="relative group h-full flex items-center">
            <button
              className={`flex items-center gap-1 transition-colors duration-500 hover:text-[#04AFE2] focus:outline-none py-4`}
            >
              Products
              <ChevronDown className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
              <div className="py-2">
                <Link
                  href="/products"
                  className="block px-6 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50 hover:text-[#04AFE2] transition-colors border-b border-gray-100"
                >
                  ALL PRODUCTS
                </Link>
                <Link
                  href="/products/category/indoor-lighting"
                  className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#04AFE2] transition-colors"
                >
                  INDOOR LIGHTING
                </Link>
                <Link
                  href="/products/category/outdoor-lighting"
                  className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#04AFE2] transition-colors"
                >
                  OUTDOOR LIGHTING
                </Link>
                <Link
                  href="/products/category/industrial-lighting"
                  className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#04AFE2] transition-colors"
                >
                  INDUSTRIAL LIGHTING
                </Link>
                <Link
                  href="/products/category/architectural-lighting"
                  className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#04AFE2] transition-colors"
                >
                  ARCHITECTURAL LIGHTING
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/our-projects"
            className={`flex items-center py-4 transition-colors duration-500 hover:text-[#04AFE2]`}
          >
            Our Projects
          </Link>

          <Link
            href="/customized-products-request"
            className={`flex items-center py-4 transition-colors duration-500 hover:text-[#04AFE2]`}
          >
            Customized Lighting
          </Link>
          <Link
            href="/gallery"
            className={`flex items-center py-4 transition-colors duration-500 hover:text-[#04AFE2]`}
          >
            Gallery
          </Link>

          <div className="flex items-center gap-4 group">
            <Link
              href="/contact"
              className={`flex items-center py-4 transition-colors duration-500 group-hover:text-[#04AFE2]`}
            >
              Contact
            </Link>
            {/* Desktop Action Button */}
            <div className="hidden md:block">
              <Link href="#" className="inline-block">
                <motion.div
                  className="flex items-center justify-center w-8 h-8 bg-[#04AFE2] text-white transition-colors duration-300 group-hover:bg-[#1CB39D]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </div>
        </nav>
        <button
          className="md:hidden ml-auto p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X
              className={`w-8 h-8 ${isScrolled || forceDark || isMobileMenuOpen ? "text-gray-900" : "text-white"}`}
            />
          ) : (
            <div
              className={`flex flex-col gap-[6px] w-8 items-end ${isScrolled || forceDark ? "text-gray-900" : "text-white"}`}
            >
              <span className="w-full h-[2px] bg-current rounded-full"></span>
              <span className="w-[60%] h-[2px] bg-current rounded-full"></span>
              <span className="w-full h-[2px] bg-current rounded-full"></span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-dvh h-screen w-screen bg-gradient-to-br from-[#04AFE2] to-[#1CB39D] z-[60] md:hidden flex flex-col"
          >
            {/* Top Bar: Close Button */}
            <div className="flex items-center justify-end px-6 py-4 border-b border-white/20">
              <button
                className="p-2 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Middle: Navigation Links */}
            <nav className="flex flex-col gap-6 px-8 mt-12 overflow-y-auto flex-grow">
              <Link
                href="#"
                className="text-2xl font-medium text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/why-omoro"
                className="text-2xl font-medium text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Why Omoro
              </Link>
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-medium text-white/50">
                  Products
                </span>
                <Link
                  href="/products"
                  className="text-xl font-bold text-white pl-4 border-l-2 border-white/20 hover:border-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Products
                </Link>
                <Link
                  href="/products/category/indoor-lighting"
                  className="text-xl font-medium text-white pl-4 border-l-2 border-white/20 hover:border-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Indoor Lighting
                </Link>
                <Link
                  href="/products/category/outdoor-lighting"
                  className="text-xl font-medium text-white pl-4 border-l-2 border-white/20 hover:border-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Outdoor Lighting
                </Link>
                <Link
                  href="/products/category/industrial-lighting"
                  className="text-xl font-medium text-white pl-4 border-l-2 border-white/20 hover:border-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Industrial Lighting
                </Link>
                <Link
                  href="/products/category/architectural-lighting"
                  className="text-xl font-medium text-white pl-4 border-l-2 border-white/20 hover:border-white transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Architectural Lighting
                </Link>
              </div>
              <Link
                href="/customized-products-request"
                className="text-2xl font-medium text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Customized Lighting
              </Link>
              <Link
                href="/gallery"
                className="text-2xl font-medium text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/our-projects"
                className="text-2xl font-medium text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Projects
              </Link>
              <Link
                href="/contact"
                className="text-2xl font-medium text-white transition-opacity duration-300 hover:opacity-80"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            {/* Bottom: Socials and Copyright */}
            <div className="mb-10 px-8 py-8 border-t border-white/20 bg-black/10">
              <div className="text-center text-white/80 text-sm font-medium">
                © 2026, Omoro. All rights reserved.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
