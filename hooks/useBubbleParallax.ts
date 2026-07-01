"use client";

import { useEffect } from "react";

export function useBubbleParallax() {
  useEffect(() => {
    const bubbles = document.querySelectorAll<HTMLElement>(".bubble");

    function handleMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      bubbles.forEach((bubble) => {
        const depth = Number(bubble.dataset.depth || 1);
        bubble.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
}
