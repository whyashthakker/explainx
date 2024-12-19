"use client";
import React from "react";

export default function HeroHeadingAB() {
  const HeroAmplify = () => (
    <div className="flex flex-col items-center text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
      <div>Find the Right Influencer for your</div>
      <div className="flex items-center">
        <span>Product&nbsp;</span>
        <span className="relative inline-block">
          in minutes
          <span className="absolute left-0 bottom-[-0.2em] w-full h-[0.2em] bg-[#33dfa0]"></span>
        </span>.
        
      </div>
      {/* <div className="mt-4">
        <span>
          Not Months
        </span>
        .
      </div> */}
    </div>
  );
  return <HeroAmplify />;
}