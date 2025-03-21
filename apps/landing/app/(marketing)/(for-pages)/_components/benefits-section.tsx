"use client";

import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { 
  DollarSign, 
  Users, 
  Trophy, 
  Target, 
  BarChart, 
  Award,
  LucideIcon 
} from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, LucideIcon> = {
  "DollarSign": DollarSign,
  "Users": Users,
  "Trophy": Trophy,
  "Target": Target,
  "BarChart": BarChart,
  "Award": Award
};

interface BenefitsSectionProps {
  benefits: Array<{
    title: string;
    description: string;
    icon?: keyof typeof ICON_MAP;
  }>;
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  const getIcon = (iconName?: keyof typeof ICON_MAP) => {
    if (!iconName) return null;
    const Icon = ICON_MAP[iconName];
    return Icon ? <Icon className="w-8 h-8 text-secondaccent2" /> : null;
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge 
            variant="outline" 
            className="mb-4 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
          >
            Benefits
          </Badge>
          <h2 className="font-cal text-4xl md:text-5xl mb-6 text-foreground dark:text-white">
            Why Creators Choose <span className=" ">Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are growing their influence and earn more with our platform
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 
            }}
          >
            <Card 
              className="p-6 hover:shadow-2xl transition-all duration-300 
              bg-background dark:bg-[#1A1A1A] 
              border border-border dark:border-gray-800 
              hover:border-secondaccent dark:hover:border-secondaccent2 
              group"
            >
              <div className="mb-4">
                {getIcon(benefit.icon)}
              </div>
              <h3 className="font-semibold text-xl mb-2 text-foreground dark:text-white group-hover:text-yellow-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}