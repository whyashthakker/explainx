export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What exactly are AI agents?",
    answer: "AI agents are autonomous software programs powered by advanced AI models that can perform tasks traditionally done by human employees. They can work 24/7, handle multiple tasks simultaneously, and scale instantly based on demand.",
    category: "Basics"
  },
  {
    question: "How do AI agents compare to human employees?",
    answer: "AI agents offer several advantages: they work continuously without breaks, can be instantly scaled up or down, cost significantly less than human employees, and maintain consistent performance levels. They're ideal for repetitive tasks, data processing, and customer service.",
    category: "Comparison"
  },
  {
    question: "What tasks can AI agents handle?",
    answer: "AI agents can handle a wide range of tasks including customer support, data entry, report generation, content moderation, appointment scheduling, lead qualification, basic accounting, and many administrative functions. They're particularly effective at tasks that follow clear patterns or rules.",
    category: "Capabilities"
  },
  {
    question: "How much can I save by switching to AI agents?",
    answer: "Most businesses see 60-80% cost reduction when replacing traditional employees with AI agents. The exact savings depend on your current workforce costs and the types of tasks being automated. Use our ROI calculator to get a personalized estimate.",
    category: "Cost"
  },
  {
    question: "How quickly can I deploy AI agents?",
    answer: "AI agents can be deployed within 24-48 hours for standard use cases. Custom configurations may take 3-5 business days. This is significantly faster than the weeks or months typically required for hiring and training human employees.",
    category: "Implementation"
  },
  {
    question: "Is there a limit to how many AI agents I can deploy?",
    answer: "No, there's no practical limit to the number of AI agents you can deploy. You can instantly scale from one to hundreds of agents based on your needs, with each agent capable of handling multiple tasks simultaneously.",
    category: "Scaling"
  },
  {
    question: "How secure are AI agents?",
    answer: "Our AI agents operate within strict security protocols, with end-to-end encryption and compliance with major security standards including SOC 2, GDPR, and HIPAA. They can only access the data and systems you explicitly authorize.",
    category: "Security"
  },
  {
    question: "Can AI agents learn and improve over time?",
    answer: "Yes, our AI agents continuously learn from interactions and feedback, improving their performance over time. They can adapt to your specific business processes and requirements through our adaptive learning system.",
    category: "Technology"
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide 24/7 technical support, detailed documentation, and dedicated implementation specialists. Enterprise clients get access to a dedicated success manager and priority support channels.",
    category: "Support"
  },
  {
    question: "How do you handle data privacy?",
    answer: "We maintain strict data privacy standards with encryption at rest and in transit. All data processing follows GDPR, CCPA, and other relevant privacy regulations. You retain full ownership and control of your data.",
    category: "Security"
  },
  {
    question: "What's your pricing model?",
    answer: "We use a usage-based pricing model where you only pay for the actual processing time and resources used by your AI agents. This typically results in 60-80% cost savings compared to traditional employment costs.",
    category: "Pricing"
  },
  {
    question: "Can AI agents work with my existing systems?",
    answer: "Yes, our AI agents integrate with most major business systems including CRM, ERP, helpdesk, and communication platforms. We provide APIs and pre-built integrations for seamless connectivity.",
    category: "Integration"
  },
  {
    question: "How do I monitor AI agent performance?",
    answer: "Our dashboard provides real-time monitoring of all AI agents, including performance metrics, task completion rates, quality scores, and resource utilization. You can set custom KPIs and receive automated alerts.",
    category: "Monitoring"
  },
  {
    question: "What happens if an AI agent makes a mistake?",
    answer: "AI agents have built-in error detection and correction mechanisms. For critical tasks, you can set up human oversight workflows. Our support team is available 24/7 to handle any issues that may arise.",
    category: "Operations"
  },
  {
    question: "Can I customize AI agent behavior?",
    answer: "Yes, AI agents can be customized to follow your specific business rules, communication style, and operational procedures. You can set custom parameters, decision rules, and response templates.",
    category: "Customization"
  },
  {
    question: "Is there a trial period available?",
    answer: "Yes, we offer a 14-day trial period where you can test AI agents with your actual business processes. This includes full access to all features and dedicated support for implementation.",
    category: "Getting Started"
  },
  {
    question: "How do I get started?",
    answer: "Schedule a demo through our website, and our team will assess your needs and recommend the best AI agent configuration for your business. We'll guide you through the entire implementation process.",
    category: "Getting Started"
  },
  {
    question: "What kind of training is required?",
    answer: "Minimal training is required for managing AI agents. We provide comprehensive documentation, video tutorials, and hands-on training sessions to help you get the most out of the platform.",
    category: "Implementation"
  },
  {
    question: "Can AI agents handle complex decision-making?",
    answer: "AI agents can handle complex decisions within defined parameters and rules. For decisions requiring human judgment, they can escalate to human supervisors while handling all preparatory work.",
    category: "Capabilities"
  },
  {
    question: "What are the maintenance requirements?",
    answer: "AI agents require minimal maintenance. Our system handles all updates and optimizations automatically. You only need to review performance metrics and adjust business rules as needed.",
    category: "Operations"
  }
];

export default faqData;