"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Check } from "lucide-react";

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

export interface CaptchaHandle {
  reset: () => void;
}

const Captcha = forwardRef<CaptchaHandle, CaptchaProps>(
  ({ onValidate }, ref) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setIsChecked(false);
        setIsVerifying(false);
        onValidate(false);
      },
    }));

    const handleCheck = () => {
      if (isChecked || isVerifying) return; // Prevent unchecking or double-clicking while verifying

      setIsVerifying(true);

      // Simulate network verification delay
      setTimeout(() => {
        setIsVerifying(false);
        setIsChecked(true);
        onValidate(true);
      }, 1000);
    };

    return (
      <div className="space-y-2 select-none">
        <label className="text-sm font-medium text-gray-700 block">
          Security Check <span className="text-red-500">*</span>
        </label>
        <div className="w-[300px] h-[74px] bg-[#f9f9f9] border border-[#d3d3d3] rounded-[3px] shadow-[0_0_4px_1px_rgba(0,0,0,0.08)] flex items-center justify-between px-3 pr-2">
          {/* Left: Checkbox & Label */}
          <div className="flex items-center gap-3">
            <div
              onClick={handleCheck}
              className={`
                w-[28px] h-[28px] bg-white border-2 rounded-[2px] cursor-pointer flex items-center justify-center transition-all duration-200
                ${isChecked ? "border-transparent" : "border-[#c1c1c1] hover:border-[#b2b2b2]"}
              `}
            >
              {isVerifying ? (
                <div className="w-4 h-4 rounded-full border-2 border-[#4285F4] border-t-transparent animate-spin" />
              ) : isChecked ? (
                <Check
                  className="w-[20px] h-[20px] text-[#009b55]"
                  strokeWidth={4}
                />
              ) : null}
            </div>
            <span className="text-[#282828] font-normal text-[14px] font-sans">
              I&apos;m not a robot
            </span>
          </div>

          {/* Right: Logo & Links */}
          <div className="flex flex-col items-center justify-center mr-1">
            <div className="mb-1 opacity-70">
              {/* Simulated reCAPTCHA logo using explicit SVG for better resemblance */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C16 3 9 3 6 8C6 8 16 5 21 11L24 8C24 8 18 2 16 3Z"
                  fill="#4285F4"
                />
                <path
                  d="M6 8C6 8 2 13 3 20L6 19C6 19 3 14 7 10L6 8Z"
                  fill="#4285F4"
                />
                <path
                  d="M24 8L21 11C21 11 25.5 16 23 22H27C27 22 31 13 24 8Z"
                  fill="#BDBDBD"
                />
                <path
                  d="M23 22C23 22 17 28 10 24L7 27C7 27 16 33 27 22H23Z"
                  fill="#BDBDBD"
                />
                <path
                  d="M3 20C3 20 5 28 14 27V23C14 23 7 24 6 19L3 20Z"
                  fill="#4285F4"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center leading-none">
              <span className="text-[10px] text-[#555555] opacity-70 mb-[2px]">
                reCAPTCHA
              </span>
              <div className="text-[8px] text-[#555555] opacity-70 flex gap-1">
                <a href="#" className="hover:underline">
                  Privacy
                </a>
                <span>-</span>
                <a href="#" className="hover:underline">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

Captcha.displayName = "Captcha";

export default Captcha;
