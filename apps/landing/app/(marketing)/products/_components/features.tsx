import { Sparkles, Zap, Star, Shield, Rocket, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
  link?: string;
}

const FEATURE_ICONS = [
  Sparkles,
  Zap,
  Star,
  Shield,
  Rocket,
  Heart
] as const;

export function FeaturesDynamic({ features }: { features: Feature[] }) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to succeed, in one place
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const CurrentIcon = FEATURE_ICONS[idx % FEATURE_ICONS.length];

            const content = (
              <div className="relative bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-[#4361ee]/10 flex items-center justify-center mb-6">
                  {CurrentIcon && <CurrentIcon className="h-6 w-6 text-[#4361ee]" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#4361ee] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
                {feature.link && (
                  <div className="flex items-center text-[#4361ee] font-medium mt-4 group-hover:translate-x-1 transition-transform">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </div>
            );

            const wrapperClass = `relative group ${feature.link ? 'cursor-pointer' : ''}`;

            return feature.link ? (
              <Link key={idx} href={feature.link} className={wrapperClass}>
                <div className="absolute -inset-px bg-gradient-to-r from-[#4361ee] to-[#3730a3] rounded-xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm" />
                {content}
              </Link>
            ) : (
              <div key={idx} className={wrapperClass}>
                <div className="absolute -inset-px bg-gradient-to-r from-[#4361ee] to-[#3730a3] rounded-xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm" />
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesDynamic;