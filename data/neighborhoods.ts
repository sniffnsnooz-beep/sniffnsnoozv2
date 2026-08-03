export interface Neighborhood {
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  heading: string;
  tagline: string;
  description: string;
  popularBreeds: string[];
  societyNames: string[];
  vanArrivalMinutes: number;
  latitude: number;
  longitude: number;
  faqs: { q: string; a: string }[];
}

export const neighborhoods: Neighborhood[] = [
  // ── GURUGRAM (GURGAON) ──────────────────────────────────────
  {
    slug: "dlf-phase-5",
    name: "DLF Phase 5",
    citySlug: "gurugram",
    cityName: "Gurugram",
    heading: "Doorstep Pet Grooming & Home Vet Visit in DLF Phase 5, Gurgaon",
    tagline: "Luxury Mobile Pet Spa & Clinic Servicing Aralias, Magnolias, Pinnacle & Park Place",
    description: "Sniffnsnooz provides VIP doorstep dog & cat grooming vans and verified home vet visits in DLF Phase 5, Gurgaon. Our fully equipped air-conditioned vans arrive at your luxury apartment complex for 100% stress-free pet care.",
    popularBreeds: ["Golden Retriever", "Shih Tzu", "Poodle", "French Bulldog", "Persian Cat"],
    societyNames: ["The Aralias", "The Magnolias", "The Camellias", "DLF Pinnacle", "DLF Park Place", "DLF Crest", "DLF Horizon"],
    vanArrivalMinutes: 25,
    latitude: 28.4418,
    longitude: 77.0983,
    faqs: [
      {
        q: "Does the mobile grooming van enter high-rise condominiums in DLF Phase 5?",
        a: "Yes! Our mobile grooming van parks inside your society visitor parking or basement bay in DLF Phase 5 (Aralias, Magnolias, Crest, Pinnacle). The van is self-powered with hot water and AC."
      },
      {
        q: "How fast can a pet groomer or vet arrive in DLF Phase 5?",
        a: "Our flagship salon is located right next door in Sector 65 Emerald Plaza, so our mobile grooming van and doctors arrive within 20-30 minutes in DLF Phase 5."
      }
    ]
  },
  {
    slug: "golf-course-road",
    name: "Golf Course Road",
    citySlug: "gurugram",
    cityName: "Gurugram",
    heading: "Luxury Doorstep Pet Grooming on Golf Course Road, Gurugram",
    tagline: "VIP Mobile Grooming Van & Home Vet Care along Golf Course Road",
    description: "Book premium at-home dog bath, hair styling, tick treatments, and vet checkups along Golf Course Road, Gurgaon. Zero travel stress for your pets.",
    popularBreeds: ["Labrador Retriever", "Siberian Husky", "Beagle", "Lhasa Apso", "British Shorthair Cat"],
    societyNames: ["Vipul Belmonte", "Parsvnath Exotica", "Emaar Palm Springs", "Central Park 1", "DLF Summit"],
    vanArrivalMinutes: 20,
    latitude: 28.4526,
    longitude: 77.0967,
    faqs: [
      {
        q: "Can I watch my pet being groomed inside the mobile van on Golf Course Road?",
        a: "Absolutely! Our mobile grooming vans feature transparent viewing glass so pet parents can watch the entire grooming session live."
      }
    ]
  },
  {
    slug: "sohna-road",
    name: "Sohna Road",
    citySlug: "gurugram",
    cityName: "Gurugram",
    heading: "Doorstep Pet Grooming & Vet Service on Sohna Road, Gurgaon",
    tagline: "Serving Sector 47, 48, 49, 50, Rosewood City & Malibu Town",
    description: "Sniffnsnooz brings professional mobile pet grooming and doctor home visits across Sohna Road, Gurgaon. Pure organic shampoos, hygienic clippers, and certified master groomers.",
    popularBreeds: ["German Shepherd", "Golden Retriever", "Pug", "Shih Tzu", "Indie Dog"],
    societyNames: ["Tatvam Villas", "Malibu Town", "Vatika City", "Unitech South City 2", "Spaze Privy"],
    vanArrivalMinutes: 30,
    latitude: 28.4124,
    longitude: 77.0421,
    faqs: [
      {
        q: "What products are used during doorstep grooming on Sohna Road?",
        a: "We use 100% pet-safe, organic, pH-balanced shampoos and hypoallergenic coat conditioners imported from trusted pet care brands."
      }
    ]
  },
  {
    slug: "nirvana-country",
    name: "Nirvana Country",
    citySlug: "gurugram",
    cityName: "Gurugram",
    heading: "Pet Grooming at Home & Vet Visit in Nirvana Country, Sector 50",
    tagline: "Premium Mobile Van Grooming for Unitech Nirvana Country & Sector 50",
    description: "Hassle-free doorstep dog grooming, cat haircuts, nail care, and vet vaccination in Nirvana Country, Sector 50, Gurgaon.",
    popularBreeds: ["Shih Tzu", "Golden Retriever", "Cocker Spaniel", "Maltese", "Ragdoll Cat"],
    societyNames: ["Unitech Deerwood", "Unitech Aspen Greens", "Fresco", "Harmony", "Espace Townhouses"],
    vanArrivalMinutes: 20,
    latitude: 28.4187,
    longitude: 77.0712,
    faqs: [
      {
        q: "Is doorstep pet grooming available on weekends in Sector 50 Nirvana Country?",
        a: "Yes, we operate 7 days a week from 8:00 AM to 8:00 PM across Sector 50 and Nirvana Country."
      }
    ]
  },
  {
    slug: "sector-65",
    name: "Sector 65 (Emerald Plaza)",
    citySlug: "gurugram",
    cityName: "Gurugram",
    heading: "Flagship Pet Salon & Doorstep Grooming in Sector 65, Gurgaon",
    tagline: "Visit Our Luxury Spa at Emerald Plaza or Request Mobile Van Grooming",
    description: "Sniffnsnooz flagship pet spa and store is located at Emerald Plaza, Sector 65, Gurugram. Choose between in-store spa sessions or doorstep mobile van visits.",
    popularBreeds: ["Golden Retriever", "Shih Tzu", "Poodle", "Labrador", "Persian Cat"],
    societyNames: ["M3M Golfestate", "Emaar Emerald Hills", "M3M Merlin", "Ansal Essential Heights"],
    vanArrivalMinutes: 10,
    latitude: 28.3980,
    longitude: 77.0700,
    faqs: [
      {
        q: "Where is the Sniffnsnooz store located in Sector 65?",
        a: "Our flagship salon is located at Ground Floor, GF-78/79, Emerald Plaza, Sector 65, Gurugram (Near Avenue 65 Mall)."
      }
    ]
  },
  {
    slug: "sushant-lok",
    name: "Sushant Lok",
    citySlug: "gurugram",
    cityName: "Gurugram",
    heading: "Doorstep Pet Grooming & Vet Consultations in Sushant Lok 1 & 2",
    tagline: "Mobile Pet Spa Servicing Sushant Lok, Galleria & Vyapar Kendra Area",
    description: "Top-rated mobile dog grooming van and certified home vet visits across Sushant Lok Phase 1, 2, and 3, Gurgaon.",
    popularBreeds: ["Beagle", "Shih Tzu", "Golden Retriever", "Pug", "Indie Dog"],
    societyNames: ["Sushant Lok 1 Blocks A-C", "Ridgewood Estate", "Ivoor Heights"],
    vanArrivalMinutes: 25,
    latitude: 28.4610,
    longitude: 77.0805,
    faqs: [
      {
        q: "Can I book a vet home visit for puppy vaccinations in Sushant Lok?",
        a: "Yes! Our verified veterinary doctors visit your residence in Sushant Lok for routine puppy vaccinations, health checkups, and deworming."
      }
    ]
  },

  // ── SOUTH DELHI & DELHI ─────────────────────────────────────
  {
    slug: "vasant-kunj",
    name: "Vasant Kunj",
    citySlug: "delhi",
    cityName: "Delhi",
    heading: "Doorstep Pet Grooming & Home Vet Care in Vasant Kunj, South Delhi",
    tagline: "Mobile Van Spa & Doctor Home Visits Across Sectors A, B, C, D & Emarat",
    description: "Sniffnsnooz provides VIP doorstep pet grooming and doctor visits in Vasant Kunj, South Delhi. Hygienic, fear-free grooming for dogs and cats at your residence.",
    popularBreeds: ["Golden Retriever", "Shih Tzu", "Labrador", "German Shepherd", "Persian Cat"],
    societyNames: ["Vasant Kunj Pocket A-D", "Saraswati Narmada Apartments", "Kaveri Apartments", "Ganga Apartments"],
    vanArrivalMinutes: 35,
    latitude: 28.5293,
    longitude: 77.1539,
    faqs: [
      {
        q: "Do you service DDA flats and private bungalows in Vasant Kunj?",
        a: "Yes! Our mobile grooming van parks outside private bungalows or inside DDA society parking lots in Vasant Kunj."
      }
    ]
  },
  {
    slug: "saket",
    name: "Saket",
    citySlug: "delhi",
    cityName: "Delhi",
    heading: "Pet Grooming at Home & Home Vet Visit in Saket, South Delhi",
    tagline: "Servicing Saket Blocks A-N, Sainik Farms & Press Enclave",
    description: "Book Delhi NCR's top mobile pet groomers and home-visit veterinarians in Saket, South Delhi.",
    popularBreeds: ["Shih Tzu", "Pug", "Golden Retriever", "French Bulldog", "Indie Cat"],
    societyNames: ["Saket Block A-J", "Press Enclave Apartments", "Sainik Farms", "Anupam Enclave"],
    vanArrivalMinutes: 40,
    latitude: 28.5244,
    longitude: 77.2188,
    faqs: [
      {
        q: "Is cat grooming available at home in Saket?",
        a: "Yes, our certified cat groomers handle cats gently without anesthesia or stress."
      }
    ]
  },
  {
    slug: "greater-kailash",
    name: "Greater Kailash (GK 1 & GK 2)",
    citySlug: "delhi",
    cityName: "Delhi",
    heading: "Luxury Doorstep Pet Grooming in Greater Kailash (GK 1 & 2), South Delhi",
    tagline: "VIP Mobile Grooming Van for GK 1, GK 2, Pamposh Enclave & Kailash Colony",
    description: "Premium doorstep pet spa bath, breed haircut, nail care, and vet consultations in Greater Kailash 1 and 2, South Delhi.",
    popularBreeds: ["Poodle", "Golden Retriever", "Shih Tzu", "Maltese", "Himalayan Cat"],
    societyNames: ["GK 1 M Block", "GK 2 M Block", "Pamposh Enclave", "Kailash Colony", "Hemkunt Colony"],
    vanArrivalMinutes: 45,
    latitude: 28.5482,
    longitude: 77.2344,
    faqs: [
      {
        q: "How do I schedule a grooming session in Greater Kailash?",
        a: "Select your package on our website or call us at +91 98187 28444 to book a slot for GK 1 or GK 2."
      }
    ]
  },
  {
    slug: "hauz-khas",
    name: "Hauz Khas & Green Park",
    citySlug: "delhi",
    cityName: "Delhi",
    heading: "Doorstep Pet Grooming & Vet Visit in Hauz Khas & Green Park",
    tagline: "Mobile Pet Grooming Van Servicing Hauz Khas Enclave, Green Park & Safdarjung",
    description: "Hassle-free mobile pet grooming and doctor home visits in Hauz Khas, Green Park, and Safdarjung Development Area (SDA), Delhi.",
    popularBreeds: ["Labrador", "Beagle", "Shih Tzu", "Indie Dog", "Persian Cat"],
    societyNames: ["Hauz Khas Enclave", "Green Park Main & Extension", "Safdarjung Enclave", "SDA"],
    vanArrivalMinutes: 40,
    latitude: 28.5494,
    longitude: 77.2001,
    faqs: [
      {
        q: "What pet services are offered at home in Hauz Khas?",
        a: "We offer Doorstep Van Grooming, Home Vet Visit, Pet Sitting, Companion Consultation, and Pet Insurance."
      }
    ]
  },
  {
    slug: "defence-colony",
    name: "Defence Colony",
    citySlug: "delhi",
    cityName: "Delhi",
    heading: "Luxury Doorstep Pet Grooming in Defence Colony, Delhi",
    tagline: "VIP Mobile Grooming Van Servicing Defence Colony A-E Blocks",
    description: "Professional dog bath, haircut, ear cleaning, and vet checkups delivered at your residence in Defence Colony, Delhi.",
    popularBreeds: ["Golden Retriever", "Cocker Spaniel", "Shih Tzu", "French Bulldog", "Persian Cat"],
    societyNames: ["Defence Colony A-E Blocks", "Varun Marg", "Lajpat Nagar 3 border"],
    vanArrivalMinutes: 45,
    latitude: 28.5729,
    longitude: 77.2307,
    faqs: [
      {
        q: "Are the groomers trained to handle anxious pets in Defence Colony?",
        a: "Yes! All our groomers are certified in fear-free pet handling techniques."
      }
    ]
  },
  {
    slug: "dwarka",
    name: "Dwarka (Sectors 1-24)",
    citySlug: "delhi",
    cityName: "Delhi",
    heading: "Doorstep Pet Grooming & Home Vet Service in Dwarka, Delhi",
    tagline: "Mobile Pet Grooming Van Servicing Dwarka Sector 1 to 24",
    description: "Fast, affordable, and stress-free mobile pet grooming vans and home vet visits across all sectors of Dwarka, New Delhi.",
    popularBreeds: ["Golden Retriever", "Labrador", "Pug", "Shih Tzu", "Indie Dog"],
    societyNames: ["CGHS Societies Dwarka Sec 6", "Sec 10 DDA Flats", "Sec 12 DDA", "Sec 22 Apartments"],
    vanArrivalMinutes: 35,
    latitude: 28.5921,
    longitude: 77.0460,
    faqs: [
      {
        q: "Do you service high-rise CGHS societies in Dwarka?",
        a: "Yes, our mobile van parks right inside CGHS society premises across all Dwarka sectors."
      }
    ]
  },

  // ── NOIDA ───────────────────────────────────────────────────
  {
    slug: "sector-18",
    name: "Sector 18 & Central Noida",
    citySlug: "noida",
    cityName: "Noida",
    heading: "Doorstep Pet Grooming in Noida Sector 18 & Central Noida",
    tagline: "Mobile Van Spa Servicing Sector 18, 15, 19, 27 & Atta Market Area",
    description: "Professional mobile dog and cat grooming vans arriving at your doorstep in Noida Sector 18 and surrounding central sectors.",
    popularBreeds: ["Golden Retriever", "Shih Tzu", "Pug", "Labrador", "Persian Cat"],
    societyNames: ["Sector 19 RWA", "Sector 27 Bungalows", "Sector 15A Noida"],
    vanArrivalMinutes: 40,
    latitude: 28.5708,
    longitude: 77.3261,
    faqs: [
      {
        q: "How do I book a mobile van slot in Noida Sector 18?",
        a: "Book online at sniffnsnooz.in/booking or call +91 98187 28444 for instant slot confirmation."
      }
    ]
  },
  {
    slug: "sector-62",
    name: "Sector 62 & Electronic City",
    citySlug: "noida",
    cityName: "Noida",
    heading: "Doorstep Pet Grooming & Vet Care in Noida Sector 62",
    tagline: "Mobile Pet Spa Servicing Sector 62, 63, 61 & Indirapuram Border",
    description: "Book verified pet groomers and home vet checkups in Sector 62, Noida. Zero hassle, hygienic, organic products.",
    popularBreeds: ["Labrador", "Beagle", "Shih Tzu", "Indie Dog", "Cat"],
    societyNames: ["Stellar Park", "Bhel Apartments", "Indian Oil Apartments Sec 62"],
    vanArrivalMinutes: 40,
    latitude: 28.6270,
    longitude: 77.3650,
    faqs: [
      {
        q: "Is doorstep grooming available in Sector 62 apartments?",
        a: "Yes! Our mobile van parks in your society parking space."
      }
    ]
  },
  {
    slug: "sector-137",
    name: "Sector 137 & Noida Expressway",
    citySlug: "noida",
    cityName: "Noida",
    heading: "Doorstep Pet Grooming in Noida Sector 137 & Expressway",
    tagline: "Serving Paras Tierea, Exotica Fresco, Supertech Ecociti & Purvanchal Royal Park",
    description: "Sniffnsnooz mobile pet grooming van delivers VIP bath, breed haircut, and vet checkups along Noida Expressway Sector 137, 135, 143, and 168.",
    popularBreeds: ["Shih Tzu", "Golden Retriever", "Poodle", "Lhasa Apso", "Persian Cat"],
    societyNames: ["Paras Tierea", "Exotica Fresco", "Supertech Ecociti", "Purvanchal Royal Park", "Gulshan Vivante"],
    vanArrivalMinutes: 45,
    latitude: 28.5042,
    longitude: 77.4121,
    faqs: [
      {
        q: "Does the mobile van come to Sector 137 Paras Tierea and Ecociti?",
        a: "Yes, our mobile van services all major high-rise condominiums along Noida Expressway daily."
      }
    ]
  },

  // ── GHAZIABAD ───────────────────────────────────────────────
  {
    slug: "indirapuram",
    name: "Indirapuram",
    citySlug: "ghaziabad",
    cityName: "Ghaziabad",
    heading: "Doorstep Pet Grooming & Home Vet Service in Indirapuram, Ghaziabad",
    tagline: "Serving Vaibhav Khand, Ahinsa Khand, Nyay Khand & Niti Khand",
    description: "Top-rated mobile pet grooming van and certified home vet visits across Indirapuram, Ghaziabad.",
    popularBreeds: ["Golden Retriever", "Shih Tzu", "Labrador", "Pug", "Indie Dog"],
    societyNames: ["Shipra Sun City", "ATS Advantage", "Express Garden", "Mahagun Mansion"],
    vanArrivalMinutes: 45,
    latitude: 28.6460,
    longitude: 77.3700,
    faqs: [
      {
        q: "Can I book a doorstep grooming van in Indirapuram?",
        a: "Yes! Our mobile van visits Indirapuram daily for dog and cat grooming sessions."
      }
    ]
  },

  // ── FARIDABAD ───────────────────────────────────────────────
  {
    slug: "sector-15",
    name: "Sector 15 & Greater Faridabad",
    citySlug: "faridabad",
    cityName: "Faridabad",
    heading: "Doorstep Pet Grooming in Sector 15 & Greater Faridabad",
    tagline: "Mobile Pet Spa Servicing Sector 15, 16, 14 & Neharpar",
    description: "Hygienic, stress-free doorstep pet grooming van and home vet consultations across Faridabad.",
    popularBreeds: ["Labrador", "Golden Retriever", "Pug", "Shih Tzu", "Indie Dog"],
    societyNames: ["Sector 15 Market Area", "Puri Pranayam", "BPTP Park Grandeura"],
    vanArrivalMinutes: 45,
    latitude: 28.4089,
    longitude: 77.3178,
    faqs: [
      {
        q: "Is doorstep pet grooming available in Greater Faridabad?",
        a: "Yes, we cover Sector 15, 16, 14, and all Neharpar high-rise societies."
      }
    ]
  }
];

export function getNeighborhood(citySlug: string, areaSlug: string): Neighborhood | undefined {
  return neighborhoods.find(
    (n) => n.citySlug.toLowerCase() === citySlug.toLowerCase() && n.slug.toLowerCase() === areaSlug.toLowerCase()
  );
}

export function getNeighborhoodsByCity(citySlug: string): Neighborhood[] {
  return neighborhoods.filter((n) => n.citySlug.toLowerCase() === citySlug.toLowerCase());
}
