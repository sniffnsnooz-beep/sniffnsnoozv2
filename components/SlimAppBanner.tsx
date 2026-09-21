"use client";

import Link from "next/link";
import { Stethoscope, Sparkles, ChevronRight, Phone } from "lucide-react";

export default function SlimAppBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white overflow-hidden border-y border-amber-600/30 shadow-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          
          <div className="flex-1 flex items-center space-x-3 overflow-hidden">
             <div className="flex-shrink-0 bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
             </div>
             <div className="truncate">
               <p className="text-xs sm:text-sm font-semibold tracking-wide elsie-swash-caps-regular">
                 Expert Veterinary Care & Doorstep Grooming
               </p>
               <p className="text-[10px] sm:text-xs opacity-90 truncate hidden xs:block">
                 Book a consultation or at-home grooming today.
               </p>
             </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 ml-4">
             <Link 
               href="tel:+1234567890" 
               className="hidden md:flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
             >
               <Phone className="w-4 h-4 text-white" />
             </Link>
             
             <Link 
               href="/veterinary"
               className="flex items-center bg-white text-amber-600 hover:bg-amber-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
             >
               Book Now
               <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
             </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
