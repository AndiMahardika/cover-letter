import Link from "next/link";
import CTA from "./cta";

export default function Footer() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#fe7a42] rounded-2xl p-12 text-black relative overflow-hidden">
          <CTA />
          {/* Footer */}
          <footer className="mt-12">
            <div className="flex flex-wrap justify-between items-center text-sm text-black">
              <div className="flex space-x-16 mb-4 md:mb-0 font-medium">
                <Link href="#" className="hover:text-black">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-black">
                  Terms of Use
                </Link>
                <Link href="#" className="hover:text-black">
                  FAQ
                </Link>
                <Link href="#" className="hover:text-black">
                  Contact
                </Link>
              </div>
              <div className="font-medium">
                <span> Cover Letter 2024. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
