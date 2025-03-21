"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, GraduationCap, Clock, Code2, Users } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
  inView: boolean;
  delay: number;
}

const StatItem = ({ value, label, suffix = "+", icon, inView, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000; // Animation duration in milliseconds
      const steps = 60; // Number of steps in the animation
      const stepValue = value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        if (currentStep < steps) {
          setCount(Math.min(Math.round(stepValue * currentStep), value));
          currentStep++;
        } else {
          setCount(value);
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/80 border border-border/50 backdrop-blur-sm"
    >
      <div className="p-3 rounded-full bg-secondaccent/10 border border-secondaccent/20 mb-4">
        <div className="text-secondaccent2">
          {icon}
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-medium mb-1">
          {count}{suffix}
        </h3>
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>
    </motion.div>
  );
};

export default function DeliveryStats() {
  const stats = [
    {
      value: 100,
      label: "AI Agents Built",
      icon: <Bot className="w-6 h-6" />,
      suffix: "+",
      delay: 0.3
    },
    {
      value: 100002,
      label: "Students Taught",
      suffix: "+",
      icon: <GraduationCap className="w-6 h-6" />,
      delay: 0.4
      
    },
    {
      value: 1200,
      label: "Hours of Training",
      suffix: "+",
      icon: <Clock className="w-6 h-6" />,
      delay: 0.5
    },
    {
      value: 10,
      label: "Frameworks Explored",
      suffix: "+",
      icon: <Code2 className="w-6 h-6" />,
      delay: 0.6
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header with Yellow Accent */}
        <div className="mb-16">
          <motion.div 
            className="flex items-center gap-3 mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1 h-6 bg-secondaccent"></div>
            <h3 className="text-sm font-medium uppercase tracking-wider">OUR IMPACT</h3>
          </motion.div>
          
          {/* Headline with mixed styling */}
          <div className="mt-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Transforming <span className=" ">businesses</span>
              <br />
              through <span className=" ">AI innovation</span>
            </motion.h2>
            
            {/* Description paragraph */}
            <motion.p 
              className="mt-6 text-muted-foreground max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our AI solutions and educational programs have created measurable impact 
              across industries, empowering organizations to achieve new levels of 
              efficiency and innovation.
            </motion.p>
          </div>
          
          {/* Yellow Circle Accent */}
          
        </div>
        
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {stats.map((stat, index) => (
            <StatItem 
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat?.suffix }
              icon={stat.icon}
              inView={inView}
              delay={stat.delay}
            />
          ))}
        </motion.div>
        
        {/* Decorative gradients */}
        <div className="relative mt-16">
          <motion.div 
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[300px] rounded-full bg-secondaccent/10 blur-[128px] opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-secondaccent/10 blur-[128px] opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </div>
      </div>
    </section>
  );
}