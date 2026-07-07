"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Stethoscope,
  Syringe,
  Microscope,
  CalendarCheck,
  HeartPulse,
  CheckCircle2,
  Droplets,
  HelpCircle,
  BookOpen,
  Phone,
  ShieldAlert,
  ChevronDown
} from "lucide-react";

// Age group datasets
const ageGroups = [
  {
    id: "puppy",
    label: "Puppy Care (0-1 Year) 🐶",
    intro: "Setting the foundation for a lifetime of good health. Puppies require a sequence of core vaccinations to build strong immunity against common viral pathogens.",
    vaccines: [
      { name: "DHLPPi (9-in-1 Vaccine)", price: "₹899", schedule: "6-8 Weeks, Booster every 3 weeks till 16 weeks", protects: "Parvovirus, Canine Distemper, Hepatitis, Leptospirosis, Parainfluenza" },
      { name: "Canine Coronavirus Vaccine", price: "₹599", schedule: "8-10 Weeks, Booster at 12 Weeks", protects: "Coronavirus Enteritis (highly contagious digestive tract disease)" },
      { name: "Anti-Rabies Vaccine (ARV)", price: "₹299", schedule: "12 Weeks, booster at 16 weeks & annually", protects: "Rabies virus (100% fatal zoonotic disease)" },
      { name: "Puppy Oral Deworming", price: "₹199", schedule: "Every month till 6 months of age", protects: "Roundworms, Hookworms, Tapeworms, Whipworms" }
    ],
    tests: [
      { name: "Complete Blood Count (CBC)", price: "₹799", reason: "Standard check for congenital anemia, low platelets, or early bacterial/viral infections." },
      { name: "Fecal / Stool Test for Parasites", price: "₹399", reason: "Crucial for identifying parasitic infestations like Giardia or Coccidia common in puppies." }
    ],
    tips: [
      "Avoid public parks or contact with unvaccinated dogs until the complete puppy vaccine schedule is completed at 16 weeks.",
      "Deworm your puppy monthly until 6 months of age, as they have a higher susceptibility to intestinal worms.",
      "Feed puppy-formulated kibble rich in DHA for optimal brain and eye development."
    ]
  },
  {
    id: "kitten",
    label: "Kitten Care (0-1 Year) 🐱",
    intro: "Kittens require a systematic schedule of immunizations. Early preventive care secures them against highly infectious feline diseases.",
    vaccines: [
      { name: "FVRCP / Tricat (3-in-1 Vaccine)", price: "₹949", schedule: "8 Weeks, Booster every 3-4 weeks till 16 weeks", protects: "Feline Rhinotracheitis, Calicivirus, Panleukopenia" },
      { name: "Feline Leukemia (FeLV) Vaccine", price: "₹1,199", schedule: "12 Weeks, Booster at 16 weeks", protects: "Feline Leukemia Virus (causes immune suppression and cancer)" },
      { name: "Anti-Rabies Vaccine (ARV)", price: "₹299", schedule: "12-16 Weeks, Annually", protects: "Rabies virus (fatal brain inflammation)" },
      { name: "Kitten Oral Deworming", price: "₹199", schedule: "Every month till 6 months of age", protects: "Intestinal roundworms and hookworms" }
    ],
    tests: [
      { name: "FeLV/FIV Combo Screening", price: "₹1,499", reason: "Essential for newly adopted kittens to rule out Feline Leukemia and Immunodeficiency viruses." },
      { name: "Complete Blood Count (CBC)", price: "₹799", reason: "Checks general hydration, infection levels, and red/white blood cell health." }
    ],
    tips: [
      "Provide high-moisture kitten food (canned wet food) to encourage proper hydration and maintain healthy urinary tract function.",
      "Get kittens accustomed to claw trimming, ear cleaning, and teeth brushing early to ensure stress-free adult sessions.",
      "Schedule sterilization (spay/neuter) around 5-6 months of age for behavioral and health advantages."
    ]
  },
  {
    id: "adult-dog",
    label: "Adult Dog (1-7 Years) 🐕",
    intro: "Maintaining robust immunity and monitoring organ function through routine diagnostics. Adult dogs require annual booster shots to keep their antibody levels high.",
    vaccines: [
      { name: "Annual 9-in-1 Booster (DHLPPi)", price: "₹999", schedule: "Once a year (Annual)", protects: "Parvo, Distemper, Adenovirus, Leptospirosis, Parainfluenza booster" },
      { name: "Annual Anti-Rabies Booster", price: "₹349", schedule: "Once a year (Annual)", protects: "Rabies virus long-term immunity" },
      { name: "Canine Corona Booster", price: "₹649", schedule: "Once a year (Annual)", protects: "Fecal-oral viral transmission defense" },
      { name: "Adult Dog Deworming Tablet", price: "₹249", schedule: "Every 3 months (Quarterly)", protects: "Broad spectrum protection against gastrointestinal parasites" }
    ],
    tests: [
      { name: "Annual Blood Health Check (Standard Panel)", price: "₹1,499", reason: "Detects hidden infections, early signs of kidney or liver decline, and diabetes." },
      { name: "Tick Fever / Vector-Borne Screening", price: "₹1,899", reason: "Crucial screening in Delhi NCR to detect Ehrlichia, Anaplasma, or Babesia before critical phases." }
    ],
    tips: [
      "Conduct professional blood tests annually. Routine profiles catch chronic conditions before clinical symptoms show.",
      "Maintain a strict quarterly deworming cycle, especially if your dog frequents parks or outdoor walks.",
      "Brush your dog's teeth weekly or use veterinary-approved dental chews to prevent painful tartar buildup."
    ]
  },
  {
    id: "adult-cat",
    label: "Adult Cat (1-7 Years) 🐈",
    intro: "Indoor cats still require vaccination and health tracking. Cats excel at hiding pain, making periodic blood diagnostic profiles essential.",
    vaccines: [
      { name: "Annual FVRCP Booster (3-in-1)", price: "₹999", schedule: "Once a year (Annual)", protects: "Feline respiratory viruses and panleukopenia booster" },
      { name: "Annual Anti-Rabies Booster", price: "₹349", schedule: "Once a year (Annual)", protects: "Feline rabies protection" },
      { name: "FeLV Annual Booster", price: "₹1,249", schedule: "Once a year (Annual)", protects: "Feline leukemia protection booster" },
      { name: "Adult Cat Deworming Tablet", price: "₹249", schedule: "Every 3 months (Quarterly)", protects: "Gastrointestinal worms protection" }
    ],
    tests: [
      { name: "Kidney & Liver Preventive Profile (KFT/LFT)", price: "₹1,799", reason: "Highly recommended for adult cats since renal issues are a primary health risk for older felines." },
      { name: "Urinalysis with Sediment", price: "₹599", reason: "Screens for microscopic crystals, bacteria, and early feline lower urinary tract disease (FLUTD)." }
    ],
    tips: [
      "Ensure multiple fresh water sources are available (like water fountains) to prevent urinary blockage risks common in male cats.",
      "Incorporate wet food regularly in their diet to maximize natural fluid intake and reduce renal strain.",
      "Perform periodic weight checks at home. Unexplained weight loss is often the first indicator of thyroid or kidney issues."
    ]
  }
];

