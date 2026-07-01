import { useState } from "react";

export function usePriceCalculator(basePrice: number) {
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);

  const toggleAddon = (price: number) => {
    setSelectedAddons((prev) =>
      prev.includes(price)
        ? prev.filter((p) => p !== price)
        : [...prev, price]
    );
  };

  const total =
    basePrice + selectedAddons.reduce((sum, p) => sum + p, 0);

  return { toggleAddon, total };
}
