import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Ear Cleaning & Care | Sniffnsnooz",
  description: "Professional ear cleaning services to prevent infections and keep your pets ears healthy.",
  alternates: {
    canonical: "/services/ear-care",
  },
  openGraph: {
    title: "Pet Ear Cleaning & Care | Sniffnsnooz",
    description: "Professional ear cleaning services to prevent infections and keep your pets ears healthy.",
    url: "https://sniffnsnooz.in/services/ear-care",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
