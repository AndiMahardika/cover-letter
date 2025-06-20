import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function FiturSection() {
  return (
    <section className="py-20 px-6 ">
      <div className="max-w-7xl mx-auto bg-gray-700/50 px-12 py-12 rounded-4xl">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded"></div>
          </div>
          <span className="text-gray-400">Everything about Resumio</span>
        </div>

        <div className="mb-6">
          <div>
            <h2 className="text-5xl lg:text-7xl font-medium mb-8 leading-tight">
              Start creating your <br />
              perfect cover letter today
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl">
                  Our online cover letter instruments allow you to generate a
                  detailed, passionate and informative appeal within minutes. No
                  more agonizing over creative sentences, doubting your writing
                  style or worrying about emotional perceptions.
                </p>
              </div>
              <div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg mt-12">
                  Create new cover letter
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Upload CV Section */}
          <Card className="bg-white text-black rounded-4xl overflow-hidden">
            <CardContent className="px-6">
              <div className="mb-8 h-72 overflow-hidden shadow-md rounded-lg">
                <img
                  src="https://res.cloudinary.com/dehyfhrwi/image/upload/v1750418919/Screenshot_2025-06-20_182441_kyh59u.png"
                  alt=""
                />
              </div>
              <h3 className="text-3xl font-medium">
                Online editing and customizing
              </h3>
            </CardContent>
          </Card>

          {/* Upload CV Section */}
          <Card className="bg-white text-black rounded-4xl overflow-hidden">
            <CardContent className="px-6">
              <div className="mb-8 h-72 overflow-hidden shadow-md rounded-lg">
                <img
                  src="https://res.cloudinary.com/dehyfhrwi/image/upload/v1750418919/Screenshot_2025-06-20_182441_kyh59u.png"
                  alt=""
                />
              </div>
              <h3 className="text-3xl font-medium">
                Online editing and customizing
              </h3>
            </CardContent>
          </Card>

          {/* Upload CV Section */}
          <Card className="bg-white text-black rounded-4xl overflow-hidden">
            <CardContent className="px-6">
              <div className="mb-8 h-72 overflow-hidden shadow-md rounded-lg">
                <img
                  src="https://res.cloudinary.com/dehyfhrwi/image/upload/v1750418919/Screenshot_2025-06-20_182441_kyh59u.png"
                  alt=""
                />
              </div>
              <h3 className="text-3xl font-medium">
                Online editing and customizing
              </h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
