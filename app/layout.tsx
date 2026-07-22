import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/context/BookingContext";
import GlobalBubbles from "@/components/GlobalBubbles";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script"; // ✅ Script Import Kiya
/* ✅ ADD */
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sniffnsnooz.in"),
  title: {
    default: "Sniffnsnooz | Premium Doorstep Pet Grooming in Delhi NCR",
    template: "%s | Sniffnsnooz",
  },
  description:
    "Sniffnsnooz is a premium doorstep pet grooming service providing stress-free dog and cat grooming at home across Delhi NCR using imported professional grooming products.",
  keywords: [
    "pet grooming Delhi NCR",
    "dog grooming at home Delhi",
    "cat grooming at home Gurugram",
    "doorstep pet grooming",
    "pet grooming Noida",
    "pet grooming Gurugram",
    "home dog grooming service",
    "mobile pet grooming Delhi",
    "sniffnsnooz",
    "pet spa Delhi NCR",
    "dog bath at home",
    "pet grooming near me",
  ],
  authors: [{ name: "Sniffnsnooz Team" }],
  creator: "Sniffnsnooz",
  publisher: "Sniffnsnooz",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sniffnsnooz.in",
    title: "Sniffnsnooz | Premium Doorstep Pet Grooming",
    description:
      "Stress-free dog and cat grooming at home across Delhi NCR using imported professional grooming products.",
    siteName: "Sniffnsnooz",
    images: [
      {
        url: "/assets/snifflogo.png",
        width: 1200,
        height: 630,
        alt: "Sniffnsnooz Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sniffnsnooz | Premium Doorstep Pet Grooming",
    description:
      "Stress-free dog and cat grooming at home across Delhi NCR using imported professional grooming products.",
    images: ["/assets/snifflogo.png"],
  },
  verification: {
    google: "rBLyCvgHVJgwOvIgpBPXEs1N4boYVbewvVqWiejhDMo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Search Console Verification */}
        <meta name="google-site-verification" content="rBLyCvgHVJgwOvIgpBPXEs1N4boYVbewvVqWiejhDMo" />

        {/* ========================= 
            📊 GOOGLE TAG MANAGER
            Container ID: GT-K4TLPZHK
        ========================= */}
        {/* GTM Script - must be first in <head> */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GT-K4TLPZHK');
          `}
        </Script>

        {/* ========================= 
            📊 GOOGLE ADS CONVERSION TRACKING
            Account: AW-17243845030
        ========================= */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17243845030"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17243845030');
          `}
        </Script>
      </head>
      <body>
        {/* ✅ GTM noscript fallback (required by Google) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GT-K4TLPZHK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <BookingProvider>

          {/* =========================
              🧠 ADVANCED SEO STRUCTURED DATA
              (ULTRA AUTHORITY GRAPH)
          ========================= */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [

                  /* 1️⃣ WEBSITE + SITELINKS SEARCH BOX */
                  {
                    "@type": "WebSite",
                    "@id": "https://sniffnsnooz.in/#website",
                    "url": "https://sniffnsnooz.in",
                    "name": "Sniffnsnooz",
                    "description": "Premium Doorstep Pet Grooming Service in Delhi NCR",
                    "publisher": { "@id": "https://sniffnsnooz.in/#petcare" },
                    "inLanguage": "en-IN",
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://sniffnsnooz.in/news?q={search_term_string}"
                      },
                      "query-input": "required name=search_term_string"
                    }
                  },

                  /* 2️⃣ PET CARE + LOCAL BUSINESS AUTHORITY */
                  {
                    "@type": ["PetCareBusiness", "LocalBusiness"],
                    "@id": "https://sniffnsnooz.in/#petcare",
                    "name": "Sniffnsnooz",
                    "url": "https://sniffnsnooz.in",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://sniffnsnooz.in/assets/snifflogo.png",
                      "width": 512,
                      "height": 512
                    },
                    "image": "https://sniffnsnooz.in/assets/snifflogo.png",
                    "description":
                      "Sniffnsnooz is a premium doorstep pet grooming service providing stress-free dog and cat grooming at home across Delhi NCR using imported professional grooming products.",
                    "telephone": "+91-9971135063",
                    "email": "sniffnsnooz@gmail.com",
                    "priceRange": "₹₹",
                    "currenciesAccepted": "INR",
                    "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
                    "aggregateRating": {
                      "@type": "AggregateRating",
                      "ratingValue": "4.9",
                      "reviewCount": "1250",
                      "bestRating": "5",
                      "worstRating": "1"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress":
                        "Ground Floor, GF-79, Emerald Plaza, Shop No. EPS, Sector 65",
                      "addressLocality": "Gurugram",
                      "addressRegion": "Haryana",
                      "postalCode": "122018",
                      "addressCountry": "IN"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 28.4031,
                      "longitude": 77.0669
                    },
                    "openingHoursSpecification": [
                      {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                        "opens": "09:00",
                        "closes": "20:00"
                      }
                    ],
                    "areaServed": [
                      { "@type": "City", "name": "Delhi" },
                      { "@type": "City", "name": "Noida" },
                      { "@type": "City", "name": "Gurugram" },
                      { "@type": "City", "name": "Ghaziabad" },
                      { "@type": "City", "name": "Faridabad" },
                      { "@type": "City", "name": "Greater Noida" }
                    ],
                    "hasOfferCatalog": {
                      "@type": "OfferCatalog",
                      "name": "Pet Care Services",
                      "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Doorstep Dog Grooming" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cat Grooming at Home" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Aromatherapy Spa Bath" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Nail & Paw Care" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ear Cleaning" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hair Styling & Trimming" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Coat & Skin Treatment" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Oral Hygiene Care" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Doorstep Veterinary Visit" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pet Insurance Guidance" } }
                      ]
                    },
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "+91-9971135063",
                      "contactType": "customer service",
                      "areaServed": "IN",
                      "availableLanguage": ["English", "Hindi"],
                      "contactOption": "TollFree"
                    },
                    /* sameAs = backlink authority signals to Google */
                    "sameAs": [
                      "https://www.instagram.com/sniffnsnooz_/",
                      "https://www.facebook.com/sniffnsnooz",
                      "https://www.youtube.com/@sniffnsnooz",
                      "https://twitter.com/sniffnsnooz",
                      "https://www.justdial.com/sniffnsnooz",
                      "https://www.indiamart.com/sniffnsnooz"
                    ]
                  },

                  /* 3️⃣ GOOGLE MAPS + PLACE */
                  {
                    "@type": "Place",
                    "@id": "https://sniffnsnooz.in/#location",
                    "name": "Sniffnsnooz Pet Grooming",
                    "hasMap":
                      "https://www.google.com/maps?q=Emerald+Plaza+Sector+65+Gurugram",
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 28.4031,
                      "longitude": 77.0669
                    }
                  },

                  /* 4️⃣ SERVICE + BOOKING INTENT */
                  {
                    "@type": "Service",
                    "@id": "https://sniffnsnooz.in/#booking-service",
                    "serviceType": "Doorstep Pet Grooming",
                    "provider": {
                      "@type": "PetCareBusiness",
                      "name": "Sniffnsnooz"
                    },
                    "potentialAction": {
                      "@type": "ReserveAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://sniffnsnooz.in/booking",
                        "inLanguage": "en",
                        "actionPlatform": [
                          "http://schema.org/DesktopWebPlatform",
                          "http://schema.org/MobileWebPlatform"
                        ]
                      }
                    }
                  },

                  /* 5️⃣ SPEAKABLE (VOICE SEARCH) */
                  {
                    "@type": "WebPage",
                    "@id": "https://sniffnsnooz.in/#homepage",
                    "url": "https://sniffnsnooz.in",
                    "name": "Sniffnsnooz – Premium Doorstep Pet Grooming",
                    "speakable": {
                      "@type": "SpeakableSpecification",
                      "xpath": [
                        "//h1",
                        "//h2",
                        "//p[contains(text(),'Sniffnsnooz')]"
                      ]
                    }
                  },

                  /* 6️⃣ TRUST: IMPORTED PRODUCTS */
                  {
                    "@type": "Thing",
                    "@id": "https://sniffnsnooz.in/#products",
                    "name": "Imported Pet Grooming Products",
                    "description":
                      "Uses imported pet grooming products trusted by professional show-pet groomers worldwide including Hydra Professional shampoo and Bio-Groom conditioner."
                  },

                  /* 7️⃣ BREED-WISE GROOMING AUTHORITY */
                  {
                    "@type": "ItemList",
                    "@id": "https://sniffnsnooz.in/#breed-grooming",
                    "name": "Breed Wise Pet Grooming Delhi NCR",
                    "itemListElement": [
                      { "@type": "Service", "position": 1, "name": "Golden Retriever Grooming at Home" },
                      { "@type": "Service", "position": 2, "name": "German Shepherd Grooming at Home" },
                      { "@type": "Service", "position": 3, "name": "Shih Tzu Grooming at Home" },
                      { "@type": "Service", "position": 4, "name": "Pug Grooming at Home" },
                      { "@type": "Service", "position": 5, "name": "Persian Cat Grooming at Home" },
                      { "@type": "Service", "position": 6, "name": "Labrador Grooming at Home" },
                      { "@type": "Service", "position": 7, "name": "Husky Grooming at Home" }
                    ]
                  },

                  /* 8️⃣ VETERINARY AUTHORITY SIGNAL */
                  {
                    "@type": "MedicalOrganization",
                    "@id": "https://sniffnsnooz.in/#vet-authority",
                    "name": "Sniffnsnooz Pet Wellness Network",
                    "medicalSpecialty": [
                      "Veterinary Care",
                      "Pet Dermatology",
                      "Animal Hygiene"
                    ]
                  },

                  /* 9️⃣ AI BOOKING ASSISTANT */
                  {
                    "@type": "SoftwareApplication",
                    "@id": "https://sniffnsnooz.in/#ai-booking",
                    "name": "Sniffnsnooz AI Booking Assistant",
                    "applicationCategory": "BookingApplication",
                    "operatingSystem": "Web"
                  },

                  /* 🔟 FAQ — helps Google show FAQs in search results */
                  {
                    "@type": "FAQPage",
                    "@id": "https://sniffnsnooz.in/#faq",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "Does Sniffnsnooz offer doorstep pet grooming in Delhi?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Yes, Sniffnsnooz provides premium doorstep pet grooming across Delhi, Noida, Gurugram, Ghaziabad, Faridabad and Greater Noida."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "What pet grooming services does Sniffnsnooz offer at home?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Sniffnsnooz offers aromatherapy spa baths, hair styling, nail and paw care, ear cleaning, coat and skin treatment, oral hygiene care, and doorstep veterinary visits."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "How do I book a pet grooming session with Sniffnsnooz?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Visit sniffnsnooz.in/booking to book online, or call +91-9971135063 to schedule a doorstep grooming session."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Does Sniffnsnooz groom both dogs and cats?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Yes, Sniffnsnooz provides professional grooming for both dogs and cats of all breeds at your doorstep in Delhi NCR."
                        }
                      }
                    ]
                  }

                ]
              }),
            }}
          />

          {/* ✅ TOAST SYSTEM */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#5b3a26",
                color: "#fff",
                borderRadius: "12px",
              },
            }}
          />

          {/* =========================
              🌈 GLOBAL BACKGROUND
          ========================= */}
          <div className="page-bg min-h-screen relative overflow-hidden">
            <GlobalBubbles />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-24 left-10 w-32 h-32 bg-white/30 blur-xl rounded-2xl animate-bounce-slow" />
              <div className="absolute top-1/2 right-16 w-40 h-40 bg-white/20 blur-2xl rounded-3xl animate-bounce-medium" />
              <div className="absolute bottom-24 left-1/3 w-24 h-24 bg-white/25 blur-xl rounded-xl animate-bounce-fast" />
            </div>

            <Navbar />

            <main className="pt-20 relative z-10 page-animate">
              {children}
            </main>

            <Footer />
          </div>

        </BookingProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}