import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veterinary Services | Sniff n Snooz",
  description:
    "Expert vet consultations, vaccinations, lab tests & Annual Blood Health Checks for dogs & cats in Gurgaon. Minimal transparent pricing. Book today at Sniff n Snooz.",
  alternates: {
    canonical: "/veterinary",
  },
};

export default function VeterinaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
