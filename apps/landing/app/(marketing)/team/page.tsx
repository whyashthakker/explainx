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
  metadataBase: new URL("https://www.infloq.com"),
  title: "Team | Infloq - Building the Future of Influencer Marketing",
  description: "Meet the passionate team behind Infloq working to revolutionize influencer marketing through technology, transparency, and trust.",
  keywords: "Infloq team, Influencer Marketing, Performance Marketing, Content Creators, Yash Thakker, Startup Team, Marketing Technology Team",
  appLinks: {
    web: {
      url: "https://www.infloq.com/team",
      should_fallback: false,
    },
  },
  generator: "Infloq",
  referrer: "no-referrer-when-downgrade",
  authors: [
    {
      name: "Infloq Team",
      url: "https://www.infloq.com/team",
    }
  ],
  creator: 'Infloq',
  publisher: "Infloq",
  openGraph: {
    title: "Meet the Infloq Team | Building the Future of Influencer Marketing",
    description: "Get to know the passionate team behind Infloq working to revolutionize influencer marketing through technology, transparency, and trust.",
    url: "https://www.infloq.com/team",
    siteName: "Infloq - Performance-Based Influencer Marketing",
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
  category: "Marketing Technology",
};

const teamMembers = [
  {
    name: "Pratham Ware",
    role: "Marketing & Content",
    gender: "male",
  },
  {
    name: "Geeta Thakker",
    role: "Co-Founder & Marketing",
    gender: "female",
  },
  {
    name: "Shri Jadhav",
    role: "Sales & Support",
    gender: "female",
  },
  {
    name: "Aryan Nagbanshi",
    role: "Development Lead",
    gender: "male",
  },
  {
    name: "Yogesh Gaikwad",
    role: "Video Content Lead",
    gender: "male",
  },
  {
    name: "Yash Thakker",
    role: "Co-Founder & Product",
    gender: "male",
  },
] as const;

export default function TeamPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      {/* Hero section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1 className="font-cal text-4xl md:text-5xl">Meet Our Team</h1>
        <p className="text-muted-foreground max-w-[700px]">
          We're a passionate team dedicated to revolutionizing influencer marketing through 
          technology, transparency, and trust.
        </p>
        <div className="flex gap-4 mt-6">
          <Link href="https://brand.infloq.com/signup">
            <Button size="lg">Join as Brand</Button>
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
            We're building this because we feel that Influencer Marketing is broken. As the future of marketing unfolds, 
            we're committed to bringing order and transparency to this rapidly evolving space.
          </p>
          <p>
            Our platform aims to bridge the gap between creators and brands, fostering authentic connections 
            that benefit both parties while delivering real value to audiences.
          </p>
        </CardContent>
      </Card>

      <Separator className="my-16" />

      {/* Team members grid */}
      <div className="space-y-8">
        <h2 className="font-cal text-3xl text-center">The Team</h2>
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
          <CardTitle className="font-cal text-2xl text-center">Ready to Get Started?</CardTitle>
          <CardDescription className="text-center">
            Join our platform and be part of the revolution in influencer marketing.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Link href="https://creator.infloq.com/signup">
            <Button size="lg">Sign Up as Creator</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">Contact Us</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}