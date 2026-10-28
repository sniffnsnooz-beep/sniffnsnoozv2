"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { CldUploadWidget } from "next-cloudinary";
import {
  X,
  Eye,
  Pencil,
  Trash,
  FileSpreadsheet,
  Plus,
  Shield,
  Award,
  Users,
  BarChart3,
  Star,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  LogOut,
  Scissors,
  FileText,
  Image as ImageIcon,
  Video,
  ChevronRight,
  TrendingUp,
  Clock,
  Send,
  Loader2,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";
import nextDynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { createPortal } from "react-dom";

const ReactQuill = nextDynamic(() => import("react-quill-new"), { ssr: false });

// ─── Types ─────────────────────────────────────────────────────────────────
interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image: string;
  video: string;
  category: string;
  slug: string;
  createdAt?: string;
  author?: string;
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
  const [refreshing, setRefreshing] = useState(false);
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
  const [publishing, setPublishing] = useState(false);
  const [newsAlert, setNewsAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [articleSearch, setArticleSearch] = useState("");
  const [articleCategoryFilter, setArticleCategoryFilter] = useState("All");

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    (process.env as any).NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "dfwpzolir";
  }

  // --- Fetch Data Logic ---
  const fetchData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
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

      const resComp = await fetch("/api/admin/companions", { cache: "no-store" });
      if (resComp.ok) {
        const compData = await resComp.json();
        setCompanions(Array.isArray(compData) ? compData : []);
      }

      const resCompLeads = await fetch("/api/admin/companion-leads", { cache: "no-store" });
      if (resCompLeads.status === 401) {
        window.location.replace("/admin");
        return;
      }
      if (resCompLeads.ok) {
        const compLeads = await resCompLeads.json();
        setCompanionLeads(Array.isArray(compLeads) ? compLeads : []);
      }

      const resInsLeads = await fetch("/api/admin/insurance-leads", { cache: "no-store" });
      if (resInsLeads.status === 401) {
        window.location.replace("/admin");
        return;
      }
      if (resInsLeads.ok) {
        const insLeads = await resInsLeads.json();
        setInsuranceLeads(Array.isArray(insLeads) ? insLeads : []);
      }

      const resGal = await fetch("/api/admin/gallery", { cache: "no-store" });
      if (resGal.status === 401) {
        window.location.replace("/admin");
        return;
      }
      if (resGal.ok) {
        const galData = await resGal.json();
        setGalleryList(Array.isArray(galData) ? galData : []);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
      if (isManualRefresh) setTimeout(() => setRefreshing(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(false), 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // --- Auth & Logout ---
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of the admin panel?")) {
      document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.replace("/admin");
    }
  };

  // --- Booking Operations ---
  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
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
    } catch (error) {
      console.error(error);
    }
  };

  // --- News Operations ---
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsAlert(null);

    const title = newsData.title.trim();
    const content = newsData.content.trim();

    if (!title) {
      setNewsAlert({ type: "error", text: "Article title cannot be empty." });
      return;
    }
    if (!content || content === "<p><br></p>") {
      setNewsAlert({ type: "error", text: "Please write some content before publishing." });
      return;
    }
    if (!newsData.image && !newsData.video) {
      setNewsAlert({ type: "error", text: "Please upload an image or video before publishing! 📸" });
      return;
    }

    setPublishing(true);
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          image: newsData.image,
          video: newsData.video,
          category: newsData.category,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        setNewsAlert({ type: "success", text: "Article published successfully! 🚀" });
        setNewsData({ title: "", content: "", image: "", video: "", category: "Pet Care" });
        fetchData();
        setTimeout(() => setNewsAlert(null), 6000);
      } else {
        const errorMsg = data.message || `Server error (${res.status})`;
        setNewsAlert({ type: "error", text: `Publish Failed: ${errorMsg}` });
        alert(`Failed to publish article: ${errorMsg}`);
      }
    } catch (err: any) {
      console.error("News submit error:", err);
      const msg = err.message || "Network error. Please check your connection.";
      setNewsAlert({ type: "error", text: msg });
      alert(`Error publishing article: ${msg}`);
    } finally {
      setPublishing(false);
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this article? 🗑️")) return;
    try {
      const res = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
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
      const data = await res.json();
      if (res.ok && data.success !== false) {
        setEditingArticle(null);
        fetchData();
      } else {
        alert(data.message || "Failed to update article");
      }
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Error updating article");
    } finally {
      setEditSaving(false);
    }
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

  // --- Insurance Lead Operations ---
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
    if (!galleryData.url) return alert("Please upload an image or video first!");
    try {
      const tagsArray = galleryData.tags.split(",").map((t) => t.trim()).filter(Boolean);
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...galleryData, tags: tagsArray }),
      });
      if (res.ok) {
        alert("Media added to gallery!");
        setGalleryData({
          title: "",
          url: "",
          mediaType: "image",
          category: "Grooming",
          tags: "",
          featured: false,
          visible: true,
        });
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
      if (res.ok) {
        setGalleryList((prev) =>
          prev.map((item) => (item._id === id ? { ...item, visible: !currentVisible } : item))
        );
      }
    } catch (e) { console.error(e); }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setGalleryList((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (e) { console.error(e); }
  };

  // --- CSV Export Helper ---
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return alert("No data found to export.");
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) =>
      Object.values(row)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
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
      b.user?.phone?.includes(searchTerm) ||
      b.pet?.petName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(articleSearch.toLowerCase());
      const matchesCategory =
        articleCategoryFilter === "All" || item.category === articleCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [newsList, articleSearch, articleCategoryFilter]);

  // Projected slug preview for post form
  const projectedSlug = useMemo(() => {
    const s = newsData.title
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return s || "your-article-slug";
  }, [newsData.title]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center gap-4 text-[#4A2E1F]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#4A2E1F]/20 border-t-[#E08738] animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center text-xl">🐾</span>
        </div>
        <p className="font-bold text-sm tracking-wide uppercase text-[#7A5741] animate-pulse">
          Loading Sniff &apos;n&apos; Snooz Admin Suite...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800 font-sans pb-16">
      
      {/* ─── LUXURY EXECUTIVE HEADER ─── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3D2314] to-[#6E432B] flex items-center justify-center text-white shadow-md shadow-[#3D2314]/15">
              <span className="text-xl">🐾</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-[#3D2314] tracking-tight">Sniff &apos;n&apos; Snooz</h1>
                <span className="bg-[#E08738]/15 text-[#B85E16] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#E08738]/30">
                  CMS Suite v2.0
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  Live Sync
                </span>
                <span>•</span>
                <span className="text-stone-400 font-medium text-[11px]">Sector 65, Gurugram</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://www.sniffnsnooz.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all"
              title="Open Public Site"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Live Site</span>
            </a>

            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-all disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw size={15} className={refreshing ? "animate-spin text-[#E08738]" : ""} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* ─── SYSTEM NAVIGATION TABS ─── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {[
            { id: "bookings-news", label: "Bookings & Blog", count: `${bookings.length}/${newsList.length}`, icon: Scissors },
            { id: "companions", label: "Companion CMS", count: companions.length, icon: HeartHandshake },
            { id: "insurance", label: "Insurance Leads", count: insuranceLeads.length, icon: ShieldCheck },
            { id: "gallery", label: "Gallery Media", count: galleryList.length, icon: ImageIcon },
            { id: "analytics", label: "Overview & Analytics", count: null, icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2.5 whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? "bg-[#3D2314] text-white border-[#3D2314] shadow-md shadow-[#3D2314]/20"
                    : "bg-white text-stone-600 hover:text-[#3D2314] hover:bg-stone-50 border-stone-200/80 shadow-xs"
                }`}
              >
                <Icon size={15} className={isActive ? "text-[#E08738]" : "text-stone-400 group-hover:text-stone-600"} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ────────────────── 1. BOOKINGS & BLOG TAB ────────────────── */}
        {activeTab === "bookings-news" && (
          <div className="space-y-8">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-[#3D2314] to-[#5C3620] p-5 rounded-3xl text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#F2C49B]">Total Grooming Revenue</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-3xl font-black">₹{totalRevenue.toLocaleString("en-IN")}</h3>
                </div>
                <p className="text-[10px] text-white/60 mt-1 flex items-center gap-1">
                  <TrendingUp size={11} className="text-emerald-400" />
                  <span>Calculated from active orders</span>
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Total Bookings</p>
                  <h3 className="text-3xl font-black text-[#3D2314] mt-2">{bookings.length}</h3>
                </div>
                <div className="flex gap-2 mt-2 text-[10px] font-bold">
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {bookings.filter((b) => b.status === "Completed").length} Done
                  </span>
                  <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    {bookings.filter((b) => b.status === "Pending" || !b.status).length} Pending
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Published Articles</p>
                  <h3 className="text-3xl font-black text-[#3D2314] mt-2">{newsList.length}</h3>
                </div>
                <p className="text-[10px] text-stone-400 mt-2">
                  Across {new Set(newsList.map((n) => n.category)).size || 1} Categories
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-5 rounded-3xl border border-amber-200/60 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Quick Action</p>
                  <Sparkles size={16} className="text-[#E08738]" />
                </div>
                <p className="text-xs text-amber-900 font-semibold mt-1">Publish fresh tips to boost SEO & Pet Owner trust.</p>
                <a
                  href="#post-article-widget"
                  className="mt-3 inline-flex items-center justify-center gap-1.5 bg-[#3D2314] hover:bg-[#5C3620] text-white text-xs font-bold py-2 rounded-xl transition-all shadow-xs"
                >
                  <Plus size={13} />
                  <span>Write New Article</span>
                </a>
              </div>
            </div>

            {/* Main Content Grid: Left Tables + Right Sticky Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* ── LEFT COLUMN: Bookings Table & Articles Table (col-span-7) ── */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. BOOKINGS MANAGEMENT */}
                <div className="bg-white rounded-3xl shadow-xs border border-stone-200/80 overflow-hidden">
                  <div className="p-5 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#E08738] flex items-center justify-center">
                        <Scissors size={16} />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#3D2314]">Customer Grooming Bookings</h2>
                        <p className="text-[11px] text-stone-400">Appointments scheduled by pet parents</p>
                      </div>
                    </div>

                    <div className="relative w-full sm:w-56">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#E08738]/20 focus:border-[#E08738] transition-all"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50/80 text-stone-500 font-bold uppercase tracking-wider text-[10px] border-b border-stone-100">
                        <tr>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Pet Info</th>
                          <th className="py-3 px-4">Total</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-stone-400">
                              <p className="font-medium italic">No matching grooming appointments found.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.slice(0, 10).map((b) => (
                            <tr key={b._id} className="hover:bg-amber-50/30 transition-colors">
                              <td className="py-3.5 px-4">
                                <p className="font-bold text-[#3D2314]">{b.user?.name || "Anonymous"}</p>
                                <p className="text-[10px] text-stone-400">{b.user?.phone || "No phone"}</p>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50">
                                  {b.pet?.petName || "Pet"}
                                </span>
                                <span className="block text-[10px] text-stone-400 mt-0.5">{b.pet?.breed || "Breed N/A"}</span>
                              </td>
                              <td className="py-3.5 px-4 font-black text-stone-800">
                                ₹{Number(b.total || 0).toLocaleString("en-IN")}
                              </td>
                              <td className="py-3.5 px-4">
                                <select
                                  value={b.status || "Pending"}
                                  onChange={(e) => updateBookingStatus(b._id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold outline-none border cursor-pointer ${
                                    b.status === "Completed"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : b.status === "Cancelled"
                                      ? "bg-rose-50 text-rose-700 border-rose-200"
                                      : "bg-amber-50 text-amber-700 border-amber-200"
                                  }`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    onClick={() => setSelectedBooking(b)}
                                    className="p-1.5 text-stone-600 hover:text-[#3D2314] hover:bg-stone-100 rounded-lg transition"
                                    title="View Profile"
                                  >
                                    <Eye size={14} />
                                  </button>
                                  <button
                                    onClick={() => deleteBooking(b._id)}
                                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                    title="Delete Record"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. MANAGE PUBLISHED BLOG ARTICLES */}
                <div className="bg-white rounded-3xl shadow-xs border border-stone-200/80 overflow-hidden">
                  <div className="p-5 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-[#3D2314]">Published Blog Articles</h2>
                        <p className="text-[11px] text-stone-400">Total {newsList.length} articles on www.sniffnsnooz.in</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <select
                        value={articleCategoryFilter}
                        onChange={(e) => setArticleCategoryFilter(e.target.value)}
                        className="py-1.5 px-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 outline-none"
                      >
                        <option value="All">All Categories</option>
                        <option value="Pet Care">Pet Care</option>
                        <option value="Grooming Tips">Grooming Tips</option>
                        <option value="News">News</option>
                        <option value="Product Reviews">Product Reviews</option>
                        <option value="Sniffnsnooz Updates">Sniffnsnooz Updates</option>
                      </select>

                      <div className="relative w-44">
                        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={articleSearch}
                          onChange={(e) => setArticleSearch(e.target.value)}
                          className="w-full pl-8 pr-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {filteredNews.length === 0 ? (
                      <div className="py-12 text-center text-stone-400">
                        <p className="font-medium italic">No articles found matching your filters.</p>
                      </div>
                    ) : (
                      filteredNews.map((news) => (
                        <div key={news._id} className="p-4 sm:p-5 flex items-center gap-4 hover:bg-stone-50/70 transition-colors">
                          <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-2xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 relative">
                            {news.video ? (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-white">
                                <Video size={18} className="text-amber-400" />
                                <span className="text-[9px] font-bold mt-0.5">Video</span>
                              </div>
                            ) : news.image ? (
                              <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <ImageIcon size={18} />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                                {news.category}
                              </span>
                              {news.slug && (
                                <span className="text-[10px] font-mono text-stone-400 truncate max-w-[200px]">
                                  /{news.slug}
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-sm text-[#3D2314] truncate">{news.title}</h3>
                            <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                              {news.content ? news.content.replace(/<[^>]*>?/gm, "") : "No excerpt"}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {news.slug && (
                              <a
                                href={`https://www.sniffnsnooz.in/news/${news.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-stone-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition"
                                title="View Live Article"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                            <button
                              onClick={() => openEditModal(news)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition"
                              title="Edit Article"
                            >
                              <Pencil size={12} />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => deleteNews(news._id)}
                              className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition"
                              title="Delete Article"
                            >
                              <Trash size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: POST NEW ARTICLE FORM (col-span-5) ── */}
              <div className="lg:col-span-5" id="post-article-widget">
                <div className="bg-white rounded-3xl shadow-sm border border-stone-200/90 overflow-hidden sticky top-20">
                  <div className="p-5 bg-gradient-to-r from-stone-900 to-[#3D2314] text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-[#E08738]" />
                        <h2 className="text-base font-black tracking-tight">Post New Article</h2>
                      </div>
                      <span className="text-[10px] font-bold bg-white/10 px-2.5 py-0.5 rounded-full text-stone-200">
                        Blog CMS
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 mt-1">
                      Direct publishing to your high-ranking Pet Lounge & Vet Clinic blog.
                    </p>
                  </div>

                  <form onSubmit={handleNewsSubmit} className="p-5 space-y-4">
                    {/* Status Alert Banner */}
                    {newsAlert && (
                      <div
                        className={`p-3.5 rounded-2xl flex items-start gap-2.5 text-xs font-medium ${
                          newsAlert.type === "success"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {newsAlert.type === "success" ? (
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-bold">{newsAlert.type === "success" ? "Success!" : "Notice"}</p>
                          <p className="text-[11px] mt-0.5">{newsAlert.text}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewsAlert(null)}
                          className="text-stone-400 hover:text-stone-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    {/* Article Title */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Article Headline / Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Best Pet Grooming & Vet Care in Sector 65 Gurgaon"
                        value={newsData.title}
                        onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                        required
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold text-stone-800 outline-none focus:ring-2 focus:ring-[#E08738]/20 focus:border-[#E08738] transition"
                      />
                      {newsData.title && (
                        <p className="text-[10px] text-stone-400 mt-1 font-mono truncate">
                          URL: /news/{projectedSlug}
                        </p>
                      )}
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Category
                      </label>
                      <select
                        value={newsData.category}
                        onChange={(e) => setNewsData({ ...newsData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-[#3D2314] outline-none focus:ring-2 focus:ring-[#E08738]/20 focus:border-[#E08738]"
                      >
                        <option value="Pet Care">Pet Care</option>
                        <option value="Grooming Tips">Grooming Tips</option>
                        <option value="News">News</option>
                        <option value="Product Reviews">Product Reviews</option>
                        <option value="Sniffnsnooz Updates">Sniffnsnooz Updates</option>
                      </select>
                    </div>

                    {/* Quill Rich Text Editor */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Article Content <span className="text-rose-500">*</span>
                      </label>
                      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden focus-within:border-[#E08738] transition">
                        <ReactQuill
                          theme="snow"
                          value={newsData.content}
                          onChange={(val) => setNewsData({ ...newsData, content: val })}
                          placeholder="Write rich, informative pet care advice and styling tips..."
                          className="h-44 mb-10"
                        />
                      </div>
                    </div>

                    {/* Media Upload Container */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Featured Image or Video <span className="text-rose-500">*</span>
                      </label>

                      <CldUploadWidget
                        uploadPreset="sniff_preset"
                        options={{
                          cloudName: "dfwpzolir",
                          sources: ["local", "url", "camera"],
                          resourceType: "auto",
                          clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "mp4", "mov"],
                        }}
                        onSuccess={(result: any) => {
                          if (result?.event === "success" && result?.info?.secure_url) {
                            const url = result.info.secure_url;
                            if (result.info.resource_type === "video") {
                              setNewsData((prev) => ({ ...prev, video: url, image: "" }));
                            } else {
                              setNewsData((prev) => ({ ...prev, image: url, video: "" }));
                            }
                            setNewsAlert({ type: "success", text: "Media uploaded successfully to Cloudinary! ✅" });
                          }
                        }}
                        onError={(err: any) => {
                          console.error("Cloudinary error:", err);
                          setNewsAlert({ type: "error", text: "Failed to upload media to Cloudinary." });
                        }}
                      >
                        {({ open }) => (
                          <button
                            type="button"
                            onClick={() => open()}
                            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border-2 transition-all ${
                              newsData.image || newsData.video
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                                : "bg-stone-50 hover:bg-stone-100 text-stone-700 border-dashed border-stone-300 hover:border-[#3D2314]"
                            }`}
                          >
                            <UploadCloud size={16} className={newsData.image || newsData.video ? "text-emerald-600" : "text-stone-400"} />
                            <span>
                              {newsData.image || newsData.video
                                ? "Media Ready ✅ (Click to change file)"
                                : "Upload Photo or Video via Cloudinary"}
                            </span>
                          </button>
                        )}
                      </CldUploadWidget>

                      {/* Media Preview Box */}
                      {(newsData.image || newsData.video) && (
                        <div className="mt-3 relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 group">
                          {newsData.video ? (
                            <video src={newsData.video} className="w-full h-44 object-cover" controls muted />
                          ) : (
                            <img src={newsData.image} alt="Upload preview" className="w-full h-44 object-cover" />
                          )}
                          <button
                            type="button"
                            onClick={() => setNewsData({ ...newsData, image: "", video: "" })}
                            className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full text-xs transition"
                            title="Remove Media"
                          >
                            <X size={14} />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {newsData.video ? "🎥 Video Preview" : "📸 Image Preview"}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Publish Submit Button */}
                    <button
                      type="submit"
                      disabled={publishing || (!newsData.image && !newsData.video) || !newsData.title.trim()}
                      className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                        publishing || (!newsData.image && !newsData.video) || !newsData.title.trim()
                          ? "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                          : "bg-[#3D2314] hover:bg-[#5C3620] active:scale-[0.99] text-white shadow-[#3D2314]/20"
                      }`}
                    >
                      {publishing ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-[#E08738]" />
                          <span>Publishing Article...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} className="text-[#E08738]" />
                          <span>Publish Article 🚀</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ────────────────── 2. COMPANIONS CMS TAB ────────────────── */}
        {activeTab === "companions" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Active Breeds Listing */}
              <div className="bg-white rounded-3xl shadow-xs border border-stone-200/80 overflow-hidden">
                <div className="p-5 bg-stone-50/70 border-b border-stone-100 flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#3D2314]">Active Companion Breeds 🐩</h2>
                  <span className="text-xs text-stone-400 font-semibold">{companions.length} Profiles</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-100">
                      <tr>
                        <th className="p-4">Photo</th>
                        <th className="p-4">Breed Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {companions.length === 0 ? (
                        <tr><td colSpan={5} className="p-10 text-center text-stone-400">No breed profiles created.</td></tr>
                      ) : (
                        companions.map((comp) => (
                          <tr key={comp._id} className="hover:bg-stone-50 transition">
                            <td className="p-4">
                              {comp.images && comp.images.length > 0 ? (
                                <img src={comp.images[0]} alt={comp.breedName} className="w-12 h-12 object-cover rounded-xl border border-stone-200" />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-lg">🐕</div>
                              )}
                            </td>
                            <td className="p-4 font-bold text-stone-800">{comp.breedName}</td>
                            <td className="p-4">
                              <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                {comp.category}
                              </span>
                            </td>
                            <td className="p-4">
                              <select
                                value={comp.status}
                                onChange={(e) => updateCompanionStatus(comp._id, e.target.value)}
                                className="border rounded-lg px-2 py-1 text-xs outline-none font-bold bg-white"
                              >
                                <option value="Available">Available</option>
                                <option value="Adopted">Adopted</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => deleteCompanion(comp._id)}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-bold transition"
                              >
                                <Trash size={12} className="inline mr-1" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Companion Inquiries Tracking */}
              <div className="bg-white rounded-3xl shadow-xs border border-stone-200/80 overflow-hidden">
                <div className="p-5 bg-stone-50/70 border-b border-stone-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-base font-bold text-[#3D2314]">Companion Inquiries 💌</h2>
                    <p className="text-[11px] text-stone-400">Prospective pet parents seeking companions</p>
                  </div>
                  <button
                    onClick={() => exportToCSV(companionLeads, "companion_leads.csv")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition"
                  >
                    <FileSpreadsheet size={14} /> Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-100">
                      <tr>
                        <th className="p-4">Client</th>
                        <th className="p-4">Breed Requested</th>
                        <th className="p-4">Residence</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {companionLeads.length === 0 ? (
                        <tr><td colSpan={5} className="p-10 text-center text-stone-400">No companion inquiries yet.</td></tr>
                      ) : (
                        companionLeads.map((lead) => (
                          <tr key={lead._id} className="hover:bg-stone-50 transition">
                            <td className="p-4">
                              <p className="font-bold text-[#3D2314]">{lead.name}</p>
                              <p className="text-[10px] text-stone-400">{lead.phone} • {lead.email}</p>
                              <p className="text-[10px] text-stone-400">{lead.city}</p>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-stone-800">{lead.preferredBreed}</p>
                              <p className="text-[10px] text-orange-600 font-semibold">Budget: {lead.budget || "N/A"}</p>
                            </td>
                            <td className="p-4">
                              <p className="font-medium text-stone-700">{lead.apartmentOrHouse}</p>
                              <p className="text-[10px] text-stone-400">{lead.previousPetExperience}</p>
                            </td>
                            <td className="p-4">
                              <select
                                value={lead.status || "New"}
                                onChange={(e) => updateCompanionLeadStatus(lead._id, e.target.value)}
                                className="border rounded-lg px-2 py-1 text-[10px] outline-none font-bold bg-amber-50"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Follow Up">Follow Up</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                              <button onClick={() => deleteCompanionLead(lead._id)} className="text-rose-500 hover:text-rose-700 p-2">
                                <Trash size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Add Companion Breed Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl shadow-xs border border-stone-200/90 sticky top-20">
                <h2 className="text-base font-bold text-[#3D2314] mb-4">Add Companion Breed 🐩</h2>
                <form onSubmit={handleCompanionSubmit} className="space-y-3.5">
                  <input
                    type="text"
                    placeholder="Breed Name"
                    required
                    value={companionData.breedName}
                    onChange={(e) => setCompanionData({ ...companionData, breedName: e.target.value })}
                    className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none focus:border-[#E08738]"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={companionData.category}
                      onChange={(e) => setCompanionData({ ...companionData, category: e.target.value })}
                      className="p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none"
                    >
                      <option value="Puppy">Puppy</option>
                      <option value="Kitten">Kitten</option>
                      <option value="Adult">Adult</option>
                    </select>
                    <select
                      value={companionData.gender}
                      onChange={(e) => setCompanionData({ ...companionData, gender: e.target.value })}
                      className="p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Age"
                      value={companionData.age}
                      onChange={(e) => setCompanionData({ ...companionData, age: e.target.value })}
                      className="p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={companionData.location}
                      onChange={(e) => setCompanionData({ ...companionData, location: e.target.value })}
                      className="p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Temperament (e.g. Playful, Gentle)"
                    value={companionData.temperament}
                    onChange={(e) => setCompanionData({ ...companionData, temperament: e.target.value })}
                    className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none"
                  />

                  <textarea
                    placeholder="Breed Description..."
                    rows={3}
                    value={companionData.description}
                    onChange={(e) => setCompanionData({ ...companionData, description: e.target.value })}
                    className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featuredComp"
                      checked={companionData.featuredBadge}
                      onChange={(e) => setCompanionData({ ...companionData, featuredBadge: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="featuredComp" className="text-xs font-bold text-[#3D2314]">⭐ Featured Breed</label>
                  </div>

                  <CldUploadWidget
                    uploadPreset="sniff_preset"
                    options={{ cloudName: "dfwpzolir", sources: ["local", "url"], resourceType: "image" }}
                    onSuccess={(result: any) => {
                      if (result.event === "success") {
                        const url = result.info.secure_url;
                        setCompanionData((prev) => ({ ...prev, images: [...prev.images, url] }));
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full py-2.5 rounded-xl border border-dashed border-[#3D2314]/30 text-[#3D2314] text-xs font-bold hover:bg-stone-50 transition"
                      >
                        Upload Companion Photos ({companionData.images.length}) 📸
                      </button>
                    )}
                  </CldUploadWidget>

                  <button
                    type="submit"
                    className="w-full bg-[#3D2314] hover:bg-[#5C3620] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition"
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
          <div className="bg-white rounded-3xl shadow-xs border border-stone-200/80 overflow-hidden">
            <div className="p-5 bg-stone-50/70 border-b border-stone-100 flex justify-between items-center">
              <div>
                <h2 className="text-base font-bold text-[#3D2314]">Pet Insurance Quotes Tracking 🛡️</h2>
                <p className="text-[11px] text-stone-400">Clients requesting coverage calculations and plan consultation</p>
              </div>
              <button
                onClick={() => exportToCSV(insuranceLeads, "insurance_leads.csv")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition"
              >
                <FileSpreadsheet size={14} /> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-100">
                  <tr>
                    <th className="p-4">Owner / Contact</th>
                    <th className="p-4">Pet Details</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {insuranceLeads.length === 0 ? (
                    <tr><td colSpan={5} className="p-10 text-center text-stone-400 font-medium italic">No insurance inquiries yet.</td></tr>
                  ) : (
                    insuranceLeads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-stone-50 transition">
                        <td className="p-4">
                          <p className="font-bold text-[#3D2314]">{lead.ownerName}</p>
                          <p className="text-[10px] text-stone-400">{lead.phone}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-stone-800">{lead.breed}</p>
                          <p className="text-[10px] text-stone-400">{lead.petType} • {lead.age}</p>
                        </td>
                        <td className="p-4 font-medium text-stone-600">{lead.city}</td>
                        <td className="p-4">
                          <select
                            value={lead.status || "New"}
                            onChange={(e) => updateInsuranceStatus(lead._id, e.target.value)}
                            className="border rounded-lg px-2 py-1 text-xs outline-none font-bold bg-blue-50 text-blue-800"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => deleteInsuranceLead(lead._id)} className="text-rose-500 hover:text-rose-700 p-2">
                            <Trash size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ────────────────── 4. GALLERY MANAGEMENT TAB ────────────────── */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-stone-200/80 p-4 text-center">
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Total Media</p>
                  <p className="text-2xl font-black text-[#3D2314] mt-1">{galleryList.length}</p>
                </div>
                <div className="bg-white rounded-2xl border border-stone-200/80 p-4 text-center">
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">📸 Photos</p>
                  <p className="text-2xl font-black text-[#E08738] mt-1">{galleryList.filter((g) => g.mediaType === "image").length}</p>
                </div>
                <div className="bg-white rounded-2xl border border-stone-200/80 p-4 text-center">
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">🎥 Videos</p>
                  <p className="text-2xl font-black text-purple-600 mt-1">{galleryList.filter((g) => g.mediaType === "video").length}</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xs border border-stone-200/80 overflow-hidden">
                <div className="p-5 bg-stone-50/70 border-b border-stone-100 flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#3D2314]">Gallery Media Showcase 📸🎥</h2>
                  <span className="text-xs text-stone-400 font-semibold">{galleryList.filter((g) => g.visible).length} visible</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 text-stone-500 uppercase text-[10px] font-bold border-b border-stone-100">
                      <tr>
                        <th className="p-4">Preview</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Visibility</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {galleryList.length === 0 ? (
                        <tr><td colSpan={5} className="p-10 text-center text-stone-400">No media items in database.</td></tr>
                      ) : (
                        galleryList.map((item) => (
                          <tr key={item._id} className="hover:bg-stone-50 transition">
                            <td className="p-4">
                              {item.mediaType === "video" ? (
                                <div className="w-16 h-12 rounded-xl overflow-hidden bg-black relative flex items-center justify-center">
                                  <video src={item.url} className="w-full h-full object-cover opacity-80" muted />
                                  <span className="absolute text-[8px] font-black bg-purple-600 text-white px-1 rounded">VIDEO</span>
                                </div>
                              ) : (
                                <img src={item.url} alt={item.title} className="w-16 h-12 object-cover rounded-xl border border-stone-200" />
                              )}
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-stone-800">{item.title}</p>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block ${
                                item.mediaType === "video" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                              }`}>
                                {item.mediaType === "video" ? "🎥 Video" : "📸 Photo"}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                {item.category}
                              </span>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => toggleGalleryVisibility(item._id, item.visible)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                                  item.visible ? "bg-emerald-100 text-emerald-800" : "bg-stone-100 text-stone-600"
                                }`}
                              >
                                {item.visible ? "Visible" : "Hidden"}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => deleteGalleryItem(item._id)}
                                className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded-xl text-xs font-bold transition"
                              >
                                <Trash size={12} className="inline mr-1" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Add Gallery Media Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-3xl shadow-xs border border-stone-200/90 sticky top-20">
                <h2 className="text-base font-bold text-[#3D2314] mb-1">Add Media 📸🎥</h2>
                <p className="text-[11px] text-stone-400 mb-4">Upload high-res photos or pet videos</p>
                <form onSubmit={handleGallerySubmit} className="space-y-3.5">
                  <input
                    type="text"
                    placeholder="Media Title (e.g. Golden Retriever Spa)"
                    required
                    value={galleryData.title}
                    onChange={(e) => setGalleryData({ ...galleryData, title: e.target.value })}
                    className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none focus:border-[#E08738]"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 border border-stone-200 rounded-xl text-xs font-bold text-center bg-stone-50 text-[#3D2314]">
                      {galleryData.mediaType === "video" ? "🎥 Video (Auto)" : "📸 Image (Auto)"}
                    </div>
                    <select
                      value={galleryData.category}
                      onChange={(e) => setGalleryData({ ...galleryData, category: e.target.value })}
                      className="p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs font-bold text-[#3D2314] outline-none"
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
                    placeholder="Tags: spa, dog, styling"
                    value={galleryData.tags}
                    onChange={(e) => setGalleryData({ ...galleryData, tags: e.target.value })}
                    className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs outline-none"
                  />

                  <div className="flex gap-4 items-center text-xs font-bold text-[#3D2314]">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={galleryData.featured}
                        onChange={(e) => setGalleryData({ ...galleryData, featured: e.target.checked })}
                        className="rounded"
                      />
                      <span>⭐ Featured</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={galleryData.visible}
                        onChange={(e) => setGalleryData({ ...galleryData, visible: e.target.checked })}
                        className="rounded"
                      />
                      <span>👁 Visible</span>
                    </label>
                  </div>

                  <CldUploadWidget
                    uploadPreset="sniff_preset"
                    options={{
                      cloudName: "dfwpzolir",
                      sources: ["local", "url", "camera"],
                      resourceType: "auto",
                      clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "mp4", "mov"],
                    }}
                    onSuccess={(result: any) => {
                      const info = result?.info;
                      if (info?.secure_url) {
                        const url = info.secure_url;
                        const mType = info.resource_type === "video" ? "video" : "image";
                        setGalleryData((prev) => ({ ...prev, url, mediaType: mType }));
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className={`w-full py-3 rounded-xl font-bold text-xs border-2 transition-all ${
                          galleryData.url
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-stone-50 text-[#3D2314] border-dashed border-stone-300 hover:border-[#3D2314]"
                        }`}
                      >
                        {galleryData.url ? "✅ Media Ready (Click to change)" : "Upload Photo / Video 📸🎥"}
                      </button>
                    )}
                  </CldUploadWidget>

                  {galleryData.url && (
                    <div className="rounded-xl overflow-hidden border border-stone-200">
                      {galleryData.mediaType === "video" ? (
                        <video src={galleryData.url} className="w-full h-36 object-cover" controls muted />
                      ) : (
                        <img src={galleryData.url} alt="preview" className="w-full h-36 object-cover" />
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!galleryData.url || !galleryData.title}
                    className="w-full bg-[#3D2314] hover:bg-[#5C3620] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition disabled:opacity-40"
                  >
                    Publish to Gallery 🚀
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────── 5. ANALYTICS OVERVIEW TAB ────────────────── */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
                <div className="p-3.5 bg-amber-100 text-[#3D2314] rounded-2xl">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Bookings Completed</p>
                  <h3 className="text-2xl font-black text-[#3D2314] mt-0.5">
                    {bookings.filter((b) => b.status === "Completed").length}
                  </h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
                <div className="p-3.5 bg-orange-100 text-[#E08738] rounded-2xl">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Companion Inquiries</p>
                  <h3 className="text-2xl font-black text-[#3D2314] mt-0.5">{companionLeads.length}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
                <div className="p-3.5 bg-blue-100 text-blue-700 rounded-2xl">
                  <Shield size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Insurance Leads</p>
                  <h3 className="text-2xl font-black text-[#3D2314] mt-0.5">{insuranceLeads.length}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs flex items-center gap-4">
                <div className="p-3.5 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Gallery Assets</p>
                  <h3 className="text-2xl font-black text-[#3D2314] mt-0.5">{galleryList.length}</h3>
                </div>
              </div>
            </div>

            {/* Inquiry Funnel */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs max-w-2xl">
              <h3 className="text-base font-bold text-[#3D2314] mb-4">Client Consultation Funnel</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-600 mb-1">
                    <span>New Enquiries</span>
                    <span>{companionLeads.filter((l) => l.status === "New").length + insuranceLeads.filter((l) => l.status === "New").length}</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "50%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-600 mb-1">
                    <span>Contacted / In Discussion</span>
                    <span>{companionLeads.filter((l) => l.status === "Contacted" || l.status === "Follow Up").length + insuranceLeads.filter((l) => l.status === "Contacted").length}</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "35%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-600 mb-1">
                    <span>Completed / Consultation Closed</span>
                    <span>{companionLeads.filter((l) => l.status === "Completed").length + insuranceLeads.filter((l) => l.status === "Closed").length}</span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ─── BOOKING PROFILE DETAILS MODAL ─── */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#3D2314] mb-4">Booking Profile Details</h3>
            <div className="space-y-2.5 text-xs text-stone-700">
              <p><b className="text-[#3D2314]">Customer:</b> {selectedBooking.user?.name}</p>
              <p><b className="text-[#3D2314]">Phone:</b> {selectedBooking.user?.phone}</p>
              <p><b className="text-[#3D2314]">Email:</b> {selectedBooking.user?.email || "N/A"}</p>
              <p><b className="text-[#3D2314]">Address:</b> {selectedBooking.user?.address || "N/A"}</p>
              <p><b className="text-[#3D2314]">Date & Slot:</b> {selectedBooking.date} ({selectedBooking.slot})</p>
              <p><b className="text-[#3D2314]">Pet:</b> {selectedBooking.pet?.petName} ({selectedBooking.pet?.breed || "N/A"})</p>
              <p><b className="text-[#3D2314]">Total:</b> ₹{selectedBooking.total}</p>
              <p><b className="text-[#3D2314]">Status:</b> {selectedBooking.status || "Pending"}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── EDIT ARTICLE MODAL (PORTAL) ─── */}
      {mounted && editingArticle && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 border border-stone-200">
            <button
              onClick={() => setEditingArticle(null)}
              className="absolute top-5 right-5 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition z-10"
            >
              <X size={18} className="text-stone-600" />
            </button>
            <h2 className="text-xl font-black text-[#3D2314] mb-4">Edit Article ✏️</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full p-3 border border-stone-200 rounded-xl bg-stone-50 text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-[#E08738]/20 focus:border-[#E08738] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Category</label>
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50 text-xs font-bold text-[#3D2314] outline-none"
                >
                  <option value="Pet Care">Pet Care</option>
                  <option value="Grooming Tips">Grooming Tips</option>
                  <option value="News">News</option>
                  <option value="Product Reviews">Product Reviews</option>
                  <option value="Sniffnsnooz Updates">Sniffnsnooz Updates</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Content</label>
                <div className="bg-white rounded-xl overflow-hidden border border-stone-200">
                  <ReactQuill
                    theme="snow"
                    value={editData.content}
                    onChange={(val) => setEditData({ ...editData, content: val })}
                    className="h-48 mb-10"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="flex-1 py-3 rounded-xl border border-stone-200 font-bold text-xs text-stone-600 hover:bg-stone-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSave}
                  disabled={editSaving}
                  className="flex-1 bg-[#3D2314] hover:bg-[#5C3620] text-white py-3 rounded-xl font-bold text-xs shadow-md transition disabled:opacity-50"
                >
                  {editSaving ? "Saving Updates..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}