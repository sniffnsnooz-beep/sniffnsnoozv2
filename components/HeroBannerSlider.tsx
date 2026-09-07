"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone, CalendarCheck, Sparkles, Pause, Play, Tag } from "lucide-react";

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  badge: string;
  imageSrc: string;
  highlights: string[];
  ctaLink: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "3-tier",
    title: "The 3-Tier Grooming Collection",
    subtitle: "3 Packages. 3 Promises. 1 Happy Pet. Essential (₹1,333), Signature (₹1,599), and Luxury (₹1,999).",
    price: "From ₹1,333",
    badge: "3-Tier Collection",
    imageSrc: "/assets/banners/banner_3tier.jpg",
    highlights: [
      "Essential 3 — Clean & Fresh Grooming (₹1,333)",
      "Signature 3 — Most Popular Balanced Spa (₹1,599)",
      "Luxury 3 — Royal Premium Spa Experience (₹1,999)",
      "Free Pick & Drop within 5 KM Radius",
      "Safety, Quality & Detailed Finish Guaranteed"
    ],
    ctaLink: "/store-booking"
  },
  {
    id: "7-oils",
    title: "Luxury Skin & Coat Therapy — 7 Oils Spa Grooming",
    subtitle: "Enriched pre-bath massage oil blend: Grapeseed, Olive, Argan, Jojoba, Apricot, Coconut & Almond.",
    price: "₹1,999",
    originalPrice: "₹2,500",
    badge: "Special Introductory Offer",
    imageSrc: "/assets/banners/banner_7oils.jpg",
    highlights: [
      "Nourishing 7 Oils Body Massage",
      "Full Spa Bath & Deep Conditioning",
      "Full Body Haircut & Breed Styling",
      "Deshedding & Anal Gland Cleaning",
      "Anti-Tick Medicated Bath & Oral Hygiene"
    ],
    ctaLink: "/store-booking"
  },
  {
    id: "full-grooming",
    title: "Full Grooming with Full Body Haircut",
    subtitle: "Complete head-to-toe makeover package with premium shampoo & deep conditioning.",
    price: "₹1,799",
    badge: "Most Popular Offer",
    imageSrc: "/assets/banners/banner_fullgrooming.jpg",
    highlights: [
      "Full Body Haircut & Breed Styling",
      "Spa Bath & Deep Conditioning",
      "Anti-Tick & Medicated Bath",
      "Hygiene Cut, Face Cut & Paw Trim",
      "Oral Hygiene Toothbrush Care"
    ],
    ctaLink: "/store-booking"
  },
  {
    id: "head-to-toe",
    title: "Full Basic Head to Toe Grooming",
    subtitle: "Complete essential hygiene care for a clean, fresh, and happy pet.",
    price: "₹1,399",
    badge: "Best Value Pack",
    imageSrc: "/assets/banners/banner_headtotoe.jpg",
    highlights: [
      "Deep Hydra Shampoo & Conditioning",
      "Warm Blow Dry & Slicker Brushing",
      "Nail Cutting & Smooth Filing",
      "Ear Cleaning & Hygiene Cut",
      "Oral Hygiene Toothbrush Care"
    ],
    ctaLink: "/store-booking"
  },
  {
    id: "monsoon-sulphur",
    title: "Monsoon Allergy Relief & Sulphur Bath Therapy",
    subtitle: "Effective dermatological treatment for skin redness, itching, dandruff, and hot spots.",
    price: "Expert Care",
    badge: "Monsoon Skin Care",
    imageSrc: "/assets/banners/banner_monsoon.jpg",
    highlights: [
      "Helps Cleanse Skin & Coat Deeply",
      "Soothes Irritated & Itchy Skin",
      "Manages Fungal & Parasite Issues",
      "Reduces Excessive Itching & Hot Spots",
      "Certified Vet-Guided Products"
    ],
    ctaLink: "/store-booking"
  },
  {
    id: "classic-pack",
    title: "Classic Grooming Pack",
    subtitle: "Complete styling & spa bath experience tailored for dogs and cats.",
    price: "₹1,499",
    badge: "All-In-One Special",
    imageSrc: "/assets/banners/banner_classic.jpg",
    highlights: [
      "Premium Shampoo & Conditioning Bath",
      "Full Body Haircut & Face Styling",
      "Under-Paw & Sanitary Trimming",
      "Nail Cutting & Ear Cleaning",
      "Fluffy Blow Dry & Brushing"
    ],
    ctaLink: "/store-booking"
  }
];

export default function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  // Auto slide interval (4 seconds)
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

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.5, ease: "easeIn" as const }
    })
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-[#2b1a12] border-2 border-amber-900/40 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* TIMER PROGRESS BAR */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-40">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? "0%" : "100%" }}
          transition={{ duration: isPaused ? 0 : 4, ease: "linear" }}
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
        />
      </div>

      {/* TOP HEADER OVERLAY BAR */}
      <div className="absolute top-3 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-black border border-white/10">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>OFFER {currentIndex + 1} OF {bannerSlides.length}</span>
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="pointer-events-auto w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition"
          title={isPaused ? "Resume Auto Slide" : "Pause Auto Slide"}
        >
          {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>

      {/* SLIDER DISPLAY CONTAINER */}
      <div className="relative min-h-[480px] sm:min-h-[520px] md:min-h-[500px] flex items-center">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
          >
            {/* LEFT: BANNER IMAGE DISPLAY */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] sm:aspect-[3/4] max-h-[380px] sm:max-h-[440px] rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl shrink-0 group/img">
              <Image
                src={currentSlide.imageSrc}
                alt={currentSlide.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <span className="absolute top-3 left-3 bg-amber-500 text-black text-[11px] font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                {currentSlide.badge}
              </span>
            </div>

            {/* RIGHT: TEXT & DETAILS CONTENT */}
            <div className="w-full md:w-1/2 text-left space-y-3 sm:space-y-4 flex flex-col justify-between h-full py-1">
              <div>
                <span className="inline-block text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                  Limited Time Lounge Deal
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
                  {currentSlide.title}
                </h3>

                <p className="text-xs sm:text-sm text-amber-100/80 font-medium leading-relaxed mt-2">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* PRICE HIGHLIGHT */}
              <div className="flex items-baseline gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 w-fit">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">{currentSlide.price}</span>
                {currentSlide.originalPrice && (
                  <span className="text-sm sm:text-base text-gray-400 line-through font-bold">
                    {currentSlide.originalPrice}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  SPECIAL OFFER
                </span>
              </div>

              {/* HIGHLIGHT FEATURES */}
              <ul className="space-y-1.5 pt-1">
                {currentSlide.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center text-xs sm:text-sm text-white/90 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* ACTION BUTTONS */}
              <div className="flex flex-row items-center gap-3 pt-2 flex-wrap">
                <Link
                  href={currentSlide.ctaLink}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs sm:text-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition active:scale-95 shrink-0"
                >
                  <CalendarCheck className="w-4 h-4 text-black" />
                  <span>Book Offer Now 🐾</span>
                </Link>

                <a
                  href="tel:+919818728444"
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/20 font-bold text-xs sm:text-sm px-4 py-3 rounded-full flex items-center gap-2 transition active:scale-95 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>98187 28444</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md flex items-center justify-center transition shadow-lg border border-white/20 active:scale-90"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white backdrop-blur-md flex items-center justify-center transition shadow-lg border border-white/20 active:scale-90"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* PAGINATION DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
        {bannerSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "w-6 h-2 bg-amber-400"
                : "w-2 h-2 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
