import * as React from 'react';
import { useRef } from 'react';
import { ArrowRight, Bot } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export default function DarkCTA() {
  // Create refs for different sections to track when they're in view
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2  // Start animations when 20% of the section is visible
  });
  
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { 
    once: true, 
    amount: 0.6  // Higher threshold for header animations
  });
  
  const ctaButtonsRef = useRef(null);
  const isCtaButtonsInView = useInView(ctaButtonsRef, { 
    once: true, 
    amount: 0.7 
  });
  
  const trustIndicatorsRef = useRef(null);
  const isTrustIndicatorsInView = useInView(trustIndicatorsRef, { 
    once: true, 
    amount: 0.6 
  });

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 lg:px-8 bg-[#0A0A0A] rounded-2xl overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 right-10 w-72 h-72 rounded-full bg-yellow-400/10 blur-[100px] opacity-60"
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 0.2 }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-yellow-400/5 blur-[100px] opacity-40"
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative">
        {/* Section Header with Yellow Accent */}
        <div className="text-center mb-12" ref={headerRef}>
          <motion.div 
            className="flex items-center gap-3 mb-2 justify-center"
            initial={{ y: -20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20">
              <Bot className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">
                AI-Powered Workforce
              </span>
            </div>
          </motion.div>
          
          {/* Headline with mixed styling */}
          <motion.h2 
            className="mt-8 text-4xl md:text-5xl lg:text-6xl font-normal text-white mx-auto max-w-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Deploy <span className="italic">AI Agents</span> to
            <br/>
            transform your <span className="italic">business</span>
          </motion.h2>
          
          {/* Description paragraph */}
          <motion.p 
            className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Replace traditional employees with AI agents that work 24/7, scale instantly, 
            and cost 80% less. Get started in minutes and only pay for what you use.
          </motion.p>
          
          {/* Yellow Circle Accent */}
          
        </div>

        {/* CTA Buttons */}
        <motion.div 
          ref={ctaButtonsRef}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={isCtaButtonsInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Button 
            asChild
            className="w-full sm:w-auto px-8 py-6 text-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-lg"
            size="lg"
          >
            <Link href="/demo" className="flex items-center gap-2">
              Schedule Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 text-lg border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10 font-medium rounded-lg"
            size="lg"
          >
            <Link href="/pricing" className="flex items-center gap-2">
              View Pricing
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          ref={trustIndicatorsRef}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8"
          initial={{ y: 20, opacity: 0 }}
          animate={isTrustIndicatorsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isTrustIndicatorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2 + (i * 0.1) // Staggered animation for avatars
                  }}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-[#0A0A0A] bg-gray-800"
                />
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Trusted by 500+ enterprises
            </p>
          </div>
          
          <div className="h-10 w-px bg-gray-800 hidden md:block" />
          
          <div className="flex items-center gap-4">
            {[
              { color: "green", text: "97% Satisfaction" },
              { color: "blue", text: "24/7 Support" },
              { color: "purple", text: "Enterprise Ready" }
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isTrustIndicatorsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.3 + (i * 0.1) // Staggered animation for badges
                }}
                className={`px-3 py-1 rounded-full bg-${badge.color}-400/10 text-${badge.color}-400 text-xs font-medium`}
              >
                {badge.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}