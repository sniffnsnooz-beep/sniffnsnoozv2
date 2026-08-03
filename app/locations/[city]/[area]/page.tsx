import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNeighborhood, neighborhoods } from "@/data/neighborhoods";
import FoliageAccents from "@/components/FoliageAccents";
import PetDoodleAccents from "@/components/PetDoodleAccents";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Phone,
  CheckCircle2,
  CalendarCheck,
  Sparkles,
  Scissors,
  Stethoscope,
  ChevronRight,
  ArrowRight,
  Heart
} from "lucide-react";

interface NeighborhoodPageProps {
  params: Promise<{
    city: string;
    area: string;
  }>;
}

// Generate Static Params for all 18+ posh neighborhoods across Delhi NCR
export async function generateStaticParams() {
  return neighborhoods.map((n) => ({
    city: n.citySlug,
    area: n.slug,
  }));
}

// Dynamic SEO Metadata per Neighborhood
export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const area = getNeighborhood(resolvedParams.city, resolvedParams.area);

  if (!area) {
    return {
      title: "Location Not Found | Sniffnsnooz",
    };
  }

  const title = `${area.name}, ${area.cityName} Doorstep Pet Grooming & Vet Visit | Sniffnsnooz`;
  const description = `${area.description} Fast ${area.vanArrivalMinutes}-min mobile van arrival servicing ${area.societyNames.slice(0, 3).join(", ")}. Book online now!`;
  const url = `https://sniffnsnooz.in/locations/${area.citySlug}/${area.slug}`;

  return {
    title,
    description,
    keywords: [
      `pet grooming ${area.name}`,
      `dog grooming at home ${area.name}`,
      `cat grooming ${area.name} ${area.cityName}`,
      `doorstep pet spa ${area.name}`,
      `home vet visit ${area.name}`,
      `mobile pet van ${area.name}`,
      `sniffnsnooz ${area.slug}`
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Sniffnsnooz",
      images: [
        {
          url: "/assets/doggy3dd.webp",
          width: 1200,
          height: 630,
          alt: `${area.name} Pet Grooming Sniffnsnooz`,
        },
      ],
    },
  };
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const resolvedParams = await params;
  const area = getNeighborhood(resolvedParams.city, resolvedParams.area);

  if (!area) {
    notFound();
  }

  // Schema LD JSON Graphs
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Sniffnsnooz Pet Grooming & Vet Care - ${area.name}`,
    "url": `https://sniffnsnooz.in/locations/${area.citySlug}/${area.slug}`,
    "telephone": "+91-9818728444",
    "email": "sniffnsnooz@gmail.com",
    "image": "https://sniffnsnooz.in/assets/snifflogo.png",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": area.name,
      "addressRegion": area.cityName,
      "addressCountry": "IN"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `${area.name}, ${area.cityName}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "180"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": area.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="relative min-h-screen bg-gradient-to-br from-[#faf4ec] via-[#f5efe6] to-[#f0e6d8] pt-28 pb-20 overflow-hidden">
        {/* Background Foliage & Pet Accents */}
        <FoliageAccents position="top-right" size="xl" className="opacity-90" />
        <FoliageAccents position="bottom-left" size="xl" className="opacity-90" />
        <PetDoodleAccents variant="dog-and-cat" position="top-left" size="lg" className="opacity-70" />
        <PetDoodleAccents variant="sitting-dog" position="bottom-right" size="lg" className="opacity-75" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8c5a3b] mb-6 flex-wrap">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <Link href="/locations/gurugram" className="hover:underline capitalize">{area.cityName}</Link>
            <ChevronRight size={12} />
            <span className="text-[#4e3323]">{area.name}</span>
          </div>

          {/* HERO SECTION */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-10 shadow-xl mb-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5b3a26]/10 text-[#5b3a26] text-xs font-bold">
                  <MapPin size={14} className="text-[#8c5a3b]" />
                  <span>Serving {area.name}, {area.cityName}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#4e3323] leading-tight">
                  {area.heading}
                </h1>

                <p className="text-sm sm:text-base text-[#7a5741] font-medium leading-relaxed">
                  {area.description}
                </p>

                {/* HIGHLIGHT BADGES */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-[#faf4ec] p-2.5 rounded-xl border border-[#e8d8cc]">
                    <Clock className="w-4 h-4 text-[#8c5a3b] shrink-0" />
                    <div>
                      <div className="text-[10px] text-[#7a5741] font-bold uppercase">Estimated Van Arrival</div>
                      <div className="text-xs font-bold text-[#4e3323]">{area.vanArrivalMinutes} Mins</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#faf4ec] p-2.5 rounded-xl border border-[#e8d8cc]">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-[#7a5741] font-bold uppercase">Local Rating</div>
                      <div className="text-xs font-bold text-[#4e3323]">4.9 ★ (180+ Reviews)</div>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-center gap-2 bg-[#faf4ec] p-2.5 rounded-xl border border-[#e8d8cc]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-[#7a5741] font-bold uppercase">Products Safety</div>
                      <div className="text-xs font-bold text-[#4e3323]">100% Organic &amp; Safe</div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-row items-center gap-3 pt-4 flex-wrap">
                  <Link
                    href="/booking"
                    className="bg-[#4e3323] hover:bg-[#3b2518] text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-md hover:scale-105 transition-all"
                  >
                    <CalendarCheck size={16} />
                    <span>Book Doorstep Grooming</span>
                  </Link>

                  <a
                    href="tel:+919818728444"
                    className="bg-white hover:bg-amber-50 text-[#4e3323] border border-[#4e3323]/20 px-5 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Phone size={16} />
                    <span>Call Helpline</span>
                  </a>
                </div>
              </div>

              {/* RIGHT PET GRAPHIC */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                  <Image
                    src="/assets/doggy3dd.webp"
                    alt={`Sniffnsnooz Pet Care in ${area.name}`}
                    width={400}
                    height={400}
                    priority
                    className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* SOCIETIES & CONDOMINIUMS SERVED */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/60 mb-12 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4e3323] mb-4 flex items-center gap-2">
              <span>🏢</span> Condominiums &amp; Societies Serviced in {area.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#7a5741] font-medium mb-4">
              Our AC mobile grooming van parks inside visitor parking bays or society visitor bays with zero hassle:
            </p>

            <div className="flex flex-wrap gap-2">
              {area.societyNames.map((society, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-[#faf4ec] text-[#4e3323] border border-[#e8d8cc] px-3 py-1.5 rounded-full text-xs font-semibold"
                >
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  {society}
                </span>
              ))}
            </div>
          </div>

          {/* CORE SERVICES IN THIS AREA */}
          <div className="space-y-6 mb-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#4e3323] mb-2">
                Services Available in {area.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#7a5741]">
                Complete doorstep pet wellness and hygiene solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white border border-[#eae0d5] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                    <Scissors className="w-6 h-6 text-[#d48c38]" />
                  </div>
                  <h3 className="font-serif font-bold text-[#4e3323] text-lg mb-2">
                    Doorstep Van Grooming
                  </h3>
                  <p className="text-xs text-[#7a5741] font-medium leading-relaxed mb-4">
                    Full bath, blow dry, haircut, nail trimming, ear cleaning, and paw butter application at your residence.
                  </p>
                </div>
                <Link
                  href="/grooming"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#5b3a26] hover:underline"
                >
                  <span>View Grooming Packages</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="bg-white border border-[#eae0d5] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
                    <Stethoscope className="w-6 h-6 text-[#4e3323]" />
                  </div>
                  <h3 className="font-serif font-bold text-[#4e3323] text-lg mb-2">
                    Home Vet Consultations
                  </h3>
                  <p className="text-xs text-[#7a5741] font-medium leading-relaxed mb-4">
                    Certified veterinary doctors visit your home in {area.name} for vaccinations, deworming, and health checkups.
                  </p>
                </div>
                <Link
                  href="/veterinary-booking"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#5b3a26] hover:underline"
                >
                  <span>Book Vet Home Visit</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="bg-white border border-[#eae0d5] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-[#d48c38]" />
                  </div>
                  <h3 className="font-serif font-bold text-[#4e3323] text-lg mb-2">
                    Pet Sitting &amp; Companionship
                  </h3>
                  <p className="text-xs text-[#7a5741] font-medium leading-relaxed mb-4">
                    In-home pet sitters, daily dog walkers, and companion guidance for pet lovers in {area.name}.
                  </p>
                </div>
                <Link
                  href="/find-a-companion"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#5b3a26] hover:underline"
                >
                  <span>Explore Pet Services</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

            </div>
          </div>

          {/* LOCAL FAQS */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/60 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4e3323] mb-6">
              Frequently Asked Questions in {area.name}
            </h2>

            <div className="space-y-4">
              {area.faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#faf4ec] rounded-xl p-4 border border-[#e8d8cc]">
                  <h3 className="text-sm font-bold text-[#4e3323] mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d48c38] shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="text-xs text-[#7a5741] font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
