"use client";

import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { 
  ArrowRight,
  Camera,
  BarChart,
  Users,
  DollarSign,
  Settings,
  Zap,
  Layout,
  MessageCircle,
  TrendingUp,
  Shield,
  LucideIcon
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "Camera": Camera,
  "BarChart": BarChart,
  "Users": Users,
  "DollarSign": DollarSign,
  "Settings": Settings,
  "Zap": Zap,
  "Layout": Layout,
  "MessageCircle": MessageCircle,
  "TrendingUp": TrendingUp,
  "Shield": Shield
};

interface FeaturesSectionProps {
  features: Array<{
    title: string;
    description: string;
    icon?: keyof typeof ICON_MAP;
    link?: string;
  }>;
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  const getIcon = (iconName?: keyof typeof ICON_MAP) => {
    if (!iconName) return null;
    const Icon = ICON_MAP[iconName];
    return Icon ? <Icon className="w-8 h-8 text-secondaccent2" /> : null;
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 py-16 bg-background dark:bg-[#0A0A0A]">
      <div className="text-center mb-16">
        <Badge 
          variant="outline" 
          className="mb-4 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
        >
          Features
        </Badge>
        <h2 className="font-cal text-4xl md:text-5xl mb-6 text-foreground dark:text-white">
          Everything You Need to <span className=" ">Succeed</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Powerful tools and resources designed to help you grow your influence and maximize earnings
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="p-6 hover:shadow-2xl transition-all duration-300 
            bg-background dark:bg-[#1A1A1A] 
            border border-border dark:border-gray-800 
            hover:border-secondaccent dark:hover:border-secondaccent2 
            group"
          >
            {feature.icon && (
              <div className="mb-4">
                {getIcon(feature.icon)}
              </div>
            )}
            <h3 className="font-semibold text-xl mb-2 text-foreground dark:text-white group-hover:text-yellow-600 transition-colors">
              {feature.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {feature.description}
            </p>
            {feature.link && (
              <a 
                href={feature.link}
                className="text-secondaccent2 hover:text-yellow-600 font-medium inline-flex items-center group/link"
              >
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 text-secondaccent2 transition-transform group-hover/link:translate-x-1" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}