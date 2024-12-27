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
      olly: boolean | string | string[];
      competitor: boolean | string | string[];
      description?: string;
    }[];
  }
  
  export const competitors: Record<string, Competitor> = {
    "qura": {
      name: "Qura.ai",
      shortDescription: "Basic AI-powered social media automation tool",
      category: "Social Media Management",
      comparisonImage: "/images/comparisons/qura.png",
      features: [
        {
          category: "AI Capabilities",
          features: [
            {
              name: "AI Models",
              olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
              competitor: ["OpenAI"],
              description: "Available AI language models for content generation"
            },
            {
              name: "Custom AI Personalities",
              olly: true,
              competitor: false,
              description: "Create and customize multiple AI voices for different brands"
            },
            {
              name: "Local Model Support",
              olly: true,
              competitor: false,
              description: "Support for running local models via Ollama (Llama, Gemma)"
            }
          ]
        },
        {
          category: "Platform Support",
          features: [
            {
              name: "Supported Platforms",
              olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
              competitor: ["LinkedIn", "Twitter/X", "YouTube"],
              description: "Social media platforms supported for content generation"
            },
            {
              name: "Cross-Platform Features",
              olly: true,
              competitor: false,
              description: "Unified experience and features across all supported platforms"
            }
          ]
        },
        {
          category: "Advanced Features",
          features: [
            {
              name: "Virality Score",
              olly: true,
              competitor: false,
              description: "AI-powered prediction of content performance"
            },
            {
              name: "Custom Comment Panels",
              olly: true,
              competitor: false,
              description: "One-click commenting with customizable templates"
            },
            {
              name: "Custom Actions",
              olly: true,
              competitor: false,
              description: "User-defined prompts and automation tasks"
            }
          ]
        },
        {
          category: "Privacy & Security",
          features: [
            {
              name: "Local Data Storage",
              olly: true,
              competitor: false,
              description: "All user data stored locally, not on servers"
            },
            {
              name: "API Key Security",
              olly: true,
              competitor: false,
              description: "Secure handling of API keys with local storage only"
            }
          ]
        },
        {
          category: "Pricing & Value",
          features: [
            {
              name: "Free Tier",
              olly: "5 comments/day",
              competitor: "Limited credits",
              description: "Features available in free version"
            },
            {
              name: "Starting Price",
              olly: "$9.99/month",
              competitor: "$8.30/month (annual)",
              description: "Base subscription cost"
            },
            {
              name: "Lifetime Option",
              olly: "$49.99",
              competitor: false,
              description: "One-time payment for lifetime access"
            },
            {
              name: "API Cost Transparency",
              olly: true,
              competitor: false,
              description: "Clear API usage calculator and costs"
            }
          ]
        }
      ]
    },
    "replai": {
        name: "Replai.so",
        shortDescription: "Basic Twitter/LinkedIn commenting tool",
        category: "Limited Social Media Management",
        comparisonImage: "/images/comparisons/replai.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["GPT-4"],
                description: "Available AI models for content generation"
              },
              {
                name: "Custom AI Personalities",
                olly: true,
                competitor: false,
                description: "Create and customize AI voices for different brands"
              },
              {
                name: "Local Model Support",
                olly: true,
                competitor: false,
                description: "Support for running local AI models"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["LinkedIn", "Twitter/X"],
                description: "Social media platforms supported"
              },
              {
                name: "Engagement Features",
                olly: ["Comments", "Posts", "Summaries", "Virality Scores"],
                competitor: ["Comments"],
                description: "Available engagement tools"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Virality Prediction",
                olly: true,
                competitor: false,
                description: "AI-powered content performance prediction"
              },
              {
                name: "Custom Comment Panels",
                olly: true,
                competitor: false,
                description: "One-click customizable commenting"
              },
              {
                name: "Analytics",
                olly: true,
                competitor: false,
                description: "Engagement and performance tracking"
              }
            ]
          },
          {
            category: "Privacy & Security",
            features: [
              {
                name: "Data Storage",
                olly: "Local storage only",
                competitor: "Cloud-based",
                description: "User data storage approach"
              },
              {
                name: "API Security",
                olly: true,
                competitor: false,
                description: "Secure API key handling"
              }
            ]
          },
          {
            category: "Pricing & Value",
            features: [
              {
                name: "Free Plan",
                olly: "5 comments/day",
                competitor: "Limited trial",
                description: "Free tier offerings"
              },
              {
                name: "Lifetime Access",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment option"
              },
              {
                name: "Business Features",
                olly: ["Multi-brand support", "Custom actions", "Team collaboration"],
                competitor: ["Basic business features"],
                description: "Enterprise-level capabilities"
              }
            ]
          }
        ]
      },
      "tweetai": {
        name: "TweetAI",
        shortDescription: "Twitter-focused content generator",
        category: "Twitter Management",
        comparisonImage: "/images/comparisons/tweetai.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["GPT-4"],
                description: "AI models supported"
              },
              {
                name: "Platform Customization",
                olly: true,
                competitor: "Limited to Twitter",
                description: "Ability to customize for different platforms"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["Twitter/X"],
                description: "Available social platforms"
              },
              {
                name: "Content Types",
                olly: ["Comments", "Posts", "Threads", "Summaries", "Virality Analysis"],
                competitor: ["Tweets", "Threads", "Replies", "Rewrites"],
                description: "Types of content supported"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Virality Prediction",
                olly: true,
                competitor: "Basic analysis",
                description: "Content performance prediction"
              },
              {
                name: "Multi-Brand Support",
                olly: true,
                competitor: false,
                description: "Support for multiple brand personalities"
              },
              {
                name: "Custom Actions",
                olly: true,
                competitor: false,
                description: "User-defined automation tasks"
              }
            ]
          },
          {
            category: "Privacy & Security",
            features: [
              {
                name: "Data Storage",
                olly: "Local storage only",
                competitor: "Cloud-based",
                description: "User data storage method"
              },
              {
                name: "API Security",
                olly: true,
                competitor: "Standard",
                description: "API key handling security"
              }
            ]
          },
          {
            category: "Pricing",
            features: [
              {
                name: "Free Plan",
                olly: "5 comments/day",
                competitor: "Limited trial",
                description: "Free tier features"
              },
              {
                name: "Starting Price",
                olly: "$9.99/month",
                competitor: "$9.99/month",
                description: "Base subscription cost"
              },
              {
                name: "Lifetime Access",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment option"
              }
            ]
          }
        ]
      },
      "magicreply": {
        name: "MagicReply",
        shortDescription: "Basic Twitter reply generator",
        category: "Twitter Reply Tool",
        comparisonImage: "/images/comparisons/magicreply.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["Basic AI model"],
                description: "Available AI language models"
              },
              {
                name: "AI Personalities",
                olly: true,
                competitor: false,
                description: "Custom AI voice support"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["Twitter/X"],
                description: "Platform coverage"
              },
              {
                name: "Features",
                olly: ["Comments", "Posts", "Threads", "Summaries", "Virality Analysis"],
                competitor: ["Replies only"],
                description: "Available features"
              }
            ]
          },
          {
            category: "Usage Limits",
            features: [
              {
                name: "Monthly Limit",
                olly: "Flexible plans",
                competitor: "3000 replies/month",
                description: "Usage restrictions"
              },
              {
                name: "Custom Actions",
                olly: true,
                competitor: false,
                description: "Automation capabilities"
              }
            ]
          },
          {
            category: "Pricing",
            features: [
              {
                name: "Starting Price",
                olly: "$9.99/month",
                competitor: "$10/month",
                description: "Base price"
              },
              {
                name: "Free Plan",
                olly: "5 comments/day",
                competitor: "Trial only",
                description: "Free tier offering"
              },
              {
                name: "Lifetime Deal",
                olly: "$49.99",
                competitor: false,
                description: "One-time purchase option"
              }
            ]
          },
          {
            category: "Additional Features",
            features: [
              {
                name: "Analytics",
                olly: true,
                competitor: false,
                description: "Performance tracking"
              },
              {
                name: "Multi-brand Support",
                olly: true,
                competitor: false,
                description: "Multiple brand management"
              },
              {
                name: "Privacy Focus",
                olly: "Local storage",
                competitor: "Cloud-based",
                description: "Data storage approach"
              }
            ]
          }
        ]
      },
      "snowball": {
        name: "Snowball",
        shortDescription: "Twitter growth and monetization tool",
        category: "Twitter Management",
        comparisonImage: "/images/comparisons/snowball.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["GPT-4 (Pro plan only)"],
                description: "Available AI models"
              },
              {
                name: "Content Generation",
                olly: ["Comments", "Posts", "Multi-platform content"],
                competitor: ["Tweets", "Threads", "Replies"],
                description: "Content types supported"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["Twitter/X"],
                description: "Supported platforms"
              },
              {
                name: "Post Management",
                olly: ["Scheduling", "Analytics", "Virality Score"],
                competitor: ["Scheduling", "Templates", "Basic Analytics"],
                description: "Content management features"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Virality Prediction",
                olly: true,
                competitor: false,
                description: "AI-powered performance prediction"
              },
              {
                name: "Multi-brand Support",
                olly: true,
                competitor: false,
                description: "Multiple brand management"
              },
              {
                name: "Privacy Focus",
                olly: "Local storage",
                competitor: "Cloud-based",
                description: "Data storage approach"
              }
            ]
          },
          {
            category: "Pricing",
            features: [
              {
                name: "Starting Price",
                olly: "$9.99/month",
                competitor: "$19/month",
                description: "Base subscription cost"
              },
              {
                name: "Free Plan",
                olly: "5 comments/day",
                competitor: "3-day trial",
                description: "Free offering"
              },
              {
                name: "Premium Features",
                olly: "All features included",
                competitor: "Tiered access to features",
                description: "Feature availability"
              }
            ]
          }
        ]
      },
      "taplio": {
        name: "Taplio",
        shortDescription: "LinkedIn-focused growth tool",
        category: "LinkedIn Management",
        comparisonImage: "/images/comparisons/taplio.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["Basic AI model"],
                description: "Available AI models"
              },
              {
                name: "Platform Specialization",
                olly: "Multi-platform optimization",
                competitor: "LinkedIn-only optimization",
                description: "AI training focus"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["LinkedIn"],
                description: "Platform coverage"
              },
              {
                name: "Content Features",
                olly: ["Comments", "Posts", "Threads", "Summaries", "Virality Analysis"],
                competitor: ["Posts", "Analytics", "Engagement tracking"],
                description: "Available features"
              }
            ]
          },
          {
            category: "Analytics",
            features: [
              {
                name: "Performance Tracking",
                olly: ["Virality prediction", "Cross-platform analytics"],
                competitor: ["Post performance", "Follower growth"],
                description: "Analytics capabilities"
              },
              {
                name: "Content Research",
                olly: "Cross-platform trend analysis",
                competitor: "LinkedIn post analysis",
                description: "Content research tools"
              }
            ]
          },
          {
            category: "Additional Features",
            features: [
              {
                name: "Multi-brand Support",
                olly: true,
                competitor: "Limited",
                description: "Multiple brand management"
              },
              {
                name: "Privacy",
                olly: "Local storage",
                competitor: "Cloud-based",
                description: "Data storage method"
              },
              {
                name: "Custom Actions",
                olly: true,
                competitor: false,
                description: "User-defined automations"
              }
            ]
          },
          {
            category: "Pricing & Value",
            features: [
              {
                name: "Free Plan",
                olly: "5 comments/day forever",
                competitor: "7-day trial",
                description: "Free offering"
              },
              {
                name: "Lifetime Access",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment option"
              }
            ]
          }
        ]
      },
      "deepai": {
        name: "DeepAI",
        shortDescription: "Generic AI text generation platform",
        category: "AI Content Generation",
        comparisonImage: "/images/comparisons/deepai.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["Custom LLM"],
                description: "AI model availability"
              },
              {
                name: "Specialized Features",
                olly: "Social media optimization",
                competitor: "General text generation",
                description: "Core functionality focus"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["Generic text output"],
                description: "Platform integration"
              },
              {
                name: "Content Types",
                olly: ["Social posts", "Comments", "Threads", "Summaries", "Virality Analysis"],
                competitor: ["Generic text", "Stories", "Poems", "Chat"],
                description: "Content generation capabilities"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Social Media Tools",
                olly: ["Virality prediction", "Platform-specific optimization", "Engagement analytics"],
                competitor: false,
                description: "Social media specific features"
              },
              {
                name: "Content Analysis",
                olly: "Cross-platform performance tracking",
                competitor: "Basic text analysis",
                description: "Analytics capabilities"
              }
            ]
          },
          {
            category: "Use Case Focus",
            features: [
              {
                name: "Primary Purpose",
                olly: "Social media growth and engagement",
                competitor: "General text generation",
                description: "Main use case"
              },
              {
                name: "Target Users",
                olly: ["Social media managers", "Content creators", "Brands"],
                competitor: ["General users", "Content writers"],
                description: "Target audience"
              }
            ]
          },
          {
            category: "Integration",
            features: [
              {
                name: "Browser Extension",
                olly: true,
                competitor: false,
                description: "Platform integration method"
              },
              {
                name: "Direct Posting",
                olly: true,
                competitor: false,
                description: "Ability to post directly to platforms"
              }
            ]
          }
        ]
      },
      "aifreebox": {
        name: "AIFreeBox",
        shortDescription: "Free AI comment generation tools",
        category: "Basic AI Tools",
        comparisonImage: "/images/comparisons/aifreebox.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["Basic AI model"],
                description: "Available AI models"
              },
              {
                name: "Customization",
                olly: "Full AI personality customization",
                competitor: "Basic tone selection",
                description: "AI customization options"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Platform Integration",
                olly: "Direct platform integration",
                competitor: "Manual copy-paste",
                description: "How content is posted"
              },
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: "Generic text generation",
                description: "Platform coverage"
              }
            ]
          },
          {
            category: "Features",
            features: [
              {
                name: "Advanced Features",
                olly: ["Virality prediction", "Analytics", "Custom actions", "Multi-brand support"],
                competitor: ["Basic comment generation", "Language selection", "Tone selection"],
                description: "Available features"
              },
              {
                name: "Browser Extension",
                olly: true,
                competitor: false,
                description: "Platform integration"
              }
            ]
          },
          {
            category: "Pricing & Access",
            features: [
              {
                name: "Pricing Model",
                olly: "Freemium with paid features",
                competitor: "Free with limitations",
                description: "Cost structure"
              },
              {
                name: "Account Requirement",
                olly: "Account with features",
                competitor: "No signup required",
                description: "Access requirements"
              }
            ]
          },
          {
            category: "Professional Features",
            features: [
              {
                name: "Analytics",
                olly: true,
                competitor: false,
                description: "Performance tracking"
              },
              {
                name: "Team Features",
                olly: true,
                competitor: false,
                description: "Collaboration tools"
              },
              {
                name: "API Access",
                olly: true,
                competitor: false,
                description: "API availability"
              }
            ]
          }
        ]
      },
      "ai_smart_comment": {
        name: "AI Smart Comment Generator",
        shortDescription: "Basic mobile comment generator app",
        category: "Mobile Social Media Tools",
        comparisonImage: "/images/comparisons/ai_smart_comment.png",
        features: [
          {
            category: "Platform Support",
            features: [
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["LinkedIn", "Facebook", "Instagram"],
                description: "Available platforms"
              },
              {
                name: "Platform Integration",
                olly: "Browser extension with direct posting",
                competitor: "Mobile app with copy-paste",
                description: "Integration method"
              }
            ]
          },
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: "Basic AI model",
                description: "AI technology"
              },
              {
                name: "Customization",
                olly: "Full AI personality customization",
                competitor: "Basic templates",
                description: "Customization options"
              }
            ]
          },
          {
            category: "Features",
            features: [
              {
                name: "Analytics",
                olly: true,
                competitor: false,
                description: "Performance tracking"
              },
              {
                name: "Virality Prediction",
                olly: true,
                competitor: false,
                description: "Content performance prediction"
              },
              {
                name: "Multi-device Support",
                olly: ["Desktop", "Web", "Mobile via browser"],
                competitor: ["Android mobile only"],
                description: "Device availability"
              }
            ]
          },
          {
            category: "Privacy & Security",
            features: [
              {
                name: "Data Storage",
                olly: "Local storage only",
                competitor: "Cloud storage",
                description: "Data handling"
              },
              {
                name: "Data Collection",
                olly: "Minimal",
                competitor: "Personal info and app activity",
                description: "Data collection practices"
              }
            ]
          },
          {
            category: "Professional Features",
            features: [
              {
                name: "Team Collaboration",
                olly: true,
                competitor: false,
                description: "Multi-user support"
              },
              {
                name: "Business Tools",
                olly: ["Multi-brand support", "Custom actions", "API access"],
                competitor: false,
                description: "Enterprise features"
              }
            ]
          }
        ]
      },
      "askyourpdf": {
        name: "AskYourPDF",
        shortDescription: "Document interaction and content generation tool",
        category: "Document & Content Generation",
        comparisonImage: "/images/comparisons/askyourpdf.png",
        features: [
          {
            category: "Core Features",
            features: [
              {
                name: "Primary Focus",
                olly: "Social media optimization",
                competitor: ["Document chat", "Generic content generation"],
                description: "Main functionality"
              },
              {
                name: "Content Types",
                olly: ["Social posts", "Comments", "Platform-specific content"],
                competitor: ["Documents", "Essays", "Stories", "Poems", "Generic captions"],
                description: "Supported content formats"
              }
            ]
          },
          {
            category: "Platform Integration",
            features: [
              {
                name: "Social Platform Support",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["Basic Instagram captions"],
                description: "Social media integration"
              },
              {
                name: "Device Support",
                olly: "Cross-platform browser extension",
                competitor: ["Web", "Mobile apps", "Chrome extension"],
                description: "Available platforms"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Social Analytics",
                olly: true,
                competitor: false,
                description: "Performance tracking"
              },
              {
                name: "AI Capabilities",
                olly: ["Multiple AI models", "Custom personalities", "Platform optimization"],
                competitor: ["Document chat", "Basic text generation"],
                description: "AI features"
              }
            ]
          },
          {
            category: "Professional Tools",
            features: [
              {
                name: "API Access",
                olly: true,
                competitor: true,
                description: "Developer access"
              },
              {
                name: "Business Features",
                olly: ["Multi-brand support", "Team collaboration", "Custom actions"],
                competitor: ["Document processing", "PDF tools"],
                description: "Enterprise capabilities"
              }
            ]
          },
          {
            category: "Pricing & Access",
            features: [
              {
                name: "Free Tier",
                olly: "5 comments/day forever",
                competitor: "Limited free tools",
                description: "Free offerings"
              },
              {
                name: "Lifetime Access",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment option"
              }
            ]
          }
        ]
      },
      "contentshake": {
        name: "ContentShake AI",
        shortDescription: "SEO-focused content generation platform",
        category: "Content & SEO Tools",
        comparisonImage: "/images/comparisons/contentshake.png",
        features: [
          {
            category: "Content Generation",
            features: [
              {
                name: "Focus Area",
                olly: "Social media optimization and engagement",
                competitor: ["SEO content", "Blog posts", "Marketing copy"],
                description: "Primary content types"
              },
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: "Basic AI model",
                description: "Available AI technology"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Social Integration",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: "Basic social post generation",
                description: "Platform coverage"
              },
              {
                name: "Specialized Features",
                olly: ["Platform-specific optimization", "Engagement analytics", "Virality prediction"],
                competitor: ["SEO data", "Content optimization", "Readability analysis"],
                description: "Key features"
              }
            ]
          },
          {
            category: "Advanced Capabilities",
            features: [
              {
                name: "Analytics",
                olly: "Social media performance tracking",
                competitor: "SEO metrics",
                description: "Analytics focus"
              },
              {
                name: "Custom Tools",
                olly: ["AI personalities", "Custom actions", "Multi-brand support"],
                competitor: ["Paraphrasing", "Title generation", "Word counting"],
                description: "Additional tools"
              }
            ]
          },
          {
            category: "Integration",
            features: [
              {
                name: "Browser Extension",
                olly: true,
                competitor: false,
                description: "Platform integration"
              },
              {
                name: "Direct Posting",
                olly: true,
                competitor: false,
                description: "Content publishing"
              }
            ]
          },
          {
            category: "Pricing",
            features: [
              {
                name: "Free Tools",
                olly: "5 comments/day",
                competitor: "Basic text generation tools",
                description: "Free offerings"
              },
              {
                name: "Lifetime Deal",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment"
              }
            ]
          }
        ]
      },
      "wepik": {
        name: "Wepik AI Writer",
        shortDescription: "Design-focused AI writing tool",
        category: "Design & Content Creation",
        comparisonImage: "/images/comparisons/wepik.png",
        features: [
          {
            category: "Core Features",
            features: [
              {
                name: "Primary Focus",
                olly: "Social media optimization",
                competitor: ["Design content", "Basic social posts"],
                description: "Main functionality"
              },
              {
                name: "Content Types",
                olly: ["Comments", "Posts", "Threads", "Platform-specific content"],
                competitor: ["Marketing copy", "Design text", "Basic social posts"],
                description: "Content capabilities"
              }
            ]
          },
          {
            category: "Platform Integration",
            features: [
              {
                name: "Social Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: "Basic social post generation",
                description: "Platform support"
              },
              {
                name: "Integration Type",
                olly: "Direct platform integration",
                competitor: "Manual copy-paste",
                description: "Content delivery method"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Analytics",
                olly: true,
                competitor: false,
                description: "Performance tracking"
              },
              {
                name: "AI Capabilities",
                olly: ["Multiple AI models", "Custom personalities", "Virality prediction"],
                competitor: ["Basic text generation", "Tone adjustment"],
                description: "AI features"
              }
            ]
          },
          {
            category: "Professional Tools",
            features: [
              {
                name: "Team Features",
                olly: true,
                competitor: false,
                description: "Collaboration capabilities"
              },
              {
                name: "Additional Tools",
                olly: ["Analytics", "Custom actions", "Multi-brand support"],
                competitor: ["Design tools", "Image generation", "Presentation maker"],
                description: "Supplementary features"
              }
            ]
          },
          {
            category: "Pricing",
            features: [
              {
                name: "Free Plan",
                olly: "5 comments/day",
                competitor: "Basic features",
                description: "Free tier offering"
              },
              {
                name: "Lifetime Deal",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment option"
              }
            ]
          }
        ]
      },
      "typli": {
        name: "Typli.ai",
        shortDescription: "General purpose AI writing tool",
        category: "Content Writing",
        comparisonImage: "/images/comparisons/typli.png",
        features: [
          {
            category: "Content Generation",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["Basic AI model"],
                description: "Available AI technologies"
              },
              {
                name: "Content Types",
                olly: ["Social media posts", "Comments", "Platform-specific content"],
                competitor: ["General writing", "Basic social posts", "Academic content"],
                description: "Content capabilities"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Social Integration",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: "Generic content generation",
                description: "Platform coverage"
              },
              {
                name: "Direct Publishing",
                olly: true,
                competitor: false,
                description: "Platform integration"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Specialized Tools",
                olly: ["Virality prediction", "Platform optimization", "Custom actions"],
                competitor: ["Translation", "Paraphrasing", "Text expansion"],
                description: "Tool offerings"
              },
              {
                name: "Analytics",
                olly: true,
                competitor: false,
                description: "Performance tracking"
              }
            ]
          },
          {
            category: "Business Features",
            features: [
              {
                name: "Team Collaboration",
                olly: true,
                competitor: false,
                description: "Multi-user support"
              },
              {
                name: "Multi-brand Support",
                olly: true,
                competitor: false,
                description: "Brand management"
              }
            ]
          },
          {
            category: "Pricing",
            features: [
              {
                name: "Starting Price",
                olly: "$9.99/month",
                competitor: "$7.99/month",
                description: "Base subscription"
              },
              {
                name: "Free Plan",
                olly: "5 comments/day forever",
                competitor: "Limited word count",
                description: "Free offering"
              },
              {
                name: "Lifetime Access",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment"
              }
            ]
          }
        ]
      },
      "toolbaz": {
        name: "ToolBaz",
        shortDescription: "Free AI content generation suite",
        category: "Content Writing Tools",
        comparisonImage: "/images/comparisons/toolbaz.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["GPT-4"],
                description: "AI technology"
              },
              {
                name: "Content Limits",
                olly: "Unlimited with paid plans",
                competitor: "150-char input, 400-word output",
                description: "Usage restrictions"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: "Generic content generation",
                description: "Platform integration"
              },
              {
                name: "Direct Publishing",
                olly: true,
                competitor: false,
                description: "Platform posting"
              }
            ]
          },
          {
            category: "Features",
            features: [
              {
                name: "Analytics",
                olly: true,
                competitor: false,
                description: "Performance tracking"
              },
              {
                name: "Content Types",
                olly: ["Platform-optimized content", "Comments", "Posts"],
                competitor: ["Basic articles", "Sales emails", "Social posts"],
                description: "Content capabilities"
              }
            ]
          },
          {
            category: "Professional Features",
            features: [
              {
                name: "Team Features",
                olly: true,
                competitor: false,
                description: "Collaboration tools"
              },
              {
                name: "Custom Actions",
                olly: true,
                competitor: false,
                description: "Automation capabilities"
              }
            ]
          },
          {
            category: "Pricing",
            features: [
              {
                name: "Cost Model",
                olly: "Freemium with paid features",
                competitor: "Free with limitations",
                description: "Pricing structure"
              },
              {
                name: "Premium Plans",
                olly: true,
                competitor: false,
                description: "Paid offerings"
              },
              {
                name: "Lifetime Access",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment option"
              }
            ]
          }
        ]
      },
      "engageai": {
        name: "Engage AI",
        shortDescription: "LinkedIn-focused engagement tool",
        category: "Social Media Management",
        comparisonImage: "/images/comparisons/engageai.png",
        features: [
          {
            category: "AI Models & Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["OpenAI", "Gemini"],
                description: "Available AI models"
              },
              {
                name: "Platform Coverage",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["LinkedIn only"],
                description: "Platform specialization"
              },
              {
                name: "Custom AI Personalities",
                olly: true,
                competitor: false,
                description: "AI voice customization"
              }
            ]
          },
          {
            category: "Engagement Features",
            features: [
              {
                name: "Comment Generation",
                olly: ["AI-powered comments", "Custom templates", "One-click posting", "Cross-platform support"],
                competitor: ["LinkedIn comments", "Basic templates"],
                description: "Commenting capabilities"
              },
              {
                name: "Content Analysis",
                olly: ["Virality prediction", "Cross-platform analytics", "Engagement tracking"],
                competitor: ["Basic LinkedIn analytics"],
                description: "Analytics features"
              },
              {
                name: "Automation",
                olly: ["Custom actions", "Multi-platform scheduling", "Advanced workflows"],
                competitor: ["Basic prospect monitoring", "Connection requests"],
                description: "Automation capabilities"
              }
            ]
          },
          {
            category: "Business Features",
            features: [
              {
                name: "Team Collaboration",
                olly: ["Multi-user support", "Team workflows", "Role management"],
                competitor: "Basic single-user focus",
                description: "Team capabilities"
              },
              {
                name: "Multi-Brand Support",
                olly: true,
                competitor: false,
                description: "Multiple brand management"
              },
              {
                name: "Privacy",
                olly: "Local data storage",
                competitor: "Cloud-based",
                description: "Data handling approach"
              }
            ]
          },
          {
            category: "Advanced Tools",
            features: [
              {
                name: "Cross-Platform Features",
                olly: ["Platform-specific optimization", "Multi-channel content", "Unified dashboard"],
                competitor: ["LinkedIn-only features"],
                description: "Platform capabilities"
              },
              {
                name: "Content Creation",
                olly: ["Posts", "Comments", "Threads", "Articles", "Stories"],
                competitor: ["Posts", "Comments", "Connection requests"],
                description: "Content types"
              }
            ]
          },
          {
            category: "Pricing & Value",
            features: [
              {
                name: "Free Plan",
                olly: "5 comments/day forever",
                competitor: "Limited trial",
                description: "Free offering"
              },
              {
                name: "Lifetime Access",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment option"
              },
              {
                name: "Value Proposition",
                olly: ["Multi-platform support", "Advanced AI features", "Complete toolkit"],
                competitor: ["LinkedIn specialization", "Basic AI features"],
                description: "Overall value"
              }
            ]
          }
        ]
      },
      "familyai": {
        name: "Family AI (Ollie)",
        shortDescription: "AI assistant for family life management and household tasks",
        category: "Family Management",
        comparisonImage: "/images/comparisons/family-ai.png",
        features: [
          {
            category: "AI Capabilities",
            features: [
              {
                name: "AI Models",
                olly: ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
                competitor: ["Proprietary AI System"],
                description: "Available AI language models for content generation"
              },
              {
                name: "Custom AI Personalities",
                olly: true,
                competitor: false,
                description: "Create and customize multiple AI voices for different brands"
              },
              {
                name: "Local Model Support",
                olly: true,
                competitor: false,
                description: "Support for running local models via Ollama (Llama, Gemma)"
              }
            ]
          },
          {
            category: "Platform Support",
            features: [
              {
                name: "Supported Platforms",
                olly: ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
                competitor: ["Grocery Stores", "Online Retailers", "E-commerce Platforms"],
                description: "Platforms supported for integration"
              },
              {
                name: "Cross-Platform Features",
                olly: true,
                competitor: false,
                description: "Unified experience and features across all supported platforms"
              }
            ]
          },
          {
            category: "Advanced Features",
            features: [
              {
                name: "Core Functionality",
                olly: true,
                competitor: false,
                description: "Social media engagement and content generation"
              },
              {
                name: "Household Management",
                olly: false,
                competitor: true,
                description: "Meal planning, shopping, and gift recommendations"
              },
              {
                name: "Custom Actions",
                olly: true,
                competitor: false,
                description: "User-defined prompts and automation tasks"
              }
            ]
          },
          {
            category: "Privacy & Security",
            features: [
              {
                name: "Local Data Storage",
                olly: true,
                competitor: false,
                description: "All user data stored locally, not on servers"
              },
              {
                name: "API Key Security",
                olly: true,
                competitor: false,
                description: "Secure handling of API keys with local storage only"
              }
            ]
          },
          {
            category: "Pricing & Value",
            features: [
              {
                name: "Free Tier",
                olly: "5 comments/day",
                competitor: "Beta access",
                description: "Features available in free version"
              },
              {
                name: "Starting Price",
                olly: "$9.99/month",
                competitor: "Not publicly available",
                description: "Base subscription cost"
              },
              {
                name: "Lifetime Option",
                olly: "$49.99",
                competitor: false,
                description: "One-time payment for lifetime access"
              },
              {
                name: "API Cost Transparency",
                olly: true,
                competitor: false,
                description: "Clear API usage calculator and costs"
              }
            ]
          }
        ]
      },
      "tubepilot": {
    "name": "TubePilot AI",
    "shortDescription": "Free YouTube-focused content generation and management toolkit",
    "category": "YouTube Content Management",
    "comparisonImage": "/images/comparisons/tubepilot.png",
    "features": [
      {
        "category": "AI Capabilities",
        "features": [
          {
            "name": "AI Models",
            "olly": ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
            "competitor": ["Unspecified AI model"],
            "description": "Available AI language models for content generation"
          },
          {
            "name": "Generation Modes",
            "olly": "Multiple customizable personalities",
            "competitor": ["Fast mode", "Advanced mode"],
            "description": "Available content generation modes"
          },
          {
            "name": "Content Focus",
            "olly": "Multi-platform social media content",
            "competitor": "YouTube-specific content",
            "description": "Primary content generation focus"
          }
        ]
      },
      {
        "category": "Platform Support",
        "features": [
          {
            "name": "Supported Platforms",
            "olly": ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
            "competitor": ["YouTube", "YouTube Shorts"],
            "description": "Social media platforms supported for content generation"
          },
          {
            "name": "YouTube-Specific Features",
            "olly": "Basic YouTube support",
            "competitor": ["Comments", "Hashtags", "Titles", "Descriptions", "Scripts", "Shorts", "Channel Info"],
            "description": "Platform-specific features for YouTube"
          }
        ]
      },
      {
        "category": "Advanced Features",
        "features": [
          {
            "name": "Virality Score",
            "olly": true,
            "competitor": false,
            "description": "AI-powered prediction of content performance"
          },
          {
            "name": "SEO Tools",
            "olly": false,
            "competitor": ["Title optimization", "Description optimization", "Hashtag generation", "Backlink generation"],
            "description": "SEO-focused features"
          },
          {
            "name": "Analytics Tools",
            "olly": false,
            "competitor": ["Watch time calculator", "Monetization checker", "Video audit"],
            "description": "Analytics and performance tracking"
          },
          {
            "name": "Integration Tools",
            "olly": false,
            "competitor": ["Embed code generator", "QR code generator", "Social media conversion"],
            "description": "Website and cross-platform integration"
          }
        ]
      },
      {
        "category": "Content Types",
        "features": [
          {
            "name": "Comment Generation",
            "olly": "All platforms",
            "competitor": ["Regular comments", "Fake comments", "Shorts comments"],
            "description": "Comment generation capabilities"
          },
          {
            "name": "Channel Management",
            "olly": false,
            "competitor": ["Channel name generator", "Username generator", "Video information generator"],
            "description": "Channel management tools"
          }
        ]
      },
      {
        "category": "Privacy & Security",
        "features": [
          {
            "name": "Local Data Storage",
            "olly": true,
            "competitor": false,
            "description": "All user data stored locally, not on servers"
          },
          {
            "name": "API Key Security",
            "olly": true,
            "competitor": false,
            "description": "Secure handling of API keys with local storage only"
          }
        ]
      },
      {
        "category": "Pricing & Value",
        "features": [
          {
            "name": "Free Tier",
            "olly": "5 comments/day",
            "competitor": "100% free tools",
            "description": "Features available in free version"
          },
          {
            "name": "Starting Price",
            "olly": "$9.99/month",
            "competitor": "Free",
            "description": "Base subscription cost"
          },
          {
            "name": "Usage Limits",
            "olly": "Based on plan",
            "competitor": "Credit-based system",
            "description": "Limitations on tool usage"
          }
        ]
      }
    ]
  },
  "textaai": {
    "name": "Texta.ai",
    "shortDescription": "AI-powered content generation suite with specialized social media tools",
    "category": "Content Generation",
    "comparisonImage": "/images/comparisons/textaai.png",
    "features": [
      {
        "category": "AI Capabilities",
        "features": [
          {
            "name": "AI Models",
            "olly": ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
            "competitor": ["Unspecified AI model"],
            "description": "Available AI language models for content generation"
          },
          {
            "name": "Custom AI Personalities",
            "olly": true,
            "competitor": false,
            "description": "Create and customize multiple AI voices for different brands"
          },
          {
            "name": "Content Types",
            "olly": "Social media comments and posts",
            "competitor": ["Stories", "Questions", "Bios", "Captions", "Pin Descriptions", "Quora Answers", "Tweets", "Video Captions"],
            "description": "Types of content that can be generated"
          }
        ]
      },
      {
        "category": "Platform Support",
        "features": [
          {
            "name": "Supported Platforms",
            "olly": ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
            "competitor": ["Pinterest", "Quora", "TikTok", "Twitter/X", "LinkedIn", "Facebook"],
            "description": "Social media platforms supported for content generation"
          },
          {
            "name": "Browser Integration",
            "olly": "Chrome Extension",
            "competitor": "Chrome Extension (Texta Browser Extension)",
            "description": "Browser integration capabilities"
          }
        ]
      },
      {
        "category": "Advanced Features",
        "features": [
          {
            "name": "Virality Score",
            "olly": true,
            "competitor": false,
            "description": "AI-powered prediction of content performance"
          },
          {
            "name": "Specialized Generators",
            "olly": false,
            "competitor": true,
            "description": "Platform-specific content generators (Pinterest, Quora, etc.)"
          },
          {
            "name": "SEO Integration",
            "olly": false,
            "competitor": true,
            "description": "Built-in SEO tools and optimization"
          },
          {
            "name": "Content Workflow",
            "olly": "Social media focused",
            "competitor": "Complete content creation suite",
            "description": "Content creation and management workflow"
          }
        ]
      },
      {
        "category": "Privacy & Security",
        "features": [
          {
            "name": "Local Data Storage",
            "olly": true,
            "competitor": false,
            "description": "All user data stored locally, not on servers"
          },
          {
            "name": "API Key Security",
            "olly": true,
            "competitor": false,
            "description": "Secure handling of API keys with local storage only"
          }
        ]
      },
      {
        "category": "Pricing & Value",
        "features": [
          {
            "name": "Free Tier",
            "olly": "5 comments/day",
            "competitor": "7-day free trial with full access",
            "description": "Features available in free version"
          },
          {
            "name": "Starting Price",
            "olly": "$9.99/month",
            "competitor": "Contact for pricing",
            "description": "Base subscription cost"
          },
          {
            "name": "Lifetime Option",
            "olly": "$49.99",
            "competitor": "Not available",
            "description": "One-time payment for lifetime access"
          },
          {
            "name": "Trial Requirements",
            "olly": "None",
            "competitor": "No credit card required",
            "description": "Requirements to start free trial"
          }
        ]
      }
    ]
  },
  "planable": {
    "name": "Planable Reddit Comment Generator",
    "shortDescription": "Free AI-powered Reddit comment generator with focus on tone customization",
    "category": "Social Media Management",
    "comparisonImage": "/images/comparisons/planable.png",
    "features": [
      {
        "category": "AI Capabilities",
        "features": [
          {
            "name": "AI Models",
            "olly": ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
            "competitor": ["Unspecified AI model"],
            "description": "Available AI language models for content generation"
          },
          {
            "name": "Tone Variations",
            "olly": true,
            "competitor": ["Humorous", "Inspirational", "Informative", "Casual", "Formal", "Witty", "Enthusiastic", "Empathetic", "Convincing", "Teasing"],
            "description": "Available comment tone options"
          },
          {
            "name": "Custom AI Personalities",
            "olly": true,
            "competitor": false,
            "description": "Create and customize multiple AI voices for different brands"
          }
        ]
      },
      {
        "category": "Platform Support",
        "features": [
          {
            "name": "Supported Platforms",
            "olly": ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
            "competitor": ["Reddit", "TikTok", "LinkedIn", "YouTube", "Facebook", "Instagram", "Twitter", "Quora"],
            "description": "Social media platforms supported for content generation"
          },
          {
            "name": "Platform-Specific Features",
            "olly": true,
            "competitor": true,
            "description": "Features tailored to each platform's unique characteristics"
          }
        ]
      },
      {
        "category": "Advanced Features",
        "features": [
          {
            "name": "Virality Score",
            "olly": true,
            "competitor": false,
            "description": "AI-powered prediction of content performance"
          },
          {
            "name": "Comment Length Options",
            "olly": true,
            "competitor": ["Short", "Long"],
            "description": "Control over generated comment length"
          },
          {
            "name": "Emoji Support",
            "olly": true,
            "competitor": true,
            "description": "Option to include emojis in comments"
          },
          {
            "name": "Multiple Variations",
            "olly": true,
            "competitor": "Up to 5 variations",
            "description": "Generate multiple comment options"
          }
        ]
      },
      {
        "category": "Privacy & Security",
        "features": [
          {
            "name": "Local Data Storage",
            "olly": true,
            "competitor": false,
            "description": "All user data stored locally, not on servers"
          },
          {
            "name": "No Sign-up Required",
            "olly": false,
            "competitor": true,
            "description": "Can use tool without creating account"
          }
        ]
      },
      {
        "category": "Pricing & Value",
        "features": [
          {
            "name": "Free Tier",
            "olly": "5 comments/day",
            "competitor": "Free tool, no limits specified",
            "description": "Features available in free version"
          },
          {
            "name": "Starting Price",
            "olly": "$9.99/month",
            "competitor": "Free (part of larger Planable suite)",
            "description": "Base cost for access"
          },
          {
            "name": "Lifetime Option",
            "olly": "$49.99",
            "competitor": "Not available",
            "description": "One-time payment for lifetime access"
          },
          {
            "name": "API Cost Transparency",
            "olly": true,
            "competitor": false,
            "description": "Clear API usage calculator and costs"
          }
        ]
      }
    ]
  },
  "commentgenerator": {
    "name": "Comment Generator",
    "shortDescription": "Platform-specific AI comment generator with focus on authenticity",
    "category": "Social Media Management",
    "comparisonImage": "/images/comparisons/commentgenerator.png",
    "features": [
      {
        "category": "AI Capabilities",
        "features": [
          {
            "name": "AI Models",
            "olly": ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
            "competitor": ["Unspecified AI model"],
            "description": "Available AI language models for content generation"
          },
          {
            "name": "Custom AI Personalities",
            "olly": true,
            "competitor": false,
            "description": "Create and customize multiple AI voices for different brands"
          },
          {
            "name": "Tone Customization",
            "olly": true,
            "competitor": true,
            "description": "Ability to customize comment tone and style"
          }
        ]
      },
      {
        "category": "Platform Support",
        "features": [
          {
            "name": "Supported Platforms",
            "olly": ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
            "competitor": ["Instagram", "LinkedIn", "Threads"],
            "description": "Social media platforms supported for content generation"
          },
          {
            "name": "Cross-Platform Features",
            "olly": true,
            "competitor": true,
            "description": "Unified experience and features across supported platforms"
          }
        ]
      },
      {
        "category": "Advanced Features",
        "features": [
          {
            "name": "Virality Score",
            "olly": true,
            "competitor": false,
            "description": "AI-powered prediction of content performance"
          },
          {
            "name": "Custom Comment Panels",
            "olly": true,
            "competitor": true,
            "description": "One-click commenting with customizable templates"
          },
          {
            "name": "Custom Actions",
            "olly": true,
            "competitor": false,
            "description": "User-defined prompts and automation tasks"
          },
          {
            "name": "Multi-language Support",
            "olly": true,
            "competitor": true,
            "description": "Support for multiple languages"
          }
        ]
      },
      {
        "category": "Privacy & Security",
        "features": [
          {
            "name": "Local Data Storage",
            "olly": true,
            "competitor": false,
            "description": "All user data stored locally, not on servers"
          },
          {
            "name": "No Account Access Required",
            "olly": true,
            "competitor": true,
            "description": "Works without requiring social media account access"
          }
        ]
      },
      {
        "category": "Pricing & Value",
        "features": [
          {
            "name": "Free Tier",
            "olly": "5 comments/day",
            "competitor": "Limited free trial (7 days)",
            "description": "Features available in free version"
          },
          {
            "name": "Starting Price",
            "olly": "$9.99/month",
            "competitor": "Not specified",
            "description": "Base subscription cost"
          },
          {
            "name": "Lifetime Option",
            "olly": "$49.99",
            "competitor": "Not available",
            "description": "One-time payment for lifetime access"
          },
          {
            "name": "API Cost Transparency",
            "olly": true,
            "competitor": false,
            "description": "Clear API usage calculator and costs"
          }
        ]
      }
    ]
  },
  "replymind": {
    "name": "ReplyMind",
    "shortDescription": "Basic AI-powered social media engagement assistant",
    "category": "Social Media Management",
    "comparisonImage": "/images/comparisons/replymind.png",
    "features": [
      {
        "category": "AI Capabilities",
        "features": [
          {
            "name": "AI Models",
            "olly": ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
            "competitor": ["OpenAI"],
            "description": "Available AI language models for content generation"
          },
          {
            "name": "Custom AI Personalities",
            "olly": true,
            "competitor": false,
            "description": "Create and customize multiple AI voices for different brands"
          },
          {
            "name": "Local Model Support",
            "olly": true,
            "competitor": false,
            "description": "Support for running local models via Ollama (Llama, Gemma)"
          }
        ]
      },
      {
        "category": "Platform Support",
        "features": [
          {
            "name": "Supported Platforms",
            "olly": ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
            "competitor": ["LinkedIn", "Twitter/X", "Product Hunt"],
            "description": "Social media platforms supported for content generation"
          },
          {
            "name": "Cross-Platform Features",
            "olly": true,
            "competitor": false,
            "description": "Unified experience and features across all supported platforms"
          }
        ]
      },
      {
        "category": "Advanced Features",
        "features": [
          {
            "name": "Virality Score",
            "olly": true,
            "competitor": false,
            "description": "AI-powered prediction of content performance"
          },
          {
            "name": "Custom Comment Panels",
            "olly": true,
            "competitor": false,
            "description": "One-click commenting with customizable templates"
          },
          {
            "name": "Custom Actions",
            "olly": true,
            "competitor": false,
            "description": "User-defined prompts and automation tasks"
          }
        ]
      },
      {
        "category": "Privacy & Security",
        "features": [
          {
            "name": "Local Data Storage",
            "olly": true,
            "competitor": false,
            "description": "All user data stored locally, not on servers"
          },
          {
            "name": "API Key Security",
            "olly": true,
            "competitor": false,
            "description": "Secure handling of API keys with local storage only"
          }
        ]
      },
      {
        "category": "Pricing & Value",
        "features": [
          {
            "name": "Free Tier",
            "olly": "5 comments/day",
            "competitor": "90 replies/month",
            "description": "Features available in free version"
          },
          {
            "name": "Starting Price",
            "olly": "$9.99/month",
            "competitor": "$7/month (annual)",
            "description": "Base subscription cost"
          },
          {
            "name": "Lifetime Option",
            "olly": "$49.99",
            "competitor": "Available (price not specified)",
            "description": "One-time payment for lifetime access"
          },
          {
            "name": "API Cost Transparency",
            "olly": true,
            "competitor": false,
            "description": "Clear API usage calculator and costs"
          }
        ]
      }
    ]
  },
  "grum": {
    "name": "Grum",
    "shortDescription": "Free Instagram-focused AI tools and marketing platform",
    "category": "Instagram Marketing",
    "comparisonImage": "/images/comparisons/grum.png",
    "features": [
      {
        "category": "AI Capabilities",
        "features": [
          {
            "name": "AI Models",
            "olly": ["OpenAI", "Claude", "Gemini", "Local Models", "Straico", "OpenRouter"],
            "competitor": ["Unspecified AI model"],
            "description": "Available AI language models for content generation"
          },
          {
            "name": "Content Generation",
            "olly": "Multi-platform content",
            "competitor": ["Bios", "Captions", "Comments", "Art", "Content Ideas"],
            "description": "Types of content that can be generated"
          },
          {
            "name": "Custom AI Personalities",
            "olly": true,
            "competitor": false,
            "description": "Create and customize multiple AI voices for different brands"
          }
        ]
      },
      {
        "category": "Platform Support",
        "features": [
          {
            "name": "Supported Platforms",
            "olly": ["LinkedIn", "Twitter/X", "Facebook", "Instagram", "Reddit", "Product Hunt", "YouTube", "Quora", "Medium", "TikTok", "Threads", "HackerNews"],
            "competitor": ["Instagram"],
            "description": "Social media platforms supported for content generation"
          },
          {
            "name": "Instagram-Specific Features",
            "olly": "Basic Instagram support",
            "competitor": ["Bio generation", "Caption generation", "Art generation", "Hashtag generation", "Content ideas", "Comment generation", "Username generation"],
            "description": "Platform-specific features for Instagram"
          }
        ]
      },
      {
        "category": "Advanced Features",
        "features": [
          {
            "name": "Virality Score",
            "olly": true,
            "competitor": false,
            "description": "AI-powered prediction of content performance"
          },
          {
            "name": "Growth Services",
            "olly": false,
            "competitor": ["Free followers", "Free likes", "Free comments", "Free views"],
            "description": "Instagram growth services"
          },
          {
            "name": "Visual Content",
            "olly": false,
            "competitor": "AI Art Generator",
            "description": "Visual content generation capabilities"
          },
          {
            "name": "Marketing Resources",
            "olly": false,
            "competitor": "Marketing blog and resources",
            "description": "Educational and marketing resources"
          }
        ]
      },
      {
        "category": "Content Management",
        "features": [
          {
            "name": "Hashtag Management",
            "olly": false,
            "competitor": "Trending hashtag generator",
            "description": "Hashtag generation and management"
          },
          {
            "name": "Profile Optimization",
            "olly": "Cross-platform",
            "competitor": "Instagram-focused",
            "description": "Profile optimization capabilities"
          }
        ]
      },
      {
        "category": "Privacy & Security",
        "features": [
          {
            "name": "Local Data Storage",
            "olly": true,
            "competitor": false,
            "description": "All user data stored locally, not on servers"
          },
          {
            "name": "API Key Security",
            "olly": true,
            "competitor": false,
            "description": "Secure handling of API keys with local storage only"
          }
        ]
      },
      {
        "category": "Pricing & Value",
        "features": [
          {
            "name": "Free Tier",
            "olly": "5 comments/day",
            "competitor": "100% free tools",
            "description": "Features available in free version"
          },
          {
            "name": "Starting Price",
            "olly": "$9.99/month",
            "competitor": "Free",
            "description": "Base subscription cost"
          },
          {
            "name": "Additional Services",
            "olly": "Premium features",
            "competitor": "Free growth services",
            "description": "Extra features and services"
          }
        ]
      }
    ]
  }
};