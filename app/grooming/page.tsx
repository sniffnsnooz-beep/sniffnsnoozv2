"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Bath,
  CheckCircle2,
  CalendarCheck,
  Truck,
  Building2,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  Clock,
  Award
} from "lucide-react";

export default function GroomingPage() {
  const parallaxRef = useRef<HTMLImageElement | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const groomingServices = [
    {
      title: "Bath & Hygiene Spa",
      desc: "Warm bath with premium organic shampoos, blow dry, ear cleaning, and paw sanitization for maximum comfort.",
      features: ["Shampoo & Conditioner Bath", "Blow Dry & Fluffing", "Ear Cleaning & Sanitization", "Nail Clipping", "Paw Butter Application"],
      href: "/services/bath-spa-addons",
      icon: <Bath className="w-8 h-8 text-[#5b3a26]" />,
      popular: true
    },
    {
      title: "Hair Trimming & Styling",
      desc: "Professional haircut and breed-specific styling by certified master pet stylists.",
      features: ["Breed Specific Haircut", "Face & Sanitary Trim", "De-matting & Combing", "Scissoring & Finishing", "Pet Perfume Application"],
      href: "/services/hair-styling",
      icon: <Scissors className="w-8 h-8 text-[#5b3a26]" />,
      popular: false
    },
    {
      title: "Nail & Paw Care",
      desc: "Gentle nail clipping, paw pad hair trimming, and soothing paw moisturizing cream.",
      features: ["Precision Nail Trimming", "Nail Filing / Smoothing", "Paw Pad Hair Clearance", "Moisturizing Paw Balm"],
      href: "/services/nail-paw-care",
      icon: <Sparkles className="w-8 h-8 text-[#5b3a26]" />,
      popular: false
    },
    {
      title: "Coat & Skin Treatment",
      desc: "Medicated baths, anti-tick treatments, shedding control, and deep nourishing oil massages.",
      features: ["Anti-Tick & Flea Treatment", "De-shedding Treatment", "Medicated Anti-Fungal Bath", "Nourishing Oil Massage"],
      href: "/services/coat-skin-treatment",
      icon: <ShieldCheck className="w-8 h-8 text-[#5b3a26]" />,
      popular: false
    },
    {
      title: "Ear & Eye Hygiene Care",
      desc: "Thorough ear plucking, wax clearance, tear stain removal, and eye flushing for optimal hygiene.",
      features: ["Ear Canal Cleaning", "Ear Hair Plucking", "Tear Stain Cleaning", "Soothe & Flush Wash"],
      href: "/services/ear-care",
      icon: <CheckCircle2 className="w-8 h-8 text-[#5b3a26]" />,
      popular: false
    },
    {
      title: "Oral & Dental Hygiene",
      desc: "Enzyme tooth brushing, breath freshener spray, and tartar prevention checks for healthy teeth.",
      features: ["Enzyme Tooth Brushing", "Breath Freshener Spray", "Gum Health Inspection", "Tartar Control Brush"],
      href: "/services/oral-hygiene-care",
      icon: <Award className="w-8 h-8 text-[#5b3a26]" />,
      popular: false
    }
  ];

  const groomingFaqs = [
    {
      q: "Doorstep van grooming and store grooming me kya difference hai?",
      a: "Doorstep van grooming me hamari fully-equipped temperature-controlled spa van aapke ghar aati hai aur saara grooming van ke andar hi stress-free tarike se hota hai. Store grooming me aap hamare nearest Sniff & Snooz luxury pet salon me appointment book karke laa sakte hain."
    },
    {
      q: "Grooming session me kitna time lagta hai?",
      a: "Standard bath and hygiene me 45-60 min lagte hain, jabki full hair styling aur spa package me 90-120 min lagte hain, depending on pet size aur coat condition."
    },
    {
      q: "Kya aap aggressive ya nervous pets ko bhi groom karte hain?",
      a: "Haan! Hamare groomers fear-free certified hain aur patient handling techniques use karte hain. Pura session pet ke comfort ke hisab se arrange kiya jata hai."
    },
    {
      q: "Kya aap natural aur pet-safe products use karte hain?",
      a: "Bilkul. Hum 100% paraben-free, sulphate-free, tearless aur pH-balanced organic pet shampoos & conditioners use karte hain jo skin allergy-safe hain."
    },
    {
      q: "Anti-tick treatment kitna effective hai?",
      a: "Hamara medicated anti-tick bath 100% active ticks aur fleas ko clear karta hai aur skin ko soothe karne ke saath protective shield provide karta hai."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pet Grooming & Spa Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sniff & Snooz",
      "image": "https://sniffnsnooz.in/assets/snifflogo.png",
      "telephone": "+919818728444",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi NCR",
        "addressCountry": "IN"
      }
    },
    "areaServed": "Delhi NCR",
    "description": "Doorstep mobile pet grooming van & store salon grooming for dogs and cats across Delhi NCR. Baths, haircuts, tick treatments, spa & paw care."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative min-h-screen py-24 page-bg overflow-hidden">
        {/* PARALLAX BACKGROUND IMAGE */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            ref={parallaxRef}
            src="/assets/servicelogo.png"
            alt="Pet Grooming Services Background"
            className="absolute left-1/2 top-[45%] w-[580px] max-w-[98vw] opacity-[0.15] parallax-image select-none"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>

        {/* FLOATING GLASS SHAPES */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-24 left-10 w-48 h-48 bg-white/40 blur-[80px] rounded-full animate-bounce-slow" />
          <div className="absolute bottom-32 right-20 w-64 h-64 bg-[#e6d3c2]/40 blur-[100px] rounded-full animate-bounce-medium" />
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">

          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <div className="section-label mb-6">
                <span>✂️</span> Luxury Pet Grooming
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-6 drop-shadow-sm leading-tight">
                Pamper Your Pet With <br /> <span className="shimmer-text">Doorstep & Salon Grooming</span>
              </h1>
              <p className="text-lg text-[#7a5741] max-w-2xl font-medium leading-relaxed mb-8">
                Professional, stress-free pet grooming sessions tailored for dogs and cats. Choose doorstep mobile van grooming at your home or visit our luxury salon.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link href="/booking" className="btn-primary !px-7 !py-3.5 flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Book Doorstep Van Grooming
                </Link>
                <Link href="/store-booking" className="btn-secondary !px-7 !py-3.5 flex items-center gap-2">
                  <Building2 className="w-5 h-5" /> Book Store Salon
                </Link>
              </div>
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
                  alt="Pet Grooming Spa Bathing"
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:scale-105 transition-transform duration-700 brightness-95"
                />
              </div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#5b3a26] text-white flex items-center justify-center text-xl font-bold">✨</div>
                <div>
                  <div className="text-xs text-[#7a5741] font-semibold">Certified Groomers</div>
                  <div className="text-sm text-[#5b3a26] font-bold">100% Organic Products</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Grooming Categories Grid */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-[#5b3a26] mb-3">Our Grooming Services</h2>
            <p className="text-lg text-[#7a5741]">Comprehensive care for every coat, breed, and size.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          >
            {groomingServices.map((service, index) => (
              <motion.div variants={itemVariants} key={index} className="flex h-full">
                <Link href={service.href} className="w-full">
                  <div className="card-premium h-full p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden">
                    {service.popular && (
                      <span className="absolute top-4 right-4 bg-[#5b3a26] text-white text-xs px-3 py-1 rounded-full font-bold">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="p-4 bg-white/80 rounded-2xl shadow-sm text-[#5b3a26] group-hover:bg-[#5b3a26] group-hover:text-white transition-all duration-300 group-hover:scale-110 w-fit mb-6">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#5b3a26] mb-3 group-hover:text-[#8c5a3b] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[#7a5741] text-sm leading-relaxed mb-6 font-medium">
                        {service.desc}
                      </p>

                      <ul className="space-y-2.5 mb-6">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start text-sm text-[#5b3a26]/90 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#8c5a3b] mt-0.5 mr-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#5b3a26]/10 font-bold text-[#5b3a26] flex items-center justify-between group-hover:text-[#8c5a3b] transition-colors">
                      Explore Details
                      <span className="w-8 h-8 rounded-full bg-[#f6efe6] flex items-center justify-center group-hover:bg-[#5b3a26] group-hover:text-white transition-all transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Grooming Add-ons Bar */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/80 shadow-xl mb-24">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-serif font-bold text-[#5b3a26] mb-2">Special Grooming Add-Ons</h3>
              <p className="text-[#7a5741] text-sm font-medium">Customize your pet's spa session with targeted specialty care.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
              {[
                { label: "Styling", icon: "✂️", href: "/services/hair-styling" },
                { label: "Ear Care", icon: "👂", href: "/services/ear-care" },
                { label: "Nail Paw", icon: "🐾", href: "/services/nail-paw-care" },
                { label: "Dental", icon: "🦷", href: "/services/oral-hygiene-care" },
                { label: "Spa Bath", icon: "🛁", href: "/services/bath-spa-addons" },
                { label: "Coat Care", icon: "✨", href: "/services/coat-skin-treatment" }
              ].map((addon, idx) => (
                <Link key={idx} href={addon.href} className="p-4 rounded-2xl bg-white/80 hover:bg-[#5b3a26] hover:text-white transition-all group shadow-sm flex flex-col items-center">
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{addon.icon}</span>
                  <span className="text-xs font-bold text-[#5b3a26] group-hover:text-white">{addon.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Grooming FAQs Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-[#5b3a26] px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                <HelpCircle className="w-4 h-4" /> Got Questions?
              </div>
              <h2 className="text-4xl font-serif font-bold text-[#5b3a26] mb-3">Grooming FAQs</h2>
              <p className="text-[#7a5741]">Frequently asked questions about our doorstep & salon grooming sessions.</p>
            </div>

            <div className="space-y-4">
              {groomingFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-serif font-bold text-lg text-[#5b3a26] hover:text-[#8c5a3b]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-[#5b3a26]" : "text-[#7a5741]"}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-[#7a5741] text-sm leading-relaxed border-t border-[#5b3a26]/10 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Floating CTA */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <Link href="/booking" className="btn-primary shadow-[0_20px_40px_rgba(91,58,38,0.4)] border border-white/20 !px-6 !py-3 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5" /> Book Grooming Session
          </Link>
        </motion.div>
      </section>
    </>
  );
}
