import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '@repo/ui/components/ui/avatar';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

interface UseCaseTestimonialsProps {
  testimonials: Testimonial[];
}

export function UseCaseTestimonials({ testimonials }: UseCaseTestimonialsProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by businesses worldwide
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col justify-between bg-white p-8 shadow-lg ring-1 ring-gray-900/5 sm:p-10">
                <div>
                  <div className="flex items-center gap-x-4">
                    <Avatar className="h-12 w-12">
                      {testimonial.image ? (
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.author}
                        />
                      ) : null}
                      <AvatarFallback className="bg-gray-100 text-gray-900">
                        {getInitials(testimonial.author)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        {testimonial.author}
                      </h3>
                      <p className="text-sm leading-6 text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-6 text-base   leading-7 text-gray-700">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseCaseTestimonials;