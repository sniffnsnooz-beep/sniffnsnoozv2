"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Stethoscope, Phone, MapPin, Sparkles, Truck, Building2 } from "lucide-react";
import PetDoodleAccents from "@/components/PetDoodleAccents";
import HeroBannerSlider from "@/components/HeroBannerSlider";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf4ec] via-[#f7efe6] to-[#f4e9dc] pt-[95px] pb-12 sm:pb-16 md:py-20">
      <PetDoodleAccents variant="dog-and-cat" position="bottom-left" size="lg" className="opacity-80" />
      <PetDoodleAccents variant="playful-cat" position="top-left" size="md" className="opacity-70" />

      {/* WARM SOFT GOLDEN GLOW IN BACKGROUND */}
      <div className="absolute top-0 right-0 w-[350px] sm:w-[550px] md:w-[650px] h-[350px] sm:h-[550px] md:h-[650px] bg-[#f2e2d0] rounded-full blur-3xl opacity-60 pointer-events-none z-0" />

      {/* GREEN LEAVES GRAPHIC IN TOP RIGHT */}
      <div className="absolute top-6 right-0 w-28 sm:w-48 md:w-64 h-28 sm:h-48 md:h-64 pointer-events-none z-0 select-none">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-6 text-left relative z-20">
            
            {/* PRIMARY LOCATION BADGE - GURGAON & NCR FOCUS */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5b3a26]/10 text-[#5b3a26] text-xs font-bold mb-4 border border-[#5b3a26]/15">
              <MapPin className="w-3.5 h-3.5 text-[#8c5a3b]" />
              <span>Gurgaon's #1 Doorstep &amp; Salon Pet Grooming Spa · Servicing Delhi NCR</span>
            </div>

            {/* HEADING WITH GOLDEN HEART DOODLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#4e3323] font-bold leading-[1.12] tracking-tight mb-4 sm:mb-5">
              Complete Care.<br />
              Happy Pets.<br />
              Happy Homes.
              <svg className="w-6 h-6 sm:w-9 sm:h-9 text-[#dba234] inline-block ml-1 -mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </h1>

            {/* DOORSTEP + SALON HIGHLIGHT BADGE */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/90 text-emerald-900 text-xs font-bold border border-emerald-200">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Mobile Van Doorstep Grooming</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100/90 text-amber-900 text-xs font-bold border border-amber-200">
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Flagship Salon: Emerald Plaza, Sec 65 Gurgaon</span>
              </span>
            </div>

            {/* SUBTITLE */}
            <p className="text-sm sm:text-base md:text-lg text-[#7a5741] font-medium leading-relaxed mb-6 sm:mb-8 max-w-xl">
              Book certified pet groomers in Gurgaon &amp; Delhi NCR. From organic spa baths and breed haircuts to vet home visits – premium care delivered at your doorstep or luxury salon.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-row items-center gap-3 sm:gap-4 flex-wrap">
              {/* PRIMARY STRONGEST CTA */}
              <Link href="/store-booking">
                <span className="bg-[#4e3323] text-white hover:bg-[#3b2518] active:scale-95 transition-all duration-200 px-6 sm:px-7 py-3.5 rounded-full font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-xl hover:shadow-2xl cursor-pointer whitespace-nowrap ring-4 ring-[#4e3323]/20">
                  <span>Book Grooming 🐾</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </span>
              </Link>

              {/* CALL / WHATSAPP DIRECT CTA */}
              <a
                href="tel:+919818728444"
                className="bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all duration-200 px-5 sm:px-6 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
                title="Call or WhatsApp Sniffnsnooz"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call / WhatsApp: 98187 28444</span>
              </a>

              {/* VET CONSULTATION */}
              <Link href="/veterinary-booking">
                <span className="bg-white text-[#4e3323] border border-[#4e3323]/25 hover:bg-[#4e3323]/5 active:scale-95 transition-transform duration-200 px-5 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap">
                  <Stethoscope className="w-3.5 h-3.5 text-[#4e3323]" />
                  <span>Consult Vet</span>
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT HERO BANNER AUTO SLIDER (ONE BY ONE PAUSING LOOP SLIDER) */}
          <div className="lg:col-span-6 relative z-20">
            <HeroBannerSlider />
          </div>

        </div>
      </div>
    </section>
  );
}