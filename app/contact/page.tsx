"use client";

import React from "react";
import { 
  FaInstagram, FaFacebook, FaLinkedin, FaTwitter, 
  FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope 
} from 'react-icons/fa';
import { motion } from "framer-motion";
import Image from "next/image";
import { Send } from "lucide-react";

export default function ContactPage() {
  const businessDetails = {
    address: "Shop No. 12, Pet Street, Grooming Hub, New Delhi - 110001",
    phone: "+91 9971135063",
    email: "sniffnsnooz@gmail.com",
    whatsapp: "919971135063",
    mapsUrl: "https://maps.google.com/?q=Emerald+Plaza+Sector+65+Gurugram",
    socials: {
      instagram: "https://www.instagram.com/sniffnsnooz_/",
      facebook: "https://www.facebook.com/people/Sniff-n-Snooz/61576835232219/#",
      linkedin: "https://www.linkedin.com/in/sniff-n-snooz-sawhnney-044333381/",
      x: "https://x.com/sniffnsnooz"
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "tween" as const } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] flex flex-col pt-20 overflow-hidden relative">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/40 rounded-full blur-[100px] animate-bounce-slow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#e6d3c2]/50 rounded-full blur-[120px] animate-bounce-medium pointer-events-none" />

      {/* Hero Header Section */}
      <section className="relative w-full h-[45vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/pet_clinic_reception.png"
            alt="Clinic Reception"
            fill
            style={{ objectFit: 'cover' }}
            className="brightness-90 object-center parallax-image"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6efe6]/90 via-[#f6efe6]/60 to-[#f6efe6] z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <div className="section-label mb-6">
            <span>📞</span> We're here for you
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#5b3a26] mb-4 drop-shadow-md">
            Get in <span className="shimmer-text italic">Touch</span>
          </h1>
          <p className="text-lg text-[#7a5741] font-medium max-w-2xl mx-auto drop-shadow-sm leading-relaxed">
            Have questions about our grooming packages? Need to schedule a visit? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* --- CONTACT SECTION (Glassmorphism) --- */}
      <section className="flex-grow pb-28 px-6 relative flex items-start justify-center -mt-20 z-30">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Details & Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            {/* Info Card */}
            <div className="glass-float p-8 lg:p-10 flex-1">
              <h2 className="text-2xl font-serif font-bold text-[#5b3a26] mb-8 border-b-2 border-[#5b3a26]/10 pb-4 inline-block">Contact Info</h2>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                {/* Location */}
                <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5b3a26] shadow-sm group-hover:scale-110 group-hover:bg-[#5b3a26] group-hover:text-white transition-all shrink-0">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] uppercase text-[#7a5741] font-bold mb-1 tracking-widest">Our Location</p>
                    <span className="text-[#5b3a26] font-semibold text-base leading-snug block">GF-78 Emerald Plaza,<br/>Sector-65, Gurugram, HR 122018</span>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5b3a26] shadow-sm group-hover:scale-110 group-hover:bg-[#5b3a26] group-hover:text-white transition-all shrink-0">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] uppercase text-[#7a5741] font-bold mb-1 tracking-widest">Call Us</p>
                    <a href="tel:+919818728444" className="text-[#5b3a26] font-semibold text-base hover:text-[#8c5a3b] transition-colors block">+91 98187 28444</a>
                  </div>
                </motion.div>                   

                {/* Email */}
                <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5b3a26] shadow-sm group-hover:scale-110 group-hover:bg-[#5b3a26] group-hover:text-white transition-all shrink-0">
                    <FaEnvelope size={18} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] uppercase text-[#7a5741] font-bold mb-1 tracking-widest">Email Us</p>
                    <a href={`mailto:${businessDetails.email}`} className="text-[#5b3a26] font-semibold text-base hover:text-[#8c5a3b] transition-colors block">{businessDetails.email}</a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Social Icons Card */}
            <div className="glass-float p-8">
              <p className="text-[#5b3a26] font-bold mb-5 uppercase text-xs tracking-widest text-center">Follow our journey</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { icon: <FaInstagram size={20} />, link: businessDetails.socials.instagram, color: 'hover:bg-[#E4405F] hover:border-[#E4405F]' },
                  { icon: <FaFacebook size={20} />, link: businessDetails.socials.facebook, color: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
                  { icon: <FaLinkedin size={20} />, link: businessDetails.socials.linkedin, color: 'hover:bg-[#0077B5] hover:border-[#0077B5]' },
                  { icon: <FaTwitter size={20} />, link: businessDetails.socials.x, color: 'hover:bg-black hover:border-black' },
                  { icon: <FaWhatsapp size={20} />, link: `https://wa.me/${businessDetails.whatsapp}`, color: 'hover:bg-[#25D366] hover:border-[#25D366]' },
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#5b3a26] hover:text-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/60 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Middle: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="card-premium h-full p-8 lg:p-10 flex flex-col">
              <h2 className="text-2xl font-serif font-bold text-[#5b3a26] mb-2">Send a Message</h2>
              <p className="text-sm text-[#7a5741] mb-8 font-medium">We'll get back to you within 24 hours.</p>

              <form className="space-y-4 flex-grow flex flex-col" onSubmit={(e) => e.preventDefault()}>
                <div className="float-label-wrap">
                  <input type="text" id="name" placeholder=" " required />
                  <label htmlFor="name">Your Name</label>
                </div>
                
                <div className="float-label-wrap">
                  <input type="email" id="email" placeholder=" " required />
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="float-label-wrap">
                  <input type="tel" id="phone" placeholder=" " />
                  <label htmlFor="phone">Phone Number</label>
                </div>

                <div className="float-label-wrap flex-grow flex flex-col">
                  <textarea id="message" placeholder=" " rows={4} className="resize-none flex-grow" required></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>

                <button type="submit" className="btn-primary w-full justify-center mt-2 group">
                  Send Message <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right: Map Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4"
          >
            <div className="card-premium p-4 min-h-[400px] lg:h-full relative overflow-hidden group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.56201524317!2d77.2273!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTMnMzguMyJF!5e0!3m2!1sen!2sin!4v1612345678901!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.25rem' }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href="https://maps.app.goo.gl/mne3pYM2wdLeUuvk9"
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md text-[#5b3a26] py-3.5 rounded-xl font-bold text-center border border-white/60 hover:bg-[#5b3a26] hover:text-white hover:border-[#5b3a26] transition-all shadow-xl z-20 flex items-center justify-center gap-2"
              >
                <FaMapMarkerAlt /> Open in Maps
              </a>
            </div>
          </motion.div>
          
        </div>
      </section>
    </div>
  );
}