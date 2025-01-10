import React from "react";
import Link from "next/link";
import type { LucideProps } from "lucide-react";
import { Users, Target, Briefcase, ChartBar, Building, Award, ArrowRight } from "lucide-react";

interface Audience {
  role: string;
  benefits: string;
  link?: string;
}

const AUDIENCE_ICONS = [
  Users,
  Target,
  Briefcase,
  ChartBar,
  Building,
  Award
] as const;

export function TargetAudienceDynamic({
  targetAudience,
}: {
  targetAudience: Audience[];
}) {
  if (!targetAudience || targetAudience.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built For Everyone
          </h2>
          <p className="text-xl text-gray-600">
            Discover how ExplainX can help your role
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {targetAudience.map((audience, idx) => {
            const CurrentIcon = AUDIENCE_ICONS[idx % AUDIENCE_ICONS.length];

            const content = (
              <div className="bg-white rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-lg bg-[#4361ee]/10 flex items-center justify-center">
                    {CurrentIcon && <CurrentIcon className="h-6 w-6 text-[#4361ee]" />}
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-[#4361ee] transition-colors">
                    {audience.role}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {audience.benefits}
                  </p>
                  
                  {audience.link && (
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[#4361ee] font-medium group-hover:text-[#3730a3] transition-colors">
                        Learn more about {audience.role.toLowerCase()}
                      </span>
                      <ArrowRight className="h-5 w-5 text-[#4361ee] group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );

            const className = `relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-1 group hover:from-[#4361ee]/20 hover:to-[#3730a3]/20 transition-colors duration-300 ${audience.link ? 'cursor-pointer' : ''}`;

            return audience.link ? (
              <Link key={idx} href={audience.link} className={className}>
                {content}
              </Link>
            ) : (
              <div key={idx} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
