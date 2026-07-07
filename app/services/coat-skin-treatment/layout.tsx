import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coat & Skin Treatments for Pets | Sniffnsnooz",
  description: "Specialized coat and skin treatments for pets with allergies, shedding, or sensitive skin.",
  alternates: {
    canonical: "/services/coat-skin-treatment",
  },
  openGraph: {
    title: "Coat & Skin Treatments for Pets | Sniffnsnooz",
    description: "Specialized coat and skin treatments for pets with allergies, shedding, or sensitive skin.",
    url: "https://sniffnsnooz.in/services/coat-skin-treatment",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
