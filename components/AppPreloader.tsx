"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AppPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#FFFDF9] flex flex-col items-center justify-center p-6 select-none pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* Clean Circular Logo Badge with Breathing Pulse */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-ping" />
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-amber-500/40 shadow-2xl bg-white flex items-center justify-center p-1 relative z-10">
                <Image
                  src="/assets/snifflogo.webp"
                  alt="Sniffnsnooz logo"
                  width={112}
                  height={112}
                  priority
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>

            {/* Typography */}
            <div className="flex flex-col items-center">
              <h1 className="font-headline-lg text-2xl sm:text-3xl text-[#111827] font-bold tracking-tight">
                Sniff &apos;n&apos; Snooz
              </h1>
              <p className="font-label-md text-xs sm:text-sm text-[#8d4b00] uppercase font-bold tracking-widest mt-1">
                Luxury Pet Lounge &amp; Doorstep Spa
              </p>
            </div>

            {/* Android Native Loading Bar */}
            <div className="w-36 h-1 bg-[#E8DFD1] rounded-full overflow-hidden mt-4">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#D97706] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
