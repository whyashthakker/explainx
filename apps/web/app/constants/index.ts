import { Building2, Brain, Briefcase, ShoppingBag, MessageSquareMore, Notebook as Robot } from "lucide-react";

export const agents = [
  {
    id: 1,
    icon: Building2,
    name: "Real Estate Agent",
    description: "Expert in property analysis, market trends, and real estate negotiations",
    path: "real-estate",
  },
  {
    id: 2,
    icon: Brain,
    name: "Job Finder AI agent",
    description: "Specialized in data analysis, academic research, and literature review",
    path: "job-finder",
  },

] as const;
