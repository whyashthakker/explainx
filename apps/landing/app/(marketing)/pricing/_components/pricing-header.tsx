import { Badge } from "@repo/ui/components/ui/badge";

export function PricingHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-16">
      <Badge variant="secondary" className="mb-4">
        Simple & Transparent Pricing
      </Badge>
      <h1 className="font-cal text-4xl md:text-5xl mb-4">
        Find & Pay Influencers By Performance
      </h1>
      <p className="text-muted-foreground max-w-[700px] text-lg">
        Start for free, upgrade as you grow. Pay influencers based on their actual performance,
        with credits that never expire.
      </p>
    </div>
  );
}