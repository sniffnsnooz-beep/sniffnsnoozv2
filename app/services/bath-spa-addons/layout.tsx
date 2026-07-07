import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Bath & Spa Add-ons | Sniffnsnooz",
  description: "Luxurious bath and spa treatments for dogs and cats. Enhance their grooming session with our premium add-ons.",
  alternates: {
    canonical: "/services/bath-spa-addons",
  },
  openGraph: {
    title: "Pet Bath & Spa Add-ons | Sniffnsnooz",
    description: "Luxurious bath and spa treatments for dogs and cats. Enhance their grooming session with our premium add-ons.",
    url: "https://sniffnsnooz.in/services/bath-spa-addons",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
