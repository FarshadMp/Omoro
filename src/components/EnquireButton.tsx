"use client";

import React, { useState } from "react";
import { X, Send, User, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveEnquiry } from "@/services/db";

interface EnquireButtonProps {
  productName: string;
  modelNumber: string;
  mrp: string;
  className?: string;
  children?: React.ReactNode;
}

import Captcha, { CaptchaHandle } from "./Captcha";

// ... existing imports

export default function EnquireButton({
  productName,
  modelNumber,
  mrp,
  className,
  children,
}: EnquireButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const captchaRef = React.useRef<CaptchaHandle>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    place: "",
  });

  // Reset captcha when modal opens
  React.useEffect(() => {
    if (isOpen) {
      captchaRef.current?.reset();
      setIsCaptchaValid(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      alert("Please enter the correct security code.");
      return;
    }

    // Save to Admin DB
    try {
      await saveEnquiry({
        type: "product",
        name: formData.name,
        phone: formData.phone,
        location: formData.place,
        productName: productName,
        modelNumber: modelNumber,
        message: "Interested in product",
      });

      // Send Email via API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `Product Enquiry: ${productName}`,
          name: formData.name,
          email: "Not Provided", // Simple form doesn't have email IIRC, checked code: it has name, phone, place.
          phone: formData.phone,
          message: `
Product: ${productName}
Model: ${modelNumber}
Location: ${formData.place}
Message: Interested in product`,
        }),
      });

      if (!response.ok) {
        console.error("Email sending failed");
      }

      alert("Enquiry Sent Successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save enquiry", error);
      alert("Failed to send enquiry.");
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {children || "Enquire Now"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Enquire about Product
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">
                    Place / Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      placeholder="Enter your location"
                      value={formData.place}
                      onChange={(e) =>
                        setFormData({ ...formData, place: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all text-gray-900"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Captcha ref={captchaRef} onValidate={setIsCaptchaValid} />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
