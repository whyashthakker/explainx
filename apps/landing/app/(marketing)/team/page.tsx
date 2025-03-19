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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.explainx.ai"),
  title: "Team | ExplainX - Leading AI Agents Development Agency",
  description: "Meet the expert team behind ExplainX working to revolutionize business automation through custom AI agents, LangChain integration, and intelligent solutions.",
  keywords: [
    "ai development team",
    "ai agents experts",
    "langchain developers",
    "crewai specialists",
    "ai automation team",
    "custom ai solutions team",
    "ai development agency",
    "enterprise ai experts",
    "ai agents engineers",
    "technical ai team",
    "automation specialists"
  ].join(", "),
  appLinks: {
    web: {
      url: "https://www.explainx.ai/team",
      should_fallback: false,
    },
  },
  generator: "ExplainX",
  referrer: "no-referrer-when-downgrade",
  authors: [
    {
      name: "ExplainX AI Development Team",
      url: "https://www.explainx.ai/team",
    }
  ],
  creator: "ExplainX",
  publisher: "ExplainX",
  openGraph: {
    title: "Meet the ExplainX Team | AI Agents Development Experts",
    description: "Get to know the technical team behind ExplainX developing custom AI solutions and automation tools for businesses.",
    url: "https://www.explainx.ai/team",
    siteName: "ExplainX - AI Agents Development Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico"
  },
  category: "Technology",
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
    <div className="container max-w-7xl mx-auto px-6 py-12 mt-16">
      {/* Hero section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1 className="font-cal text-4xl md:text-5xl">Meet Our AI Development Team</h1>
        <p className="text-muted-foreground max-w-[700px]">
          We're a team of AI specialists dedicated to revolutionizing business operations through 
          custom AI agents and intelligent automation solutions.
        </p>
        <div className="flex gap-4 mt-6">
          <Link href="/demo">
            <Button size="lg">Schedule Demo</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </div>

      {/* Mission section */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="font-cal text-2xl text-center">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            We're building AI solutions because we believe business automation is entering a new era. As AI technology evolves, 
            we're committed to making intelligent automation accessible and effective for businesses of all sizes.
          </p>
          <p>
            Our platform aims to bridge the gap between complex AI technologies and practical business needs, creating 
            custom solutions that deliver measurable value and drive innovation.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-16" />

      {/* Team members grid */}
      <div className="space-y-8 mt-16">
        <h2 className="font-cal text-3xl text-center">The Technical Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>

      <Separator className="my-16" />

      {/* CTA section */}
      <Card className="bg-primary-foreground">
        <CardHeader>
          <CardTitle className="font-cal text-2xl text-center">Ready to Transform Your Business?</CardTitle>
          <CardDescription className="text-center">
            Partner with us to develop custom AI solutions for your organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Link href="/contact">
            <Button size="lg">Contact Our Team</Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg">Book a Demo</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}