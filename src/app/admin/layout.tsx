"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderKanban,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0; SameSite=Strict";
    router.push("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      name: "Gallery",
      href: "/admin/gallery",
      icon: ImageIcon,
    },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: Menu, // Reuse Menu or import MessageSquare if available, but Menu is already imported. I'll check imports.
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-primary-dark">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        className={`fixed left-0 top-0 z-40 h-screen bg-primary-dark text-white shadow-xl transition-all duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen
            ? "translate-x-0 w-[280px]"
            : "-translate-x-full w-[280px] md:w-[80px]"
        } overflow-hidden`}
      >
        <div className="p-6 flex items-center justify-between h-20 border-b border-gray-800">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center p-2"
              >
                <Image
                  src="/img/logo.svg"
                  alt="OMORO"
                  width={120}
                  height={40}
                  className="h-8 w-auto brightness-0 invert"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto hidden md:block"
              >
                <Image
                  src="/img/O.svg"
                  alt="OMORO"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isSubPath =
              pathname.startsWith(item.href) && item.href !== "/admin";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  window.innerWidth < 768 && setIsSidebarOpen(false)
                }
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive || isSubPath
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 ${!isSidebarOpen && "md:mx-auto"}`}
                />
                <span
                  className={`font-medium whitespace-nowrap transition-opacity duration-200 ${
                    !isSidebarOpen ? "md:opacity-0 md:hidden" : "opacity-100"
                  }`}
                >
                  {item.name}
                </span>
                {(isActive || isSubPath) && !isSidebarOpen && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 ${
              !isSidebarOpen && "md:justify-center"
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span
              className={`font-medium whitespace-nowrap transition-opacity duration-200 ${
                !isSidebarOpen ? "md:opacity-0 md:hidden" : "opacity-100"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </motion.aside>

      {/* Toggle Button (Mobile Only - Simplified) */}
      <div className="fixed top-5 left-4 z-50 md:hidden">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-white rounded-full shadow-lg text-gray-800"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out min-h-screen ${
          isSidebarOpen ? "md:ml-[280px]" : "md:ml-[80px]"
        }`}
      >
        <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <Menu size={20} />
            </button>
            {/* Offset logic for mobile since button is fixed left */}
            <h1 className="text-xl font-semibold capitalize text-gray-800 ml-12 md:ml-0">
              {pathname.split("/").pop() === "admin"
                ? "Dashboard"
                : pathname.split("/").pop()?.replace(/-/g, " ")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold cursor-pointer">
              A
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
