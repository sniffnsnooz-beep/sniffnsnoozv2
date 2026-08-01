"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf6f0] via-[#f7efe6] to-[#f4e9dc] pt-[95px] pb-8 sm:pb-16 md:py-20">
      
      {/* 🌿 LEAVES GRAPHIC IN TOP-RIGHT (Matching Screenshot) */}
      <div className="absolute top-12 right-0 w-20 sm:w-40 md:w-56 h-20 sm:h-40 md:h-56 pointer-events-none z-10 opacity-75">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M180 10C120 40 80 120 40 190C110 130 160 80 180 10Z" fill="#588b63" opacity="0.75" />
          <path d="M200 30C140 60 100 140 60 210C130 150 180 100 200 30Z" fill="#3f6a47" opacity="0.5" />
          <path d="M160 0C110 30 70 90 30 150C90 100 140 50 160 0Z" fill="#7fae89" opacity="0.6" />
        </svg>
      </div>

      {/* 🐾 PAW DOODLES IN BACKGROUND (Matching Screenshot) */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none opacity-25">
        <span className="absolute top-16 left-12 text-xl sm:text-2xl">🐾</span>
        <span className="absolute top-24 left-[42%] text-lg sm:text-xl">🐾</span>
        <span className="absolute bottom-12 left-1/4 text-xl">✨</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 w-full">
        {/* SIDE-BY-SIDE 2-COLUMN LAYOUT EVEN ON MOBILE (Matching Screenshot) */}
        <div className="grid grid-cols-12 items-center gap-2 sm:gap-6">

          {/* LEFT COLUMN: TEXT & BUTTONS (Col-7 on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-7 sm:col-span-6 text-left pr-1 sm:pr-4"
          >
            {/* HEADING WITH GOLDEN HEART DOODLE (Matching Screenshot) */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#4e3323] font-bold leading-[1.12] tracking-tight mb-2 sm:mb-4">
              Complete Care.<br />
              Happy Pets.<br />
              Happy Homes.
              <svg className="w-5 h-5 sm:w-8 sm:h-8 text-[#d99b26] inline-block ml-1 -mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </h1>

            {/* SUBTITLE (Matching Screenshot) */}
            <p className="text-[11px] sm:text-sm md:text-base text-[#7a5741] font-medium leading-normal mb-3 sm:mb-6 max-w-md">
              From grooming and veterinary care to pet guidance, insurance and trusted companionship services – Sniffnsnooz brings complete pet solutions to your doorstep.
            </p>

            {/* TWO STACKED/SIDE BUTTONS (Matching Screenshot) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <Link href="/booking">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#4e3323] text-white hover:bg-[#3b2518] px-3.5 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
                >
                  <span>Book Grooming</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </Link>

              <Link href="/veterinary-booking">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-[#4e3323] border border-[#4e3323]/25 hover:bg-[#4e3323]/5 px-3.5 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-[#4e3323]" />
                  <span>Consult Vet</span>
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: HERO PETS IMAGE SIDE-BY-SIDE ON MOBILE (Matching Screenshot) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-5 sm:col-span-6 relative flex justify-center items-center"
          >
            {/* Soft circular background glow */}
            <div className="absolute inset-0 bg-[#f3e3d3] rounded-full blur-2xl scale-110 opacity-70 pointer-events-none" />

            <div className="relative w-full max-w-[440px] aspect-square sm:aspect-[4/3] rounded-2xl sm:rounded-[32px] overflow-hidden shadow-lg border-2 sm:border-4 border-white/90 bg-white">
              <Image
                src="/assets/hero_pets_bed.png"
                alt="Golden Retriever puppy and kitten on cozy plush bed"
                fill
                priority
                style={{ objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}