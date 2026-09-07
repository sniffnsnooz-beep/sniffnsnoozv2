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
  { name: "Gurugram (Gurgaon)", emoji: "🏙️", highlight: true },
  { name: "Delhi", emoji: "🏛️" },
  { name: "Noida", emoji: "🌆" },
  { name: "Ghaziabad", emoji: "🌇" },
  { name: "Faridabad", emoji: "🏘️" },
  { name: "Greater Noida", emoji: "🏗️" },
];

const gurgaonSectors = [
  { name: "Sector 65 (Emerald Plaza)", slug: "sector-65", time: "10 Mins", desc: "Flagship Pet Salon & Doorstep Van Spa", badge: "Flagship Spa" },
  { name: "Sector 57", slug: "sector-57", time: "15 Mins", desc: "BPTP Freedom Park, Boom Plaza & Rail Vihar" },
  { name: "Sector 67", slug: "sector-67", time: "15 Mins", desc: "Ansal Esencia, Ireo Victory Valley & M3M Urbana" },
  { name: "DLF Phase 5", slug: "dlf-phase-5", time: "20 Mins", desc: "The Aralias, Magnolias, Pinnacle & Crest" },
  { name: "Golf Course Road", slug: "golf-course-road", time: "20 Mins", desc: "Vipul Belmonte, Exotica & Palm Springs" },
  { name: "Sohna Road", slug: "sohna-road", time: "25 Mins", desc: "Tatvam Villas, Malibu Town & Vatika City" },
  { name: "Nirvana Country (Sec 50)", slug: "nirvana-country", time: "20 Mins", desc: "Deerwood, Aspen Greens & Fresco" },
  { name: "Sushant Lok 1 & 2", slug: "sushant-lok", time: "25 Mins", desc: "Galleria Area, Ridgewood & Vyapar Kendra" },
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

      {/* 4. DEDICATED GURGAON PET GROOMING SECTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#f8f2e9] via-[#f3e8da] to-[#ede0ce] relative overflow-hidden border-y border-[#e5d6c5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-label mb-3 inline-flex bg-amber-100/90 text-amber-900 border border-amber-200">
                <span>📍</span> Primary Service Hub
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#4e3323] font-bold mt-2 mb-4">
                Premium Pet Grooming at Your Doorstep in <span className="gradient-text italic">Gurgaon</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#7a5741] max-w-3xl mx-auto font-medium leading-relaxed">
                Looking for top-rated <strong>Dog Grooming in Gurgaon</strong> or <strong>Cat Grooming in Gurgaon</strong>? Sniffnsnooz operates luxury mobile pet grooming vans arriving in 10-25 minutes across all major sectors, plus our flagship pet spa at Emerald Plaza, Sector 65.
              </p>
            </div>
          </ScrollReveal>

          {/* GURGAON SECTORS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {gurgaonSectors.map((sector, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <Link href={`/locations/gurugram/${sector.slug}`}>
                  <div className="card-premium p-5 h-full flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200 cursor-pointer bg-white/90 border border-white/80 shadow-md hover:shadow-xl relative overflow-hidden group">
                    {sector.badge && (
                      <span className="absolute top-3 right-3 text-[10px] font-black bg-[#5b3a26] text-white px-2 py-0.5 rounded-full">
                        {sector.badge}
                      </span>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#8c5a3b] mb-1">
                        <span>⚡ {sector.time} Arrival</span>
                      </div>
                      <h3 className="font-serif font-bold text-[#4e3323] text-lg mb-1 group-hover:text-[#8c5a3b] transition-colors">
                        {sector.name}
                      </h3>
                      <p className="text-xs text-[#7a5741] leading-relaxed mb-3">
                        {sector.desc}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-[#f0e6da] flex items-center justify-between text-xs font-bold text-[#5b3a26]">
                      <span>Book Sector Slot</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* KEYWORD HIGHLIGHT BANNER */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#e5d6c5] shadow-sm text-center max-w-4xl mx-auto">
              <h3 className="font-serif font-bold text-[#4e3323] text-lg mb-2">
                Mobile Pet Grooming &amp; Dog Grooming at Home in Gurgaon
              </h3>
              <p className="text-xs sm:text-sm text-[#7a5741] leading-relaxed mb-4">
                We bring 100% stress-free mobile pet grooming directly to your doorstep in <strong>Sector 65 Gurgaon</strong>, <strong>Sector 57 Gurgaon</strong>, <strong>Sector 67 Gurgaon</strong>, Golf Course Road, Sohna Road, DLF Phases, and Nirvana Country. Organic baths, breed haircuts, anti-tick treatments, and home vet visits.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/store-booking" className="btn-primary inline-flex text-xs px-5 py-2.5">
                  Book Doorstep Grooming in Gurgaon 🐾
                </Link>
                <a href="tel:+919818728444" className="bg-[#f6efe6] text-[#5b3a26] hover:bg-[#eadfce] px-5 py-2.5 rounded-full font-bold text-xs border border-[#d8c3b0] inline-flex items-center gap-1.5 transition">
                  📞 Call / WhatsApp: 98187 28444
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. REVIEWS CAROUSEL */}
      <section className="py-12 bg-gradient-to-b from-[#faf6f0] to-white">
        <ScrollReveal delay={0.1}>
          <ReviewsCarousel />
        </ScrollReveal>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
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

      {/* 7. ABOUT + WHY US SECTION */}
      <ScrollReveal delay={0.1}>
        <HomeAboutSection />
      </ScrollReveal>

      {/* 8. CITIES WE SERVE */}
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
                Premium doorstep pet grooming delivered across Gurgaon and the entire Delhi NCR region.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className={`glass-card flex items-center gap-2.5 px-4 sm:px-6 py-3 sm:py-4 hover-lift cursor-default ${city.highlight ? "border-2 border-[#5b3a26] bg-amber-50/80 shadow-md" : ""}`}
                >
                  <span className="text-xl sm:text-2xl">{city.emoji}</span>
                  <span className="font-semibold text-[#5b3a26] text-sm sm:text-lg">{city.name}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <ScrollReveal delay={0.1}>
        <HomeFAQSection />
      </ScrollReveal>
    </div>
  );
}
