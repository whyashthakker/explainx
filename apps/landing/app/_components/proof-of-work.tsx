"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, GraduationCap, Clock, Code2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface StatItemProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

const StatItem = ({ value, label, icon, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/80 border border-border/50 backdrop-blur-sm"
    >
      <div className="p-3 rounded-full bg-primary/10">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-4xl font-bold font-cal text-primary mb-2">
          {count}+
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
      icon: <Bot className="w-6 h-6 text-primary" />,
      delay: 0
    },
    {
      value: 100002,
      label: "Students Taught",
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      delay: 0.2
    },
    {
      value: 1200,
      label: "Hours of Training",
      icon: <Clock className="w-6 h-6 text-primary" />,
      delay: 0.4
    },
    {
      value: 10,
      label: "Frameworks Explored",
      icon: <Code2 className="w-6 h-6 text-primary" />,
      delay: 0.6
    }
  ];

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-cal font-bold text-foreground mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming businesses through AI innovation and education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>

        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[300px] rounded-full bg-primary/30 blur-[128px] opacity-20" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-primary/30 blur-[128px] opacity-20" />
      </div>
    </section>
  );
}