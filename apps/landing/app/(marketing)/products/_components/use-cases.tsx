import React from "react";
import { ArrowRight } from "lucide-react";

interface UseCase {
  title: string;
  details: string;
}

export function UseCasesDynamic({ useCases }: { useCases: UseCase[] }) {
  if (!useCases || useCases.length === 0) return null;

  return (
    <section className="py-24 bg-[#4361ee]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover What's Possible
          </h2>
          <p className="text-xl text-gray-600">
            Real-world applications that drive results
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-8"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#4361ee] to-[#3730a3] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#4361ee] transition-colors">
                {useCase.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {useCase.details}
              </p>
              
              <div className="flex items-center text-[#4361ee] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more 
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCasesDynamic;