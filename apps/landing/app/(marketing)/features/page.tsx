import { featuresData } from "../../../data/features";
import { FeatureCard } from "./_components/feature-card";

export default function FeaturesPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="pt-24 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-cal font-bold tracking-tight text-gray-900 sm:text-6xl">
                {featuresData.title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                {featuresData.description}
              </p>
            </div>
            
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {featuresData.categories.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }