"use client";

import { hairStylingServices } from "@/data/hairStylingServices";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";

export default function HairStylingPage() {
  const { addItem, items } = useBooking();
  const router = useRouter();

  function handleAdd(service: any) {
    addItem({
      id: service.id ?? service.name, // safety
      name: service.name,
      price: service.price,
      time: service.time,
      category: "Hair & Styling Services",
    });
  }

  return (
    <section className="bg-[#f6efe6] py-28">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-4xl font-serif text-[#5b3a26] mb-10">
          Hair & Styling Services
        </h1>

        {/* ✅ MOBILE = LIST | DESKTOP = GRID */}
        <div
          className="
            space-y-3
            md:space-y-0
            md:grid md:grid-cols-3 md:gap-6
          "
        >
          {hairStylingServices.map((s, i) => (
            <div
              key={i}
              className="
                bg-white
                rounded-xl
                px-6 py-4
                flex justify-between items-center
                shadow-sm
              "
            >
              <div>
                <p className="font-medium text-[#5b3a26]">
                  {s.name}
                </p>
                <p className="text-sm text-[#7a5741]">
                  ⏱ {s.time}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#5b3a26]">
                  {s.price === 0 ? "Free" : `₹${s.price}`}
                </span>

                <button
                  onClick={() => handleAdd(s)}
                  className="
                    border border-[#5b3a26]
                    px-4 py-1.5
                    rounded-lg
                    text-sm
                    hover:bg-[#5b3a26]
                    hover:text-white
                    transition
                  "
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ PROCEED TO BOOKING BUTTON (CONTEXT CONTROLLED) */}
        {items.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => router.push("/booking")}
              className="
                bg-[#5b3a26]
                text-white
                px-6 py-3
                rounded-full
                shadow-lg
                hover:scale-105
                transition
              "
            >
              Proceed to Booking ({items.length})
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
