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
      infloq: boolean | string | string[];
      competitor: boolean | string | string[];
      description?: string;
    }[];
  }
  
  export const competitors: Record<string, Competitor> = {
  "upfluence": {
    name: "Upfluence",
    shortDescription: "Traditional enterprise influencer marketing platform with CRM features",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/upfluence.png",
    features: [
      {
        category: "Influencer Discovery",
        features: [
          {
            name: "AI-Powered Matching",
            infloq: "Advanced AI algorithm for precise creator-brand matching",
            competitor: "Basic data-driven matching",
            description: "Technology used to match brands with influencers"
          },
          {
            name: "Verification Process",
            infloq: "Thorough AI-driven verification of metrics and authenticity",
            competitor: "Manual verification process",
            description: "Method of verifying influencer authenticity"
          },
          {
            name: "Global Creator Network",
            infloq: ["All major social platforms", "Global reach", "Instant matching"],
            competitor: ["Limited platform focus", "Regional limitations", "Manual search"],
            description: "Access to creator network and discovery features"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Payment Model",
            infloq: "Pay-per-click performance model",
            competitor: "Traditional campaign-based pricing",
            description: "Payment structure for influencer campaigns"
          },
          {
            name: "Real-time Analytics",
            infloq: true,
            competitor: true,
            description: "Live campaign performance tracking"
          },
          {
            name: "Automated Campaign Optimization",
            infloq: "AI-driven real-time optimization",
            competitor: "Manual optimization tools",
            description: "Campaign performance optimization capabilities"
          }
        ]
      },
      {
        category: "ROI Tracking",
        features: [
          {
            name: "Performance Metrics",
            infloq: ["Engagement rates", "Click tracking", "Conversion analysis", "Revenue attribution"],
            competitor: ["Basic engagement metrics", "Sales tracking", "ROI calculation"],
            description: "Available metrics for measuring campaign success"
          },
          {
            name: "Analytics Integration",
            infloq: "One-click integration with major platforms",
            competitor: "Manual integration process",
            description: "Ease of connecting analytics tools"
          }
        ]
      },
      {
        category: "Platform Features",
        features: [
          {
            name: "Creator Management",
            infloq: "Automated AI-driven management system",
            competitor: "Manual CRM system",
            description: "Tools for managing creator relationships"
          },
          {
            name: "Content Approval",
            infloq: "AI-assisted content review and approval",
            competitor: "Manual review process",
            description: "Content review and approval workflow"
          },
          {
            name: "Automated Reporting",
            infloq: true,
            competitor: true,
            description: "Campaign reporting capabilities"
          }
        ]
      },
      {
        category: "Pricing & Value",
        features: [
          {
            name: "Pricing Model",
            infloq: "Performance-based (pay per click)",
            competitor: "Subscription + Campaign costs",
            description: "Platform cost structure"
          },
          {
            name: "Minimum Investment",
            infloq: "No minimum, pay for performance",
            competitor: "High minimum campaign budgets",
            description: "Required minimum spend"
          },
          {
            name: "ROI Guarantee",
            infloq: true,
            competitor: false,
            description: "Performance-based ROI guarantees"
          }
        ]
      },
      {
        category: "Technology & Innovation",
        features: [
          {
            name: "AI Implementation",
            infloq: ["Creator matching", "Performance prediction", "Campaign optimization", "Content analysis"],
            competitor: ["Basic data analysis", "Manual matching"],
            description: "Use of AI technology in platform features"
          },
          {
            name: "Platform Updates",
            infloq: "Regular AI-powered updates",
            competitor: "Quarterly feature updates",
            description: "Frequency and type of platform improvements"
          }
        ]
      }
    ]
  },
  "wednesday": {
      "name": "Wednesday",
      "shortDescription": "Influencer marketing software focused on small businesses and startups with direct outreach capabilities",
      "category": "Influencer Marketing Platform",
      "comparisonImage": "/images/comparisons/wednesday.png",
      "features": [
        {
          "category": "Influencer Discovery",
          "features": [
            {
              "name": "Creator Search",
              "infloq": "AI-powered matching with automated discovery",
              "competitor": "Manual search with filters across platforms",
              "description": "Method of finding relevant creators"
            },
            {
              "name": "Platform Coverage",
              "infloq": ["All major social platforms", "Global reach", "Instant AI matching"],
              "competitor": ["7 major social platforms", "Manual search", "Filter-based discovery"],
              "description": "Supported social media platforms"
            },
            {
              "name": "Verification Process",
              "infloq": "AI-driven verification of metrics and authenticity",
              "competitor": "Basic engagement metrics verification",
              "description": "Creator verification methods"
            }
          ]
        },
        {
          "category": "Campaign Management",
          "features": [
            {
              "name": "Contact Methods",
              "infloq": "In-platform messaging with templates",
              "competitor": "Direct email outreach",
              "description": "Methods for reaching out to creators"
            },
            {
              "name": "Campaign Tracking",
              "infloq": "Real-time AI-powered analytics",
              "competitor": "Basic CRM tracking system",
              "description": "Campaign monitoring capabilities"
            },
            {
              "name": "Creator Management",
              "infloq": "Advanced relationship management with AI insights",
              "competitor": "Built-in CRM for basic relationship tracking",
              "description": "Tools for managing creator relationships"
            }
          ]
        },
        {
          "category": "Platform Features",
          "features": [
            {
              "name": "Browser Extension",
              "infloq": false,
              "competitor": true,
              "description": "Browser extension for creator discovery"
            },
            {
              "name": "Analytics Integration",
              "infloq": "One-click integration with major platforms",
              "competitor": "Basic analytics tracking",
              "description": "Integration with analytics tools"
            },
            {
              "name": "ROI Tracking",
              "infloq": ["Performance metrics", "Click tracking", "Conversion analysis"],
              "competitor": ["Basic engagement tracking", "Campaign monitoring"],
              "description": "Campaign performance measurement"
            }
          ]
        },
        {
          "category": "Pricing & Value",
          "features": [
            {
              "name": "Pricing Model",
              "infloq": "Pay-per-click performance model",
              "competitor": "Free tier with paid scaling options",
              "description": "Platform cost structure"
            },
            {
              "name": "Entry Point",
              "infloq": "Waitlist with minimum credit purchase",
              "competitor": "Free to start, scale as needed",
              "description": "Initial platform access"
            },
            {
              "name": "Target Market",
              "infloq": ["Brands", "Agencies", "Enterprise"],
              "competitor": ["Small businesses", "Startups", "Solopreneurs", "Small agencies"],
              "description": "Primary target audience"
            }
          ]
        },
        {
          "category": "Technology & Innovation",
          "features": [
            {
              "name": "AI Implementation",
              "infloq": ["Creator matching", "Performance prediction", "Campaign optimization"],
              "competitor": ["Basic search filters", "Manual discovery"],
              "description": "Use of AI technology"
            },
            {
              "name": "Additional Tools",
              "infloq": "Comprehensive analytics suite",
              "competitor": ["Fake follower checker", "Platform-specific audit tools", "Engagement calculators"],
              "description": "Supplementary platform features"
            }
          ]
        }
      ]
    },
  "creatorco": {
    name: "Creator.co",
    shortDescription: "Traditional micro-influencer platform focused on product collaborations",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/creatorco.png",
    features: [
      {
        category: "Creator Discovery & Matching",
        features: [
          {
            name: "Matching Technology",
            infloq: "AI-powered matching with performance prediction",
            competitor: "Manual matching based on basic metrics",
            description: "Method of connecting brands with creators"
          },
          {
            name: "Creator Verification",
            infloq: "Advanced AI-driven metrics verification",
            competitor: "Basic profile verification",
            description: "Process of validating creator authenticity"
          },
          {
            name: "Creator Network",
            infloq: ["All major platforms", "Global reach", "Performance-based selection"],
            competitor: ["Limited platform focus", "Primarily micro-influencers", "Manual selection"],
            description: "Scope and quality of creator network"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Payment Structure",
            infloq: "Performance-based pay-per-click",
            competitor: "Product-based compensation",
            description: "How creators are compensated"
          },
          {
            name: "Campaign Setup",
            infloq: "Automated AI-driven setup and optimization",
            competitor: "Manual campaign creation",
            description: "Process of setting up influencer campaigns"
          },
          {
            name: "Performance Tracking",
            infloq: "Real-time analytics and ROI tracking",
            competitor: "Basic engagement metrics",
            description: "Campaign measurement capabilities"
          }
        ]
      },
      {
        category: "Platform Intelligence",
        features: [
          {
            name: "Data Analysis",
            infloq: ["AI-powered performance prediction", "Audience quality scoring", "Conversion tracking"],
            competitor: ["Basic metrics tracking", "Engagement rates", "Profile statistics"],
            description: "Depth of analytical capabilities"
          },
          {
            name: "Optimization Tools",
            infloq: "AI-driven campaign optimization",
            competitor: "Manual optimization suggestions",
            description: "Tools for improving campaign performance"
          }
        ]
      },
      {
        category: "Creator Support",
        features: [
          {
            name: "Earnings Model",
            infloq: "Performance-based earnings",
            competitor: "Product gifting focus",
            description: "How creators can monetize"
          },
          {
            name: "Growth Tools",
            infloq: ["AI performance insights", "Revenue optimization", "Audience analysis"],
            competitor: ["Basic analytics", "Community support"],
            description: "Tools for creator growth"
          }
        ]
      },
      {
        category: "Brand Benefits",
        features: [
          {
            name: "ROI Measurement",
            infloq: "Precise click and conversion tracking",
            competitor: "Basic engagement metrics",
            description: "Ability to measure campaign success"
          },
          {
            name: "Campaign Control",
            infloq: "Full performance-based control",
            competitor: "Limited campaign control",
            description: "Level of brand control over campaigns"
          },
          {
            name: "Cost Structure",
            infloq: "Pay for performance only",
            competitor: "Product cost + platform fees",
            description: "Campaign cost structure"
          }
        ]
      },
      {
        category: "Technology Features",
        features: [
          {
            name: "Platform Intelligence",
            infloq: ["AI matching", "Performance prediction", "Automated optimization"],
            competitor: ["Basic matching", "Manual optimization"],
            description: "Advanced technology features"
          },
          {
            name: "Integration Capabilities",
            infloq: "Automated analytics integration",
            competitor: "Manual data input",
            description: "Ability to connect with other tools"
          }
        ]
      }
    ]
  },
  "grin": {
    name: "GRIN",
    shortDescription: "Enterprise-focused creator management platform with comprehensive workflow tools",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/grin.png",
    features: [
      {
        category: "Creator Discovery",
        features: [
          {
            name: "Discovery Technology",
            infloq: "AI-powered creator matching with performance prediction",
            competitor: "Traditional search and filter system",
            description: "Method of finding and evaluating creators"
          },
          {
            name: "Verification Process",
            infloq: "Automated AI-driven authenticity verification",
            competitor: "Manual verification process",
            description: "How creator authenticity is verified"
          },
          {
            name: "Creator Quality Assessment",
            infloq: ["AI performance prediction", "Engagement analysis", "Audience quality scoring"],
            competitor: ["Manual review", "Basic metrics analysis", "Historical performance"],
            description: "Methods for evaluating creator quality"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Campaign Setup",
            infloq: "AI-automated campaign creation and optimization",
            competitor: "Manual workflow setup",
            description: "Process of creating and managing campaigns"
          },
          {
            name: "Performance Tracking",
            infloq: "Real-time AI-powered performance tracking",
            competitor: "Traditional metrics dashboard",
            description: "Campaign monitoring capabilities"
          },
          {
            name: "Content Management",
            infloq: "AI-assisted content review and optimization",
            competitor: "Manual content review system",
            description: "Content approval and management process"
          }
        ]
      },
      {
        category: "ROI & Analytics",
        features: [
          {
            name: "Performance Metrics",
            infloq: ["Real-time ROI tracking", "Conversion attribution", "Click tracking"],
            competitor: ["Basic engagement metrics", "Content performance", "Campaign reporting"],
            description: "Available performance metrics"
          },
          {
            name: "Data Analysis",
            infloq: "AI-powered performance analysis and predictions",
            competitor: "Manual data analysis tools",
            description: "Analytical capabilities"
          },
          {
            name: "Reporting",
            infloq: "Automated real-time reporting",
            competitor: "Manual report generation",
            description: "Reporting capabilities"
          }
        ]
      },
      {
        category: "Payment & Compensation",
        features: [
          {
            name: "Payment Model",
            infloq: "Performance-based pay-per-click",
            competitor: "Fixed-rate or negotiated payments",
            description: "How creators are compensated"
          },
          {
            name: "Payment Processing",
            infloq: "Automated performance-based payments",
            competitor: "Manual payment processing",
            description: "Payment handling system"
          }
        ]
      },
      {
        category: "Platform Integration",
        features: [
          {
            name: "Integration Capabilities",
            infloq: ["Automated social platform integration", "Analytics integration", "E-commerce integration"],
            competitor: ["Manual platform connections", "Limited automation", "Basic e-commerce integration"],
            description: "Platform connectivity options"
          },
          {
            name: "Workflow Automation",
            infloq: "AI-driven workflow automation",
            competitor: "Template-based automation",
            description: "Level of automated processes"
          }
        ]
      },
      {
        category: "Pricing & Value",
        features: [
          {
            name: "Cost Structure",
            infloq: "Performance-based pricing",
            competitor: "Enterprise subscription model",
            description: "Platform pricing model"
          },
          {
            name: "ROI Guarantee",
            infloq: "Pay for performance only",
            competitor: "No ROI guarantee",
            description: "Performance guarantees"
          },
          {
            name: "Minimum Investment",
            infloq: "No minimum requirement",
            competitor: "Enterprise-level minimums",
            description: "Required minimum spend"
          }
        ]
      }
    ]
  },
  "influencity": {
    name: "Influencity",
    shortDescription: "Data-driven influencer platform with traditional campaign management",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/influencity.png",
    features: [
      {
        category: "Discovery & Analytics",
        features: [
          {
            name: "Influencer Discovery",
            infloq: "AI-powered matching with performance prediction",
            competitor: "Database search with filters",
            description: "Method of finding and evaluating influencers"
          },
          {
            name: "Analytics Depth",
            infloq: ["Real-time performance tracking", "AI-driven predictions", "Conversion analysis"],
            competitor: ["Historical data analysis", "Basic metrics", "Manual reporting"],
            description: "Depth and sophistication of analytics"
          },
          {
            name: "Data Access",
            infloq: "Real-time data with AI insights",
            competitor: "On-demand profile statistics",
            description: "How platform accesses and processes data"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Campaign Setup",
            infloq: "AI-automated campaign creation",
            competitor: "Manual workflow setup",
            description: "Process of creating campaigns"
          },
          {
            name: "Performance Optimization",
            infloq: "Real-time AI optimization",
            competitor: "Manual optimization tools",
            description: "How campaigns are optimized"
          },
          {
            name: "ROI Tracking",
            infloq: "Automated real-time ROI tracking",
            competitor: "Manual ROI calculation",
            description: "Method of tracking return on investment"
          }
        ]
      },
      {
        category: "Platform Intelligence",
        features: [
          {
            name: "AI Integration",
            infloq: ["Creator matching", "Performance prediction", "Content analysis", "Automated optimization"],
            competitor: ["Basic filters", "Manual analysis", "Standard metrics"],
            description: "Use of artificial intelligence"
          },
          {
            name: "Data Analysis",
            infloq: "AI-powered real-time analysis",
            competitor: "Traditional metrics analysis",
            description: "Data analysis capabilities"
          }
        ]
      },
      {
        category: "E-commerce Integration",
        features: [
          {
            name: "Store Integration",
            infloq: "Direct performance tracking",
            competitor: "Basic Shopify integration",
            description: "E-commerce integration capabilities"
          },
          {
            name: "Sales Attribution",
            infloq: "Real-time attribution tracking",
            competitor: "Manual sales tracking",
            description: "How sales are attributed to creators"
          }
        ]
      },
      {
        category: "Creator Management",
        features: [
          {
            name: "Relationship Management",
            infloq: "AI-assisted relationship management",
            competitor: "Traditional CRM features",
            description: "Tools for managing creator relationships"
          },
          {
            name: "Payment System",
            infloq: "Automated performance-based payments",
            competitor: "Manual payment processing",
            description: "Creator payment handling"
          }
        ]
      },
      {
        category: "Pricing & Value",
        features: [
          {
            name: "Cost Model",
            infloq: "Performance-based pricing",
            competitor: "Subscription-based",
            description: "Platform pricing structure"
          },
          {
            name: "Minimum Commitment",
            infloq: "No minimum requirement",
            competitor: "Contract requirements",
            description: "Required minimum investment"
          },
          {
            name: "ROI Guarantee",
            infloq: true,
            competitor: false,
            description: "Performance-based guarantees"
          }
        ]
      }
    ]
  },
  "izea": {
    name: "IZEA",
    shortDescription: "Pioneer influencer marketing platform with full-service agency capabilities",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/izea.png",
    features: [
      {
        category: "Platform Technology",
        features: [
          {
            name: "AI Implementation",
            infloq: ["Advanced AI matching", "Performance prediction", "Campaign optimization"],
            competitor: ["Basic FormAI for content", "Traditional matching", "Manual optimization"],
            description: "Use of artificial intelligence in platform"
          },
          {
            name: "Creator Discovery",
            infloq: "AI-powered creator matching with performance prediction",
            competitor: "Traditional database search",
            description: "Method of finding suitable creators"
          },
          {
            name: "Performance Analysis",
            infloq: "Real-time AI analytics",
            competitor: "Standard metrics tracking",
            description: "Campaign performance tracking capabilities"
          }
        ]
      },
      {
        category: "Service Model",
        features: [
          {
            name: "Service Approach",
            infloq: "Automated self-service platform",
            competitor: "Full-service agency + platform",
            description: "How services are delivered"
          },
          {
            name: "Campaign Management",
            infloq: "AI-driven automated management",
            competitor: "Manual management with team support",
            description: "Campaign handling process"
          },
          {
            name: "Strategy Development",
            infloq: "AI-powered strategy recommendations",
            competitor: "Human expert consultation",
            description: "Approach to strategy creation"
          }
        ]
      },
      {
        category: "Creator Features",
        features: [
          {
            name: "Creator Tools",
            infloq: ["AI performance insights", "Automated matching", "Real-time analytics"],
            competitor: ["Mobile app", "Casting calls", "Basic analytics"],
            description: "Tools available for creators"
          },
          {
            name: "Payment System",
            infloq: "Performance-based automated payments",
            competitor: "Traditional payment processing",
            description: "How creators are compensated"
          }
        ]
      },
      {
        category: "Platform Intelligence",
        features: [
          {
            name: "Data Analysis",
            infloq: "AI-powered real-time analysis",
            competitor: "Traditional metrics and reporting",
            description: "Data analysis capabilities"
          },
          {
            name: "Optimization Tools",
            infloq: "Automated AI optimization",
            competitor: "Manual optimization with team support",
            description: "Campaign optimization capabilities"
          }
        ]
      },
      {
        category: "Business Model",
        features: [
          {
            name: "Pricing Structure",
            infloq: "Performance-based pricing",
            competitor: "Service retainer + platform fees",
            description: "Cost structure for clients"
          },
          {
            name: "ROI Measurement",
            infloq: "Real-time performance tracking",
            competitor: "Traditional ROI reporting",
            description: "How ROI is measured"
          },
          {
            name: "Minimum Investment",
            infloq: "No minimum requirement",
            competitor: "High minimum for full service",
            description: "Required minimum spend"
          }
        ]
      },
      {
        category: "Platform Focus",
        features: [
          {
            name: "Target Market",
            infloq: "Modern brands seeking automation",
            competitor: "Enterprise brands needing full service",
            description: "Primary target audience"
          },
          {
            name: "Technology Focus",
            infloq: "AI-first approach",
            competitor: "Traditional service-first approach",
            description: "Core technology philosophy"
          }
        ]
      }
    ]
  },
  "insightiq": {
    name: "InsightIQ",
    shortDescription: "AI-powered influencer discovery and analysis platform",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/insightiq.png",
    features: [
      {
        category: "AI Capabilities",
        features: [
          {
            name: "AI Implementation",
            infloq: ["Performance prediction", "Campaign optimization", "ROI forecasting", "Automated matching"],
            competitor: ["Brand safety scanning", "Comment sentiment analysis", "Content classification"],
            description: "Core AI functionalities"
          },
          {
            name: "Data Analysis",
            infloq: "Real-time performance analytics",
            competitor: "Historical data analysis",
            description: "Data processing capabilities"
          },
          {
            name: "Brand Safety",
            infloq: "Basic content screening",
            competitor: "GARM-compliant AI content scanning",
            description: "Content safety measures"
          }
        ]
      },
      {
        category: "Creator Discovery",
        features: [
          {
            name: "Database Size",
            infloq: "Verified creator network",
            competitor: "450M+ creator profiles",
            description: "Size of creator database"
          },
          {
            name: "Discovery Method",
            infloq: "AI-powered performance matching",
            competitor: "Multi-filter search system",
            description: "How creators are found"
          },
          {
            name: "Verification Process",
            infloq: "Performance-based verification",
            competitor: "Data-driven authenticity checks",
            description: "Creator verification approach"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Performance Tracking",
            infloq: "Real-time performance metrics",
            competitor: "Continuous campaign reporting",
            description: "Campaign monitoring capabilities"
          },
          {
            name: "ROI Measurement",
            infloq: "Direct performance tracking",
            competitor: "Total Media Value calculation",
            description: "ROI tracking methods"
          },
          {
            name: "Optimization",
            infloq: "Automated real-time optimization",
            competitor: "Manual optimization with insights",
            description: "Campaign optimization approach"
          }
        ]
      },
      {
        category: "Platform Features",
        features: [
          {
            name: "Data Integration",
            infloq: "Performance-focused metrics",
            competitor: "Normalized cross-platform data",
            description: "Data handling approach"
          },
          {
            name: "Audience Analysis",
            infloq: "Basic demographic data",
            competitor: "Advanced audience insights",
            description: "Audience analysis capabilities"
          },
          {
            name: "Reporting Tools",
            infloq: "Automated performance reports",
            competitor: "Comprehensive analytics dashboard",
            description: "Reporting capabilities"
          }
        ]
      },
      {
        category: "Business Model",
        features: [
          {
            name: "Pricing Model",
            infloq: "Performance-based pricing",
            competitor: "Subscription-based",
            description: "Cost structure"
          },
          {
            name: "ROI Guarantee",
            infloq: true,
            competitor: false,
            description: "Performance guarantees"
          },
          {
            name: "API Access",
            infloq: "Basic API",
            competitor: "Comprehensive API suite",
            description: "API capabilities"
          }
        ]
      },
      {
        category: "Unique Strengths",
        features: [
          {
            name: "Key Differentiator",
            infloq: "Performance-based payments",
            competitor: "Vast data insights",
            description: "Primary platform advantage"
          },
          {
            name: "Target Users",
            infloq: "Results-focused brands",
            competitor: "Data-driven marketers",
            description: "Primary target audience"
          }
        ]
      }
    ]
  },
};