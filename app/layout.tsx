import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/context/BookingContext";
import GlobalBubbles from "@/components/GlobalBubbles";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script"; // ✅ Script Import Kiya
/* ✅ ADD */
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* =========================
            📊 GOOGLE TAG & ADS CONFIGURATION
        ========================= */}
        {/* Main Google Tag Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GT-K4TLPZHK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Dono IDs yahan link ho gayi hain
            gtag('config', 'GT-K4TLPZHK');
            gtag('config', 'AW-17243845030');
          `}
        </Script>
      </head>
      <body>
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

                  /* 1️⃣ PET CARE + LOCAL BUSINESS AUTHORITY */
                  {
                    "@type": "PetCareBusiness",
                    "@id": "https://sniffnsnooz.in/#petcare",
                    "name": "Sniffnsnooz",
                    "url": "https://sniffnsnooz.in",
                    "logo": "https://sniffnsnooz.in/assets/snifflogo.png",
                    "image": "https://sniffnsnooz.in/assets/snifflogo.png",
                    "description":
                      "Sniffnsnooz is a premium doorstep pet grooming service providing stress-free dog and cat grooming at home across Delhi NCR using imported professional grooming products.",
                    "telephone": "+91-9971135063",
                    "email": "sniffnsnooz@gmail.com",
                    "priceRange": "₹₹",
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
                    "areaServed": [
                      { "@type": "City", "name": "Delhi" },
                      { "@type": "City", "name": "Noida" },
                      { "@type": "City", "name": "Gurugram" },
                      { "@type": "City", "name": "Ghaziabad" },
                      { "@type": "City", "name": "Faridabad" },
                      { "@type": "City", "name": "Greater Noida" }
                    ],
                    "sameAs": [
                      "https://www.instagram.com/sniffnsnooz_/"
                    ]
                  },

                  /* 2️⃣ GOOGLE MAPS + PLACE */
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

                  /* 3️⃣ SERVICE + BOOKING INTENT */
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

                  /* 4️⃣ SPEAKABLE (VOICE SEARCH) */
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

                  /* 5️⃣ TRUST: IMPORTED PRODUCTS */
                  {
                    "@type": "Thing",
                    "@id": "https://sniffnsnooz.in/#products",
                    "name": "Imported Pet Grooming Products",
                    "description":
                      "Uses imported pet grooming products trusted by professional show-pet groomers worldwide including Hydra Professional shampoo and Bio-Groom conditioner."
                  },

                  /* 6️⃣ BREED-WISE GROOMING AUTHORITY */
                  {
                    "@type": "ItemList",
                    "@id": "https://sniffnsnooz.in/#breed-grooming",
                    "name": "Breed Wise Pet Grooming",
                    "itemListElement": [
                      { "@type": "Service", "name": "Golden Retriever Grooming" },
                      { "@type": "Service", "name": "German Shepherd Grooming" },
                      { "@type": "Service", "name": "Shih Tzu Grooming" },
                      { "@type": "Service", "name": "Pug Grooming" },
                      { "@type": "Service", "name": "Persian Cat Grooming" }
                    ]
                  },

                  /* 7️⃣ VETERINARY AUTHORITY SIGNAL */
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

                  /* 8️⃣ AI BOOKING ASSISTANT */
                  {
                    "@type": "SoftwareApplication",
                    "@id": "https://sniffnsnooz.in/#ai-booking",
                    "name": "Sniffnsnooz AI Booking Assistant",
                    "applicationCategory": "BookingApplication",
                    "operatingSystem": "Web"
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