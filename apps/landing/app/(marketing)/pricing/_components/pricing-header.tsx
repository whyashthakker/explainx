import { Badge } from "@repo/ui/components/ui/badge";

export function PricingHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-16">
      <Badge variant="secondary" className="mb-4">
        Simple & Transparent Pricing
      </Badge>
      <h1 className="font-cal text-4xl md:text-5xl mb-4">
        Pay Only For Results
      </h1>
      <p className="text-muted-foreground max-w-[700px] text-lg">
        No monthly fees, no surprises. Purchase credits and use them for campaigns.
        Credits never expire, and you only pay for actual engagement.
      </p>
    </div>
  );
}