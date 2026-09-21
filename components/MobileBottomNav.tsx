"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: "pets" },
    { label: "Doorstep", href: "/grooming", icon: "content_cut" },
    { label: "Vet Care", href: "/veterinary", icon: "stethoscope", isCenter: true },
    { label: "Book Salon", href: "/store-booking", icon: "calendar_month" },
    { label: "Contact", href: "/contact", icon: "call" },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-cream/95 backdrop-blur-xl border-t border-border-warm/60 shadow-[0_-4px_20px_rgba(91,58,38,0.06)] md:hidden">
      <div className="flex justify-around items-center h-16 px-space-xs">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-space-2xs text-on-surface-variant transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-red-700 via-amber-700 to-primary flex items-center justify-center text-white shadow-[0_4px_14px_rgba(185,28,28,0.4)] -mt-6 active:scale-95 transition-transform ring-4 ring-[#FFFDF9]">
                  <span className="material-symbols-outlined text-[22px]">stethoscope</span>
                </div>
                <span className="font-label-sm text-label-sm mt-space-2xs text-primary font-black uppercase tracking-tight">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-space-2xs transition-colors ${
                isActive ? "text-primary font-bold" : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="font-label-sm text-label-sm mt-space-2xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

