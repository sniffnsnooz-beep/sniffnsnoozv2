'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { Stethoscope, Scissors, Sparkles, ChevronRight, PhoneCall } from 'lucide-react';

export default function PriorityCareSpotlight({
  classname,
}: {
  classname?: string;
}) {
  return (
    <section className="w-full max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-8">
        <span className="bg-red-950/80 text-amber-300 border border-amber-500/30 text-xs font-black uppercase px-3.5 py-1 rounded-full tracking-widest inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> SPOTLIGHT SERVICES
        </span>
        <h2 className="text-3xl sm:text-5xl font-elsie font-black text-charcoal-dark mt-2">
          Priority Vet &amp; Doorstep Grooming Care
        </h2>
        <p className="text-sm text-on-surface-variant max-w-md mx-auto mt-1 font-medium">
          Animated luxury booking cards with 100% verified doctor visits &amp; organic pet grooming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: VETERINARY DOCTOR CONSULTATION (PRIORITY #1) */}
        <Link
          href="/veterinary-booking"
          className={cn(
            'border border-red-900/30 relative group cursor-pointer min-h-[360px] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#3d2410] to-[#251509] text-amber-50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-red-900/40 transition-all duration-300',
            classname
          )}
        >
          {/* Animated Background SVG Pattern */}
          <svg
            width='424'
            className='absolute top-0 left-0 w-full h-full scale-[1.8] translate-x-4 group-hover:scale-50 group-hover:opacity-0 duration-500 group-hover:delay-0 delay-100 opacity-20 pointer-events-none'
            height='424'
            viewBox='0 0 424 424'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.40649 39.5516L6.81714 36.5893C6.66936 36.1865 6.40715 35.8672 6.03051 35.6314C5.65387 35.3956 5.26462 35.3515 4.86275 35.4989C3.51103 35.9948 2.71814 37.449 2.48409 39.8616C2.2366 42.2376 2.45543 44.3595 3.14059 46.2271C3.82576 48.0948 4.76689 49.4738 5.96398 50.3642C7.14765 51.218 8.28748 51.4438 9.38347 51.0418C10.516 50.6263 11.4266 50.0014 12.1153 49.167C12.804 48.3327 13.3391 47.3054 13.7204 46.0852C14.5159 43.5082 14.9914 40.7369 15.147 37.7714'
              className='fill-red-400'
            />
            <circle cx="212" cy="212" r="180" stroke="#EF4444" strokeWidth="4" strokeDasharray="8 8" />
            <circle cx="212" cy="212" r="140" stroke="#DC2626" strokeWidth="2" />
          </svg>

          {/* Inner Card Content */}
          <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-red-500/20 border border-red-400/40 flex items-center justify-center text-red-400 shadow-inner group-hover:scale-110 group-hover:bg-red-700 group-hover:text-white transition-all duration-300">
              <Stethoscope className="w-10 h-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>

            <span className="bg-red-600/30 text-red-300 border border-red-400/40 font-black text-[11px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              TOP PRIORITY HEALTHCARE
            </span>

            <h3 className="font-elsie text-3xl sm:text-4xl font-black text-amber-100 group-hover:text-white transition-colors">
              Veterinary Doctor Consult 🏥
            </h3>

            <p className="text-xs sm:text-sm text-amber-100/80 max-w-sm font-medium leading-relaxed">
              Annual vaccinations, health checks, diagnostic blood tests &amp; doctor consultations at home or Emerald Plaza clinic.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-amber-600 to-amber-700 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg group-hover:scale-105 transition-transform">
              <span>Book Vet Consult Now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* CARD 2: DOORSTEP PET GROOMING */}
        <Link
          href="/store-booking"
          className={cn(
            'border border-amber-900/30 relative group cursor-pointer min-h-[360px] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#3d2410] to-[#251509] text-amber-50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-amber-900/40 transition-all duration-300',
            classname
          )}
        >
          {/* Animated Background SVG Pattern */}
          <svg
            width='424'
            className='absolute top-0 left-0 w-full h-full scale-[1.8] translate-x-4 group-hover:scale-50 group-hover:opacity-0 duration-500 group-hover:delay-0 delay-100 opacity-20 pointer-events-none'
            height='424'
            viewBox='0 0 424 424'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.40649 39.5516L6.81714 36.5893C6.66936 36.1865 6.40715 35.8672 6.03051 35.6314C5.65387 35.3956 5.26462 35.3515 4.86275 35.4989C3.51103 35.9948 2.71814 37.449 2.48409 39.8616C2.2366 42.2376 2.45543 44.3595 3.14059 46.2271'
              className='fill-amber-300'
            />
            <circle cx="212" cy="212" r="180" stroke="#F59E0B" strokeWidth="4" strokeDasharray="8 8" />
            <circle cx="212" cy="212" r="140" stroke="#D97706" strokeWidth="2" />
          </svg>

          {/* Inner Card Content */}
          <div className="relative z-10 flex flex-col items-center text-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
              <Scissors className="w-10 h-10 group-hover:-rotate-12 transition-transform duration-300" />
            </div>

            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 font-black text-[11px] uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              100% ORGANIC &amp; HYGIENIC
            </span>

            <h3 className="font-elsie text-3xl sm:text-4xl font-black text-amber-100 group-hover:text-white transition-colors">
              Doorstep &amp; Salon Grooming ✂️
            </h3>

            <p className="text-xs sm:text-sm text-amber-100/80 max-w-sm font-medium leading-relaxed">
              Warm organic oat baths, breed haircuts, paw care, ear cleaning &amp; de-shedding at your doorstep or salon lounge.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg group-hover:scale-105 transition-transform">
              <span>Book Grooming Appointment</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
