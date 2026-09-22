"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("sniffnsnooz_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't pop up immediately on first load
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("sniffnsnooz_cookie_consent", "true");
    
    // Here you could potentially initialize Google Analytics or other trackers 
    // that strictly require consent. For now, we just hide the banner.
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:bottom-8 md:max-w-md z-[100] bg-white border border-[#eae0d5] shadow-2xl rounded-2xl p-5"
        >
          <div className="flex gap-4">
            <div className="hidden sm:flex shrink-0 w-12 h-12 bg-[#5b3a26]/10 rounded-full items-center justify-center">
              <Cookie className="w-6 h-6 text-[#5b3a26]" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-[#4e3323] flex items-center gap-2">
                  <span className="sm:hidden"><Cookie className="w-4 h-4" /></span>
                  We use cookies
                </h3>
                <button 
                  onClick={() => setShowConsent(false)}
                  className="text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#7a5741] leading-relaxed mb-4">
                We use cookies to personalize your experience, remember your preferences, and analyze our traffic to provide you with the best pet care service. 
                <Link href="/privacy-policy" className="underline ml-1 hover:text-[#4e3323]">
                  Learn more
                </Link>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={acceptCookies}
                  className="flex-1 bg-[#5b3a26] hover:bg-[#4a2e1d] text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setShowConsent(false)}
                  className="flex-1 bg-[#f4ece3] hover:bg-[#e6d5c3] text-[#5b3a26] text-xs font-bold py-2.5 rounded-lg transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
