"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, HelpCircle, Star, Shield, Award, Sparkles, CheckCircle } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

interface Companion {
  _id: string;
  breedName: string;
  category: string;
  age: string;
  gender: string;
  location: string;
  temperament: string;
  description: string;
  images: string[];
  videos: string[];
  featuredBadge: boolean;
}

export default function FindCompanionPage() {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [loadingCompanions, setLoadingCompanions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Consultation Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    preferredBreed: "",
    budget: "",
    apartmentOrHouse: "Apartment",
    previousPetExperience: "No Experience",
    familyMembers: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch active companions
  useEffect(() => {
    fetch("/api/companion")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setCompanions(Array.isArray(data) ? data : []);
        setLoadingCompanions(false);
      })
      .catch((err) => {
        console.error("Failed to fetch companions:", err);
        setLoadingCompanions(false);
      });
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        trackEvent("companion_form_submit", { breed: formData.preferredBreed });
        setFormData({
          name: "",
          phone: "",
          email: "",
          city: "",
          preferredBreed: "",
          budget: "",
          apartmentOrHouse: "Apartment",
          previousPetExperience: "No Experience",
          familyMembers: "",
          message: "",
        });
      } else {
        alert("Enquiry submission failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCompanions = selectedCategory === "All"
    ? companions
    : companions.filter(c => c.category === selectedCategory);

  return (
    <div className="bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic SEO & AEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does Sniffnsnooz companion matching work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We review your lifestyle, living conditions, and budget preferences, and then consult you to match you with ethical, certified companion sources."
                }
              },
              {
                "@type": "Question",
                "name": "Does Sniffnsnooz support unethical breeding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely not. Sniffnsnooz has a strict policy against unethical breeding and puppy mills. We only connect pet lovers with verified, clean, and certified ethical consultations."
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
            <span>🐾</span> Companion Guidance
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-4">
            Find Your Perfect <span className="shimmer-text italic">Companion</span>
          </h1>
          <p className="text-[#7a5741] text-lg max-w-2xl mx-auto mb-8">
            Tell us about your lifestyle and preferences, and we'll help you find the right pet companion from trusted, ethical, and verified sources.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+919818728444" 
              onClick={() => trackEvent("call_click", { location: "companion_hero" })}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Phone size={16} /> Call Now
            </a>
            <a 
              href="#consultation-form"
              className="bg-amber-100 text-amber-900 border border-amber-200 py-3.5 px-8 rounded-full font-bold hover:bg-amber-200/80 transition"
            >
              Get Free Consultation 💬
            </a>
            <a 
              href="https://wa.me/919818728444" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: "companion_hero" })}
              className="bg-emerald-600 text-white py-3.5 px-8 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-700 transition"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>

        {/* BREED LIST SECTION */}
        <div className="mb-20">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-10 border-b border-[#eadfce] pb-6">
            <h2 className="text-3xl font-serif font-bold text-[#5b3a26]">Available Consultations 🐾</h2>
            <div className="flex gap-2">
              {["All", "Puppy", "Kitten", "Adult"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full font-semibold text-xs transition ${selectedCategory === cat ? "bg-[#5b3a26] text-white shadow-sm" : "bg-white/60 hover:bg-[#eadfce]/50 text-[#5b3a26]"}`}
                >
                  {cat}s
                </button>
              ))}
            </div>
          </div>

          {loadingCompanions ? (
            <div className="text-center py-20 text-[#5b3a26] font-bold">Loading available companion breeds...</div>
          ) : filteredCompanions.length === 0 ? (
            <div className="bg-white/40 border border-[#eadfce] rounded-3xl p-12 text-center text-[#7a5741] italic">
              No entries listed at the moment. Fill the form below to enquire about customized matching!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanions.map((comp) => (
                <motion.div
                  key={comp._id}
                  whileHover={{ y: -6 }}
                  className="card-premium bg-white border border-[#f0e8df] rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-60 w-full bg-[#f6efe6]">
                    {comp.images && comp.images.length > 0 ? (
                      <Image
                        src={comp.images[0]}
                        alt={comp.breedName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-4xl">🐕</div>
                    )}
                    {comp.featuredBadge && (
                      <span className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles size={10} /> Premium Choice
                      </span>
                    )}
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold font-serif text-[#5b3a26]">{comp.breedName}</h3>
                      <span className="text-[10px] bg-[#5b3a26]/10 text-[#5b3a26] px-2 py-0.5 rounded-full font-bold uppercase">{comp.category}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-[#7a5741] my-4 border-y border-[#eadfce] py-3 bg-[#fdfaf7]/50 px-3 rounded-xl">
                      <p><b>Age:</b> {comp.age || "N/A"}</p>
                      <p><b>Gender:</b> {comp.gender || "N/A"}</p>
                      <p><b>Location:</b> {comp.location || "Delhi NCR"}</p>
                      <p><b>Temper:</b> {comp.temperament || "Friendly"}</p>
                    </div>

                    <p className="text-sm text-[#7a5741] leading-relaxed line-clamp-3 mb-6">
                      {comp.description}
                    </p>

                    <div className="mt-auto pt-4 flex gap-3">
                      <a
                        href="tel:+919818728444"
                        onClick={() => trackEvent("call_click", { location: `companion_card_${comp.breedName}` })}
                        className="flex-1 bg-[#5b3a26] text-white hover:bg-orange-950 text-center py-2.5 rounded-xl font-bold text-xs transition"
                      >
                        📞 Call Now
                      </a>
                      <a
                        href="#consultation-form"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, preferredBreed: comp.breedName }));
                          trackEvent("consultation_click", { breed: comp.breedName });
                        }}
                        className="flex-1 border-2 border-[#5b3a26]/30 hover:border-[#5b3a26] text-[#5b3a26] text-center py-2.5 rounded-xl font-bold text-xs transition"
                      >
                        Enquire 💬
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CONSULTATION FORM */}
        <section id="consultation-form" className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-[#eadfce] overflow-hidden scroll-mt-28">
          <div className="bg-[#5b3a26] text-white p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 pointer-events-none" />
            <h2 className="text-3xl font-serif font-bold mb-2">Request Companion Consultation</h2>
            <p className="text-orange-100 text-sm">Tell us your lifestyle details and we will find the ideal partner for you.</p>
          </div>

          <div className="p-8 md:p-10">
            {success ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#5b3a26]">Enquiry Submitted Successfully!</h3>
                <p className="text-sm text-[#7a5741] max-w-md mx-auto">
                  Our companion support specialists will analyze your pet environment profile and reach out within 24 hours.
                </p>
                <button onClick={() => setSuccess(false)} className="btn-primary !px-6 !py-2.5 !text-sm">
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Your City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gurugram, Noida, Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Preferred Breed/Companion *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Golden Retriever, Persian Cat"
                      value={formData.preferredBreed}
                      onChange={(e) => setFormData({ ...formData, preferredBreed: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Estimated Budget Range</label>
                    <input
                      type="text"
                      placeholder="e.g., ₹20,000 - ₹35,000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Residence Type</label>
                    <select
                      value={formData.apartmentOrHouse}
                      onChange={(e) => setFormData({ ...formData, apartmentOrHouse: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    >
                      <option>Apartment</option>
                      <option>Independent House / Villa</option>
                      <option>Farmhouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Prior Pet Experience</label>
                    <select
                      value={formData.previousPetExperience}
                      onChange={(e) => setFormData({ ...formData, previousPetExperience: e.target.value })}
                      className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                    >
                      <option>No Experience (First Time Parent)</option>
                      <option>Had pets in the past</option>
                      <option>Currently raising pets</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Family Members (Children, Elders, etc.)</label>
                  <input
                    type="text"
                    placeholder="e.g., 4 members, including 1 toddler"
                    value={formData.familyMembers}
                    onChange={(e) => setFormData({ ...formData, familyMembers: e.target.value })}
                    className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5b3a26] uppercase tracking-wider mb-2">Message & Specific Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your lifestyle routines, work schedules, or any specific companion requirements."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5b3a26] text-sm bg-gray-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5b3a26] text-white py-4 rounded-xl font-bold transition hover:bg-orange-950 shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Submitting Request..." : "Submit Consultation Request 🐾"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <div className="mt-24 bg-white/40 border border-[#eadfce] rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-serif text-[#5b3a26] text-center mb-12 font-bold">Companion Guidance: How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-[#5b3a26]">1</div>
              <h3 className="font-bold text-lg text-[#5b3a26]">Submit Profile</h3>
              <p className="text-xs text-[#7a5741] leading-relaxed">Fill the consultation form detailing your home environment and family requirements.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-[#5b3a26]">2</div>
              <h3 className="font-bold text-lg text-[#5b3a26]">Expert Analysis</h3>
              <p className="text-xs text-[#7a5741] leading-relaxed">Our certified veterinarians and breed counselors examine your profile for perfect matches.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-xl font-bold text-[#5b3a26]">3</div>
              <h3 className="font-bold text-lg text-[#5b3a26]">Ethical Connect</h3>
              <p className="text-xs text-[#7a5741] leading-relaxed">We connect you with certified, strictly ethical partners, avoiding commercial puppy mills entirely.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
