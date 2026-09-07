export interface PackageTier {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  price: number;
  originalPrice: number;
  duration: string;
  description: string;
  features: string[];
}

export const corePackageTiers: PackageTier[] = [
  {
    id: "basic-bath",
    name: "Basic / Bath Package",
    badge: "Essential Care",
    price: 599,
    originalPrice: 899,
    duration: "45 mins",
    description: "Warm bath with organic shampoo, blow dry, ear cleaning, nail clipping, and paw butter application.",
    features: [
      "Warm Water Shampoo Bath",
      "Blow Dry & Coat Brushing",
      "Nail Clipping & Filing",
      "Ear Cleaning & Hygiene",
      "Paw Butter Application"
    ]
  },
  {
    id: "puppy-kitten",
    name: "Puppy / Kitten Gentle Grooming",
    badge: "Gentle First Step",
    price: 799,
    originalPrice: 1199,
    duration: "45 mins",
    description: "Extra gentle first grooming session for young pets to build confidence and fear-free grooming habits.",
    features: [
      "Tearless Mild Shampoo Bath",
      "Low-Noise Gentle Warm Dryer",
      "Soft Coat Brushing & De-matting",
      "Puppy/Kitten Nail Trimming",
      "Soothing Ear Hygiene"
    ]
  },
  {
    id: "classic-grooming",
    name: "Classic Grooming Package",
    badge: "Best Value",
    popular: true,
    price: 1399,
    originalPrice: 1999,
    duration: "75 mins",
    description: "Complete bath & hygiene spa plus sanitary trimming, face shaping, paw pad haircut, and ear clearance.",
    features: [
      "Organic Spa Bath & Conditioning",
      "Sanitary, Paw Pad & Face Trim",
      "Blow Dry & Fluff Combing",
      "Nail Clipping & Ear Cleaning",
      "Pet Perfume & Paw Balm"
    ]
  },
  {
    id: "anti-tick",
    name: "Anti-Tick Medicated Package",
    badge: "Protection & Relief",
    price: 1599,
    originalPrice: 2299,
    duration: "75 mins",
    description: "Targeted medicated anti-tick & flea bath, parasite clearance comb out, and protective skin shield spray.",
    features: [
      "Medicated Anti-Tick Shampoo Bath",
      "Fine Flea & Tick Clearance Comb Out",
      "Soothing Anti-Itch Conditioner",
      "Nail & Ear Hygiene Clearance",
      "Protective Flea Repellent Spray"
    ]
  },
  {
    id: "signature-styling",
    name: "Signature Styling Package",
    badge: "Full Makeover",
    price: 1799,
    originalPrice: 2699,
    duration: "90 mins",
    description: "Full breed-specific haircut & styling by master pet stylists, organic spa bath, and deep coat conditioning.",
    features: [
      "Full Breed Specific Haircut & Style",
      "Organic Shampoo & Conditioner Bath",
      "Precision Scissoring & Finishing",
      "Complete Hygiene Trim & Nail Care",
      "Ear Cleaning & Fragrance Spray"
    ]
  },
  {
    id: "luxury-spa",
    name: "Luxury Hydra Spa Package",
    badge: "VIP Treatment",
    price: 2199,
    originalPrice: 3299,
    duration: "105 mins",
    description: "The ultimate royal treatment: full haircut, organic hydra bath, oil massage, de-shedding, and tooth brushing.",
    features: [
      "Full Haircut + Teddy Bear/Breed Style",
      "Hydra Moisturizing Organic Bath",
      "Nourishing Coconut Coat Oil Massage",
      "Enzyme Tooth Brushing & Breath Spray",
      "Undercoat De-shedding & Nail Filing"
    ]
  },
  {
    id: "monthly-combo",
    name: "4+1 Spa Bath Combo Pack",
    badge: "Save 25%",
    price: 3549,
    originalPrice: 4999,
    duration: "5 Sessions",
    description: "Pay for 4 spa bath sessions and get 1 free session. Valid for 90 days across doorstep van visits.",
    features: [
      "5 Full Spa Bath & Hygiene Sessions",
      "Priority Slot Booking Guarantee",
      "Doorstep Mobile Van Visits Included",
      "Valid for 90 Days",
      "Transferable within Family Pets"
    ]
  }
];