const faqs = [
  {
    q: "Why does Sniff n Snooz separate puppy, kitten, and adult veterinary care?",
    a: "Different life stages require distinct medical protocols. Puppies and kittens require multiple initial immunizations spaced weeks apart to overcome maternal antibody interference. Adult pets only require annual single-dose boosters and periodic diagnostic tests (such as our Annual Blood Health Check) to monitor organ health."
  },
  {
    q: "How does the pricing on Sniff n Snooz compare with other veterinary services?",
    a: "We practice complete pricing transparency. Our consultation starts at a minimal ₹99, mirroring the honest model of Lifeline Pet Care. While other premium services in the Delhi NCR region offer clinical and home vet models at higher rates, Sniff n Snooz combines doorstep convenience, top certified vets, and premium home grooming at highly competitive pricing under one integrated service network."
  },
  {
    q: "What is included in the Annual Blood Health Check?",
    a: "It includes a Complete Blood Count (CBC) to screen for anemia and infections, a Liver Function Test (LFT) checking vital hepatic enzymes, a Kidney Function Test (KFT) to measure creatinine and urea levels, and glucose testing. This is the single most effective way to catch chronic conditions before symptoms start showing."
  },
  {
    q: "How often should my adult pet be dewormed?",
    a: "Adult dogs and cats should be dewormed once every 3 months (quarterly) with a broad-spectrum deworming tablet. Outdoor pets, active chewers, or pets that hunt insects may require a monthly or bi-monthly schedule upon veterinary recommendation."
  },
  {
    q: "Can vaccines be administered at home?",
    a: "Yes! Routine preventive care, basic consultations, and vaccinations can be easily and safely administered at your home by our certified and experienced mobile veterinarians, minimizing clinic visit stress for anxious pets."
  }
];

