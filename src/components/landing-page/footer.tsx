import Link from "next/link";
import CTA from "./cta";

export default function Footer() {
  return (
    <section className="py-20  px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#fe7a42] rounded-2xl md:p-12 p-8 text-black relative overflow-hidden">
          <CTA />
          {/* Footer */}
          <footer className="md:mt-12 mt-10">
            <div className="flex flex-wrap justify-between items-center text-sm text-black">
              <div className="flex gap-4 md:gap-8 mb-4 md:mb-0 font-medium">
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
