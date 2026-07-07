import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | Sniffnsnooz",
  description: "Read what pet parents in Delhi NCR have to say about our premium doorstep pet grooming services.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Client Testimonials & Reviews | Sniffnsnooz",
    description: "Read what pet parents in Delhi NCR have to say about our premium doorstep pet grooming services.",
    url: "https://sniffnsnooz.in/testimonials",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
