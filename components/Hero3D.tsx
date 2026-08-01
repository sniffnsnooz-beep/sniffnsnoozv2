"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf6f0] via-[#f7efe6] to-[#f4e9dc] pt-[100px] pb-12 sm:pb-16 md:py-20">
      
      {/* DECORATIVE PAW BACKGROUND DOODLES */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-20">
        <span className="absolute top-12 left-8 text-2xl">🐾</span>
        <span className="absolute top-28 right-12 text-3xl">🐾</span>
        <span className="absolute bottom-16 left-1/3 text-2xl">✨</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">

          {/* LEFT CONTENT (Mobile First Layout) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left"
          >
            {/* HEADING MATCHING SCREENSHOT */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#4e3323] font-bold leading-[1.15] tracking-tight mb-4 sm:mb-6">
              Complete Care.<br />
              Happy Pets.<br />
              Happy Homes.<span className="inline-block text-[#d99b26] font-sans ml-1">💛</span>
            </h1>

            {/* DESCRIPTION MATCHING SCREENSHOT */}
            <p className="text-sm sm:text-base md:text-lg text-[#7a5741] font-medium leading-relaxed mb-6 sm:mb-8 max-w-xl">
              From grooming and veterinary care to pet guidance, insurance and trusted companionship services – Sniffnsnooz brings complete pet solutions to your doorstep.
            </p>

            {/* ACTION BUTTONS MATCHING SCREENSHOT */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 flex-wrap">
              <Link href="/booking">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#4e3323] text-white hover:bg-[#3b2518] px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-md cursor-pointer"
                >
                  Book Grooming <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>

              <Link href="/veterinary-booking">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-[#4e3323] border border-[#4e3323]/20 hover:bg-[#4e3323]/5 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-[#4e3323]" /> Consult Vet
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE (Matching Puppy & Kitten on Bed from Screenshot) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-6 relative mt-4 lg:mt-0 flex justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-[36px] overflow-hidden shadow-xl border-4 border-white/80 bg-white">
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