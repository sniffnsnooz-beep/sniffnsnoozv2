import { addons } from "@/data/addons";

type Props = {
  onToggle: (price: number) => void;
};

export default function AddOnSelector({ onToggle }: Props) {
  return (
    <div className="space-y-3">
      {addons.map((addon) => (
        <label
          key={addon.id}
          className="flex justify-between items-center border rounded-xl px-4 py-3 cursor-pointer"
        >
          <span>{addon.name}</span>
          <span className="font-medium">₹{addon.price}</span>
          <input
            type="checkbox"
            onChange={() => onToggle(addon.price)}
          />
        </label>
      ))}
    </div>
  );
}