export const packages = [
  // ==========================================
  // 1. VALUE PACKAGES (Photo ke hisaab se)
  // ==========================================
  { name: "Hygiene Pack + Brush - Small Breed", price: 599, services: "1 services", saved: 3000, validity: "1 Day" },
  { name: "Hygiene Pack + Brush - Medium Breed", price: 599, services: "1 services", saved: 4750, validity: "1 Day" },
  { name: "Hygiene Pack + Brush - Large Breed", price: 599, services: "1 services", saved: 5899, validity: "1 Day" },

  { name: "Face/Paws/Sanitary Cut + Brush - Small Breed", price: 549, services: "1 services", saved: 3000, validity: "1 Day" },
  { name: "Face/Paws/Sanitary Cut + Brush - Medium Breed", price: 649, services: "1 services", saved: 4238, validity: "1 Day" },
  { name: "Face/Paws/Sanitary Cut + Brush - Large Breed", price: 699, services: "1 services", saved: 5479, validity: "1 Day" },

  { name: "Full Hair Cut + Hygiene Cut - Small Breed", price: 1399, services: "1 services", saved: 3000, validity: "1 Day" },
  { name: "Full Hair Cut + Hygiene Cut - Medium Breed", price: 1499, services: "1 services", saved: 5790, validity: "1 Day" },
  { name: "Full Hair Cut + Hygiene Cut - Large Breed", price: 1599, services: "1 services", saved: 6600, validity: "1 Day" },

  { name: "Spa Bath + Hygiene Cut - Small Breed", price: 1399, services: "1 services", saved: 3000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut - Medium Breed", price: 1499, services: "1 services", saved: 4680, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut - Large Breed", price: 1599, services: "1 services", saved: 5500, validity: "1 Day" },

  { name: "Spa Bath + Hygiene Cut + Full Hair Cut - Small Breed", price: 1799, services: "1 services", saved: 3000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut + Full Hair Cut - Medium Breed", price: 1999, services: "1 services", saved: 3400, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut + Full Hair Cut - Large Breed", price: 2199, services: "1 services", saved: 5499, validity: "1 Day" },
  // ==========================================
  // 2. SPECIAL PACKAGES (Photo ke hisaab se)
  // ==========================================
  { name: "Special: 4+1 Spa Bath Combo - Small Breed", price: 3549, services: "5 services", saved: 3000, validity: "90 Days" },
  { name: "Special: 4+1 Spa Bath Combo - Medium Breed", price: 3949, services: "5 services", saved: 7000, validity: "90 Days" },
  { name: "Special: 4+1 Spa Bath Combo - Large Breed", price: 4149, services: "5 services", saved: 30000, validity: "90 Days" },

  { name: "6 Month: 30 Bath + Hygiene - Small", price: 22499, services: "31 services", saved: 3000, validity: "6 Months" },
  { name: "6 Month: 30 Bath + Hygiene - Medium", price: 23499, services: "31 services", saved: 7000, validity: "6 Months" },
  { name: "6 Month: 30 Bath + Hygiene - Large", price: 24499, services: "31 services", saved: 30000, validity: "6 Months" },
  { name: "6 Month: 30 Bath + Hygiene - XL", price: 25499, services: "31 services", saved: 45000, validity: "6 Months" },

  { name: "12 Month: 60 Bath + Hygiene - Small", price: 39999, services: "61 services", saved: 3000, validity: "1 Year" },
  { name: "12 Month: 60 Bath + Hygiene - Medium", price: 40999, services: "61 services", saved: 7000, validity: "1 Year" },
  { name: "12 Month: 60 Bath + Hygiene - Large", price: 41999, services: "61 services", saved: 30000, validity: "1 Year" },
  { name: "12 Month: 60 Bath + Hygiene - XL", price: 42999, services: "61 services", saved: 45000, validity: "1 Year" },

  { name: "6 Month Premium Package - Small", price: 31999, services: "35 services", saved: 3000, validity: "6 Months" },
  { name: "6 Month Premium Package - Medium", price: 32999, services: "35 services", saved: 7000, validity: "6 Months" },
  { name: "6 Month Premium Package - Large", price: 33999, services: "35 services", saved: 30000, validity: "6 Months" },
  { name: "6 Month Premium Package - XL", price: 34999, services: "35 services", saved: 45000, validity: "6 Months" },

  { name: "12 Month Premium Package - Small", price: 58199, services: "65 services", saved: 3000, validity: "1 Year" },
  { name: "12 Month Premium Package - Medium", price: 59199, services: "65 services", saved: 7000, validity: "1 Year" },
  { name: "12 Month Premium Package - Large", price: 60199, services: "65 services", saved: 30000, validity: "1 Year" },
  { name: "12 Month Premium Package - XL", price: 61199, services: "65 services", saved: 45000, validity: "1 Year" },

  // ==========================================
  // 3. ADDITIONAL & ORIGINAL SERVICES (Merged)
  // ==========================================
  {
    name: "12-Months Premium Package Medium Breed",
    price: 59199,
    services: "3 services",
    saved: 63621,
    validity: "1 Year",
  },
  {
    name: "12-Months Premium Package Large Breed",
    price: 60199,
    services: "3 services",
    saved: 55151,
    validity: "1 Year",
  },
  {
    name: "6-Months Package Spa And Hygiene Basic Grooming Medium Breed",
    price: 40999,
    services: "3 services",
    saved: 24411,
    validity: "6 Months",
  },
  {
    name: "6-Months Package Spa And Hygiene Basic Grooming Large Breed",
    price: 41999,
    services: "3 services",
    saved: 43291,
    validity: "6 Months",
  },
  {
    name: "30 Premium Sessions for One Year Small Breed",
    price: 24900,
    services: "9 services",
    saved: 70860,
    validity: "1 Year",
  },
  {
    name: "12-Month Premium Package Small Breed",
    price: 58199,
    services: "3 services",
    saved: 64621,
    validity: "1 Year",
  },
  {
    name: "6-Month Premium Package Small Breed",
    price: 31999,
    services: "3 services",
    saved: 95111,
    validity: "6 Months",
  },
  {
    name: "Spa Bath + Ear Clean + Nail Cut + Facial Cut (4+1 Complimentary)Small Breed",
    price: 3549,
    services: "5 services",
    saved: 11411,
    validity: "90 Days",
  },
  {
    name: "Spa Bath + Hygiene Cut + Full Hair Cut",
    price: 1949,
    services: "1 service",
    saved: 3187,
    validity: "1 Day",
  },
  {
    name: "Spa Bath + Hygiene Cut",
    price: 1399,
    services: "1 services",
    saved: 2091,
    validity: "1 Day",
  },
  {
    name: "Full Hair Cut + Sniff ’n Snooz Hygiene Cut + Oil massage",
    price: 2149,
    services: "1 services",
    saved: 3486,
    validity: "1 Day",
  }
];