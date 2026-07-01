"use client";

import { useState, useEffect } from "react";
import AddOnSelector from "@/components/AddOnSelector";
import SlotPicker from "@/components/SlotPicker";
import { useBooking } from "@/context/BookingContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ✅ LOCAL PACKAGES LIST (As per your request)
const localPackages = [
  { name: "Full Grooming", price: 1899 },
  { name: "Mini Grooming", price: 1249 },
  { name: "Only Haircut", price: 1199 },
  { name: "Only Bath", price: 1049 },
];

function isValidDate(dateStr: string) {
  const selected = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selected.setHours(0, 0, 0, 0);
  const diff = (selected.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 1;
}

export default function BookingPage() {
  const { items, addItem, removeItem, total } = useBooking();
  const router = useRouter();

  const [basePrice, setBasePrice] = useState(0);
  const [baseService, setBaseService] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petAllergy, setPetAllergy] = useState("");
  const [friendlyHuman, setFriendlyHuman] = useState("");
  const [friendlyPets, setFriendlyPets] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");

  const [style, setStyle] = useState("");
  const [hairLength, setHairLength] = useState("");
  const [mattingApproval, setMattingApproval] = useState("");

  const [consentA, setConsentA] = useState(false);
  const [consentB, setConsentB] = useState(false);

  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [dateError, setDateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handleDateChange = (value: string) => {
    setDate(value);
    if (!isValidDate(value)) {
      setDateError("Please book at least 1 day in advance.");
    } else {
      setDateError("");
    }
  };

  const useMyLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`${pos.coords.latitude}, ${pos.coords.longitude}`);
        setLocationLoading(false);
        alert("📍 Location captured!");
      },
      () => {
        setLocationLoading(false);
        alert("Location access denied.");
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // ✅ LOGIC: baseService check added to isDisabled
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isDisabled =
    !baseService || // 👈 User MUST select a base service now
    !name ||
    !phone ||
    !isValidEmail ||
    !house ||
    !street ||
    !fullAddress ||
    !petName ||
    !petBreed ||
    !petAge ||
    !friendlyHuman ||
    !friendlyPets ||
    !serviceLocation ||
    !style ||
    (style === "Scissor Only" && !hairLength) ||
    !mattingApproval ||
    !consentA ||
    !consentB ||
    !date ||
    !slot ||
    isSubmitting;

  async function submitBooking() {
    setIsSubmitting(true);
    try {
      const payload = {
        name, phone, email, location,
        address: { house, street, fullAddress },
        petDetails: { petName, petBreed, petAge, petAllergies: petAllergy, friendlyWithHumans: friendlyHuman === "Yes", friendlyWithPets: friendlyPets === "Yes" },
        styling: { styleSelected: style, hairLength: hairLength || null, mattingApproval },
        consentAccepted: consentA && consentB,
        serviceLocation,
        booking: { items, basePrice, total, date, slot },
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Booking failed");
      
      setShowSuccessOverlay(true);
      setTimeout(() => router.push('/booking-success'), 2500);
    } catch (error) {
      alert("❌ Error submitting booking.");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen py-24 bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] relative overflow-hidden">
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#5b3a26]/90 backdrop-blur-md">
          <div className="bg-white p-10 rounded-[40px] text-center shadow-2xl animate-in zoom-in-90 duration-300">
            <div className="text-5xl mb-4">🐾</div>
            <h2 className="text-3xl font-serif text-[#5b3a26] mb-2">Booking Confirmed!</h2>
            <p className="text-[#7a5741]">We'll see you soon!</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="glass-card p-10 bg-white/70 rounded-[40px] shadow-sm border border-white">
          <h1 className="text-4xl font-serif text-[#5b3a26] mb-2 text-center">Book Grooming</h1>
          
          {/* YOUR DETAILS & ADDRESS */}
          <div className="glass-card bg-white/40 border border-[#eadfce] rounded-2xl p-6 mb-8 mt-8">
            <h2 className="font-semibold mb-4 text-[#5b3a26]">Parent Details & Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" placeholder="Parent Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="input" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type="email" className="input md:col-span-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" placeholder="House / Flat No." value={house} onChange={(e) => setHouse(e.target.value)} />
              <input className="input" placeholder="Street / Sector" value={street} onChange={(e) => setStreet(e.target.value)} />
              <input className="input md:col-span-2" placeholder="Complete Address" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} />
            </div>
            <button onClick={useMyLocation} type="button" className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-[#5b3a26] text-white">
               {locationLoading ? "Fetching..." : location ? "✅ Location Linked" : "📍 Share Precise Live Location"}
            </button>
          </div>

          {/* PET DETAILS */}
          <div className="glass-card bg-white/40 border border-[#eadfce] rounded-2xl p-6 mb-8">
            <h2 className="font-semibold mb-4 text-[#5b3a26]">Pet Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" placeholder="Pet Name" value={petName} onChange={(e) => setPetName(e.target.value)} />
              <input className="input" placeholder="Breed" value={petBreed} onChange={(e) => setPetBreed(e.target.value)} />
              <input className="input" placeholder="Age" value={petAge} onChange={(e) => setPetAge(e.target.value)} />
              <input className="input md:col-span-2" placeholder="Any Allergies" value={petAllergy} onChange={(e) => setPetAllergy(e.target.value)} />
            </div>
            <div className="mt-4 text-sm grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4 border-[#eadfce]/50">
              <div>
                <p className="font-medium mb-2">Friendly with humans?</p>
                <label className="mr-4 inline-flex items-center"><input type="radio" name="fh" onChange={() => setFriendlyHuman("Yes")} /> Yes</label>
                <label className="inline-flex items-center"><input type="radio" name="fh" onChange={() => setFriendlyHuman("No")} /> No</label>
              </div>
              <div>
                <p className="font-medium mb-2">Friendly with pets?</p>
                <label className="mr-4 inline-flex items-center"><input type="radio" name="fp" onChange={() => setFriendlyPets("Yes")} /> Yes</label>
                <label className="inline-flex items-center"><input type="radio" name="fp" onChange={() => setFriendlyPets("No")} /> No</label>
              </div>
              <div>
                <p className="font-medium mb-2">Service Location</p>
                <label className="mr-4 inline-flex items-center"><input type="radio" name="sl" onChange={() => setServiceLocation("Home")} /> Home</label>
                <label className="inline-flex items-center"><input type="radio" name="sl" onChange={() => setServiceLocation("Store")} /> Store</label>
              </div>
            </div>
          </div>

          {/* ✅ UPDATED BASE SERVICE SELECTION */}
          <div className="glass-card bg-white/40 border border-[#eadfce] rounded-2xl p-6 mb-8">
            <label className="block font-semibold mb-2 text-[#5b3a26]">Choose Base Service (Required)</label>
            <select
              className="w-full border rounded-xl px-4 py-3 bg-white"
              value={basePrice || ""}
              onChange={(e) => {
                const pkg = localPackages.find((p) => p.price === Number(e.target.value));
                if (!pkg) return;
                
                // Remove old base service from cart before adding new one
                const existingBase = items.find(i => i.category === "Base Service");
                if (existingBase) removeItem(existingBase.id);

                setBasePrice(pkg.price);
                setBaseService(pkg.name);
                addItem({ id: `base-${pkg.name}`, name: pkg.name, price: pkg.price, category: "Base Service" });
              }}
            >
              <option value="">Select a package...</option>
              {localPackages.map((pkg, index) => (
                <option key={index} value={pkg.price}>{pkg.name} – ₹{pkg.price}</option>
              ))}
            </select>
          </div>

          {/* STYLING SECTION */}
          <div className="glass-card bg-white/40 border border-[#eadfce] rounded-2xl p-6 mb-8">
            <h2 className="font-semibold mb-4 text-[#5b3a26]">Grooming Style</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {["Puppy Cut", "Teddy Cut", "Breed Cut", "Summer Cut", "Full Trim", "Scissor Only"].map((opt) => (
                <label key={opt} className={`block text-sm p-2 rounded-lg border border-[#eadfce] cursor-pointer ${style === opt ? 'bg-[#5b3a26] text-white' : 'bg-white'}`}>
                  <input type="radio" name="style" checked={style === opt} onChange={() => setStyle(opt)} className="hidden" /> {opt}
                </label>
              ))}
            </div>
            {style === "Scissor Only" && (
              <input type="text" className="input mb-4" placeholder="Requested length (e.g. 1 inch)" value={hairLength} onChange={(e) => setHairLength(e.target.value)} />
            )}
            <div className="pt-4 border-t border-[#eadfce]/50 text-sm">
              <p className="font-semibold mb-2">Matting Acknowledgement:</p>
              <label className="block mb-2"><input type="radio" name="matting" onChange={() => setMattingApproval("Approve Removal")} /> I approve removal of heavy matting.</label>
              <label className="block"><input type="radio" name="matting" onChange={() => setMattingApproval("Limited Results")} /> I accept limited results without mat removal.</label>
            </div>
          </div>

          {/* ADD-ONS SECTION (If any items are in context from services page) */}
          {items.length > 0 && (
            <div className="glass-card bg-white/40 border border-[#eadfce] rounded-2xl p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-[#5b3a26]">Booking Summary</h2>
                <Link href="/services" className="text-xs text-[#5b3a26] underline">+ Add More Services</Link>
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <div className="flex gap-4">
                      <span>₹{item.price}</span>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 text-xs">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCHEDULING */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="glass-card bg-white/40 border border-[#eadfce] rounded-2xl p-6">
              <h2 className="font-semibold mb-2 text-sm text-[#5b3a26]">Select Date</h2>
              <input type="date" className="w-full border rounded-xl px-4 py-3 bg-white" onChange={(e) => handleDateChange(e.target.value)} />
              {dateError && <p className="text-red-600 text-xs mt-1">{dateError}</p>}
            </div>
            <div className="glass-card bg-white/40 border border-[#eadfce] rounded-2xl p-6">
              <h2 className="font-semibold mb-2 text-sm text-[#5b3a26]">Select Time Slot</h2>
              <SlotPicker selected={slot} onSelect={setSlot} />
            </div>
          </div>

          {/* CONSENT */}
          <div className="space-y-4 mb-8">
            <label className="flex items-center text-xs text-[#7a5741] cursor-pointer">
              <input type="checkbox" checked={consentA} onChange={(e) => setConsentA(e.target.checked)} className="mr-2" />
              I agree to the General Grooming Consent (Medical & Safety).
            </label>
            <label className="flex items-center text-xs text-[#7a5741] cursor-pointer">
              <input type="checkbox" checked={consentB} onChange={(e) => setConsentB(e.target.checked)} className="mr-2" />
              I understand that results depend on pet behavior and coat condition.
            </label>
          </div>

          {/* STICKY FOOTER */}
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t p-6 -mx-10 -mb-10 rounded-b-3xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-2xl font-bold text-[#5b3a26]">Total: ₹{total}</span>
              <button
                disabled={isDisabled}
                onClick={submitBooking}
                className="bg-[#5b3a26] text-white px-12 py-4 rounded-full disabled:opacity-30 w-full md:w-auto font-semibold shadow-lg transition-all"
              >
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #eadfce;
          background: rgba(255, 255, 255, 0.6);
          outline: none;
          transition: border 0.2s;
        }
        .input:focus {
          border-color: #5b3a26;
        }
      `}</style>
    </section>
  );
}