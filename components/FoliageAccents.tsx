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

  // Size mapping
  const sizeClasses = {
    sm: "w-20 h-20 sm:w-28 sm:h-28",
    md: "w-28 h-28 sm:w-44 sm:h-44 md:w-56 md:h-56",
    lg: "w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72",
    xl: "w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96",
  };

  // Position positioning classes
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
      className={`absolute pointer-events-none z-10 select-none ${positionClasses[position] || "top-0 right-0"} ${sizeClasses[size]} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm opacity-85 hover:opacity-100 transition-opacity duration-500"
      >
        {/* Primary Leaf 1 - Deep Forest Green */}
        <path
          d="M190 0C130 30 90 110 50 180C120 120 170 70 190 0Z"
          fill="#4a7051"
          opacity="0.85"
        />
        {/* Primary Leaf 2 - Dark Olive Green */}
        <path
          d="M210 20C150 50 110 130 70 200C140 140 190 90 210 20Z"
          fill="#36543b"
          opacity="0.65"
        />
        {/* Accent Leaf 3 - Sage Light Green */}
        <path
          d="M170 -10C120 20 80 80 40 140C100 90 150 40 170 -10Z"
          fill="#6a9b72"
          opacity="0.75"
        />
        {/* Small Detail Leaf 4 */}
        <path
          d="M195 45C160 65 130 120 100 165C150 125 180 85 195 45Z"
          fill="#537b5b"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
