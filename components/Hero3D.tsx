"use client";

import Image from "next/image";
import { useBubbleParallax } from "../hooks/useBubbleParallax";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Heart } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  useBubbleParallax();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityImage = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-[#f6efe6] via-[#f3e6d8] to-[#eadfce] min-h-[95vh] flex items-center justify-center">

      {/* NAVBAR OFFSET */}
      <div className="pt-[72px]" />

      {/* BACKGROUND ELEMENTS */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30"
      >
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-[#e8d5c4] to-transparent rounded-full blur-[120px]" />
      </motion.div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 items-center gap-12 lg:gap-8">

        {/* LEFT TEXT */}
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl relative z-30 pt-20 md:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/50 px-4 py-2 rounded-full mb-6 shadow-sm"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-[#5b3a26]">India's #1 Doorstep Pet Grooming</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-serif text-[#5b3a26] mb-6 drop-shadow-sm">
            Premium Pet <br className="hidden md:block" />
            <span className="text-[#8c5a3b] italic">Grooming & Spa</span>
          </h1>

          <p className="text-lg md:text-xl text-[#7a5741] mb-10 leading-relaxed max-w-lg">
            Experience luxury care for your furry friends without leaving your home. Stress-free, hygienic, and purr-fectly professional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/store-booking" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#5b3a26] text-white px-8 py-4 rounded-full shadow-xl shadow-[#5b3a26]/20 font-medium text-lg transition-shadow hover:shadow-2xl hover:shadow-[#5b3a26]/30"
              >
                Book Grooming <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/services" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.9)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/50 backdrop-blur-md px-8 py-4 rounded-full border border-[#e6d3c2] hover:bg-white text-[#5b3a26] transition-colors font-medium text-lg shadow-sm"
              >
                View Packages <Heart className="w-5 h-5 text-[#8c5a3b]" />
              </motion.button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 flex items-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#f6efe6] bg-[#e6d3c2] overflow-hidden">
                <Image src={`/assets/snifflogo.png`} alt="User" width={40} height={40} className="object-cover opacity-60 mix-blend-multiply" sizes="40px" />
              </div>
            ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#f6efe6] bg-[#5b3a26] text-white text-xs font-bold flex items-center justify-center">
                +2k
              </div>
            </div>
            <div className="text-sm text-[#7a5741] font-medium leading-tight">
              Trusted by 2,000+ <br /> happy pet parents in NCR
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          style={{ scale: scaleImage, opacity: opacityImage }}
          className="relative flex justify-center md:justify-end mt-10 md:mt-0 pointer-events-none md:pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            {/* Soft glow behind image */}
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-110" />

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-20"
            >
              <Image
                src="/assets/doggy3dd.png"
                alt="Sniffnsnooz pets"
                width={700}
                height={650}
                priority
                sizes="(max-width: 768px) 90vw, 50vw"
                className="relative z-20 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              <span className="puppy-blink" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* FLOATING BUBBLES - Preserved completely from original */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="bubble bubble-lg right-[30%] top-[120px]" />
        <div className="bubble bubble-sm right-[22%] top-[200px]" />
        <div className="bubble bubble-md right-[38%] bottom-[140px]" />
        <div className="bubble bubble-sm left-[20%] top-[150px]" />
        <div className="bubble bubble-xl" data-depth="0.3" />
        <div className="bubble bubble-lg" data-depth="0.5" />
        <div className="bubble bubble-md" data-depth="0.8" />
        <div className="bubble bubble-sm" data-depth="1.1" />
        <div className="bubble bubble-xs" data-depth="1.4" />
      </div>
    </section>
  );
}