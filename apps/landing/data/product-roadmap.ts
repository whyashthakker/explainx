// data.ts

import { RoadmapItem } from "../types/marketing/roadmap";

export const roadmapItems: RoadmapItem[] = [
  // In Progress Items
  {
    id: 1,
    feature: "AI-Powered Creator Matching",
    category: "AI Features",
    status: "In Progress",
    description: "Enhanced AI algorithms for better creator-brand matches based on performance data and brand alignment.",
    votes: 0
  },
  {
    id: 2,
    feature: "Real-Time Analytics Dashboard",
    category: "Analytics",
    status: "In Progress",
    description: "Comprehensive analytics dashboard with real-time campaign performance metrics and ROI tracking.",
    votes: 0
  },
  {
    id: 3,
    feature: "Mobile App Development",
    category: "Mobile",
    status: "In Progress",
    description: "Native mobile application for iOS and Android platforms.",
    votes: 0
  },

  // Planned Items
  {
    id: 4,
    feature: "API Platform Access",
    category: "Integration",
    status: "Planned",
    description: "Public API access for enterprise customers to integrate ExplainX with their existing systems.",
    votes: 0
  },

  // Completed Items
  {
    id: 5,
    feature: "Performance-Based Pricing",
    category: "Core Platform",
    status: "Completed",
    description: "Implementation of credit-based system with performance tracking.",
    votes: 0,
    implementationDate: "December 15, 2024"
  },
  {
    id: 6,
    feature: "Multi-Platform Analytics",
    category: "Analytics",
    status: "Completed",
    description: "Unified analytics across all major social media platforms.",
    votes: 0,
    implementationDate: "November 30, 2024"
  }
];

export const STATUS_STYLES = {
  "Completed": "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300",
  "Planned": "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300"
} as const;