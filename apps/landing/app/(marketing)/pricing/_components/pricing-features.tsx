import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@repo/ui/components/ui/card";
  import { Check } from "lucide-react";
  
  export function PricingFeatures() {
    const features = [
      {
        title: "Credit System",
        description: "100 credits = $10. Purchase credits in advance and use them as needed.",
        items: [
          "Credits never expire",
          "Flexible spending based on campaign needs",
          "Top-up anytime",
          "Volume discounts available"
        ]
      },
      {
        title: "Performance Pricing",
        description: "Pay only for actual engagement and results.",
        items: [
          "Cost per click/engagement varies by influencer",
          "Pricing based on real audience quality",
          "Additional credits for viral content",
          "Complete pricing transparency"
        ]
      },
      {
        title: "Campaign Management",
        description: "Everything you need to run successful campaigns.",
        items: [
          "One-time onboarding fee",
          "AI-powered influencer matching",
          "Real-time analytics dashboard",
          "Dedicated support team"
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