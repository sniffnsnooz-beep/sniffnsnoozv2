"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Activity, Heart, Shield, Check, Info, HelpCircle } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

const benefits = [
  {
    title: "Medical Coverage",
    icon: <Activity className="w-8 h-8 text-red-700" />,
    description: "Covers critical treatments, long-term illness management, and intensive surgeries.",
    points: ["Surgeries & Operations", "In-patient Hospitalization", "Diagnostic Tests & Scans"],
  },
  {
    title: "Accident Protection",
    icon: <ShieldAlert className="w-8 h-8 text-orange-700" />,
    description: "Financial backup for unexpected accidents, injuries, and emergency vet room visits.",
    points: ["Fractures & Wounds", "Emergency Consultations", "Accidental Poisoning Cover"],
  },
  {
    title: "Annual Protection",
    icon: <Heart className="w-8 h-8 text-pink-700" />,
    description: "Subsidies for annual vaccinations, ticks/fleas preventative care, and basic checkups.",
    points: ["Core Rabies Vaccines", "Annual Deworming", "General Health Packages"],
  },
  {
    title: "Third-Party Liability",
    icon: <Shield className="w-8 h-8 text-blue-700" />,
    description: "Protects you legally and financially against third-party injuries or property damages.",
    points: ["Legal Expense Support", "Property Damage Claims", "Bite Incident Coverage"],
  },
];

