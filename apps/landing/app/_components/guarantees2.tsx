import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from "@repo/ui/lib/utils";
import { MessagesSquare, Scaling, ShieldCheck, SlidersHorizontal, TrendingUp, Users, WandSparkles, Zap } from 'lucide-react';

export function FeaturesSectionWithHoverEffects() {
  // Create refs for different sections to track when they're in view
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const featuresGridRef = useRef(null);
  const isFeaturesGridInView = useInView(featuresGridRef, { once: true, amount: 0.1 });

  const features = [
    { icon: <Zap />, title: "Rapid Agent Development", description: "Deploy your first AI agent within 2-4 weeks, with our efficient development and integration process." },
    { icon: <Scaling />, title: "Scalable Architecture", description: "Build agents that can handle growing workloads, with infrastructure that scales seamlessly with your needs." },
    { icon: <TrendingUp />, title: "Performance Analytics", description: "Comprehensive dashboards tracking agent performance, efficiency metrics, and automation success rates." },
    { icon: <Users />, title: "Expert Training & Support", description: "Dedicated AI specialists providing hands-on training and continuous support for your team." },
    { icon: <ShieldCheck />, title: "Security & Compliance", description: "Enterprise-grade security protocols and compliance with industry standards for all AI implementations." },
    { icon: <WandSparkles />, title: "Intuitive Interfaces", description: "User-friendly interfaces designed for maximum adoption and minimal learning curve." },
    { icon: <SlidersHorizontal />, title: "Customization Freedom", description: "Fully customizable agents that adapt to your specific workflows and business processes." },
    { icon: <MessagesSquare />, title: "24/7 Technical Support", description: "Round-the-clock support for critical agent operations and immediate issue resolution." },
  ];
  
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Yellow Accent */}
        <div className="mb-16" ref={headerRef}>
          <motion.div 
            className="flex items-center gap-3 mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={isHeaderInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1 h-6 bg-secondaccent"></div>
            <h3 className="text-sm font-medium uppercase tracking-wider">OUR GUARANTEES</h3>
          </motion.div>
          
          {/* Headline with mixed styling */}
          <div className="mt-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We commit to <span className=" ">excellence</span>
              <br />
              in <span className=" ">AI agent development</span>
            </motion.h2>
            
            {/* Description paragraph */}
            <motion.p 
              className="mt-6 text-muted-foreground max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our comprehensive approach ensures quality, performance, and return on 
              investment across all our AI implementations and training programs.
            </motion.p>
          </div>
        </div>

        {/* Feature Grid with scroll-triggered animations */}
        <div 
          ref={featuresGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10"
        >
          {features.slice(0, 8).map((feature, index) => (
            <Feature 
              key={feature.title} 
              {...feature} 
              index={index} 
              isVisible={isFeaturesGridInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  index: number;
  isVisible: boolean;
}

const Feature = ({
  title,
  description,
  icon,
  index,
  isVisible
}: FeatureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.05 * index, // Stagger effect based on index
        ease: "easeOut" 
      }}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
        <div className="mb-4 relative z-10 px-10 text-secondaccent2 dark:text-white">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-secondaccent dark:bg-yellow-600 group-hover/feature:bg-secondaccent transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <motion.p 
        className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: 0.1 + (0.05 * index)  // Additional delay for description text
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};