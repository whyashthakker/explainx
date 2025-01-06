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
    return Icon ? <Icon className="w-8 h-8 text-blue-600" /> : null;
  };

  return (
    <section className="container max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">Benefits</Badge>
        <h2 className="font-cal text-4xl mb-4">Why Creators Choose Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of creators who are growing their influence and earn more with our platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              {getIcon(benefit.icon)}
            </div>
            <h3 className="font-semibold text-xl mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}