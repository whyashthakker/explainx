//data/landing/faq-data.ts
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How do I sign up for Infloq?",
    answer: "Getting started with Infloq is simple. Visit infloq.com and click 'Get Started' to create your account. You can start with our free tier to explore the platform's capabilities.",
    category: "Getting Started"
  },
  {
    question: "What platforms does Infloq support?",
    answer: "Infloq supports all major social platforms including Instagram, TikTok, YouTube, Twitter/X, LinkedIn, Pinterest, Twitch, and Facebook. Our AI-powered discovery works across platforms to find the best creators for your brand.",
    category: "Platform Features"
  },
  {
    question: "Is Infloq free to use?",
    answer: "Infloq offers a free tier that lets you explore our platform and connect with up to 5 creators monthly. For scaling your campaigns, we use a performance-based pricing model where you only pay for actual engagement and results.",
    category: "Pricing"
  },
  {
    question: "How does AI-powered creator matching work?",
    answer: "Our AI analyzes multiple factors including creator content, audience demographics, engagement rates, and past performance to match you with creators who align with your brand values and are most likely to drive results.",
    category: "Technology"
  },
  {
    question: "How does the billing work?",
    answer: "We use a credit-based system where you only pay for actual results. Credits cost $0.10 each and never expire. Our platform fee is 30% of campaign spend, significantly lower than industry standards.",
    category: "Pricing"
  },
  {
    question: "Can I use Infloq in my language?",
    answer: "Yes, Infloq supports multiple languages including English, Spanish, French, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean, Arabic, Hindi, and more. Our AI can match you with creators who speak your target audience's language.",
    category: "Platform Features"
  },
  {
    question: "How do I track campaign performance?",
    answer: "Our real-time analytics dashboard shows key metrics including clicks, conversions, ROI, and engagement rates. You can track performance at both the campaign and individual creator level, with detailed insights and AI-powered optimization suggestions.",
    category: "Analytics"
  },
  {
    question: "Can I customize campaign requirements?",
    answer: "Yes, you can set custom campaign requirements including content guidelines, posting schedules, and performance targets. Our platform helps ensure creators meet your specifications while maintaining authentic engagement.",
    category: "Campaign Management"
  },
  {
    question: "Is automatic campaign optimization available?",
    answer: "Yes, our AI continuously analyzes campaign performance and provides optimization suggestions. It can automatically adjust targeting and budget allocation based on real-time performance data.",
    category: "Technology"
  },
  {
    question: "Do you offer analytics and reporting?",
    answer: "Yes, we provide comprehensive analytics including engagement rates, audience demographics, conversion tracking, and ROI analysis. Custom reports can be generated for specific campaigns or time periods.",
    category: "Analytics"
  },
  {
    question: "How does Infloq handle data privacy?",
    answer: "We prioritize data security and privacy. All data is encrypted, and we comply with global privacy regulations. We only collect essential information needed for platform functionality.",
    category: "Security"
  },
  {
    question: "Can businesses of any size use Infloq?",
    answer: "Yes, Infloq is designed to scale with your needs. Whether you're a solopreneur or a growing brand, our performance-based pricing and flexible credit system make it accessible for businesses of all sizes.",
    category: "Platform Features"
  },
  {
    question: "What are Custom Campaigns?",
    answer: "Custom Campaigns allow you to create specialized influencer marketing campaigns with specific goals, requirements, and targeting parameters. This feature is available on all paid plans.",
    category: "Campaign Management"
  },
  {
    question: "How do creator payments work?",
    answer: "Creators are paid based on actual performance (clicks and conversions) through our automated payment system. You set your cost-per-click rate, and payments are processed automatically when performance thresholds are met.",
    category: "Payments"
  },
  {
    question: "Where can I see campaign analytics?",
    answer: "Campaign analytics are available in your dashboard under the 'Analytics' section. You can view real-time performance metrics, generate custom reports, and export data for further analysis.",
    category: "Analytics"
  },
  {
    question: "Is there a mobile app available?",
    answer: "We're currently developing our mobile app. For now, Infloq is optimized for desktop and mobile web browsers, providing a seamless experience across devices.",
    category: "Platform Features"
  },
  {
    question: "Can I edit campaign details after launching?",
    answer: "Yes, you can modify most campaign parameters even after launch. Our platform allows for real-time adjustments to budgets, targeting, and requirements.",
    category: "Campaign Management"
  },
  {
    question: "Is there a demo available?",
    answer: "Yes, you can schedule a personalized demo with our team to explore Infloq's features. Visit our demo page to book a time that works for you.",
    category: "Getting Started"
  },
  {
    question: "How can I contact support?",
    answer: "Our support team is available via email at support@infloq.com. Enterprise customers get access to priority support with dedicated account managers.",
    category: "Support"
  },
  {
    question: "Is there a guide for new users?",
    answer: "Yes, we provide comprehensive onboarding resources including video tutorials, documentation, and best practices guides. Visit our Help Center for detailed information.",
    category: "Getting Started"
  }
];

export default faqData;