"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/libs/firebase"; 
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function LiveReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return alert("Please fill details");
    setIsSubmitting(true);

    let imageUrl = "";
    if (image) {
      const storageRef = ref(storage, `reviews/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "reviews"), {
      name, comment, rating, imageUrl, date: serverTimestamp()
    });

    setName(""); setComment(""); setImage(null); setIsSubmitting(false);
  };

  return (
    <section className="bg-[#f6efe6] py-12 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif text-[#5b3a26] text-center mb-10 font-bold">Happy Tails & Reviews 🐾</h2>

        {/* FORM SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 border border-[#eadfce]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border p-3 rounded-lg outline-none focus:border-[#5b3a26]" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#f6efe6] file:text-[#5b3a26]" />
            </div>
            <textarea className="w-full border p-3 rounded-lg h-24 outline-none" placeholder="How was the grooming session?" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button disabled={isSubmitting} className="bg-[#5b3a26] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition">
              {isSubmitting ? "Uploading..." : "Share Story"}
            </button>
          </form>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
              {rev.imageUrl && (
                <img src={rev.imageUrl} alt="Pet" className="w-full h-48 object-cover rounded-xl mb-4" />
              )}
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-[#5b3a26]">{rev.name}</h4>
                <div className="text-yellow-500">{"★".repeat(rev.rating)}</div>
              </div>
              <p className="text-sm text-[#7a5741] italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}