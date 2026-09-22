"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function ServiceWorkerRegistration() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          console.log("Service Worker registered successfully");
        })
        .catch((error) => {
          console.log("Service Worker registration failed: ", error);
        });
    }

    // 2. Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show our custom prompt UI after 2.5 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 2500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 3. Listen for successful installation
    window.addEventListener("appinstalled", () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log("PWA was installed");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the native install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    
    // We hide our custom UI regardless of outcome
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[350px] md:bottom-8 z-50 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-2xl p-4 flex items-center justify-between border border-stone-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#5b3a26]/10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative p-1 border border-[#5b3a26]/20">
              <Image 
                src="/icon-192x192.png" 
                alt="Sniffnsnooz Icon" 
                fill 
                className="object-contain p-1" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#5b3a26] text-[15px] leading-tight">Sniffnsnooz App</span>
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">Fast & Easy Access</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 pl-2 border-l border-stone-100">
            <button
              onClick={handleInstallClick}
              className="bg-[#5b3a26] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 hover:bg-[#4a2e1d] transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
