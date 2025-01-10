// data/tool-data.ts
import { Tool } from "../types/tools";

export const tools: Tool[] = [
  {
    "id": "ai-agent-finder",
    "name": "AI Agent Finder",
    "description": "Find the perfect AI agent for your business needs with our comprehensive AI Agent Finder tool. Compare features, capabilities, and pricing across multiple platforms instantly - ideal for businesses looking to implement AI solutions effectively.",
    "platform": "General",
    "category": "discovery",
    "component": "AIAgentFinder",
    "image": "/images/tool-images/ai-agent-finder.jpg",
    "ctaText": "Find Your Agent",
    "features": [
      "Instant AI agent comparison and matching",
      "Real-time capability assessment",
      "Cost-benefit analysis for different agents",
      "Integration complexity evaluation",
      "Performance metrics comparison",
      "Customization potential analysis",
      "Implementation timeline estimation",
      "ROI calculator and predictions"
    ],
    "keyFeatures": [
      {
        "title": "Smart Matching",
        "description": "Uses advanced algorithms to match your requirements with the most suitable AI agents.",
        "icon": "match"
      },
      {
        "title": "Comprehensive Database",
        "description": "Access to detailed information about hundreds of AI agents across various platforms.",
        "icon": "database"
      },
      {
        "title": "Real-time Comparison",
        "description": "Side-by-side comparison of features, pricing, and capabilities.",
        "icon": "compare"
      },
      {
        "title": "ROI Prediction",
        "description": "Accurate cost-saving predictions and implementation ROI calculations.",
        "icon": "calculator"
      }
    ],
    "useCase": [
      {
        "title": "For Enterprises",
        "description": "Find enterprise-grade AI solutions that integrate seamlessly with existing systems",
        "examples": [
          "Identify automation opportunities",
          "Compare enterprise AI platforms",
          "Evaluate security compliance",
          "Assess scalability options"
        ]
      },
      {
        "title": "For SMBs",
        "description": "Discover cost-effective AI solutions that drive business growth",
        "examples": [
          "Find budget-friendly AI tools",
          "Compare feature sets",
          "Evaluate ease of implementation",
          "Analyze potential ROI"
        ]
      }
    ],
    "targetAudience": [
      "IT Decision Makers",
      "Business Operations Managers",
      "Digital Transformation Leaders",
      "Technology Consultants",
      "Startup Founders",
      "Small Business Owners"
    ],
    "benefits": [
      "No technical expertise required",
      "Instant comparison results",
      "Customized recommendations",
      "Detailed cost analysis",
      "Implementation roadmap"
    ],
    "faq": [
      {
        "question": "How does the agent matching work?",
        "answer": "Our tool uses advanced algorithms to analyze your business requirements, budget, and technical constraints to match you with the most suitable AI agents. The matching process considers over 50 different parameters to ensure accuracy."
      },
      {
        "question": "How up-to-date is the agent database?",
        "answer": "Our database is updated daily with the latest AI agents, features, and pricing information. We maintain direct relationships with providers to ensure accuracy."
      },
      {
        "question": "Can I compare multiple agents simultaneously?",
        "answer": "Yes, you can compare up to 5 AI agents side-by-side, examining their features, pricing, integration capabilities, and performance metrics."
      },
      {
        "question": "How accurate are the ROI predictions?",
        "answer": "Our ROI calculations are based on real implementation data from thousands of businesses. While estimates may vary, they typically achieve 85% accuracy."
      }
    ],
    "pricing": {
      "free": [
        "Basic agent comparison",
        "Monthly market updates",
        "Essential metrics",
        "Standard support"
      ],
      "pro": [
        "Advanced matching algorithm",
        "Custom requirements analysis",
        "Integration assessment",
        "Priority support",
        "Detailed ROI analysis",
        "Implementation consulting"
      ],
      "price": "$49/month"
    }
  } 

];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};