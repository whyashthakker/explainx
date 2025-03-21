// app/careers/_components/contact-cta.tsx
'use client';

import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Send } from "lucide-react";

export function ContactCTA() {
  return (
    <Card className="mt-16 bg-background dark:bg-[#1A1A1A] border border-border dark:border-gray-800 hover:border-secondaccent dark:hover:border-secondaccent2 transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <Badge 
            variant="outline" 
            className="mb-2 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
          >
            Open Applications
          </Badge>
        </div>
        <CardTitle className="font-cal text-3xl text-center text-foreground dark:text-white">
          Don't see a <span className=" ">perfect fit</span>?
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground text-lg max-w-lg mx-auto">
          We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-8">
        <Link href="mailto:careers@explainx.ai">
          <Button 
            size="lg"
            className="bg-secondaccent2 hover:bg-yellow-600 text-black font-medium px-8 py-4 h-auto transition-colors"
          >
            Get in Touch
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}