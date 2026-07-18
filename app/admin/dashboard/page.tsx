"use client";
import { useEffect, useState, useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { X, Eye, Pencil, Trash, FileSpreadsheet, Plus, Settings, Shield, Award, Users, BarChart3, Star } from "lucide-react";
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { createPortal } from "react-dom";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ─── Types ─────────────────────────────────────────────────────────────────
interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image: string;
  video: string;
  category: string;
  slug: string;
}

interface Companion {
  _id: string;
  breedName: string;
  slug: string;
  category: string;
  age: string;
  gender: string;
  location: string;
  temperament: string;
  description: string;
  images: string[];
  videos: string[];
  featuredBadge: boolean;
  status: string;
}

interface CompanionLead {
  _id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  preferredBreed: string;
  budget: string;
  apartmentOrHouse: string;
  previousPetExperience: string;
  familyMembers: string;
  message: string;
  status: string;
  createdAt: string;
}

interface InsuranceLead {
  _id: string;
  petType: string;
  breed: string;
  age: string;
  ownerName: string;
  phone: string;
  city: string;
  status: string;
  createdAt: string;
}

interface GalleryMedia {
  _id: string;
  title: string;
  url: string;
  mediaType: "image" | "video";
  category: string;
  tags: string[];
  featured: boolean;
  visible: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"bookings-news" | "companions" | "insurance" | "gallery" | "analytics">("bookings-news");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // --- Bookings State ---
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // --- News State ---
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
    image: "",
    video: "",
    category: "Pet Care",
  });
  const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    image: "",
    video: "",
    category: "Pet Care",
  });
  const [editSaving, setEditSaving] = useState(false);

  // --- Companions State ---
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [companionLeads, setCompanionLeads] = useState<CompanionLead[]>([]);
  const [companionData, setCompanionData] = useState({
    breedName: "",
    category: "Puppy",
    age: "",
    gender: "Male",
    location: "",
    temperament: "",
    description: "",
    images: [] as string[],
    videos: [] as string[],
    featuredBadge: false,
  });
  const [editingCompanion, setEditingCompanion] = useState<Companion | null>(null);

  // --- Insurance Leads State ---
  const [insuranceLeads, setInsuranceLeads] = useState<InsuranceLead[]>([]);

  // --- Gallery State ---
  const [galleryList, setGalleryList] = useState<GalleryMedia[]>([]);
  const [galleryData, setGalleryData] = useState({
    title: "",
    url: "",
    mediaType: "image" as "image" | "video",
    category: "Grooming",
    tags: "",
    featured: false,
    visible: true,
  });
  const [editingGallery, setEditingGallery] = useState<GalleryMedia | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Fetch Data Logic (Dynamic Tabbed Fetching) ---
  const fetchData = useCallback(async () => {
    try {
      // Always fetch Bookings & News as core metrics
      const res = await fetch("/api/admin/bookings", { method: "GET", cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      }

      const resNews = await fetch("/api/admin/news", { cache: "no-store" });
      if (resNews.ok) {
        const newsDataJson = await resNews.json();
        setNewsList(Array.isArray(newsDataJson) ? newsDataJson : []);
      }

      // Fetch Companions & Leads
      const resComp = await fetch("/api/admin/companions", { cache: "no-store" });
      if (resComp.ok) {
        const compData = await resComp.json();
        setCompanions(Array.isArray(compData) ? compData : []);
      }

      const resCompLeads = await fetch("/api/admin/companion-leads", { cache: "no-store" });
      if (resCompLeads.ok) {
        const compLeads = await resCompLeads.json();
        setCompanionLeads(Array.isArray(compLeads) ? compLeads : []);
      }

      // Fetch Insurance Leads
      const resInsLeads = await fetch("/api/admin/insurance-leads", { cache: "no-store" });
      if (resInsLeads.ok) {
        const insLeads = await resInsLeads.json();
        setInsuranceLeads(Array.isArray(insLeads) ? insLeads : []);
      }

      // Fetch Gallery List
      const resGal = await fetch("/api/admin/gallery", { cache: "no-store" });
      if (resGal.ok) {
        const galData = await resGal.json();
        setGalleryList(Array.isArray(galData) ? galData : []);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // --- Auth & Logout ---
  const handleLogout = () => {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/admin");
  };

  // --- Booking Operations ---
  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) { fetchData(); alert("Booking status updated!"); }
    } catch (error) { console.error(error); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete booking permanently?")) return;
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (error) { console.error(error); }
  };

  // --- News Operations ---
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsData.image && !newsData.video) {
      alert("Pehle photo ya video upload hone do! ✅");
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
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const deleteNews = async (id: string) => {
    if (!confirm("Pakka article delete karna hai? 🗑️")) return;
    try {
      const res = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) { alert("Article Deleted! ✅"); fetchData(); }
    } catch (error) { console.error(error); }
  };

  const openEditModal = (news: NewsItem) => {
    setEditingArticle(news);
    setEditData({
      title: news.title,
      content: news.content,
      image: news.image || "",
      video: news.video || "",
      category: news.category || "Pet Care",
    });
  };

  const handleEditSave = async () => {
    if (!editingArticle) return;
    setEditSaving(true);
    try {
      const res = await fetch("/api/admin/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingArticle._id, ...editData }),
      });
      if (res.ok) {
        alert("Article updated! ✅");
        setEditingArticle(null);
        fetchData();
      }
    } catch (e) { console.error(e); }
    finally { setEditSaving(false); }
  };

  // --- Companion Operations ---
  const handleCompanionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/companions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companionData),
      });
      if (res.ok) {
        alert("Companion listing created successfully! 🐾");
        setCompanionData({
          breedName: "", category: "Puppy", age: "", gender: "Male",
          location: "", temperament: "", description: "", images: [], videos: [], featuredBadge: false
        });
        fetchData();
      }
    } catch (e) { console.error(e); }
  };

  const updateCompanionStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/companions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  const deleteCompanion = async (id: string) => {
    if (!confirm("Are you sure you want to delete this companion?")) return;
    try {
      const res = await fetch("/api/admin/companions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  const updateCompanionLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/companion-leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  const deleteCompanionLead = async (id: string) => {
    if (!confirm("Delete lead permanently?")) return;
    try {
      const res = await fetch("/api/admin/companion-leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  // --- Insurance Operations ---
  const updateInsuranceStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/insurance-leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  const deleteInsuranceLead = async (id: string) => {
    if (!confirm("Delete insurance lead?")) return;
    try {
      const res = await fetch("/api/admin/insurance-leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  // --- Gallery Operations ---
  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryData.url) {
      alert("Media upload is required!");
      return;
    }
    const tagsArr = galleryData.tags.split(",").map(t => t.trim()).filter(Boolean);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...galleryData, tags: tagsArr }),
      });
      if (res.ok) {
        alert("Gallery media published! 📸");
        setGalleryData({ title: "", url: "", mediaType: "image", category: "Grooming", tags: "", featured: false, visible: true });
        fetchData();
      }
    } catch (e) { console.error(e); }
  };

  const toggleGalleryVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, visible: !currentVisible }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media?")) return;
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchData();
    } catch (e) { console.error(e); }
  };

  // --- CSV Export Helper ---
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return alert("Export details not found.");
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row =>
      Object.values(row)
        .map(val => `"${String(val).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.total) || 0), 0);
  const filteredBookings = bookings.filter(
    (b) =>
      b.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.user?.phone?.includes(searchTerm)
  );

  if (loading) return <div className="p-10 text-center font-bold text-[#5b3a26]">Initializing Admin Suite...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-[#5b3a26]">Master Admin Panel 🐾</h1>
          <p className="text-green-600 text-[10px] font-black animate-pulse uppercase tracking-widest mt-1">● Live Sync Active</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition">
            Logout 🚪
          </button>
        </div>
      </div>

      {/* SYSTEM TABS */}
      <div className="flex gap-2 overflow-x-auto mb-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
        {[
          { id: "bookings-news", label: "Bookings & Blog 📰", icon: "✂️" },
          { id: "companions", label: "Companion CMS 🐩", icon: "🐾" },
          { id: "insurance", label: "Insurance Leads 🛡️", icon: "🛡️" },
          { id: "gallery", label: "Gallery CMS 📸", icon: "📷" },
          { id: "analytics", label: "Analytics 📈", icon: "📊" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition duration-200 ${
              activeTab === tab.id
                ? "bg-[#5b3a26] text-white shadow-md"
                : "text-[#5b3a26] hover:bg-[#f6efe6]/60"
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* ────────────────── 1. BOOKINGS & NEWS TAB ────────────────── */}
      {activeTab === "bookings-news" && (
        <>
          {/* CORE STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#5b3a26] p-8 rounded-3xl shadow-xl text-white">
              <p className="text-xs opacity-70 uppercase font-bold tracking-widest">Total Grooming Revenue</p>
              <h2 className="text-5xl font-black mt-2">₹{totalRevenue}</h2>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Grooming Bookings</p>
              <h2 className="text-5xl font-black text-[#5b3a26] mt-2">{bookings.length}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-orange-200 transition-all text-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#5b3a26] text-white text-xs uppercase font-bold">
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
                          <tr key={b._id} className="border-b border-gray-100 hover:bg-orange-50/20 transition-colors">
                            <td className="p-5 font-bold text-gray-800">{b.user?.name || "Unknown"}</td>
                            <td className="p-5 text-orange-700 font-semibold">{b.pet?.petName || "N/A"}</td>
                            <td className="p-5 text-gray-500">{b.user?.phone || "N/A"}</td>
                            <td className="p-5 font-black">₹{b.total}</td>
                            <td className="p-5">
                              <select
                                value={b.status || "Pending"}
                                onChange={(e) => updateBookingStatus(b._id, e.target.value)}
                                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold outline-none border cursor-pointer ${b.status === "Completed" ? "bg-green-50 text-green-700 border-green-200" : "bg-orange-50 text-orange-700 border-orange-200"}`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-5 flex items-center gap-3">
                              <button onClick={() => setSelectedBooking(b)} className="text-[#5b3a26] hover:text-orange-600 bg-orange-100 p-2 rounded-full transition-all" title="View Details">
                                <Eye size={15} />
                              </button>
                              <button onClick={() => deleteBooking(b._id)} className="text-red-400 hover:text-red-600 p-2" title="Delete Booking"><Trash size={15} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Manage Blog articles */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 bg-orange-50/50 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-[#5b3a26]">Manage Blog Articles 📰</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-5">Media</th>
                        <th className="p-5">Title</th>
                        <th className="p-5">Category</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsList.length === 0 ? (
                        <tr><td colSpan={4} className="p-10 text-center text-gray-300">No articles published yet.</td></tr>
                      ) : newsList.map((news) => (
                        <tr key={news._id} className="border-b hover:bg-gray-50 transition">
                          <td className="p-5">
                            {news.video ? (
                              <div className="w-16 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-lg">🎥</div>
                            ) : news.image ? (
                              <img src={news.image} alt={news.title} className="w-16 h-12 object-cover rounded-lg border border-gray-100" />
                            ) : (
                              <div className="w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">📷</div>
                            )}
                          </td>
                          <td className="p-5 font-bold text-gray-700 max-w-xs truncate">{news.title}</td>
                          <td className="p-5"><span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">{news.category}</span></td>
                          <td className="p-5 text-right flex items-center justify-end gap-3">
                            <button onClick={() => openEditModal(news)} className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-lg text-xs transition">
                              <Pencil size={11} /> Edit ✏️
                            </button>
                            <button onClick={() => deleteNews(news._id)} className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-lg text-xs transition">
                              <Trash size={11} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Post Blog form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 sticky top-8">
                <h2 className="text-xl font-bold text-[#5b3a26] mb-6 flex items-center gap-2">Post New Article 📰</h2>
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="News Title"
                    className="w-full p-3 border rounded-xl bg-gray-50 text-sm outline-none"
                    onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                    value={newsData.title}
                    required
                  />
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                    <ReactQuill 
                      theme="snow" 
                      value={newsData.content} 
                      onChange={(val) => setNewsData({ ...newsData, content: val })}
                      className="h-32 mb-10"
                    />
                  </div>
                  <select
                    className="w-full p-3 border rounded-xl bg-gray-50 text-sm outline-none text-[#5b3a26] font-semibold"
                    value={newsData.category}
                    onChange={(e) => setNewsData({ ...newsData, category: e.target.value })}
                  >
                    <option>Pet Care</option>
                    <option>Grooming Tips</option>
                    <option>News</option>
                    <option>Product Reviews</option>
                    <option>Sniffnsnooz Updates</option>
                  </select>

                  <div className="flex flex-col gap-3">
                    <CldUploadWidget
                      uploadPreset="sniff_preset"
                      options={{ cloudName: "dfwpzolir", sources: ["local", "url", "camera"], resourceType: "auto" }}
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
                          className={`w-full py-3 rounded-xl font-bold text-xs transition-all border ${(newsData.image || newsData.video) ? "bg-green-100 text-green-700 border-green-200" : "bg-orange-100 text-orange-700 border-orange-200"}`}
                        >
                          {(newsData.image || newsData.video) ? "Media Uploaded ✅ (Click to change)" : "Upload Photo / Video 📸🎥"}
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>

                  {(newsData.image || newsData.video) && (
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                      {newsData.video ? (
                        <video src={newsData.video} className="w-full h-40 object-cover" muted />
                      ) : (
                        <img src={newsData.image} alt="preview" className="w-full h-40 object-cover" />
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!newsData.image && !newsData.video}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm mt-4 shadow-md transition ${(!newsData.image && !newsData.video) ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-[#5b3a26] text-white hover:bg-orange-950"}`}
                  >
                    Publish Article 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ────────────────── 2. COMPANIONS CMS TAB ────────────────── */}
      {activeTab === "companions" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left list and Leads */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Breeds Listing */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-[#fcf9f5] border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#5b3a26]">Active Companion Breeds 🐩</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-5">Photo</th>
                      <th className="p-5">Breed Name</th>
                      <th className="p-5">Category</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companions.length === 0 ? (
                      <tr><td colSpan={5} className="p-10 text-center text-gray-300">No breed profiles created.</td></tr>
                    ) : companions.map((comp) => (
                      <tr key={comp._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-5">
                          {comp.images && comp.images.length > 0 ? (
                            <img src={comp.images[0]} alt={comp.breedName} className="w-12 h-12 object-cover rounded-lg border" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">🐕</div>
                          )}
                        </td>
                        <td className="p-5 font-bold text-gray-700">{comp.breedName}</td>
                        <td className="p-5"><span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">{comp.category}</span></td>
                        <td className="p-5">
                          <select
                            value={comp.status}
                            onChange={(e) => updateCompanionStatus(comp._id, e.target.value)}
                            className="border rounded px-2 py-1 text-xs outline-none font-bold"
                          >
                            <option value="Available">Available</option>
                            <option value="Adopted">Adopted</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className="p-5 text-right">
                          <button onClick={() => deleteCompanion(comp._id)} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition">
                            <Trash size={11} className="inline mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Companion leads tracking */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-[#fcf9f5] border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#5b3a26]">Companion Inquiries 💌</h2>
                <button
                  onClick={() => exportToCSV(companionLeads, "companion_leads.csv")}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
                >
                  <FileSpreadsheet size={14} /> Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-5">Client</th>
                      <th className="p-5">Breed Requested</th>
                      <th className="p-5">Residence</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companionLeads.length === 0 ? (
                      <tr><td colSpan={5} className="p-10 text-center text-gray-300">No companion inquiries yet.</td></tr>
                    ) : companionLeads.map((lead) => (
                      <tr key={lead._id} className="border-b hover:bg-gray-50 transition text-xs">
                        <td className="p-5">
                          <p className="font-bold text-[#5b3a26]">{lead.name}</p>
                          <p className="text-[10px] text-gray-400">{lead.phone} • {lead.email}</p>
                          <p className="text-[10px] text-gray-400">{lead.city}</p>
                        </td>
                        <td className="p-5">
                          <p className="font-bold">{lead.preferredBreed}</p>
                          <p className="text-[10px] text-orange-600">Budget: {lead.budget || "N/A"}</p>
                        </td>
                        <td className="p-5">
                          <p className="font-medium">{lead.apartmentOrHouse}</p>
                          <p className="text-[10px] text-gray-400">{lead.previousPetExperience}</p>
                        </td>
                        <td className="p-5">
                          <select
                            value={lead.status || "New"}
                            onChange={(e) => updateCompanionLeadStatus(lead._id, e.target.value)}
                            className="border rounded px-2 py-1 text-[10px] outline-none font-bold bg-amber-50"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Follow Up">Follow Up</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="p-5 text-right">
                          <button onClick={() => deleteCompanionLead(lead._id)} className="text-red-500 hover:text-red-700 p-2">
                            <Trash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add Breed Companion Profile Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 sticky top-8">
              <h2 className="text-xl font-bold text-[#5b3a26] mb-6">Add Companion Breed 🐩</h2>
              <form onSubmit={handleCompanionSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Breed Name"
                  required
                  value={companionData.breedName}
                  onChange={(e) => setCompanionData({ ...companionData, breedName: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={companionData.category}
                    onChange={(e) => setCompanionData({ ...companionData, category: e.target.value })}
                    className="p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                  >
                    <option value="Puppy">Puppy</option>
                    <option value="Kitten">Kitten</option>
                    <option value="Adult">Adult</option>
                  </select>
                  <select
                    value={companionData.gender}
                    onChange={(e) => setCompanionData({ ...companionData, gender: e.target.value })}
                    className="p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Age"
                    value={companionData.age}
                    onChange={(e) => setCompanionData({ ...companionData, age: e.target.value })}
                    className="p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={companionData.location}
                    onChange={(e) => setCompanionData({ ...companionData, location: e.target.value })}
                    className="p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Temperament (e.g. Playful)"
                  value={companionData.temperament}
                  onChange={(e) => setCompanionData({ ...companionData, temperament: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                />

                <textarea
                  placeholder="Breed Description..."
                  rows={4}
                  value={companionData.description}
                  onChange={(e) => setCompanionData({ ...companionData, description: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                />

                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    id="featuredComp"
                    checked={companionData.featuredBadge}
                    onChange={(e) => setCompanionData({ ...companionData, featuredBadge: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="featuredComp" className="text-xs font-bold text-[#5b3a26]">Featured Badge</label>
                </div>

                <div className="flex flex-col gap-3">
                  <CldUploadWidget
                    uploadPreset="sniff_preset"
                    options={{ cloudName: "dfwpzolir", sources: ["local", "url"], resourceType: "image" }}
                    onSuccess={(result: any) => {
                      if (result.event === "success") {
                        const url = result.info.secure_url;
                        setCompanionData((prev) => ({ ...prev, images: [...prev.images, url] }));
                        alert("Photo uploaded successfully!");
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full py-3 rounded-xl border border-dashed border-[#5b3a26]/30 text-[#5b3a26] text-xs font-bold hover:bg-[#f6efe6]/40 transition"
                      >
                        Upload Companion Photos ({companionData.images.length}) 📸
                      </button>
                    )}
                  </CldUploadWidget>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5b3a26] hover:bg-orange-950 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition"
                >
                  Create Breed Card 🐾
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── 3. INSURANCE LEADS TAB ────────────────── */}
      {activeTab === "insurance" && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 bg-[#fcf9f5] border-b border-gray-100 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-[#5b3a26]">Pet Insurance Quotes Tracking 🛡️</h2>
              <p className="text-xs text-gray-400 mt-1">Clients requesting coverage calculations and plan consultation</p>
            </div>
            <button
              onClick={() => exportToCSV(insuranceLeads, "insurance_leads.csv")}
              className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
            >
              <FileSpreadsheet size={14} /> Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold font-sans">
                <tr>
                  <th className="p-5">Owner / Contact</th>
                  <th className="p-5">Pet Details</th>
                  <th className="p-5">Location</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {insuranceLeads.length === 0 ? (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-300 font-medium italic">No insurance inquiries yet.</td></tr>
                ) : insuranceLeads.map((lead) => (
                  <tr key={lead._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-5">
                      <p className="font-bold text-[#5b3a26]">{lead.ownerName}</p>
                      <p className="text-xs text-gray-400">{lead.phone}</p>
                    </td>
                    <td className="p-5">
                      <p className="font-semibold text-gray-800">{lead.breed}</p>
                      <p className="text-xs text-gray-400">{lead.petType} • {lead.age}</p>
                    </td>
                    <td className="p-5 font-medium text-gray-600">{lead.city}</td>
                    <td className="p-5">
                      <select
                        value={lead.status || "New"}
                        onChange={(e) => updateInsuranceStatus(lead._id, e.target.value)}
                        className="border rounded px-2.5 py-1.5 text-xs outline-none font-bold bg-blue-50 text-blue-800"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-5 text-right">
                      <button onClick={() => deleteInsuranceLead(lead._id)} className="text-red-500 hover:text-red-700 p-2">
                        <Trash size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ────────────────── 4. GALLERY MANAGEMENT TAB ────────────────── */}
      {activeTab === "gallery" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery Media Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-[#fcf9f5] border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#5b3a26]">Gallery Media List 📸</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-5">Media Preview</th>
                      <th className="p-5">Title</th>
                      <th className="p-5">Category</th>
                      <th className="p-5">Visibility</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleryList.length === 0 ? (
                      <tr><td colSpan={5} className="p-10 text-center text-gray-300">No media items in database.</td></tr>
                    ) : galleryList.map((item) => (
                      <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                        <td className="p-5">
                          {item.mediaType === "video" ? (
                            <div className="w-16 h-12 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">🎥 Vid</div>
                          ) : (
                            <img src={item.url} alt={item.title} className="w-16 h-12 object-cover rounded-lg border border-gray-100" />
                          )}
                        </td>
                        <td className="p-5 font-bold text-gray-700">{item.title}</td>
                        <td className="p-5"><span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">{item.category}</span></td>
                        <td className="p-5">
                          <button
                            onClick={() => toggleGalleryVisibility(item._id, item.visible)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition ${item.visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                          >
                            {item.visible ? "Visible" : "Hidden"}
                          </button>
                        </td>
                        <td className="p-5 text-right">
                          <button onClick={() => deleteGalleryItem(item._id)} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition">
                            <Trash size={11} className="inline mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Add Gallery Media Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 sticky top-8">
              <h2 className="text-xl font-bold text-[#5b3a26] mb-6">Add Gallery Media 📸</h2>
              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Media Title"
                  required
                  value={galleryData.title}
                  onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={galleryData.mediaType}
                    onChange={() => {}} // noop
                    className="p-3 border rounded-xl bg-gray-50 text-xs outline-none font-semibold text-[#5b3a26]"
                    disabled
                  >
                    <option value={galleryData.mediaType}>{galleryData.mediaType.toUpperCase()}</option>
                  </select>
                  <select
                    value={galleryData.category}
                    onChange={(e) => setGalleryData({ ...galleryData, category: e.target.value })}
                    className="p-3 border rounded-xl bg-gray-50 text-xs outline-none font-semibold text-[#5b3a26]"
                  >
                    <option value="Grooming">Grooming</option>
                    <option value="Veterinary">Veterinary</option>
                    <option value="Happy Pets">Happy Pets</option>
                    <option value="Companions">Companions</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Tags (comma-separated, e.g. spa, dog)"
                  value={galleryData.tags}
                  onChange={(e) => setGalleryData({ ...galleryData, tags: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-gray-50 text-xs outline-none"
                />

                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="galFeatured"
                      checked={galleryData.featured}
                      onChange={(e) => setGalleryData({ ...galleryData, featured: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="galFeatured" className="text-xs font-bold text-[#5b3a26]">Featured</label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="galVisible"
                      checked={galleryData.visible}
                      onChange={(e) => setGalleryData({ ...galleryData, visible: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="galVisible" className="text-xs font-bold text-[#5b3a26]">Visible</label>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <CldUploadWidget
                    uploadPreset="sniff_preset"
                    options={{ cloudName: "dfwpzolir", sources: ["local", "url"], resourceType: "auto" }}
                    onSuccess={(result: any) => {
                      if (result.event === "success") {
                        const url = result.info.secure_url;
                        const mType = result.info.resource_type === "video" ? "video" : "image";
                        setGalleryData((prev) => ({ ...prev, url, mediaType: mType }));
                        alert("Media uploaded successfully!");
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className={`w-full py-3 rounded-xl font-bold text-xs transition-all border ${galleryData.url ? "bg-green-100 text-green-700 border-green-200" : "bg-orange-100 text-orange-700 border-orange-200"}`}
                      >
                        {galleryData.url ? "Media Uploaded ✅ (Click to change)" : "Upload Photo / Video 📸🎥"}
                      </button>
                    )}
                  </CldUploadWidget>
                </div>

                {galleryData.url && (
                  <div className="rounded-xl overflow-hidden border border-gray-200">
                    {galleryData.mediaType === "video" ? (
                      <video src={galleryData.url} className="w-full h-40 object-cover" muted />
                    ) : (
                      <img src={galleryData.url} alt="preview" className="w-full h-40 object-cover" />
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!galleryData.url}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition ${!galleryData.url ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#5b3a26] text-white hover:bg-orange-950"}`}
                >
                  Publish to Gallery 📸
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── 5. ANALYTICS DASHBOARD TAB ────────────────── */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-[#5b3a26]/10 text-[#5b3a26] rounded-2xl">
                <Users size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bookings Completed</p>
                <h3 className="text-2xl font-black mt-1">{bookings.filter(b => b.status === "Completed").length}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-orange-100 text-orange-700 rounded-2xl">
                <Award size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Companion Leads</p>
                <h3 className="text-2xl font-black mt-1">{companionLeads.length}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Insurance Leads</p>
                <h3 className="text-2xl font-black mt-1">{insuranceLeads.length}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl">
                <BarChart3 size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Gallery Media</p>
                <h3 className="text-2xl font-black mt-1">{galleryList.length}</h3>
              </div>
            </div>
          </div>

          {/* Lead Funnel status card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-[#5b3a26] mb-6">CRM Inquiry Funnel status</h3>
            <div className="space-y-6 max-w-xl">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                  <span>New Enquiries</span>
                  <span>{companionLeads.filter(l => l.status === "New").length + insuranceLeads.filter(l => l.status === "New").length}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "45%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                  <span>Contacted / Process In-Progress</span>
                  <span>{companionLeads.filter(l => l.status === "Contacted" || l.status === "Follow Up").length + insuranceLeads.filter(l => l.status === "Contacted").length}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "30%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5">
                  <span>Closed / Consultation Completed</span>
                  <span>{companionLeads.filter(l => l.status === "Completed").length + insuranceLeads.filter(l => l.status === "Closed").length}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal Popup (Preserved original popup) */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <button onClick={() => setSelectedBooking(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <h3 className="text-xl font-bold text-[#5b3a26] mb-6">Booking Profile Details</h3>
            <div className="space-y-4 text-sm text-[#7a5741]">
              <p><b>Name:</b> {selectedBooking.user?.name}</p>
              <p><b>Phone:</b> {selectedBooking.user?.phone}</p>
              <p><b>Email:</b> {selectedBooking.user?.email}</p>
              <p><b>Address:</b> {selectedBooking.user?.address}</p>
              <p><b>Date:</b> {selectedBooking.date} ({selectedBooking.slot})</p>
              <p><b>Pet Details:</b> {selectedBooking.pet?.petName} ({selectedBooking.pet?.breed || "N/A"})</p>
              <p><b>Total Amount:</b> ₹{selectedBooking.total}</p>
              <p><b>Status:</b> {selectedBooking.status || "Pending"}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── Portals ─── */}
      {mounted && editingArticle && createPortal(
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-8">
            <button onClick={() => setEditingArticle(null)} className="absolute top-5 right-5 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition z-10">
              <X size={20} className="text-gray-600" />
            </button>
            <h2 className="text-2xl font-black text-[#5b3a26] mb-4">Edit Article ✏️</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-gray-50 text-sm focus:ring-2 ring-orange-200 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Content</label>
                <div className="bg-white rounded-xl overflow-hidden border">
                  <ReactQuill theme="snow" value={editData.content} onChange={(val) => setEditData({ ...editData, content: val })} className="h-48 mb-10" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Category</label>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full p-3 border rounded-xl bg-gray-50 text-sm focus:ring-2 ring-orange-200 outline-none"
                >
                  <option>Pet Care</option>
                  <option>Grooming Tips</option>
                  <option>News</option>
                  <option>Product Reviews</option>
                  <option>Sniffnsnooz Updates</option>
                </select>
              </div>
              <button onClick={handleEditSave} disabled={editSaving} className="w-full bg-[#5b3a26] text-white py-3 rounded-xl font-bold">
                {editSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}