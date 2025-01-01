// app/careers/_components/culture-section.tsx
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";

export function CultureSection() {
  return (
    <Card className="mb-16">
      <CardHeader>
        <CardTitle className="font-cal text-2xl text-center">Our Culture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          At Infloq, we're building the future of influencer marketing with a focus on transparency, 
          performance, and authentic connections. Our team consists of passionate individuals who 
          believe in the power of content creators to shape the future of digital marketing.
        </p>
        <p>
          We value initiative, creativity, and a growth mindset. If you're excited about working 
          in a fast-paced startup environment and making a real impact in the creator economy, 
          we'd love to hear from you.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pt-4">
        <Link href="/team">
          <Button variant="outline">
            Meet Our Team →
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}