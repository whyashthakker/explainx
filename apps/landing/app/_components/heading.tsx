"use client";

import Image from "next/image";
import { VideoDemo } from "./video-demo";
import LogoStrip from "./logo-cloud";
import { CTAButtons } from "./cta-ab";
import { cn } from "@repo/ui/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "./animated-beam-demo";

export const Heading = (props: {
  title?: string;
  subtitle?: string;
  image?: string;
}) => {
  return (
    <div className="relative heading"> 
      <div className="py-6 md:py-10 lg:py-20">
        <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8"> {/* Increased max-width */}
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16 items-center"> {/* Changed to 12 columns grid */}
            {/* Left Side - Text Content - Takes less space */}
            <div className="lg:col-span-5 text-left lg:pr-8"> {/* Reduced to 4 columns */}
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-cal font-bold text-gray-900 mb-4 md:mb-6">
                Find Your Next Creator in Seconds
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-6 md:mb-8">
                Our AI matches you with the perfect creators for your brand, 
                from a network of thousands
              </p>
              <CTAButtons />
            </div>

            {/* Right Side - Animation - Takes more space */}
            <div className="lg:col-span-7 w-full min-h-[400px] md:min-h-[600px] lg:min-h-[700px] overflow-visible"> {/* Increased to 8 columns */}
              <AnimatedBeamMultipleOutputDemo />
            </div>
          </div>

          {/* Logo Strip */}
          <div className="mt-8 md:mt-12 lg:mt-16">
            <LogoStrip />
          </div>

          {/* Video Demo Section */}
          <div className="mt-12 md:mt-16 lg:mt-20">
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

export function HeroText(props: { children: React.ReactNode; className?: string; }) {
  const { className, ...rest } = props;
  return (
    <h1 className={cn("font-cal text-3xl md:text-4xl lg:text-6xl text-gray-900", className)} {...rest} />
  );
}

export function HeroSubtitle(props: { children: React.ReactNode }) {
  return <p className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg leading-7 md:leading-8 text-gray-500" {...props} />;
}