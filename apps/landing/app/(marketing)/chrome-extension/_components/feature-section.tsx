import { Card } from "@repo/ui/components/ui/card";
import { BadgeCheck, Gauge, Users, Shield } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Gauge className="w-6 h-6 text-primary" />,
      title: "Real-Time Analytics",
      description: "Get instant access to engagement rates, reach metrics, and audience growth trends."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Audience Insights",
      description: "Analyze follower demographics, authenticity scores, and audience quality metrics."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Authenticity Check",
      description: "Detect fake followers and engagement manipulation with our advanced AI."
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-primary" />,
      title: "Performance History",
      description: "Track creator performance trends and content effectiveness over time."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start space-x-4">
            <div>{feature.icon}</div>
            <div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
