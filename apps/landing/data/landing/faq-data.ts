export type FAQCategory = {
    title: string;
    questions: {
      question: string;
      answer: string;
    }[];
  };
  
  export const faqData: FAQCategory[] = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "Who is ExplainX for?",
          answer: "ExplainX is designed for solopreneurs, indie makers, small businesses, and growing brands who want enterprise-grade influencer marketing capabilities at an affordable price. Our AI-powered platform makes professional influencer marketing accessible to everyone, whether you're just starting out or scaling your campaigns."
        },
        {
          question: "How do I get started with ExplainX?",
          answer: "Getting started is simple: Sign up at explainx.ai, choose your plan (including our free tier), and start discovering creators. Our AI will immediately match you with relevant creators based on your brand and goals. No complex onboarding or lengthy setup required."
        },
        {
          question: "What makes ExplainX different from other platforms?",
          answer: "ExplainX combines enterprise-level AI capabilities with affordable, performance-based pricing. Unlike traditional platforms, you only pay for actual results (clicks and conversions), making it perfect for businesses of all sizes. Our AI-powered matching and verification ensure you connect with authentic creators who align with your brand."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      questions: [
        {
          question: "How much does ExplainX cost?",
          answer: "ExplainX uses a pay-per-performance model starting at $500 for 5,000 credits. You only pay for actual engagement and results, with no monthly fees. Credits cost $0.10 each and never expire. Our platform fee is 30% of campaign spend, significantly lower than industry standards."
        },
        {
          question: "Do you offer a free trial?",
          answer: "Yes! We offer a starter plan that lets you explore our platform, use basic AI matching, and connect with up to 5 creators per month at no cost. This allows you to experience our platform before committing to a paid plan."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer: "Absolutely! Since we use a credit-based system, you can purchase credits as needed without any long-term commitments. Credits never expire, giving you complete flexibility to scale your campaigns at your own pace."
        }
      ]
    },
    {
      title: "Features & Capabilities",
      questions: [
        {
          question: "What features does ExplainX offer?",
          answer: "ExplainX provides AI-powered creator matching, performance tracking, automated campaign optimization, real-time analytics, and direct creator messaging. Our platform includes verification tools, ROI tracking, and easy integration with major social platforms and analytics tools."
        },
        {
          question: "Which social networks do you support?",
          answer: "We support all major social platforms including Instagram, TikTok, YouTube, Twitter/X, LinkedIn, Pinterest, and Twitch. Our AI-powered discovery works across platforms to find the best creators for your brand."
        },
        {
          question: "How does your AI matching work?",
          answer: "Our AI analyzes multiple factors including creator content, audience demographics, engagement rates, and past performance to match you with creators who are most likely to drive results for your brand. The system continuously learns and improves based on campaign performance."
        }
      ]
    },
    {
      title: "Campaign Management",
      questions: [
        {
          question: "How do I track campaign performance?",
          answer: "Our real-time analytics dashboard shows key metrics including clicks, conversions, ROI, and engagement rates. You can track performance at both the campaign and individual creator level, with detailed insights and AI-powered optimization suggestions."
        },
        {
          question: "How do creator payments work?",
          answer: "Creators are paid based on actual performance (clicks and conversions) through our automated payment system. You set your cost-per-click rate, and payments are processed automatically when performance thresholds are met."
        },
        {
          question: "Can I communicate directly with creators?",
          answer: "Yes, our platform includes built-in messaging features for direct communication with creators. You can discuss campaign details, share briefs, and manage relationships all within the platform."
        }
      ]
    },
    {
      title: "Support & Security",
      questions: [
        {
          question: "What kind of support do you offer?",
          answer: "We provide email support for all users, with priority support for Growth and Enterprise plans. Our knowledge base includes detailed guides, best practices, and campaign optimization tips. Enterprise clients get dedicated account managers."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take security seriously. Our platform uses enterprise-grade encryption, regular security audits, and complies with global data protection regulations. All creator verification and campaign data is stored securely."
        },
        {
          question: "Can I cancel my account anytime?",
          answer: "Yes, you can cancel your account at any time. Since we use a credit-based system, any unused credits remain valid and can be used later if you decide to return."
        }
      ]
    }
  ];