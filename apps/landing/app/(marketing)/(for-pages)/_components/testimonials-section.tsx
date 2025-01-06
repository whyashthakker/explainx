import { Card } from "@repo/ui/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }>;
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-cal text-4xl mb-4">Creator Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from creators who have grown their influence with Infloq
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <Quote className="w-8 h-8 text-blue-600 mb-4" />
              <p className="text-gray-600 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                {testimonial.avatar && (
                  <Avatar className="mr-3">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}