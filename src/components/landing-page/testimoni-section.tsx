import { Card, CardContent } from "@/components/ui/card";
import { Star, Users } from "lucide-react";

// Dummy data for testimonials
const testimonials = [
  {
    name: "Arie",
    role: "Marketing Manager",
    color: "bg-blue-500",
    message:
      "Using the AI Cover Letter Generator was a game changer for me. As someone who struggles with writing, this tool made it so easy to create a professional cover letter.",
  },
  {
    name: "Mike Chen",
    role: "Web Developer",
    color: "bg-green-500",
    message:
      "The AI Cover Letter Generator exceeded my expectations. It understood my industry and created a cover letter that perfectly matched my experience and the job requirements.",
  },
  {
    name: "Amanda Torres",
    role: "Project Manager",
    color: "bg-purple-500",
    message:
      "Using the AI Cover Letter Generator was a game changer for me. As someone who struggles with writing, this tool made it so easy to create a professional cover letter. "
  },
];

// Reusable Testimonial Card
function TestimonialCard({ name, role, color, message }: typeof testimonials[number]) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex mb-4 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-300 mb-4 text-sm">"{message}"</p>
        <div className="flex items-center">
          <div className={`w-8 h-8 ${color} rounded-full mr-3`} />
          <div className="text-left">
            <div className="font-medium text-sm text-white">{name}</div>
            <div className="text-gray-400 text-xs">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimoniSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-5 h-5 text-purple-400 mr-2" />
          <span className="text-purple-400 text-sm">
            Testimonials about Cover Letter
          </span>
        </div>
        <h2 className="max-w-2xl mx-auto text-4xl lg:text-6xl font-medium leading-tight mb-16">
          What community says about Cover Letter
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
