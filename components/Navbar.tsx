"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Book" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/news", label: "News", highlight: true },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { count } = useBooking();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-md shadow-black/5"
            : "bg-white/40 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-[72px]">

          {/* LOGO */}
          <Link href="/" className="flex items-center h-full py-1 shrink-0">
            <Image
              src="/assets/snifflogo.png"
              alt="Sniffnsnooz logo"
              width={200}
              height={64}
              priority
              className="object-contain h-[52px] w-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#6b4a35]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group transition-colors hover:text-[#4a2f1f] ${
                  link.highlight ? "text-orange-800 font-bold" : ""
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5b3a26] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3">
            {/* CART */}
            <Link href="/booking" className="relative p-2 rounded-full hover:bg-white/60 transition">
              <ShoppingCart size={20} className="text-[#5b3a26]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#5b3a26] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* BOOK CTA (desktop only) */}
            <Link
              href="/store-booking"
              className="hidden md:inline-flex items-center gap-1.5 bg-[#5b3a26] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#4a2f1f] transition-colors shadow-md hover:shadow-lg"
            >
              Book Now 🐾
            </Link>

            {/* HAMBURGER */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-white/60 transition text-[#5b3a26]"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU — Animated */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 z-50 bg-white/95 backdrop-blur-xl shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#f0e8df]">
                <Image src="/assets/snifflogo.png" alt="Logo" width={140} height={44} className="object-contain h-10 w-auto" />
                <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-[#f6efe6] text-[#5b3a26]">
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-grow overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[#5b3a26] font-medium hover:bg-[#f6efe6] transition-colors ${
                        link.highlight ? "text-orange-800 font-bold bg-orange-50/50" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 border-t border-[#f0e8df]">
                <Link
                  href="/store-booking"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#5b3a26] text-white py-3 rounded-2xl font-bold text-base shadow-lg hover:bg-[#4a2f1f] transition"
                >
                  Book Grooming 🐾
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}