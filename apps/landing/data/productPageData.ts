export interface ProductData {
    slug: string;
    metadata: {
      title: string;
      description: string;
      keywords?: string[]; // Added at root level of metadata
      alternates?: {
        canonical?: string;
        openGraph?: {
          type: string;
          images: string[];
        };
      };
    };
    heading?: {
      title?: string;
      subtitle?: string;
      image?: string;
    };
    testimonials?: Array<{
      quote: string;
      author: string;
    }>;
    features?: Array<{
      title: string;
      description: string;
      link?: string; // Added link to features
    }>;
    useCases?: Array<{
      title: string;
      details: string;
      link?: string; // Added link to useCases
    }>;
    targetAudience?: Array<{
      role: string;
      benefits: string;
      link?: string; // Added link to targetAudience
    }>;
    relatedProducts?: string[];
  }
  
  /**
   * This array simulates data for different products.
   * In a real app, you might fetch from a CMS, database, or external API.
   */
  export const productPageData: ProductData[] = [
    {
      slug: "influencer-marketing-platform",
      metadata: {
        title: "Influencer Marketing Platform | Infloq.com",
        description: "Our AI-driven Influencer Marketing Platform helps you discover, collaborate, and measure success with top creators worldwide. Perfect for brands seeking impactful social media campaigns.",
        keywords: ["influencer marketing", "creator discovery", "ROI tracking", "campaign management"],
        alternates: { 
            canonical: "/products/influencer-marketing-platform",
            openGraph: {
              type: "product",
              images: ["/images/platform-preview.jpg"]
            }
          }
        },
      heading: {
        title: "The Ultimate Influencer Marketing Platform",
        subtitle: "Our AI matches you with the perfect creators for your brand, from a network of thousands.",
        image: "/step_main.gif",
      },
      testimonials: [
        {
          quote: "Infloq's Influencer Marketing Platform gave us an incredible ROI.",
          author: "Jane Doe, Growth Marketer",
        },
        {
          quote: "We found the perfect micro-influencers for our niche!",
          author: "Mike Smith, CEO of StartupABC",
        },
      ],
      features: [
        {
          title: "AI-Powered Discovery",
          description: "Instantly find ideal influencers from a massive database. Filter by niche, follower count, and more.",
          link: "/products/influencer-discovery"
        },
        {
          title: "Seamless Collaboration",
          description: "Manage influencer communications, payments, and campaign milestones all in one place.",
          link: "/products/campaign-management"
        },
        {
          title: "Real-Time Analytics",
          description: "Track clicks, conversions, and engagement metrics across all campaigns to maximize ROI.",
          link: "/products/analytics-dashboard"
        },
      ],
      useCases: [
        {
          title: "Product Launches",
          details: "Leverage multiple micro-influencers at once to create buzz around a new product launch.",
          link: "/use-cases/product-launches"
        },
        {
          title: "Seasonal Campaigns",
          details: "Launch targeted campaigns for holidays or special events, ensuring high engagement.",
          link: "/use-cases/seasonal-campaigns"
        },
        {
          title: "Brand Building",
          details: "Collaborate with influencers long-term to steadily grow brand awareness and credibility.",
          link: "/use-cases/brand-building"
        },
      ],
      targetAudience: [
        {
          role: "Marketing Managers",
          benefits: "Easily identify and partner with the right influencers, run campaigns, and track ROI.",
          link: "/solutions/marketing-managers"
        },
        {
          role: "Brand Owners",
          benefits: "Build brand awareness through authentic influencer-generated content and storytelling.",
          link: "/solutions/brand-owners"
        },
      ],
      relatedProducts: ["free-influencer-finder"]
    },
    {
      slug: "free-influencer-finder",
      metadata: {
        title: "Free Influencer Discovery Tool | Find Perfect Creators | Infloq",
        description: "Discover the perfect influencers for your brand with our free AI-powered creator search tool. Filter by niche, engagement rate, and audience demographics. Start your influencer marketing journey today!",
        keywords: [
          "free influencer search",
          "creator discovery tool",
          "find influencers",
          "influencer marketing",
          "social media creators",
          "Instagram influencers",
          "TikTok creators"
        ],
        alternates: { 
            canonical: "/products/influencer-marketing-platform",
            openGraph: {
              type: "product",
              images: ["/images/platform-preview.jpg"]
            }
          }
      },
      heading: {
        title: "Find Your Perfect Creators - 100% Free",
        subtitle: "Access our powerful influencer discovery tool. Search thousands of verified creators across Instagram, TikTok, and YouTube.",
        image: "/finder-tool-demo.gif"
      },
      features: [
        {
          title: "Smart Creator Search",
          description: "Use AI-powered filters to find creators by niche, audience size, engagement rate, and location.",
          link: "/features"
        },
        {
          title: "Engagement Analytics",
          description: "View detailed engagement metrics and audience demographics for any creator.",
          link: "/features"
        },
        {
          title: "Export & Share",
          description: "Export your favorite creators to CSV or share lists with your team.",
          link: "/features"
        }
      ],
      useCases: [
        {
          title: "Market Research",
          details: "Research top creators in your niche and understand content trends.",
          link: "/use-cases/market-research"
        },
        {
          title: "Campaign Planning",
          details: "Build lists of potential creators for your upcoming campaigns.",
          link: "/use-cases/campaign-planning"
        }
      ],
      targetAudience: [
        {
          role: "Small Business Owners",
          benefits: "Find affordable creators who align with your brand values and target audience.",
          link: "/solutions/small-business"
        },
        {
          role: "Marketing Freelancers",
          benefits: "Quickly research and propose creator partnerships to your clients.",
          link: "/solutions/freelancers"
        }
      ],
      relatedProducts: ["influencer-marketing-platform"]
    },
    {
      slug: "ecommerce-influencer-marketing",
      metadata: {
        title: "E-commerce Influencer Marketing Platform | Drive Sales | Infloq",
        description: "Scale your e-commerce sales with our AI-powered influencer marketing platform. Connect with high-converting creators, automate campaigns, and track ROI. Perfect for Shopify, WooCommerce, and more.",
        keywords: [
          "ecommerce influencer marketing",
          "shopify influencer marketing",
          "woocommerce influencers",
          "product seeding platform",
          "social commerce tools",
          "influencer sales tracking",
          "creator partnerships"
        ],
        alternates: {
          canonical: "/products/ecommerce-influencer-marketing",
          openGraph: {
            type: "product",
            images: ["/images/ecommerce-platform-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Scale Your E-commerce with Creator Partnerships",
        subtitle: "Connect your store, find converting creators, and track sales attribution across all your influencer campaigns.",
        image: "/ecommerce-tool-demo.gif"
      },
      features: [
        {
          title: "E-commerce Integration",
          description: "One-click integration with major platforms like Shopify, WooCommerce, and Magento. Track sales and attribution automatically.",
          link: "/features"
        },
        {
          title: "Product Seeding",
          description: "Streamline product sampling with automated shipping and tracking for influencer partnerships.",
          link: "/features"
        },
        {
          title: "Sales Attribution",
          description: "Track revenue, conversion rates, and ROI for each influencer partnership in real-time.",
          link: "/features"
        }
      ],
      useCases: [
        {
          title: "Product Launches",
          details: "Coordinate multiple creators to drive massive visibility for new product releases.",
          link: "/use-cases/product-launches"
        },
        {
          title: "Ongoing Sales Growth",
          details: "Build sustainable revenue through long-term creator partnerships.",
          link: "/use-cases/sales-growth"
        }
      ],
      targetAudience: [
        {
          role: "E-commerce Brands",
          benefits: "Scale your influencer marketing with automated product seeding and sales tracking.",
          link: "/solutions/ecommerce-brands"
        },
        {
          role: "D2C Companies",
          benefits: "Find and partner with creators who drive direct sales for your products.",
          link: "/solutions/d2c-brands"
        }
      ],
      relatedProducts: ["free-influencer-finder"]
    },
    {
      slug: "affiliate-marketing",
      metadata: {
        title: "Affiliate Marketing Platform | Manage Creator Partnerships | Infloq",
        description: "Triple your affiliate program ROI with Infloq's all-in-one affiliate management platform. Recruit creators, track sales, and automate payments - all in one dashboard.",
        keywords: [
          "affiliate marketing platform",
          "affiliate management software",
          "influencer affiliate program",
          "affiliate tracking",
          "affiliate commission management",
          "creator partnerships",
          "affiliate recruitment"
        ],
        alternates: {
          canonical: "/products/affiliate-marketing",
          openGraph: {
            type: "product",
            images: ["/images/affiliate-platform-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Triple your ROI with influencer affiliate marketing",
        subtitle: "The complete affiliate management platform to recruit creators, track sales, and automate commissions - all in one place.",
        image: "/affiliate-platform-demo.gif"
      },
      features: [
        {
          title: "Affiliate Recruitment",
          description: "Find and recruit high-performing creators with custom landing pages and automated outreach.",
          link: "/features"
        },
        {
          title: "Sales Attribution",
          description: "Track orders, revenue, and calculate commissions automatically with unique affiliate links.",
          link: "/features"
        },
        {
          title: "Automated Payments",
          description: "Process international payments and manage commission structures with one-click payouts.",
          link: "/features"
        }
      ],
      useCases: [
        {
          title: "Affiliate Program Management",
          details: "Launch and scale your affiliate program with automated recruitment and tracking.",
          link: "/use-cases/affiliate-programs"
        },
        {
          title: "Creator Partnership Growth",
          details: "Convert one-time influencer collaborations into long-term affiliate partnerships.",
          link: "/use-cases/creator-partnerships"
        }
      ],
      targetAudience: [
        {
          role: "E-commerce Brands",
          benefits: "Launch and scale affiliate programs with automated tracking and payments.",
          link: "/solutions/ecommerce-affiliate"
        },
        {
          role: "Digital Products",
          benefits: "Build a network of affiliate creators to drive consistent sales.",
          link: "/solutions/digital-products"
        }
      ],
      relatedProducts: ["ecommerce-influencer-marketing", "free-influencer-finder"]
    },
    {
      slug: "campaign-management",
      metadata: {
        title: "Influencer Campaign Management Platform | Infloq",
        description: "Streamline your influencer campaigns with automated workflows, content approvals, and performance tracking. Perfect for agencies and brands managing multiple campaigns.",
        keywords: [
          "influencer campaign management",
          "campaign workflow automation",
          "content approval system",
          "influencer marketing campaigns",
          "campaign analytics",
          "campaign tracking"
        ],
        alternates: {
          canonical: "/products/campaign-management",
          openGraph: {
            type: "product",
            images: ["/images/campaign-manager-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Manage All Your Influencer Campaigns in One Place",
        subtitle: "Automate workflows, approve content, and track performance across all your influencer marketing campaigns.",
        image: "/campaign-dashboard-demo.gif"
      },
      features: [
        {
          title: "Campaign Workflow",
          description: "Create custom campaign workflows with automated tasks, deadlines, and team collaboration tools.",
          link: "/features"
        },
        {
          title: "Content Management",
          description: "Streamline content approvals and manage deliverables across all your campaigns.",
          link: "/features"
        },
        {
          title: "Performance Analytics",
          description: "Track campaign metrics, ROI, and generate custom reports in real-time.",
          link: "/features"
        }
      ]
    },
    {
      slug: "influencer-discovery",
      metadata: {
        title: "AI-Powered Influencer Discovery Platform | Find Creators | Infloq",
        description: "Find the perfect influencers for your brand using AI-powered search filters. Search by niche, engagement rate, audience demographics, and more.",
        keywords: [
          "influencer discovery",
          "find creators",
          "influencer search",
          "creator search platform",
          "influencer database",
          "find brand ambassadors"
        ],
        alternates: {
          canonical: "/products/influencer-discovery",
          openGraph: {
            type: "product",
            images: ["/images/discovery-tool-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Find Your Perfect Brand Creators",
        subtitle: "Search millions of verified creators across all major social platforms with advanced AI-powered filters.",
        image: "/discovery-tool-demo.gif"
      },
      features: [
        {
          title: "Smart Search Filters",
          description: "Filter by niche, location, audience size, engagement rate, and brand affinity.",
          link: "/features"
        },
        {
          title: "AI Matching",
          description: "Get AI-powered creator recommendations based on your brand and campaign goals.",
          link: "/features"
        },
        {
          title: "Database Access",
          description: "Access millions of verified creators across Instagram, TikTok, YouTube, and more.",
          link: "/features"
        }
      ]
    },
    {
      slug: "influencer-analytics",
      metadata: {
        title: "Advanced Influencer Analytics Platform | Creator Analysis | Infloq",
        description: "Make data-driven decisions with in-depth creator analytics. Analyze engagement, audience demographics, content performance, and authenticity scores.",
        keywords: [
          "influencer analytics",
          "creator analysis",
          "engagement metrics",
          "audience analytics",
          "content performance",
          "authenticity analysis"
        ],
        alternates: {
          canonical: "/products/influencer-analytics",
          openGraph: {
            type: "product",
            images: ["/images/analytics-platform-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Deep Insights into Creator Performance",
        subtitle: "Analyze engagement metrics, audience quality, and content performance to make data-driven decisions.",
        image: "/analytics-dashboard-demo.gif"
      },
      features: [
        {
          title: "Engagement Analysis",
          description: "Track engagement rates, growth trends, and content performance metrics.",
          link: "/features"
        },
        {
          title: "Audience Insights",
          description: "Analyze follower demographics, authenticity, and brand affinity scores.",
          link: "/features"
        },
        {
          title: "Performance Tracking",
          description: "Monitor content performance and ROI across all creator partnerships.",
          link: "/features"
        }
      ]
    },
    {
      slug: "influencer-management",
      metadata: {
        title: "Influencer Relationship Management Platform | Infloq",
        description: "Streamline creator relationships with automated communication, contract management, and payment processing all in one platform.",
        keywords: [
          "influencer management",
          "creator relationship management",
          "influencer CRM",
          "creator contracts",
          "influencer payments",
          "partnership management"
        ],
        alternates: {
          canonical: "/products/influencer-management",
          openGraph: {
            type: "product",
            images: ["/images/management-platform-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Manage Creator Relationships at Scale",
        subtitle: "Automate communication, contracts, and payments for all your influencer partnerships.",
        image: "/management-dashboard-demo.gif"
      },
      features: [
        {
          title: "Communication Hub",
          description: "Centralize all creator communications with automated messaging and task management.",
          link: "/features"
        },
        {
          title: "Contract Management",
          description: "Generate, send, and track contracts and agreements with digital signatures.",
          link: "/features"
        },
        {
          title: "Payment Automation",
          description: "Process creator payments and manage invoices with automated workflows.",
          link: "/features"
        }
      ]
    },
    {
      slug: "influencer-gifting",
      metadata: {
        title: "Influencer Product Seeding & Gifting Platform | Infloq",
        description: "Automate your influencer gifting program with integrated shipping, tracking, and ROI measurement. Perfect for brands running product seeding campaigns.",
        keywords: [
          "influencer gifting",
          "product seeding",
          "influencer samples",
          "product gifting platform", 
          "gifting automation",
          "influencer shipping",
          "product tracking"
        ],
        alternates: {
          canonical: "/products/influencer-gifting",
          openGraph: {
            type: "product",
            images: ["/images/gifting-platform-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Scale Your Product Seeding Program",
        subtitle: "Automate product gifting with integrated shipping, tracking, and ROI measurement.",
        image: "/gifting-platform-demo.gif"
      },
      features: [
        {
          title: "Shipping Automation",
          description: "Automate product fulfillment and shipping with major carriers worldwide.",
          link: "/features"
        },
        {
          title: "Gift Tracking",
          description: "Track shipments and measure content creation from gifted products.",
          link: "/features"
        },
        {
          title: "ROI Measurement",
          description: "Calculate the return on investment for your product seeding campaigns.",
          link: "/features"
        }
      ]
     },
     {
      slug: "influencer-payments",
      metadata: {
        title: "Influencer Payment Management System | Infloq",
        description: "Streamline creator payments with automated invoicing, international transfers, and tax documentation in one platform.",
        keywords: [
          "influencer payments",
          "creator payments",
          "payment automation",
          "influencer invoicing",
          "international payments",
          "tax documentation",
          "payment tracking"
        ],
        alternates: {
          canonical: "/products/influencer-payments",
          openGraph: {
            type: "product", 
            images: ["/images/payment-system-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Automate Creator Payments Globally",
        subtitle: "Process payments, manage invoices, and handle tax documentation for creators worldwide.",
        image: "/payment-system-demo.gif"
      },
      features: [
        {
          title: "Payment Processing",
          description: "Send payments to creators worldwide with support for multiple currencies.",
          link: "/features"
        },
        {
          title: "Invoice Management",
          description: "Generate and track invoices automatically for all creator payments.",
          link: "/features"
        },
        {
          title: "Tax Documentation",
          description: "Manage tax forms and compliance documentation for global creators.",
          link: "/features"
        }
      ]
     },
     {
      slug: "campaign-analytics",
      metadata: {
        title: "Influencer Campaign Analytics Platform | Infloq",
        description: "Track and measure influencer campaign performance with real-time analytics, ROI tracking, and automated reporting.",
        keywords: [
          "campaign analytics",
          "influencer metrics",
          "campaign tracking",
          "ROI measurement",
          "performance analytics",
          "campaign reporting",
          "engagement tracking"
        ],
        alternates: {
          canonical: "/products/campaign-analytics",
          openGraph: {
            type: "product",
            images: ["/images/analytics-platform-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Measure Campaign Success in Real-Time",
        subtitle: "Track engagement, conversions, and ROI across all your influencer campaigns.",
        image: "/analytics-dashboard-demo.gif"
      },
      features: [
        {
          title: "Performance Tracking",
          description: "Monitor engagement, reach, and conversion metrics in real-time.",
          link: "/features"
        },
        {
          title: "ROI Analysis",
          description: "Calculate campaign ROI with automated sales and conversion tracking.",
          link: "/features"
        },
        {
          title: "Custom Reports",
          description: "Generate branded reports with key metrics and campaign insights.",
          link: "/features"
        }
      ]
     },
     {
      slug: "shopify-influencer-marketing",
      metadata: {
        title: "Shopify Influencer Marketing Integration | Infloq",
        description: "Connect your Shopify store to track influencer sales, automate product seeding, and manage creator partnerships.",
        keywords: [
          "shopify influencer marketing",
          "shopify integration",
          "ecommerce influencers",
          "shopify creators",
          "sales tracking",
          "product seeding",
          "creator partnerships"
        ],
        alternates: {
          canonical: "/products/shopify-integration",
          openGraph: {
            type: "product",
            images: ["/images/shopify-integration-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Scale Your Shopify Store with Creators",
        subtitle: "Track sales, automate product seeding, and manage influencer partnerships directly from Shopify.",
        image: "/shopify-integration-demo.gif"
      },
      features: [
        {
          title: "Sales Attribution",
          description: "Track influencer-driven sales and conversions in your Shopify store.",
          link: "/features"
        },
        {
          title: "Product Sync",
          description: "Sync products and inventory for automated influencer gifting.",
          link: "/features"
        },
        {
          title: "Discount Management",
          description: "Create and track unique discount codes for each creator.",
          link: "/features"
        }
      ]
     },
     {
      slug: "creator-database",
      metadata: {
        title: "Verified Creator Database | Infloq",
        description: "Access a comprehensive database of verified creators across multiple platforms. Filter and analyze based on engagement, authenticity, and brand affinity.",
        keywords: [
          "creator database",
          "verified creators",
          "influencer database",
          "creator analytics",
          "brand affinity",
          "authenticity scores",
          "engagement metrics"
        ],
        alternates: {
          canonical: "/products/creator-database",
          openGraph: {
            type: "product",
            images: ["/images/creator-database-preview.jpg"]
          }
        }
      },
      heading: {
        title: "Access the Largest Creator Database",
        subtitle: "Filter and analyze verified creators based on engagement, authenticity, and brand affinity.",
        image: "/creator-database-demo.gif"
      },
      features: [
        {
          title: "Creator Filtering",
          description: "Filter creators based on engagement, authenticity, and brand affinity.",
          link: "/features"
        },
        {
          title: "Creator Analytics",
          description: "Analyze engagement metrics, authenticity scores, and brand affinity.",
          link: "/features"
        },
        {
          title: "Brand Affinity",
          description: "Measure brand affinity and growth potential for creators.",
          link: "/features"
        }
      ]
     },
      {
        slug: "creator-search",
        metadata: {
          title: "AI-Powered Creator Search Tool | Infloq",
          description: "Search millions of verified creators across Instagram, TikTok, and YouTube. Filter by niche, engagement rate, audience demographics, and more.",
          keywords: [
            "creator search",
            "influencer search",
            "creator discovery",
            "influencer database",
            "verified creators",
            "audience demographics",
            "engagement rate"
          ],
          alternates: {
            canonical: "/products/creator-search",
            openGraph: {
              type: "product",
              images: ["/images/creator-search-preview.jpg"]
            }
          }
        },
        heading: {
          title: "Find Your Perfect Creators - 100% Free",
          subtitle: "Access our powerful influencer discovery tool. Search thousands of verified creators across Instagram, TikTok, and YouTube.",
          image: "/finder-tool-demo.gif"
        },
        features: [
          {
            title: "Smart Creator Search",
            description: "Use AI-powered filters to find creators by niche, audience size, engagement rate, and location.",
            link: "/features"
          },
          {
            title: "Engagement Analytics",
            description: "View detailed engagement metrics and audience demographics for any creator.",
            link: "/features"
          },
          {
            title: "Export & Share",
            description: "Export your favorite creators to CSV or share lists with your team.",
            link: "/features"
          }
        ],
        useCases: [
          {
            title: "Market Research",
            details: "Research top creators in your niche and understand content trends.",
            link: "/use-cases/market-research"
          },
          {
            title: "Campaign Planning",
            details: "Build lists of potential creators for your upcoming campaigns.",
            link: "/use-cases/campaign-planning"
          }
        ],
        targetAudience: [
          {
            role: "Small Business Owners",
            benefits: "Find affordable creators who align with your brand values and target audience.",
            link: "/solutions/small-business"
          },
          {
            role: "Marketing Freelancers",
            benefits: "Quickly research and propose creator partnerships to your clients.",
            link: "/solutions/freelancers"
          }
        ],
        relatedProducts: ["influencer-marketing-platform"]
      },
      {
        slug: "bigcommerce-influencer-marketing",
        metadata: {
          title: "BigCommerce Influencer Marketing Integration | Infloq",
          description: "Seamlessly connect your BigCommerce store with influencer marketing campaigns. Track sales, manage products, and scale creator partnerships.",
          keywords: [
            "bigcommerce influencer marketing",
            "bigcommerce integration",
            "ecommerce creators",
            "bigcommerce tracking",
            "creator partnerships",
            "sales attribution",
            "product seeding"
          ],
          alternates: {
            canonical: "/products/bigcommerce-integration",
            openGraph: {
              type: "product",
              images: ["/images/bigcommerce-preview.jpg"]
            }
          }
        },
        heading: {
          title: "Scale Your BigCommerce Store with Creators",
          subtitle: "Track influencer sales, manage product seeding, and grow creator partnerships with our BigCommerce integration.",
          image: "/bigcommerce-demo.gif"
        },
        features: [
          {
            title: "Sales Tracking",
            description: "Automatically track sales and conversions from creator partnerships.",
            link: "/features"
          },
          {
            title: "Product Management",
            description: "Sync your product catalog for streamlined influencer gifting.",
            link: "/features"
          },
          {
            title: "Discount Codes",
            description: "Generate and track unique discount codes for each creator.",
            link: "/features"
          }
        ]
       },
       {
        slug: "amazon-influencer-marketing",
        metadata: {
          title: "Amazon Influencer Marketing Platform | Infloq",
          description: "Scale your Amazon business with influencer partnerships. Track sales, manage affiliates, and automate product seeding for Amazon sellers.",
          keywords: [
            "amazon influencer marketing",
            "amazon seller tools",
            "amazon creator program",
            "amazon affiliates",
            "amazon product seeding",
            "amazon sales tracking",
            "amazon partnerships"
          ],
          alternates: {
            canonical: "/products/amazon-integration",
            openGraph: {
              type: "product",
              images: ["/images/amazon-preview.jpg"]
            }
          }
        },
        heading: {
          title: "Grow Your Amazon Business with Creators",
          subtitle: "Connect with Amazon influencers, track sales, and manage product seeding campaigns.",
          image: "/amazon-demo.gif"
        },
        features: [
          {
            title: "Amazon Attribution",
            description: "Track sales and performance metrics from creator partnerships.",
            link: "/features"
          },
          {
            title: "Affiliate Management",
            description: "Manage Amazon Associates and influencer partnerships in one place.",
            link: "/features"
          },
          {
            title: "Product Sampling",
            description: "Automate product seeding for Amazon influencer reviews.",
            link: "/features"
          }
        ]
       },
       {
        slug: "ecommerce-influencer-marketing",
        metadata: {
          title: "E-commerce Influencer Marketing Platform | Infloq",
          description: "Drive e-commerce sales through influencer partnerships. Connect your store, track performance, and scale creator campaigns.",
          keywords: [
            "ecommerce influencer marketing",
            "online store marketing",
            "creator partnerships",
            "ecommerce sales",
            "product seeding",
            "sales tracking",
            "influencer campaigns"
          ],
          alternates: {
            canonical: "/products/ecommerce-marketing",
            openGraph: {
              type: "product",
              images: ["/images/ecommerce-preview.jpg"]
            }
          }
        },
        heading: {
          title: "Scale Your E-commerce with Creator Partnerships",
          subtitle: "Connect your store, find converting creators, and track sales across all campaigns.",
          image: "/ecommerce-demo.gif"
        },
        features: [
          {
            title: "Platform Integration",
            description: "Connect with major e-commerce platforms for seamless tracking.",
            link: "/features"
          },
          {
            title: "Sales Attribution",
            description: "Track revenue and ROI from creator partnerships.",
            link: "/features"
          },
          {
            title: "Product Management",
            description: "Streamline product seeding and inventory management.",
            link: "/features"
          }
        ]
       },
       {
        slug: "magento-influencer-marketing",
        metadata: {
          title: "Magento Influencer Marketing Integration | Infloq",
          description: "Connect your Magento store with powerful influencer marketing tools. Track sales, manage products, and scale creator partnerships.",
          keywords: [
            "magento influencer marketing",
            "magento integration",
            "magento creators",
            "sales tracking",
            "product seeding",
            "creator partnerships",
            "magento marketing"
          ],
          alternates: {
            canonical: "/products/magento-integration",
            openGraph: {
              type: "product",
              images: ["/images/magento-preview.jpg"]
            }
          }
        },
        heading: {
          title: "Grow Your Magento Store with Creators",
          subtitle: "Track influencer sales, manage product seeding, and scale partnerships with our Magento integration.",
          image: "/magento-demo.gif"
        },
        features: [
          {
            title: "Magento Integration",
            description: "Seamless connection with your Magento store for sales tracking.",
            link: "/features"
          },
          {
            title: "Product Sync",
            description: "Automatically sync products for influencer campaigns.",
            link: "/features"
          },
          {
            title: "Campaign Analytics",
            description: "Track performance and ROI across all creator partnerships.",
            link: "/features"
          }
        ]
       },
       {
        slug: "woocommerce-influencer-marketing",
        metadata: {
          title: "WooCommerce Influencer Marketing Integration | Infloq",
          description: "Scale your WooCommerce store with integrated influencer marketing tools. Track sales, manage products, and grow creator partnerships.",
          keywords: [
            "woocommerce influencer marketing",
            "wordpress influencers",
            "woocommerce integration",
            "product seeding",
            "sales tracking",
            "creator partnerships",
            "wordpress marketing"
          ],
          alternates: {
            canonical: "/products/woocommerce-integration",
            openGraph: {
              type: "product",
              images: ["/images/woocommerce-preview.jpg"]
            }
          }
        },
        heading: {
          title: "Scale Your WooCommerce Store with Creators",
          subtitle: "Connect your store, track influencer sales, and manage product seeding campaigns.",
          image: "/woocommerce-demo.gif"
        },
        features: [
          {
            title: "WooCommerce Integration",
            description: "Seamless connection with your store for automated tracking.",
            link: "/features"
          },
          {
            title: "Product Management",
            description: "Sync and manage products for influencer campaigns.",
            link: "/features"
          },
          {
            title: "Performance Analytics",
            description: "Track sales and ROI from creator partnerships.",
            link: "/features"
          }
        ]
       },
        {
          slug: "product-seeding",
          metadata: {
            title: "Influencer Product Seeding Platform | Automate Gifting | Infloq",
            description: "Automate your influencer product seeding campaigns with integrated shipping, tracking, and ROI measurement. Perfect for brands running product sampling programs.",
            keywords: [
              "product seeding",
              "influencer gifting",
              "product sampling",
              "influencer samples",
              "gifting automation",
              "product shipping",
              "product tracking"
            ],
            alternates: {
              canonical: "/products/product-seeding",
              openGraph: {
                type: "product",
                images: ["/images/product-seeding-preview.jpg"]
              }
            }
          },
          heading: {
            title: "Scale Your Product Seeding Program",
            subtitle: "Automate product gifting with integrated shipping, tracking, and ROI measurement.",
            image: "/product-seeding-demo.gif"
          },
          features: [
            {
              title: "Shipping Automation",
              description: "Automate product fulfillment and shipping with major carriers worldwide.",
              link: "/features"
            },
            {
              title: "Gift Tracking",
              description: "Track shipments and measure content creation from gifted products.",
              link: "/features"
            },
            {
              title: "ROI Measurement",
              description: "Calculate the return on investment for your product seeding campaigns.",
              link: "/features"
            }
          ]
        },
  ];
  