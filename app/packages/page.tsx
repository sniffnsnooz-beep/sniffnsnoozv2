"use client";

import { packages } from "@/data/packages";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, PhoneCall, Sparkles } from "lucide-react";

export default function PackagesPage() {
  const { addItem } = useBooking();
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleBuy = (p: any) => {
    addItem({
      id: `package-${p.name}`,
      name: p.name,
      price: p.price,
      category: "Package",
    });
    router.push("/booking");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] py-32 min-h-screen overflow-hidden">
      {/* Decorative background blur elements */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white/40 rounded-full blur-[100px] animate-bounce-slow" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#e6d3c2]/50 rounded-full blur-[120px] animate-bounce-medium" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO SECTION FOR PACKAGES */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <div className="section-label mb-6">
              <Sparkles className="w-4 h-4 text-[#8c5a3b]" /> Value Bundles
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#5b3a26] mb-6 leading-tight drop-shadow-sm">
              Premium Pet <br/> <span className="shimmer-text">Care Packages</span>
            </h1>
            <p className="text-lg text-[#7a5741] mb-8 max-w-lg font-medium leading-relaxed">
              Give your furry friends the best care without breaking the bank. Our bundled packages offer excellent value and comprehensive grooming services tailored for their health and hygiene.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative max-w-md lg:max-w-none mx-auto"
          >
            <div className="relative h-[380px] w-full rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-white">
              <Image 
                src="/assets/premium_pet_grooming_box.png" 
                alt="Premium Pet Packages"
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-xl border border-white/60 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-black text-xl">
                %
              </div>
              <div>
                <p className="font-bold text-[#5b3a26] text-xl leading-tight">Save up to 30%</p>
                <p className="text-xs text-[#7a5741] font-medium">with annual membership</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* PACKAGE GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packages.map((p, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="card-premium flex flex-col justify-between group overflow-visible"
            >
              {/* Popular Badge */}
              {i === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg z-20 whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="p-8 pb-0">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-serif font-bold text-[#5b3a26] group-hover:text-[#8c5a3b] transition-colors">
                    {p.name}
                  </h3>
                  <span className="bg-[#5b3a26]/10 text-[#5b3a26] text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-bold">
                    {p.validity}
                  </span>
                </div>

                <div className="bg-white/70 rounded-2xl p-5 mb-6 shadow-sm border border-white">
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-black text-[#5b3a26]">
                      ₹{p.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    You save ₹{p.saved.toLocaleString()}
                  </p>
                </div>

                {/* Feature List */}
                <div className="mb-8">
                  <p className="text-xs font-bold text-[#8c5a3b] uppercase tracking-widest mb-3">Includes</p>
                  <ul className="space-y-3">
                    {p.services.split(', ').map((service: string, sIdx: number) => (
                      <li key={sIdx} className="flex items-start text-sm text-[#5b3a26] font-medium leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#8c5a3b] mt-0.5 mr-2 shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 pt-0 mt-auto">
                <div className="flex items-center justify-between gap-3 relative z-10">
                  <button
                    onClick={() => handleBuy(p)}
                    className="flex-1 btn-primary !w-full justify-center !py-3.5"
                  >
                    Select Plan
                  </button>

                  <a
                    href="tel:+919818728444"
                    className="w-12 h-12 bg-white border border-[#5b3a26]/20 text-[#5b3a26] rounded-full flex items-center justify-center hover:bg-[#5b3a26] hover:text-white transition-all shadow-sm group/call shrink-0"
                    aria-label="Call for inquiries"
                  >
                    <PhoneCall size={18} className="group-hover/call:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}