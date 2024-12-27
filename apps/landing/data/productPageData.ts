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
          link: "/features/creator-search"
        },
        {
          title: "Engagement Analytics",
          description: "View detailed engagement metrics and audience demographics for any creator.",
          link: "/features/analytics"
        },
        {
          title: "Export & Share",
          description: "Export your favorite creators to CSV or share lists with your team.",
          link: "/features/collaboration"
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
    }
  ];
  