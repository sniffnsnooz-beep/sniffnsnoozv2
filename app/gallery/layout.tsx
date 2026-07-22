import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Grooming Gallery — Photos & Videos | Sniffnsnooz Delhi NCR",
  description:
    "Browse real photos and videos of happy pets groomed at home in Delhi NCR. Dog grooming, cat grooming, spa baths, veterinary care by Sniffnsnooz certified groomers.",
  keywords: [
    "pet grooming gallery Delhi NCR",
    "dog grooming photos Delhi",
    "cat grooming videos India",
    "pet spa photos Gurugram",
    "doorstep grooming results",
    "pet grooming before after photos",
    "pet grooming videos India",
    "sniffnsnooz gallery",
    "pet grooming Noida photos",
    "home pet grooming gallery",
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sniffnsnooz.in/gallery",
    siteName: "Sniffnsnooz",
    title: "Pet Grooming Gallery — Photos & Videos | Sniffnsnooz",
    description:
      "Real photos and videos of happy pets groomed at home in Delhi, Noida & Gurugram. Aromatherapy spa baths, nail care, ear cleaning, and veterinary home visits.",
    images: [
      {
        url: "https://sniffnsnooz.in/assets/img1.jpeg",
        width: 1200,
        height: 630,
        alt: "Happy dog after professional grooming by Sniffnsnooz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Grooming Gallery — Sniffnsnooz Delhi NCR",
    description:
      "Browse real photos & videos of happy groomed pets in Delhi NCR. Doorstep pet grooming gallery by Sniffnsnooz.",
    images: ["https://sniffnsnooz.in/assets/img1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// JSON-LD Structured Data — ImageGallery + BreadcrumbList + WebPage
const galleryStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageGallery",
      "@id": "https://sniffnsnooz.in/gallery#gallery",
      "name": "Sniffnsnooz Pet Grooming Gallery",
      "description":
        "Real photos and videos of dogs and cats groomed at home across Delhi NCR by Sniffnsnooz certified groomers.",
      "url": "https://sniffnsnooz.in/gallery",
      "author": {
        "@type": "Organization",
        "name": "Sniffnsnooz",
        "url": "https://sniffnsnooz.in",
      },
      "publisher": {
        "@type": "Organization",
        "name": "Sniffnsnooz",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sniffnsnooz.in/assets/snifflogo.png",
        },
      },
      "image": [
        {
          "@type": "ImageObject",
          "name": "Dog Grooming Spa at Home Delhi NCR",
          "contentUrl": "https://sniffnsnooz.in/assets/img1.jpeg",
          "description": "Professional dog spa grooming session at home in Delhi NCR by Sniffnsnooz",
          "author": { "@type": "Organization", "name": "Sniffnsnooz" },
        },
        {
          "@type": "ImageObject",
          "name": "Cat Grooming Session at Home",
          "contentUrl": "https://sniffnsnooz.in/assets/img3.jpg",
          "description": "Professional cat grooming at home by certified Sniffnsnooz groomers",
          "author": { "@type": "Organization", "name": "Sniffnsnooz" },
        },
        {
          "@type": "ImageObject",
          "name": "Happy Golden Retriever After Grooming",
          "contentUrl": "https://sniffnsnooz.in/assets/img4.jpg",
          "description": "Happy Golden Retriever after luxury spa grooming session at home",
          "author": { "@type": "Organization", "name": "Sniffnsnooz" },
        },
        {
          "@type": "ImageObject",
          "name": "Doorstep Veterinary Visit",
          "contentUrl": "https://sniffnsnooz.in/assets/img5.jpg",
          "description": "Professional vet visiting a pet at home in Delhi NCR",
          "author": { "@type": "Organization", "name": "Sniffnsnooz" },
        },
        {
          "@type": "ImageObject",
          "name": "Pet Nail Care Session",
          "contentUrl": "https://sniffnsnooz.in/assets/img6.jpg",
          "description": "Professional pet nail trimming and paw care at home",
          "author": { "@type": "Organization", "name": "Sniffnsnooz" },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://sniffnsnooz.in/gallery#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sniffnsnooz.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Gallery",
          "item": "https://sniffnsnooz.in/gallery",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://sniffnsnooz.in/gallery#webpage",
      "url": "https://sniffnsnooz.in/gallery",
      "name": "Pet Grooming Gallery — Photos & Videos | Sniffnsnooz",
      "description":
        "Browse our gallery of happy pets groomed at home in Delhi NCR by Sniffnsnooz certified groomers.",
      "inLanguage": "en-IN",
      "breadcrumb": { "@id": "https://sniffnsnooz.in/gallery#breadcrumb" },
    },
  ],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryStructuredData) }}
      />
      {children}
    </>
  );
}
