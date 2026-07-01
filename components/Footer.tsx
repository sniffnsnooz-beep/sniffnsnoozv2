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
} from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* =========================
          🧠 SEO: FOOTER SCHEMA (LOCAL BUSINESS + REVIEWS)
      ========================= */}
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
              "streetAddress":
                "Ground Floor, GF-79, Emerald Plaza, Shop No. EPS, Sector 65",
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

      <footer className="relative bg-[#2b1a12] text-[#f6efe6] pt-20 pb-8 mt-32">
        {/* TOP DIVIDER */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/20" />

        <div className="max-w-7xl mx-auto px-6">
          {/* =========================
              MAIN FOOTER GRID
          ========================= */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* ================= BRAND ================= */}
            <div className="page-animate page-delay-1">
              <h3 className="text-2xl font-serif mb-4">Sniffnsnooz</h3>

              <p className="text-sm leading-relaxed text-[#eadfce]">
                Sniffnsnooz is a premium doorstep pet grooming service delivering
                stress-free, hygienic, and professional grooming for dogs and
                cats across Delhi NCR.
                <br />
                <br />
                We believe pets are family — and they deserve comfort, patience,
                and premium care at home.
              </p>

              {/* ⭐ Rating Visual */}
              <div className="flex items-center gap-1 mt-4 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="text-xs text-[#eadfce] ml-2">
                  4.9 Rated by 250+ Pet Parents
                </span>
              </div>

              {/* ================= FOLLOW US ================= */}
              <div className="mt-6">
                <p className="text-sm mb-3 text-[#eadfce]">
                  Follow us on more
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href="https://x.com/sniffnsnooz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sniffnsnooz on X"
                    className="hover:text-white transition"
                  >
                    <Twitter size={18} />
                  </a>

                  <a
                    href="https://www.facebook.com/people/Sniff-n-Snooz/61576835232219/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sniffnsnooz on Facebook"
                    className="hover:text-white transition"
                  >
                    <Facebook size={18} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sniff-n-snooz-sawhnney-044333381/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sniffnsnooz on LinkedIn"
                    className="hover:text-white transition"
                  >
                    <Linkedin size={18} />
                  </a>

                  <a
                    href="https://www.instagram.com/sniffnsnooz_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Sniffnsnooz on Instagram"
                    className="hover:text-white transition"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* ================= SERVICES ================= */}
            <div className="page-animate page-delay-2">
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>

              <ul className="space-y-2 text-sm text-[#eadfce]">
                <li>Dog & Cat Grooming</li>
                <li>Hair & Styling Services</li>
                <li>Hydra Bath & Spa Treatments</li>
                <li>Ear, Nail & Hygiene Care</li>
                <li>Premium Grooming Packages</li>
              </ul>
            </div>

            {/* ================= CONTACT ================= */}
            <div className="page-animate page-delay-3">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>

              <ul className="space-y-3 text-sm text-[#eadfce]">
                <li className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5" />
                  <a
                    href="tel:+919818728444"
                    className="hover:underline"
                  >
+91 98187 28444    </a>
                </li>

                <li className="flex items-start gap-2">
                  <Mail size={16} className="mt-0.5" />
                  <a
                    href="mailto:sniffnsnooz@gmail.com"
                    className="hover:underline"
                  >
                    sniffnsnooz@gmail.com
                  </a>
                </li>

                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5" />
                  <a
                    href="https://maps.google.com/?q=Emerald+Plaza+Sector+65+Gurugram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Ground Floor, GF-78, Emerald Plaza,
                    <br />
                    Sector-65, Gurugram,
                    <br />
                    Haryana – 122018
                  </a>
                </li>
              </ul>
            </div>

            {/* ================= QUICK LINKS ================= */}
            <div className="page-animate page-delay-4">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>

              <ul className="space-y-2 text-sm text-[#eadfce]">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="hover:underline">
                    Packages
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="hover:underline">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= LEGAL + SEO ================= */}
          <div className="mt-14 pt-6 border-t border-white/20 text-center text-sm text-[#eadfce]">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Link href="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>

            <p className="text-xs leading-relaxed max-w-5xl mx-auto">
              Doorstep Pet Grooming in Delhi NCR | Dog Grooming at Home | Cat
              Grooming Services | Pet Spa & Hygiene Care | Professional Groomers
              at Home | Sniffnsnooz Premium Pet Grooming
            </p>

            <p className="mt-4 text-xs opacity-80">
              © {new Date().getFullYear()} Sniffnsnooz. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
