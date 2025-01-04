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
  "later-influence": {
    name: "Later Influence",
    shortDescription: "Full-funnel influencer marketing platform with 10+ years of performance data",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/later.png",
    features: [
      {
        category: "Platform Reach",
        features: [
          {
            name: "Creator Network",
            infloq: "Curated network of verified creators",
            competitor: "10M+ influencers across platforms",
            description: "Size and scope of creator network"
          },
          {
            name: "Platform Partnerships",
            infloq: "Standard platform integrations",
            competitor: ["Pinterest Partner", "TikTok Partner", "Rakuten Partner"],
            description: "Official platform partnerships"
          },
          {
            name: "Content Types",
            infloq: ["Social posts", "Stories", "Videos"],
            competitor: ["Viral content", "UGC", "Reviews", "Multi-platform content"],
            description: "Supported content formats"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Campaign Setup",
            infloq: "AI-driven campaign optimization",
            competitor: "Data-backed campaign strategy",
            description: "Campaign setup approach"
          },
          {
            name: "Creator Communication",
            infloq: "Direct messaging system",
            competitor: "Automated templated messaging",
            description: "Creator communication tools"
          },
          {
            name: "Workflow Automation",
            infloq: "AI-assisted workflow",
            competitor: "End-to-end automated management",
            description: "Campaign workflow automation"
          }
        ]
      },
      {
        category: "Data & Analytics",
        features: [
          {
            name: "Performance Data",
            infloq: "Real-time performance metrics",
            competitor: "10+ years of proprietary data",
            description: "Depth of performance data"
          },
          {
            name: "Benchmarking",
            infloq: "Basic industry benchmarks",
            competitor: "Extensive historical benchmarks",
            description: "Benchmarking capabilities"
          },
          {
            name: "ROI Tracking",
            infloq: ["Click tracking", "Conversion analysis"],
            competitor: ["Full-funnel attribution", "EMV calculation", "Shopify integration"],
            description: "ROI measurement tools"
          }
        ]
      },
      {
        category: "Content Strategy",
        features: [
          {
            name: "Content Planning",
            infloq: "AI-powered content suggestions",
            competitor: "Strategic content planning services",
            description: "Content strategy approach"
          },
          {
            name: "Content Syndication",
            infloq: "Basic content rights",
            competitor: "Advanced content syndication",
            description: "Content distribution capabilities"
          },
          {
            name: "Content Management",
            infloq: "Basic content library",
            competitor: "Integrated content calendar and planner",
            description: "Content management tools"
          }
        ]
      },
      {
        category: "Service Level",
        features: [
          {
            name: "Support Model",
            infloq: ["Email support", "Account manager (Growth+)"],
            competitor: ["Custom campaign services", "In-house expert team", "Full-service management"],
            description: "Available support options"
          },
          {
            name: "Strategic Services",
            infloq: "AI-driven recommendations",
            competitor: "Full-service campaign management",
            description: "Strategic support level"
          },
          {
            name: "Implementation",
            infloq: "Self-service platform",
            competitor: "Managed service available",
            description: "Platform implementation"
          }
        ]
      },
      {
        category: "Pricing & Business Model",
        features: [
          {
            name: "Pricing Model",
            infloq: "Performance-based (pay per click)",
            competitor: "Subscription + campaign costs",
            description: "Cost structure"
          },
          {
            name: "Payment Options",
            infloq: "Credit-based system",
            competitor: "Custom pricing based on services",
            description: "Payment structure"
          },
          {
            name: "Target Market",
            infloq: "Small to mid-sized brands",
            competitor: "Enterprise and growing brands",
            description: "Primary target audience"
          }
        ]
      }
    ]
  },
  "hypeauditor": {
    name: "HypeAuditor",
    shortDescription: "Data-driven influencer analytics and campaign management platform",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/hypeauditor.png",
    features: [
      {
        category: "Analytics & Insights",
        features: [
          {
            name: "Core Focus",
            infloq: "Performance optimization",
            competitor: "Influencer analytics and verification",
            description: "Primary platform strength"
          },
          {
            name: "Data Analysis",
            infloq: "AI-driven performance metrics",
            competitor: "Big data analytics and audience insights",
            description: "Data analysis approach"
          },
          {
            name: "Market Intelligence",
            infloq: "Basic competitor analysis",
            competitor: "Comprehensive market analysis tools",
            description: "Market research capabilities"
          }
        ]
      },
      {
        category: "Platform Tools",
        features: [
          {
            name: "Discovery Method",
            infloq: "AI-powered matching",
            competitor: "Advanced search and filtering",
            description: "Influencer discovery approach"
          },
          {
            name: "Automation Level",
            infloq: "Full campaign automation",
            competitor: "Selective process automation",
            description: "Automation capabilities"
          },
          {
            name: "Technology Stack",
            infloq: ["AI matching", "Performance prediction"],
            competitor: ["Big data analysis", "Audience verification", "Fraud detection"],
            description: "Core technologies used"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Campaign Setup",
            infloq: "AI-assisted campaign creation",
            competitor: "Data-driven campaign planning",
            description: "Campaign initialization process"
          },
          {
            name: "Performance Tracking",
            infloq: "Real-time performance metrics",
            competitor: "In-depth analytics and reporting",
            description: "Campaign monitoring capabilities"
          },
          {
            name: "Optimization",
            infloq: "Automated optimization",
            competitor: "Data-backed recommendations",
            description: "Campaign optimization approach"
          }
        ]
      },
      {
        category: "Professional Services",
        features: [
          {
            name: "Support Level",
            infloq: ["Email support", "Account management"],
            competitor: ["Professional services", "Migration support", "Training"],
            description: "Available support options"
          },
          {
            name: "Educational Resources",
            infloq: "Basic documentation",
            competitor: "HypeAuditor Academy",
            description: "Learning resources"
          },
          {
            name: "Implementation",
            infloq: "Self-service platform",
            competitor: "Guided implementation",
            description: "Platform implementation approach"
          }
        ]
      },
      {
        category: "Integration & Tools",
        features: [
          {
            name: "Free Tools",
            infloq: "Limited free tools",
            competitor: "Comprehensive free tool suite",
            description: "Complementary tools offered"
          },
          {
            name: "Platform Integration",
            infloq: "Standard integrations",
            competitor: "Advanced integration options",
            description: "Integration capabilities"
          },
          {
            name: "Partner Ecosystem",
            infloq: false,
            competitor: "Partner program available",
            description: "Partnership opportunities"
          }
        ]
      },
      {
        category: "Business Model",
        features: [
          {
            name: "Pricing Approach",
            infloq: "Performance-based pricing",
            competitor: "Subscription-based model",
            description: "Cost structure"
          },
          {
            name: "Target Market",
            infloq: "Growing brands and businesses",
            competitor: "Agencies and enterprise brands",
            description: "Primary audience"
          },
          {
            name: "Value Proposition",
            infloq: "Pay-for-performance model",
            competitor: "Data accuracy and insights",
            description: "Core platform value"
          }
        ]
      }
    ]
  },
  "hashtag-paid": {
    name: "#paid",
    shortDescription: "Creator marketplace platform with expert creative strategy support",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/paid.png",
    features: [
      {
        category: "Platform Model",
        features: [
          {
            name: "Core Approach",
            infloq: "AI-driven matching and automation",
            competitor: "Curated marketplace with expert support",
            description: "Primary platform methodology"
          },
          {
            name: "Creator Network",
            infloq: "AI-verified creators across platforms",
            competitor: "Curated creator marketplace",
            description: "Creator ecosystem approach"
          },
          {
            name: "Matching System",
            infloq: "Automated AI matching algorithm",
            competitor: "Data-driven manual matching with expert oversight",
            description: "How brands and creators are matched"
          }
        ]
      },
      {
        category: "Campaign Support",
        features: [
          {
            name: "Creative Strategy",
            infloq: "AI-assisted content recommendations",
            competitor: "Expert creative team support",
            description: "Creative direction and strategy support"
          },
          {
            name: "Campaign Management",
            infloq: ["Automated optimization", "AI-driven insights"],
            competitor: ["Expert team guidance", "Research-backed strategy", "Industry benchmarks"],
            description: "Campaign management approach"
          },
          {
            name: "Content Usage",
            infloq: "Digital platforms focus",
            competitor: "Multi-channel repurposing (including OOH, print)",
            description: "Content usage flexibility"
          }
        ]
      },
      {
        category: "Analytics & Measurement",
        features: [
          {
            name: "Performance Tracking",
            infloq: ["Real-time analytics", "Click tracking", "Conversion metrics"],
            competitor: ["Live reporting", "Post-campaign insights", "Creative element analysis"],
            description: "Performance measurement capabilities"
          },
          {
            name: "ROI Measurement",
            infloq: "Performance-based metrics",
            competitor: "Campaign effectiveness analysis",
            description: "ROI tracking approach"
          }
        ]
      },
      {
        category: "Creator Experience",
        features: [
          {
            name: "Creator Support",
            infloq: "Automated support system",
            competitor: "Dedicated creator success team",
            description: "Level of creator support"
          },
          {
            name: "Community Building",
            infloq: "Online community",
            competitor: "In-person events and networking",
            description: "Community engagement approach"
          },
          {
            name: "Payment Model",
            infloq: "Performance-based payments",
            competitor: "Campaign-based payments",
            description: "How creators are compensated"
          }
        ]
      },
      {
        category: "Brand Experience",
        features: [
          {
            name: "Workflow Automation",
            infloq: "AI-driven automation",
            competitor: "Managed workflow with expert support",
            description: "Campaign workflow approach"
          },
          {
            name: "Brand Safety",
            infloq: "AI verification system",
            competitor: "Manual curation and verification",
            description: "Creator verification process"
          },
          {
            name: "Strategic Support",
            infloq: "AI-generated recommendations",
            competitor: "Expert team consultation",
            description: "Level of strategic support"
          }
        ]
      },
      {
        category: "Pricing & Investment",
        features: [
          {
            name: "Pricing Model",
            infloq: "Pay-per-click performance",
            competitor: "Campaign-based pricing",
            description: "Cost structure"
          },
          {
            name: "Platform Fee",
            infloq: "30% platform fee",
            competitor: "Variable based on services",
            description: "Platform fee structure"
          },
          {
            name: "Minimum Investment",
            infloq: "$500 starting point",
            competitor: "Custom campaign minimums",
            description: "Minimum investment required"
          }
        ]
      }
    ]
  },
  "modash": {
    name: "Modash",
    shortDescription: "Comprehensive influencer discovery and analytics platform with automated tracking",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/modash.png",
    features: [
      {
        category: "Influencer Discovery",
        features: [
          {
            name: "Database Size",
            infloq: "AI-curated network of verified creators",
            competitor: "250M+ profiles across platforms",
            description: "Size and scope of influencer database"
          },
          {
            name: "Platform Coverage",
            infloq: ["Instagram", "TikTok", "YouTube", "Twitter/X", "LinkedIn", "Pinterest", "Twitch", "Facebook"],
            competitor: ["Instagram", "TikTok", "YouTube"],
            description: "Supported social media platforms"
          },
          {
            name: "Search Capabilities",
            infloq: "AI-powered creator matching",
            competitor: "Advanced filters and lookalike search",
            description: "Methods for finding relevant creators"
          }
        ]
      },
      {
        category: "Analytics & Verification",
        features: [
          {
            name: "Audience Analytics",
            infloq: "AI-driven audience quality analysis",
            competitor: "Detailed demographic and performance metrics",
            description: "Depth of audience insight data"
          },
          {
            name: "Verification Process",
            infloq: "AI-powered verification system",
            competitor: "Automated metrics verification",
            description: "Creator verification methodology"
          },
          {
            name: "Performance Tracking",
            infloq: "Real-time performance tracking",
            competitor: "Automated content and performance collection",
            description: "Campaign monitoring capabilities"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Content Collection",
            infloq: "Manual tracking with automated reporting",
            competitor: "Automatic content collection without authentication",
            description: "Method of collecting campaign content"
          },
          {
            name: "Integration Options",
            infloq: "One-click platform integrations",
            competitor: "Shopify integration for revenue tracking",
            description: "Platform integration capabilities"
          },
          {
            name: "Campaign Workflow",
            infloq: "AI-assisted campaign management",
            competitor: "End-to-end campaign management platform",
            description: "Campaign management features"
          }
        ]
      },
      {
        category: "Pricing & Business Model",
        features: [
          {
            name: "Pricing Structure",
            infloq: "Performance-based (pay per click)",
            competitor: "Subscription-based platform access",
            description: "Cost structure for services"
          },
          {
            name: "Minimum Investment",
            infloq: "Starting at $500 (5,000 credits)",
            competitor: "14-day free trial, then custom pricing",
            description: "Initial investment required"
          },
          {
            name: "Payment Model",
            infloq: "Credit-based system with 30% platform fee",
            competitor: "Subscription + optional payment handling",
            description: "Payment handling and fees"
          }
        ]
      },
      {
        category: "Technology",
        features: [
          {
            name: "Core Technology",
            infloq: ["AI-powered matching", "Performance prediction", "Campaign optimization"],
            competitor: ["Data-driven analytics", "Automated tracking", "API access"],
            description: "Primary technology features"
          },
          {
            name: "Data Collection",
            infloq: "AI-driven data aggregation",
            competitor: "Direct platform data access",
            description: "Method of collecting creator data"
          }
        ]
      },
      {
        category: "Additional Features",
        features: [
          {
            name: "API Access",
            infloq: false,
            competitor: true,
            description: "Availability of API access"
          },
          {
            name: "Custom Integration",
            infloq: "Available on enterprise plan",
            competitor: "Available through API",
            description: "Custom integration options"
          },
          {
            name: "Support Level",
            infloq: ["Email support", "Dedicated manager (Growth+)"],
            competitor: ["Helpdesk", "Direct support", "Academy resources"],
            description: "Available support options"
          }
        ]
      }
    ]
  },
  "captiv8": {
    name: "Captiv8",
    shortDescription: "End-to-end enterprise influencer marketing platform with award-winning services",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/captiv8.png",
    features: [
      {
        category: "Platform Capabilities",
        features: [
          {
            name: "Core Focus",
            infloq: "AI-driven performance marketing",
            competitor: "End-to-end enterprise solution",
            description: "Primary platform strength"
          },
          {
            name: "Data Intelligence",
            infloq: "AI-powered insights",
            competitor: "AI/ML predictive analytics with first-party data",
            description: "Data analysis capabilities"
          },
          {
            name: "Platform Integration",
            infloq: "Standard platform connections",
            competitor: ["TikTok API integration", "Facebook API", "Instagram API", "Twitter API", "YouTube API"],
            description: "Platform integration depth"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Payment Models",
            infloq: "Performance-based payments",
            competitor: "Multiple payment model support",
            description: "Creator payment options"
          },
          {
            name: "Content Amplification",
            infloq: "Basic boost options",
            competitor: "Advanced paid channel amplification",
            description: "Content promotion capabilities"
          },
          {
            name: "Campaign Tracking",
            infloq: "Real-time performance metrics",
            competitor: "Full-funnel transparency",
            description: "Campaign monitoring depth"
          }
        ]
      },
      {
        category: "Service Options",
        features: [
          {
            name: "Service Model",
            infloq: ["Self-service platform", "Basic support"],
            competitor: ["SaaS+", "Full-service option", "Expert strategy team"],
            description: "Available service levels"
          },
          {
            name: "Strategic Support",
            infloq: "AI-generated recommendations",
            competitor: "In-house brand strategy experts",
            description: "Strategic guidance offering"
          },
          {
            name: "Implementation",
            infloq: "Self-guided setup",
            competitor: "Managed implementation",
            description: "Platform implementation approach"
          }
        ]
      },
      {
        category: "Diversity & Inclusion",
        features: [
          {
            name: "DEI Features",
            infloq: "Basic diversity filters",
            competitor: "Built-in diversity discovery and programs",
            description: "Diversity support features"
          },
          {
            name: "Creator Identity",
            infloq: "Standard profile information",
            competitor: "Self-identification options for creators",
            description: "Creator profile depth"
          },
          {
            name: "DEI Initiatives",
            infloq: false,
            competitor: "Dedicated DEI program (Cr8 Change)",
            description: "Diversity initiatives"
          }
        ]
      },
      {
        category: "Analytics & Reporting",
        features: [
          {
            name: "Data Access",
            infloq: "Platform analytics",
            competitor: "Open API access",
            description: "Data accessibility"
          },
          {
            name: "Analytics Depth",
            infloq: ["Performance metrics", "ROI tracking"],
            competitor: ["Predictive analytics", "Custom insights", "Cross-platform data"],
            description: "Analytics capabilities"
          },
          {
            name: "Reporting Tools",
            infloq: "Automated reporting",
            competitor: "Enterprise-grade reporting suite",
            description: "Reporting capabilities"
          }
        ]
      },
      {
        category: "Enterprise Features",
        features: [
          {
            name: "Scale Support",
            infloq: "Growing business focus",
            competitor: "Enterprise-grade infrastructure",
            description: "Platform scalability"
          },
          {
            name: "Industry Recognition",
            infloq: "New platform",
            competitor: ["#1 Enterprise Leader on G2", "5-star IMH rating", "Forrester Leader"],
            description: "Platform recognition"
          },
          {
            name: "Target Market",
            infloq: "Small to mid-sized businesses",
            competitor: "Enterprise and established brands",
            description: "Primary audience"
          }
        ]
      }
    ]
  },
  "traackr": {
    name: "Traackr",
    shortDescription: "Enterprise-focused influencer marketing platform with comprehensive data analytics",
    category: "Influencer Marketing Platform",
    comparisonImage: "/images/comparisons/traackr.png",
    features: [
      {
        category: "Platform Focus",
        features: [
          {
            name: "Target Market",
            infloq: "Small to mid-sized businesses",
            competitor: "Enterprise brands and agencies",
            description: "Primary target audience"
          },
          {
            name: "Core Strength",
            infloq: "AI-powered matching and performance pricing",
            competitor: "Data analytics and market benchmarking",
            description: "Platform's main value proposition"
          },
          {
            name: "Implementation",
            infloq: "Self-service platform",
            competitor: "Full-service with expert team support",
            description: "Platform implementation approach"
          }
        ]
      },
      {
        category: "Analytics & Insights",
        features: [
          {
            name: "Market Intelligence",
            infloq: "Basic competitor analysis",
            competitor: "Comprehensive market benchmarking",
            description: "Market analysis capabilities"
          },
          {
            name: "Performance Metrics",
            infloq: ["Engagement rates", "Click tracking", "Conversion analysis"],
            competitor: ["Brand impact metrics", "Industry benchmarks", "Competitive analysis", "ROI calculation"],
            description: "Available analytics metrics"
          },
          {
            name: "Data Scale",
            infloq: "Verified creator network",
            competitor: "Largest global influencer dataset",
            description: "Scope of available data"
          }
        ]
      },
      {
        category: "Campaign Management",
        features: [
          {
            name: "Campaign Tools",
            infloq: ["AI campaign optimization", "Automated reporting", "Performance tracking"],
            competitor: ["Product seeding", "Paid campaigns", "Affiliate programs", "Social commerce"],
            description: "Campaign management features"
          },
          {
            name: "Collaboration",
            infloq: "Direct creator communication",
            competitor: "Multi-stakeholder coordination",
            description: "Collaboration capabilities"
          },
          {
            name: "Program Types",
            infloq: "Performance-based campaigns",
            competitor: "Full-spectrum campaign types",
            description: "Supported campaign types"
          }
        ]
      },
      {
        category: "Enterprise Features",
        features: [
          {
            name: "Governance",
            infloq: "Basic compliance tools",
            competitor: "Enterprise governance & compliance",
            description: "Governance capabilities"
          },
          {
            name: "Team Management",
            infloq: "Basic team roles",
            competitor: "Advanced team coordination",
            description: "Team management features"
          },
          {
            name: "Agency Integration",
            infloq: false,
            competitor: true,
            description: "Agency partnership features"
          }
        ]
      },
      {
        category: "Support & Services",
        features: [
          {
            name: "Expert Support",
            infloq: ["Email support", "Account manager (Growth+)"],
            competitor: ["Dedicated expert team", "Strategic consulting", "Training"],
            description: "Available support options"
          },
          {
            name: "Resources",
            infloq: "Basic documentation",
            competitor: "Comprehensive industry reports & guides",
            description: "Educational resources"
          }
        ]
      },
      {
        category: "Pricing & Business Model",
        features: [
          {
            name: "Pricing Model",
            infloq: "Performance-based (pay per click)",
            competitor: "Enterprise subscription",
            description: "Cost structure"
          },
          {
            name: "Contract Terms",
            infloq: "Flexible credit-based system",
            competitor: "Annual contracts",
            description: "Contract requirements"
          },
          {
            name: "Investment Level",
            infloq: "Starting at $500",
            competitor: "Enterprise-level investment",
            description: "Required investment"
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