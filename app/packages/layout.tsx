import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Grooming Packages & Pricing | Sniffnsnooz",
  description: "Affordable and premium pet grooming packages in Delhi NCR. Check our pricing for dogs and cats doorstep grooming.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Pet Grooming Packages & Pricing | Sniffnsnooz",
    description: "Affordable and premium pet grooming packages in Delhi NCR. Check our pricing for dogs and cats doorstep grooming.",
    url: "https://sniffnsnooz.in/packages",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
