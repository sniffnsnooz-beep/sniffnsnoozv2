"use client";

import { useState } from "react";
import { hairStylingServices } from "@/data/hairStylingServices";

export default function HairStylingAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        bg-white/60
        backdrop-blur-xl
        rounded-2xl
        shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        overflow-hidden
      "
    >
      {/* HEADER (ALWAYS VISIBLE) */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center
          px-6 py-5
          text-left
        "
      >
        <h3 className="text-2xl font-serif text-[#5b3a26]">
          Hair & Styling Services
        </h3>

        <span
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      {/* EXPANDABLE CONTENT */}
      {open && (
        <div className="px-6 pb-6 space-y-3">
          {hairStylingServices.map((s, i) => (
            <div
              key={i}
              className="
                flex justify-between items-center
                bg-white
                rounded-xl
                px-5 py-4
                shadow-sm
              "
            >
              <div>
                <p className="font-medium text-[#5b3a26]">
                  {s.name}
                </p>
                <p className="text-sm text-[#7a5741]">
                  ⏱ {s.time}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#5b3a26]">
                  ₹{s.price}
                </span>

                <button
                  className="
                    border border-[#5b3a26]
                    px-4 py-1.5 rounded-lg
                    text-sm
                    hover:bg-[#5b3a26]
                    hover:text-white
                    transition
                  "
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
