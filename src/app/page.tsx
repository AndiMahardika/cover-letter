import Header from "@/components/landing-page/header";
import HeroSection from "@/components/landing-page/heroes-section";
import ToolkitSection from "@/components/landing-page/toolkit-section";
import FiturSection from "@/components/landing-page/fitur-section";
import HowSection from "@/components/landing-page/how-section";
import TestimoniSection from "@/components/landing-page/testimoni-section";
import Footer from "@/components/landing-page/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101010] font-sans text-[Arial,sans-serif]">
      <Header />
      <HeroSection />
      <ToolkitSection />
      <FiturSection />
      <HowSection />
      <TestimoniSection />
      <Footer />
    </div>
  );
}
