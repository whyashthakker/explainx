"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface Logo {
  src: string;
  alt: string;
}

export function LogoCloud() {
  const logos: Logo[] = [
    { src: "/images/brand-logos/appsumo.png", alt: "AppSumo" },
    { src: "/images/brand-logos/benefits-logo.png", alt: "Benefits" },
    { src: "/images/brand-logos/google-logo.png", alt: "Google" },
    { src: "/images/brand-logos/level-365.png", alt: "Level 365" },
    { src: "/images/brand-logos/ms-logo.png", alt: "Microsoft" },
    { src: "/images/brand-logos/msn-logo.png", alt: "MSN" },
    { src: "/images/brand-logos/secret-alchemist-logo-india.png", alt: "Secret Alchemist" },
    { src: "/images/brand-logos/snapy-ai-logo.png", alt: "Snapy AI" },
    { src: "/images/brand-logos/viprata.png", alt: "Viprata" },
    { src: "/images/brand-logos/lab316.png", alt: "Lab 316" },
    { src: "/images/brand-logos/time-keepers.png", alt: "TimeKeepers Logo" },
    { src: "/images/brand-logos/matax.png", alt: "Matax Logo" },
    { src: "/images/brand-logos/r-royale.png", alt: "Rummathon Royale Logo" },
    { src: "/images/brand-logos/explainxai.png", alt: "Explainx AI Logo" },
  ];

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
      <h2 className="text-center font-cal text-2xl leading-8 text-gray-900">
        Trusted by the best companies & agencies around the World
      </h2>
      
      <div 
        className="relative mt-10 h-24 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={`logos-scroll flex ${isHovered ? 'paused' : ''}`}
          style={{
            // Making the container twice as wide to fit both sets of logos
            width: `${logos.length * 160 * 2}px`,
            animation: 'scroll 40s linear infinite'
          }}
        >
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div 
              key={`logo-1-${index}`}
              className="flex-shrink-0 w-32 h-20 mx-4 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                style={{ height: '40px', width: 'auto' }}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                priority
              />
            </div>
          ))}
          
          {/* Second set of logos */}
          {logos.map((logo, index) => (
            <div 
              key={`logo-2-${index}`}
              className="flex-shrink-0 w-32 h-20 mx-4 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                style={{ height: '40px', width: 'auto' }}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                priority
              />
            </div>
          ))}
        </div>
        
        {/* Gradient fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logos-scroll {
          display: flex;
          position: relative;
        }

        .logos-scroll.paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default LogoCloud;