export default function PetInsurancePage() {
  const [formData, setFormData] = useState({
    petType: "Dog",
    breed: "",
    age: "",
    ownerName: "",
    phone: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        trackEvent("insurance_form_submit", { petType: formData.petType, breed: formData.breed });
        setFormData({
          petType: "Dog",
          breed: "",
          age: "",
          ownerName: "",
          phone: "",
          city: "",
        });
      } else {
        alert("Lead submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic SEO & FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is covered under pet insurance guidance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pet insurance guidance provides assistance in selecting plans that cover illness surgeries, hospitalization, accidental injuries, and third-party liabilities."
                }
              },
              {
                "@type": "Question",
                "name": "Are routine vaccinations covered?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Premium plans often include annual health packages that help subsidize core vaccinations, deworming, and regular health checkups."
                }
              }
            ]
          })
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HERO SECTION */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 inline-flex">
            <span>🛡️</span> Pet Protection
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-4">
            Protect Their <span className="shimmer-text italic">Future</span>
          </h1>
          <p className="text-[#7a5741] text-lg max-w-2xl mx-auto mb-8">
            Get comprehensive insurance guidance for your furry family members. Secure financial peace of mind against expensive emergency vet bills and surgeries.
          </p>
          <a href="#lead-form" className="btn-primary inline-block">
            Get Free Insurance Quote 📋
          </a>
        </div>

        {/* BENEFITS SECTION */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-center text-[#5b3a26] mb-12">Core Insurance Benefits 🩺</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="card-premium p-6 bg-white border border-[#f0e8df] rounded-3xl shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-gray-50 rounded-xl w-fit mb-4 border border-[#eadfce]">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#5b3a26] mb-2">{b.title}</h3>
                  <p className="text-xs text-[#7a5741] leading-relaxed mb-4">{b.description}</p>
                </div>
                <ul className="text-xs text-[#5b3a26] space-y-2 border-t pt-3">
                  {b.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* WHY PET INSURANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 bg-white/40 border border-[#eadfce] rounded-3xl p-8 md:p-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#5b3a26] mb-6">Why Pet Insurance Matters? 🐾</h2>
            <p className="text-[#7a5741] leading-relaxed mb-6">
              Veterinary medical advancements mean we can care for pets better than ever. However, these life-saving procedures can result in substantial financial bills:
            </p>
            <div className="space-y-4">
              {[
                { title: "Surgeries & Fractures", desc: "Complex veterinary operations can easily cost upwards of ₹30,000." },
                { title: "Unexpected Accidents", desc: "No matter how careful you are, accidents happen. Having a safety net saves lives." },
                { title: "Peace of Mind", desc: "Never choose between your budget constraints and your pet's survival." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#5b3a26] text-white flex items-center justify-center font-bold text-sm shrink-0">✓</div>
                  <div>
                    <h4 className="font-bold text-[#5b3a26] text-sm">{item.title}</h4>
                    <p className="text-xs text-[#7a5741] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#5b3a26] text-white p-8 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-xl font-bold font-serif">Average Savings Potential</h3>
            <p className="text-xs opacity-80 leading-relaxed">
              Pet insurance can subsidize up to 80-90% of eligible veterinary hospital charges. An annual premium guarantees that expensive bills don't disrupt your savings.
            </p>
            <div className="w-full h-px bg-white/20 my-4" />
            <div className="flex justify-between items-center text-sm">
              <span>Emergency Surgery Cost</span>
              <span className="font-bold text-red-300">₹35,000+</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Insurance Reimbursement (85%)</span>
              <span className="font-bold text-green-300">₹29,750</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-white/20 pt-2 font-bold">
              <span>Your Net Expense</span>
              <span>₹5,250</span>
            </div>
          </div>
        </div>

        {/* PLANS COMPARISON TABLE */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-center text-[#5b3a26] mb-12">Select The Right Plan Option</h2>
          <div className="bg-white rounded-3xl border border-[#eadfce] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#5b3a26] text-white text-xs uppercase">
                  <tr>
                    <th className="p-5">Plan Features</th>
                    <th className="p-5">Basic Plan 🥉</th>
                    <th className="p-5">Standard Plan 🥈</th>
                    <th className="p-5">Premium Plan 🥇</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-[#5b3a26] divide-y divide-[#eadfce]">
                  <tr>
                    <td className="p-5 font-bold">Accident & Injury Cover</td>
                    <td className="p-5 text-green-600 font-bold">✓ (Up to 70%)</td>
                    <td className="p-5 text-green-600 font-bold">✓ (Up to 80%)</td>
                    <td className="p-5 text-green-600 font-bold">✓ (Up to 90%)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">Illness & Surgery Costs</td>
                    <td className="p-5 text-red-500 font-bold">✗ Not Covered</td>
                    <td className="p-5 text-green-600 font-bold">✓ (Up to 80%)</td>
                    <td className="p-5 text-green-600 font-bold">✓ (Up to 90%)</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">Third-Party Liability Limit</td>
                    <td className="p-5">₹50,000</td>
                    <td className="p-5">₹1,00,000</td>
                    <td className="p-5">₹2,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">Annual Vaccination Support</td>
                    <td className="p-5 text-red-500 font-bold">✗ Not Covered</td>
                    <td className="p-5">₹2,000 / year</td>
                    <td className="p-5">₹5,000 / year</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold">Emergency 24/7 Vet Support</td>
                    <td className="p-5 text-red-500 font-bold">✗ Not Covered</td>
                    <td className="p-5 text-green-600 font-bold">✓ Included</td>
                    <td className="p-5 text-green-600 font-bold">✓ Included (Priority)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* LEAD CAPTURE FORM */}
        <section id="lead-form" className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-[#eadfce] overflow-hidden scroll-mt-28">
          <div className="bg-[#5b3a26] text-white p-8 text-center">
            <h2 className="text-2xl font-bold font-serif mb-2">Request Free Protection Quote</h2>
            <p className="text-orange-100 text-xs">Fill out details about your pet and we'll fetch the best plans available.</p>
          </div>

          <div className="p-8">
            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                <h3 className="text-xl font-bold text-[#5b3a26]">Quote Request Submitted!</h3>
                <p className="text-xs text-[#7a5741]">We will send custom-tailored insurance quotes to your phone number shortly.</p>
                <button onClick={() => setSuccess(false)} className="btn-primary !px-5 !py-2 !text-xs">Submit New Quote</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Pet Type *</label>
                    <select
                      value={formData.petType}
                      onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl text-xs outline-none bg-gray-50/50"
                    >
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Pet Breed *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Golden Retriever"
                      value={formData.breed}
                      onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl text-xs outline-none focus:border-[#5b3a26] bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Pet Age (in years) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 2 Years"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl text-xs outline-none focus:border-[#5b3a26] bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Owner's Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl text-xs outline-none focus:border-[#5b3a26] bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl text-xs outline-none focus:border-[#5b3a26] bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Your City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Gurugram, Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl text-xs outline-none focus:border-[#5b3a26] bg-gray-50/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5b3a26] text-white py-3.5 rounded-xl font-bold transition hover:bg-orange-950 text-sm shadow-md"
                >
                  {isSubmitting ? "Submitting Quote..." : "Submit Quote Request 🛡️"}
                </button>
              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
