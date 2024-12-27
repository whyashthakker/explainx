import React from "react";
import { ArrowRight } from "lucide-react";

interface HeadingProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

export function HeadingDynamic({ title, subtitle, image }: HeadingProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-20 md:pt-24 pb-16 md:pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 tracking-tight">
              {title ?? "Find Your Next Creator in Seconds"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              {subtitle ?? 
                "Our AI matches you with the perfect creators for your brand, from a network of thousands"}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#4361ee] rounded-lg hover:bg-[#3730a3] transition-colors duration-200 shadow-lg hover:shadow-xl hover:shadow-[#4361ee]/20">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:text-[#4361ee] transition-colors duration-200">
                See How It Works
              </button>
            </div>

            {image && (
              <div className="mt-12 relative max-w-5xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                <img
                  src={image}
                  alt="Hero illustration"
                  className="w-full rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4361ee] to-[#3730a3] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#3730a3] to-[#4361ee] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}

export default HeadingDynamic;