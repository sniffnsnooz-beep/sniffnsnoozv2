"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Stethoscope,
  Syringe,
  Scissors,
  Microscope,
  Home,
  Footprints,
  AlertTriangle,
  CheckCircle2,
  CalendarCheck
} from "lucide-react";

export default function ServicesPage() {
  const parallaxRef = useRef<HTMLImageElement | null>(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      const offset = scrollY * 0.12;
      parallaxRef.current.style.transform = `translate(-50%, -50%) translateY(${offset}px) scale(1.03)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const majorServices = [
    {
      title: "Veterinary Services",
      desc: "Comprehensive medical and preventive care to keep your pet healthy, happy, and active.",
      features: [
        "General Health Checkup",
        "Pet Illness Diagnosis",
        "Skin Disease Treatment",
        "Ear & Eye Infection Treatment",
        "Respiratory & Urinary Tract Infection",
        "Digestive Problems Treatment"
      ],
      href: "/services", // Fallback, no specific page yet for some
      icon: <Stethoscope className="w-8 h-8 text-[#5b3a26]" />
    },
    {
      title: "Vaccination Services",
      desc: "Protect your pets with vital immunizations tailored for every stage of their life.",
      features: [
        "Dog & Puppy Vaccination",
        "Cat & Kitten Vaccination",
        "Anti-rabies Vaccination",
        "Booster Vaccination",
        "Preventive Immunization Schedule"
      ],
      href: "/services",
      icon: <Syringe className="w-8 h-8 text-[#5b3a26]" />
    },
    {
      title: "Grooming Services",
      desc: "Premium hygiene and styling services for a clean and beautiful companion.",
      features: [
        "Dog Bathing",
        "Hair Trimming & Styling",
        "Full Grooming Session",
        "Nail Trimming",
        "Ear Cleaning",
        "Coat Brushing"
      ],
      href: "/services/bath-spa-addons",
      icon: <Scissors className="w-8 h-8 text-[#5b3a26]" />
    },
    {
      title: "Lab Test Services",
      desc: "Accurate diagnostics ensuring early detection of diseases and health profiling.",
      features: [
        "Blood Test",
        "Urine Test",
        "Stool / Fecal Test",
        "Infection Screening",
        "Disease Diagnostic Testing",
        "Health Profile Tests"
      ],
      href: "/services",
      icon: <Microscope className="w-8 h-8 text-[#5b3a26]" />
    },
    {
      title: "Boarding Services",
      desc: "Safe, monitored, and comfortable stays while you are away.",
      features: [
        "Short-term Pet Boarding",
        "Long-term Pet Boarding",
        "Dog & Cat Boarding",
        "Feeding & Care Supervision",
        "Safe Monitored Stay"
      ],
      href: "/services",
      icon: <Home className="w-8 h-8 text-[#5b3a26]" />
    },
    {
      title: "Pet Walking & Sitting",
      desc: "Daily exercise and compassionate care to keep your pet relaxed at home.",
      features: [
        "Dog Walking",
        "Pet Sitting",
        "Home Visit Pet Care",
        "Feeding During Absence",
        "Daily Activity Monitoring"
      ],
      href: "/services",
      icon: <Footprints className="w-8 h-8 text-[#5b3a26]" />
    },
    {
      title: "Emergency Services",
      desc: "Urgent veterinary care available for critical situations and sudden illness.",
      features: [
        "Urgent Veterinary Consultation",
        "Injury Treatment",
        "Sudden Illness Treatment",
        "Infection Treatment",
        "Emergency Diagnostics"
      ],
      href: "/services",
      icon: <AlertTriangle className="w-8 h-8 text-[#5b3a26]" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section className="relative min-h-screen py-24 page-bg overflow-hidden">
      {/* 🖼️ PARALLAX BACKGROUND IMAGE */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          ref={parallaxRef}
          src="/assets/servicelogo.png"
          alt="Veterinary and Pet Grooming Services Background"
          className="absolute left-1/2 top-[45%] w-[580px] max-w-[98vw] opacity-[0.15] parallax-image select-none"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* 🫧 FLOATING GLASS SHAPES */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-24 left-10 w-48 h-48 bg-white/40 blur-[80px] rounded-full animate-bounce-slow" />
        <div className="absolute bottom-32 right-20 w-64 h-64 bg-[#e6d3c2]/40 blur-[100px] rounded-full animate-bounce-medium" />
      </motion.div>

      {/* 🔹 MAIN CONTENT (z-10) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">

        {/* Hero Section with New Image */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <div className="section-label mb-6">
              <span>✨</span> Premium Offerings
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-6 drop-shadow-sm leading-tight">
              Comprehensive <br/> <span className="shimmer-text">Pet Care Services</span>
            </h1>
            <p className="text-lg text-[#7a5741] max-w-2xl font-medium leading-relaxed">
              From expert veterinary care, specialized lab diagnostics, and emergency support to premium grooming and caring pet boarding—we provide everything your furry companion needs to thrive.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="w-full h-[450px] rounded-[40px] overflow-hidden shadow-2xl relative border-8 border-white">
              <Image 
                src="/assets/pet_spa_bath.png" 
                alt="Premium Pet Spa Services" 
                fill 
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700 brightness-95"
              />
            </div>
            {/* Bubble decoration */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-white/90 backdrop-blur-md rounded-[30px] shadow-2xl border border-white/60 flex items-center justify-center flex-col p-4 rotate-3"
            >
              <div className="text-2xl mb-1">🧼</div>
              <span className="text-[#5b3a26] font-bold text-sm text-center leading-tight">Spa &<br/>Bath</span>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {majorServices.map((service, index) => (
            <motion.div variants={itemVariants} key={index} className="flex h-full">
              <Link href={service.href} className="w-full">
                <div className="card-premium h-full p-8 flex flex-col justify-between group cursor-pointer">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-4 bg-white/80 rounded-2xl shadow-sm text-[#5b3a26] group-hover:bg-[#5b3a26] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#5b3a26] mb-3 group-hover:text-[#8c5a3b] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#7a5741] text-sm leading-relaxed mb-6 font-medium">
                      {service.desc}
                    </p>

                    {/* SEO-Optimized Feature List */}
                    <ul className="space-y-2.5 mb-6">
                      {service.features.slice(0, 4).map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm text-[#5b3a26]/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#8c5a3b] mt-0.5 mr-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-xs text-[#8c5a3b] italic pl-6 mt-3 font-semibold">+ more services...</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#5b3a26]/10 font-bold text-[#5b3a26] flex items-center justify-between group-hover:text-[#8c5a3b] transition-colors">
                    Learn More 
                    <span className="w-8 h-8 rounded-full bg-[#f6efe6] flex items-center justify-center group-hover:bg-[#5b3a26] group-hover:text-white transition-all transform group-hover:translate-x-1">&rarr;</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Grooming Add-ons Sub-section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 relative"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5b3a26] mb-4">
              Grooming <span className="italic gradient-text">Add-ons</span>
            </h2>
            <p className="text-lg text-[#7a5741]">Perfect little extras to pamper your pet even more.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: "/services/hair-styling", title: "Hair & Styling", desc: "Hair cut, face & eyes, designer styling", emoji: "✂️" },
              { href: "/services/ear-care", title: "Ear Care", desc: "Ear cleaning, plucking & hygiene", emoji: "👂" },
              { href: "/services/nail-paw-care", title: "Nail & Paw", desc: "Nail trimming, paw hygiene & care", emoji: "🐾" },
              { href: "/services/oral-hygiene-care", title: "Oral Hygiene", desc: "Oral cleaning & hygiene services", emoji: "🦷" },
              { href: "/services/bath-spa-addons", title: "Hydra Bath & Spa", desc: "Spa, medicated & tick bath add-ons", emoji: "🛁" },
              { href: "/services/coat-skin-treatment", title: "Coat & Skin", desc: "De-matting, de-shedding & oil massage", emoji: "✨" }
            ].map((addon, idx) => (
              <Link key={idx} href={addon.href}>
                <div className="glass-float p-6 flex items-start gap-4 group cursor-pointer h-full">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {addon.emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#5b3a26] mb-1 group-hover:text-[#8c5a3b] transition-colors">{addon.title}</h3>
                    <p className="text-[#7a5741] text-xs leading-relaxed font-medium">{addon.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>

      {/* STICKY FLOATING CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6, type: "spring" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <Link href="/store-booking" className="btn-primary shadow-[0_20px_40px_rgba(91,58,38,0.4)] border border-white/20 !px-6 !py-3">
          <CalendarCheck className="w-5 h-5 mr-1" /> Book Appointment
        </Link>
      </motion.div>
    </section>
  );
}
