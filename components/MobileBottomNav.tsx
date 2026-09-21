"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, CalendarHeart, ShoppingCart, User } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Grid },
  { label: "Book", href: "/store-booking", icon: CalendarHeart },
  { label: "Cart", href: "/booking", icon: ShoppingCart },
  { label: "Profile", href: "/admin/login", icon: User }, // Or /profile if it exists
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useBooking();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 border-t border-brand-light/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 pb-[env(safe-area-inset-bottom)]">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const isBook = item.label === "Book";

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {isBook ? (
                <div className="absolute -top-6 bg-gradient-to-tr from-[#5b3a26] to-[#7a5741] text-white p-3 rounded-full shadow-[0_8px_16px_rgba(91,58,38,0.3)] border-4 border-white transition-transform hover:scale-105 active:scale-95">
                  <Icon size={24} strokeWidth={2.5} />
                </div>
              ) : (
                <div className="relative mt-1">
                  <Icon
                    size={22}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-[#5b3a26]" : "text-[#5b3a26]/40"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  
                  {/* Cart Badge */}
                  {item.label === "Cart" && count > 0 && (
                    <AnimatePresence>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white"
                      >
                        {count}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>
              )}
              
              <span
                className={`text-[10px] font-medium transition-colors duration-300 ${isBook ? "mt-7" : "mt-1"} ${
                  isActive || isBook ? "text-[#5b3a26] font-bold" : "text-[#5b3a26]/50"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
