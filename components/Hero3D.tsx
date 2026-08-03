"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf4ec] via-[#f7efe6] to-[#f4e9dc] pt-[95px] pb-12 sm:pb-16 md:py-20">

      {/* WARM SOFT GOLDEN GLOW IN BACKGROUND */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[550px] md:w-[650px] h-[350px] sm:h-[550px] md:h-[650px] bg-[#f2e2d0] rounded-full blur-3xl opacity-60 pointer-events-none z-0" />

      {/* GREEN LEAVES GRAPHIC IN TOP RIGHT */}
      <div className="absolute top-6 right-0 w-28 sm:w-48 md:w-64 h-28 sm:h-48 md:h-64 pointer-events-none z-20 select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M190 0C130 30 90 110 50 180C120 120 170 70 190 0Z" fill="#4a7051" opacity="0.8" />
          <path d="M210 20C150 50 110 130 70 200C140 140 190 90 210 20Z" fill="#36543b" opacity="0.6" />
          <path d="M170 -10C120 20 80 80 40 140C100 90 150 40 170 -10Z" fill="#6a9b72" opacity="0.7" />
        </svg>
      </div>

      {/* PAW DOODLES IN BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none opacity-30">
        <span className="absolute top-16 left-8 text-2xl text-[#d4ad78]">🐾</span>
        <span className="absolute top-28 left-[40%] text-xl text-[#d4ad78]">🐾</span>
        <span className="absolute top-12 right-[45%] text-2xl text-[#d4ad78]">🐾</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-12">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-6 text-left relative z-20">
            {/* HEADING WITH GOLDEN HEART DOODLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#4e3323] font-bold leading-[1.12] tracking-tight mb-4 sm:mb-6">
              Complete Care.<br />
              Happy Pets.<br />
              Happy Homes.
              <svg className="w-6 h-6 sm:w-9 sm:h-9 text-[#dba234] inline-block ml-1 -mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </h1>

            {/* SUBTITLE */}
            <p className="text-sm sm:text-base md:text-lg text-[#7a5741] font-medium leading-relaxed mb-6 sm:mb-8 max-w-xl">
              From grooming and veterinary care to pet guidance, insurance and trusted companionship services – Sniffnsnooz brings complete pet solutions to your doorstep.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 flex-wrap">
              <Link href="/booking">
                <span className="bg-[#4e3323] text-white hover:bg-[#3b2518] active:scale-95 transition-transform duration-200 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap">
                  <span>Book Grooming</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link href="/veterinary-booking">
                <span className="bg-white text-[#4e3323] border border-[#4e3323]/25 hover:bg-[#4e3323]/5 active:scale-95 transition-transform duration-200 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap">
                  <Stethoscope className="w-4 h-4 text-[#4e3323]" />
                  <span>Consult Vet</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT TRANSPARENT PET IMAGE (doggy3dd.webp WITHOUT BACKGROUND) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-4 lg:mt-0 z-10">

            {/* FLOATING BADGE 1 */}
            <div className="animate-float-slow absolute top-4 left-0 z-30 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-white/80">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="text-xs font-black text-[#5b3a26]">Best Groomer</div>
                  <div className="text-[10px] text-[#7a5741] font-semibold">Delhi NCR</div>
                </div>
              </div>
            </div>

            {/* FLOATING BADGE 2 */}
            <div className="animate-float-reverse absolute bottom-6 right-0 z-30 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-white/80">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <div>
                  <div className="text-xs font-black text-[#5b3a26]">100% Stress-Free</div>
                  <div className="text-[10px] text-[#7a5741] font-semibold">At Your Doorstep</div>
                </div>
              </div>
            </div>

            {/* TRANSPARENT 3D PET GRAPHIC (WEB-P OPTIMIZED 90KB) */}
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              <Image
                src="/assets/doggy3dd.webp"
                alt="Sniffnsnooz Pet"
                width={700}
                height={650}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 500px"
                className="relative z-20 drop-shadow-2xl hover:scale-105 transition-transform duration-700 object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}