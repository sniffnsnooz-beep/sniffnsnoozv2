"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, MapPin, CheckCircle2, Search, Trophy, ShieldCheck, Award, Sparkles, Home } from "lucide-react";

export default function HomeServiceGrid() {
  return (
    <section className="py-6 sm:py-10 bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">

        {/* 1. FIND A TRUSTED COMPANY BANNER (Matching Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#f5ede3] border border-[#e5d6c5] rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-xl shrink-0">
              🏆
            </div>
            <div>
              <h3 className="font-serif font-bold text-[#4e3323] text-sm sm:text-base">
                Find a Trusted Company
              </h3>
              <p className="text-xs text-[#7a5741] font-medium">
                Verified pet care partners near you
              </p>
            </div>
          </div>

          <Link href="/find-a-companion" className="bg-white hover:bg-[#4e3323] hover:text-white transition-colors text-[#4e3323] border border-[#4e3323]/20 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 shrink-0">
            <span>Search Now</span>
            <Search className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* 2. STATS GRID & PETS IMAGE (Matching Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* STATS 2x2 GRID */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#eae0d5] rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-xl font-black text-[#4e3323]">4.9+</span>
              </div>
              <span className="text-xs text-[#7a5741] font-medium">Rated by Pet Parents</span>
            </div>

            <div className="bg-white border border-[#eae0d5] rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#4e3323]" />
                <span className="text-xl font-black text-[#4e3323]">2000+</span>
              </div>
              <span className="text-xs text-[#7a5741] font-medium">Happy Pets</span>
            </div>

            <div className="bg-white border border-[#eae0d5] rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-[#4e3323]" />
                <span className="text-xl font-black text-[#4e3323]">6+</span>
              </div>
              <span className="text-xs text-[#7a5741] font-medium">Cities</span>
            </div>

            <div className="bg-white border border-[#eae0d5] rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm sm:text-base font-black text-[#4e3323]">Stress-Free</span>
              </div>
              <span className="text-xs text-[#7a5741] font-medium">At your doorstep</span>
            </div>
          </div>

          {/* PETS IMAGE */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white">
              <Image
                src="/assets/stats_pets.png"
                alt="Happy Golden Retriever, Poodle and Kitten"
                fill
                style={{ objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* 3. TRUSTED BY 2000+ AVATAR BAR (Matching Screenshot) */}
        <div className="bg-white border border-[#eae0d5] rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="flex -space-x-3 shrink-0">
            <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-[#e6d3c2]">
              <Image src="/assets/snifflogo.png" alt="User 1" width={36} height={36} className="object-cover opacity-70" />
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-[#d8c3b0]">
              <Image src="/assets/snifflogo.png" alt="User 2" width={36} height={36} className="object-cover opacity-70" />
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-[#c9b29e]">
              <Image src="/assets/snifflogo.png" alt="User 3" width={36} height={36} className="object-cover opacity-70" />
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-white bg-[#4e3323] text-white text-xs font-bold flex items-center justify-center">
              +2K
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#4e3323] text-sm">Trusted by 2,000+</h4>
            <p className="text-xs text-[#7a5741] font-medium">happy pet parents in NCR</p>
          </div>
        </div>

        {/* 4. FOUR FEATURE BADGES (Matching Bottom of Screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
          {[
            { title: "Trained & Experienced Professionals", icon: <Award className="w-5 h-5 text-[#4e3323] mx-auto mb-1.5" /> },
            { title: "Safe & Premium Products", icon: <ShieldCheck className="w-5 h-5 text-[#4e3323] mx-auto mb-1.5" /> },
            { title: "Hygienic & Stress-Free Experience", icon: <Sparkles className="w-5 h-5 text-[#4e3323] mx-auto mb-1.5" /> },
            { title: "Convenient Doorstep Service", icon: <Home className="w-5 h-5 text-[#4e3323] mx-auto mb-1.5" /> },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-[#eae0d5] rounded-xl p-3.5 shadow-sm flex flex-col items-center justify-center">
              {item.icon}
              <span className="text-[11px] sm:text-xs font-bold text-[#4e3323] leading-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
