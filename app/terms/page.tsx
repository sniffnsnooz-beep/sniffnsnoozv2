import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Terms & Conditions | Sniff n Snooz Pet Grooming Gurugram",
  description: "Comprehensive terms and conditions for Sniff n Snooz Pet Grooming Spa. Detailed policies on pet safety, booking, cancellation, and legal compliance under Indian Laws.",
  keywords: "Pet Grooming Terms India, Sniff n Snooz Policies, Pet Spa Legal Agreement, Grooming Liability Waiver Gurugram",
};

const TermsAndConditions = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans leading-relaxed">
      {/* SEO Optimized Header */}
      <div className="bg-[#5b3a26] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Terms & Conditions of Service</h1>
          <p className="text-sm opacity-90 uppercase tracking-[0.2em] font-semibold">
            Last Updated & Revised: 19 June 2024
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-16 px-6 lg:px-12">
        
        {/* Introduction */}
        <section className="mb-12 border-b border-gray-100 pb-10">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-6">Introduction & Agreement</h2>
          <p className="mb-4 text-gray-700">
            Welcome to Sniff n Snooz (sniffnsnooz.in), a premium pet grooming spa and salon located in Gurugram. These Terms and Conditions govern your use of our website and the professional grooming services provided at our facility.
          </p>
          <p className="text-gray-700">
            By booking an appointment, either via our website, phone, or in person, you (the &quot;Pet Parent&quot; or &quot;Client&quot;) agree to be legally bound by these terms. If you do not agree with any part of these terms, you must refrain from using our services.
          </p>
        </section>

        {/* 1. Legal Compliance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-4 underline decoration-orange-300 decoration-4">1. Legal Framework & Regulatory Compliance</h2>
          <p className="mb-6">
            Sniff n Snooz operates in strict accordance with the following Indian Legal Frameworks to ensure the safety of our digital users and pet clients:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Consumer Protection Act, 2019</h3>
              <p className="text-sm text-gray-600">We maintain absolute transparency in our service descriptions, pricing, and refund policies to protect the rights of our consumers.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Information Technology Act, 2000</h3>
              <p className="text-sm text-gray-600">All digital transactions and data collected through our booking portal are encrypted and handled per Indian cybersecurity standards.</p>
            </div>
          </div>
        </section>

        {/* 2. Pet Health and Safety - Detailed */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">2. Pet Health, Safety, and Medical Liability</h2>
          <p className="mb-4 font-semibold text-orange-800 italic">Safety is our primary concern. However, grooming involves sharp tools and close contact.</p>
          <div className="space-y-6 text-gray-700">
            <p>
              <strong>Pre-Existing Conditions:</strong> Clients must disclose any heart conditions, epilepsy, skin allergies, or recent surgeries before the grooming session. Sniff n Snooz is not liable for complications arising from undisclosed medical issues.
            </p>
            <p>
              <strong>Vaccination Requirements:</strong> For the safety of all pets in our facility, we require that all dogs/cats be up-to-date with their vaccinations (Anti-Rabies and DHPP). We reserve the right to demand proof of vaccination.
            </p>
            <p>
              <strong>Matted Coats:</strong> Removing heavy matting can lead to skin irritation or nicks. If a pet is severely matted, we may recommend a &quot;shave-down&quot; for the pet&apos;s comfort. The client assumes all risks associated with grooming matted pets.
            </p>
          </div>
        </section>

        {/* 3. Booking and Financials */}
        <section className="mb-12 bg-gray-50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-6">3. Appointment Management & Financial Terms</h2>
          <div className="space-y-4">
            <h3 className="font-black text-[#5b3a26]">A. Cancellation & Late Arrivals</h3>
            <p className="text-sm">
              We operate on a strict schedule. If you are more than 15 minutes late, we may need to reschedule your appointment or skip certain services (like nail trimming) to stay on time, while the full service fee remains applicable.
            </p>
            <h3 className="font-black text-[#5b3a26] mt-4">B. Pricing Adjustments</h3>
            <p className="text-sm">
              Base prices provided on the website are estimates. Actual prices depend on the pet&apos;s breed, coat condition, behavior, and the time taken. Aggressive pets requiring extra handling may incur a &quot;special handling&quot; fee.
            </p>
          </div>
        </section>

        {/* 4. Professional Conduct and Behavior */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">4. Behavioral Standards and Refusal of Service</h2>
          <p className="text-gray-700 mb-4">
            In compliance with the <strong>Prevention of Cruelty to Animals Act</strong>, we do not use sedation. If a pet becomes overly aggressive or stressed to a point that it is unsafe for the pet or the groomer, the session will be terminated immediately.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600 italic">
            <li>Clients will be charged for the portion of the service completed.</li>
            <li>We reserve the right to refuse service to pets with severe fleas or ticks unless a de-flea treatment is booked.</li>
          </ul>
        </section>

        {/* 5. Limitation of Liability */}
        <section className="mb-12 border-t-2 border-dashed border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-[#5b3a26] mb-4">5. Limitation of Liability & Indemnification</h2>
          <p className="text-gray-700 mb-4 text-sm">
            Sniff n Snooz, its owners, and staff shall not be held responsible for any loss, injury, or death of a pet resulting from pre-existing health conditions or accidents beyond the groomer&apos;s reasonable control. By using our services, you indemnify Sniff n Snooz against any legal claims or damages.
          </p>
        </section>

        {/* 6. Governing Law */}
        <section className="mb-12 p-10 bg-[#5b3a26] text-white rounded-[3rem]">
          <h2 className="text-3xl font-bold mb-6">6. Dispute Resolution & Jurisdiction</h2>
          <p className="mb-4 opacity-90">
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be settled exclusively in the courts located in <strong>Gurugram, Haryana</strong>.
          </p>
          <hr className="my-6 opacity-20" />
          <p className="text-xs opacity-70 italic">
            If any provision of these Terms is found to be invalid by a court of law, the remaining provisions will continue to remain in full force and effect.
          </p>
        </section>

        {/* SEO Content Footer */}
        <footer className="text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Sniff n Snooz Pet Grooming Spa &bull; Emerald Plaza &bull; Sector 65</p>
          <p className="text-gray-300 text-[10px]">Providing safe and ethical pet grooming services in Gurugram since 2024.</p>
        </footer>
      </div>
    </div>
  );
};

export default TermsAndConditions;