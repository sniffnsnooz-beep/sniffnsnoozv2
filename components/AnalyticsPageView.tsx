"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MEASUREMENT_ID = "G-C819C0F186";

export default function AnalyticsPageView() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const url = pathname + window.location.search;
    const gtag = (window as Window & { gtag?: (command: string, ...args: unknown[]) => void }).gtag;
    if (typeof gtag === "function") {
      gtag("config", MEASUREMENT_ID, { page_path: url });
    }
  }, [pathname]);

  return null;
}