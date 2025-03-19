import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

interface StatsSectionProps {
  stats: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-[#0A0A0A] py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-900 text-blue-300">Platform Stats</Badge>
          <h2 className="font-cal text-4xl mb-4 text-white">Growing Together</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our thriving community of creators and achieve your goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover:shadow-2xl transition-shadow 
                         bg-[#1A1A1A] border border-gray-800 hover:border-blue-700"
            >
              <div className="font-cal text-4xl text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="font-medium text-lg mb-1 text-white">{stat.label}</div>
              {stat.description && (
                <p className="text-sm text-gray-400">{stat.description}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}