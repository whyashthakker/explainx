// types/features.ts
import { LucideIcon, ShoppingCart, LayoutDashboard, Search, CreditCard, BarChart, Package, Users } from 'lucide-react';

export interface SubFeature {
  title: string;
  description: string;
  icon?: LucideIcon;
  link?: string;
}

export interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  features: SubFeature[];
  benefits?: string[];
  image?: string;
}

export interface FeaturePageData {
  title: string;
  description: string;
  categories: FeatureCategory[];
}

// Master features data
export const featuresData: FeaturePageData = {
  title: "Platform Features",
  description: "Discover all the powerful features that make ExplainX the leading influencer marketing platform",
  categories: [
    {
      id: "ecommerce-integration",
      title: "E-commerce Integration",
      description: "Seamlessly connect your store and track creator-driven sales with supported platforms",
      icon: ShoppingCart,
      slug: "ecommerce-integration",
      image: "/features/ecommerce-integration.png",
      benefits: [
        "Direct integration with major e-commerce platforms",
        "Real-time sales tracking and attribution",
        "Automated product seeding management"
      ],
      features: [
        {
          title: "Shopify Integration",
          description: "One-click integration with your Shopify store for automated sales tracking and creator management",
          link: "/features"
        },
        {
          title: "WooCommerce Integration",
          description: "Native WordPress integration for seamless WooCommerce store connection and tracking",
          link: "/features"
        },
        {
          title: "Magento Integration",
          description: "Connect your Magento store to track sales and manage creator partnerships",
          link: "/features"
        },
        {
          title: "Amazon Integration",
          description: "Track sales and manage creator partnerships for Amazon sellers",
          link: "/features"
        }
      ]
    },
    {
      id: "campaign-management",
      title: "Campaign Management",
      description: "Comprehensive tools to plan, execute, and track influencer campaigns",
      icon: LayoutDashboard,
      slug: "campaign-management",
      image: "/features/campaign-dashboard.png",
      benefits: [
        "Streamlined campaign workflow management",
        "Automated content approval process",
        "Real-time performance tracking"
      ],
      features: [
        {
          title: "Campaign Workflow",
          description: "Create custom campaign workflows with automated tasks and deadlines",
          link: "/features"
        },
        {
          title: "Content Management",
          description: "Streamline content approvals and manage deliverables across campaigns",
          link: "/features"
        },
        {
          title: "Performance Analytics",
          description: "Track campaign metrics and ROI in real-time",
          link: "/features"
        }
      ]
    },
    {
      id: "creator-discovery",
      title: "Creator Discovery",
      description: "Find and connect with the perfect creators for your brand",
      icon: Search,
      slug: "creator-discovery",
      image: "/features/creator-discovery.png",
      benefits: [
        "AI-powered creator matching",
        "Verified creator profiles",
        "Detailed audience analytics"
      ],
      features: [
        {
          title: "Smart Creator Search",
          description: "Use AI-powered filters to find creators by niche, engagement, and more",
          link: "/features"
        },
        {
          title: "Engagement Analytics",
          description: "View detailed engagement metrics and audience demographics",
          link: "/features"
        },
        {
          title: "Creator Verification",
          description: "Access only verified creators with authenticated metrics",
          link: "/features"
        }
      ]
    },
    {
      id: "payment-management",
      title: "Payment & Administration",
      description: "Streamline creator payments and campaign administration",
      icon: CreditCard,
      slug: "payment-management",
      image: "/features/payment-admin.png",
      benefits: [
        "Automated payment processing",
        "Contract management system",
        "Tax documentation handling"
      ],
      features: [
        {
          title: "Payment Processing",
          description: "Send payments to creators worldwide with multiple currency support",
          link: "/features"
        },
        {
          title: "Invoice Management",
          description: "Generate and track invoices automatically for creator payments",
          link: "/features"
        },
        {
          title: "Tax Documentation",
          description: "Manage tax forms and compliance documentation globally",
          link: "/features"
        }
      ]
    },
    {
      id: "analytics-reporting",
      title: "Analytics & Reporting",
      description: "Comprehensive analytics and reporting tools for data-driven decisions",
      icon: BarChart,
      slug: "analytics-reporting",
      image: "/features/analytics-dashboard.png",
      benefits: [
        "Real-time performance tracking",
        "Custom report generation",
        "ROI measurement tools"
      ],
      features: [
        {
          title: "Performance Dashboard",
          description: "Track engagement, reach, and conversion metrics in real-time",
          link: "/features"
        },
        {
          title: "ROI Analysis",
          description: "Calculate campaign ROI with automated tracking",
          link: "/features"
        },
        {
          title: "Custom Reports",
          description: "Generate branded reports with key metrics and insights",
          link: "/features"
        }
      ]
    },
    {
      id: "product-seeding",
      title: "Product Seeding",
      description: "Automate your influencer gifting and product sampling programs",
      icon: Package,
      slug: "product-seeding",
      image: "/features/product-seeding.png",
      benefits: [
        "Automated shipping management",
        "Product tracking system",
        "ROI measurement for gifting"
      ],
      features: [
        {
          title: "Shipping Automation",
          description: "Automate product fulfillment and shipping with major carriers",
          link: "/features"
        },
        {
          title: "Gift Tracking",
          description: "Track shipments and measure content creation from gifted products",
          link: "/features"
        },
        {
          title: "ROI Measurement",
          description: "Calculate the return on investment for product seeding campaigns",
          link: "/features"
        }
      ]
    },
    {
      id: "affiliate-management",
      title: "Affiliate Management",
      description: "Manage creator affiliate programs and track performance",
      icon: Users,
      slug: "affiliate-management",
      image: "/features/affiliate-management.png",
      benefits: [
        "Automated affiliate tracking",
        "Commission management",
        "Performance analytics"
      ],
      features: [
        {
          title: "Affiliate Tracking",
          description: "Track affiliate sales and commissions automatically",
          link: "/features"
        },
        {
          title: "Commission Management",
          description: "Set up and manage different commission structures",
          link: "/features"
        },
        {
          title: "Performance Analytics",
          description: "Monitor affiliate performance and optimize programs",
          link: "/features"
        }
      ]
    }
  ]
};