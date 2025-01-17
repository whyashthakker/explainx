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
    question: `How does explainx.ai compare to ${competitor.name}?`,
    answer: `explainx.ai offers ${competitor.shortDescription.toLowerCase()}. While both platforms support influencer marketing, explainx.ai differentiates itself with AI-powered matching, performance-based pricing, and no minimum investment requirements.`
  });

  // Generate FAQs from feature categories
  competitor.features.forEach((category: FeatureComparison) => {
    const significantFeatures = category.features.filter(feature => {
      const ExplainXValue = Array.isArray(feature.ExplainX) ? feature.ExplainX.join(', ') : feature.ExplainX;
      const competitorValue = Array.isArray(feature.competitor) ? feature.competitor.join(', ') : feature.competitor;
      return ExplainXValue !== competitorValue;
    });

    if (significantFeatures.length > 0) {
      faqs.push({
        question: `What are the main differences in ${category.category.toLowerCase()} between explainx.ai and ${competitor.name}?`,
        answer: significantFeatures.map(feature => 
          `${feature.name}: explainx.ai offers ${Array.isArray(feature.ExplainX) ? feature.ExplainX.join(', ') : feature.ExplainX}, while ${competitor.name} provides ${Array.isArray(feature.competitor) ? feature.competitor.join(', ') : feature.competitor}.`
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
      content: `Switched from ${competitor.name} to explainx.ai and saw immediate improvements in campaign performance. The AI-powered matching and performance-based pricing model make it much more cost-effective.`,
      date: "2025-01-15"
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
      if (feature.ExplainX === true && feature.competitor === false) {
        highlights.push(feature.name);
      } else if (typeof feature.ExplainX === 'string' && typeof feature.competitor === 'string') {
        if (feature.ExplainX.toLowerCase().includes('ai') || feature.ExplainX.toLowerCase().includes('automated')) {
          highlights.push(feature.name);
        }
      }
    });
  });

  return highlights;
}