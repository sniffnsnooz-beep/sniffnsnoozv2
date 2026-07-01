"use client";

import { createContext, useContext, useState } from "react";

export type BookingItem = {
  id: string;
  name: string;
  price: number;

  // existing optional fields
  time?: string;
  category?: string;

  // ✅ cart support
  qty?: number;
};

type BookingContextType = {
  items: BookingItem[];
  addItem: (item: BookingItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;          // ✅ ADDED (important)
  total: number;
  count: number;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BookingItem[]>([]);

  // ✅ ADD / INCREMENT ITEM (cart logic)
  function addItem(item: BookingItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      // item already in cart → qty +1
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, qty: (i.qty ?? 1) + 1 }
            : i
        );
      }

      // new item → qty = 1
      return [...prev, { ...item, qty: 1 }];
    });
  }

  // ✅ REMOVE ITEM COMPLETELY
  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  // ✅ CLEAR CART (after booking or reset)
  function clearItems() {
    setItems([]);
  }

  // ✅ TOTAL PRICE (qty aware)
  const total = items.reduce(
    (sum, i) => sum + i.price * (i.qty ?? 1),
    0
  );

  // ✅ TOTAL ITEMS COUNT
  const count = items.reduce(
    (sum, i) => sum + (i.qty ?? 1),
    0
  );

  return (
    <BookingContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearItems,   // ✅ PROVIDED
        total,
        count,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be inside BookingProvider");
  }
  return ctx;
}
