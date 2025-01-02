"use client";

import Image from "next/image";
import { VideoDemo } from "./video-demo";
import LogoStrip from "./logo-cloud";
import { CTAButtons } from "./cta-ab";
import { cn } from "@repo/ui/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "./animated-beam-demo";
import { CTAButtonsProducts } from "./cta-products";
import { SquaresPattern } from "./squares-pattern";

export const Heading = (props: {
  title?: string;
  subtitle?: string;
  image?: string;
}) => {
  const { title, subtitle, image } = props;
  const hasHeadingProps = !!(title || subtitle || image);

  if (hasHeadingProps) {
    return (
      <div className="relative overflow-hidden">
        <SquaresPattern />
        <div className="relative pt-15 md:pt-12 pb-6 md:py-10 lg:py-20">
          <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-cal font-bold text-gray-900 mb-4 mt-12 md:mt-0 md:mb-6">
                {title ?? "Find Your Next Creator in Seconds"}
              </h1>
              <p className="text-xs md:text-xl text-gray-500 mb-8 md:mb-8">
                {subtitle ??
                  "Our AI matches you with the perfect creators for your brand, from a network of thousands"}
              </p>
              <CTAButtonsProducts />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <SquaresPattern />
      <div className="relative pt-15 md:pt-12 pb-6 md:py-10 lg:py-20">
        <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5 text-left lg:pr-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-cal font-bold text-gray-900 mb-4 mt-12 md:mt-0 md:mb-6 text-center lg:text-start">
                Find Your Next Creator in Seconds
              </h1>
              <p className="text-xs md:text-xl text-gray-500 mb-8 md:mb-8 text-center lg:text-start">
                Our AI matches you with the perfect creators for your brand,
                from a network of thousands
              </p>
              <CTAButtons />
            </div>

            <div className="lg:col-span-7 w-full min-h-[300px] md:min-h-[600px] lg:min-h-[700px] overflow-visible mt-4 md:mt-0">
              <AnimatedBeamMultipleOutputDemo />
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
    <h1
      className={cn(
        "font-cal text-3xl md:text-4xl lg:text-6xl text-gray-900",
        className
      )}
      {...rest}
    />
  );
}

export function HeroSubtitle(props: { children: React.ReactNode }) {
  return (
    <p
      className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg leading-7 md:leading-8 text-gray-500"
      {...props}
    />
  );
}