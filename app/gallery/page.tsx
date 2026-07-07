"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowLeft } from "lucide-react";

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const galleryImages = [
    "/assets/img1.jpeg", "/assets/img2.jpeg", "/assets/img3.jpg",
    "/assets/img4.jpg", "/assets/img5.jpg", "/assets/img6.jpg",
    "/assets/img7.jpg", "/assets/img8.jpg", "/assets/img9.jpg",
    "/assets/img10.jpg", "/assets/img11.jpg", "/assets/img12.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] pt-32 pb-20 px-6 overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/40 rounded-full blur-[100px] animate-bounce-slow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#e6d3c2]/50 rounded-full blur-[120px] animate-bounce-medium pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-6">
            <span>📸</span> Our Masterpieces
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-8 drop-shadow-sm">
            Grooming <span className="shimmer-text italic">Gallery</span>
          </h1>
          <p className="text-lg text-[#7a5741] leading-relaxed max-w-4xl mx-auto italic px-4 font-medium">
            "At Sniffnsnooz, we believe that grooming is an art form, and our gallery is a testament to the premium care we provide to every pet in allover NCR. As the leading professional pet grooming salon, our expert stylists specialize in breed-specific haircuts and luxurious aromatherapy baths that leave your furry friends looking royal. Whether you are looking for the best pet spa & grooming services in Gurgaon, our portfolio showcases transformations that prioritize both style and pet comfort. We use only organic, skin-friendly products, ensuring a safe and stress-free environment for every dog and cat that walks through our doors. From messy paws to fluffy paws, our gallery highlights the meticulous attention to detail that makes us the preferred choice for pet parents across NCR. Explore our collection of satisfied clients and see the magic of our certified pet groomers in action. Every image reflects our commitment to excellence, hygiene, and the ultimate pampering experience for your beloved companions. Book your session today at Sniffnsnooz and let your pet be our next masterpiece in the heart of the capital region."
          </p>
        </motion.div>

        {/* IMAGE MASONRY GRID */}
        <div className="masonry-grid">
          {galleryImages.map((src, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              key={index} 
              onClick={() => setSelectedImg(src)}
              className="masonry-item group relative border-[6px] border-white/60 bg-white/20"
            >
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src={src}
                  alt={`Pet Grooming ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index < 3}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2410]/70 via-[#3d2410]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/30 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <ZoomIn size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lightbox-overlay"
              onClick={() => setSelectedImg(null)}
            >
              <button 
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
                onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
              >
                <X size={24} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center pointer-events-none"
              >
                <img 
                  src={selectedImg} 
                  alt="Enlarged view" 
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl pointer-events-auto border-4 border-white/10"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 text-center">
          <Link href="/" className="btn-ghost !border-[#5b3a26]/20 inline-flex group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}