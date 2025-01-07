import { Card } from "@repo/ui/components/ui/card";
import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { FeatureCategory } from "../../../../data/features";

interface FeatureDetailProps {
  feature: FeatureCategory;
}

export function FeatureDetail({ feature }: FeatureDetailProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-cal font-bold tracking-tight text-gray-900 sm:text-6xl">
            {feature.title}
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            {feature.description}
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/demo">
                See it in action
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        {feature.image && (
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Benefits Section */}
      {feature.benefits && (
        <div className="py-12">
          <h2 className="text-3xl font-cal font-bold text-gray-900 mb-8">
            Key Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {feature.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <p className="text-gray-600">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="py-12">
        <h2 className="text-3xl font-cal font-bold text-gray-900 mb-8">
          Features Included
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {feature.features.map((subFeature, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{subFeature.title}</h3>
              <p className="text-gray-600 mb-4">{subFeature.description}</p>
              {subFeature.link && (
                <Button variant="outline" asChild>
                  <Link href={subFeature.link}>
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
