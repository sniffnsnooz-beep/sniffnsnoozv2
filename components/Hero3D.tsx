"use client";

import Image from "next/image";
import { useBubbleParallax } from "../hooks/useBubbleParallax";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star, Heart, Shield, Users } from "lucide-react";
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

  const stats = [
    { icon: <Users size={15} />, value: "2000+", label: "Happy Pets" },
    { icon: <Star size={15} className="fill-amber-500 text-amber-500" />, value: "4.9★", label: "Rated" },
    { icon: <Shield size={15} />, value: "6+", label: "Cities" },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#f6efe6] via-[#f3e6d8] to-[#eadfce] min-h-[95vh] flex items-center justify-center"
    >
      {/* NAVBAR OFFSET */}
      <div className="pt-[105px]" />

      {/* ANIMATED BACKGROUND GLOW */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#e8d5c4]/60 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-[#f0e0ce]/40 to-transparent rounded-full blur-[80px]" />
      </motion.div>

      {/* DECORATIVE PAWS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {["🐾", "✨", "🐾", "✨"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-xl opacity-10"
            style={{
              top: `${[15, 70, 45, 85][i]}%`,
              left: `${[5, 8, 88, 92][i]}%`,
            }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 items-center gap-12 lg:gap-8">

        {/* LEFT TEXT */}
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl relative z-30 pt-10 md:pt-0"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="section-label mb-6"
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Complete Pet Ecosystem Solutions</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-serif text-[#5b3a26] mb-6">
            Everything Your Pet Needs, <br className="hidden md:block" />
            <span className="shimmer-text">All in One Place.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#7a5741] mb-10 leading-relaxed max-w-xl">
            From grooming and veterinary care to pet guidance, insurance and trusted companionship services — Sniffnsnooz brings complete pet solutions to your doorstep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <Link href="/booking">
              <motion.span
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary flex items-center gap-2 !py-3 !px-5 !text-sm"
              >
                Book Grooming <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>

            <Link href="/veterinary-booking">
              <motion.span
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-red-50 text-red-800 border-2 border-red-100 hover:bg-red-100/80 transition px-5 py-3 rounded-full font-bold text-sm flex items-center gap-2"
              >
                🩺 Consult Vet
              </motion.span>
            </Link>

            <Link href="/find-a-companion">
              <motion.span
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost flex items-center gap-2 !py-3 !px-5 !text-sm"
              >
                Find a Companion <Heart className="w-4 h-4 text-[#8c5a3b]" />
              </motion.span>
            </Link>
          </div>

          {/* Stats ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-10 flex items-center gap-4 flex-wrap"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/50 px-4 py-2.5 rounded-2xl shadow-sm">
                <span className="text-[#5b3a26]">{s.icon}</span>
                <div>
                  <div className="font-black text-[#5b3a26] text-sm leading-none">{s.value}</div>
                  <div className="text-[10px] text-[#7a5741] font-medium">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#f6efe6] bg-[#e6d3c2] overflow-hidden">
                  <Image src="/assets/snifflogo.png" alt="User" width={40} height={40} className="object-cover opacity-60 mix-blend-multiply" sizes="40px" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#f6efe6] bg-[#5b3a26] text-white text-xs font-bold flex items-center justify-center">
                +2k
              </div>
            </div>
            <div className="text-sm text-[#7a5741] font-medium leading-tight">
              Trusted by 2,000+ <br />happy pet parents in NCR
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

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-8 -left-6 z-30 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/60"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="text-xs font-black text-[#5b3a26]">Best Groomer</div>
                  <div className="text-[10px] text-[#7a5741]">Delhi NCR 2024</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-16 -right-6 z-30 bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/60"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">✅</span>
                <div>
                  <div className="text-xs font-black text-[#5b3a26]">Stress-Free</div>
                  <div className="text-[10px] text-[#7a5741]">At your doorstep</div>
                </div>
              </div>
            </motion.div>

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
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* FLOATING BUBBLES */}
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