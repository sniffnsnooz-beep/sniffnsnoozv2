import HeroSection from "@/components/Hero3D";
import HomeServiceSlider from "../components/HomeServiceSlider";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeFAQSection from "@/components/HomeFAQSection";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <HeroSection />
        
      {/* 🔥 GLASS SERVICE SLIDER (Hero ke niche) */}
      <section
        className="
          relative
          min-h-[420px]
          bg-gradient-to-br
          from-[#f6efe6]
          via-[#f2e9df]
          to-[#eadfce]
          py-20
        "
      >
        {/* floating background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-10 w-32 h-32 bg-white/30 blur-xl rounded-2xl animate-[bounce_6s_infinite]" />
          <div className="absolute bottom-24 right-20 w-40 h-40 bg-white/20 blur-2xl rounded-3xl animate-[bounce_8s_infinite_reverse]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollReveal delay={0.1}>
            <HomeServiceSlider />
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={0.2}>
          <ReviewsCarousel />
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <HomeAboutSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <HomeFAQSection />
        </ScrollReveal>
      </section>
    </>
  );
}
