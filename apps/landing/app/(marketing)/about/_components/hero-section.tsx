import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="text-center space-y-6">
      <h1 className="font-cal text-4xl md:text-5xl lg:text-6xl">
        Pioneering AI Agents
      </h1>
      <p className="text-muted-foreground max-w-[700px] mx-auto text-lg">
        Building the future of AI agents for businesses and developers. From custom AI solutions 
        to open-source tools, we're revolutionizing how teams interact with artificial intelligence.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/demo">
          <Button size="lg">Explore AI Agents</Button>
        </Link>
        <Link href="/demo">
          <Button variant="outline" size="lg">Build With Us</Button>
        </Link>
      </div>
    </div>
  );
}