const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\Ruhaa\\.gemini\\antigravity\\scratch\\sniffnsnooz\\app';

const pages = [
  {
    dir: 'services',
    title: 'Pet Grooming Services | Sniffnsnooz',
    desc: 'Explore our premium doorstep pet grooming services in Delhi NCR. We offer baths, hair styling, spa treatments, and more for dogs and cats.',
    route: '/services'
  },
  {
    dir: 'packages',
    title: 'Pet Grooming Packages & Pricing | Sniffnsnooz',
    desc: 'Affordable and premium pet grooming packages in Delhi NCR. Check our pricing for dogs and cats doorstep grooming.',
    route: '/packages'
  },
  {
    dir: 'gallery',
    title: 'Pet Grooming Gallery | Happy Pets by Sniffnsnooz',
    desc: 'View our gallery of happy, styled, and clean pets. See the Sniffnsnooz difference in our before and after grooming transformations.',
    route: '/gallery'
  },
  {
    dir: 'booking',
    title: 'Book Doorstep Pet Grooming | Sniffnsnooz',
    desc: 'Book a professional doorstep pet grooming session in Delhi NCR today. Easy online booking for dogs and cats.',
    route: '/booking'
  },
  {
    dir: 'store-booking',
    title: 'In-Store Pet Grooming Booking | Sniffnsnooz',
    desc: 'Book an in-store pet grooming session at Sniffnsnooz. Premium care for your furry friends.',
    route: '/store-booking'
  },
  {
    dir: 'testimonials',
    title: 'Client Testimonials & Reviews | Sniffnsnooz',
    desc: 'Read what pet parents in Delhi NCR have to say about our premium doorstep pet grooming services.',
    route: '/testimonials'
  },
  {
    dir: 'contact',
    title: 'Contact Us | Sniffnsnooz Pet Grooming',
    desc: 'Get in touch with Sniffnsnooz. Contact us for doorstep pet grooming queries in Delhi NCR.',
    route: '/contact'
  },
  {
    dir: 'reviews',
    title: 'Customer Reviews | Sniffnsnooz',
    desc: 'Check out our 5-star Google reviews. See why we are Delhi NCRs top-rated doorstep pet grooming service.',
    route: '/reviews'
  },
  {
    dir: 'booking-success',
    title: 'Booking Confirmed | Sniffnsnooz',
    desc: 'Your pet grooming booking is confirmed.',
    route: '/booking-success',
    noIndex: true
  },
  {
    dir: 'services/bath-spa-addons',
    title: 'Pet Bath & Spa Add-ons | Sniffnsnooz',
    desc: 'Luxurious bath and spa treatments for dogs and cats. Enhance their grooming session with our premium add-ons.',
    route: '/services/bath-spa-addons'
  },
  {
    dir: 'services/coat-skin-treatment',
    title: 'Coat & Skin Treatments for Pets | Sniffnsnooz',
    desc: 'Specialized coat and skin treatments for pets with allergies, shedding, or sensitive skin.',
    route: '/services/coat-skin-treatment'
  },
  {
    dir: 'services/ear-care',
    title: 'Pet Ear Cleaning & Care | Sniffnsnooz',
    desc: 'Professional ear cleaning services to prevent infections and keep your pets ears healthy.',
    route: '/services/ear-care'
  },
  {
    dir: 'services/hair-styling',
    title: 'Pet Hair Styling & Trimming | Sniffnsnooz',
    desc: 'Expert pet hair styling and breed-specific cuts by professional groomers.',
    route: '/services/hair-styling'
  },
  {
    dir: 'services/nail-paw-care',
    title: 'Pet Nail Clipping & Paw Care | Sniffnsnooz',
    desc: 'Safe nail clipping and paw pad treatments for dogs and cats.',
    route: '/services/nail-paw-care'
  },
  {
    dir: 'services/oral-hygiene-care',
    title: 'Pet Teeth Cleaning & Oral Hygiene | Sniffnsnooz',
    desc: 'Keep your pets teeth clean and breath fresh with our professional oral hygiene services.',
    route: '/services/oral-hygiene-care'
  }
];

pages.forEach(page => {
  const dirPath = path.join(basePath, page.dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const layoutContent = `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${page.title}",
  description: "${page.desc}",
  alternates: {
    canonical: "${page.route}",
  },
  ${page.noIndex ? 'robots: { index: false },\n  ' : ''}openGraph: {
    title: "${page.title}",
    description: "${page.desc}",
    url: "https://sniffnsnooz.in${page.route}",
    images: [{ url: "/assets/snifflogo.png", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;

  fs.writeFileSync(path.join(dirPath, 'layout.tsx'), layoutContent);
  console.log('Created layout.tsx in', page.dir);
});
