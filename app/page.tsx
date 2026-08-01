import type { Metadata } from "next";
import HeroSection from "@/components/Hero3D";
import HomeServiceSlider from "../components/HomeServiceSlider";
import HomeServiceGrid from "@/components/HomeServiceGrid";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Complete Pet Care Ecosystem & Doorstep Services | Sniffnsnooz",
  description:
    "Sniffnsnooz is Delhi NCR's premium pet ecosystem providing doorstep pet grooming, veterinary care, pet companion guidance, and insurance protection plans.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sniffnsnooz | Premium Pet Ecosystem Delhi NCR",
    description:
      "Grooming, veterinary home visits, companion consultation, and pet insurance - all in one place.",
    url: "https://sniffnsnooz.in",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

const steps = [
  {
    step: "01",
    emoji: "📱",
    title: "Book Online",
    desc: "Choose your package, pick a slot, and confirm your booking in under 2 minutes.",
    color: "from-amber-50 to-orange-50",
    border: "border-orange-100",
  },
  {
    step: "02",
    emoji: "🚗",
    title: "We Come to You",
    desc: "Our certified groomer arrives at your door with all professional equipment.",
    color: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
  },
  {
    step: "03",
    emoji: "✨",
    title: "Happy, Clean Pet",
    desc: "Your furry friend gets a spa-quality groom, stress-free in the comfort of home.",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-100",
  },
];

const cities = [
  { name: "Delhi", emoji: "🏛️" },
  { name: "Gurugram", emoji: "🏙️" },
  { name: "Noida", emoji: "🌆" },
  { name: "Ghaziabad", emoji: "🌇" },
  { name: "Faridabad", emoji: "🏘️" },
  { name: "Greater Noida", emoji: "🏗️" },
];

export default function Home() {
  return (
    <div className="bg-[#faf6f0] min-h-screen">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. EVERYTHING YOUR PET NEEDS (SERVICES CAROUSEL) */}
      <HomeServiceSlider />

      {/* 3. FIND TRUSTED COMPANY + STATS 2x2 GRID + PETS IMAGE + TRUST BAR + 4 FEATURES */}
      <HomeServiceGrid />

      {/* 4. REVIEWS CAROUSEL */}
      <section className="py-12 bg-gradient-to-b from-[#faf6f0] to-white">
        <ScrollReveal delay={0.1}>
          <ReviewsCarousel />
        </ScrollReveal>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label mb-3 inline-flex">
                <span>⚡</span> Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#5b3a26] mt-2 mb-3 font-bold">
                How It <span className="gradient-text italic">Works</span>
              </h2>
              <p className="text-sm sm:text-base text-[#7a5741] max-w-xl mx-auto font-medium">
                Getting your pet groomed has never been easier. Three simple steps to a happier, cleaner pet.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className={`card-premium p-6 sm:p-8 text-center relative z-10 bg-gradient-to-br ${s.color} border ${s.border}`}>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#5b3a26] text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg">
                    {s.step}
                  </div>
                  <div className="text-4xl sm:text-5xl mb-4 mt-2">{s.emoji}</div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#5b3a26] mb-2">{s.title}</h3>
                  <p className="text-[#7a5741] text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link href="/store-booking" className="btn-primary inline-flex">
                Book My Pet's Grooming 🐾
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. ABOUT + WHY US SECTION */}
      <ScrollReveal delay={0.1}>
        <HomeAboutSection />
      </ScrollReveal>

      {/* 7. CITIES WE SERVE */}
      <section className="py-16 bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="section-label mb-3 inline-flex">
                <span>📍</span> Our Coverage
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#5b3a26] font-bold mt-2 mb-3">
                Cities We <span className="gradient-text italic">Serve</span>
              </h2>
              <p className="text-sm sm:text-base text-[#7a5741] max-w-lg mx-auto font-medium">
                Premium doorstep pet grooming delivered across the entire Delhi NCR region.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className="glass-card flex items-center gap-2.5 px-4 sm:px-6 py-3 sm:py-4 hover-lift cursor-default"
                >
                  <span className="text-xl sm:text-2xl">{city.emoji}</span>
                  <span className="font-semibold text-[#5b3a26] text-sm sm:text-lg">{city.name}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <ScrollReveal delay={0.1}>
        <HomeFAQSection />
      </ScrollReveal>
    </div>
  );
}
