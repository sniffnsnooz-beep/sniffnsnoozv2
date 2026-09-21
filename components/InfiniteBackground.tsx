"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const PawIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className}>
    <path d="M226.5 92.9c14.3 7.3 22.8 16.6 35.1 16.6s20.8-9.3 35.1-16.6c26.2-13.5 50-39.2 78.4-23.7 26.6 14.5 30.5 49.3 22.8 78-7.9 29.5-27 49-53 59-19.4 7.5-40 4-61 4h-43.6c-21 0-41.6 3.5-61-4-26-10-45.1-29.5-53-59-7.7-28.7-3.8-63.5 22.8-78 28.4-15.5 52.2 10.2 78.4 23.7zM113 252c-23.6-7.5-47.5-7.5-66.2 5.5-20.7 14.5-29 39.4-23.3 65.5 5.3 24.3 23 44 47.7 51.7 23.6 7.5 47.5 7.5 66.2-5.5 20.7-14.5 29-39.4 23.3-65.5-5.2-24.3-22.9-44-47.7-51.7zM399 252c-24.8 7.7-42.5 27.4-47.7 51.7-5.7 26.1 2.6 51 23.3 65.5 18.7 13 42.6 13 66.2-5.5 24.7-7.7 42.4-27.4 47.7-51.7 5.7-26.1-2.6-51-23.3-65.5-18.7-13-42.6-13-66.2 5.5zM256 224c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64z" />
  </svg>
);

export default function InfiniteBackground() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const elements = [
    { left: 10, duration: 25, delay: -5, size: 40, type: 'paw' },
    { left: 25, duration: 35, delay: -15, size: 30, type: 'sparkle' },
    { left: 40, duration: 28, delay: -2, size: 45, type: 'paw' },
    { left: 55, duration: 40, delay: -25, size: 25, type: 'sparkle' },
    { left: 70, duration: 22, delay: -10, size: 50, type: 'paw' },
    { left: 85, duration: 32, delay: -20, size: 35, type: 'sparkle' },
    { left: 15, duration: 30, delay: -12, size: 28, type: 'paw' },
    { left: 45, duration: 24, delay: -8, size: 42, type: 'sparkle' },
    { left: 75, duration: 38, delay: -18, size: 32, type: 'paw' },
    { left: 90, duration: 26, delay: -4, size: 38, type: 'sparkle' },
    { left: 5, duration: 36, delay: -22, size: 34, type: 'paw' },
    { left: 95, duration: 29, delay: -14, size: 46, type: 'sparkle' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {elements.map((el, i) => (
        <div
          key={i}
          className="animate-float-up text-[#8c5a3b]/25 absolute"
          style={{
            left: `${el.left}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 'paw' ? <PawIcon className="w-full h-full" /> : <Sparkles className="w-full h-full" />}
        </div>
      ))}
    </div>
  );
}
