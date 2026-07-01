"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BookingSuccess() {
  useEffect(() => {
    // Window check taaki sirf browser mein chale
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17243845030/dtjLCKDmkKcbEKbjwJ5A', // ✅ Tera sahi label yahan lag gaya hai
        'value': 1.0,
        'currency': 'INR'
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf8f3] px-6 text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <span className="text-5xl">🐾</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-serif text-[#5b3a26] mb-4">
        Booking Received!
      </h1>
      
      <p className="text-lg text-gray-600 max-w-md mb-10 leading-relaxed">
       "Thank you! We have received your pet's details. We will contact you shortly."
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition shadow-lg"
        >
          Go Back Home
        </Link>
        <Link 
          href="https://wa.me/919971135063" 
          className="bg-green-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition shadow-lg flex items-center justify-center gap-2"
        >
          Chat on WhatsApp
        </Link>
      </div>
    </div>
  );
}