"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, CalendarCheck, Pause, Play, Tag, Sparkles } from "lucide-react";

export interface BannerSlide {
  id: string;
  title: string;
  badge: string;
  priceTag: string;
  imageSrc: string;
  ctaLink: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "3-tier",
    title: "The 3-Tier Grooming Collection",
    badge: "Featured Collection",
    priceTag: "Essential ₹1,333 | Signature ₹1,599 | Luxury ₹1,999",
    imageSrc: "/assets/banners/banner_3tier.jpg",
    ctaLink: "/store-booking"
  },
  {
    id: "7-oils",
    title: "Luxury 7 Oils Spa Grooming",
    badge: "Special Introductory Offer",
    priceTag: "Now Only ₹1,999 (Was ₹2,500)",
    imageSrc: "/assets/banners/banner_7oils.jpg",
    ctaLink: "/store-booking"
  },
  {
    id: "full-grooming",
    title: "Full Grooming with Haircut",
    badge: "Most Popular Offer",
    priceTag: "Offer: ₹1,799",
    imageSrc: "/assets/banners/banner_fullgrooming.jpg",
    ctaLink: "/store-booking"
  },
  {
    id: "head-to-toe",
    title: "Full Basic Head to Toe Grooming",
    badge: "Best Value Pack",
    priceTag: "Offer: ₹1,399",
    imageSrc: "/assets/banners/banner_headtotoe.jpg",
    ctaLink: "/store-booking"
  },
  {
    id: "monsoon-sulphur",
    title: "Monsoon Allergy & Sulphur Bath",
    badge: "Monsoon Skin Care",
    priceTag: "Special Skin Therapy",
    imageSrc: "/assets/banners/banner_monsoon.jpg",
    ctaLink: "/store-booking"
  },
  {
    id: "classic-pack",
    title: "Classic Grooming Pack",
    badge: "All-In-One Special",
    priceTag: "Offer: ₹1,499",
    imageSrc: "/assets/banners/banner_classic.jpg",
    ctaLink: "/store-booking"
  }
];

export default function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  // Auto loop (4 seconds pause per slide)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerSlides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
  };

  const currentSlide = bannerSlides[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" as const }
    })
  };

  return (
    <div
      className="relative w-full max-w-[460px] lg:max-w-[490px] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#2b170c] border-4 border-amber-600/30 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* TOP TIMER PROGRESS BAR */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-black/40 z-40">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? "0%" : "100%" }}
          transition={{ duration: isPaused ? 0 : 4, ease: "linear" }}
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
        />
      </div>

      {/* TOP HEADER OVERLAY */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-amber-300 text-xs font-black border border-amber-500/40 shadow-lg">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>EXCLUSIVE OFFER {currentIndex + 1} / {bannerSlides.length}</span>
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="pointer-events-auto w-8 h-8 rounded-full bg-black/80 backdrop-blur-md text-white hover:text-amber-400 flex items-center justify-center border border-white/20 transition shadow-lg active:scale-90"
          title={isPaused ? "Resume Auto Slide" : "Pause Auto Slide"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* POSTER DISPLAY CONTAINER - EXACT 683/1024 ASPECT RATIO OF THE POSTER IMAGES */}
      <div className="relative w-full aspect-[683/1024] bg-stone-950 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* FULL POSTER IMAGE DISPLAYED ENTIRELY WITHOUT CROPPING OR BLACK BARS */}
            <div className="relative w-full h-full">
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 490px"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION ARROWS */}
        <button
          onClick={handlePrev}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md flex items-center justify-center transition shadow-2xl border border-white/20 active:scale-90"
          aria-label="Previous Offer Poster"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/75 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md flex items-center justify-center transition shadow-2xl border border-white/20 active:scale-90"
          aria-label="Next Offer Poster"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* BOTTOM OVERLAY ACTION BAR */}
      <div className="bg-gradient-to-b from-[#2b170c] via-[#211108] to-[#170a04] p-3.5 sm:p-4 border-t border-amber-800/40 relative z-30 flex flex-col gap-2.5">
        
        {/* TITLE & PRICE BADGE */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-amber-100 line-clamp-1">{currentSlide.title}</span>
          </div>
          <span className="text-xs font-black bg-amber-400 text-black px-2.5 py-1 rounded-full shrink-0 shadow-md">
            {currentSlide.priceTag}
          </span>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="flex items-center gap-2">
          <Link
            href={currentSlide.ctaLink}
            className="flex-1 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs sm:text-sm py-2.5 rounded-full shadow-lg flex items-center justify-center gap-1.5 transition active:scale-95"
          >
            <CalendarCheck className="w-4 h-4 text-black" />
            <span>Book Offer 🐾</span>
          </Link>

          <a
            href="tel:+919818728444"
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-2.5 rounded-full shadow-lg flex items-center justify-center gap-1.5 transition active:scale-95"
            title="Call / WhatsApp: 98187 28444"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>98187 28444</span>
          </a>
        </div>

        {/* PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {bannerSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-7 h-2.5 bg-amber-400 shadow-sm"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/70"
              }`}
              aria-label={`Go to poster ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

