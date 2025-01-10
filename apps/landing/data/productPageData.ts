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
  export const productPageData: ProductData[] = [{
    slug: "ai-agent-development",
    metadata: {
      title: "AI Agent Development Services | explainx.ai",
      description: "Professional AI agent development services to automate workflows, enhance customer experiences, and drive business efficiency. Custom solutions tailored to your needs.",
      keywords: ["AI agent development", "custom AI solutions", "workflow automation", "AI consulting"],
      alternates: { 
        canonical: "/products/ai-agent-development",
        openGraph: {
          type: "product",
          images: ["/images/ai-agent-preview.jpg"]
        }
      }
    },
    heading: {
      title: "Custom AI Agent Development",
      subtitle: "Transform your business with intelligent AI agents tailored to your specific needs and workflows.",
      image: "/ai_agent_main.gif",
    },
    testimonials: [
      {
        quote: "The AI agent ExplainX developed has automated 70% of our customer service inquiries, improving response times dramatically.",
        author: "Sarah Chen, CTO at TechScale",
      },
      {
        quote: "Their AI consulting team helped us identify and implement the perfect automation solution for our workflow.",
        author: "David Wilson, Operations Director at InnovateCorp",
      },
    ],
    features: [
      {
        title: "Custom AI Agent Development",
        description: "Fully customized AI agents built to automate your specific workflows and integrate seamlessly with your existing systems.",
        link: "/products/custom-ai-development"
      },
      {
        title: "AI Training & Implementation",
        description: "Comprehensive training programs to help your team master AI agent development and maintenance.",
        link: "/products/ai-training"
      },
      {
        title: "Generative AI Solutions",
        description: "Advanced generative AI implementations for content creation, data analysis, and process automation.",
        link: "/products/generative-ai"
      },
      {
        title: "Frontend Integration",
        description: "User-friendly interfaces and dashboards for seamless interaction with your AI agents.",
        link: "/products/frontend-development"
      }
    ],
    useCases: [
      {
        title: "Customer Service Automation",
        details: "Implement AI agents that handle customer inquiries 24/7, reducing response times and improving satisfaction.",
        link: "/use-cases/customer-service"
      },
      {
        title: "Workflow Automation",
        details: "Automate repetitive tasks and streamline business processes with intelligent AI agents.",
        link: "/use-cases/workflow-automation"
      },
      {
        title: "Data Analysis & Reporting",
        details: "Deploy AI agents that analyze data and generate insights automatically.",
        link: "/use-cases/data-analysis"
      }
    ],
    targetAudience: [
      {
        role: "Technology Leaders",
        benefits: "Implement cutting-edge AI solutions that drive efficiency and innovation in your organization.",
        link: "/solutions/tech-leaders"
      },
      {
        role: "Operations Managers",
        benefits: "Automate workflows and reduce manual tasks with custom AI agents.",
        link: "/solutions/operations"
      },
      {
        role: "Business Owners",
        benefits: "Transform your business processes with AI-powered automation and insights.",
        link: "/solutions/business-owners"
      }
    ],
    relatedProducts: ["ai-consulting", "workflow-automation-platform"]
  }

  ];
  