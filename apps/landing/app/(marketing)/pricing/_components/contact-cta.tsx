import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

export function ContactCTA() {
  return (
    <Card className="bg-primary-foreground">
      <CardHeader>
        <CardTitle className="font-cal text-2xl text-center">
          Ready to start your first campaign?
        </CardTitle>
        <CardDescription className="text-center">
          Get started for free or talk to our team about your campaign goals
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center gap-4">
        <Link href="/signup">
          <Button variant="default" size="lg">
            Start For Free
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline" size="lg">
            Talk to Sales
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}