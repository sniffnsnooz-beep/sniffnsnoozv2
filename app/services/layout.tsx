import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Grooming Services | Sniffnsnooz",
  description: "Explore our premium doorstep pet grooming services in Delhi NCR. We offer baths, hair styling, spa treatments, and more for dogs and cats.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Pet Grooming Services | Sniffnsnooz",
    description: "Explore our premium doorstep pet grooming services in Delhi NCR. We offer baths, hair styling, spa treatments, and more for dogs and cats.",
    url: "https://sniffnsnooz.in/services",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
