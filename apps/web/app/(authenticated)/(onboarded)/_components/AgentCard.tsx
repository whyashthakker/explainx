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
    icon: Briefcase,
    name: "Job Hunting Agent",
    description: "Specialized in job search and career guidance",
    path: "job-finder",
  },

];

export default function AgentCard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-yellow-400">
          AI Agents Directory
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agents.map((agent: any, index: any) => (
            <Card
              key={index}
              className="bg-gray-900 border-gray-800 hover:shadow-xl hover:shadow-yellow-900/20 transition-shadow duration-300"
            >
              <CardHeader className="text-center pt-8 pb-2">
                <div className="mx-auto mb-4 p-3 rounded-full bg-yellow-500/10 w-16 h-16 flex items-center justify-center">
                  <agent.icon className="w-8 h-8 text-yellow-500" />
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {agent.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-400 h-20">
                  {agent.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pb-8 pt-2">
                <Button
                  className="w-full max-w-[200px] bg-yellow-500 hover:bg-yellow-600 text-black font-semibold border-0"
                  onClick={() => router.push(`/dashboard/agent/${agent.path}`)}
                >
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