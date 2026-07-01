"use client";

import { useState, useEffect } from "react";
import AddOnSelector from "@/components/AddOnSelector";
import SlotPicker from "@/components/SlotPicker";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ==========================================
// MERGED PACKAGES DATA (Puraana + Naya)
// ==========================================
export const packages = [
  // --- Home Services (Must match names exactly) ---
  { name: "Full Grooming", price: 1899, services: "Base", saved: 0, validity: "1 Day" },
  { name: "Mini Grooming", price: 1249, services: "Base", saved: 0, validity: "1 Day" },
  { name: "Only Haircut", price: 1199, services: "Base", saved: 0, validity: "1 Day" },
  { name: "Only Bath", price: 1049, services: "Base", saved: 0, validity: "1 Day" },

  // --- VALUE PACKAGES (From Image) ---
  { name: "Hygiene Pack + Brush - Small Breed", price: 599, services: "2 services", saved: 3000, validity: "1 Day" },
  { name: "Hygiene Pack + Brush - Medium Breed", price: 599, services: "2 services", saved: 7000, validity: "1 Day" },
  { name: "Hygiene Pack + Brush - Large Breed", price: 599, services: "2 services", saved: 30000, validity: "1 Day" },
  { name: "Face/Paws/Sanitary Cut + Brush - Small Breed", price: 549, services: "4 services", saved: 3000, validity: "1 Day" },
  { name: "Face/Paws/Sanitary Cut + Brush - Medium Breed", price: 649, services: "4 services", saved: 7000, validity: "1 Day" },
  { name: "Face/Paws/Sanitary Cut + Brush - Large Breed", price: 699, services: "4 services", saved: 30000, validity: "1 Day" },
  { name: "Full Hair Cut + Hygiene Cut - Small Breed", price: 1399, services: "2 services", saved: 3000, validity: "1 Day" },
  { name: "Full Hair Cut + Hygiene Cut - Medium Breed", price: 1499, services: "2 services", saved: 7000, validity: "1 Day" },
  { name: "Full Hair Cut + Hygiene Cut - Large Breed", price: 1599, services: "2 services", saved: 30000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut - Small Breed", price: 1399, services: "5 services", saved: 3000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut - Medium Breed", price: 1499, services: "5 services", saved: 7000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut - Large Breed", price: 1599, services: "5 services", saved: 30000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut + Full Hair Cut - Small Breed", price: 1799, services: "3 services", saved: 3000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut + Full Hair Cut - Medium Breed", price: 1999, services: "3 services", saved: 7000, validity: "1 Day" },
  { name: "Spa Bath + Hygiene Cut + Full Hair Cut - Large Breed", price: 2199, services: "3 services", saved: 30000, validity: "1 Day" },

  // --- SPECIAL PACKAGES ---
  { name: "Special: 4+1 Spa Bath Combo - Small Breed", price: 3549, services: "5 services", saved: 3000, validity: "90 Days" },
  { name: "Special: 4+1 Spa Bath Combo - Medium Breed", price: 3949, services: "5 services", saved: 7000, validity: "90 Days" },
  { name: "Special: 4+1 Spa Bath Combo - Large Breed", price: 4149, services: "5 services", saved: 30000, validity: "90 Days" },
  { name: "6 Month: 30 Bath + Hygiene - Small", price: 22499, services: "31 services", saved: 3000, validity: "6 Months" },
  { name: "6 Month: 30 Bath + Hygiene - Medium", price: 23499, services: "31 services", saved: 7000, validity: "6 Months" },
  { name: "6 Month: 30 Bath + Hygiene - Large", price: 24499, services: "31 services", saved: 30000, validity: "6 Months" },
  { name: "6 Month: 30 Bath + Hygiene - XL", price: 25499, services: "31 services", saved: 45000, validity: "6 Months" },
  { name: "12 Month: 60 Bath + Hygiene - Small", price: 39999, services: "61 services", saved: 3000, validity: "1 Year" },
  { name: "12 Month: 60 Bath + Hygiene - Medium", price: 40999, services: "61 services", saved: 7000, validity: "1 Year" },
  { name: "12 Month: 60 Bath + Hygiene - Large", price: 41999, services: "61 services", saved: 30000, validity: "1 Year" },
  { name: "12 Month: 60 Bath + Hygiene - XL", price: 42999, services: "61 services", saved: 45000, validity: "1 Year" },

  // --- ORIGINAL DATA (Bina delete kiye) ---
  { name: "30 Premium Sessions for One Year Small Breed", price: 24900, services: "9 services", saved: 70860, validity: "1 Year" },
  { name: "Full Hair Cut + Sniff ’n Snooz Hygiene Cut + Oil massage", price: 2149, services: "1 services", saved: 3486, validity: "1 Day" }
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
  const bookingContext = useBooking();
  const { items, addItem, removeItem, total } = bookingContext;
  const clearCart = (bookingContext as any).clearCart; 

  const router = useRouter();

  const [baseService, setBaseService] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petAllergy, setPetAllergy] = useState("");
  const [friendlyHuman, setFriendlyHuman] = useState("");
  const [friendlyPets, setFriendlyPets] = useState("");
  const [serviceLocation, setServiceLocation] = useState("Home");
  const [style, setStyle] = useState("");
  const [mattingApproval, setMattingApproval] = useState("");
  const [consentA, setConsentA] = useState(false);
  const [consentB, setConsentB] = useState(false);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [dateError, setDateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const SHOP_LOCATION_TEXT = "Ground Floor, GF-78, Emerald Plaza, Sector-65, Gurugram, Haryana – 122018";
  const SHOP_MAPS_LINK = "https://maps.google.com"; 

  useEffect(() => {
    if (typeof clearCart === 'function') {
      clearCart();
    }
    setBaseService(""); 
  }, [serviceLocation, clearCart]);

  const handleDateChange = (value: string) => {
    setDate(value);
    if (!isValidDate(value)) {
      setDateError("Please book at least 1 day in advance.");
    } else {
      setDateError("");
    }
  };

  // ✅ STRICT FILTER FOR HOME: Only shows the 4 base services
  const homePackageNames = ["Full Grooming", "Mini Grooming", "Only Haircut", "Only Bath"];
  
  const filteredPackages = serviceLocation === "Home" 
    ? packages.filter(p => homePackageNames.includes(p.name))
    : packages;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const isDisabled =
    !name || !phone || !isValidEmail || !petName || !petBreed || !petAge ||
    !friendlyHuman || !friendlyPets || !serviceLocation || !style ||
    !mattingApproval || !consentA || !consentB || !date || !slot ||
    (serviceLocation === "Home" && (!house || !street)) || isSubmitting;

  const handleBaseServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pkgName = e.target.value;
    const pkg = packages.find((p) => p.name === pkgName);
    
    if (pkg) {
      const prevBase = items.find(item => item.category === "Base Service");
      if (prevBase) removeItem(prevBase.id);

      setBaseService(pkg.name);
      addItem({ 
        id: `base-${pkg.name.replace(/\s+/g, '-').toLowerCase()}`, 
        name: pkg.name, 
        price: pkg.price, 
        category: "Base Service" 
      });
    } else {
      setBaseService("");
    }
  };

  async function submitBooking() {
    setIsSubmitting(true);
    try {
      const payload = {
        name, phone, email,
        serviceLocation,
        shopAddress: serviceLocation === "Store" ? SHOP_LOCATION_TEXT : null,
        address: serviceLocation === "Home" ? { house, street } : null,
        petDetails: { petName, petBreed, petAge, petAllergy },
        behavior: { friendlyHuman, friendlyPets },
        styling: { style, mattingApproval },
        booking: { items, total, date, slot }
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
      alert("❌ Error submitting booking. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen py-24 bg-[#f6efe6] relative overflow-hidden font-sans">
      
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
          
          <h1 className="text-4xl font-serif text-[#5b3a26] text-center mb-2">Book Your Session</h1>
          <p className="text-center text-[#7a5741] mb-10">Choose where your pet gets pampered</p>

          <div className="flex p-1 bg-[#eadfce]/30 rounded-2xl mb-10 max-w-sm mx-auto">
            <button type="button" onClick={() => setServiceLocation("Home")} className={`flex-1 py-3 rounded-xl font-bold transition-all ${serviceLocation === 'Home' ? 'bg-[#5b3a26] text-white shadow-lg' : 'text-[#7a5741]'}`}>🏠 At Home</button>
            <button type="button" onClick={() => setServiceLocation("Store")} className={`flex-1 py-3 rounded-xl font-bold transition-all ${serviceLocation === 'Store' ? 'bg-[#5b3a26] text-white shadow-lg' : 'text-[#7a5741]'}`}>🏪 At Store</button>
          </div>

          {serviceLocation === "Store" && (
            <div className="p-6 bg-white rounded-3xl border-2 border-[#5b3a26]/10 mb-8 animate-in fade-in slide-in-from-top-4">
              <h3 className="font-bold text-[#5b3a26] mb-1">📍 Our Premium Spa Location</h3>
              <p className="text-sm text-[#7a5741] mb-4 whitespace-pre-line">{SHOP_LOCATION_TEXT}</p>
              <a href={SHOP_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#5b3a26] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#4a2f1f] transition-all">View on Google Maps ↗</a>
            </div>
          )}

          <div className="grid gap-8">
            {/* Parent Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#5b3a26] border-l-4 border-[#5b3a26] pl-3">Parent Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input-field" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
                <input className="input-field" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
                <input type="email" className="input-field md:col-span-2" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                {serviceLocation === "Home" && (
                  <>
                    <input className="input-field" placeholder="House/Flat No." value={house} onChange={(e)=>setHouse(e.target.value)} />
                    <input className="input-field" placeholder="Street/Area" value={street} onChange={(e)=>setStreet(e.target.value)} />
                  </>
                )}
              </div>
            </div>

            {/* Pet Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#5b3a26] border-l-4 border-[#5b3a26] pl-3">Pet Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input className="input-field" placeholder="Pet Name" value={petName} onChange={(e)=>setPetName(e.target.value)} />
                <input className="input-field" placeholder="Breed" value={petBreed} onChange={(e)=>setPetBreed(e.target.value)} />
                <input className="input-field" placeholder="Age" value={petAge} onChange={(e)=>setPetAge(e.target.value)} />
              </div>
            </div>

            {/* Select Service */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-[#5b3a26] border-l-4 border-[#5b3a26] pl-3">Select Service</h2>
                <Link href="/services" className="text-sm font-bold text-[#5b3a26] hover:underline flex items-center gap-1">
                  ➕ Add More Services
                </Link>
              </div>
              <select
                className="w-full p-4 rounded-2xl border border-[#eadfce] bg-white outline-none"
                onChange={handleBaseServiceChange}
                value={baseService}
              >
                <option value="">Choose a base package...</option>
                {filteredPackages.map((pkg, i) => (
                  <option key={i} value={pkg.name}>{pkg.name} — ₹{pkg.price}</option>
                ))}
              </select>

              {baseService && serviceLocation === "Store" && (
                <div className="mt-4 p-6 bg-[#fdfaf6] rounded-3xl border border-[#eadfce]">
                  <p className="font-bold text-[#5b3a26] mb-4 text-sm uppercase">Add-ons for {baseService}:</p>
                  <AddOnSelector onToggle={() => {}} />
                </div>
              )}
            </div>

            {/* Grooming Style */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#5b3a26] border-l-4 border-[#5b3a26] pl-3">Grooming Style</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Puppy Cut", "Teddy Cut", "Breed Cut", "Summer Cut", "Full Trim", "Scissor Only"].map((opt) => (
                  <button key={opt} type="button" onClick={() => setStyle(opt)} className={`p-3 rounded-xl border text-sm transition-all ${style === opt ? 'bg-[#5b3a26] text-white border-[#5b3a26]' : 'bg-white text-[#7a5741] border-[#eadfce]'}`}>{opt}</button>
                ))}
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#eadfce] space-y-3">
                <p className="text-sm font-bold text-[#5b3a26]">Matting Approval:</p>
                <label className="flex items-center gap-2 text-sm text-[#7a5741] cursor-pointer"><input type="radio" name="mat" value="Approve Removal" checked={mattingApproval === "Approve Removal"} onChange={(e)=>setMattingApproval(e.target.value)} /> I approve removal of heavy matting</label>
                <label className="flex items-center gap-2 text-sm text-[#7a5741] cursor-pointer"><input type="radio" name="mat" value="Limited Results" checked={mattingApproval === "Limited Results"} onChange={(e)=>setMattingApproval(e.target.value)} /> I accept limited results</label>
              </div>
            </div>

            {/* Behavior & Consent */}
            <div className="p-4 bg-[#eadfce]/20 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-[#5b3a26] mb-2">Additional Info & Consent:</p>
                <input className="input-field mb-2" placeholder="Friendly with humans? (Yes/No)" value={friendlyHuman} onChange={(e)=>setFriendlyHuman(e.target.value)} />
                <input className="input-field mb-2" placeholder="Friendly with pets? (Yes/No)" value={friendlyPets} onChange={(e)=>setFriendlyPets(e.target.value)} />
                <label className="flex items-start gap-3 text-sm text-[#7a5741] cursor-pointer"><input type="checkbox" className="mt-1" checked={consentA} onChange={(e)=>setConsentA(e.target.checked)} /> Vaccination is up to date.</label>
                <label className="flex items-start gap-3 text-sm text-[#7a5741] cursor-pointer"><input type="checkbox" className="mt-1" checked={consentB} onChange={(e)=>setConsentB(e.target.checked)} /> I agree to the T&C.</label>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-bold text-[#5b3a26] text-sm">Preferred Date</p>
                <input type="date" className="w-full p-4 rounded-2xl border border-[#eadfce]" value={date} onChange={(e) => handleDateChange(e.target.value)} />
                {dateError && <p className="text-red-500 text-xs">{dateError}</p>}
              </div>
              <div className="space-y-2">
                <p className="font-bold text-[#5b3a26] text-sm">Select Slot</p>
                <SlotPicker selected={slot} onSelect={setSlot} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-[#eadfce] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-[#7a5741] font-bold uppercase tracking-widest">Grand Total</p>
              <p className="text-4xl font-bold text-[#5b3a26]">₹{total}</p>
            </div>
            <button disabled={isDisabled} onClick={submitBooking} className="w-full md:w-auto bg-[#5b3a26] text-white px-16 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-[#4a2f1f] disabled:opacity-30 transition-all active:scale-95">
              {isSubmitting ? "Confirming..." : "Book Session Now"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-field { width: 100%; padding: 1rem; border-radius: 1rem; border: 1px solid #eadfce; background: white; outline: none; transition: border 0.2s; }
        .input-field:focus { border-color: #5b3a26; }
      `}</style>
    </section>
  );
}