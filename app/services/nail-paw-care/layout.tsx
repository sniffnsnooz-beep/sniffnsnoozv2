import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Nail Clipping & Paw Care | Sniffnsnooz",
  description: "Safe nail clipping and paw pad treatments for dogs and cats.",
  alternates: {
    canonical: "/services/nail-paw-care",
  },
  openGraph: {
    title: "Pet Nail Clipping & Paw Care | Sniffnsnooz",
    description: "Safe nail clipping and paw pad treatments for dogs and cats.",
    url: "https://sniffnsnooz.in/services/nail-paw-care",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
