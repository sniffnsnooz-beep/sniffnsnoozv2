import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Sniffnsnooz Pet Grooming",
  description: "Get in touch with Sniffnsnooz. Contact us for doorstep pet grooming queries in Delhi NCR.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Sniffnsnooz Pet Grooming",
    description: "Get in touch with Sniffnsnooz. Contact us for doorstep pet grooming queries in Delhi NCR.",
    url: "https://sniffnsnooz.in/contact",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
