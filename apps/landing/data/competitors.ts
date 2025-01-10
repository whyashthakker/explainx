export interface Competitor {
    name: string;
    shortDescription: string;
    category: string;
    comparisonImage: string;
    features: FeatureComparison[];
  }
  
  export interface FeatureComparison {
    category: string;
    features: {
      name: string;
      ExplainX: boolean | string | string[];
      competitor: boolean | string | string[];
      description?: string;
    }[];
  }
  
  export const competitors: Record<string, Competitor> = {
    "agentsinc": {
      "name": "Agents Inc.",
      "shortDescription": "AI agent platform focused on specialized business intelligence and analysis tasks",
      "category": "AI Agent Platform",
      "comparisonImage": "/images/comparisons/agentsinc.png",
      "features": [
        {
          "category": "Agent Capabilities",
          "features": [
            {
              "name": "Agent Types",
              "ExplainX": "Versatile AI agents for multiple business functions",
              "competitor": "Limited to specific domain agents (Patents, News, EU Policy)",
              "description": "Range of AI agent capabilities"
            },
            {
              "name": "Customization",
              "ExplainX": "Fully customizable AI agents with advanced configuration",
              "competitor": "Basic customization with predefined templates",
              "description": "Level of agent customization available"
            },
            {
              "name": "Reliability",
              "ExplainX": ["Guaranteed accuracy", "No hallucinations", "Consistent results"],
              "competitor": ["Standard accuracy", "Potential for inconsistencies", "Variable results"],
              "description": "Reliability of AI agent outputs"
            }
          ]
        },
        {
          "category": "Technology Infrastructure",
          "features": [
            {
              "name": "Scalability",
              "ExplainX": "Infinite scaling with instant deployment",
              "competitor": "Limited parallel processing",
              "description": "Platform scaling capabilities"
            },
            {
              "name": "Integration",
              "ExplainX": true,
              "competitor": true,
              "description": "System integration capabilities"
            },
            {
              "name": "Performance",
              "ExplainX": "24/7 operation with consistent high performance",
              "competitor": "Standard performance metrics",
              "description": "Overall system performance"
            }
          ]
        },
        {
          "category": "Cost Efficiency",
          "features": [
            {
              "name": "Pricing Model",
              "ExplainX": ["Pay-per-use", "No minimum commitment", "Flexible scaling"],
              "competitor": ["Fixed pricing", "Minimum commitments", "Limited scaling"],
              "description": "Cost structure and pricing flexibility"
            },
            {
              "name": "ROI",
              "ExplainX": "80-95% cost reduction compared to traditional methods",
              "competitor": "Up to 100x cost reduction in specific use cases",
              "description": "Return on investment metrics"
            }
          ]
        },
        {
          "category": "Implementation & Support",
          "features": [
            {
              "name": "Deployment Time",
              "ExplainX": "24-48 hours standard deployment",
              "competitor": "3-click setup process",
              "description": "Time to implement and deploy"
            },
            {
              "name": "Training Required",
              "ExplainX": "Minimal training with intuitive interface",
              "competitor": "No coding required, basic interface",
              "description": "Learning curve and training needs"
            },
            {
              "name": "Support Coverage",
              "ExplainX": true,
              "competitor": true,
              "description": "Available support services"
            }
          ]
        },
        {
          "category": "Data & Analytics",
          "features": [
            {
              "name": "Data Processing",
              "ExplainX": "Real-time processing with instant insights",
              "competitor": "Batch processing with scheduled updates",
              "description": "Data processing capabilities"
            },
            {
              "name": "Analytics Depth",
              "ExplainX": ["Deep analytics", "Predictive insights", "Custom reporting"],
              "competitor": ["Standard analytics", "Basic insights", "Predefined reports"],
              "description": "Depth of analytical capabilities"
            }
          ]
        }
      ]
    }
};