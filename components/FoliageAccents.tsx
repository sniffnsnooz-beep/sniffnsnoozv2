"use client";

import React from "react";

interface FoliageProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "middle-right" | "middle-left";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function FoliageAccents({
  position = "top-right",
  className = "",
  size = "md",
}: FoliageProps) {

  // Prominent sizing mapping for maximum visibility on all devices
  const sizeClasses = {
    sm: "w-24 h-24 sm:w-36 sm:h-36",
    md: "w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64",
    lg: "w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80",
    xl: "w-52 h-52 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px]",
  };

  // Position classes
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0 -scale-x-100",
    "bottom-right": "bottom-0 right-0 -scale-y-100",
    "bottom-left": "bottom-0 left-0 -scale-x-100 -scale-y-100",
    "middle-right": "top-1/2 -translate-y-1/2 right-0",
    "middle-left": "top-1/2 -translate-y-1/2 left-0 -scale-x-100",
  };

  return (
    <div
      className={`absolute pointer-events-none z-20 select-none overflow-hidden ${positionClasses[position] || "top-0 right-0"} ${sizeClasses[size]} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Leaf 1 - Deep Forest Green */}
        <path
          d="M190 0C130 30 90 110 50 180C120 120 170 70 190 0Z"
          fill="#4a7051"
          opacity="0.95"
        />
        {/* Leaf 2 - Rich Dark Olive */}
        <path
          d="M210 20C150 50 110 130 70 200C140 140 190 90 210 20Z"
          fill="#36543b"
          opacity="0.85"
        />
        {/* Leaf 3 - Sage Accent Green */}
        <path
          d="M170 -10C120 20 80 80 40 140C100 90 150 40 170 -10Z"
          fill="#6a9b72"
          opacity="0.9"
        />
        {/* Leaf 4 - Detail Leaf */}
        <path
          d="M195 45C160 65 130 120 100 165C150 125 180 85 195 45Z"
          fill="#537b5b"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}
