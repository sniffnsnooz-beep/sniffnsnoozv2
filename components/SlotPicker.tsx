type Props = {
  selected: string;
  onSelect: (slot: string) => void;
};

export default function SlotPicker({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
         "09:00 AM – 10:30 AM",
          "10:30 AM – 12:00 PM",
          "12:00 PM – 01:30 PM",
          "01:30 PM – 03:00 PM",
          "03:00 PM – 04:30 PM",
           "04:30 PM – 06:00 PM",
           "06:00 PM – 07:30 PM",
      ].map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => onSelect(slot)}
          className={`border rounded-lg p-2 text-sm ${
            selected === slot
              ? "bg-[#3b2f2f] text-white"
              : "bg-white"
          }`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
