type Props = {
  name: string;
  description: string;
  price: number;
};

export default function PackageCard({ name, description, price }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm opacity-80 mt-2">{description}</p>
        <p className="text-xs mt-2 text-green-700 font-medium">
          🚐 Doorstep Service
        </p>
      </div>

      <div className="mt-6">
        <p className="text-xl font-bold">₹{price}</p>
      </div>
    </div>
  );
}
