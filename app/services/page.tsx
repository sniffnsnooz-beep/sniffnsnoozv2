"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Scissors,
  Stethoscope,
  HeartHandshake,
  ShieldCheck,
  Footprints,
  Home,
  CheckCircle2,
  CalendarCheck,
  ChevronDown,
  HelpCircle,
  Sparkles,
  Star,
  PhoneCall,
  ArrowRight,
  ShieldAlert,
  Award,
  Clock
} from "lucide-react";

export default function ServicesPage() {
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

  const allServices = [
    {
      id: "grooming",
      title: "Pet Grooming & Spa Services",
      tagline: "Doorstep Van Spa & Luxury Salon Grooming",
      desc: "Complete pampering and hygiene care for dogs & cats. From bath, hair styling, nail care, to anti-tick treatments and hydra spa.",
      features: [
        "Doorstep Mobile Van & Store Salon",
        "Bath, Blow Dry & Fluffing",
        "Breed Specific Hair Trimming & Styling",
        "Nail Trimming & Paw Hygiene",
        "Medicated Anti-Tick & Skin Treatments"
      ],
      href: "/grooming",
      actionText: "View Grooming Details",
      icon: <Scissors className="w-8 h-8 text-[#5b3a26]" />,
      image: "/assets/pet_spa_bath.png",
      badge: "Most Popular"
    },
    {
      id: "veterinary",
      title: "Veterinary Care & Health Services",
      tagline: "Expert Vets, Vaccinations & Diagnostics",
      desc: "Full medical consultations, health checkups, preventive immunizations, blood & lab diagnostics, and urgent care by certified vets.",
      features: [
        "General & Preventive Health Checkups",
        "Puppy, Dog, Cat & Kitten Vaccinations",
        "Skin, Eye & Ear Infection Treatments",
        "Comprehensive Lab Diagnostics & Blood Tests",
        "Emergency Medical Consultations"
      ],
      href: "/veterinary",
      actionText: "Book Vet Consultation",
      icon: <Stethoscope className="w-8 h-8 text-[#5b3a26]" />,
      image: "/assets/servicelogo.png",
      badge: "Certified Vets"
    },
    {
      id: "companion",
      title: "Find a Companion",
      tagline: "Healthy, Certified Puppies & Kittens",
      desc: "Connect with verified, healthy pet companions. We guide you through breed selection, health checkups, and adoption onboarding.",
      features: [
        "Verified & Healthy Companions",
        "Comprehensive Breed Counseling",
        "Initial Health & Vaccination Verification",
        "Post-Adoption Care Guidance",
        "Ethical Companion Matchmaking"
      ],
      href: "/find-a-companion",
      actionText: "Explore Companions",
      icon: <HeartHandshake className="w-8 h-8 text-[#5b3a26]" />,
      image: "/assets/snifflogo.png",
      badge: "Companion Finder"
    },
    {
      id: "insurance",
      title: "Pet Insurance & Health Cover",
      tagline: "Financial Protection for Pet Emergencies",
      desc: "Protect your furry family members against unexpected illness, medical bills, surgery, and emergency hospitalization costs.",
      features: [
        "Accident & Illness Coverage",
        "Cashless Claims & Reimbursements",
        "Surgery & Hospitalization Support",
        "Flexible Monthly & Annual Plans",
        "Preventive Wellness Add-ons"
      ],
      href: "/pet-insurance",
      actionText: "Get Insurance Plan",
      icon: <ShieldCheck className="w-8 h-8 text-[#5b3a26]" />,
      image: "/assets/snifflogo.png",
      badge: "Health Shield"
    },
    {
      id: "sitting",
      title: "Pet Sitting & Dog Walking",
      tagline: "Personalized At-Home Care & Daily Exercise",
      desc: "Loving, certified pet sitters and walkers ensure your pet stays happy, exercised, and fed in the comfort of their home.",
      features: [
        "Daily Dog Walking & Exercise",
        "In-Home Pet Sitting & Supervision",
        "Feeding & Medication Management",
        "Live Activity Updates & Photos",
        "Flexible Hourly & Daily Visits"
      ],
      href: "/store-booking",
      actionText: "Book Pet Sitter / Walker",
      icon: <Footprints className="w-8 h-8 text-[#5b3a26]" />,
      image: "/assets/pet_spa_bath.png",
      badge: "Loved by Pets"
    },
    {
      id: "boarding",
      title: "Pet Boarding & Daycare",
      tagline: "Safe, Monitored & Cozy Stays",
      desc: "Comfortable, climate-controlled boarding suites with 24/7 care, playtime, and nutritional meal monitoring while you travel.",
      features: [
        "Short-term & Long-term Boarding",
        "Cage-Free Play Areas & Supervision",
        "Customized Feeding & Care Plans",
        "24/7 Veterinary Support On-Call",
        "Daily Video & Photo Reports"
      ],
      href: "/packages",
      actionText: "Book Boarding Stay",
      icon: <Home className="w-8 h-8 text-[#5b3a26]" />,
      image: "/assets/servicelogo.png",
      badge: "24/7 Monitored Stay"
    }
  ];

  const servicesFaqs = [
    {
      q: "Sniff & Snooz kya kya pet care services provide karta hai?",
      a: "Hum 6 primary pet services provide karte hain: 1) Doorstep & Salon Grooming, 2) Veterinary Consultations & Vaccinations, 3) Find a Companion (Puppies & Kittens), 4) Pet Health Insurance, 5) In-Home Pet Sitting & Dog Walking, aur 6) Luxury Pet Boarding & Daycare."
    },
    {
      q: "Main doorstep grooming ya vet service kaise book kar sakta hu?",
      a: "Aap hamare website ke 'Book Appointment' button par click karke apni preferred date, location, aur service choose kar sakte hain. Aap direct call karke bhi booking request kar sakte hain (+91 98187 28444)."
    },
    {
      q: "Kya aapki services poore Delhi NCR me available hain?",
      a: "Haan! Hamari doorstep van grooming, vet visits, pet sitting, aur companion delivery services Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad, aur Faridabad me fully operational hain."
    },
    {
      q: "Pet Insurance me kya kya cover hota hai?",
      a: "Pet Insurance me sudden illness, accidents, surgeries, hospitalization, lab diagnostic tests, aur emergency medical expenses cover hote hain."
    },
    {
      q: "Pet Boarding ke waqt mere pet ka khayal kaise rakha jata hai?",
      a: "Hamare boarding facility me climate-controlled private suites, 24/7 attendant care, fresh nutritious meals, daily play sessions, aur daily photo/video updates milte hain."
    },
    {
      q: "Find a Companion service me puppies aur kittens vaccinated hote hain?",
      a: "Bilkul! Hamare dwara listed sabhi companions certified, health-checked, aur age-appropriate vaccinations ke saath aate hain."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Complete Pet Care Services - Sniff & Snooz",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pet Services Catalog",
      "itemListElement": allServices.map((s, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.title,
          "description": s.desc
        },
        "position": idx + 1
      }))
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": servicesFaqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="relative min-h-screen py-24 page-bg overflow-hidden">
        {/* PARALLAX BACKGROUND IMAGE */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            ref={parallaxRef}
            src="/assets/servicelogo.png"
            alt="Pet Care Services Overview"
            className="absolute left-1/2 top-[40%] w-[620px] max-w-[98vw] opacity-[0.12] parallax-image select-none"
            style={{ transform: "translate(-50%, -50%)" }}
          />
        </div>

        {/* FLOATING LIGHT SHAPES */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-56 h-56 bg-white/50 blur-[90px] rounded-full animate-bounce-slow" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#e6d3c2]/50 blur-[110px] rounded-full animate-bounce-medium" />
        </div>

        {/* CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">

          {/* HERO SECTION */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <div className="section-label mb-6">
                <span>✨</span> All-In-One Pet Solutions
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-6 drop-shadow-sm leading-tight">
                Complete 360° <br /> <span className="shimmer-text">Pet Care Services</span>
              </h1>
              <p className="text-lg text-[#7a5741] max-w-2xl font-medium leading-relaxed mb-8">
                From luxury doorstep grooming, expert veterinary care, and companion matchmaking to pet health insurance, sitting, and 24/7 boarding—we cater to every need of your beloved pet.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Link href="/booking" className="btn-primary !px-7 !py-3.5 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5" /> Book Doorstep Service
                </Link>
                <a href="tel:+919818728444" className="btn-secondary !px-7 !py-3.5 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5" /> Call Helpline
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full relative"
            >
              <div className="w-full h-[460px] rounded-[40px] overflow-hidden shadow-2xl relative border-8 border-white">
                <Image
                  src="/assets/servicelogo.png"
                  alt="Sniff & Snooz Pet Care Services"
                  fill
                  style={{ objectFit: "cover" }}
                  className="hover:scale-105 transition-transform duration-700 brightness-95"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/80 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#5b3a26] text-white flex items-center justify-center text-2xl font-bold">
                  🐾
                </div>
                <div>
                  <div className="text-xs text-[#7a5741] font-bold">Trusted by 2000+ Pet Parents</div>
                  <div className="text-sm text-[#5b3a26] font-bold">4.9 ★ Rating across Delhi NCR</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* SERVICES GRID */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#5b3a26] mb-4">
              Explore Our <span className="italic gradient-text">Pet Services</span>
            </h2>
            <p className="text-lg text-[#7a5741] max-w-2xl mx-auto font-medium">
              Everything your pet requires for health, hygiene, protection, and happiness under one roof.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          >
            {allServices.map((service, index) => (
              <motion.div variants={itemVariants} key={service.id} className="flex h-full">
                <div className="card-premium h-full p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden w-full">
                  <span className="absolute top-4 right-4 bg-[#5b3a26]/10 text-[#5b3a26] text-xs px-3 py-1 rounded-full font-bold">
                    {service.badge}
                  </span>

                  <div>
                    <div className="p-4 bg-white/80 rounded-2xl shadow-sm text-[#5b3a26] group-hover:bg-[#5b3a26] group-hover:text-white transition-all duration-300 group-hover:scale-110 w-fit mb-6">
                      {service.icon}
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#5b3a26] mb-1 group-hover:text-[#8c5a3b] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#8c5a3b] font-bold uppercase tracking-wider mb-3">
                      {service.tagline}
                    </p>
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

                  <Link href={service.href} className="mt-4 pt-4 border-t border-[#5b3a26]/10 font-bold text-[#5b3a26] flex items-center justify-between group-hover:text-[#8c5a3b] transition-colors">
                    <span>{service.actionText}</span>
                    <span className="w-8 h-8 rounded-full bg-[#f6efe6] flex items-center justify-center group-hover:bg-[#5b3a26] group-hover:text-white transition-all transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* WHY CHOOSE US HIGHLIGHTS */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 border border-white/80 shadow-xl mb-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#5b3a26] mb-3">Why Pet Parents Trust Sniff & Snooz</h3>
              <p className="text-[#7a5741]">Uncompromised safety, certified experts, and doorstep convenience.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { title: "Certified Groomers & Vets", desc: "Trained professionals handling your pet with extreme care & patience.", icon: <Award className="w-8 h-8 text-[#5b3a26]" /> },
                { title: "Doorstep Convenience", desc: "Mobile spa vans & home vet visits right at your location.", icon: <Sparkles className="w-8 h-8 text-[#5b3a26]" /> },
                { title: "100% Organic & Safe", desc: "Skin-friendly, toxin-free, and veterinary-approved products.", icon: <ShieldCheck className="w-8 h-8 text-[#5b3a26]" /> },
                { title: "24/7 Care & Support", desc: "Emergency medical support and monitored pet boarding.", icon: <Clock className="w-8 h-8 text-[#5b3a26]" /> }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/80 shadow-sm flex flex-col items-center">
                  <div className="p-4 bg-[#f6efe6] rounded-2xl mb-4">{item.icon}</div>
                  <h4 className="text-lg font-serif font-bold text-[#5b3a26] mb-2">{item.title}</h4>
                  <p className="text-[#7a5741] text-xs leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQS SECTION WITH ACCORDION */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-[#5b3a26] px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
              </div>
              <h2 className="text-4xl font-serif font-bold text-[#5b3a26] mb-3">Services FAQs</h2>
              <p className="text-[#7a5741]">Everything you need to know about Sniff & Snooz pet services.</p>
            </div>

            <div className="space-y-4">
              {servicesFaqs.map((faq, idx) => (
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

        {/* STICKY FLOATING CTA */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <Link href="/booking" className="btn-primary shadow-[0_20px_40px_rgba(91,58,38,0.4)] border border-white/20 !px-6 !py-3 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5" /> Book Any Service Now
          </Link>
        </motion.div>
      </section>
    </>
  );
}
