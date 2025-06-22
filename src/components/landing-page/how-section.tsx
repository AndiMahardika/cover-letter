import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";

export default function HowSection() {
    return (
      <section className="md:py-20 py-8 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="col-span-1 flex h-full">
              <div className="place-self-end">
                <div className="flex items-center mb-4">
                  <MessageCircleQuestion className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-400 text-sm">How it works</span>
                </div>
                <h2 className="text-4xl lg:text-7xl text-balance font-medium leading-tight mb-6">
                  What it does & how it works
                </h2>
                <p className="text-gray-400 mb-8">
                  Our online cover letter tool provides all you need to create a
                  standout, professional and impressive cover letter that gets
                  you the interview. From customizable templates to expert
                  guidance, we make creating your cover letter simple and
                  effective.
                </p>
                {/* <div className="flex space-x-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                    Create new cover letter
                  </Button>
                </div> */}
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 relative">
                <div className="mb-8 h-80 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dehyfhrwi/image/upload/v1750425109/freepik_assistant_1750425089754_cgwmz9.png"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#101010] p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 text-white font-medium rounded-full flex items-center justify-center border border-white">
                      <p>01</p>
                    </div>
                    <div className="text-white px-4 py-1 border border-white rounded-full w-fit">
                      First step
                    </div>
                  </div>

                  <p className="text-white font-semibold text-xl mt-4">
                    Format your cover letter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
