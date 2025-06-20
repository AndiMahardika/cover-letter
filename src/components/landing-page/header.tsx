import { Button } from "@/components/ui/button"
import { ChevronDown, Menu } from "lucide-react"
import Link from "next/link"

export default function Header() {
    return (
      <header className="container mx-auto text-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl">Cover Letter</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
                <span>Features</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
                <span>Testimonials</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-gray-300 cursor-pointer">
                <span>FAQ</span>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-gray-100 px-6 rounded-full font-semibold">Get Started</Button>
            <Button variant="ghost" className="md:hidden p-2">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
    );
}