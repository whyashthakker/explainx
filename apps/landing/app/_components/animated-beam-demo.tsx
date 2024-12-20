"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import { AnimatedBeam } from "./magicui/animated-beam";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Twitch, 
  User,
  DollarSign,
  Users,
  BarChart3,
  Building2,
  Facebook,
  Linkedin,
  SparkleIcon,
  Wand
} from 'lucide-react';

interface MetricData {
  roi: string;
  engagement: string;
  views: string;
  delay: number;
  platform: string;
}

interface CircleProps {
  className?: string;
  children?: React.ReactNode;
  metrics?: MetricData;
  showMetrics?: boolean;
  index?: number;
}

interface MetricBadgeProps {
  metrics: MetricData;
  delay: number;
}

const MinimalMetricBadge: React.FC<MetricBadgeProps> = ({ metrics }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className="absolute -top-2 -translate-y-full left-[80%] z-[100] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 p-2 w-32"
  >
    <div className="text-sm">
      <div className="flex items-center justify-between mb-1">
        <DollarSign className="w-3.5 h-3.5 text-green-600" />
        <span className="font-bold text-green-600">{metrics.roi}</span>
      </div>
      <div className="flex items-center justify-between">
        <Users className="w-3.5 h-3.5 text-blue-600" />
        <span className="font-medium">{metrics.engagement}</span>
      </div>
    </div>
  </motion.div>
);

// Add a central animation controller
const useMetricAnimation = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const showNext = () => {
      setActiveIndex(prev => {
        const nextIndex = Math.floor(Math.random() * 5); // 5 creators
        return nextIndex;
      });
    };

    // Initial delay
    const timer = setTimeout(showNext, 2000);

    // Set up interval
    const interval = setInterval(showNext, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return activeIndex;
};

const Circle = forwardRef<HTMLDivElement, CircleProps>(
  ({ className, children, metrics, showMetrics, index }, ref) => {
    const activeIndex = useMetricAnimation();
    const isVisible = activeIndex === index && metrics && showMetrics;

    return (
      <div 
        className="relative" 
        ref={ref}
      >
        <div
          className={cn(
            "flex size-16 items-center justify-center rounded-full border-2 border-border p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] hover:scale-110 transition-transform",
            "z-0",
            className,
          )}
        >
          {children}
        </div>
        <AnimatePresence>
          {isVisible && <MinimalMetricBadge metrics={metrics} delay={0} />}
        </AnimatePresence>
      </div>
    );
  }
);

Circle.displayName = "Circle";

const creatorMetrics: MetricData[] = [
  {
    roi: "3.2x",
    engagement: "4.8%",
    views: "15.2K",
    delay: 2.2,
    platform: "Instagram"
  },
  {
    roi: "4.1x",
    engagement: "6.2%",
    views: "25.3K",
    delay: 2.4,
    platform: "Youtube"
  },
  {
    roi: "2.5x",
    engagement: "3.2%",
    views: "8.7K",
    delay: 2.6,
    platform: "Twitter"
  },
  {
    roi: "5.2x",
    engagement: "8.5%",
    views: "32.1K",
    delay: 2.8,
    platform: "Twitch"
  },
  {
    roi: "6.8x",
    engagement: "12.5%",
    views: "45.3K",
    delay: 3.0,
    platform: "TikTok"
  }
];

interface AnimatedBeamDemoProps {
  className?: string;
}

const creatorSocialConnections = {
  0: [0, 4], // Creator 1 connects to Instagram and Twitter
  1: [2, 0], // Creator 2 connects to Youtube and Facebook
  2: [0, 4], // Creator 3 connects to Twitter and LinkedIn
  3: [3, 4], // Creator 4 connects to Instagram and Youtube
  4: [0, 1], // Creator 5 connects to Youtube and Twitter
};

