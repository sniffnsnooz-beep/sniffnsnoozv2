"use client";

import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  desc: string;
  price: string;   // e.g. "₹199"
  image: string;
}

export default function ServiceCard({ title, desc, price, image }: Props) {
  const { addItem } = useBooking();
  const router = useRouter();

  function handleAdd() {
    addItem({
      id: title.toLowerCase().replace(/\s+/g, "-"), // unique id
      name: title,
      price: Number(price.replace("₹", "")), // ₹199 → 199
    });

    router.push("/booking");
  }

  return (
    <div
      className="
        group bg-[#fff7ef] rounded-[28px] p-6
        shadow-[inset_0_2px_8px_rgba(255,255,255,0.9),0_14px_30px_rgba(0,0,0,0.06)]
        transition-all duration-300 hover:-translate-y-2
        hover:shadow-[0_22px_40px_rgba(0,0,0,0.12)]
      "
    >
      <img
        src={image}
        alt={title}
        className="w-full h-44 object-contain mb-4"
      />

      <h3 className="text-xl font-serif text-[#5b3a26]">
        {title}
      </h3>

      <p className="text-[#7a5741] mt-2 text-sm">
        {desc}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-[#5b3a26] font-semibold">
          {price}
        </span>

        {/* 👇 SAME BUTTON, JUST LOGIC ADDED */}
        <button
          onClick={handleAdd}
          className="bg-[#5b3a26] text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition"
        >
          Add +
        </button>
      </div>
    </div>
  );
}
