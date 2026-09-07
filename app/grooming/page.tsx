"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FoliageAccents from "@/components/FoliageAccents";
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

import { corePackageTiers } from "@/data/packages";

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
      title: "Bath & Spa",
      desc: "Warm bath with imported organic shampoos, blow dry, ear cleaning, paw butter, and pet perfume for maximum hygiene.",
      features: ["Organic Shampoo & Conditioner Bath", "Warm Air Blow Dry & Coat Fluffing", "Ear Hygiene & Sanitization", "Nail Trimming & Filing", "Soothing Paw Butter Application"],
      href: "/store-booking",
      icon: <Bath className="w-8 h-8 text-[#5b3a26]" />,
      popular: true,
      priceTag: "Starts at ₹599"
    },
    {
      title: "Haircut & Styling",
      desc: "Professional breed-specific haircuts, teddy bear styling, face sculpting, and sanitary trimming by master stylists.",
      features: ["Full Breed Specific Haircut", "Face & Sanitary Trimming", "De-matting & Coat Combing", "Precision Scissoring & Finishing", "Pet Fragrance Spray"],
      href: "/store-booking",
      icon: <Scissors className="w-8 h-8 text-[#5b3a26]" />,
      popular: true,
      priceTag: "Starts at ₹1,799"
    },
    {
      title: "Anti-Tick & Flea Treatment",
      desc: "Specialized medicated anti-parasite bath, flea comb out, and long-lasting coat protection spray against ticks.",
      features: ["Medicated Anti-Tick Bath", "Fine Flea Comb Out", "Anti-Itch Skin Conditioning", "Tick Shield Coat Spray", "Sanitary Clearance"],
      href: "/store-booking",
      icon: <ShieldCheck className="w-8 h-8 text-[#5b3a26]" />,
      popular: false,
      priceTag: "Starts at ₹1,599"
    },
    {
      title: "De-shedding Treatment",
      desc: "Deep undercoat deshedding, dead hair removal, and shedding control bath to reduce home fur shedding by up to 90%.",
      features: ["Undercoat Furminator Comb Out", "De-shedding Shampoo Bath", "Coat Strengthening Conditioner", "High-Velocity Blow Out", "Nail & Paw Care"],
      href: "/store-booking",
      icon: <Sparkles className="w-8 h-8 text-[#5b3a26]" />,
      popular: false,
      priceTag: "Starts at ₹1,399"
    },
    {
      title: "Medicated Bath & Skin Spa",
      desc: "Dermatologically formulated anti-fungal bath, neem oil massage, and soothing therapy for itchy or sensitive skin.",
      features: ["Medicated Anti-Fungal Shampoo", "Skin Soothing Organic Bath", "Warm Coconut Coat Oil Massage", "Hypoallergenic Conditioning", "Ear & Paw Hygiene"],
      href: "/store-booking",
      icon: <Bath className="w-8 h-8 text-[#5b3a26]" />,
      popular: false,
      priceTag: "Starts at ₹1,499"
    },
    {
      title: "Ear & Nail Care",
      desc: "Gentle nail clipping, filing/smoothing, ear canal hair plucking, wax clearance, and moisturizing paw balm.",
      features: ["Precision Nail Trimming", "Nail Filing & Edge Smoothing", "Ear Canal Hair Plucking", "Ear Wax Cleaning & Flush", "Moisturizing Paw Balm"],
      href: "/store-booking",
      icon: <CheckCircle2 className="w-8 h-8 text-[#5b3a26]" />,
      popular: false,
      priceTag: "Starts at ₹399"
    },
    {
      title: "Dental & Oral Hygiene",
      desc: "Enzyme tooth brushing, breath freshener spray, tartar prevention check, and gum massage for fresh breath.",
      features: ["Enzyme Tooth Brushing", "Breath Freshener Spray", "Gum Inspection & Massage", "Tartar Control Brush", "Plaque Protection"],
      href: "/store-booking",
      icon: <Award className="w-8 h-8 text-[#5b3a26]" />,
      popular: false,
      priceTag: "Starts at ₹499"
    }
  ];

  const groomingFaqs = [
    {
      q: "How much does dog grooming cost in Gurgaon?",
      a: "Dog grooming in Gurgaon at Sniffnsnooz starts at ₹599 for our Basic Bath & Hygiene package. Our Classic Grooming package with hygiene styling is ₹1,399, Signature Breed Styling is ₹1,799, and Luxury Hydra Spa package is ₹2,199. We also offer 4+1 Spa Bath Combo saver packs starting at ₹3,549."
    },
    {
      q: "Is mobile grooming better for anxious dogs?",
      a: "Yes! Mobile van grooming is ideal for nervous or anxious dogs because it eliminates car travel stress, waiting rooms, barking dogs, and unfamiliar salon environments. Your dog gets 1-on-1 personalized attention right outside your home in a quiet, temperature-controlled mobile van."
    },
    {
      q: "How often should my dog be groomed?",
      a: "Dogs generally require grooming every 3 to 6 weeks depending on coat length, breed, and lifestyle. Long-haired breeds (like Shih Tzus, Poodles, and Pomeranians) need grooming every 3-4 weeks to prevent matting, while short-haired breeds (like Labradors and Beagles) benefit from monthly hygiene baths."
    },
    {
      q: "Do you groom cats at home?",
      a: "Yes! Sniffnsnooz provides certified doorstep cat grooming across Gurgaon and Delhi NCR. Our gentle, fear-free cat groomers specialize in cat baths, lion cuts, de-matting, ear cleaning, and nail trimming without anesthesia or stress."
    },
    {
      q: "Do you provide anti-tick grooming?",
      a: "Yes, we offer specialized Anti-Tick & Flea Medicated Grooming (₹1,599). It includes a medicated anti-parasite bath, fine-tooth flea combing, skin-soothing conditioning, and a protective coat shield spray to eliminate ticks safely."
    },
    {
      q: "How long does a grooming session take?",
      a: "A standard Bath & Hygiene session takes about 45 to 60 minutes. Full haircut and luxury spa packages take 75 to 105 minutes depending on breed size, coat condition, and pet behavior. We prioritize gentleness over speed."
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
        {/* BOTANICAL FOLIAGE ACCENTS */}
        <FoliageAccents position="top-right" size="xl" className="opacity-90" />
        <FoliageAccents position="bottom-left" size="xl" className="opacity-90" />
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
                      <div className="flex items-center justify-between mb-6">
                        <div className="p-4 bg-white/80 rounded-2xl shadow-sm text-[#5b3a26] group-hover:bg-[#5b3a26] group-hover:text-white transition-all duration-300 group-hover:scale-110 w-fit">
                          {service.icon}
                        </div>
                        <span className="text-xs font-bold bg-[#f6efe6] text-[#5b3a26] border border-[#e5d6c5] px-3 py-1.5 rounded-full">
                          {service.priceTag}
                        </span>
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
                      <span>Book Service Now</span>
                      <span className="w-8 h-8 rounded-full bg-[#f6efe6] flex items-center justify-center group-hover:bg-[#5b3a26] group-hover:text-white transition-all transform group-hover:translate-x-1">&rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* TRANSPARENT PACKAGES & PRICES SECTION */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="section-label mb-3 inline-flex">
                <span>🏷️</span> Transparent Rates
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#5b3a26] mb-3">
                Grooming Packages &amp; Pricing
              </h2>
              <p className="text-base sm:text-lg text-[#7a5741] max-w-2xl mx-auto font-medium">
                No hidden costs. See exact package inclusions and prices for doorstep mobile van grooming and salon sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corePackageTiers.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`card-premium p-6 flex flex-col justify-between relative bg-white/90 border ${pkg.popular ? "border-[#5b3a26] ring-2 ring-[#5b3a26]/20 shadow-xl" : "border-white/80 shadow-md"}`}
                >
                  {pkg.badge && (
                    <span className={`absolute top-4 right-4 text-xs font-extrabold px-3 py-1 rounded-full ${pkg.popular ? "bg-[#5b3a26] text-white" : "bg-amber-100 text-amber-900 border border-amber-200"}`}>
                      {pkg.badge}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-1 pr-16">{pkg.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-black text-[#5b3a26]">₹{pkg.price}</span>
                      <span className="text-sm text-gray-400 line-through font-semibold">₹{pkg.originalPrice}</span>
                      <span className="text-xs text-[#8c5a3b] font-bold">({pkg.duration})</span>
                    </div>
                    <p className="text-xs text-[#7a5741] mb-5 leading-relaxed font-medium">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-xs font-semibold text-[#5b3a26]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 mr-2 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/store-booking" className={`w-full text-center font-bold py-3 rounded-full text-sm transition-colors ${pkg.popular ? "bg-[#5b3a26] text-white hover:bg-[#432b1c]" : "bg-[#f6efe6] text-[#5b3a26] hover:bg-[#eadfce] border border-[#d8c3b0]"}`}>
                    Select {pkg.name.split(" ")[0]} Package 🐾
                  </Link>
                </div>
              ))}
            </div>
          </div>

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
