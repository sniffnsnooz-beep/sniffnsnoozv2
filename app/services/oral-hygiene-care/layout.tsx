import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Teeth Cleaning & Oral Hygiene | Sniffnsnooz",
  description: "Keep your pets teeth clean and breath fresh with our professional oral hygiene services.",
  alternates: {
    canonical: "/services/oral-hygiene-care",
  },
  openGraph: {
    title: "Pet Teeth Cleaning & Oral Hygiene | Sniffnsnooz",
    description: "Keep your pets teeth clean and breath fresh with our professional oral hygiene services.",
    url: "https://sniffnsnooz.in/services/oral-hygiene-care",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
