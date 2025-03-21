import { Building2, Brain, Briefcase, ShoppingBag, MessageSquareMore, Notebook as Robot } from "lucide-react";

export const agents = [
  {
    id:1,
    icon: Building2,
    name: "Real Estate Agent",
    description: "Expert in property analysis, market trends, and real estate negotiations",
    path: "real-estate",
  },
  {
    id:2,
    icon: Brain,
    name: "Job Finder AI agent",
    description: "Specialized in data analysis, academic research, and literature review",
    path: "job-finder",
  },
  {
    id:3,
    icon: Briefcase,
    name: "Business Analyst",
    description: "Focused on market analysis, business strategy, and financial planning",
    path: "business-analyst",
  },
  {
    id:6,
    icon: ShoppingBag,
    name: "Shopping Assistant",
    description: "Helps with product recommendations and price comparisons",
    path: "shopping-assistant",
  },
  {
    id:4,
    icon: MessageSquareMore,
    name: "Writing Assistant",
    description: "Assists with content creation, editing, and proofreading",
    path: "writing-assistant",
  },
  {
    id:5,
    icon: Robot,
    name: "Tech Support",
    description: "Provides technical assistance and troubleshooting guidance",
    path: "tech-support",
  },
] as const;
