import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Play,
  ArrowRight,
  FileText,
  CheckCircle,
  Users,
  Zap,
  ChevronDown,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import HeroSection from "@/components/landing-page/heroes-section";
import ToolkitSection from "@/components/landing-page/toolkit-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans text-[Arial,sans-serif]">
      <Header />
      <HeroSection />
      <ToolkitSection />

      {/* Cover Letter Creation Section */}
      <section className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto bg-gray-700/50 px-12 py-12 rounded-4xl">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <div className="w-4 h-4 bg-white rounded"></div>
            </div>
            <span className="text-gray-400">Everything about Resumio</span>
          </div>

          <div className="mb-16">
            <div>
              <h2 className="text-5xl lg:text-7xl font-medium mb-8 leading-tight">
                Start creating your <br />
                perfect cover letter today
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                    Our online cover letter instruments allow you to generate a
                    detailed, passionate and informative appeal within minutes.
                    No more agonizing over creative sentences, doubting your
                    writing style or worrying about emotional perceptions.
                  </p>
                </div>
                <div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg mt-12">
                    Create new cover letter
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Upload CV Section */}
            <Card className="bg-white text-black rounded-3xl overflow-hidden">
              <CardContent className="px-6">
                <div className="mb-8">
                  <img src="" alt="" />
                </div>
                <h3 className="text-3xl font-medium">
                  Online editing and customizing
                </h3>
              </CardContent>
            </Card>


          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Zap className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-400 text-sm">How it works</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                What it does & how it works
              </h2>
              <p className="text-gray-400 mb-8">
                Our online cover letter tool provides all you need to create a
                standout, professional and impressive cover letter that gets you
                the interview. From customizable templates to expert guidance,
                we make creating your cover letter simple and effective.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  Complete tour
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-gray-800"
                >
                  Resume
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">01</span>
                  <Button
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white"
                  >
                    First Step
                  </Button>
                </div>
                <h3 className="font-bold mb-2">
                  Begin with choosing a template
                </h3>
              </div>
              <div className="flex space-x-4">
                <div className="w-24 h-32 bg-white rounded shadow-lg flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="w-24 h-32 bg-white/80 rounded shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-purple-400 text-sm">
              Testimonials about Resumio
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-16">
            What community says about Resumio
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  "Using the AI Cover Letter Generator was a game changer for
                  me. As someone who struggles with writing, this tool made it
                  so easy to create a professional cover letter."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Sarah Johnson</div>
                    <div className="text-gray-400 text-xs">
                      Marketing Manager
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  "The AI Cover Letter Generator exceeded my expectations. It
                  understood my industry and created a cover letter that
                  perfectly matched my experience and the job requirements."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Mike Chen</div>
                    <div className="text-gray-400 text-xs">Web Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  "I was blown away by the results of the AI Cover Letter
                  Generator. It effortlessly created a compelling cover letter
                  that highlighted my strengths and addressed the specific
                  requirements."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Amanda Torres</div>
                    <div className="text-gray-400 text-xs">Project Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  "I can't recommend the AI Cover Letter Generator enough. It
                  saved me hours of writing and editing, and the final result
                  was better than anything I could have written myself."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium text-sm">David Kim</div>
                    <div className="text-gray-400 text-xs">
                      Sales Representative
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  "I was impressed with how the AI Cover Letter Generator
                  understood my career goals and created a cover letter that
                  perfectly aligned with my aspirations."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Lisa Rodriguez</div>
                    <div className="text-gray-400 text-xs">HR Specialist</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  "The personalized approach of the AI Cover Letter Generator
                  impressed me. It didn't just create a generic template but
                  crafted a cover letter that felt authentic to my voice."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full mr-3"></div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Alex Thompson</div>
                    <div className="text-gray-400 text-xs">
                      Graphic Designer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
