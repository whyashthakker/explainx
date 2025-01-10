export interface Tool {
    id: string;
    name: string;
    description: string;
    platform: 'General';
    icon?: string;
    category: string;
    component: string;
    image: string;
    ctaText: string;
    features: string[];
    useCase: {
      title: string;
      description: string;
      examples: string[];
    }[];
    targetAudience: string[];
    benefits: string[];
    keyFeatures: {
      title: string;
      description: string;
      icon?: string;
    }[];
    faq: {
      question: string;
      answer: string;
    }[];
    pricing?: {
      free?: string[];
      pro?: string[];
      price?: string;
    };
  }