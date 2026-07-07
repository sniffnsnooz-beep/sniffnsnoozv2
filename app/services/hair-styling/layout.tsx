import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Hair Styling & Trimming | Sniffnsnooz",
  description: "Expert pet hair styling and breed-specific cuts by professional groomers.",
  alternates: {
    canonical: "/services/hair-styling",
  },
  openGraph: {
    title: "Pet Hair Styling & Trimming | Sniffnsnooz",
    description: "Expert pet hair styling and breed-specific cuts by professional groomers.",
    url: "https://sniffnsnooz.in/services/hair-styling",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
