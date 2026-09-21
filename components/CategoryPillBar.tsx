"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Scissors, Store, Sparkles, Shield, HeartHandshake } from "lucide-react";
import { trackConversion } from "@/lib/gtag";

const categories = [
  { label: "Vet Doctors", href: "/veterinary", icon: <Stethoscope className="w-3.5 h-3.5 text-red-500" />, badge: "Top Priority" },
  { label: "Doorstep Grooming", href: "/grooming", icon: <Scissors className="w-3.5 h-3.5 text-amber-600" />, badge: "Home Visit" },
  { label: "Salon Lounge", href: "/store-booking", icon: <Store className="w-3.5 h-3.5 text-amber-700" />, badge: "Sec 65" },
  { label: "Packages & Combos", href: "/packages", icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />, badge: "Save 25%" },
  { label: "Pet Insurance", href: "/pet-insurance", icon: <Shield className="w-3.5 h-3.5 text-blue-500" />, badge: "Cover" },
  { label: "Companions", href: "/find-a-companion", icon: <HeartHandshake className="w-3.5 h-3.5 text-pink-500" />, badge: "Adopt" },
];

export default function CategoryPillBar() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-[#3d2410]/95 backdrop-blur-md text-white py-2 px-3 shadow-inner border-b border-amber-900/30 overflow-x-auto no-scrollbar relative z-20">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider flex items-center gap-1 shrink-0 pr-1">
          <span>⚡ QUICK CARE:</span>
        </span>
        {categories.map((cat) => {
          const isActive = pathname === cat.href;

          return (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={() => trackConversion("category_pill_click", { category: cat.label })}
              aria-label={`Go to ${cat.label}`}
              title={cat.label}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-amber-600 text-white border-amber-400 shadow-md scale-105"
                  : "bg-white/10 hover:bg-white/20 text-amber-100 border-white/10"
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              {cat.badge && (
                <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase ml-0.5">
                  {cat.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
