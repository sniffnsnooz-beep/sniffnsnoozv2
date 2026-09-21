import type { Metadata } from "next";
import Link from "next/link";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeFAQSection from "@/components/HomeFAQSection";

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

const gurgaonSectors = [
  { name: "Sec 65", location: "Emerald Plaza", time: "10 Mins", isPrimary: true },
  { name: "Sec 57 & 67", location: "BPTP & Urbana", time: "15 Mins", isPrimary: false },
  { name: "DLF Phase 5", location: "Golf Course Rd", time: "20 Mins", isPrimary: false },
  { name: "Sohna Rd", location: "Sushant Lok 1 & 2", time: "25 Mins", isPrimary: false },
];

export default function Home() {
  return (
    <div className="bg-surface-cream text-on-surface antialiased min-h-screen">
      {/* Top Live Announcement Strip */}
      <div className="px-margin pt-space-xs pb-space-xs">
        <div className="bg-surface-champagne rounded-xl p-space-sm flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-space-xs min-w-0">
            <span className="flex h-2.5 w-2.5 rounded-full bg-status-verified animate-ping shrink-0" />
            <span className="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
            <p className="font-label-sm text-label-sm text-on-surface truncate">
              <span className="font-bold text-primary">Delhi NCR &amp; Gurgaon:</span> Free doorstep grooming consultation
            </p>
          </div>
          <a
            className="bg-surface-card-subtle text-primary px-space-xs py-space-2xs rounded-full font-label-sm text-label-sm font-bold whitespace-nowrap active:scale-95 transition-transform ml-2"
            href="tel:+919818728444"
          >
            Call Now
          </a>
        </div>
      </div>

      {/* Hero Sanctuary Showcase */}
      <section className="px-margin pt-space-xs pb-space-sm max-w-7xl mx-auto">
        <div className="bg-surface-champagne rounded-2xl overflow-hidden shadow-sm flex flex-col">
          {/* Media Frame with Pet Spa Atmosphere */}
          <div className="relative w-full h-56 sm:h-80 bg-surface-card-subtle overflow-hidden">
            <img
              alt="Sniff and Snooz luxury pet spa dog bath"
              className="w-full h-full object-cover"
              src="/assets/pet_spa_bath.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 via-charcoal-dark/20 to-transparent" />
            <div className="absolute top-space-sm left-space-sm flex gap-space-2xs flex-wrap">
              <span className="bg-charcoal-dark/85 backdrop-blur-md text-amber-bright px-space-xs py-space-2xs rounded-full font-label-sm text-label-sm flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[13px] text-amber-bright" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                #1 IN NCR
              </span>
              <span className="bg-surface-cream/90 backdrop-blur-md text-secondary px-space-xs py-space-2xs rounded-full font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[13px] text-status-verified">verified</span>
                Vet Certified
              </span>
            </div>
            <div className="absolute bottom-space-sm left-space-sm right-space-sm">
              <span className="text-surface-cream font-label-sm text-label-sm uppercase tracking-wider font-semibold block mb-0.5">
                Gurgaon &amp; Delhi NCR Luxury Mobile Van
              </span>
              <p className="text-surface-cream font-title-lg sm:font-headline-lg text-title-lg font-bold leading-tight drop-shadow-sm">
                Complete Care. Happy Pets. Happy Homes.
              </p>
            </div>
          </div>

          {/* Hero Details & Fast CTAs */}
          <div className="p-space-md flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm flex-wrap">
              <span className="material-symbols-outlined text-primary text-[18px]">storefront</span>
              <span>Flagship Salon: <strong className="text-on-surface">Emerald Plaza, Sec 65</strong></span>
              <span className="text-outline-variant">•</span>
              <span>Mobile Spa Vans</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              From organic warm oat baths and breed haircuts to vet check-ups—delivered stress-free in our mobile grooming lounge or salon.
            </p>
            <div className="flex flex-col gap-space-xs pt-space-2xs">
              <Link
                className="w-full bg-primary text-on-primary font-label-lg text-label-lg py-3 rounded-full flex items-center justify-center gap-space-xs shadow-md active:scale-95 transition-transform font-bold"
                href="/store-booking"
              >
                <span>Book Grooming</span>
                <span className="material-symbols-outlined text-[18px]">pets</span>
              </Link>
              <div className="flex gap-space-xs">
                <a
                  className="flex-1 bg-surface-card-subtle text-primary font-label-md text-label-md py-2.5 rounded-full flex items-center justify-center gap-space-2xs active:scale-95 transition-transform"
                  href="https://wa.me/919818728444?text=Hello!%20I%20would%20like%20to%20book%20a%20grooming%20session%20for%20my%20pet."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp Us</span>
                </a>
                <a
                  className="flex-1 bg-surface-card-subtle text-secondary font-label-md text-label-md py-2.5 rounded-full flex items-center justify-center gap-space-2xs active:scale-95 transition-transform"
                  href="tel:+919818728444"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>98187 28444</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Express Sector Dispatch Radar */}
      <section className="px-margin py-space-xs max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-space-xs">
          <div className="flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-amber-bright text-[20px]">bolt</span>
            <h2 className="font-headline-sm text-headline-sm text-charcoal-dark font-bold">Express Van Arrival</h2>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-fixed/40 px-2 py-0.5 rounded-full">
            Live Slots
          </span>
        </div>
        {/* Horizontal Scroll Sector Chips */}
        <div className="flex gap-space-xs overflow-x-auto pb-space-2xs pt-1 no-scrollbar -mx-margin px-margin">
          {gurgaonSectors.map((sector, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 rounded-xl p-space-sm flex flex-col w-36 sm:w-44 shadow-sm ${
                sector.isPrimary ? "bg-charcoal-dark text-surface-cream" : "bg-surface-champagne text-on-surface"
              }`}
            >
              <span
                className={`font-label-sm text-label-sm font-bold flex items-center gap-1 ${
                  sector.isPrimary ? "text-amber-bright" : "text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {sector.isPrimary ? "electric_bolt" : "schedule"}
                </span>{" "}
                {sector.time}
              </span>
              <span className="font-title-md text-title-md font-bold mt-1">{sector.name}</span>
              <span
                className={`font-label-sm text-label-sm mt-0.5 ${
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
            <h2 className="font-headline-sm text-headline-sm text-charcoal-dark font-bold">Wellness Care &amp; Services</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">At your doorstep or luxury lounge</p>
          </div>
          <Link className="font-label-sm text-label-sm text-primary font-bold" href="/services">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
          {/* 01 Grooming & Bath */}
          <Link
            href="/services/bath-spa-addons"
            className="bg-surface-champagne rounded-2xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-xs">
              <span className="material-symbols-outlined text-[22px]">shower</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-charcoal-dark font-bold">Grooming &amp; Bath</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Spa bath, breed haircut &amp; de-shedding</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-bold">From ₹1,333</span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
          </Link>

          {/* 02 Veterinary Care */}
          <Link
            href="/veterinary"
            className="bg-surface-champagne rounded-2xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-tertiary mb-space-xs">
              <span className="material-symbols-outlined text-[22px]">stethoscope</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-charcoal-dark font-bold">Veterinary Care</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Home vet visits &amp; health checks</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-tertiary font-bold">Certified Vets</span>
              <span className="material-symbols-outlined text-tertiary text-[18px]">arrow_forward</span>
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
              <h3 className="font-title-md text-title-md text-charcoal-dark font-bold">Pet Insurance</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Cashless surgery &amp; health coverage</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-secondary font-bold">Instant Cover</span>
              <span className="material-symbols-outlined text-secondary text-[18px]">arrow_forward</span>
            </div>
          </Link>

          {/* 04 Find a Companion */}
          <Link
            href="/find-a-companion"
            className="bg-surface-champagne rounded-2xl p-space-sm flex flex-col justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-surface-card-subtle flex items-center justify-center text-primary mb-space-xs">
              <span className="material-symbols-outlined text-[22px]">diversity_1</span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-charcoal-dark font-bold">Companionship</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Ethical matchmaking &amp; play</p>
            </div>
            <div className="mt-space-sm flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-bold">Verified Partners</span>
              <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Special: 3-Tier Grooming Collection (Hero Spotlight) */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <div className="bg-badge-popular-bg text-surface-cream rounded-3xl p-space-md shadow-xl flex flex-col relative overflow-hidden">
          {/* Glow & Badge */}
          <div className="flex items-center justify-between">
            <span className="bg-primary text-on-primary font-label-sm text-label-sm uppercase font-extrabold px-space-xs py-space-2xs rounded-full tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-amber-bright" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              EXCLUSIVE OFFER 1 / 6
            </span>
            <span className="text-amber-bright font-label-sm text-label-sm font-bold">Save 25% Today</span>
          </div>

          {/* Title & Visual Card */}
          <div className="pt-space-sm pb-space-xs">
            <h3 className="font-headline-md text-headline-md font-bold text-surface-cream">The 3-Tier Grooming Collection</h3>
            <p className="font-body-sm text-body-sm text-outline-variant mt-1">Tailored for puppy, adult, &amp; long-coat fur babies</p>
          </div>

          {/* Feature Visual Strip */}
          <div className="relative w-full h-44 sm:h-64 rounded-2xl overflow-hidden my-space-xs shadow-md">
            <img
              alt="Happy trio dog puppy and kitten grooming pack"
              className="w-full h-full object-cover"
              src="/assets/banners/banner_3tier.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/85 via-transparent to-transparent" />
            <div className="absolute bottom-space-xs left-space-sm right-space-sm flex items-center justify-between">
              <span className="text-surface-cream font-label-sm text-label-sm font-semibold">Doorstep Mobile Lounge or Flagship</span>
              <span className="bg-status-verified text-surface-cream px-2 py-0.5 rounded-full font-label-sm text-label-sm font-bold">
                Stress-Free Bath
              </span>
            </div>
          </div>

          {/* The 3 Tiers Snapshot */}
          <div className="grid grid-cols-3 gap-space-2xs my-space-xs text-center">
            <div className="bg-charcoal-dark/80 rounded-xl p-space-xs flex flex-col items-center">
              <span className="font-label-sm text-label-sm text-outline-variant uppercase">Essential</span>
              <span className="font-price-callout text-price-callout text-amber-bright mt-1">₹1,333</span>
              <span className="font-label-sm text-label-sm text-surface-cream/80 scale-90">Bath + Nails</span>
            </div>
            <div className="bg-primary/30 rounded-xl p-space-xs flex flex-col items-center border border-amber-bright/40">
              <span className="font-label-sm text-label-sm text-amber-bright uppercase font-bold">Signature</span>
              <span className="font-price-callout text-price-callout text-surface-cream mt-1">₹1,599</span>
              <span className="font-label-sm text-label-sm text-amber-bright scale-90">Full Haircut</span>
            </div>
            <div className="bg-charcoal-dark/80 rounded-xl p-space-xs flex flex-col items-center">
              <span className="font-label-sm text-label-sm text-outline-variant uppercase">Luxury</span>
              <span className="font-price-callout text-price-callout text-amber-bright mt-1">₹1,999</span>
              <span className="font-label-sm text-label-sm text-surface-cream/80 scale-90">Hydra 7-Oils</span>
            </div>
          </div>

          <div className="pt-space-xs flex gap-space-xs">
            <Link
              className="flex-1 bg-amber-bright text-charcoal-dark font-label-lg text-label-lg py-3 rounded-full flex items-center justify-center gap-space-xs shadow-md font-bold active:scale-95 transition-transform"
              href="/booking"
            >
              <span>Book Offer</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
            <a
              className="h-12 w-12 rounded-full bg-surface-card-subtle flex items-center justify-center text-charcoal-dark active:scale-95 transition-transform shrink-0"
              href="tel:+919818728444"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works: 3 Simple Steps */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <div className="flex items-center gap-space-2xs pb-space-xs">
          <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
          <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Simple Process</span>
        </div>
        <h2 className="font-headline-md text-headline-md text-charcoal-dark font-bold">How It Works</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Three simple steps to a pampered, clean, stress-free pet.</p>
        <div className="mt-space-sm flex flex-col gap-space-xs">
          {/* Step 1 */}
          <div className="bg-surface-champagne rounded-2xl p-space-sm flex items-start gap-space-sm shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-card-subtle flex-shrink-0 flex items-center justify-center">
              <span className="font-price-callout text-price-callout text-primary">01</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-primary text-[18px]">touch_app</span>
                <h3 className="font-title-md text-title-md text-charcoal-dark font-bold">Book Online</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Select your package, specify breed, and choose your preferred 2-minute time slot.
              </p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="bg-surface-champagne rounded-2xl p-space-sm flex items-start gap-space-sm shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex-shrink-0 flex items-center justify-center">
              <span className="font-price-callout text-price-callout text-primary">02</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-primary text-[18px]">airport_shuttle</span>
                <h3 className="font-title-md text-title-md text-charcoal-dark font-bold">We Come to You</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Our certified groomer arrives in a temperature-controlled luxury mobile pet spa van.
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
                <h3 className="font-title-md text-title-md text-charcoal-dark font-bold">Happy, Clean Pet</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Your pet steps out clean, perfumed, de-shedded, and joyful—zero travel stress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Strip */}
      <section className="px-margin py-space-xs max-w-7xl mx-auto">
        <div className="bg-surface-card-subtle rounded-2xl p-space-md flex items-center justify-between text-center">
          <div className="flex flex-col items-center">
            <span className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary">3,000+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">Happy Pets</span>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div className="flex flex-col items-center">
            <span className="font-display-lg-mobile text-display-lg-mobile font-bold text-charcoal-dark">5.0★</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">300+ Reviews</span>
          </div>
          <div className="h-8 w-px bg-outline-variant/40" />
          <div className="flex flex-col items-center">
            <span className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary">6+</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">NCR Cities</span>
          </div>
        </div>
      </section>

      {/* Social Proof: Verified Reviews */}
      <section className="px-margin py-space-sm max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-space-xs">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-charcoal-dark font-bold">NCR Pet Parents Love Us</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Verified 5-Star feedback from pet owners</p>
          </div>
          <span className="material-symbols-outlined text-amber-bright text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            stars
          </span>
        </div>
        <div className="flex flex-col gap-space-xs">
          <div className="bg-surface-champagne rounded-2xl p-space-sm shadow-sm flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-label-md text-label-md">
                  D
                </div>
                <div>
                  <p className="font-title-md text-title-md font-bold text-charcoal-dark leading-tight">Deepu Bhai</p>
                  <span className="font-label-sm text-label-sm text-status-verified flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span> Verified Pet Parent
                  </span>
                </div>
              </div>
              <div className="flex text-amber-bright text-[15px]">★★★★★</div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs italic">
              “I'm absolutely delighted with the service! The groomers are incredibly friendly, professional, and passionate about pets. Best mobile grooming in Gurgaon.”
            </p>
          </div>

          <div className="bg-surface-champagne rounded-2xl p-space-sm shadow-sm flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-bold font-label-md text-label-md">
                  A
                </div>
                <div>
                  <p className="font-title-md text-title-md font-bold text-charcoal-dark leading-tight">Aman Roshni</p>
                  <span className="font-label-sm text-label-sm text-status-verified flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span> Verified Pet Parent
                  </span>
                </div>
              </div>
              <div className="flex text-amber-bright text-[15px]">★★★★★</div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs italic">
              “This pet grooming shop is truly exceptional! The staff's dedication to providing top-notch care is evident in every aspect. My Golden looked and smelled incredible.”
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
            <span className="font-title-md text-title-md text-charcoal-dark font-bold">Cities We Serve</span>
            <span className="font-label-sm text-label-sm text-primary font-bold">Delhi NCR Hub</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Gurugram • Delhi • Noida • Ghaziabad • Faridabad • Greater Noida</p>
          <div className="pt-space-xs">
            <a
              className="w-full bg-charcoal-dark text-amber-bright py-2.5 rounded-full font-label-md text-label-md flex items-center justify-center gap-space-xs font-bold active:scale-95 transition-transform"
              href="tel:+919818728444"
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>Speak With Pet Concierge</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <HomeFAQSection />
    </div>
  );
}

