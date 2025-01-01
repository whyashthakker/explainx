// app/careers/_components/contact-cta.tsx
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
    <Card className="mt-16 bg-primary-foreground">
      <CardHeader>
        <CardTitle className="font-cal text-2xl text-center">Don't see a perfect fit?</CardTitle>
        <CardDescription className="text-center">
          We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Link href="mailto:careers@infloq.com">
          <Button variant="outline" size="lg">
            Get in Touch
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}