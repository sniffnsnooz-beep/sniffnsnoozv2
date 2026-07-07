import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed | Sniffnsnooz",
  description: "Your pet grooming booking is confirmed.",
  alternates: {
    canonical: "/booking-success",
  },
  robots: { index: false },
  openGraph: {
    title: "Booking Confirmed | Sniffnsnooz",
    description: "Your pet grooming booking is confirmed.",
    url: "https://sniffnsnooz.in/booking-success",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
