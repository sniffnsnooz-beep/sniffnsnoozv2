import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Pet Care Services | Grooming, Vet, Companion, Insurance & Boarding | Sniffnsnooz",
  description: "Explore all premium pet care services by Sniff & Snooz in Delhi NCR. Doorstep & Storefront Pet Grooming, Veterinary Care, Pet Companion Finder, Pet Insurance, Pet Sitting & Boarding.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Complete Pet Care Services | Sniffnsnooz",
    description: "All-in-one pet care services across Delhi NCR: Grooming, Vet Consultations, Pet Companion, Health Insurance, Pet Sitting & Luxury Boarding.",
    url: "https://sniffnsnooz.in/services",
    images: [{ url: "/assets/servicelogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
