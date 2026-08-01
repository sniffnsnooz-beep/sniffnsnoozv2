import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Pet Grooming & Spa Services | Sniffnsnooz",
  description: "Book doorstep mobile pet grooming van or luxury store salon grooming for dogs and cats across Delhi NCR. Baths, haircuts, tick treatments, spa & paw care.",
  alternates: {
    canonical: "/grooming",
  },
  openGraph: {
    title: "Professional Pet Grooming & Spa Services | Sniffnsnooz",
    description: "Doorstep & Storefront Pet Grooming in Delhi NCR. Bathing, haircut, hair styling, nail care, tick treatments, and hydra spa for dogs & cats.",
    url: "https://sniffnsnooz.in/grooming",
    images: [{ url: "/assets/pet_spa_bath.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