export function AnimatedBeamMultipleOutputDemo({ className }: AnimatedBeamDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // All refs with proper type assertion
  const brand1Ref = useRef<HTMLDivElement>(null);
  const brand2Ref = useRef<HTMLDivElement>(null);
  const brand3Ref = useRef<HTMLDivElement>(null);
  const social1Ref = useRef<HTMLDivElement>(null);
  const social2Ref = useRef<HTMLDivElement>(null);
  const social3Ref = useRef<HTMLDivElement>(null);
  const social4Ref = useRef<HTMLDivElement>(null);
  const social5Ref = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const creator1Ref = useRef<HTMLDivElement>(null);
  const creator2Ref = useRef<HTMLDivElement>(null);
  const creator3Ref = useRef<HTMLDivElement>(null);
  const creator4Ref = useRef<HTMLDivElement>(null);
  const creator5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const timer = setTimeout(() => setShowMetrics(true), 2000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Helper function to ensure ref is not undefined
  const getValidRef = (ref: React.RefObject<HTMLDivElement>) => ref as React.RefObject<HTMLElement>;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={cn(
          "relative flex h-[400px] md:h-[600px] lg:h-[700px] w-full max-w-[1400px] items-center justify-center overflow-hidden px-2 md:px-4 py-10 md:py-20",
          className,
        )}
        ref={containerRef}
      >
        {/* Base layer for beams */}
        <div className="absolute inset-0 z-0">
          {/* Brand to AI beams */}
          {[brand1Ref, brand2Ref, brand3Ref].map((ref, i) => (
            <AnimatedBeam
              key={`brand-${i}`}
              containerRef={containerRef}
              fromRef={getValidRef(ref)}
              toRef={getValidRef(aiRef)}
            />
          ))}

          {/* AI to Creator beams */}
          {[creator1Ref, creator2Ref, creator3Ref, creator4Ref, creator5Ref].map((ref, i) => (
            <AnimatedBeam
              key={`creator-${i}`}
              containerRef={containerRef}
              fromRef={getValidRef(aiRef)}
              toRef={getValidRef(ref)}
            />
          ))}

          {/* Creator to Social beams */}
          {[creator1Ref, creator2Ref, creator3Ref, creator4Ref, creator5Ref].map((creatorRef, i) => {
            if (!creatorRef) return null;
            
            return (
              <React.Fragment key={`creator-social-${i}`}>
                {creatorSocialConnections[i as keyof typeof creatorSocialConnections].map((socialIndex) => {
                  const socialRefs: Array<React.RefObject<HTMLDivElement>> = [
                    social1Ref,
                    social2Ref,
                    social3Ref,
                    social4Ref,
                    social5Ref
                  ].filter((ref): ref is React.RefObject<HTMLDivElement> => ref !== null);

                  const socialRef = socialRefs[socialIndex];
                  if (!socialRef) return null;

                  return (
                    <AnimatedBeam
                      key={`creator-${i}-social-${socialIndex}`}
                      containerRef={containerRef}
                      fromRef={getValidRef(creatorRef)}
                      toRef={getValidRef(socialRef)}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        {/* Content layer */}
        <div className="flex w-full h-full items-stretch justify-between relative px-4 md:px-8 lg:px-12">
          {/* Left Side - Brands */}
          <div className="flex flex-col justify-center gap-6 md:gap-8 z-10">
            <Circle ref={brand1Ref} className="bg-blue-100">
              <Building2 className="text-blue-600" size={28} />
            </Circle>
            <Circle ref={brand2Ref} className="bg-green-100">
              <Building2 className="text-green-600" size={28} />
            </Circle>
            <Circle ref={brand3Ref} className="bg-purple-100">
              <Building2 className="text-purple-600" size={28} />
            </Circle>
          </div>

          {/* Center - AI */}
          <div className="relative flex flex-col justify-center items-center">
            <Circle ref={aiRef} className="relative size-20 md:size-24 lg:size-28 bg-white shadow-lg p-4 z-20">
              <Image
                src="/icons/infloq.png"
                height={1000}
                width={1000}
                alt="AI"
                className="p-2"
              />
              {/* Now place the wand icon absolutely inside the circle */}
              <SparkleIcon className="absolute top-6 right-8 h-4 w-4 text-blue-700" />
            </Circle>
          </div>


          {/* Mid-Right - Creators */}
          <div className="flex flex-col justify-center gap-6 md:gap-8 z-10">
            {[creator1Ref, creator2Ref, creator3Ref, creator4Ref, creator5Ref].map((ref, i) => (
              <Circle 
                key={`creator-${i}`} 
                ref={ref} 
                className="bg-white"
                metrics={creatorMetrics[i]}
                showMetrics={showMetrics}
              >
                <User className="text-gray-700" size={28} />
              </Circle>
            ))}
          </div>

          {/* Far Right - Social Networks */}
          <div className="flex flex-col justify-center gap-6 md:gap-8 z-10">
            <Circle ref={social1Ref} className="bg-pink-500 text-white">
              <Instagram size={32} />
            </Circle>
            <Circle ref={social2Ref} className="bg-red-500 text-white">
              <Youtube size={32} />
            </Circle>
            <Circle ref={social3Ref} className="bg-blue-400 text-white">
              <Twitter size={32} />
            </Circle>
            <Circle ref={social4Ref} className="bg-blue-500 text-white">
              <Facebook size={32} />
            </Circle>
            <Circle ref={social5Ref} className="bg-blue-600 text-white">
              <Linkedin size={32} />
            </Circle>
          </div>
        </div>
      </div>
    </div>
  );
}