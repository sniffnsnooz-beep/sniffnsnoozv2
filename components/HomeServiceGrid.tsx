"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scissors, Heart, Shield, Stethoscope, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    title: "Pet Grooming",
    icon: <Scissors className="w-8 h-8 text-amber-700" />,
    description: "Premium doorstep grooming services for dogs and cats using top professional products.",
    highlights: ["Bath & Spa Add-ons", "Expert Hair Styling", "Nail & Paw Hygiene"],
    link: "/services",
    btnText: "Book Grooming 🐾",
    bgColor: "from-amber-50/70 to-orange-50/70",
    borderColor: "border-orange-100",
  },
  {
    title: "Veterinary Services",
    icon: <Stethoscope className="w-8 h-8 text-red-700" />,
    description: "Professional medical checkups and vaccinations conducted by verified vets at home.",
    highlights: ["Doorstep Home Visit", "Core & Non-core Vaccines", "Routine Health Checkup"],
    link: "/veterinary",
    btnText: "Consult Vet 🩺",
    bgColor: "from-red-50/50 to-pink-50/50",
    borderColor: "border-red-100",
  },
  {
    title: "Pet Companion Consultation",
    icon: <Heart className="w-8 h-8 text-emerald-700" />,
    description: "Guidance and expert support to connect you with ethical, verified sources.",
    highlights: ["Lifestyle Breed Matching", "One-on-One Guidance", "Verified & Ethical Sources"],
    link: "/find-a-companion",
    btnText: "Find a Companion 🐩",
    bgColor: "from-emerald-50/50 to-teal-50/50",
    borderColor: "border-emerald-100",
  },
  {
    title: "Pet Insurance Guidance",
    icon: <Shield className="w-8 h-8 text-blue-700" />,
    description: "Explore the best annual health protection plans for medical emergencies and surgeries.",
    highlights: ["Surgery & Accident Cover", "Emergency Support", "Third-Party Liability"],
    link: "/pet-insurance",
    btnText: "Protect Pet 🛡️",
    bgColor: "from-blue-50/50 to-cyan-50/50",
    borderColor: "border-blue-100",
  },
];

export default function HomeServiceGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#fdf9f5] relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">
            <span>✨</span> Sniffnsnooz Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#5b3a26] mt-4 mb-4">
            Everything Your Pet Needs, <span className="gradient-text italic">Redefined</span>
          </h2>
          <p className="text-lg text-[#7a5741] max-w-2xl mx-auto">
            Explore our premium pet services designed to bring absolute wellness, style, and care right to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className={`card-premium p-8 rounded-3xl bg-gradient-to-br ${cat.bgColor} border ${cat.borderColor} flex flex-col justify-between group h-full shadow-sm hover:shadow-xl transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                    Ecosystem #{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#5b3a26] mb-3">
                  {cat.title}
                </h3>
                <p className="text-[#7a5741] text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>

                {/* HIGHLIGHTS */}
                <div className="space-y-2 mb-8">
                  {cat.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-[#5b3a26]">
                      <span className="w-1.5 h-1.5 bg-[#8c5a3b] rounded-full shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href={cat.link} className="mt-auto">
                <span className="w-full inline-flex items-center justify-center gap-2 bg-[#5b3a26] text-white hover:bg-orange-950 transition-colors py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md cursor-pointer">
                  {cat.btnText} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
