import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Grooming Gallery | Happy Pets by Sniffnsnooz",
  description: "View our gallery of happy, styled, and clean pets. See the Sniffnsnooz difference in our before and after grooming transformations.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Pet Grooming Gallery | Happy Pets by Sniffnsnooz",
    description: "View our gallery of happy, styled, and clean pets. See the Sniffnsnooz difference in our before and after grooming transformations.",
    url: "https://sniffnsnooz.in/gallery",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
