"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Syringe,
  Scissors,
  Microscope,
  Home,
  Footprints,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

export default function ServicesPage() {
  const parallaxRef = useRef<HTMLImageElement | null>(null);

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
        "Digestive Problems Treatment",
        "Allergy Treatment",
        "Injury & Wound Care",
        "Minor Medical Procedures",
        "Pet Health Consultation"
      ],
      href: "/vet-services",
      icon: <Stethoscope className="w-8 h-8 text-[#5b3a26] mb-3" />
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
      href: "/vaccination-services",
      icon: <Syringe className="w-8 h-8 text-[#5b3a26] mb-3" />
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
        "Coat Brushing",
        "Hygiene Grooming"
      ],
      href: "/grooming-services",
      icon: <Scissors className="w-8 h-8 text-[#5b3a26] mb-3" />
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
      href: "/lab-test-services",
      icon: <Microscope className="w-8 h-8 text-[#5b3a26] mb-3" />
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
      href: "/boarding-services",
      icon: <Home className="w-8 h-8 text-[#5b3a26] mb-3" />
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
      href: "/pet-walking-sitting",
      icon: <Footprints className="w-8 h-8 text-[#5b3a26] mb-3" />
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
      href: "/emergency-services",
      icon: <AlertTriangle className="w-8 h-8 text-[#5b3a26] mb-3" />
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
    show: { opacity: 1, y: 0, transition: { type: "tween" as const, ease: "easeOut" as const, duration: 0.5 } }
  };

  return (
    <section className="relative min-h-screen py-24 bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] overflow-hidden">
      {/* 🖼️ PARALLAX BACKGROUND IMAGE */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          ref={parallaxRef}
          src="/assets/servicelogo.png"
          alt="Veterinary and Pet Grooming Services Background"
          className="absolute left-1/2 top-[45%] w-[580px] max-w-[98vw] opacity-20 parallax-image select-none"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* 🫧 FLOATING GLASS SHAPES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-24 left-10 w-32 h-32 bg-white/50 blur-xl rounded-2xl animate-[bounce_5s_infinite]" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-white/40 blur-2xl rounded-3xl animate-[bounce_7s_infinite_reverse]" />
      </div>

      {/* 🔹 MAIN CONTENT (z-10) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Hero Section with New Image */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-6 drop-shadow-sm leading-tight">
              Comprehensive <br/> Pet Care Services
            </h1>
            <p className="text-xl text-[#7a5741] max-w-2xl font-medium leading-relaxed">
              From expert veterinary care, specialized lab diagnostics, and emergency support to premium grooming and caring pet boarding—we provide everything your furry companion needs to thrive.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="w-full h-[400px] rounded-[3rem] overflow-hidden shadow-2xl relative border-[8px] border-white/40">
              <Image 
                src="/assets/pet_spa_bath.png" 
                alt="Premium Pet Spa Services" 
                fill 
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Bubble decoration */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-white/80 backdrop-blur-md rounded-full shadow-xl border border-white flex items-center justify-center pointer-events-none text-center p-2"
            >
              <span className="text-[#5b3a26] font-bold text-xs">Premium<br/>Care</span>
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
            <motion.div variants={itemVariants} key={index} className="flex">
              <Link href={service.href} className="w-full">
                <div className="bg-white/60 backdrop-blur-xl border border-white/50 w-full h-full rounded-3xl p-8 shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-[#5b3a26] group-hover:bg-[#5b3a26] group-hover:text-white transition-colors duration-300">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#5b3a26] mt-4 mb-2 group-hover:text-[#42291b] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#7a5741] text-md leading-relaxed mb-6 font-medium">
                      {service.desc}
                    </p>

                    {/* SEO-Optimized Feature List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start text-sm text-[#5b3a26]/90 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#7a5741] mt-0.5 mr-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 4 && (
                        <li className="text-xs text-[#7a5741] italic pl-6 mt-2">+ more services...</li>
                      )}
                    </ul>
                  </div>

                  <p className="mt-4 font-bold text-[#5b3a26] flex items-center gap-2 group-hover:text-[#7a5741] transition-colors group-hover:translate-x-2 transform duration-300">
                    Learn More <span>&rarr;</span>
                  </p>
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
          className="mt-28"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-[#5b3a26] mb-4">
              Specialized Add-ons
            </h2>
            <div className="w-24 h-1 bg-[#5b3a26] mx-auto rounded-full opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/services/hair-styling">
              <div className="bg-white/50 backdrop-blur-md border border-white/30 h-full rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-2 group-hover:text-[#42291b] transition-colors">Hair & Styling</h3>
                <p className="text-[#7a5741] text-sm leading-relaxed font-medium">Hair cut, face & eyes, designer styling</p>
              </div>
            </Link>
            <Link href="/services/ear-care">
              <div className="bg-white/50 backdrop-blur-md border border-white/30 h-full rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-2 group-hover:text-[#42291b] transition-colors">Ear Care</h3>
                <p className="text-[#7a5741] text-sm leading-relaxed font-medium">Ear cleaning, plucking & hygiene</p>
              </div>
            </Link>
            <Link href="/services/nail-paw-care">
              <div className="bg-white/50 backdrop-blur-md border border-white/30 h-full rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-2 group-hover:text-[#42291b] transition-colors">Nail & Paw</h3>
                <p className="text-[#7a5741] mt-2 text-sm leading-relaxed font-medium">Nail trimming, paw hygiene & care</p>
              </div>
            </Link>
            <Link href="/services/oral-hygiene-care">
              <div className="bg-white/50 backdrop-blur-md border border-white/30 h-full rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-2 group-hover:text-[#42291b] transition-colors">Oral Hygiene</h3>
                <p className="text-[#7a5741] mt-2 text-sm leading-relaxed font-medium">Oral cleaning & hygiene services</p>
              </div>
            </Link>
            <Link href="/services/bath-spa-addons">
              <div className="bg-white/50 backdrop-blur-md border border-white/30 h-full rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-2 group-hover:text-[#42291b] transition-colors">Hydra bath & Spa</h3>
                <p className="text-[#7a5741] mt-2 text-sm leading-relaxed font-medium">Spa, medicated & tick bath add-ons</p>
              </div>
            </Link>
            <Link href="/services/coat-skin-treatment">
              <div className="bg-white/50 backdrop-blur-md border border-white/30 h-full rounded-2xl p-6 shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-2 group-hover:text-[#42291b] transition-colors">Coat & Skin</h3>
                <p className="text-[#7a5741] mt-2 text-sm leading-relaxed font-medium">De-matting, de-shedding & oil massage</p>
              </div>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
