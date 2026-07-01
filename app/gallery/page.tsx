"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GalleryPage() {
  // Lightbox ke liye state
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const galleryImages = [
    "/assets/img1.jpeg", "/assets/img2.jpeg", "/assets/img3.jpg",
    "/assets/img4.jpg", "/assets/img5.jpg", "/assets/img6.jpg",
    "/assets/img7.jpg", "/assets/img8.jpg", "/assets/img9.jpg",
    "/assets/img10.jpg", "/assets/img11.jpg", "/assets/img12.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf6] pt-32 pb-20 px-6 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-1deg); }
          75% { transform: rotate(1deg); }
        }
        .animate-wiggle-hover:hover {
          animation: wiggle 0.3s ease-in-out infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-8">
            Our Grooming Masterpieces
          </h1>
          <p className="text-lg text-[#7a5741] leading-[1.8] max-w-4xl mx-auto italic px-4">
           "At Sniffnsnooz, we believe that grooming is an art form, and our gallery is a testament to the premium care we provide to every pet in allover NCR. As the leading professional pet grooming salon, our expert stylists specialize in breed-specific haircuts and luxurious aromatherapy baths that leave your furry friends looking royal. Whether you are looking for the best pet spa & grooming services in Gurgaon, our portfolio showcases transformations that prioritize both style and pet comfort. We use only organic, skin-friendly products, ensuring a safe and stress-free environment for every dog and cat that walks through our doors. From messy paws to fluffy paws, our gallery highlights the meticulous attention to detail that makes us the preferred choice for pet parents across NCR. Explore our collection of satisfied clients and see the magic of our certified pet groomers in action. Every image reflects our commitment to excellence, hygiene, and the ultimate pampering experience for your beloved companions. Book your session today at Sniffnsnooz and let your pet be our next masterpiece in the heart of the capital region."... (content preserved)
          </p>
        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleryImages.map((src, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImg(src)} // Click par image select hogi
              className="group relative h-[450px] cursor-pointer
                         rounded-[40px] overflow-hidden 
                         border-[12px] border-white shadow-md
                         hover:shadow-[0_20px_50px_rgba(91,58,38,0.25)] 
                         animate-wiggle-hover
                         transition-all duration-300 ease-in-out"
            >
              <Image
                src={src}
                alt={`Pet Grooming ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5b3a26]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-white font-medium tracking-widest uppercase text-sm">Click to Zoom</span>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX MODAL (Jab image badi hogi) */}
        {selectedImg && (
          <div 
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 md:p-10 backdrop-blur-sm transition-all"
            onClick={() => setSelectedImg(null)} // Bahar click karne par band
          >
            <button 
              className="absolute top-10 right-10 text-white text-4xl font-bold hover:scale-110 transition"
              onClick={() => setSelectedImg(null)}
            >
              &times;
            </button>
            
            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
              <img 
                src={selectedImg} 
                alt="Enlarged view" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300"
              />
            </div>
          </div>
        )}

        <div className="mt-24 text-center">
          <Link href="/">
            <button className="bg-[#5b3a26] text-white px-12 py-5 rounded-full text-lg font-medium shadow-lg hover:scale-105 transition-all active:scale-95">
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}