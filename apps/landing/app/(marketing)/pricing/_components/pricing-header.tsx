import { Badge } from "@repo/ui/components/ui/badge";

export function PricingHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-16 mt-16">
      <Badge variant="secondary" className="mb-4">
        Simple & Transparent Pricing
      </Badge>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4">
        Find & Pay <span className=" ">Influencers</span> By
        <br />
        <span className=" ">Performance</span>
      </h1>
      <p className="text-muted-foreground max-w-[700px] mt-6">
        Start for free, upgrade as you grow. Pay influencers based on their actual performance,
        with credits that never expire.
      </p>
    </div>
  );
}