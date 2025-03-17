"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Building2, Brain, Briefcase, ShoppingBag, MessageSquareMore, Notebook as Robot } from "lucide-react";

const agents = [
    {
      icon: Building2,
      name: "Real Estate Agent",
      description: "Expert in property analysis, market trends, and real estate negotiations",
      path: "real-estate",
    },
    {
      icon: Brain,
      name: "Research Assistant",
      description: "Specialized in data analysis, academic research, and literature review",
      path: "research-assistant",
    },
    {
      icon: Briefcase,
      name: "Business Analyst",
      description: "Focused on market analysis, business strategy, and financial planning",
      path: "business-analyst",
    },
    {
      icon: ShoppingBag,
      name: "Shopping Assistant",
      description: "Helps with product recommendations and price comparisons",
      path: "shopping-assistant",
    },
    {
      icon: MessageSquareMore,
      name: "Writing Assistant",
      description: "Assists with content creation, editing, and proofreading",
      path: "writing-assistant",
    },
    {
      icon: Robot,
      name: "Tech Support",
      description: "Provides technical assistance and troubleshooting guidance",
      path: "tech-support",
    }
  ];
export default function AgentCard() {
  const router = useRouter();



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          AI Agents Directory
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {agents.map((agent:any, index: any) => (
            <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pt-8">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                  <agent.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {agent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  {agent.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pb-8">
                <Button className="w-full max-w-[200px]" onClick={() => router.push(`/dashboard/agent/${agent.path}`)}>
                  Use this Agent
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
