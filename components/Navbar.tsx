"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Phone, Star } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks: { href: string; label: string; emoji: string; highlight?: boolean }[] = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/services", label: "Grooming", emoji: "✂️" },
  { href: "/veterinary", label: "Veterinary", emoji: "🩺" },
  { href: "/find-a-companion", label: "Find a Companion", emoji: "🐾" },
  { href: "/pet-insurance", label: "Pet Insurance", emoji: "🛡️" },
  { href: "/gallery", label: "Gallery", emoji: "🖼️" },
  { href: "/news", label: "Blog", emoji: "📰" },
  { href: "/contact", label: "Contact", emoji: "📞" },
];

export default function Navbar() {
  const { count } = useBooking();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="announcement-bar fixed top-0 left-0 w-full z-[60] overflow-hidden"
          >
            <div className="flex items-center justify-center gap-4 relative px-8">
              <span>🐾 Free doorstep grooming consultation across Delhi NCR</span>
              <a href="tel:+919818728444" className="hidden sm:flex items-center gap-1 bg-white/20 rounded-full px-3 py-0.5 text-xs hover:bg-white/30 transition">
                <Phone size={11} /> Call Now
              </a>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition"
                aria-label="Close announcement"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN NAVBAR */}
      <nav
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
          showAnnouncement ? "top-[37px]" : "top-0"
        } ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/40"
            : "bg-white/50 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-[68px]">

          {/* LOGO */}
          <Link href="/" className="flex items-center h-full py-1 shrink-0">
            <Image
              src="/assets/snifflogo.png"
              alt="Sniffnsnooz logo"
              width={200}
              height={64}
              priority
              className="object-contain h-[48px] w-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 text-[13.5px] font-medium text-[#6b4a35]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full transition-all duration-200 group ${
                  isActive(link.href)
                    ? "bg-[#5b3a26]/10 text-[#5b3a26] font-semibold"
                    : "hover:bg-[#5b3a26]/6 hover:text-[#4a2f1f]"
                } ${link.highlight && !isActive(link.href) ? "text-orange-800 font-bold" : ""}`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#5b3a26] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-2">
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

            {/* BOOK CTA */}
            <Link
              href="/store-booking"
              className="hidden md:inline-flex items-center gap-1.5 btn-primary !py-2.5 !px-5 !text-sm"
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[280px] z-50 bg-white/98 backdrop-blur-xl shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#f0e8df]">
                <Image src="/assets/snifflogo.png" alt="Logo" width={130} height={40} className="object-contain h-9 w-auto" />
                <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-[#f6efe6] text-[#5b3a26]">
                  <X size={18} />
                </button>
              </div>

              <div className="mx-4 mt-3 mb-1 flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                <span className="text-xs font-semibold text-amber-800 ml-1">4.9 · 2000+ happy pets</span>
              </div>

              <nav className="flex flex-col gap-0.5 p-4 flex-grow overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive(link.href)
                          ? "bg-[#5b3a26] text-white shadow-md"
                          : "text-[#5b3a26] hover:bg-[#f6efe6]"
                      } ${link.highlight && !isActive(link.href) ? "text-orange-800 bg-orange-50/50" : ""}`}
                    >
                      <span className="text-base">{link.emoji}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 space-y-2 border-t border-[#f0e8df]">
                <Link
                  href="/store-booking"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full btn-primary !py-3 !rounded-2xl !text-base"
                >
                  Book Grooming 🐾
                </Link>
                <Link
                  href="/veterinary-booking"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-red-50 text-red-800 border-2 border-red-100 py-3 rounded-2xl font-semibold text-sm hover:bg-red-100 transition"
                >
                  🩺 Book Vet Appointment
                </Link>
                <a
                  href="tel:+919818728444"
                  className="flex items-center justify-center gap-2 w-full bg-[#f6efe6] text-[#5b3a26] py-3 rounded-2xl font-semibold text-sm hover:bg-[#eadfce] transition"
                >
                  <Phone size={16} /> Call Us Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}