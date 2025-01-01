import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

export function ContactCTA() {
  return (
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardTitle className="font-cal text-2xl text-center">
          Ready to get started?
        </CardTitle>
        <CardDescription className="text-center">
          Talk to our team about your campaign goals and get a personalized quote.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center gap-4">
        <Link href="/contact">
          <Button variant="default" size="lg">
            Contact Sales
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" size="lg">
            Create Account
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}