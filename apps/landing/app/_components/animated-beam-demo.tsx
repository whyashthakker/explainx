"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";
import { AnimatedBeam } from "./magicui/animated-beam";
import { 
  Code2,
  Bot,
  Boxes,
  Cpu,
  BrainCircuit,
  Workflow,
  Database,
  MessagesSquare,
  FileCode,
  SparkleIcon,
} from 'lucide-react';

interface MetricData {
  efficiency: string;
  automation: string;
  timeSaved: string;
  delay: number;
  taskType: string;
}

interface CircleProps {
  className?: string;
  children?: React.ReactNode;
  metrics?: MetricData;
  showMetrics?: boolean;
  index?: number;
  size?: "sm" | "md" | "lg";
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
    className="absolute -top-2 -translate-y-full left-[80%] z-[100] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-100 p-2 w-32 md:w-36"
  >
    <div className="text-xs md:text-sm">
      <div className="flex items-center justify-between mb-1">
        <BrainCircuit className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-600" />
        <span className="font-bold text-purple-600">{metrics.efficiency}</span>
      </div>
      <div className="flex items-center justify-between">
        <Workflow className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600" />
        <span className="font-medium">{metrics.timeSaved}</span>
      </div>
    </div>
  </motion.div>
);

const useMetricAnimation = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const showNext = () => {
      setActiveIndex(prev => {
        const nextIndex = Math.floor(Math.random() * 5);
        return nextIndex;
      });
    };

    const timer = setTimeout(showNext, 2000);
    const interval = setInterval(showNext, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return activeIndex;
};

