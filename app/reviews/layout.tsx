import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews | Sniffnsnooz",
  description: "Check out our 5-star Google reviews. See why we are Delhi NCRs top-rated doorstep pet grooming service.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Customer Reviews | Sniffnsnooz",
    description: "Check out our 5-star Google reviews. See why we are Delhi NCRs top-rated doorstep pet grooming service.",
    url: "https://sniffnsnooz.in/reviews",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
