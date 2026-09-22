import type { Metadata } from "next";
import Link from "next/link";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import BuyMeCoffee from "@/components/BuyMeCoffee";

import { Stethoscope, Scissors, ShieldAlert, PhoneCall, Sparkles, Calendar, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Veterinary Doctor Care & Doorstep Pet Grooming | Sniffnsnooz",
  description:
    "Sniffnsnooz is Delhi NCR's premier pet care ecosystem offering expert veterinary doctor visits, doorstep pet grooming, health vaccinations, and store salon lounge.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sniffnsnooz | Veterinary Doctor & Doorstep Pet Care NCR",
    description:
      "Expert veterinary care, vaccinations, doorstep pet grooming, and store salon lounge across Delhi NCR.",
    url: "https://sniffnsnooz.in",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

const ncrHubs = [
  { name: "Sector 65 Clinic", location: "Emerald Plaza Salon & Vet", time: "Instant Visit", isPrimary: true },
  { name: "Sector 57 & 67", location: "Doorstep Vet & Grooming", time: "15 Mins", isPrimary: false },
  { name: "DLF Phase 5", location: "Home Doctor & Spa", time: "20 Mins", isPrimary: false },
  { name: "Sohna Road", location: "Sushant Lok 1 & 2", time: "25 Mins", isPrimary: false },
];

export default function Home() {
  return (
    <div className="bg-surface-cream text-on-surface antialiased min-h-screen font-body">
      {/* 🚑 TOP EMERGENCY VET & DOORSTEP SLIM ANNOUNCEMENT BANNER */}
      <div className="px-margin pt-space-xs pb-space-xs max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-red-950 via-[#3d2410] to-amber-950 text-white rounded-xl p-2.5 sm:p-3 flex items-center justify-between shadow-md border border-red-900/40">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
            <Stethoscope className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-xs sm:text-sm text-amber-100 truncate">
              <strong className="text-white font-bold">Priority Vet Consultation &amp; Vaccination:</strong> Doctor Available at Home &amp; Store
            </p>
          </div>
          <Link
            className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap active:scale-95 transition-transform ml-2 shrink-0 shadow"
            href="/veterinary-booking"
          >
            Book Vet Now
          </Link>
        </div>
      </div>

      {/* Hero Sanctuary Showcase */}
      <section className="px-margin pt-space-xs pb-space-sm max-w-7xl mx-auto">
        <div className="bg-surface-champagne rounded-2xl overflow-hidden shadow-sm flex flex-col">
          {/* Media Frame with Pet Spa & Vet Atmosphere */}
          <div className="relative w-full h-64 sm:h-84 bg-surface-card-subtle overflow-hidden">
            <img
              alt="Sniff and Snooz veterinary clinic and luxury pet spa"
              className="w-full h-full object-cover"
              src="/assets/pet_clinic_reception.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/85 via-charcoal-dark/30 to-transparent" />
            <div className="absolute top-space-sm left-space-sm flex gap-space-2xs flex-wrap">
              <span className="bg-red-900/90 backdrop-blur-md text-white px-space-xs py-space-2xs rounded-full text-xs flex items-center gap-1 font-bold">
                <Stethoscope className="w-3.5 h-3.5 text-red-300" />
                VETERINARY DOCTORS
              </span>
              <span className="bg-surface-cream/90 backdrop-blur-md text-secondary px-space-xs py-space-2xs rounded-full text-xs flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Doorstep Grooming &amp; Salon
              </span>
            </div>
            <div className="absolute bottom-space-sm left-space-sm right-space-sm">
              <span className="text-amber-200 text-xs sm:text-sm uppercase tracking-wider font-bold block mb-1">
                Gurgaon &amp; Delhi NCR Premier Pet Care
              </span>
              <h1 className="text-surface-cream text-2xl sm:text-4xl md:text-5xl font-elsie font-black leading-tight drop-shadow-md">
                Expert Veterinary Care &amp; Luxury Doorstep Grooming
              </h1>
            </div>
          </div>

          {/* Hero Details & Fast CTAs */}
          <div className="p-space-md flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs text-on-surface-variant text-xs sm:text-sm flex-wrap">
              <span className="material-symbols-outlined text-primary text-[18px]">medical_services</span>
              <span><strong>Veterinary Clinic &amp; Spa Lounge:</strong> Emerald Plaza, Sec 65, Gurgaon</span>
              <span className="text-outline-variant">•</span>
              <span>Doorstep Home Visits Available</span>
            </div>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Certified veterinary consultations, annual vaccinations, diagnostic blood panels, and stress-free organic doorstep pet grooming sessions for dogs and cats across Delhi NCR.
            </p>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-space-2xs">
              <Link
                className="w-full bg-gradient-to-r from-red-700 via-amber-800 to-primary text-white text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform font-bold"
                href="/veterinary-booking"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Book Doctor Appointment</span>
              </Link>
              <Link
                className="w-full bg-primary text-on-primary text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform font-bold"
                href="/store-booking"
              >
                <Scissors className="w-4 h-4" />
                <span>Book Doorstep Grooming</span>
              </Link>
            </div>

            {/* Secondary Action Strip */}
            <div className="flex gap-space-xs pt-1">
              <a
                className="flex-1 bg-surface-card-subtle text-primary text-xs sm:text-sm py-2.5 rounded-full flex items-center justify-center gap-1.5 font-bold active:scale-95 transition-transform"
                href="https://wa.me/919818728444?text=Hello!%20I%20need%20veterinary%20assistance%20or%20grooming%20for%20my%20pet."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp Vet</span>
              </a>
              <a
                className="flex-1 bg-surface-card-subtle text-secondary text-xs sm:text-sm py-2.5 rounded-full flex items-center justify-center gap-1.5 font-bold active:scale-95 transition-transform"
                href="tel:+919818728444"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>Call +91 9818728444</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SLIM APP VET EMERGENCY CTA BANNER */}
      <section className="px-margin py-2 max-w-7xl mx-auto">
        <div className="bg-amber-100/90 border border-amber-300 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-sm">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="p-1.5 bg-amber-600 text-white rounded-lg shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-[#3d2410] block">Need Urgent Vet Consultation or Vaccine Booster?</span>
              <span className="text-[#7a5741] text-xs">Home doctor visits &amp; Emerald Plaza clinic appointments open 7 days a week.</span>
            </div>
          </div>
          <Link
            href="/veterinary-booking"
            className="w-full sm:w-auto bg-[#5b3a26] text-white px-4 py-1.5 rounded-full text-xs font-bold text-center hover:bg-[#3d2410] transition-colors shrink-0"
          >
            Consult Doctor Now &rarr;
          </Link>
        </div>
      </section>



      {/* Doorstep & Clinic Service Radar */}
      <section className="px-margin py-space-xs max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-space-xs">
          <div className="flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-red-700 text-[20px]">medical_services</span>
            <h2 className="text-xl sm:text-2xl font-elsie font-black text-charcoal-dark">NCR Doorstep &amp; Clinic Hubs</h2>
          </div>
          <span className="text-xs font-bold text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded-full">
            Fast Response
          </span>
        </div>
        {/* Horizontal Scroll Sector Chips */}
        <div className="flex gap-space-xs overflow-x-auto pb-space-2xs pt-1 no-scrollbar -mx-margin px-margin">
          {ncrHubs.map((sector, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 rounded-xl p-space-sm flex flex-col w-40 sm:w-48 shadow-sm ${
                sector.isPrimary ? "bg-charcoal-dark text-surface-cream" : "bg-surface-champagne text-on-surface"
              }`}
            >
              <span
                className={`text-xs font-bold flex items-center gap-1 ${
                  sector.isPrimary ? "text-amber-bright" : "text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {sector.isPrimary ? "medical_services" : "schedule"}
                </span>{" "}
                {sector.time}
              </span>
              <span className="font-elsie font-bold text-sm sm:text-base mt-1">{sector.name}</span>
              <span
                className={`text-xs mt-0.5 ${
                  sector.isPrimary ? "text-outline-variant" : "text-on-surface-variant"
                }`}
              >
                {sector.location}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Service Quick Grid */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-space-xs">
          <div>
            <h2 className="text-2xl sm:text-3xl font-elsie font-black text-charcoal-dark">Healthcare &amp; Pet Services</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">Available at your doorstep or Emerald Plaza salon &amp; clinic</p>
          </div>
          <Link className="text-xs font-bold text-primary hover:underline" href="/services">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
          {/* 01 Veterinary Care (PRIORITY #1) */}
          <Link
            href="/veterinary"
            className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-space-sm flex flex-col justify-between shadow-sm border border-red-200 relative overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center mb-space-xs shadow-sm">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-red-700 tracking-wider">Top Priority</span>
              <h3 className="text-base sm:text-lg font-elsie font-black text-charcoal-dark mt-0.5">Veterinary Doctors</h3>
              <p className="text-xs text-on-surface-variant mt-1">Vaccinations, health checks &amp; home vet visits</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between pt-2 border-t border-red-200/60">
              <span className="text-xs font-bold text-red-700">Doctor Available</span>
              <span className="material-symbols-outlined text-red-700 text-[18px]">arrow_forward</span>
            </div>
          </Link>

          {/* 02 Doorstep Groomers & Spa */}
          <Link
            href="/grooming"
            className="bg-surface-champagne rounded-2xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-xs">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-elsie font-black text-charcoal-dark">Doorstep Grooming</h3>
              <p className="text-xs text-on-surface-variant mt-1">Organic baths, haircuts &amp; de-matting at home</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between pt-2 border-t border-outline-variant/20">
              <span className="text-xs font-bold text-primary">From ₹599</span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
          </Link>

          {/* 03 Pet Insurance */}
          <Link
            href="/pet-insurance"
            className="bg-surface-champagne rounded-2xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary mb-space-xs">
              <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-elsie font-black text-charcoal-dark">Pet Health Insurance</h3>
              <p className="text-xs text-on-surface-variant mt-1">Surgery, hospitalization &amp; emergency cover</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between pt-2 border-t border-outline-variant/20">
              <span className="text-xs font-bold text-secondary">Instant Protection</span>
              <span className="material-symbols-outlined text-secondary text-[18px]">arrow_forward</span>
            </div>
          </Link>

          {/* 04 Store Salon Lounge */}
          <Link
            href="/store-booking"
            className="bg-surface-champagne rounded-2xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-surface-card-subtle flex items-center justify-center text-primary mb-space-xs">
              <span className="material-symbols-outlined text-[22px]">storefront</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-elsie font-black text-charcoal-dark">Store Salon Lounge</h3>
              <p className="text-xs text-on-surface-variant mt-1">Emerald Plaza luxury spa experience</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between pt-2 border-t border-outline-variant/20">
              <span className="text-xs font-bold text-primary">Sec 65 Gurgaon</span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Grooming Packages */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <div className="bg-badge-popular-bg text-surface-cream rounded-3xl p-space-md shadow-xl flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="bg-primary text-on-primary text-xs uppercase font-black px-space-xs py-space-2xs rounded-full tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              DOORSTEP &amp; SALON PACKAGES
            </span>
            <span className="text-amber-bright text-xs font-bold">Best Value Guarantee</span>
          </div>

          <div className="pt-space-sm pb-space-xs">
            <h3 className="text-2xl sm:text-4xl font-elsie font-black text-surface-cream">Tailored Grooming &amp; Spa Tiers</h3>
            <p className="text-xs sm:text-sm text-outline-variant mt-1">Certified stylists with organic shampoos and hygienic tools.</p>
          </div>

          <div className="relative w-full h-44 sm:h-64 rounded-2xl overflow-hidden my-space-xs shadow-md">
            <img
              alt="Luxury pet grooming session"
              className="w-full h-full object-cover"
              src="/assets/premium_pet_grooming_box.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/85 via-transparent to-transparent" />
            <div className="absolute bottom-space-xs left-space-sm right-space-sm flex items-center justify-between">
              <span className="text-surface-cream text-xs font-semibold">At Your Doorstep or Emerald Plaza Lounge</span>
              <span className="bg-status-verified text-surface-cream px-2 py-0.5 rounded-full text-xs font-bold">
                100% Stress Free
              </span>
            </div>
          </div>

          {/* The 3 Tiers Snapshot */}
          <div className="grid grid-cols-3 gap-space-2xs my-space-xs text-center">
            <div className="bg-charcoal-dark/80 rounded-xl p-space-xs flex flex-col items-center">
              <span className="text-xs text-outline-variant uppercase font-bold">Basic Spa</span>
              <span className="text-base sm:text-xl font-black text-amber-bright mt-1">₹599</span>
              <span className="text-xs text-surface-cream/80">Bath &amp; Nails</span>
            </div>
            <div className="bg-primary/30 rounded-xl p-space-xs flex flex-col items-center border border-amber-bright/40">
              <span className="text-xs text-amber-bright uppercase font-black">Classic</span>
              <span className="text-base sm:text-xl font-black text-surface-cream mt-1">₹1,399</span>
              <span className="text-xs text-amber-bright font-bold">Breed Haircut</span>
            </div>
            <div className="bg-charcoal-dark/80 rounded-xl p-space-xs flex flex-col items-center">
              <span className="text-xs text-outline-variant uppercase font-bold">Signature</span>
              <span className="text-base sm:text-xl font-black text-amber-bright mt-1">₹1,799</span>
              <span className="text-xs text-surface-cream/80">Luxury Hydra Spa</span>
            </div>
          </div>

          <div className="pt-space-xs flex gap-space-xs">
            <Link
              className="flex-1 bg-amber-bright text-charcoal-dark text-sm py-3 rounded-full flex items-center justify-center gap-space-xs shadow-md font-bold active:scale-95 transition-transform"
              href="/store-booking"
            >
              <span>Book Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              className="h-12 w-12 rounded-full bg-surface-card-subtle flex items-center justify-center text-charcoal-dark active:scale-95 transition-transform shrink-0"
              href="tel:+919818728444"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* SLIM VETERINARY CALL TO ACTION BANNER */}
      <section className="px-margin py-3 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-red-900 via-amber-900 to-primary text-white rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 border border-red-800/40">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-red-300 shrink-0 border border-white/20">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-elsie font-black text-amber-200">Have Health Questions About Your Pet?</h4>
              <p className="text-xs text-amber-100/90 mt-0.5">Talk to our verified veterinary doctors for immediate guidance, vaccination schedules, and prescriptions.</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Link
              href="/veterinary-booking"
              className="flex-1 sm:flex-none bg-white text-red-900 font-bold text-xs px-4 py-2 rounded-full hover:bg-amber-100 transition-colors text-center"
            >
              Consult Doctor
            </Link>
            <a
              href="tel:+919818728444"
              className="flex-1 sm:flex-none bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-full hover:bg-red-600 transition-colors text-center flex items-center justify-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call Vet
            </a>
          </div>
        </div>
      </section>

      {/* How It Works: 3 Simple Steps */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <div className="flex items-center gap-space-2xs pb-space-xs">
          <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
          <span className="text-xs text-primary font-bold uppercase tracking-wider">Hassle Free</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-elsie font-black text-charcoal-dark">How Doorstep &amp; Store Care Works</h2>
        <p className="text-xs sm:text-sm text-on-surface-variant">Three simple steps to a pampered, healthy pet.</p>
        
        <div className="mt-space-sm flex flex-col gap-space-xs">
          {/* Step 1 */}
          <div className="bg-surface-champagne rounded-2xl p-space-sm flex items-start gap-space-sm shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-card-subtle flex-shrink-0 flex items-center justify-center">
              <span className="font-price-callout text-price-callout text-primary">01</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-primary text-[18px]">touch_app</span>
                <h3 className="text-base font-elsie font-bold text-charcoal-dark">Select Service or Vet Consult</h3>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Choose doorstep grooming or veterinary doctor visit and pick a convenient date &amp; time slot.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-champagne rounded-2xl p-space-sm flex items-start gap-space-sm shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex-shrink-0 flex items-center justify-center">
              <span className="font-price-callout text-price-callout text-red-700">02</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-red-700 text-[18px]">home_health</span>
                <h3 className="text-base font-elsie font-bold text-charcoal-dark">Doctor or Stylist Visits Your Home</h3>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Our certified veterinary doctor or pet stylist arrives at your doorstep equipped with organic products &amp; sterile equipment.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-champagne rounded-2xl p-space-sm flex items-start gap-space-sm shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-card-subtle flex-shrink-0 flex items-center justify-center">
              <span className="font-price-callout text-price-callout text-primary">03</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-primary text-[18px]">favorite</span>
                <h3 className="text-base font-elsie font-bold text-charcoal-dark">Healthy, Clean &amp; Joyful Pet</h3>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Your pet receives complete care, vaccination, or luxury styling with zero travel anxiety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Strip */}
      <section className="px-margin py-space-xs max-w-7xl mx-auto">
        <div className="bg-surface-card-subtle rounded-2xl p-space-md flex items-center justify-between text-center">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-elsie font-black text-primary">3,000+</span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant uppercase font-semibold">Happy Pets</span>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-elsie font-black text-charcoal-dark">5.0★</span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant uppercase font-semibold">3000+ Reviews</span>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-3xl font-elsie font-black text-primary">6+</span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant uppercase font-semibold">NCR Cities</span>
          </div>
        </div>
      </section>

      {/* Social Proof: Verified Reviews */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-space-xs">
          <div>
            <h2 className="text-2xl sm:text-3xl font-elsie font-black text-charcoal-dark">NCR Pet Parents Love Us</h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">Verified 5-Star feedback for grooming &amp; vet care</p>
          </div>
          <span className="material-symbols-outlined text-amber-bright text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            stars
          </span>
        </div>
        <div className="flex flex-col gap-space-xs">
          <div className="bg-surface-champagne rounded-2xl p-space-sm shadow-sm flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-xs">
                  D
                </div>
                <div>
                  <p className="font-bold text-charcoal-dark leading-tight text-sm">Deepu Bhai</p>
                  <span className="text-xs text-status-verified flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span> Verified Pet Parent
                  </span>
                </div>
              </div>
              <div className="flex text-amber-bright text-[15px]">★★★★★</div>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-space-xs italic">
              “I'm absolutely delighted with the service! The groomer and vet doctor were extremely attentive, gentle, and professional. Best doorstep pet care in Gurgaon.”
            </p>
          </div>

          <div className="bg-surface-champagne rounded-2xl p-space-sm shadow-sm flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-bold text-xs">
                  A
                </div>
                <div>
                  <p className="font-bold text-charcoal-dark leading-tight text-sm">Aman Roshni</p>
                  <span className="text-xs text-status-verified flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span> Verified Pet Parent
                  </span>
                </div>
              </div>
              <div className="flex text-amber-bright text-[15px]">★★★★★</div>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-space-xs italic">
              “The veterinary doctor visit at home saved us so much hassle. Very gentle with my Golden, and the doorstep grooming bath was flawless.”
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy: Family, Not Just Pets */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <HomeAboutSection />
      </section>

      {/* Coverage Cities Footer Card */}
      <section className="px-margin pt-space-xs pb-space-lg max-w-7xl mx-auto">
        <div className="bg-surface-card-subtle rounded-2xl p-space-md flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="text-base font-elsie font-bold text-charcoal-dark">Cities We Serve</span>
            <span className="text-xs text-primary font-bold">Delhi NCR Hub</span>
          </div>
          <p className="text-xs text-on-surface-variant">Gurugram • Delhi • Noida • Ghaziabad • Faridabad • Greater Noida</p>
          <div className="pt-space-xs">
            <a
              className="w-full bg-charcoal-dark text-amber-bright py-2.5 rounded-full text-xs flex items-center justify-center gap-space-xs font-bold active:scale-95 transition-transform"
              href="tel:+919818728444"
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>Speak With Pet Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* Buy Me A Coffee Support Card */}
      <BuyMeCoffee />

      {/* FAQ Section */}
      <HomeFAQSection />
    </div>
  );
}

