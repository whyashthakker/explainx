// app/about/_components/hero-section.tsx
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="text-center space-y-6">
      <h1 className="font-cal text-4xl md:text-5xl lg:text-6xl">
        Our Journey
      </h1>
      <p className="text-muted-foreground max-w-[700px] mx-auto text-lg">
        From content creation to building tools that empower creators globally.
        This is the story of how Infloq came to be.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/careers">
          <Button size="lg">Work With Us</Button>
        </Link>
        <Link href="/team">
          <Button variant="outline" size="lg">Meet the Team</Button>
        </Link>
      </div>
    </div>
  );
}