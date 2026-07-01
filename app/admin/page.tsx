"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password: password.trim() }), 
    });

    if (res.ok) {
      // 🚨 LOOP FIX: window.location.replace page ko history se hata deta hai 
      // taaki loop na bane aur aap seedha dashboard par jayein
      window.location.replace("/admin/dashboard");
    } else {
      const data = await res.json();
      alert("❌ " + data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6efe6]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-[#5b3a26] text-center">Admin Login 🐾</h2>
        <input 
          className="w-full p-3 mb-4 border rounded-xl outline-none" 
          placeholder="Email" 
          type="email"
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="w-full p-3 mb-6 border rounded-xl outline-none" 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="w-full bg-[#5b3a26] text-white py-3 rounded-xl font-bold">
          Login
        </button>
      </form>
    </div>
  );
}