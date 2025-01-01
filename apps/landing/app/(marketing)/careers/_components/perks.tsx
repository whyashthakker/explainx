// app/careers/_components/perks-section.tsx
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@repo/ui/components/ui/card";
  
  type Perk = {
    title: string;
    description: string;
  };
  
  const perks = [
    {
      title: "Office-first Culture",
      description: "Collaborative and inclusive work environment."
    },
    {
      title: "Learning & Growth",
      description: "Personal development budget and regular upskilling opportunities."
    },
    {
      title: "Competitive Compensation",
      description: "Competitive salaries and performance-based bonuses."
    },
    {
      title: "Early Career Opportunities",
      description: "Opportunities for growth and advancement within the company."
    },
    {
      title: "Open Communication",
      description: "Transparent communication and regular feedback."
    },
    {
      title: "Latest Tools",
      description: "Access to premium software and hardware to help you do your best work."
    }
  ];
  
  export function PerksSection() {
    return (
      <div className="mb-16">
        <h2 className="font-cal text-3xl text-center mb-8">Why Join Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk) => (
            <Card key={perk.title}>
              <CardHeader>
                <CardTitle className="text-lg">{perk.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{perk.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }