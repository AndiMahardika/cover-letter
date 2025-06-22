import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="col-span-1 lg:col-span-2 bg-[#fe7a42] rounded-2xl sm:rounded-4xl p-6 lg:px-14 lg:pt-14 text-black relative">
            <h1 className="text-4xl lg:text-8xl font-medium mb-4 sm:mb-6 leading-tight">
              Stand{" "}
              <span className="inline-flex -space-x-2">
                <Avatar className="w-10 h-10 sm:w-16 sm:h-16">
                  <AvatarImage src="https://i.pinimg.com/736x/62/45/70/624570cfd8ffd20f65da1ab55fe1148a.jpg" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 sm:w-16 sm:h-16">
                  <AvatarImage src="https://i.pinimg.com/736x/d3/b6/fc/d3b6fc13b890671e7a3ecf735a7bd01a.jpg" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 sm:w-16 sm:h-16">
                  <AvatarImage src="https://i.pinimg.com/736x/ae/c2/0c/aec20cdb3145c59c3879e9eac21de353.jpg" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
              </span>{" "}
              Out <br />
              <span className="inline-flex items-center bg-black text-[#c199fd] px-8 sm:px-12 py-0.5 sm:py-2 rounded-full text-xl lg:text-5xl mr-2 sm:mr-4">
                &
              </span>
              Get Your Job
            </h1>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-80 text-balance max-w-2xl">
              Thousands of job seekers have benefited from our professional
              resume builder by landing more interviews and being hired in a
              shorter amount of time.
            </p>
            <div className="flex items-center space-x-4 mb-0 lg:mb-8">
              <Button className="bg-black text-white hover:bg-gray-800 px-12 py-6 rounded-full">
                <Link href="/dashboard/cover-letter">Create new Cover Letter</Link>
              </Button>
            </div>
          </div>

          <div className="col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl sm:rounded-4xl p-6 sm:p-8 text-white relative">
              <div className="h-48 sm:h-72 overflow-hidden bg-white rounded-2xl sm:rounded-3xl">
                <img
                  src="https://i.pinimg.com/736x/fe/cc/53/fecc538bb8f8ca375d3c44da58caf7c1.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-medium mt-4 text-[#12021c] leading-tight">
                Experience the Power of AI for Your Cover Letters
              </h2>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-4">
          <div className="col-span-1 lg:col-span-2 mt-6 sm:mt-8 ps-4 sm:ps-12">
            <div className="flex items-center space-x-4 mb-4 sm:mb-6 overflow-x-auto">
              <div className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 rounded-full border border-white whitespace-nowrap">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 fill-white text-white" />
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
              With its sophisticated algorithms and natural language processing
              capabilities, this tool streamlines the process of creating
              personalized and compelling cover letters tailored to specific job
              positions.
            </p>
          </div>
          
          <div className="col-span-1 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
              <Badge className="text-black px-4 py-2 rounded-full border border-black bg-white text-xs sm:text-sm whitespace-nowrap">
                +500K Users
              </Badge>
              <Badge className="text-white px-4 py-2 rounded-full border border-black bg-black">
                +400K Get Hired
              </Badge>
            </div>
            <div className="flex items-center justify-center space-x-3 mt-6 sm:mt-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
              </div>
              <span className="font-semibold text-black text-sm sm:text-base">
                Reviewed and Trusted by many people
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
