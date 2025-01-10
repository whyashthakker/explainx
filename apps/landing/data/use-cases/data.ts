// lib/use-cases/data.ts

export interface UseCase {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    keywords: string[];
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
    benefits: {
      title: string;
      description: string;
      stats?: string;
    }[];
    testimonials: {
      quote: string;
      author: string;
      role: string;
      company: string;
      image?: string;
    }[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
    ctaButtonLink: string;
  }
  
  export const useCases: UseCase[] = [
    {
      slug: "drive-ecommerce-sales",
      title: "Drive E-Commerce Sales with AI-Powered Influencer Marketing",
      subtitle: "Boost Your Online Sales Through Strategic Creator Partnerships",
      description: "Transform your e-commerce performance with ExplainX's AI-driven influencer marketing platform. Connect with authentic creators, automate campaign management, and track real ROI from your influencer partnerships.",
      heroImage: "/images/use-cases/ecommerce-hero.png",
      keywords: [
        "e-commerce influencer marketing",
        "creator partnerships",
        "social commerce",
        "influencer ROI tracking",
        "sales attribution",
        "product seeding",
        "affiliate marketing",
        "commission management",
        "influencer automation",
        "e-commerce growth"
      ],
      features: [
        {
          title: "AI-Powered Creator Discovery",
          description: "Find the perfect creators for your brand using our advanced AI matching algorithm that analyzes engagement, audience quality, and past performance.",
          icon: "SearchIcon"
        },
        {
          title: "Automated Campaign Management",
          description: "Streamline your influencer campaigns with automated product seeding, promo code generation, and commission tracking all in one platform.",
          icon: "LayoutIcon"
        },
        {
          title: "Sales Attribution & ROI Tracking",
          description: "Track the direct impact of creator partnerships on your sales with detailed attribution and ROI analytics.",
          icon: "ChartIcon"
        }
      ],
      benefits: [
        {
          title: "Increased Sales Conversion",
          description: "Average increase in conversion rates when working with matched creators",
          stats: "32%"
        },
        {
          title: "Time Saved",
          description: "Reduction in campaign management time through automation",
          stats: "75%"
        },
        {
          title: "ROI Improvement",
          description: "Average return on investment for brands using our platform",
          stats: "3.8x"
        }
      ],
      testimonials: [
        {
          quote: "ExplainX's platform has transformed how we approach influencer marketing. The AI matching and automated campaign management have saved us countless hours while delivering better results.",
          author: "Sarah Chen",
          role: "Head of Marketing",
          company: "StyleCo",
          image: "/images/testimonials/sarah-chen.jpg"
        }
      ],
      ctaTitle: "Ready to Boost Your E-commerce Sales?",
      ctaDescription: "Join thousands of brands using ExplainX to drive sales through creator partnerships.",
      ctaButtonText: "Get Started Free",
      ctaButtonLink: "/signup"
    },
    {
      slug: "run-affiliate-programs",
      title: "Run High-Performance Affiliate Programs with Creators",
      subtitle: "Transform Creators into Revenue-Generating Partners",
      description: "Launch and scale successful affiliate programs with ExplainX's comprehensive creator management platform. Automate commission tracking, streamline payouts, and maximize ROI from your affiliate partnerships.",
      heroImage: "/images/use-cases/affiliate-hero.png",
      keywords: [
        "affiliate marketing platform",
        "influencer affiliate program",
        "creator commission tracking",
        "affiliate management software",
        "performance marketing",
        "affiliate recruitment",
        "commission automation",
        "payout management",
        "affiliate analytics",
        "creator partnerships"
      ],
      features: [
        {
          title: "Automated Affiliate Onboarding",
          description: "Simplify affiliate recruitment with customizable landing pages and automated verification processes to quickly grow your program.",
          icon: "UsersIcon"
        },
        {
          title: "Commission Management",
          description: "Set custom commission structures, track performance, and automate payouts with our comprehensive affiliate management tools.",
          icon: "SettingsIcon"
        },
        {
          title: "Performance Analytics",
          description: "Get detailed insights into affiliate performance, track revenue attribution, and optimize your program with data-driven decisions.",
          icon: "ChartIcon"
        }
      ],
      benefits: [
        {
          title: "Program Growth",
          description: "Average increase in affiliate program size within first 3 months",
          stats: "185%"
        },
        {
          title: "Revenue Growth",
          description: "Average increase in affiliate-generated revenue",
          stats: "245%"
        },
        {
          title: "Management Efficiency",
          description: "Reduction in affiliate program management time",
          stats: "65%"
        }
      ],
      testimonials: [
        {
          quote: "ExplainX's affiliate management tools have revolutionized how we run our creator program. The automation and analytics have helped us scale faster than we thought possible.",
          author: "Alex Rivera",
          role: "Affiliate Program Manager",
          company: "TechStyle",
          image: "/images/testimonials/alex-rivera.jpg"
        }
      ],
      ctaTitle: "Ready to Scale Your Affiliate Program?",
      ctaDescription: "Join leading brands using ExplainX to run successful creator affiliate programs.",
      ctaButtonText: "Start Free Trial",
      ctaButtonLink: "/signup"
    },
    {
      slug: "manage-client-campaigns",
      title: "Streamline Client Campaign Management",
      subtitle: "End-to-End Campaign Management for Agencies",
      description: "Manage all your client's influencer marketing campaigns from a single platform. From creator discovery to performance reporting, ExplainX provides agencies with the tools needed to deliver exceptional results.",
      heroImage: "/images/use-cases/agency-hero.png",
      keywords: [
        "agency campaign management",
        "influencer marketing agency",
        "client campaign tools",
        "campaign workflow automation",
        "performance reporting",
        "creator management",
        "agency analytics",
        "client reporting",
        "campaign optimization",
        "agency efficiency"
      ],
      features: [
        {
          title: "Multi-Client Management",
          description: "Efficiently manage multiple client campaigns with organized workspaces, custom workflows, and automated task management.",
          icon: "LayoutIcon"
        },
        {
          title: "Creator Relationship Management",
          description: "Build and maintain creator relationships with integrated CRM features designed for influencer marketing.",
          icon: "UsersIcon"
        },
        {
          title: "Automated Reporting",
          description: "Generate comprehensive campaign reports with custom branding and real-time performance metrics for your clients.",
          icon: "ChartIcon"
        }
      ],
      benefits: [
        {
          title: "Client Satisfaction",
          description: "Improvement in client satisfaction scores",
          stats: "92%"
        },
        {
          title: "Operational Efficiency",
          description: "Reduction in campaign management overhead",
          stats: "60%"
        },
        {
          title: "Campaign Performance",
          description: "Average improvement in campaign ROI",
          stats: "2.8x"
        }
      ],
      testimonials: [
        {
          quote: "Managing multiple client campaigns has never been easier. ExplainX's platform helps us deliver better results while saving significant time on operations.",
          author: "Emma Thompson",
          role: "Agency Director",
          company: "Digital Collective",
          image: "/images/testimonials/emma-thompson.jpg"
        }
      ],
      ctaTitle: "Ready to Transform Your Agency Operations?",
      ctaDescription: "Join agencies worldwide using ExplainX to deliver exceptional results for their clients.",
      ctaButtonText: "Book a Demo",
      ctaButtonLink: "/demo"
    },
    {
      slug: "for-creators",
      title: "Grow Your Creator Business",
      subtitle: "Turn Your Influence into Sustainable Income",
      description: "Build and scale your creator business with ExplainX's comprehensive platform. Connect with brands, manage partnerships, and track your performance all in one place.",
      heroImage: "/images/use-cases/creator-hero.png",
      keywords: [
        "creator monetization",
        "influencer platform",
        "brand partnerships",
        "creator analytics",
        "content management",
        "partnership opportunities",
        "creator tools",
        "influence tracking",
        "brand collaboration",
        "creator growth"
      ],
      features: [
        {
          title: "Brand Match Discovery",
          description: "Get matched with relevant brands based on your content, audience, and performance metrics using our AI-powered platform.",
          icon: "SearchIcon"
        },
        {
          title: "Partnership Management",
          description: "Manage all your brand partnerships, content schedules, and deliverables in one organized dashboard.",
          icon: "LayoutIcon"
        },
        {
          title: "Performance Analytics",
          description: "Track your growth, engagement, and earnings with comprehensive analytics and insights.",
          icon: "TrendingIcon"
        }
      ],
      benefits: [
        {
          title: "Income Growth",
          description: "Average increase in creator earnings within 6 months",
          stats: "156%"
        },
        {
          title: "Brand Partnerships",
          description: "Average number of new brand partnerships secured",
          stats: "12/month"
        },
        {
          title: "Time Saved",
          description: "Reduction in administrative work",
          stats: "70%"
        }
      ],
      testimonials: [
        {
          quote: "ExplainX has transformed how I run my creator business. The platform makes it easy to find and manage brand partnerships, allowing me to focus on creating great content.",
          author: "James Wilson",
          role: "Content Creator",
          company: "Lifestyle & Tech",
          image: "/images/testimonials/james-wilson.jpg"
        }
      ],
      ctaTitle: "Ready to Scale Your Creator Business?",
      ctaDescription: "Join thousands of creators using ExplainX to build sustainable businesses.",
      ctaButtonText: "Join as Creator",
      ctaButtonLink: "/creators/signup"
    },
    {
      slug: "for-brands",
      title: "Scale Your Brand with AI-Powered Influencer Marketing",
      subtitle: "Reach Your Marketing Goals with Data-Driven Creator Partnerships",
      description: "Take your brand to the next level with ExplainX's comprehensive influencer marketing platform. Discover perfect creators, manage campaigns efficiently, and measure real impact on your business goals.",
      heroImage: "/images/use-cases/brands-hero.png",
      keywords: [
        "brand marketing",
        "influencer campaigns",
        "brand awareness",
        "marketing ROI",
        "creator partnerships",
        "campaign management",
        "brand growth",
        "marketing automation",
        "content strategy",
        "brand engagement"
      ],
      features: [
        {
          title: "Smart Creator Discovery",
          description: "Find creators who truly align with your brand using our AI-powered matching system that analyzes brand values, audience fit, and performance metrics.",
          icon: "SearchIcon"
        },
        {
          title: "Campaign Automation",
          description: "Streamline your marketing operations with automated workflows for creator outreach, content approval, and performance tracking.",
          icon: "LayoutIcon"
        },
        {
          title: "Advanced Analytics",
          description: "Make data-driven decisions with comprehensive analytics covering engagement, conversions, ROI, and brand sentiment.",
          icon: "ChartIcon"
        }
      ],
      benefits: [
        {
          title: "Brand Growth",
          description: "Average increase in brand awareness metrics",
          stats: "215%"
        },
        {
          title: "Marketing Efficiency",
          description: "Improvement in campaign management efficiency",
          stats: "85%"
        },
        {
          title: "Content ROI",
          description: "Average return on creator content investment",
          stats: "4.2x"
        }
      ],
      testimonials: [
        {
          quote: "ExplainX has revolutionized how we approach creator partnerships. The platform's AI-driven matching and automated workflows have helped us scale our influencer program while maintaining authenticity.",
          author: "Maya Patel",
          role: "Marketing Director",
          company: "GlobalBrands",
          image: "/images/testimonials/maya-patel.jpg"
        }
      ],
      ctaTitle: "Ready to Transform Your Brand Marketing?",
      ctaDescription: "Join innovative brands using ExplainX to achieve their marketing goals through creator partnerships.",
      ctaButtonText: "Get Started",
      ctaButtonLink: "/brands/signup"
    }
  ];