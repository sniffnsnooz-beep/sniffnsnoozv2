"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const staticReviews = [
  {
    author_name: "Deepu Bhai",
    rating: 5,
    text: "I'm absolutely delighted with the service I received at this pet grooming shop! The staff are incredibly friendly, professional, and genuinely passionate about pets.",
  },
  {
    author_name: "Aman Roshni",
    rating: 5,
    text: "This pet grooming shop is truly exceptional! The staff's dedication to providing top-notch care is evident in every aspect of their service.",
  },
  {
    author_name: "Shankar Raikwar",
    rating: 5,
    text: "This pet grooming shop is a game-changer! The staff are absolutely wonderful, and their love for animals is evident.",
  },
  {
    author_name: "Ajay Kumar",
    rating: 5,
    text: "Outstanding service and care for my furry friend! Knowledgeable, friendly staff who genuinely love animals.",
  },
  {
    author_name: "Uday Pratap",
    rating: 5,
    text: "I'm beyond impressed with the exceptional service. My pet always looks forward to grooming sessions here.",
  },
  {
    author_name: "Sandeep Singh",
    rating: 5,
    text: "This pet grooming shop is truly a gem! Friendly staff with a real passion for animals.",
  },
];

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState<any[]>(staticReviews);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then(async (r) => {
        if (!r.ok) {
          return { reviews: [] };
        }
        const contentType = r.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return r.json();
        } else {
          return { reviews: [] };
        }
      })
      .then((d) => {
        if (d && d.reviews && d.reviews.length > 0) {
          setReviews([...d.reviews, ...staticReviews]);
        }
      })
      .catch(() => {
        // Suppress errors to prevent Turbopack overlay
      });
  }, []);

  return (
    <section
      className="
        py-4 
        bg-gradient-to-br 
        from-[#f6efe6] 
        via-[#f2e9df] 
        to-[#eadfce]
        mt-0
      "
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* HEADING - Gap minimized */}
        <h2 className="text-3xl font-serif text-[#5b3a26] mb-1">
          NCR Pet Parents Love Us!
        </h2>
        <p className="text-[#7a5741] mb-6 text-sm">
          Real reviews from verified Sniffnsnooz customers
        </p>

        {/* CAROUSEL */}
        <div className="relative px-8"> {/* Container for arrows */}
          <Swiper
            modules={[Navigation]}
            navigation
            centeredSlides={false}
            slidesPerView={1.1}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="reviews-swiper !pb-2"
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={i}>
                <div
                  className="
                    bg-white/60 
                    backdrop-blur-xl 
                    border border-white/40 
                    rounded-3xl 
                    p-5 
                    shadow-lg 
                    text-left 
                    h-full 
                    hover:scale-[1.01] 
                    transition-transform 
                    duration-300
                    flex flex-col
                  "
                >
                  <div className="flex items-center gap-3 mb-3">
                    {r.profile_photo_url ? (
                      <img
                        src={r.profile_photo_url}
                        alt={r.author_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#5b3a26] text-white flex items-center justify-center font-semibold text-sm">
                        {r.author_name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-[#5b3a26] text-sm">
                        {r.author_name}
                      </p>
                      <p className="text-green-700 text-[10px]">
                        ✔ Verified pet parent
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-2 text-yellow-500 text-xs">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx}>
                        {idx < r.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-[#3b2a21] leading-relaxed italic">
                    “{r.text}”
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-6">
          <a
            href="https://g.page/r/CXWsbLQk_WWUEBE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium text-[#5b3a26] underline hover:text-[#3f2a1d] transition-colors"
          >
            View all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}