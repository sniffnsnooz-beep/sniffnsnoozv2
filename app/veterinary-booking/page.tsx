"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Syringe,
  Microscope,
  CalendarCheck,
  HeartPulse,
  User,
  Phone,
  Mail,
  PawPrint,
  Clock,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

const VET_SERVICES = [
  { id: "consultation", label: "Vet Consultation", price: "₹99", emoji: "🩺", icon: <Stethoscope className="w-5 h-5" /> },
  { id: "vaccination", label: "Vaccination", price: "from ₹299", emoji: "💉", icon: <Syringe className="w-5 h-5" /> },
  { id: "blood-test", label: "Annual Blood Health Check", price: "from ₹999", emoji: "🔬", icon: <Microscope className="w-5 h-5" /> },
  { id: "lab-test", label: "Lab Tests & Diagnostics", price: "from ₹999", emoji: "🧪", icon: <Microscope className="w-5 h-5" /> },
  { id: "deworming", label: "Deworming", price: "Varies", emoji: "💊", icon: <HeartPulse className="w-5 h-5" /> },
  { id: "skin-allergy", label: "Skin & Allergy Treatment", price: "Varies", emoji: "🐾", icon: <HeartPulse className="w-5 h-5" /> },
];

const TIME_SLOTS = [
  "09:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 01:00 PM",
  "02:00 PM – 03:00 PM",
  "03:00 PM – 04:00 PM",
  "04:00 PM – 05:00 PM",
  "05:00 PM – 06:00 PM",
];

const PET_TYPES = ["Dog", "Cat", "Rabbit", "Bird", "Other"];

