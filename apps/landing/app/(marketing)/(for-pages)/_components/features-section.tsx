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
    return Icon ? <Icon className="w-8 h-8 text-blue-400" /> : null;
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12 bg-[#0A0A0A]">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 bg-blue-900 text-blue-300">Features</Badge>
        <h2 className="font-cal text-4xl mb-4 text-white">Everything You Need to Succeed</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Powerful tools and resources designed to help you grow your influence and maximize earnings
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="p-6 hover:shadow-2xl transition-shadow bg-[#1A1A1A] border-gray-800 hover:border-blue-700 border"
          >
            {feature.icon && (
              <div className="mb-4">
                {getIcon(feature.icon)}
              </div>
            )}
            <h3 className="font-semibold text-xl mb-2 text-white">{feature.title}</h3>
            <p className="text-gray-400 mb-4">{feature.description}</p>
            {feature.link && (
              <a 
                href={feature.link}
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
              >
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 text-blue-400" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}