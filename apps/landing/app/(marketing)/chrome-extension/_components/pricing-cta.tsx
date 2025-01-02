import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export function PricingCTA() {
  return (
    <Card className="mt-16 bg-primary-foreground">
      <CardHeader>
        <CardTitle className="font-cal text-2xl text-center">
          Start Analyzing Creators for Free
        </CardTitle>
        <CardDescription className="text-center">
          Get started with our free Chrome extension today. Upgrade anytime for advanced features and unlimited analytics.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center space-x-4">
        <a 
          href="https://chrome.google.com/webstore/detail/infloq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="default" size="lg">
            Install Extension
          </Button>
        </a>
        <a href="/pricing">
          <Button variant="outline" size="lg">
            View Pricing
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}