//apps/landing/app/(marketing)/compare/[competitor]/utils.ts

import { competitors, Competitor, FeatureComparison } from '../../../../data/competitors';

export type FAQ = {
  question: string;
  answer: string;
};

export type Review = {
  author: string;
  rating: number;
  content: string;
  date: string;
};

export function generateFAQsFromFeatures(competitor: Competitor): FAQ[] {
  const faqs: FAQ[] = [];
  
  // General comparison FAQ
  faqs.push({
    question: `How does Infloq.com compare to ${competitor.name}?`,
    answer: `Infloq.com offers ${competitor.shortDescription.toLowerCase()}. While both platforms support influencer marketing, Infloq.com differentiates itself with AI-powered matching, performance-based pricing, and no minimum investment requirements.`
  });

  // Generate FAQs from feature categories
  competitor.features.forEach((category: FeatureComparison) => {
    const significantFeatures = category.features.filter(feature => {
      const infloqValue = Array.isArray(feature.infloq) ? feature.infloq.join(', ') : feature.infloq;
      const competitorValue = Array.isArray(feature.competitor) ? feature.competitor.join(', ') : feature.competitor;
      return infloqValue !== competitorValue;
    });

    if (significantFeatures.length > 0) {
      faqs.push({
        question: `What are the main differences in ${category.category.toLowerCase()} between Infloq.com and ${competitor.name}?`,
        answer: significantFeatures.map(feature => 
          `${feature.name}: Infloq.com offers ${Array.isArray(feature.infloq) ? feature.infloq.join(', ') : feature.infloq}, while ${competitor.name} provides ${Array.isArray(feature.competitor) ? feature.competitor.join(', ') : feature.competitor}.`
        ).join(' ')
      });
    }
  });

  return faqs;
}

// Mock reviews based on features comparison
export function generateReviews(competitor: Competitor): Review[] {
  const reviews: Review[] = [
    {
      author: "John D.",
      rating: 5,
      content: `Switched from ${competitor.name} to Infloq.com and saw immediate improvements in campaign performance. The AI-powered matching and performance-based pricing model make it much more cost-effective.`,
      date: "2024-01-15"
    },
    {
      author: "Sarah M.",
      rating: 5,
      content: "The automated campaign optimization and real-time analytics have transformed how we run our influencer campaigns. Excellent platform with great ROI.",
      date: "2024-02-01"
    },
    {
      author: "Michael R.",
      rating: 4,
      content: "Very impressed with the AI-driven verification process and the global creator network. Makes finding the right influencers much easier than traditional platforms.",
      date: "2024-02-15"
    }
  ];

  return reviews;
}

export function getFeatureHighlights(competitor: Competitor): string[] {
  const highlights: string[] = [];
  
  competitor.features.forEach(category => {
    category.features.forEach(feature => {
      if (feature.infloq === true && feature.competitor === false) {
        highlights.push(feature.name);
      } else if (typeof feature.infloq === 'string' && typeof feature.competitor === 'string') {
        if (feature.infloq.toLowerCase().includes('ai') || feature.infloq.toLowerCase().includes('automated')) {
          highlights.push(feature.name);
        }
      }
    });
  });

  return highlights;
}