import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Doorstep Pet Grooming | Sniffnsnooz",
  description: "Book a professional doorstep pet grooming session in Delhi NCR today. Easy online booking for dogs and cats.",
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: "Book Doorstep Pet Grooming | Sniffnsnooz",
    description: "Book a professional doorstep pet grooming session in Delhi NCR today. Easy online booking for dogs and cats.",
    url: "https://sniffnsnooz.in/booking",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
