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
    <section className="bg-blue-50 py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Platform Stats</Badge>
          <h2 className="font-cal text-4xl mb-4">Growing Together</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our thriving community of creators and achieve your goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="font-cal text-4xl text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="font-medium text-lg mb-1">{stat.label}</div>
              {stat.description && (
                <p className="text-sm text-gray-600">{stat.description}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}