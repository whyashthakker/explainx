// app/features/_components/features-list.tsx
import {
    BarChart2Icon,
    Database,
    ShoppingCart,
    BoxIcon,
    CreditCard,
    Users,
    LineChart,
    Settings,
    Globe,
    MessageCircle,
    Sparkles,
  } from "lucide-react";
import { FeaturesWithImage } from "../../../_components/features";
  
  const featureCategories = [
    {
      title: "E-commerce Integration",
      subtitle: "Seamless Platform Connections",
      description: "Connect your e-commerce platform to track sales, manage products, and scale creator partnerships efficiently.",
      image: "/features/ecommerce-integration.png",
      imageSide: "right" as const,
      features: [
        {
          name: "Multi-Platform Support",
          description: "Native integration with Shopify, WooCommerce, Magento, BigCommerce, and Amazon.",
          icon: ShoppingCart,
        },
        {
          name: "Sales Attribution",
          description: "Track revenue and conversions from creator partnerships in real-time.",
          icon: LineChart,
        },
        {
          name: "Product Management",
          description: "Streamline product seeding and inventory management for influencer campaigns.",
          icon: BoxIcon,
        },
      ],
    },
    {
      title: "Campaign Management",
      subtitle: "Comprehensive Campaign Control",
      description: "Manage all aspects of your influencer campaigns from a single dashboard with powerful automation tools.",
      image: "/features/campaign-management.png",
      imageSide: "left" as const,
      features: [
        {
          name: "Workflow Automation",
          description: "Automate campaign tasks, approvals, and communications with custom workflows.",
          icon: Settings,
        },
        {
          name: "Performance Analytics",
          description: "Track engagement, conversions, and ROI across all campaigns in real-time.",
          icon: BarChart2Icon,
        },
        {
          name: "Content Management",
          description: "Streamline content approvals and manage deliverables efficiently.",
          icon: Database,
        },
      ],
    },
    {
      title: "Creator Discovery",
      subtitle: "AI-Powered Matching",
      description: "Find the perfect creators for your brand using advanced AI matching and detailed analytics.",
      image: "/features/creator-discovery.png",
      imageSide: "right" as const,
      features: [
        {
          name: "Smart Filters",
          description: "Search by niche, engagement rate, audience demographics, and brand affinity.",
          icon: Sparkles,
        },
        {
          name: "Verification System",
          description: "Access only verified creators with authenticated metrics and performance history.",
          icon: Users,
        },
        {
          name: "Global Reach",
          description: "Connect with creators across all major social platforms worldwide.",
          icon: Globe,
        },
      ],
    },
    {
      title: "Payment & Administration",
      subtitle: "Streamlined Operations",
      description: "Automate payments, contracts, and administrative tasks for efficient campaign management.",
      image: "/features/payment-admin.png",
      imageSide: "left" as const,
      features: [
        {
          name: "Payment Processing",
          description: "Handle international payments and manage different compensation models.",
          icon: CreditCard,
        },
        {
          name: "Contract Management",
          description: "Generate and manage contracts with digital signatures and tracking.",
          icon: Database,
        },
        {
          name: "Communication Hub",
          description: "Centralize all creator communications and collaboration in one place.",
          icon: MessageCircle,
        },
      ],
    },
  ];
  
  export function FeaturesList() {
    return (
      <div className="space-y-32">
        {featureCategories.map((category) => (
          <FeaturesWithImage
            key={category.title}
            imageSide={category.imageSide}
            title={category.title}
            subtitle={category.subtitle}
            description={category.description}
            image={category.image}
            features={category.features}
          />
        ))}
      </div>
    );
  }