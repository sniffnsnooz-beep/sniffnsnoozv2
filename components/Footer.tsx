"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* SEO: FOOTER SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sniffnsnooz",
            "url": "https://sniffnsnooz.in",
            "logo": "https://sniffnsnooz.in/assets/snifflogo.png",
            "image": "https://sniffnsnooz.in/assets/snifflogo.png",
            "telephone": "+91-9971135063",
            "email": "sniffnsnooz@gmail.com",
            "priceRange": "₹₹",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ground Floor, GF-79, Emerald Plaza, Shop No. EPS, Sector 65",
              "addressLocality": "Gurugram",
              "addressRegion": "Haryana",
              "postalCode": "122018",
              "addressCountry": "IN",
            },
            "areaServed": "Delhi NCR",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "250",
            },
            "sameAs": [
              "https://x.com/sniffnsnooz",
              "https://www.facebook.com/sniffnsnooz",
              "https://www.linkedin.com/company/sniffnsnooz",
              "https://www.instagram.com/sniffnsnooz",
            ],
          }),
        }}
      />

      <footer className="relative bg-[#2b1a12] text-[#f6efe6] pt-20 pb-8 mt-0 overflow-hidden">
        {/* Gradient top border */}
        <div className="divider-gradient-top absolute top-0 left-0 w-full" />

        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5b3a26]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#8c5a3b]/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* MAIN FOOTER GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">

            {/* BRAND */}
            <div className="page-animate page-delay-1 lg:col-span-1">
              <h3 className="text-2xl font-serif mb-4 gradient-text-amber">Sniffnsnooz</h3>
              <p className="text-sm leading-relaxed text-[#c8b8a8]">
                Premium doorstep pet grooming delivering stress-free, hygienic, and professional care for dogs and cats across Delhi NCR.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-5 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="text-xs text-[#c8b8a8] ml-2">4.9 by 250+ Pet Parents</span>
              </div>

              {/* Newsletter */}
              <div className="mt-6">
                <p className="text-xs font-bold text-[#c8b8a8] uppercase tracking-widest mb-3">Get Pet Care Tips</p>
                <div className="flex gap-0 overflow-hidden rounded-xl border border-white/10">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none"
                  />
                  <button className="bg-[#5b3a26] hover:bg-[#7a5741] px-3 py-2.5 transition-colors">
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Social */}
              <div className="mt-6">
                <p className="text-xs font-bold text-[#c8b8a8] uppercase tracking-widest mb-3">Follow Us</p>
                <div className="flex items-center gap-3">
                  {[
                    { href: "https://x.com/sniffnsnooz", icon: <Twitter size={18} />, label: "X" },
                    { href: "https://www.facebook.com/people/Sniff-n-Snooz/61576835232219/#", icon: <Facebook size={18} />, label: "Facebook" },
                    { href: "https://www.linkedin.com/in/sniff-n-snooz-sawhnney-044333381/", icon: <Linkedin size={18} />, label: "LinkedIn" },
                    { href: "https://www.instagram.com/sniffnsnooz_/", icon: <Instagram size={18} />, label: "Instagram" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Sniffnsnooz on ${s.label}`}
                      className="w-9 h-9 rounded-xl bg-white/8 hover:bg-[#5b3a26] border border-white/10 hover:border-[#5b3a26] flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div className="page-animate page-delay-2">
              <h4 className="text-base font-bold mb-5 text-white">Our Services</h4>
              <ul className="space-y-2.5 text-sm text-[#c8b8a8]">
                {[
                  { label: "Dog & Cat Grooming", href: "/services" },
                  { label: "Hair & Styling Services", href: "/services/hair-styling" },
                  { label: "Hydra Bath & Spa", href: "/services/bath-spa-addons" },
                  { label: "Ear, Nail & Hygiene", href: "/services/ear-care" },
                  { label: "Coat & Skin Treatment", href: "/services/coat-skin-treatment" },
                  { label: "Grooming Packages", href: "/packages" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#8c5a3b] transition-all duration-200 inline-block" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="page-animate page-delay-3">
              <h4 className="text-base font-bold mb-5 text-white">Contact Us</h4>
              <ul className="space-y-4 text-sm text-[#c8b8a8]">
                <li>
                  <a href="tel:+919818728444" className="flex items-start gap-3 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-[#5b3a26] transition-colors">
                      <Phone size={15} />
                    </div>
                    <div>
                      <div className="text-xs text-[#8c7060] font-semibold uppercase tracking-wide">Phone</div>
                      +91 98187 28444
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:sniffnsnooz@gmail.com" className="flex items-start gap-3 hover:text-white transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-[#5b3a26] transition-colors">
                      <Mail size={15} />
                    </div>
                    <div>
                      <div className="text-xs text-[#8c7060] font-semibold uppercase tracking-wide">Email</div>
                      sniffnsnooz@gmail.com
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=Emerald+Plaza+Sector+65+Gurugram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 group-hover:bg-[#5b3a26] transition-colors">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <div className="text-xs text-[#8c7060] font-semibold uppercase tracking-wide">Address</div>
                      GF-78, Emerald Plaza,<br />
                      Sector-65, Gurugram, HR 122018
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* QUICK LINKS */}
            <div className="page-animate page-delay-4">
              <h4 className="text-base font-bold mb-5 text-white">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-[#c8b8a8]">
                {[
                  { label: "Home", href: "/" },
                  { label: "Grooming Services", href: "/services" },
                  { label: "Veterinary Care", href: "/veterinary" },
                  { label: "Find a Companion", href: "/find-a-companion" },
                  { label: "Pet Insurance", href: "/pet-insurance" },
                  { label: "Gallery", href: "/gallery" },
                  { label: "Blog & News", href: "/news" },
                  { label: "Contact Us", href: "/contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#8c5a3b] transition-all duration-200 inline-block" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LEGAL + SEO */}
          <div className="mt-8 text-center text-sm text-[#8c7060]">
            <div className="flex flex-wrap justify-center gap-6 mb-5 text-[#c8b8a8]">
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <span className="opacity-30">|</span>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="opacity-30">|</span>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            </div>

            <p className="text-xs leading-relaxed max-w-5xl mx-auto opacity-60">
              Doorstep Pet Grooming in Delhi NCR | Dog Grooming at Home | Cat Grooming Services | Pet Spa &amp; Hygiene Care | Professional Groomers at Home | Sniffnsnooz Premium Pet Grooming
            </p>

            <p className="mt-4 text-xs font-semibold max-w-3xl mx-auto text-amber-100/70 border-t border-white/5 pt-4">
              ⚠️ Sniffnsnooz does not support unethical breeding or illegal pet trade. We connect pet lovers with trusted guidance and consultation services.
            </p>

            <p className="mt-4 text-xs opacity-40">
              © {new Date().getFullYear()} Sniffnsnooz. All rights reserved. Made with 🐾 in India.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