function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function VeterinaryBookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    petName: "",
    petType: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Valid phone number is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.petType) e.petType = "Please select pet type";
    if (!form.service) e.service = "Please select a service";
    if (!form.preferredDate) e.preferredDate = "Preferred date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/vet-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        toast.success("Appointment request sent! We'll contact you soon. 🐾");
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="relative min-h-screen page-bg flex items-center justify-center py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/50 blur-[80px] rounded-full animate-bounce-slow" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#e6d3c2]/50 blur-[100px] rounded-full animate-bounce-medium" />
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-premium p-12 text-center max-w-lg mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>
          <h2 className="text-4xl font-serif font-bold text-[#5b3a26] mb-4">Appointment Requested! 🎉</h2>
          <p className="text-[#7a5741] font-medium mb-3 text-lg">
            Thank you, <strong>{form.name}</strong>! We&apos;ve received your request for <strong>{form.service ? VET_SERVICES.find(s => s.id === form.service)?.label : "veterinary care"}</strong>.
          </p>
          <p className="text-[#7a5741] mb-2">Our team will call you on <strong>{form.phone}</strong> to confirm the appointment.</p>
          {form.email && <p className="text-sm text-[#7a5741] mb-8">A confirmation email has been sent to <strong>{form.email}</strong>.</p>}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/veterinary" className="btn-primary !px-8 !py-3">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Vet Services
            </Link>
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#5b3a26]/20 text-[#5b3a26] font-semibold px-8 py-3 rounded-full hover:border-[#5b3a26]/50 transition-all">
              Go to Home 🏠
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen page-bg py-16 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-8 w-72 h-72 bg-white/40 blur-[80px] rounded-full animate-bounce-slow" />
        <div className="absolute bottom-32 right-8 w-96 h-96 bg-[#e6d3c2]/40 blur-[100px] rounded-full animate-bounce-medium" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Back link */}
        <Link href="/veterinary" className="inline-flex items-center gap-2 text-[#7a5741] hover:text-[#5b3a26] font-semibold mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Veterinary Services
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="section-label mx-auto mb-6 inline-flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-red-500" /> Vet Appointment
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#5b3a26] mb-6 leading-tight">
            Book a <span className="shimmer-text">Vet Appointment</span>
          </h1>
          <p className="text-lg text-[#7a5741] max-w-2xl mx-auto font-medium">
            Fill in the form below and our team will confirm your appointment within a few hours.
            Transparent pricing, no hidden fees. 🐾
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ═══ FORM ═══ */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 card-premium p-8 md:p-10 space-y-8"
          >

            {/* Step 1: Personal Info */}
            <div>
              <h2 className="text-xl font-serif font-bold text-[#5b3a26] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#5b3a26] text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Your Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-[#5b3a26] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c5a3b]" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={e => update("name", e.target.value)}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 bg-white/70 text-[#5b3a26] placeholder:text-[#bba090] font-medium focus:outline-none focus:border-[#5b3a26] transition-all ${errors.name ? "border-red-400" : "border-[#e8d8cc]"}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#5b3a26] mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c5a3b]" />
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={e => update("phone", e.target.value)}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 bg-white/70 text-[#5b3a26] placeholder:text-[#bba090] font-medium focus:outline-none focus:border-[#5b3a26] transition-all ${errors.phone ? "border-red-400" : "border-[#e8d8cc]"}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#5b3a26] mb-1.5">Email (optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c5a3b]" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => update("email", e.target.value)}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 bg-white/70 text-[#5b3a26] placeholder:text-[#bba090] font-medium focus:outline-none focus:border-[#5b3a26] transition-all ${errors.email ? "border-red-400" : "border-[#e8d8cc]"}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Step 2: Pet Info */}
            <div>
              <h2 className="text-xl font-serif font-bold text-[#5b3a26] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#5b3a26] text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Pet Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Pet Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#5b3a26] mb-1.5">Pet&apos;s Name</label>
                  <div className="relative">
                    <PawPrint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c5a3b]" />
                    <input
                      type="text"
                      placeholder="E.g., Bruno, Whiskers"
                      value={form.petName}
                      onChange={e => update("petName", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-[#e8d8cc] bg-white/70 text-[#5b3a26] placeholder:text-[#bba090] font-medium focus:outline-none focus:border-[#5b3a26] transition-all"
                    />
                  </div>
                </div>

                {/* Pet Type */}
                <div>
                  <label className="block text-sm font-semibold text-[#5b3a26] mb-1.5">
                    Pet Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PET_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => update("petType", type)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                          form.petType === type
                            ? "bg-[#5b3a26] text-white border-[#5b3a26] shadow-md"
                            : "bg-white/70 text-[#5b3a26] border-[#e8d8cc] hover:border-[#5b3a26]/50"
                        }`}
                      >
                        {type === "Dog" ? "🐶" : type === "Cat" ? "🐱" : type === "Rabbit" ? "🐰" : type === "Bird" ? "🐦" : "🐾"} {type}
                      </button>
                    ))}
                  </div>
                  {errors.petType && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.petType}</p>}
                </div>
              </div>
            </div>

            {/* Step 3: Service Selection */}
            <div>
              <h2 className="text-xl font-serif font-bold text-[#5b3a26] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#5b3a26] text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Select Service <span className="text-red-500 text-sm font-normal">*</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VET_SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => update("service", svc.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all group ${
                      form.service === svc.id
                        ? "bg-[#5b3a26] text-white border-[#5b3a26] shadow-lg scale-[1.02]"
                        : "bg-white/70 text-[#5b3a26] border-[#e8d8cc] hover:border-[#5b3a26]/40 hover:bg-white"
                    }`}
                  >
                    <span className="text-2xl w-10 text-center">{svc.emoji}</span>
                    <div>
                      <div className="font-semibold text-sm">{svc.label}</div>
                      <div className={`text-xs font-medium mt-0.5 ${form.service === svc.id ? "text-white/70" : "text-[#8c5a3b]"}`}>{svc.price}</div>
                    </div>
                    {form.service === svc.id && (
                      <CheckCircle2 className="w-5 h-5 ml-auto text-white/80 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              {errors.service && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.service}</p>}
            </div>

            {/* Step 4: Date & Time */}
            <div>
              <h2 className="text-xl font-serif font-bold text-[#5b3a26] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#5b3a26] text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Preferred Date & Time
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-[#5b3a26] mb-1.5">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CalendarCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c5a3b]" />
                    <input
                      type="date"
                      min={getTomorrowDate()}
                      value={form.preferredDate}
                      onChange={e => update("preferredDate", e.target.value)}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 bg-white/70 text-[#5b3a26] font-medium focus:outline-none focus:border-[#5b3a26] transition-all ${errors.preferredDate ? "border-red-400" : "border-[#e8d8cc]"}`}
                    />
                  </div>
                  {errors.preferredDate && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.preferredDate}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-semibold text-[#5b3a26] mb-1.5">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c5a3b]" />
                    <select
                      value={form.preferredTime}
                      onChange={e => update("preferredTime", e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-[#e8d8cc] bg-white/70 text-[#5b3a26] font-medium focus:outline-none focus:border-[#5b3a26] transition-all appearance-none"
                    >
                      <option value="">Select a time slot</option>
                      {TIME_SLOTS.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5: Notes */}
            <div>
              <h2 className="text-xl font-serif font-bold text-[#5b3a26] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-[#5b3a26] text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                Additional Notes
              </h2>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-[#8c5a3b]" />
                <textarea
                  placeholder="Any symptoms, concerns, or special instructions for the vet..."
                  rows={4}
                  value={form.notes}
                  onChange={e => update("notes", e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-[#e8d8cc] bg-white/70 text-[#5b3a26] placeholder:text-[#bba090] font-medium focus:outline-none focus:border-[#5b3a26] transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !py-5 !text-lg shadow-[0_20px_50px_rgba(91,58,38,0.35)] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <CalendarCheck className="w-5 h-5 mr-3" />
                  Confirm Appointment Request 🐾
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#7a5741] font-medium">
              By submitting, you agree to be contacted by our team for appointment confirmation.
            </p>
          </motion.form>

          {/* ═══ SIDEBAR ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 lg:sticky lg:top-24"
          >
            {/* Info card */}
            <div className="card-premium p-7">
              <h3 className="font-serif font-bold text-[#5b3a26] text-xl mb-5 flex items-center gap-2">
                <Stethoscope className="w-5 h-5" /> What to Expect
              </h3>
              <ul className="space-y-4">
                {[
                  { icon: "📞", text: "Our team calls you within 2 hours to confirm" },
                  { icon: "🕐", text: "Appointments available 9AM – 6PM, all days" },
                  { icon: "💰", text: "Pay at clinic — no advance payment needed" },
                  { icon: "📋", text: "Bring previous vaccination records if any" },
                  { icon: "🚗", text: "Parking available at our clinic" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-lg w-7 text-center">{item.icon}</span>
                    <span className="text-sm text-[#7a5741] font-medium leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing quick ref */}
            <div className="card-premium p-7">
              <h3 className="font-serif font-bold text-[#5b3a26] text-xl mb-5">Pricing Overview</h3>
              <div className="space-y-3">
                {VET_SERVICES.map(svc => (
                  <div key={svc.id} className="flex items-center justify-between py-2 border-b border-[#f0e8df] last:border-0">
                    <span className="text-sm text-[#5b3a26] font-medium flex items-center gap-2">
                      <span>{svc.emoji}</span> {svc.label}
                    </span>
                    <span className="text-sm font-bold text-[#8c5a3b] whitespace-nowrap">{svc.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-[#5b3a26] text-white rounded-3xl p-7">
              <h3 className="font-serif font-bold text-xl mb-4">Need Help?</h3>
              <p className="text-white/80 text-sm mb-5 leading-relaxed">
                Talk to our team directly for urgent cases or special requirements.
              </p>
              <a
                href="tel:+919818728444"
                className="w-full flex items-center justify-center gap-2 bg-white text-[#5b3a26] font-bold py-3.5 rounded-2xl hover:bg-[#f6efe6] transition-colors"
              >
                <Phone className="w-4 h-4" /> +91-9818728444
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
