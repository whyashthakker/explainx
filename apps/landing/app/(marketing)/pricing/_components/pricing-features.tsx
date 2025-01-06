import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Check } from "lucide-react";

export function PricingFeatures() {
  const features = [
    {
      title: "Performance-Based Pricing",
      description: "Pay only for actual engagement and results",
      items: [
        "Credits based on influencer views",
        "Refunds for overperforming content",
        "Transparent pricing per platform",
        "No hidden fees"
      ]
    },
    {
      title: "Platform Features",
      description: "Everything you need to run successful campaigns",
      items: [
        "Verified influencers only",
        "AI-powered matching",
        "Real-time analytics",
        "Multi-platform support"
      ]
    },
    {
      title: "Campaign Management",
      description: "Tools to maximize your ROI",
      items: [
        "Easy campaign creation",
        "Automated payments",
        "Performance tracking",
        "Content approval system"
      ]
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-16">
      {features.map((feature) => (
        <Card key={feature.title} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {feature.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}