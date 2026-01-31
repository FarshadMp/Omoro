"use client";

import React, { useState } from "react";
import { Upload, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import Captcha, { CaptchaHandle } from "./Captcha"; // Adjust path if needed

import { saveEnquiry } from "@/services/db";

// ... existing imports

export default function CustomizedProductForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    customizationInfo: "",
    file: null as File | null,
  });

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      alert("Please enter the correct security code.");
      return;
    }

    // Save to DB
    try {
      await saveEnquiry({
        type: "custom_product",
        name: `${formData.firstName} ${formData.lastName}`,
        phone: `${formData.countryCode} ${formData.phone}`,
        email: formData.email,
        message: `${formData.customizationInfo} (File: ${formData.file ? formData.file.name : "None"})`,
      });

      // Send Email via API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Customized Product Request",
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          message: `
Customization Info: ${formData.customizationInfo}
File Attached: ${formData.file ? formData.file.name : "None"}`,
        }),
      });

      if (!response.ok) {
        console.error("Email sending failed");
      }

      alert("Customization Request Submitted Successfully!");
      // Optional: Reset form here
    } catch (error) {
      console.error("Failed to save enquiry", error);
      alert("Failed to send request.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-white border border-gray-200 rounded-sm"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:border-black transition-colors"
                title="First Name"
              />
              <p className="text-xs text-gray-400 mt-1">First Name</p>
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:border-black transition-colors"
                title="Last Name"
              />
              <p className="text-xs text-gray-400 mt-1">Last Name</p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:border-black transition-colors"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <div className="flex border border-gray-300 rounded-sm overflow-hidden">
            <div className="bg-gray-50 px-3 flex items-center border-r border-gray-300 min-w-[100px] justify-between cursor-pointer">
              {/* Simple mock flag/code for now as per image */}
              <div className="flex items-center gap-2">
                {/* Indian Flag Emoji or similar graphic */}
                <span role="img" aria-label="India">
                  🇮🇳
                </span>
                <span className="text-gray-700 text-sm">
                  {formData.countryCode}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="flex-1 p-3 text-gray-700 focus:outline-none"
              placeholder=""
            />
          </div>
        </div>

        {/* Customization Info */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Information About Required Customization
          </label>
          <textarea
            name="customizationInfo"
            value={formData.customizationInfo}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:border-black transition-colors resize-y"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            File Upload
          </label>
          <div className="relative border border-dashed border-gray-300 rounded-sm p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span className="text-gray-500 text-sm">
              {formData.file ? formData.file.name : "Choose File"}
            </span>
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="bg-gray-100 p-2 rounded-full">
              <Upload className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Captcha */}
        <div>
          <Captcha onValidate={setIsCaptchaValid} />
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-black text-white px-12 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
}
