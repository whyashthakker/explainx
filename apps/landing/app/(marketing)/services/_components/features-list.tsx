// app/features/_components/features-list.tsx
import {
  Code,
  Brain,
  Rocket,
  Settings,
  BarChart2,
  Database,
  Users,
  Globe,
  MessageCircle,
  Sparkles,
  Sliders,
  Shield,
  BookOpen,
  Target,
} from "lucide-react";
import { FeaturesWithImage } from "../../../_components/features";

const featureCategories = [
  {
    title: "Custom AI Development",
    subtitle: "Tailored AI Solutions",
    description: "Build powerful, customized AI agents designed specifically for your business processes and requirements.",
    image: "/services/custom-ai-development.png",
    imageSide: "right" as const,
    features: [
      {
        name: "Tailored Development",
        description: "Custom-built AI agents designed specifically for your unique business processes.",
        icon: Code,
      },
      {
        name: "Scalable Architecture",
        description: "Built on robust infrastructure that grows with your business needs.",
        icon: Database,
      },
      {
        name: "Integration Support",
        description: "Seamless integration with your existing systems and workflows.",
        icon: Settings,
      },
    ],
  },
  {
    title: "AI Agent Training",
    subtitle: "Performance Optimization",
    description: "Optimize your AI agents for peak performance through comprehensive training programs.",
    image: "/services/ai-training.png",
    imageSide: "left" as const,
    features: [
      {
        name: "Custom Training Programs",
        description: "Specialized training programs designed for your specific AI agents and use cases.",
        icon: Brain,
      },
      {
        name: "Performance Optimization",
        description: "Fine-tune your AI agents for improved accuracy and efficiency.",
        icon: Sliders,
      },
      {
        name: "Continuous Learning",
        description: "Implement ongoing learning mechanisms for constant improvement.",
        icon: Target,
      },
    ],
  },
  {
    title: "Generative AI Solutions",
    subtitle: "Advanced AI Technologies",
    description: "Master the future of AI-powered content creation and automation with cutting-edge generative AI.",
    image: "/services/generative-ai.png",
    imageSide: "right" as const,
    features: [
      {
        name: "Comprehensive Training",
        description: "Learn all aspects of generative AI from basics to advanced applications.",
        icon: BookOpen,
      },
      {
        name: "Practical Implementation",
        description: "Hands-on experience with real-world projects and applications.",
        icon: Sparkles,
      },
      {
        name: "Expert Guidance",
        description: "Learn from industry experts with practical experience.",
        icon: Users,
      },
    ],
  },
  {
    title: "AI Consulting Services",
    subtitle: "Strategic AI Implementation",
    description: "Get expert guidance for successful AI implementation and optimization in your business.",
    image: "/services/ai-consulting.png",
    imageSide: "left" as const,
    features: [
      {
        name: "Strategic Planning",
        description: "Develop comprehensive AI implementation strategies aligned with business goals.",
        icon: BarChart2,
      },
      {
        name: "Risk Mitigation",
        description: "Identify and address potential challenges before they arise.",
        icon: Shield,
      },
      {
        name: "Global Support",
        description: "Access worldwide expertise and support for your AI initiatives.",
        icon: Globe,
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