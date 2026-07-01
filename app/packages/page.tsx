"use client";

import { packages } from "@/data/packages";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PackagesPage() {
  const { addItem } = useBooking();
  const router = useRouter();

  const handleBuy = (p: any) => {
    addItem({
      id: `package-${p.name}`,
      name: p.name,
      price: p.price,
      category: "Package",
    });
    router.push("/booking");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#f6efe6] via-[#f2e9df] to-[#eadfce] py-28 overflow-hidden min-h-screen">
      {/* Decorative background blur elements */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-white/40 opacity-50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-96 h-96 bg-[#5b3a26] opacity-5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-6xl font-serif text-[#5b3a26] mb-6 leading-tight">
              Premium <br/> Pet Packages
            </h1>
            <p className="text-lg text-[#7a5741] mb-8 max-w-lg">
              Give your furry friends the best care without breaking the bank. Our bundled packages offer excellent value and comprehensive grooming and health services.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="relative h-[300px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
              <Image 
                src="/assets/premium_pet_grooming_box.png" 
                alt="Premium Pet Packages"
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating generic card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/40"
            >
              <p className="font-bold text-[#5b3a26] text-xl">Save up to 30%</p>
              <p className="text-sm text-[#7a5741]">with membership</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packages.map((p, i) => (
            <motion.div
              variants={itemVariants}
              key={i}
              className="group bg-white/60 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
            >
              {/* Highlight ribbon for best value or just styling */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#5b3a26]/10 to-transparent rounded-tr-3xl"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#5b3a26] group-hover:text-[#8a5b3d] transition-colors">
                    {p.name}
                  </h3>
                  <span className="bg-[#5b3a26]/10 text-[#5b3a26] text-xs px-3 py-1 rounded-full font-bold">
                    {p.validity}
                  </span>
                </div>

                <p className="text-sm text-[#7a5741] mb-6 leading-relaxed min-h-[60px]">
                  {p.services}
                </p>

                <div className="bg-white/50 rounded-2xl p-4 mb-6">
                  <p className="text-3xl font-bold text-[#5b3a26]">
                    ₹{p.price.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-green-600 mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    You save ₹{p.saved.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-2 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBuy(p)}
                  className="flex-1 bg-gradient-to-r from-[#5b3a26] to-[#7a5741] text-white text-sm px-6 py-3 rounded-xl hover:shadow-lg transition-all font-bold text-center"
                >
                  Buy Now
                </motion.button>

                <a
                  href="tel:+919818728444"
                  className="flex-1 text-center text-sm text-[#5b3a26] border-2 border-[#5b3a26]/20 hover:border-[#5b3a26] hover:bg-[#5b3a26]/5 py-3 rounded-xl font-bold transition-all"
                >
                  Call
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}