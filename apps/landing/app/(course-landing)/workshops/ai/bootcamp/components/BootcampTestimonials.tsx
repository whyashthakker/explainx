import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Marketing Manager",
    company: "TechCorp India",
    image: "👩‍💼",
    rating: 5,
    testimonial: "This bootcamp completely transformed how I approach marketing. I now use AI for content creation, campaign optimization, and customer analysis. My productivity increased 300% and I got promoted within 2 months!"
  },
  {
    name: "Raj Patel",
    role: "Software Developer",
    company: "StartupXYZ",
    image: "👨‍💻",
    rating: 5,
    testimonial: "As a developer, I thought I knew AI. I was wrong. This bootcamp taught me practical applications I use daily. The hands-on projects were incredible - I built 3 apps that my company now uses internally."
  },
  {
    name: "Sneha Gupta",
    role: "Finance Analyst",
    company: "BigBank Ltd",
    image: "👩‍🎓",
    rating: 5,
    testimonial: "Never thought finance and AI could work together so well. Now I automate reports, generate insights, and predict trends using AI. My manager was so impressed, I'm leading our AI initiative now."
  },
  {
    name: "Arjun Kumar",
    role: "Student",
    company: "IIT Delhi",
    image: "👨‍🎓",
    rating: 5,
    testimonial: "Being a student, the early bird pricing was perfect. The bootcamp gave me skills that landed me a data science internship at Google. The lifetime community access is invaluable for continued learning."
  },
  {
    name: "Meera Singh",
    role: "HR Director",
    company: "Global Solutions Inc",
    image: "👩‍💼",
    rating: 5,
    testimonial: "HR and AI seemed like an odd combination, but now I use AI for resume screening, employee engagement analysis, and training personalization. This bootcamp opened up completely new possibilities."
  },
  {
    name: "Vikram Reddy",
    role: "Product Manager",
    company: "E-commerce Giant",
    image: "👨‍💼",
    rating: 5,
    testimonial: "The product management applications were mind-blowing. I now use AI for user research, feature prioritization, and market analysis. Our product development cycle is 50% faster thanks to what I learned here."
  }
];

export default function BootcampTestimonials() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Success Stories from Our Graduates
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how our bootcamp has transformed careers across different industries and roles.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700 hover:bg-gray-900/70 transition-all duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-2 rounded-full bg-purple-600/20">
                    <Quote className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6 text-center">
                  "{testimonial.testimonial}"
                </p>

                {/* Author Info */}
                <div className="text-center">
                  <div className="text-4xl mb-3">{testimonial.image}</div>
                  <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                  <p className="text-purple-400 text-sm font-medium">{testimonial.role}</p>
                  <p className="text-gray-400 text-xs">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">
              Join Thousands of Successful Graduates
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-gray-300 text-sm">Career Advancement</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">4.9/5</div>
                <div className="text-gray-300 text-sm">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">87%</div>
                <div className="text-gray-300 text-sm">Salary Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                <div className="text-gray-300 text-sm">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 