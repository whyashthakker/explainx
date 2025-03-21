'use client';

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Users, ArrowRight } from "lucide-react";

export function CultureSection() {
  return (
    <Card className="mb-16 bg-background dark:bg-[#1A1A1A] border border-border dark:border-gray-800 hover:border-secondaccent dark:hover:border-secondaccent2 transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <Badge 
            variant="outline" 
            className="mb-2 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
          >
            <Users className="w-4 h-4 mr-1" />
            Company Values
          </Badge>
        </div>
        <CardTitle className="font-cal text-3xl text-center text-foreground dark:text-white">
          Our <span className=" ">Culture</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground max-w-3xl mx-auto px-8">
        <p className="text-lg">
          At ExplainX, we're pioneering the future of AI agents with a focus on innovation, 
          accessibility, and practical implementation. Our team consists of AI enthusiasts, 
          developers, and educators who believe in democratizing artificial intelligence 
          through powerful, user-friendly agents.
        </p>
        <p className="text-lg">
          We value technical excellence, continuous learning, and open collaboration. If you're 
          passionate about building cutting-edge AI solutions, teaching others, and contributing 
          to the growing ecosystem of AI agents, we want to work with you. Whether it's developing 
          new agents, improving our marketplace, or creating educational content, there's an 
          opportunity to make a significant impact.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pt-6 pb-8">
        <Link href="/team">
          <Button 
            className="border-secondaccent2/50 hover:border-secondaccent2 text-foreground dark:text-white hover:bg-secondaccent2/10 px-6 py-2 transition-all group"
            variant="outline"
          >
            Meet Our Team
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}