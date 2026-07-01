import React from "react";
import { Metadata } from "next";

// SEO Metadata
export const metadata: Metadata = {
  title: "Privacy Policy | Sniff n Snooz - Premium Pet Grooming Gurugram",
  description: "Read the Privacy Policy of Sniff n Snooz Pet Grooming Spa. Learn how we protect your data and pet information at our Sector 65, Gurugram clinic.",
  keywords: "Pet Grooming Privacy Policy, Sniff n Snooz Data Policy, Gurugram Pet Spa Privacy, Pet Care Data Security",
};

const PrivacyPolicy = () => {
  // Structured Data for Google SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Sniff n Snooz",
    "description": "Information on how Sniff n Snooz collects and protects user data.",
    "publisher": {
      "@type": "LocalBusiness",
      "name": "Sniff n Snooz",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Emerald Plaza, Sector 65",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122101",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="bg-[#5b3a26] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy & Data Policy</h1>
          <p className="text-sm opacity-80 uppercase tracking-widest font-bold">Effective Date: 19 June 2024</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto py-12 px-6 leading-relaxed">
        
        <section className="mb-10">
          <p className="text-lg text-gray-600 italic mb-8">
            Sniff n Snooz (“we,” “our,” “us”) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
          </p>
          <hr className="border-gray-100 mb-10" />
        </section>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">1. Information We Collect</h2>
          <p className="mb-4 text-gray-700">When you interact with Sniff n Snooz, we may collect various types of information to provide you with a seamless experience:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Personal Information:</strong> Includes your name, phone number, email address, and specific details about your pet used during bookings or inquiries.</li>
            <li><strong>Payment Information:</strong> Necessary data collected securely when making purchases or online bookings.</li>
            <li><strong>Technical Information:</strong> IP address, device details, browser type, and cookies aimed at improving our website’s performance.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We process your data primarily to enhance our grooming and pet care services:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-orange-400">
              <p className="text-sm">Processing appointments, bookings, and payments efficiently.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-orange-400">
              <p className="text-sm">Sending confirmations, reminders, and essential service updates.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-orange-400">
              <p className="text-sm">Improving grooming standards based on pet history.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-orange-400">
              <p className="text-sm">Maintaining high website security and overall performance.</p>
            </div>
          </div>
        </section>

        {/* Section 3 & 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <section>
            <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">3. Sharing of Information</h2>
            <p className="text-gray-700">We do not sell or rent your personal information. Data is only shared with trusted service providers (payment gateways, booking systems) or legal authorities if required by law.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">4. Data Security</h2>
            <p className="text-gray-700">We implement appropriate security measures to protect your data. While we strive for absolute safety, no internet transmission method is 100% secure.</p>
          </section>
        </div>

        {/* Section 5 & 6 */}
        <section className="mb-12 bg-orange-50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">5. Cookies & Tracking</h2>
          <p className="mb-4">Our website uses cookies to enhance your browsing experience and analyze website traffic. You may disable cookies in your browser, though some features might not function correctly.</p>
          
          <h2 className="text-2xl font-bold text-[#5b3a26] mt-8 mb-4">6. Your Rights</h2>
          <p className="mb-4 font-medium">As a valued customer, you have the right to:</p>
          <ul className="list-check space-y-2">
            <li className="flex items-center">✅ Access, update, or correct your personal data.</li>
            <li className="flex items-center">✅ Request deletion of your personal information.</li>
            <li className="flex items-center">✅ Opt out of marketing newsletters at any time.</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-[#5b3a26] text-white p-10 rounded-3xl">
          <h2 className="text-3xl font-black mb-6">Contact Us</h2>
          <p className="mb-6 opacity-90">If you have questions regarding this policy or wish to exercise your rights, reach out to our team.</p>
          <div className="space-y-2 text-lg">
            <p>📧 <a href="mailto:info@sniffnsnooz.com" className="underline">info@sniffnsnooz.com</a></p>
            <p>📞 +91 93541 03444 | +91 9818728444</p>
            <p className="mt-4 text-sm opacity-70">
              Emerald Plaza, Sector 65, Gurugram, Haryana, 122101
            </p>
          </div>
        </section>
      </div>

      <footer className="text-center py-8 border-t border-gray-100 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Sniff n Snooz Pet Grooming. All Rights Reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;