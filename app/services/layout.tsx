import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Pet Care, Veterinary & Grooming Services | SniffNSnooz",
  description: "Explore our comprehensive pet care services including Veterinary Care, Vaccination, Grooming, Lab Tests, Boarding, Walking, and Emergency Services for dogs and cats.",
  keywords: "Veterinary Services, Pet Clinic, Dog Vaccination, Cat Grooming, Pet Boarding, Pet Walking, Emergency Vet Care, SniffNSnooz, Pet Care, Lab Tests for Pets",
  openGraph: {
    title: "Premium Pet Care & Veterinary Services | SniffNSnooz",
    description: "Expert veterinary, grooming, boarding, and emergency care services for your furry friends. Book an appointment today!",
    type: "website",
    locale: "en_US",
    siteName: "SniffNSnooz",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
