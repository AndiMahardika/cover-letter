import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRightIcon, Layers3 } from "lucide-react";

export default function CTA() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl lg:text-8xl font-medium leading-tight ">
            Get Started now!
          </h2>
        </div>
        <div className=" h-16 w-16 bg-[#101010] rounded-full flex items-center justify-center">
          <ArrowRight className="w-6 h-6 text-white font-medium" />
        </div>
      </div>
      <div>
        <p className="text-xl  opacity-80 text-balance">
          Createcover letter with Cover Letter in minutes.
        </p>
        <div className="mt-6 space-x-4">
          <Button className="px-8 py-6 rounded-full font-medium text-md ">
            Create Cover letter now
            <span>
              <ArrowUpRightIcon className="w-12 h-12 text-white font-medium" />
            </span>
          </Button>
          <Button className="px-8 py-6 text-black rounded-full font-medium text-md bg-transparent border border-black hover:bg-[#fe7a42]">
            Create Cover example
            <span>
              <Layers3 className="w-12 h-12 text-black font-medium" />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