const Circle = forwardRef<HTMLDivElement, CircleProps>(
  ({ className, children, metrics, showMetrics, index, size = "md" }, ref) => {
    const activeIndex = useMetricAnimation();
    const isVisible = activeIndex === index && metrics && showMetrics;

    const sizeClasses = {
      sm: "size-12 md:size-14",
      md: "size-14 md:size-16",
      lg: "size-16 md:size-20 lg:size-24"
    };

    return (
      <div className="relative" ref={ref}>
        <div
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-border p-2 md:p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] hover:scale-110 transition-transform",
            sizeClasses[size],
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

const automationMetrics: MetricData[] = [
  {
    efficiency: "95%",
    automation: "Full",
    timeSaved: "40hrs/wk",
    delay: 2.2,
    taskType: "Data Processing"
  },
  {
    efficiency: "85%",
    automation: "Partial",
    timeSaved: "25hrs/wk",
    delay: 2.4,
    taskType: "Customer Support"
  },
  {
    efficiency: "90%",
    automation: "Full",
    timeSaved: "30hrs/wk",
    delay: 2.6,
    taskType: "Code Generation"
  },
  {
    efficiency: "88%",
    automation: "Full",
    timeSaved: "35hrs/wk",
    delay: 2.8,
    taskType: "Document Analysis"
  },
  {
    efficiency: "92%",
    automation: "Partial",
    timeSaved: "28hrs/wk",
    delay: 3.0,
    taskType: "Workflow Automation"
  }
];

interface AnimatedBeamDemoProps {
  className?: string;
}

const creatorSocialConnections = {
  0: [0, 4],
  1: [2, 0],
  2: [0, 4],
  3: [3, 4],
  4: [0, 1],
};

export function AnimatedBeamMultipleOutputDemo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // References for different sections
  const inputRef1 = useRef<HTMLDivElement>(null);
  const inputRef2 = useRef<HTMLDivElement>(null);
  const inputRef3 = useRef<HTMLDivElement>(null);
  
  const agentRef = useRef<HTMLDivElement>(null);
  
  const taskRef1 = useRef<HTMLDivElement>(null);
  const taskRef2 = useRef<HTMLDivElement>(null);
  const taskRef3 = useRef<HTMLDivElement>(null);
  const taskRef4 = useRef<HTMLDivElement>(null);
  const taskRef5 = useRef<HTMLDivElement>(null);

  const outputRef1 = useRef<HTMLDivElement>(null);
  const outputRef2 = useRef<HTMLDivElement>(null);
  const outputRef3 = useRef<HTMLDivElement>(null);
  const outputRef4 = useRef<HTMLDivElement>(null);
  const outputRef5 = useRef<HTMLDivElement>(null);

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

  const getValidRef = (ref: React.RefObject<HTMLDivElement>) => ref as React.RefObject<HTMLElement>;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={cn(
          "relative flex h-[300px] md:h-[500px] lg:h-[600px] w-full max-w-[1400px] items-center justify-center overflow-hidden px-1 md:px-4 py-6 md:py-10 lg:py-16",
          className,
        )}
        ref={containerRef}
      >
        {/* Base layer for beams */}
        <div className="absolute inset-0 z-0">
          {/* Input to AI Agent beams */}
          {[inputRef1, inputRef2, inputRef3].map((ref, i) => (
            <AnimatedBeam
              key={`input-${i}`}
              containerRef={containerRef}
              fromRef={getValidRef(ref)}
              toRef={getValidRef(agentRef)}
            />
          ))}

          {/* AI Agent to Task beams */}
          {[taskRef1, taskRef2, taskRef3, taskRef4, taskRef5].map((ref, i) => (
            <AnimatedBeam
              key={`task-${i}`}
              containerRef={containerRef}
              fromRef={getValidRef(agentRef)}
              toRef={getValidRef(ref)}
            />
          ))}

          {/* Task to Output beams */}
          {!isMobile && [taskRef1, taskRef2, taskRef3, taskRef4, taskRef5].map((taskRef, i) => {
            const outputRef = [outputRef1, outputRef2, outputRef3, outputRef4, outputRef5][i];
            if (!outputRef) return null;
            return (
              <AnimatedBeam
                key={`task-output-${i}`}
                containerRef={containerRef}
                fromRef={getValidRef(taskRef)}
                toRef={getValidRef(outputRef)}
              />
            );
          })}
        </div>

        {/* Content layer */}
        <div className="flex w-full h-full items-stretch justify-between relative px-2 md:px-8 lg:px-12">
          {/* Left Side - Input Sources */}
          <div className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8 z-10">
            <Circle ref={inputRef1} className="bg-blue-100" size="sm">
              <Code2 className="text-blue-600 w-6 h-6 md:w-7 md:h-7" />
            </Circle>
            <Circle ref={inputRef2} className="bg-purple-100" size="sm">
              <Database className="text-purple-600 w-6 h-6 md:w-7 md:h-7" />
            </Circle>
            <Circle ref={inputRef3} className="bg-green-100" size="sm">
              <MessagesSquare className="text-green-600 w-6 h-6 md:w-7 md:h-7" />
            </Circle>
          </div>

          {/* Center - AI Agent */}
          <div className="relative flex flex-col justify-center items-center">
            <Circle ref={agentRef} className="relative bg-white shadow-lg p-3 md:p-4 z-20" size="lg">
              <Image
                src="/icons/explainx_ai_light.png"
                height={1000}
                width={1000}
                alt="ExplainX AI"
                className="p-1 md:p-2"
              />
              <SparkleIcon className="absolute top-4 right-6 h-3 w-3 md:h-4 md:w-4 text-purple-700" />
            </Circle>
          </div>

          {/* Mid-Right - Tasks */}
          <div className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8 z-10">
            {[taskRef1, taskRef2, taskRef3, taskRef4, taskRef5].map((ref, i) => (
              <Circle 
                key={`task-${i}`} 
                ref={ref} 
                className="bg-white"
                metrics={automationMetrics[i]}
                showMetrics={showMetrics}
                size="sm"
              >
                <Bot className="text-gray-700 w-6 h-6 md:w-7 md:h-7" />
              </Circle>
            ))}
          </div>

          {/* Far Right - Outputs */}
          <div className="flex flex-col justify-center gap-4 md:gap-6 lg:gap-8 z-10">
            <Circle ref={outputRef1} className="bg-indigo-500 text-white" size="sm">
              <FileCode className="w-6 h-6 md:w-7 md:h-7" />
            </Circle>
            <Circle ref={outputRef2} className="bg-blue-500 text-white" size="sm">
              <Boxes className="w-6 h-6 md:w-7 md:h-7" />
            </Circle>
            <Circle ref={outputRef3} className="bg-purple-500 text-white" size="sm">
              <Cpu className="w-6 h-6 md:w-7 md:h-7" />
            </Circle>
            <Circle ref={outputRef4} className="bg-green-500 text-white" size="sm">
              <BrainCircuit className="w-6 h-6 md:w-7 md:h-7" />
            </Circle>
            <Circle ref={outputRef5} className="bg-blue-600 text-white" size="sm">
              <Workflow className="w-6 h-6 md:w-7 md:h-7" />
            </Circle>
          </div>
        </div>
      </div>
    </div>
  );
}
