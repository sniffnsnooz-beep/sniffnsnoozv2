import { locations } from "@/data/locations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { FaPaw, FaStar, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

type Props = {
  params: Promise<{ city: string }>;
};

// Generate Dynamic Metadata for Local SEO
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const location = locations.find((l) => l.city === params.city.toLowerCase());

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `${location.heading} | Sniffnsnooz`,
    description: location.description,
    keywords: location.keywords,
    alternates: {
      canonical: `/locations/${location.city}`,
    },
    openGraph: {
      title: `${location.heading} | Sniffnsnooz`,
      description: location.description,
      url: `https://sniffnsnooz.in/locations/${location.city}`,
      images: [
        {
          url: "/assets/snifflogo.png",
          width: 1200,
          height: 630,
          alt: `Pet Grooming in ${location.name}`,
        },
      ],
    },
  };
}

// Generate static params for faster SSG page loads
export function generateStaticParams() {
  return locations.map((location) => ({
    city: location.city,
  }));
}

export default async function LocationPage(props: Props) {
  const params = await props.params;
  const location = locations.find((l) => l.city === params.city.toLowerCase());

  if (!location) {
    notFound();
  }

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-24">
      {/* 🚀 Dynamic Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PetCareBusiness",
            "@id": `https://sniffnsnooz.in/locations/${location.city}#localbusiness`,
            "name": `Sniffnsnooz - Pet Grooming ${location.name}`,
            "description": location.description,
            "url": `https://sniffnsnooz.in/locations/${location.city}`,
            "telephone": "+91-9971135063",
            "image": "https://sniffnsnooz.in/assets/snifflogo.png",
            "areaServed": {
              "@type": "City",
              "name": location.name,
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1250"
            }
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-900/10 text-amber-900 rounded-full text-sm font-bold tracking-wide">
          <FaMapMarkerAlt /> Serving {location.name}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-800 leading-tight">
          {location.heading}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          {location.description}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <Link
            href="/booking"
            className="px-8 py-4 bg-[#5b3a26] text-white font-bold rounded-full hover:bg-amber-800 transition-all shadow-lg hover:shadow-amber-900/30 flex items-center gap-2 transform hover:-translate-y-1"
          >
            <FaPaw /> Book Home Grooming
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-white px-6 py-4 rounded-full shadow-md border border-slate-100">
            <div className="flex text-amber-500">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
            <span>4.9/5 from 1,200+ Pet Parents in NCR</span>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-200/60">
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            <FaCheckCircle />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Certified Groomers</h3>
          <p className="text-slate-600">Expertly trained to handle pets of all breeds and temperaments with care.</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            <FaCheckCircle />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Imported Products</h3>
          <p className="text-slate-600">We use only the finest, vet-approved imported shampoos and conditioners.</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
            <FaCheckCircle />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Stress-Free at Home</h3>
          <p className="text-slate-600">Zero travel anxiety. Your pet gets pampered in their own familiar environment.</p>
        </div>
      </section>
      
      {/* Services Interlink */}
      <section className="text-center bg-[#5b3a26]/5 rounded-3xl p-12 space-y-8 border border-[#5b3a26]/10">
        <h2 className="text-3xl font-bold text-slate-800">Top Pet Services in {location.name}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/services/bath-spa-addons" className="px-6 py-3 bg-white rounded-full font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow">Bath & Spa</Link>
          <Link href="/services/hair-styling" className="px-6 py-3 bg-white rounded-full font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow">Hair Styling</Link>
          <Link href="/services/coat-skin-treatment" className="px-6 py-3 bg-white rounded-full font-medium text-slate-700 shadow-sm hover:shadow-md transition-shadow">Coat & Skin Care</Link>
        </div>
      </section>
    </div>
  );
}
