"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle, HeartHandshake, Scissors, ShieldCheck, MapPin } from "lucide-react";

export default function HomeAboutSection() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" });
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <section className="py-28 relative bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] overflow-hidden">

      {/* Decorative Blob */}
      <div className="absolute top-40 left-[-10%] w-[400px] h-[400px] bg-[#e6d3c2]/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-[#fff]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {/* ================= ABOUT GRID ================= */}
        <div ref={ref1} className="grid lg:grid-cols-2 gap-16 items-center relative z-10">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView1 ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50">
              <Sparkles className="w-4 h-4 text-[#8c5a3b]" />
              <span className="text-sm font-bold tracking-widest uppercase text-[#5b3a26]">Our Philosophy</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#5b3a26] leading-tight">
              🐾 They Are Family, <br />
              <span className="italic font-light opacity-80">Not Just Pets</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-[#6b4a35] leading-relaxed">
              At <strong>Sniffnsnooz</strong>, we believe your pet deserves the same care, comfort, and patience as any loved family member. Customer satisfaction is not just a goal — it is our priority, our responsibility, and our promise.
            </motion.p>

            <motion.div variants={itemVariants} className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e6d3c2] to-transparent rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />
              <h3 className="text-2xl font-serif text-[#5b3a26] mb-3 flex items-center gap-2 relative z-10">
                <Scissors className="w-6 h-6 text-[#8c5a3b]" /> Premium Grooming
              </h3>
              <p className="text-[#6b4a35] relative z-10 text-base">
                Unlike traditional salons, we bring professional grooming directly to your doorstep. We proudly use globally trusted brands like <strong>Hydra Professional</strong> and <strong>Bio-Groom</strong> for superior coat health.
              </p>
            </motion.div>

            <motion.ul variants={containerVariants} className="space-y-3">
              {[
                "Gentle handling for anxious pets",
                "Clean, safe, & fully sanitized tools",
                "Breed-appropriate styling rituals"
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-center gap-3 text-lg font-medium text-[#5b3a26]">
                  <div className="w-8 h-8 rounded-full bg-[#5b3a26]/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#8c5a3b]" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={isInView1 ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl shadow-[#5b3a26]/10 border-8 border-white bg-white hidden lg:block"
          >
            <Image
              src="/assets/pet_spa_bath.png"
              alt="Premium Grooming Dog"
              fill
              className="object-cover scale-110 hover:scale-100 transition-transform duration-700 brightness-95"
            />
            {/* Glassmorphism Badge */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5b3a26] rounded-full flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#5b3a26] text-lg">Stress-Free Guarantee</h4>
                  <p className="text-sm text-[#6b4a35]">Calm grooming at your doorstep</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ================= ANIMATED STATS ================= */}
        <div className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "2000+", label: "Happy Pets Groomed", emoji: "🐾" },
              { value: "4.9★", label: "Average Rating", emoji: "⭐" },
              { value: "6+", label: "Cities Covered", emoji: "📍" },
              { value: "3+", label: "Years of Excellence", emoji: "🏆" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{stat.emoji}</div>
                <div className="text-3xl font-black text-[#5b3a26] leading-none">{stat.value}</div>
                <div className="text-xs text-[#7a5741] font-semibold mt-1.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= WHY CHOOSE US ================= */}
        <div ref={ref2} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#5b3a26] mb-4">
              ⭐ Why Choose Us
            </h2>
            <p className="text-lg text-[#6b4a35]">
              Choosing a grooming service is about trust, care, and reliability. Here is why pet parents love Sniffnsnooz.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: <Image src="/assets/snifflogo.png" alt="Home" width={30} height={30} className="opacity-80 mix-blend-multiply" />,
                title: "Doorstep Convenience",
                desc: "No travel stress. No waiting rooms. Your pet stays calm at home."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-[#8c5a3b]" />,
                title: "Imported Products",
                desc: "Hydra Professional and Bio-Groom ensuring salon-level results."
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-[#8c5a3b]" />,
                title: "Compassionate Care",
                desc: "Our groomers understand pet behavior and never rush a session."
              },
              {
                icon: <MapPin className="w-8 h-8 text-[#8c5a3b]" />,
                title: "NCR Availability",
                desc: "Trusted doorstep pet grooming across entire Delhi NCR region."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-16 h-16 rounded-2xl bg-[#f6efe6] border border-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-3 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-[#6b4a35] font-medium leading-relaxed relative z-10">
                  {feature.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
