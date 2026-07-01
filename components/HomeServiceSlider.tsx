"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scissors, ShieldCheck, HeartPulse, Smile, Droplet } from "lucide-react";

const services = [
  {
    title: "Hair & Styling",
    desc: "Hair cut, face & eye styling",
    price: "Starting ₹199",
    href: "/services/hair-styling",
    icon: <Scissors className="w-6 h-6 text-[#5b3a26]" />
  },
  {
    title: "Ear Care",
    desc: "Ear cleaning & hygiene",
    price: "Starting ₹199",
    href: "/services/ear-care",
    icon: <ShieldCheck className="w-6 h-6 text-[#5b3a26]" />
  },
  {
    title: "Nail & Paw Care",
    desc: "Nail trimming & paw care",
    price: "Starting ₹199",
    href: "/services/nail-paw-care",
    icon: <HeartPulse className="w-6 h-6 text-[#5b3a26]" />
  },
  {
    title: "Oral Hygiene",
    desc: "Oral cleaning & care",
    price: "Starting ₹249",
    href: "/services/oral-hygiene-care",
    icon: <Smile className="w-6 h-6 text-[#5b3a26]" />
  },
  {
    title: "Bath & Spa",
    desc: "Spa & medicated bath",
    price: "Starting ₹899",
    href: "/services/bath-spa-addons",
    icon: <Droplet className="w-6 h-6 text-[#5b3a26]" />
  },
];

export default function HomeServiceSlider() {
  return (
    <section className="relative z-20 mt-[-30px] md:mt-[-50px]">
      <div className="max-w-[1400px] mx-auto px-5 overflow-hidden">

        {/* Infinite CSS Scroll Wrapper */}
        <div className="flex gap-6 w-max animate-scroll-x hover:[animation-play-state:paused] py-4">

          {/* Duplicating the array multiple times to ensure smooth infinite scroll */}
          {[...services, ...services, ...services, ...services].map((s, i) => (
            <Link key={i} href={s.href} className="shrink-0 group outline-none">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="
                  bg-white/40
                  backdrop-blur-xl
                  border border-white/50
                  min-w-[280px]
                  max-w-[300px]
                  p-6
                  rounded-3xl
                  shadow-lg
                  shadow-[#5b3a26]/5
                  cursor-pointer
                  transition-all
                  duration-300
                  group-hover:shadow-[#5b3a26]/15
                  group-hover:bg-white/60
                  relative
                  overflow-hidden
                "
              >
                {/* Decorative Glow inside card */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#e6d3c2] rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="w-12 h-12 rounded-full bg-white/70 border border-white flex items-center justify-center mb-4 shadow-sm relative z-10 transition-transform group-hover:rotate-12">
                  {s.icon}
                </div>

                <h3 className="text-xl font-serif text-[#5b3a26] mb-2 font-bold relative z-10">
                  {s.title}
                </h3>

                <p className="text-[#7a5741] text-sm leading-relaxed relative z-10">
                  {s.desc}
                </p>

                <p className="mt-4 font-semibold text-[#5b3a26] relative z-10">
                  {s.price}
                </p>

                <div className="mt-6 flex align-center">
                  <span className="bg-[#5b3a26] text-white px-6 py-2 rounded-full text-sm font-medium shadow-md group-hover:shadow-xl transition-all relative z-10 w-full text-center group-hover:bg-[#462c1d]">
                    Book Now
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
