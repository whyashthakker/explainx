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
          At ExplainX, we're pioneering the future of AI agents with a focus on innovation, 
          accessibility, and practical implementation. Our team consists of AI enthusiasts, 
          developers, and educators who believe in democratizing artificial intelligence 
          through powerful, user-friendly agents.
        </p>
        <p>
          We value technical excellence, continuous learning, and open collaboration. If you're 
          passionate about building cutting-edge AI solutions, teaching others, and contributing 
          to the growing ecosystem of AI agents, we want to work with you. Whether it's developing 
          new agents, improving our marketplace, or creating educational content, there's an 
          opportunity to make a significant impact.
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