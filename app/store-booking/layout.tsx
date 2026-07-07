import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "In-Store Pet Grooming Booking | Sniffnsnooz",
  description: "Book an in-store pet grooming session at Sniffnsnooz. Premium care for your furry friends.",
  alternates: {
    canonical: "/store-booking",
  },
  openGraph: {
    title: "In-Store Pet Grooming Booking | Sniffnsnooz",
    description: "Book an in-store pet grooming session at Sniffnsnooz. Premium care for your furry friends.",
    url: "https://sniffnsnooz.in/store-booking",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
