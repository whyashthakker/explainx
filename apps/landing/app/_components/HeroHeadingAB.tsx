"use client";
import React from "react";

export default function HeroHeadingAB() {
  const HeroAmplify = () => (
    <div className="flex flex-col items-center text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
      <div>Amplify your social</div>
      <div className="flex items-center">
        <span>Presence&nbsp;</span>
        <span className="relative inline-block">
          in days
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

// "use client";

// import React from "react";

// export default function HeroHeadingAB() {
//   const HeroAmplify = () => (
//     <div className="flex flex-col items-center text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
//       <div>Amplify your social</div>
//       <div className="flex items-center">
//         <span>Presence&nbsp;</span>
//         <span>in days,</span>
//       </div>
//       <div className="relative inline-block mt-4">
//         <span className="relative z-10 px-2 mx-2 text-white">not Months.</span>
//         <span className="absolute inset-x-0 top-[-0.5rem] bottom-0 bg-gray-900 transform -skew-y-1 z-0"></span>
//       </div>
//     </div>
//   );

//   return <HeroAmplify />;
// }
// Commented out A/B testing code
/*
import { Skeleton } from "@/components/ui/skeleton";
import { useFeatureFlagVariantKey, usePostHog } from "posthog-js/react";
import React, { useEffect, useState } from "react";

export default function HeroHeadingAB() {
  const [landingCopy, setLandingCopy] = useState<string>("");
  // const posthog = usePostHog();
  // posthog.featureFlags.override({'new_landing_copy': 'control'})  
  const variant = useFeatureFlagVariantKey(
    "new_landing_copy"
  );

  // console.log("variant", variant);

  useEffect(() => {
    if (variant === "test-1") {
      setLandingCopy("Become a brand, One comment at a time.");
    } else if (variant === "test-2") {
      setLandingCopy("With you in the Hustle, 24/7 🌟");
    } else if (variant === "test-3") {
      setLandingCopy("Helping you grow, One Comment at a Time.");
    } else if (variant === "test-4") {
      setLandingCopy("Goals achieved, only 10x Faster ✅");
    } else if (variant === "test-5") {
      setLandingCopy("Your Personal Social Media Growth Assistant.");
    } else if (variant === "test-6") {
      setLandingCopy("Never run out of Ideas for Posts & Comments, ever again.");
    } else if (variant === "test-7") {
      setLandingCopy("All of AI, to help you become a brand, fast.");
    } else if (variant === "test-8") {
      setLandingCopy("AI Agent that is more human than most humans.");
    } else if (variant === "control") {
      setLandingCopy("Your AI-Powered Second Brain 🧠");
    } else {
      setLandingCopy("Your AI-Powered Second Brain 🧠");
    }

    // console.log("variant", variant);

  }, [variant]);

  if (!variant && process.env.NEXT_PUBLIC_POSTHOG_KEY)
    return <Skeleton className="h-28 w-full rounded" />;

  return <>{landingCopy}</>;
}
*/