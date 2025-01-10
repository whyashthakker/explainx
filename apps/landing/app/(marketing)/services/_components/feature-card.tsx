import { Card } from "@repo/ui/components/ui/card";
import Link from "next/link";
import { FeatureCategory } from "../../../../data/features";

export function FeatureCard({ feature }: { feature: FeatureCategory }) {
    return (
      <Link href={`/services/${feature.slug}`}>
        <Card className="p-6 h-full hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </Card>
      </Link>
    );
  }