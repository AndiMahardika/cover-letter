import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import HeroSection from "@/components/landing-page/heroes-section";
import ToolkitSection from "@/components/landing-page/toolkit-section";
import FiturSection from "@/components/landing-page/fitur-section";
import HowSection from "@/components/landing-page/how-section";
import TestimoniSection from "@/components/landing-page/testimoni-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101010] text-white font-sans text-[Arial,sans-serif]">
      <Header />
      <HeroSection />
      <ToolkitSection />
      <FiturSection />
      <HowSection />
      <TestimoniSection />

      {/* Final CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-12 text-center text-black relative overflow-hidden">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Get Started now!
            </h2>
            <p className="text-lg mb-8 opacity-80">
              Join millions of job seekers who trust Resumio to land their dream
              jobs.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg">
              Get Started now
            </Button>
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-400">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white">
                Terms of Use
              </Link>
              <Link href="#" className="hover:text-white">
                FAQ
              </Link>
              <Link href="#" className="hover:text-white">
                Contact
              </Link>
            </div>
            <div>
              <span>Resumio 2024. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
