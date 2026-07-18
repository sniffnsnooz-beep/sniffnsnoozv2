"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play, ArrowLeft } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

interface GalleryMedia {
  _id: string;
  title: string;
  url: string;
  mediaType: "image" | "video";
  category: string;
  tags: string[];
}

export default function GalleryPage() {
  const [mediaList, setMediaList] = useState<GalleryMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Core fallback images if database has no media yet
  const fallbackImages: GalleryMedia[] = [
    { _id: "f1", title: "Dog Grooming Spa", url: "/assets/img1.jpeg", mediaType: "image", category: "Grooming", tags: ["Grooming", "Spa"] },
    { _id: "f2", title: "Furry Friend Spa Bath", url: "/assets/img2.jpeg", mediaType: "image", category: "Grooming", tags: ["Bath", "Spa"] },
    { _id: "f3", title: "Fluffy Cat Grooming", url: "/assets/img3.jpg", mediaType: "image", category: "Grooming", tags: ["Cat", "Grooming"] },
    { _id: "f4", title: "Happy Golden Retriever", url: "/assets/img4.jpg", mediaType: "image", category: "Happy Pets", tags: ["Dog", "Happy"] },
    { _id: "f5", title: "Doorstep Vet Visit", url: "/assets/img5.jpg", mediaType: "image", category: "Veterinary", tags: ["Vet", "Home Check"] },
    { _id: "f6", title: "Nail Care Session", url: "/assets/img6.jpg", mediaType: "image", category: "Grooming", tags: ["Nail Care"] },
    { _id: "f7", title: "Pet Play Day", url: "/assets/img7.jpg", mediaType: "image", category: "Events", tags: ["Play", "Event"] },
    { _id: "f8", title: "Ecosystem Companions", url: "/assets/img8.jpg", mediaType: "image", category: "Companions", tags: ["Companions"] },
    { _id: "f9", title: "Cat Treatment Day", url: "/assets/img9.jpg", mediaType: "image", category: "Veterinary", tags: ["Vet", "Checkup"] },
    { _id: "f10", title: "Aromatherapy Massage", url: "/assets/img10.jpg", mediaType: "image", category: "Grooming", tags: ["Spa", "Massage"] },
    { _id: "f11", title: "Outdoor Pet Event", url: "/assets/img11.jpg", mediaType: "image", category: "Events", tags: ["Event", "Fun"] },
    { _id: "f12", title: "Cute Puppy Companion", url: "/assets/img12.jpg", mediaType: "image", category: "Companions", tags: ["Puppy"] },
  ];

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMediaList(data);
        } else {
          setMediaList(fallbackImages);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gallery API error:", err);
        setMediaList(fallbackImages);
        setLoading(false);
      });
  }, []);

  const handleMediaClick = (media: GalleryMedia) => {
    setSelectedMedia(media);
    trackEvent("gallery_interaction", { title: media.title, category: media.category, type: media.mediaType });
  };

  const filteredMedia = activeCategory === "All"
    ? mediaList
    : mediaList.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] pt-32 pb-20 px-6 overflow-hidden relative">
      {/* Decorative backdrop elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#e6d3c2]/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-6">
            <span>📸</span> Our Masterpieces
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-8">
            Sniffnsnooz <span className="shimmer-text italic">Gallery</span>
          </h1>
          <p className="text-lg text-[#7a5741] leading-relaxed max-w-4xl mx-auto font-medium">
            Explore photos and videos of happy pets groomed and cared for by our certified teams across Delhi NCR. 
            From luxury aromatherapy spa baths to professional veterinary care and loving companions, view our happy pet portfolio in action.
          </p>
        </motion.div>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", "Grooming", "Veterinary", "Happy Pets", "Companions", "Events"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold text-xs transition duration-300 ${
                activeCategory === category
                  ? "bg-[#5b3a26] text-white shadow-md scale-105"
                  : "bg-white/60 text-[#5b3a26] hover:bg-[#eadfce]/70"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* MASONRY MEDIA GRID */}
        {loading ? (
          <div className="text-center py-20 text-[#5b3a26] font-bold">Loading media items...</div>
        ) : filteredMedia.length === 0 ? (
          <div className="bg-white/40 border border-[#eadfce] rounded-3xl p-12 text-center text-[#7a5741] italic">
            No media found in this category.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => handleMediaClick(item)}
                className="break-inside-avoid group relative border-[6px] border-white/60 bg-white/20 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
              >
                {item.mediaType === "video" ? (
                  <div className="relative w-full min-h-[250px] bg-black">
                    <video
                      src={item.url}
                      className="w-full object-cover rounded-xl"
                      preload="metadata"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white border border-white/30">
                        <Play size={20} className="fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-[280px]">
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2410]/80 via-[#3d2410]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5 backdrop-blur-[1px]">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[9px] bg-white/20 border border-white/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                      {item.category}
                    </span>
                    <h3 className="text-base font-serif font-bold mt-2 flex items-center justify-between">
                      {item.title}
                      <ZoomIn size={16} className="opacity-80" />
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lightbox-overlay"
              onClick={() => setSelectedMedia(null)}
            >
              <button 
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
                onClick={(e) => { e.stopPropagation(); setSelectedMedia(null); }}
              >
                <X size={24} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative w-full max-w-5xl h-[75vh] flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedMedia.mediaType === "video" ? (
                  <video 
                    src={selectedMedia.url} 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-full rounded-2xl shadow-2xl border-4 border-white/10"
                  />
                ) : (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.title} 
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                  />
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-4 py-2 rounded-full backdrop-blur-sm select-none">
                  {selectedMedia.title} • {selectedMedia.category}
                </div>
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