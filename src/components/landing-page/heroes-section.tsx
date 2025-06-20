import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function HeroSection() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="col-span-2 bg-[#fe7a42] rounded-4xl p-8 lg:p-14 text-black relative">
            <h1 className="text-4xl lg:text-8xl font-medium mb-6 leading-tight">
              Stand{" "}
              <span className="inline-flex -space-x-2">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://i.pinimg.com/736x/62/45/70/624570cfd8ffd20f65da1ab55fe1148a.jpg" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://i.pinimg.com/736x/d3/b6/fc/d3b6fc13b890671e7a3ecf735a7bd01a.jpg" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://i.pinimg.com/736x/ae/c2/0c/aec20cdb3145c59c3879e9eac21de353.jpg" />
                  <AvatarFallback>CV</AvatarFallback>
                </Avatar>
              </span>
              {" "}Out{" "} 
              <br />
              <span className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-3xl lg:text-5xl mr-4">
                &
              </span>
              Get Your Job
            </h1>
            <p className="text-lg mb-8 opacity-80 max-w-md">
              Thousands of job seekers have benefited from our professional
              resume builder by landing more interviews and being hired in a
              shorter amount of time.
            </p>
            <div className="flex items-center space-x-4 mb-8">
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full">
                Create new resume
              </Button>
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded"></div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8">
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <span>Powered by</span>
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-black rounded"></div>
                  <span className="font-semibold">OpenAI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-8 text-white relative">
              <div className="grid grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Experience the Power of AI for Your Cover Letters ✨
                  </h2>
                </div>
                <div className="relative">
                  <div className="w-32 h-40 bg-white rounded-2xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-6xl">👩‍💼</div>
                    </div>
                  </div>
                  <Button className="absolute -bottom-3 -right-3 bg-black text-white hover:bg-gray-800 rounded-full p-3">
                    <Play className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* White stats card */}
            <div className="bg-white rounded-3xl p-6 text-black">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Badge className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 rounded-full">
                  +500K Users
                </Badge>
                <Badge className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-full">
                  +400K Get Hired
                </Badge>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="font-medium">
                  Reviewed and Trusted by many people
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with stars and description */}
        <div className="mt-12 max-w-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1 bg-gray-800 px-4 py-2 rounded-full">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed">
            With its sophisticated algorithms and natural language processing
            capabilities, this tool streamlines the process of creating
            personalized and compelling cover letters tailored to specific job
            positions.
          </p>
        </div>
      </div>
    </section>
  );
}
