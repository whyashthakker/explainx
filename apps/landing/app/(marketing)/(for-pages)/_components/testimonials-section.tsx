"use client";

import { Card } from "@repo/ui/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="bg-background dark:bg-[#0A0A0A] py-16 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cal text-4xl md:text-5xl mb-6 text-foreground dark:text-white">
            Creator <span className=" ">Success</span> Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from creators who have grown their influence with our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
              className="flex"
            >
              <Card 
                className="p-6 hover:shadow-2xl transition-all duration-300 
                bg-background dark:bg-[#1A1A1A] 
                border border-border dark:border-gray-800 
                hover:border-secondaccent dark:hover:border-secondaccent2 
                group flex flex-col h-full w-full"
              >
                <Quote className="w-8 h-8 text-secondaccent2 mb-4 group-hover:text-yellow-600 transition-colors" />
                <p className="text-muted-foreground mb-6 flex-grow">
                  {testimonial.quote}
                </p>
                <div className="flex items-center mt-auto">
                  {testimonial.avatar && (
                    <Avatar className="mr-3">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback className="bg-secondaccent/20 text-secondaccent2">
                        {testimonial.author[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="font-medium text-foreground dark:text-white group-hover:text-yellow-600 transition-colors">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}