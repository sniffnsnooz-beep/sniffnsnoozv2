"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Phone, PhoneCall, Star, CalendarCheck, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { trackConversion } from "@/lib/gtag";

const navLinks: { href: string; label: string; emoji: string; highlight?: boolean }[] = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/services", label: "Services", emoji: "✨" },
  { href: "/grooming", label: "Grooming", emoji: "✂️" },
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
            className="announcement-bar fixed top-0 left-0 w-full z-[60] overflow-hidden bg-[#5b3a26] text-white text-xs py-1.5"
          >
            <div className="flex items-center justify-center gap-4 relative px-8 font-medium">
              <span>🚚 Free doorstep grooming consultation across Delhi NCR</span>
              <a
                href="tel:+919818728444"
                onClick={() => trackConversion("nav_call_click")}
                className="hidden sm:flex items-center gap-1 bg-white/20 rounded-full px-3 py-0.5 text-xs hover:bg-white/30 transition"
                aria-label="Call Sniffnsnooz for doorstep pet grooming"
                title="Call Us Now"
              >
                <PhoneCall size={13} /> Call Now
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
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${showAnnouncement ? "top-[32px]" : "top-0"
          } ${scrolled
            ? "bg-white/95 shadow-lg shadow-black/5 border-b border-white/40"
            : "bg-white/95"
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 h-[64px]">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 py-1 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-500/30 shadow-md bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
              <Image
                src="/assets/snifflogo.webp"
                alt="Sniffnsnooz logo"
                width={44}
                height={44}
                priority
                fetchPriority="high"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-elsie text-xl sm:text-2xl font-black text-charcoal-dark leading-none tracking-tight">
                Sniff &apos;n&apos; Snooz
              </span>
              <span className="text-[10px] sm:text-xs text-primary tracking-wider uppercase font-extrabold mt-0.5">
                Pet Lounge &amp; Vet Clinic
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 text-[13.5px] font-medium text-[#6b4a35]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-full transition-all duration-200 group ${isActive(link.href)
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
            {/* CALL / WHATSAPP CTA - Desktop */}
            <a
              href="tel:+919818728444"
              className="hidden lg:inline-flex items-center gap-1.5 bg-[#f6efe6] text-[#5b3a26] hover:bg-[#eadfce] text-xs font-bold px-3.5 py-2 rounded-full border border-[#d8c3b0] transition shrink-0"
              title="Call or WhatsApp: 98187 28444"
            >
              <Phone size={13} className="text-[#8c5a3b]" />
              <span>98187 28444</span>
            </a>

            {/* CART - Hidden on mobile, in bottom nav */}
            <Link 
              href="/booking" 
              onClick={() => trackConversion("nav_cart_click")}
              className="hidden md:flex relative p-2 rounded-full hover:bg-white/60 transition" 
              aria-label="View Shopping Cart"
              title="Shopping Cart"
            >
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

            {/* BOOK CTA - Hidden on mobile, in bottom nav */}
            <Link
              href="/store-booking"
              onClick={() => trackConversion("nav_book_click")}
              aria-label="Book Doorstep Pet Grooming"
              title="Book Grooming"
              className="hidden md:inline-flex items-center gap-1.5 bg-[#5b3a26] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:bg-[#462d1d] transition shrink-0"
            >
              <CalendarCheck size={14} className="text-white" />
              <span>Book Grooming 🐾</span>
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
              className="fixed inset-0 z-40 bg-black/20  md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-[320px] z-50 bg-gradient-to-b from-[#fdfbf7] to-[#f6efe6] shadow-2xl md:hidden flex flex-col rounded-l-3xl border-l border-white/60"
            >
              <div className="flex flex-col items-center justify-center p-6 border-b border-[#f0e8df]/60 relative">
                <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-2 rounded-full bg-white text-[#5b3a26] shadow-sm hover:scale-105 transition">
                  <X size={18} />
                </button>
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/30 shadow-md bg-white flex items-center justify-center p-0.5 mb-2">
                  <Image src="/assets/snifflogo.webp" alt="Logo" width={56} height={56} className="object-cover w-full h-full rounded-full" />
                </div>
                <span className="font-headline-sm text-headline-sm text-charcoal-dark font-bold leading-none tracking-tight">Sniff &apos;n&apos; Snooz</span>
                <p className="text-xs font-semibold text-[#8c5a3b] mb-3 mt-1">Welcome, Pet Parent! 🐾</p>
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50/40 border border-amber-200/60 rounded-full px-4 py-2 shadow-[0_4px_12px_rgba(245,158,11,0.15)]">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className="text-amber-500 fill-amber-400 drop-shadow-sm" />)}
                  </div>
                  <span className="text-xs font-bold text-amber-900 ml-1">5.0 · 3000+ happy pets</span>
                </div>
              </div>

              <nav className="flex flex-col gap-1.5 p-4 flex-grow overflow-y-auto scrollbar-hide">
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
                      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all ${isActive(link.href)
                          ? "bg-gradient-to-r from-[#5b3a26] to-[#7a5741] text-white shadow-lg shadow-[#5b3a26]/20"
                          : "text-[#4e3323] hover:bg-white hover:shadow-sm"
                        } ${link.highlight && !isActive(link.href) ? "text-orange-800 bg-orange-50/50 border border-orange-100/50" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg drop-shadow-sm">{link.emoji}</span>
                        <span className="text-[15px]">{link.label}</span>
                      </div>
                      {!isActive(link.href) && (
                        <ChevronRight size={16} className="text-[#8c5a3b]/50" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-5 space-y-2.5 bg-white/50 border-t border-[#f0e8df]/60 rounded-bl-3xl">
                <Link
                  href="/store-booking"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#5b3a26] to-[#7a5741] text-white py-3.5 rounded-full font-bold text-[15px] shadow-[0_8px_20px_rgba(91,58,38,0.25)] hover:scale-[0.98] transition-transform"
                >
                  Book Grooming 🐾
                </Link>
                <Link
                  href="/veterinary-booking"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-white text-red-700 border-2 border-red-100 py-3 rounded-full font-bold text-[14px] hover:bg-red-50 transition-colors shadow-sm"
                >
                  🩺 Book Vet Appointment
                </Link>
                <a
                  href="tel:+919818728444"
                  className="flex items-center justify-center gap-2 w-full bg-[#f6efe6] text-[#5b3a26] py-3 rounded-full font-bold text-[14px] hover:bg-[#eadfce] transition-colors"
                >
                  <Phone size={15} /> Call Us Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}