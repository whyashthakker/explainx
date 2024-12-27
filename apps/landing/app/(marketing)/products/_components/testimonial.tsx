import React from "react";

interface SimpleTestimonial {
  quote: string;
  author: string;
}

interface FeaturedTestimonial {
  body: string;
  author: {
    name: string;
    handle: string;
    imageUrl: string;
    logoUrl?: string;
  };
}

interface TestimonialsDynamicProps {
  featuredTestimonial?: FeaturedTestimonial;
  testimonials?: SimpleTestimonial[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

function AvatarLetter({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  const colors = [
    'bg-teal-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={`w-10 h-10 rounded-full ${randomColor} flex items-center justify-center text-white font-semibold text-lg`}>
      {letter}
    </div>
  );
}

export function TestimonialsDynamic({
  featuredTestimonial,
  testimonials,
  sectionTitle = "What People Are Saying",
  sectionSubtitle = "Hear from our satisfied customers"
}: TestimonialsDynamicProps) {
  if (!featuredTestimonial && (!testimonials || testimonials.length === 0)) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {sectionSubtitle}
          </p>
        </div>

        <div className="space-y-16">
          {featuredTestimonial && (
            <div className="bg-white rounded-2xl shadow-xl p-8 relative">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-t-2xl" />
              <div className="relative pt-8">
                <div className="flex items-center">
                  <AvatarLetter name={featuredTestimonial.author.name} />
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      {featuredTestimonial.author.name}
                    </div>
                    <div className="text-gray-600">
                      @{featuredTestimonial.author.handle}
                    </div>
                  </div>
                </div>
                <blockquote className="mt-8 text-xl text-gray-900 leading-8">
                  "{featuredTestimonial.body}"
                </blockquote>
              </div>
            </div>
          )}

          {testimonials && testimonials.length > 0 && (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-6">
                    <AvatarLetter name={testimonial.author} />
                    <div className="ml-4 font-medium text-gray-900">
                      {testimonial.author}
                    </div>
                  </div>
                  <blockquote className="text-gray-700 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsDynamic;