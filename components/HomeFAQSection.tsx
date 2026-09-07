"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";
import { useRef } from "react";

const faqs = [
  {
    q: "How much does dog grooming cost in Gurgaon?",
    a: "Dog grooming in Gurgaon at Sniffnsnooz starts at ₹599 for our Basic Bath & Hygiene package. Our Classic Grooming package with hygiene styling is ₹1,399, Signature Breed Styling is ₹1,799, and Luxury Hydra Spa package is ₹2,199. We also offer 4+1 Spa Bath Combo saver packs starting at ₹3,549.",
  },
  {
    q: "Is mobile grooming better for anxious dogs?",
    a: "Yes! Mobile van grooming is ideal for nervous or anxious dogs because it eliminates car travel stress, waiting rooms, barking dogs, and unfamiliar salon environments. Your dog gets 1-on-1 personalized attention right outside your home in a quiet, temperature-controlled mobile van.",
  },
  {
    q: "How often should my dog be groomed?",
    a: "Dogs generally require grooming every 3 to 6 weeks depending on coat length, breed, and lifestyle. Long-haired breeds (like Shih Tzus, Poodles, and Pomeranians) need grooming every 3-4 weeks to prevent matting, while short-haired breeds (like Labradors and Beagles) benefit from monthly hygiene baths.",
  },
  {
    q: "Do you groom cats at home?",
    a: "Yes! Sniffnsnooz provides certified doorstep cat grooming across Gurgaon and Delhi NCR. Our gentle, fear-free cat groomers specialize in cat baths, lion cuts, de-matting, ear cleaning, and nail trimming without anesthesia or stress.",
  },
  {
    q: "Do you provide anti-tick grooming?",
    a: "Yes, we offer specialized Anti-Tick & Flea Medicated Grooming (₹1,599). It includes a medicated anti-parasite bath, fine-tooth flea combing, skin-soothing conditioning, and a protective coat shield spray to eliminate ticks safely.",
  },
  {
    q: "How long does a grooming session take?",
    a: "A standard Bath & Hygiene session takes about 45 to 60 minutes. Full haircut and luxury spa packages take 75 to 105 minutes depending on breed size, coat condition, and pet behavior. We prioritize gentleness over speed.",
  },
  {
    q: "What products does Sniffnsnooz use?",
    a: "We use 100% pet-safe, organic, paraben-free, and pH-balanced shampoos & coat conditioners (like Hydra Professional and Bio-Groom) imported for sensitive pet skin.",
  },
];

export default function HomeFAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative py-28 bg-gradient-to-t from-[#f6efe6] via-[#f2e9df] to-[#eadfce] overflow-hidden">

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-[#e6d3c2]/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-white/30 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/50 backdrop-blur-md shadow-sm border border-white mb-6">
            <MessageCircleQuestion className="w-8 h-8 text-[#8c5a3b]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#5b3a26] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#7a5741] max-w-2xl mx-auto">
            Trusted answers about our premium doorstep pet grooming services and how we keep your furry friend safe.
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <motion.div
                variants={itemVariants}
                key={i}
                className={`
                  bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md
                  ${isOpen ? "shadow-lg bg-white/70 border-white/80" : ""}
                `}
              >
                {/* QUESTION */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-8 py-6 text-left"
                >
                  <span className={`text-[17px] font-semibold transition-colors duration-300 ${isOpen ? "text-[#8c5a3b]" : "text-[#5b3a26]"}`}>
                    {item.q}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? "#8c5a3b" : "#f6efe6", color: isOpen ? "#fff" : "#8c5a3b" }}
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-4 shadow-sm"
                  >
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </motion.div>
                </button>

                {/* ANSWER */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-6 pt-2">
                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#eadfce] to-transparent mb-4" />
                        <p className="text-[#7a5741] text-[16px] leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* =========================
            CTA — STILL HAVE QUESTIONS
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center bg-white/40 backdrop-blur-md rounded-[40px] p-10 border border-white/60 shadow-lg"
        >
          <h3 className="text-2xl font-serif text-[#5b3a26] mb-3">Still have questions?</h3>
          <p className="text-[#6b4a35] mb-8 text-lg">
            Whether it's about grooming, specific products, or finding the perfect time slot—we are here to help!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#5b3a26] text-white px-8 py-4 rounded-full font-medium shadow-md shadow-[#5b3a26]/20 transition-all hover:bg-[#462c1d]"
              >
                Contact Us
              </motion.button>
            </Link>

            <Link href="/store-booking" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#fff" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white/50 border border-[#5b3a26] text-[#5b3a26] px-8 py-4 rounded-full font-medium shadow-sm transition-all hover:shadow-md"
              >
                Book Grooming
              </motion.button>
            </Link>
          </div>
        </motion.div>

      </div>

      {/* =========================
          🧠 FAQ STRUCTURED DATA
      ========================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