const vetTips = [
  { title: "Hydration Alert", text: "Ensure cats get wet food to prevent kidney stones, and dogs have cool water available throughout the warm Delhi NCR summers." },
  { title: "Tick Fever Prevention", text: "Tick-borne diseases are extremely prevalent in Gurgaon, Noida, and Delhi. Use regular vet-approved spot-on treatments." },
  { title: "Avoid Zoonotic Risks", text: "Keep anti-rabies vaccines up to date. Rabies is 100% fatal but 100% preventable via annual immunizations." },
  { title: "Regular Health Screens", text: "Because pets age much faster than humans, an annual checkup is equivalent to a human doctor visit every 7 years." }
];

export default function VeterinaryPage() {
  const [activeTab, setActiveTab] = useState("puppy");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const parallaxRef = useRef<HTMLImageElement | null>(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.08}px) scale(1.02)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeGroupData = ageGroups.find((g) => g.id === activeTab) || ageGroups[0];

  return (
    <section className="relative min-h-screen page-bg overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          ref={parallaxRef}
          src="/assets/servicelogo.png"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-[40%] w-[680px] max-w-[100vw] opacity-[0.08] select-none"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>

      {/* Floating Blobs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-24 left-8 w-64 h-64 bg-white/40 blur-[85px] rounded-full animate-bounce-slow" />
        <div className="absolute bottom-36 right-8 w-80 h-80 bg-[#e6d3c2]/40 blur-[100px] rounded-full animate-bounce-medium" />
      </motion.div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-10 pb-32">

        {/* HERO SECTION */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-label mb-6 mx-auto inline-flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-red-500" /> Veterinary Care System
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-[#5b3a26] mb-6 leading-tight">
              Honest Veterinary Care <br />
              <span className="shimmer-text">For Every Stage of Life</span>
            </h1>
            <p className="text-lg text-[#7a5741] font-medium leading-relaxed max-w-2xl mx-auto">
              Transparent packages, professional diagnostics, and vet consultations. Curated from the trusted pricing standard of{" "}
              <a href="https://lifelinepetcare.in" target="_blank" rel="noopener noreferrer" className="mx-1 text-[#5b3a26] underline font-bold hover:text-[#8c5a3b]">Lifeline Pet Care</a>.
            </p>
          </motion.div>
        </div>

        {/* AGE GROUP TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ageGroups.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all shadow-sm ${
                activeTab === tab.id
                  ? "bg-[#5b3a26] text-white border-[#5b3a26] scale-105 shadow-md"
                  : "bg-white/80 text-[#5b3a26] border-[#e8d8cc] hover:border-[#5b3a26]/40 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT PANEL */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24"
          >
            {/* Left: Intro & Vaccines */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-premium p-8">
                <h2 className="text-2xl font-serif font-bold text-[#5b3a26] mb-3 flex items-center gap-2">
                  <Syringe className="w-6 h-6 text-[#8c5a3b]" /> Recommended Vaccinations
                </h2>
                <p className="text-[#7a5741] text-sm mb-6 leading-relaxed font-medium">
                  {activeGroupData.intro}
                </p>

                {/* Vaccines Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#f0e8df] text-[#5b3a26] font-bold">
                        <th className="pb-3 pr-4">Vaccine Name</th>
                        <th className="pb-3 pr-4 hidden sm:table-cell">Protecting Against</th>
                        <th className="pb-3 pr-4">Pricing</th>
                        <th className="pb-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0e8df] text-[#6b4a35] font-medium">
                      {activeGroupData.vaccines.map((v, i) => (
                        <tr key={i} className="hover:bg-[#fcfaf7] transition-colors">
                          <td className="py-4 pr-4">
                            <span className="font-bold text-[#5b3a26] block">{v.name}</span>
                            <span className="text-xs text-[#8c5a3b] block mt-0.5 sm:hidden">Protects: {v.protects}</span>
                            <span className="text-xs text-[#7a5741] block mt-0.5">{v.schedule}</span>
                          </td>
                          <td className="py-4 pr-4 hidden sm:table-cell text-xs leading-relaxed max-w-xs">{v.protects}</td>
                          <td className="py-4 pr-4 font-bold text-[#8c5a3b] text-base">{v.price}</td>
                          <td className="py-4">
                            <Link href="/veterinary-booking" className="inline-flex items-center text-xs font-bold text-[#5b3a26] hover:text-[#8c5a3b] bg-white border border-[#e8d8cc] rounded-lg px-2.5 py-1.5 shadow-sm hover:border-[#5b3a26] transition-colors">
                              Book
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lab Tests */}
              <div className="card-premium p-8">
                <h2 className="text-2xl font-serif font-bold text-[#5b3a26] mb-6 flex items-center gap-2">
                  <Microscope className="w-6 h-6 text-[#8c5a3b]" /> Essential Laboratory Tests
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeGroupData.tests.map((t, i) => (
                    <div key={i} className="bg-white/60 border border-[#f0e8df] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-[#5b3a26] text-base leading-snug">{t.name}</h4>
                        <span className="font-bold text-[#8c5a3b] bg-[#f6efe6] px-2.5 py-1 rounded-lg text-sm">{t.price}</span>
                      </div>
                      <p className="text-xs text-[#7a5741] leading-relaxed font-medium">{t.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Stage-specific tips & Booking Widget */}
            <div className="space-y-6">
              {/* Pet stage care tips */}
              <div className="card-premium p-8 bg-gradient-to-br from-white to-[#fcfaf7]">
                <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-5 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#8c5a3b]" /> Life Stage Tips
                </h3>
                <ul className="space-y-4">
                  {activeGroupData.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-[#7a5741] font-medium leading-relaxed">
                      <span className="text-lg shrink-0">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Static Book Card */}
              <div className="bg-[#5b3a26] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-6 -translate-y-6" />
                <h3 className="font-serif font-bold text-2xl mb-3 text-white">Need Doorstep Vet?</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed font-medium">
                  Skip the travel hassle and clinic waiting rooms. Our experienced veterinarians carry out vaccinations and checkups directly in your home.
                </p>
                <div className="space-y-3">
                  <Link href="/veterinary-booking" className="w-full flex items-center justify-center gap-2 bg-white text-[#5b3a26] font-bold py-3.5 rounded-2xl hover:bg-[#f6efe6] transition-colors shadow-lg">
                    <CalendarCheck className="w-4 h-4" /> Book Appointment Request
                  </Link>
                  <a href="tel:+919818728444" className="w-full flex items-center justify-center gap-2 border border-white/30 text-white font-semibold py-3.5 rounded-2xl hover:bg-white/10 transition-colors">
                    <Phone className="w-4 h-4" /> Call +91-9818728444
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ANNUAL BLOOD HEALTH CHECK PROMOTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] overflow-hidden shadow-2xl border-[6px] border-white bg-gradient-to-br from-[#fdfbf7] via-[#f8f1ea] to-[#f0e4d7] p-8 md:p-14 mb-24"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full text-red-700 font-bold text-xs uppercase tracking-wide mb-6">
                <Droplets className="w-4 h-4" /> Preventive Screening
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#5b3a26] mb-6 leading-tight">
                Because they can’t tell you when something is wrong… <br />
                <span className="text-red-600 italic">a simple blood test can. ❤️🐾</span>
              </h2>
              <p className="text-base text-[#7a5741] font-medium mb-8 leading-relaxed">
                Prevention is the best form of pet love. Our Annual Blood Health Check checks for kidney function, liver health, hidden infections, intestinal worm infections, nutritional deficiencies, and skin/indigestion causes. Early diagnosis guarantees happier years together.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/veterinary-booking" className="btn-primary flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4" /> Book Blood Health Check Today
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="relative h-[320px] sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src="/assets/pet_clinic_reception.png"
                  alt="Veterinary Reception Desk"
                  fill
                  style={{ objectFit: "cover" }}
                  className="brightness-95"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* VETERINARY TIPS */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-[#5b3a26] text-center mb-10">
            📚 Preventive Pet Health Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vetTips.map((tip, idx) => (
              <div key={idx} className="glass-float p-6 rounded-2xl border border-[#e8d8cc]">
                <div className="w-10 h-10 rounded-xl bg-[#f6efe6] flex items-center justify-center text-lg mb-4">💡</div>
                <h4 className="font-serif font-bold text-[#5b3a26] text-lg mb-2">{tip.title}</h4>
                <p className="text-xs text-[#7a5741] leading-relaxed font-semibold">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQS SECTION */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#5b3a26] text-center mb-10 flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-[#8c5a3b]" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#e8d8cc] rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-[#5b3a26] hover:bg-white/40 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#8c5a3b] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-[#7a5741] text-sm leading-relaxed font-semibold border-t border-[#f0e8df] bg-[#fcfaf7]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
