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
  BarChart3
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
}

interface MetricBadgeProps {
  metrics: MetricData;
  delay: number;
}

const MetricBadge: React.FC<MetricBadgeProps> = ({ metrics, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.3 }}
    className="absolute left-[120%] top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 p-3 w-48"
  >
    <div className="space-y-2 text-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-green-600 gap-1.5">
          <DollarSign className="w-3.5 h-3.5" />
          <span>ROI</span>
        </div>
        <span className="font-medium">{metrics.roi}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-blue-600 gap-1.5">
          <Users className="w-3.5 h-3.5" />
          <span>Engagement</span>
        </div>
        <span className="font-medium">{metrics.engagement}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-purple-600 gap-1.5">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Views/mo</span>
        </div>
        <span className="font-medium">{metrics.views}</span>
      </div>
    </div>
  </motion.div>
);

const Circle = forwardRef<HTMLDivElement, CircleProps>(
  ({ className, children, metrics }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="relative" 
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          {metrics && isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-[120%] top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-100 p-3 w-48"
            >
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600 gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>ROI</span>
                  </div>
                  <span className="font-medium">{metrics.roi}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-600 gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Engagement</span>
                  </div>
                  <span className="font-medium">{metrics.engagement}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-purple-600 gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Views/mo</span>
                  </div>
                  <span className="font-medium">{metrics.views}</span>
                </div>
              </div>
            </motion.div>
          )}
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

export function AnimatedBeamMultipleOutputDemo({ className }: AnimatedBeamDemoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMetrics, setShowMetrics] = useState(false);

  // Refs
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
    const timer = setTimeout(() => setShowMetrics(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-[700px] w-full items-center justify-center overflow-hidden px-4 py-20",
        className,
      )}
      ref={containerRef}
    >
      {/* Base layer for beams */}
      <div className="absolute inset-0 z-0">
        {/* Animated Beams */}
        {[social1Ref, social2Ref, social3Ref, social4Ref, social5Ref].map((ref, i) => (
          <AnimatedBeam
            key={`social-${i}`}
            containerRef={containerRef}
            fromRef={ref}
            toRef={aiRef}
          />
        ))}
        {[creator1Ref, creator2Ref, creator3Ref, creator4Ref, creator5Ref].map((ref, i) => (
          <AnimatedBeam
            key={`creator-${i}`}
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={ref}
          />
        ))}
      </div>

      {/* Content layer */}
      <div className="flex size-full flex-row items-stretch justify-between gap-20 max-w-7xl mx-auto relative">
        {/* Left Side - Social Media */}
        <div className="flex flex-col justify-center gap-8 z-10">
          <Circle ref={social1Ref} className="bg-pink-500 text-white">
            <Instagram size={32} />
          </Circle>
          <Circle ref={social2Ref} className="bg-red-500 text-white">
            <Youtube size={32} />
          </Circle>
          <Circle ref={social3Ref} className="bg-blue-400 text-white">
            <Twitter size={32} />
          </Circle>
          <Circle ref={social4Ref} className="bg-purple-600 text-white">
            <Twitch size={32} />
          </Circle>
          <Circle ref={social5Ref} className="bg-black text-white">
            <Instagram size={32} />
          </Circle>
        </div>

        {/* Center - AI */}
        <div className="flex flex-col justify-center">
          <Circle ref={aiRef} className="size-28 bg-white shadow-lg p-4 z-20">
            <Image
              src="/icons/infloq.png"
              height={1000}
              width={1000}
              alt="AI"
              className="p-2"
            />
          </Circle>
        </div>

        {/* Right Side - Creators */}
        <div className="flex flex-col justify-center gap-8 z-10">
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
      </div>
    </div>
  );
}