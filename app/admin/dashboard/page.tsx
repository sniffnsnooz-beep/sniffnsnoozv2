"use client";
import { useEffect, useState, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { X, Eye } from "lucide-react";

export default function AdminDashboard() {
  // --- Bookings State ---
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // --- News State ---
  const [newsList, setNewsList] = useState<any[]>([]); // 🆕 Added for news list
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    image: "",
    video: "",
    category: "Pet Care",
  });

  // --- Fetch Data Logic (Bookings + News) ---
  const fetchData = useCallback(async () => {
    try {
      // 1. Fetch Bookings
      const res = await fetch("/api/admin/bookings", {
        method: "GET",
        cache: 'no-store' 
      });

      if (!res.ok) {
        if (res.status === 401) {
          window.location.replace("/admin");
          return;
        }
        // Don't throw — just log and show empty state
        console.warn(`Bookings fetch failed: HTTP ${res.status}`);
        setBookings([]);
      } else {
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      }

      // 2. Fetch News Articles
      const resNews = await fetch("/api/admin/news", { cache: 'no-store' });
      if (resNews.ok) {
        const newsDataJson = await resNews.json();
        setNewsList(Array.isArray(newsDataJson) ? newsDataJson : []);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
      // Don't crash — show empty state
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        fetchData(); 
        alert("Status updated!");
      } else {
        alert("Update failed!");
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  // --- 🆕 Delete News Logic ---
  const deleteNews = async (id: string) => {
    if (!confirm("Bhai, pakka article delete karna hai? 🗑️")) return;
    try {
      const res = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        alert("Article Deleted! ✅");
        fetchData(); 
      }
    } catch (error) {
      console.error("News Delete Error:", error);
    }
  };

  // --- News Submit Logic ---
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsData.image && !newsData.video) {
        alert("Bhai, pehle photo ya video upload hone do! ✅");
        return;
    }
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });

      if (res.ok) {
        alert("News Posted Successfully! 🐾");
        setNewsData({ title: "", content: "", image: "", video: "", category: "Pet Care" });
        fetchData(); // 🆕 Refresh list after post
      } else {
        const errorData = await res.json();
        alert("Error: " + (errorData.message || "Failed to post news."));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const handleLogout = () => {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/admin");
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.total) || 0), 0);

  const filteredBookings = bookings.filter((b) => 
    b.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.user?.phone?.includes(searchTerm)
  );

  if (loading) return <div className="p-10 text-center font-bold text-[#5b3a26]">Initializing Admin Suite...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#5b3a26]">Master Admin Panel 🐾</h1>
          <p className="text-green-600 text-[10px] font-black animate-pulse uppercase tracking-tighter">● Live Sync Active</p>
        </div>
        <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-red-700 transition">
          Logout 🚪
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#5b3a26] p-8 rounded-3xl shadow-2xl text-white">
          <p className="text-xs opacity-70 uppercase font-bold">Total Revenue</p>
          <h2 className="text-5xl font-black">₹{totalRevenue}</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100">
          <p className="text-xs text-gray-400 uppercase font-bold">Live Bookings</p>
          <h2 className="text-5xl font-black text-[#5b3a26]">{bookings.length}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: BOOKINGS TABLE + 🆕 NEWS LIST */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. SEARCH & BOOKINGS TABLE (UNCHANGED) */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-orange-200 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#5b3a26] text-white text-xs uppercase">
                    <tr>
                      <th className="p-5">Customer</th>
                      <th className="p-5">Pet Name</th>
                      <th className="p-5">Contact</th>
                      <th className="p-5">Amount</th>
                      <th className="p-5">Status</th>
                      <th className="p-5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredBookings.length === 0 ? (
                      <tr><td colSpan={6} className="p-20 text-center text-gray-400 font-medium italic">No bookings found...</td></tr>
                    ) : filteredBookings.map((b) => (
                      <tr key={b._id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors">
                        <td className="p-5 font-bold text-gray-800">{b.user?.name || "Unknown"}</td>
                        <td className="p-5 text-orange-700 font-medium">{b.pet?.petName || "N/A"}</td>
                        <td className="p-5 text-gray-500">{b.user?.phone || "N/A"}</td>
                        <td className="p-5 font-black">₹{b.total}</td>
                        <td className="p-5">
                          <select 
                            value={b.status || "Pending"}
                            onChange={(e) => updateStatus(b._id, e.target.value)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold outline-none border ${
                              b.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-5 flex items-center gap-3">
                          <button onClick={() => setSelectedBooking(b)} className="text-[#5b3a26] hover:text-orange-600 bg-orange-100 p-2 rounded-full transition-all" title="View Details">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => deleteBooking(b._id)} className="text-red-400 hover:text-red-600 p-2" title="Delete Booking">🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 🆕 2. NEWS MANAGE TABLE */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
             <div className="p-6 bg-orange-50 border-b">
                <h2 className="text-xl font-bold text-[#5b3a26]">Manage News Articles 📰</h2>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-5">Title</th>
                      <th className="p-5">Category</th>
                      <th className="p-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsList.length === 0 ? (
                      <tr><td colSpan={3} className="p-10 text-center text-gray-300">No articles published yet.</td></tr>
                    ) : newsList.map((news) => (
                      <tr key={news._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-5 font-bold text-gray-700">{news.title}</td>
                        <td className="p-5"><span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">{news.category}</span></td>
                        <td className="p-5 text-right">
                          <button 
                            onClick={() => deleteNews(news._id)}
                            className="text-red-500 font-bold hover:underline"
                          >
                            Delete Article 🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* RIGHT: NEWS FORM (UNCHANGED) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-8">
            <h2 className="text-2xl font-bold text-[#5b3a26] mb-6 flex items-center gap-2">Post News 📰</h2>
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="News Title"
                className="w-full p-3 border rounded-xl bg-gray-50 text-sm"
                onChange={(e) => setNewsData({...newsData, title: e.target.value})}
                value={newsData.title}
                required
              />
              <textarea 
                placeholder="Content..."
                className="w-full p-3 border rounded-xl bg-gray-50 h-32 text-sm"
                onChange={(e) => setNewsData({...newsData, content: e.target.value})}
                value={newsData.content}
                required
              />
              
              <div className="flex flex-col gap-3">
                <CldUploadWidget 
                  uploadPreset="sniff_preset" 
                  options={{
                    cloudName: "dfwpzolir", 
                    sources: ["local", "url", "camera"],
                    resourceType: "auto",
                  }}
                  onSuccess={(result: any) => {
                    if (result.event === "success") {
                      const url = result.info.secure_url;
                      if (result.info.resource_type === "video") {
                        setNewsData((prev) => ({ ...prev, video: url, image: "" }));
                      } else {
                        setNewsData((prev) => ({ ...prev, image: url, video: "" }));
                      }
                    }
                  }}
                >
                  {({ open }) => (
                    <button 
                      type="button" 
                      onClick={() => open()} 
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all border ${
                        (newsData.image || newsData.video) ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'
                      }`}
                    >
                      {(newsData.image || newsData.video) ? "Media Uploaded ✅" : "Step 1: Upload Photo / Video 📸🎥"}
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <button 
                type="submit"
                disabled={!newsData.image && !newsData.video}
                className={`w-full py-4 rounded-xl font-bold text-lg mt-4 shadow-md transition ${
                  (!newsData.image && !newsData.video) ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#5b3a26] text-white hover:bg-orange-900'
                }`}
              >
                Step 2: Publish News 🚀
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* BOOKING DETAILS MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setSelectedBooking(null)} 
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
            >
              <X size={20} className="text-gray-600" />
            </button>
            
            <div className="p-8">
              <h2 className="text-3xl font-black text-[#5b3a26] mb-6 border-b pb-4">Booking Details 🐾</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                    <h3 className="text-sm font-bold text-orange-800 uppercase tracking-wider mb-3 flex items-center gap-2">🐶 Pet Profile</h3>
                    <p className="text-gray-700"><b>Name:</b> {selectedBooking.pet?.petName || "N/A"}</p>
                    <p className="text-gray-700"><b>Breed:</b> {selectedBooking.pet?.breed || "N/A"}</p>
                    <p className="text-gray-700"><b>Age:</b> {selectedBooking.pet?.age || "N/A"}</p>
                    <p className="text-gray-700"><b>Allergies:</b> {selectedBooking.pet?.allergies || "None"}</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">👤 Parent Details</h3>
                    <p className="text-gray-700"><b>Name:</b> {selectedBooking.user?.name || "N/A"}</p>
                    <p className="text-gray-700"><b>Phone:</b> {selectedBooking.user?.phone || "N/A"}</p>
                    <p className="text-gray-700"><b>Email:</b> {selectedBooking.user?.email || "N/A"}</p>
                  </div>
                  
                  <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                    <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-3 flex items-center gap-2">📍 Location & Time</h3>
                    <p className="text-gray-700"><b>Date:</b> {selectedBooking.date}</p>
                    <p className="text-gray-700"><b>Slot:</b> {selectedBooking.slot}</p>
                    <p className="text-gray-700 mt-2"><b>Address:</b> {selectedBooking.user?.address || "N/A"}</p>
                    {selectedBooking.user?.location?.lat && (
                      <a 
                        href={`https://www.google.com/maps?q=${selectedBooking.user.location.lat},${selectedBooking.user.location.lng}`}
                        target="_blank" rel="noreferrer"
                        className="inline-block mt-2 text-sm text-blue-600 hover:underline font-bold"
                      >
                        📍 View on Maps
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                    <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center gap-2">🧾 Selected Services</h3>
                    {selectedBooking.services && selectedBooking.services.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedBooking.services.map((srv: any, i: number) => (
                          <li key={i} className="flex justify-between items-center text-sm border-b border-blue-100/50 pb-2 last:border-0 last:pb-0">
                            <span className="font-medium text-gray-800">{srv.name}</span>
                            <span className="font-bold text-blue-900">₹{srv.price}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No services listed.</p>
                    )}
                    <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between items-center">
                      <span className="font-black text-gray-800 uppercase tracking-wider">Total</span>
                      <span className="text-2xl font-black text-[#5b3a26]">₹{selectedBooking.total}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <p className="text-sm text-gray-600">
                      <b>Consent Accepted:</b> {selectedBooking.consentAccepted ? "✅ Yes" : "❌ No"}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      <b>Booked On:</b> {new Date(selectedBooking.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}