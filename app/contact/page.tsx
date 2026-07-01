"use client";

import React from "react";
import { 
  FaInstagram, FaFacebook, FaLinkedin, FaTwitter, 
  FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope 
} from 'react-icons/fa';
import { motion } from "framer-motion";
import Image from "next/image";

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
    <div className="min-h-screen bg-[#f6efe6] flex flex-col pt-20">
      
      {/* Hero Header Section */}
      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/pet_clinic_reception.png"
            alt="Clinic Reception"
            fill
            style={{ objectFit: 'cover' }}
            className="brightness-75 object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6efe6] via-[#f6efe6]/60 to-transparent z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#5b3a26] mb-4 drop-shadow-md">
            GET IN TOUCH
          </h1>
          <p className="text-xl text-[#5b3a26] font-medium max-w-2xl mx-auto drop-shadow-sm">
            We'd love to hear from you. Come visit our beautiful clinic or reach out to us here.
          </p>
        </motion.div>
      </section>

      {/* --- CONTACT SECTION (Glassmorphism) --- */}
      <section className="flex-grow pb-28 px-6 relative flex items-start justify-center -mt-16 z-30">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#5b3a26] mb-8 tracking-tight border-b-2 border-[#5b3a26]/10 pb-4 inline-block">Contact Info</h2>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                {/* Location */}
                <motion.div variants={itemVariants} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f6efe6] to-white rounded-2xl flex items-center justify-center text-[#5b3a26] shadow-md group-hover:scale-110 transition shrink-0 border border-white">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div className="pt-1">
                    <p className="text-xs uppercase text-[#7a5741] font-bold mb-1 tracking-widest">Our Location</p>
                    <span className="text-[#5b3a26] font-semibold text-lg leading-tight block">Ground Floor, GF-78 Emerald Plaza,<br/>Sector-65, Gurugram, Haryana – 122018</span>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f6efe6] to-white rounded-2xl flex items-center justify-center text-[#5b3a26] shadow-md group-hover:scale-110 transition shrink-0 border border-white">
                    <FaPhoneAlt size={22} />
                  </div>
                  <div className="pt-1">
                    <p className="text-xs uppercase text-[#7a5741] font-bold mb-1 tracking-widest">Call Us</p>
                    <a href="tel:+919818728444" className="text-[#5b3a26] font-semibold text-lg hover:underline block">+91 98187 28444</a>
                  </div>
                </motion.div>                   

                {/* Email */}
                <motion.div variants={itemVariants} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f6efe6] to-white rounded-2xl flex items-center justify-center text-[#5b3a26] shadow-md group-hover:scale-110 transition shrink-0 border border-white">
                    <FaEnvelope size={22} />
                  </div>
                  <div className="pt-1">
                    <p className="text-xs uppercase text-[#7a5741] font-bold mb-1 tracking-widest">Email Us</p>
                    <a href={`mailto:${businessDetails.email}`} className="text-[#5b3a26] font-semibold text-lg hover:underline block">{businessDetails.email}</a>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Social Icons Stack */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.8 }}
               className="mt-12 bg-[#f6efe6]/50 p-6 rounded-2xl"
            >
              <p className="text-[#5b3a26] font-bold mb-4 uppercase text-xs tracking-widest text-center lg:text-left">Connect with Sniff n Snooz</p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {[
                  { icon: <FaInstagram size={20} />, link: businessDetails.socials.instagram, color: 'hover:bg-[#E4405F]' },
                  { icon: <FaFacebook size={20} />, link: businessDetails.socials.facebook, color: 'hover:bg-[#1877F2]' },
                  { icon: <FaLinkedin size={20} />, link: businessDetails.socials.linkedin, color: 'hover:bg-[#0077B5]' },
                  { icon: <FaTwitter size={20} />, link: businessDetails.socials.x, color: 'hover:bg-black' },
                  { icon: <FaWhatsapp size={20} />, link: `https://wa.me/${businessDetails.whatsapp}`, color: 'hover:bg-[#25D366]' },
                ].map((social, idx) => (
                  <a 
                    key={idx} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#5b3a26] hover:text-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-white/40 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Map Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-md border border-white p-4 rounded-3xl shadow-2xl min-h-[450px] relative overflow-hidden group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.56201524317!2d77.2273!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTMnMzguMyJF!5e0!3m2!1sen!2sin!4v1612345678901!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '1.5rem' }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <a 
              href="https://maps.app.goo.gl/mne3pYM2wdLeUuvk9"
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md text-[#5b3a26] py-3 rounded-xl font-bold text-center border border-white/30 hover:bg-white transition shadow-lg z-20"
            >
              Open in Google Maps
            </a>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}