"use client";

import Image from "next/image";
import { VideoDemo } from "./video-demo";
import LogoStrip from "./logo-cloud";
import { CTAButtons } from "./cta-ab";
import { cn } from "@repo/ui/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "./animated-beam-demo";

export function HeroText(props: { children: React.ReactNode; className?: string; }) {
  const { className, ...rest } = props;
  return (
    <h1 className={cn("font-cal text-4xl sm:text-5xl lg:text-6xl text-gray-900", className)} {...rest} />
  );
}

export function HeroSubtitle(props: { children: React.ReactNode }) {
  return <p className="mt-6 text-xs sm:text-s leading-8 text-gray-500" {...props} />;
}

export const Heading = (props: {
  title?: string;
  subtitle?: string;
  image?: string;
}) => {
  return (
    <div className="relative heading"> 
      <div className="py-10 lg:py-20">
        <div className="mx-auto max-w-[90rem] px-6 lg:px-8"> {/* Increased max width */}
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left lg:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-cal font-bold text-gray-900 mb-6">
                Find Your Next Creator in Seconds
              </h1>
              <p className="text-xl text-gray-500 mb-8">
                Our AI matches you with the perfect creators for your brand, 
                from a network of thousands
              </p>
              <CTAButtons />
            </div>

            {/* Right Side - Animation */}
            <div className="w-full min-h-[600px] lg:min-h-[700px] overflow-visible"> {/* Added overflow-visible */}
              <AnimatedBeamMultipleOutputDemo />
            </div>
          </div>

          {/* Logo Strip */}
          <div className="mt-16">
            <LogoStrip />
          </div>

          {/* Video Demo Section */}
          <div className="mt-20">
            <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:p-4">
              <Image
                src={props.image || "/new_video_thumbnail.png"}
                alt="Product Demo"
                width={2432}
                height={1442}
                className="rounded-md shadow ring-1 ring-gray-900/10"
              />
              <VideoDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};