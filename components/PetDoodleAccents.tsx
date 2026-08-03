"use client";

import React from "react";

interface PetDoodleProps {
  variant?: "sitting-dog" | "playful-cat" | "dog-and-cat" | "paw-trail";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "middle-right" | "middle-left";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function PetDoodleAccents({
  variant = "dog-and-cat",
  position = "bottom-right",
  className = "",
  size = "md",
}: PetDoodleProps) {

  const sizeClasses = {
    sm: "w-20 h-20 sm:w-28 sm:h-28",
    md: "w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48",
    lg: "w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64",
    xl: "w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80",
  };

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2 -scale-x-100",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2 -scale-x-100",
    "middle-right": "top-1/2 -translate-y-1/2 right-2",
    "middle-left": "top-1/2 -translate-y-1/2 left-2 -scale-x-100",
  };

  return (
    <div
      className={`absolute pointer-events-none z-0 select-none ${positionClasses[position]} ${sizeClasses[size]} ${className}`}
    >
      {variant === "dog-and-cat" && (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Sitting Dog Silhouette */}
          <path
            d="M50 160 C50 140 60 110 80 95 C75 90 70 80 72 70 C74 60 85 55 95 60 C105 55 116 60 118 70 C120 80 115 90 110 95 C130 110 140 140 140 160 Z"
            fill="#5b3a26"
            opacity="0.85"
          />
          {/* Dog Ear Left */}
          <path d="M72 70 C60 75 55 90 65 95 C70 90 72 80 72 70 Z" fill="#3d2410" opacity="0.9" />
          {/* Dog Ear Right */}
          <path d="M118 70 C130 75 135 90 125 95 C120 90 118 80 118 70 Z" fill="#3d2410" opacity="0.9" />
          
          {/* Cute Cat Silhouette next to Dog */}
          <path
            d="M130 160 C130 145 138 125 150 115 C145 110 142 100 145 92 C148 85 156 82 163 86 C170 82 178 85 181 92 C184 100 181 110 176 115 C188 125 196 145 196 160 Z"
            fill="#8c5a3b"
            opacity="0.85"
          />
          {/* Cat Pointy Ear Left */}
          <path d="M145 92 L140 75 L152 84 Z" fill="#5b3a26" opacity="0.9" />
          {/* Cat Pointy Ear Right */}
          <path d="M181 92 L186 75 L174 84 Z" fill="#5b3a26" opacity="0.9" />
          
          {/* Paw Prints */}
          <circle cx="40" cy="170" r="6" fill="#d4ad78" opacity="0.7" />
          <circle cx="33" cy="160" r="3.5" fill="#d4ad78" opacity="0.7" />
          <circle cx="42" cy="157" r="3.5" fill="#d4ad78" opacity="0.7" />
          <circle cx="49" cy="162" r="3.5" fill="#d4ad78" opacity="0.7" />
        </svg>
      )}

      {variant === "sitting-dog" && (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Loyal Sitting Dog Vector */}
          <path
            d="M60 170 C60 135 75 100 100 80 C93 72 88 58 92 45 C97 32 112 26 125 32 C138 26 153 32 158 45 C162 58 157 72 150 80 C175 100 190 135 190 170 Z"
            fill="#5b3a26"
            opacity="0.85"
          />
          {/* Floppy Ear */}
          <path d="M92 45 C75 52 68 75 80 85 C88 78 92 60 92 45 Z" fill="#3d2410" opacity="0.95" />
          <path d="M158 45 C175 52 182 75 170 85 C162 78 158 60 158 45 Z" fill="#3d2410" opacity="0.95" />
          {/* Dog Tail */}
          <path d="M185 155 C205 140 210 115 198 100 C194 115 180 135 175 150 Z" fill="#8c5a3b" opacity="0.85" />
        </svg>
      )}

      {variant === "playful-cat" && (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Stretching Playful Cat Vector */}
          <path
            d="M40 160 C50 140 70 130 95 130 C120 130 140 110 150 90 C145 80 145 68 152 60 C160 52 172 52 180 60 C188 68 188 80 183 90 C175 115 150 145 120 160 Z"
            fill="#8c5a3b"
            opacity="0.88"
          />
          {/* Cat Ears */}
          <path d="M152 60 L145 40 L162 52 Z" fill="#5b3a26" opacity="0.95" />
          <path d="M180 60 L195 45 L184 62 Z" fill="#5b3a26" opacity="0.95" />
          {/* Curved Cat Tail */}
          <path d="M45 155 C25 145 15 120 25 95 C30 115 45 135 55 145 Z" fill="#5b3a26" opacity="0.85" />
        </svg>
      )}

      {variant === "paw-trail" && (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
          {/* Big Paw */}
          <circle cx="100" cy="110" r="28" fill="#5b3a26" opacity="0.8" />
          <circle cx="70" cy="72" r="14" fill="#8c5a3b" opacity="0.85" />
          <circle cx="98" cy="55" r="14" fill="#8c5a3b" opacity="0.85" />
          <circle cx="130" cy="65" r="14" fill="#8c5a3b" opacity="0.85" />
          <circle cx="148" cy="95" r="12" fill="#8c5a3b" opacity="0.85" />

          {/* Small Following Paw */}
          <circle cx="45" cy="165" r="16" fill="#8c5a3b" opacity="0.75" />
          <circle cx="28" cy="142" r="8" fill="#5b3a26" opacity="0.8" />
          <circle cx="44" cy="132" r="8" fill="#5b3a26" opacity="0.8" />
          <circle cx="62" cy="138" r="8" fill="#5b3a26" opacity="0.8" />
        </svg>
      )}
    </div>
  );
}
