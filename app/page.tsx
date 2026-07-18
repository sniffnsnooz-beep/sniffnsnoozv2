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
    <>
      <HeroSection />

      {/* SERVICE SLIDER SECTION */}
      <section
        className="relative min-h-[420px] bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] py-20"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-10 w-32 h-32 bg-white/30 blur-xl rounded-2xl animate-bounce-slow" />
          <div className="absolute bottom-24 right-20 w-40 h-40 bg-white/20 blur-2xl rounded-3xl animate-bounce-medium" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <HomeServiceSlider />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <ReviewsCarousel />
        </ScrollReveal>
      </section>

      {/* ECOSYSTEM HIGHLIGHTS GRID */}
      <HomeServiceGrid />

      {/* ════ HOW IT WORKS SECTION ════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf9f5] to-white pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 divider-gradient-top" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-label mb-4 inline-flex">
                <span>⚡</span> Simple Process
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#5b3a26] mt-4 mb-4">
                How It <span className="gradient-text italic">Works</span>
              </h2>
              <p className="text-lg text-[#7a5741] max-w-xl mx-auto">
                Getting your pet groomed has never been easier. Three simple steps to a happier, cleaner pet.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-14 left-[calc(16.66%-20px)] right-[calc(16.66%-20px)] h-0.5 bg-gradient-to-r from-orange-200 via-emerald-200 to-violet-200 z-0" />

            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className={`card-premium p-8 text-center relative z-10 bg-gradient-to-br ${s.color} border ${s.border}`}>
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#5b3a26] text-white text-xs font-black rounded-full flex items-center justify-center shadow-lg">
                    {s.step}
                  </div>
                  <div className="text-5xl mb-5 mt-3">{s.emoji}</div>
                  <h3 className="text-xl font-serif font-bold text-[#5b3a26] mb-3">{s.title}</h3>
                  <p className="text-[#7a5741] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="text-center mt-12">
              <Link href="/store-booking" className="btn-primary inline-flex">
                Book My Pet's Grooming 🐾
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ════ ABOUT + WHY US SECTION ════ */}
      <ScrollReveal delay={0.1}>
        <HomeAboutSection />
      </ScrollReveal>

      {/* ════ CITIES WE SERVE ════ */}
      <section className="py-20 bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label mb-4 inline-flex">
                <span>📍</span> Our Coverage
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#5b3a26] mt-4 mb-4">
                Cities We <span className="gradient-text italic">Serve</span>
              </h2>
              <p className="text-lg text-[#7a5741] max-w-lg mx-auto">
                Premium doorstep pet grooming delivered across the entire Delhi NCR region.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className="glass-card flex items-center gap-3 px-6 py-4 hover-lift cursor-default"
                >
                  <span className="text-2xl">{city.emoji}</span>
                  <span className="font-semibold text-[#5b3a26] text-lg">{city.name}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-center mt-8 text-sm text-[#8c5a3b] font-medium">
              📞 Not in the list? Call us — we may cover your area!{" "}
              <a href="tel:+919818728444" className="underline font-bold hover:text-[#5b3a26] transition">
                +91 98187 28444
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ════ FAQ SECTION ════ */}
      <ScrollReveal delay={0.1}>
        <HomeFAQSection />
      </ScrollReveal>

      {/* ════ FINAL CTA BANNER ════ */}
      <section className="py-20 bg-[#2b1a12] relative overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#5b3a26]/40 rounded-full blur-3xl animate-bounce-slow" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#8c5a3b]/30 rounded-full blur-3xl animate-bounce-medium" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <div className="text-5xl mb-6 animate-bounce-slow inline-block">🐾</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              Ready for a{" "}
              <span className="shimmer-text">Premium Groom?</span>
            </h2>
            <p className="text-[#eadfce] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Your pet deserves the best. Book a doorstep grooming session today and experience the Sniffnsnooz difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/store-booking" className="btn-primary !bg-white !text-[#5b3a26] hover:!bg-[#f6efe6] !shadow-2xl">
                Book Grooming Session 🐾
              </Link>
              <a href="tel:+919818728444" className="btn-ghost !border-white/30 !text-white hover:!bg-white/10">
                📞 Call Us Now
              </a>
            </div>
            <div className="mt-10 flex justify-center items-center gap-8 text-[#eadfce] text-sm">
              <div className="text-center">
                <div className="text-2xl font-black text-white">2000+</div>
                <div className="opacity-70">Happy Pets</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-black text-white">4.9★</div>
                <div className="opacity-70">Average Rating</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-black text-white">6+</div>
                <div className="opacity-70">Cities Covered</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
