import type { Metadata } from "next";
import { TeamMember } from "./_components/team-member";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Separator } from "@repo/ui/components/ui/separator";
import { Badge } from "@repo/ui/components/ui/badge";
import { Users, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.explainx.ai"),
  title: "Team | ExplainX - Leading AI Agents Development Agency",
  description: "Meet the expert team behind ExplainX working to revolutionize business automation through custom AI agents, LangChain integration, and intelligent solutions.",
  // Other metadata stays the same
};

const teamMembers = [
  {
    name: "Pratham Ware",
    role: "AI Solutions Architect",
    gender: "male",
  },
  {
    name: "Geeta Thakker",
    role: "Co-Founder & Technology",
    gender: "female",
  },
  {
    name: "Shri Jadhav",
    role: "Technical Implementation Lead",
    gender: "female",
  },
  {
    name: "Aryan Nagbanshi",
    role: "AI Development Lead",
    gender: "male",
  },
  {
    name: "Yogesh Gaikwad",
    role: "Integration Specialist",
    gender: "male",
  },
  {
    name: "Yash Thakker",
    role: "Co-Founder & Product Strategy",
    gender: "male",
  },
] as const;

export default function TeamPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12 mt-16 bg-background dark:bg-[#0A0A0A]">
      {/* Hero section */}
      <div className="flex flex-col items-center text-center space-y-6 mb-16">
        <Badge 
          variant="outline" 
          className="mb-2 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
        >
          <Users className="w-4 h-4 mr-1" />
          Our Team
        </Badge>
        <h1 className="font-cal text-4xl md:text-5xl text-foreground dark:text-white">
          Meet Our <span className=" ">AI Development</span> Team
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
          We're a team of AI specialists dedicated to revolutionizing business operations through 
          custom AI agents and intelligent automation solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/demo">
            <Button 
              size="lg"
              className="bg-secondaccent2 hover:bg-yellow-600 text-black font-medium px-8 py-4 h-auto"
            >
              Schedule Demo
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondaccent2/50 hover:border-secondaccent2 text-foreground dark:text-white hover:bg-secondaccent2/10 px-8 py-4 h-auto"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Mission section */}
      <Card className="mb-16 bg-background dark:bg-[#1A1A1A] border border-border dark:border-gray-800 hover:border-secondaccent dark:hover:border-secondaccent2 transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Badge 
              variant="outline" 
              className="mb-2 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
            >
              Our Purpose
            </Badge>
          </div>
          <CardTitle className="font-cal text-3xl text-center text-foreground dark:text-white">
            Our <span className=" ">Mission</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground max-w-3xl mx-auto px-8">
          <p className="text-lg">
            We're building AI solutions because we believe business automation is entering a new era. As AI technology evolves, 
            we're committed to making intelligent automation accessible and effective for businesses of all sizes.
          </p>
          <p className="text-lg">
            Our platform aims to bridge the gap between complex AI technologies and practical business needs, creating 
            custom solutions that deliver measurable value and drive innovation.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-16 bg-gray-200 dark:bg-gray-800" />

      {/* Team members grid */}
      <div className="space-y-8 mt-16">
        <div className="text-center">
          <Badge 
            variant="outline" 
            className="mb-4 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
          >
            <Users className="w-4 h-4 mr-1" />
            Meet The Experts
          </Badge>
          <h2 className="font-cal text-3xl text-center text-foreground dark:text-white">
            The <span className=" ">Technical</span> Team
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>

      <Separator className="my-16 bg-gray-200 dark:bg-gray-800" />

      {/* CTA section */}
      <Card className="bg-background dark:bg-[#1A1A1A] border border-border dark:border-gray-800 hover:border-secondaccent dark:hover:border-secondaccent2 transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Badge 
              variant="outline" 
              className="mb-2 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
            >
              Get Started
            </Badge>
          </div>
          <CardTitle className="font-cal text-3xl text-center text-foreground dark:text-white">
            Ready to <span className=" ">Transform</span> Your Business?
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground text-lg">
            Partner with us to develop custom AI solutions for your organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-center gap-4 pb-8">
          <Link href="/contact">
            <Button 
              size="lg"
              className="bg-secondaccent2 hover:bg-yellow-600 text-black font-medium px-8 py-4 h-auto transition-colors group"
            >
              Contact Our Team
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button 
              variant="outline" 
              size="lg"
              className="border-secondaccent2/50 hover:border-secondaccent2 text-foreground dark:text-white hover:bg-secondaccent2/10 px-8 py-4 h-auto"
            >
              Book a Demo
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}