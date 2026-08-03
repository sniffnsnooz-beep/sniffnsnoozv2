"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, Stethoscope, Shield, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import FoliageAccents from "@/components/FoliageAccents";
import PetDoodleAccents from "@/components/PetDoodleAccents";

const serviceCards = [
  {
    title: "Grooming",
    desc: "Spa, haircut, de-shedding & more",
    href: "/grooming",
    icon: <Scissors className="w-6 h-6 text-[#d48c38]" />,
    iconBg: "bg-amber-50 border-amber-100",
  },
  {
    title: "Veterinary Care",
    desc: "Home vet visits & consultations",
    href: "/veterinary",
    icon: <Stethoscope className="w-6 h-6 text-[#4e3323]" />,
    iconBg: "bg-orange-50 border-orange-100",
  },
  {
    title: "Pet Insurance",
    desc: "Secure their health & your peace",
    href: "/pet-insurance",
    icon: <Shield className="w-6 h-6 text-[#d48c38]" />,
    iconBg: "bg-amber-50 border-amber-100",
  },
  {
    title: "Pet Companionship",
    desc: "Trusted companionship services",
    href: "/find-a-companion",
    icon: <Heart className="w-6 h-6 text-[#4e3323]" />,
    iconBg: "bg-orange-50 border-orange-100",
  },
  {
    title: "Pet Essentials",
    desc: "Premium food, products & more",
    href: "/services",
    icon: <ShoppingBag className="w-6 h-6 text-[#d48c38]" />,
    iconBg: "bg-amber-50 border-amber-100",
  },
];

export default function HomeServiceSlider() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 bg-[#faf6f0]">
      <FoliageAccents position="top-right" size="md" className="opacity-70" />
      <FoliageAccents position="bottom-left" size="md" className="opacity-70" />
      <PetDoodleAccents variant="sitting-dog" position="bottom-right" size="lg" className="opacity-80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* SECTION HEADER MATCHING SCREENSHOT */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-sm sm:text-base font-bold text-[#7a5741] flex items-center justify-center gap-2">
            <span>🐾</span> Everything your pet needs, at your doorstep <span>🐾</span>
          </h2>
        </div>

        {/* HORIZONTAL CAROUSEL / GRID MATCHING SCREENSHOT */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none no-scrollbar">
          {serviceCards.map((card, idx) => (
            <Link key={idx} href={card.href} className="snap-start shrink-0 w-[160px] sm:w-[200px] group">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white border border-[#eae0d5] rounded-2xl p-4 flex flex-col justify-between h-[210px] shadow-sm group-hover:shadow-md transition-all text-center items-center"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.iconBg} mb-3 group-hover:scale-105 transition-transform`}>
                    {card.icon}
                  </div>
                  <h3 className="font-serif font-bold text-[#4e3323] text-sm sm:text-base mb-1 group-hover:text-[#8c5a3b] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#7a5741] leading-tight font-medium">
                    {card.desc}
                  </p>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#faf4ec] border border-[#e8dccf] flex items-center justify-center text-[#4e3323] group-hover:bg-[#4e3323] group-hover:text-white transition-colors mt-2">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
