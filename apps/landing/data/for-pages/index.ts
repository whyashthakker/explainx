export interface InfluencerPageData {
    slug: string;
    metadata: {
      title: string;
      description: string;
      keywords?: string[]; 
      alternates?: {
        canonical?: string;
        openGraph?: {
          type: string;
          images: string[];
        };
      };
    };
    heading?: {
      title: string;
      subtitle: string;
      image?: string;
    };
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
      link?: string;
    }>;
    benefits?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
    stats?: Array<{
      value: string;
      label: string;
      description?: string;
    }>;
    testimonials?: Array<{
      quote: string;
      author: string;
      role: string;
      avatar?: string;
    }>;
    faq?: Array<{
      question: string;
      answer: string;
    }>;
    cta?: {
      title: string;
      description: string;
      primaryButton: {
        text: string;
        link: string;
      };
      secondaryButton?: {
        text: string;
        link: string;
      };
    };
    resources?: Array<{
      title: string;
      description: string;
      link: string;
      type: 'guide' | 'video' | 'webinar' | 'tool';
    }>;
  }
  
  export const influencerPagesData: InfluencerPageData[] = [
      {
        slug: "custom-ai-agents",
        metadata: {
          title: "Custom AI Agent Development | Enterprise Solutions | ExplainX",
          description: "Build powerful, customized AI agents for your business needs. Our expert team develops tailored AI solutions that automate tasks and enhance productivity.",
          keywords: ["custom ai agents", "ai development", "enterprise ai", "automated agents", "ai solutions"],
          alternates: {
            canonical: "/custom-ai-agents",
            openGraph: {
              type: "website",
              images: ["/images/services/ai-agents.jpg"]
            }
          }
        },
        heading: {
          title: "Custom AI Agent Development",
          subtitle: "Build intelligent AI agents tailored to your business needs",
          image: "/images/services/ai-agents-hero.jpg"
        },
        features: [
          {
            title: "Tailored Development",
            description: "Custom-built AI agents designed specifically for your business processes and requirements.",
            icon: "Code",
            link: "/tools"
          },
          {
            title: "Integration Support",
            description: "Seamless integration with your existing systems and workflows for maximum efficiency.",
            icon: "Connection",
            link: "/tools"
          },
          {
            title: "Scalable Architecture",
            description: "Built on robust, scalable architecture to grow with your business needs.",
            icon: "Scale",
            link: "/tools"
          },
          {
            title: "Continuous Optimization",
            description: "Regular performance monitoring and optimization to ensure peak efficiency.",
            icon: "Gauge",
            link: "/tools"
          }
        ],
        benefits: [
          {
            title: "Enhanced Productivity",
            description: "Automate repetitive tasks and streamline workflows with intelligent AI agents.",
            icon: "Rocket"
          },
          {
            title: "Cost Efficiency",
            description: "Reduce operational costs through intelligent automation and optimization.",
            icon: "Wallet"
          },
          {
            title: "24/7 Operation",
            description: "AI agents work round the clock, ensuring continuous business operations.",
            icon: "Clock"
          },
          {
            title: "Data-Driven Insights",
            description: "Gain valuable insights from AI agent operations and performance metrics.",
            icon: "ChartBar"
          }
        ],
        stats: [
          {
            value: "98%",
            label: "Task Accuracy",
            description: "High-precision AI agent performance"
          },
          {
            value: "60%",
            label: "Cost Reduction",
            description: "Average operational cost savings"
          },
          {
            value: "24/7",
            label: "Availability",
            description: "Round-the-clock operation"
          }
        ],
        faq: [
          {
            question: "How long does it take to develop a custom AI agent?",
            answer: "Development timeline varies based on complexity, typically ranging from 4-12 weeks for initial deployment."
          },
          {
            question: "Can AI agents integrate with our existing systems?",
            answer: "Yes, our AI agents are designed to integrate seamlessly with your existing infrastructure and workflows."
          },
          {
            question: "What kind of support do you provide post-deployment?",
            answer: "We offer comprehensive support including monitoring, maintenance, updates, and performance optimization."
          },
          {
            question: "How secure are your AI agents?",
            answer: "Security is paramount. We implement enterprise-grade security measures and follow industry best practices."
          }
        ],
        cta: {
          title: "Ready to Build Your Custom AI Agent?",
          description: "Transform your business operations with intelligent automation",
          primaryButton: {
            text: "Get Started",
            link: "/"
          },
          secondaryButton: {
            text: "Schedule Demo",
            link: "/"
          }
        }
      },
      
      {
        slug: "ai-agents-training",
        metadata: {
          title: "AI Agent Training | Expert Training Services | ExplainX",
          description: "Expert training services for AI agents. Optimize performance and enhance capabilities through our comprehensive training programs.",
          keywords: ["ai training", "agent optimization", "ai performance", "machine learning training"],
          alternates: {
            canonical: "/ai-agents-training",
            openGraph: {
              type: "website",
              images: ["/images/services/ai-training.jpg"]
            }
          }
        },
        heading: {
          title: "AI Agent Training Services",
          subtitle: "Optimize your AI agents for peak performance",
          image: "/images/services/ai-training-hero.jpg"
        },
        features: [
          {
            title: "Custom Training Programs",
            description: "Tailored training programs designed for your specific AI agents and use cases.",
            icon: "GraduationCap",
            link: "/tools"
          },
          {
            title: "Performance Optimization",
            description: "Fine-tune your AI agents for improved accuracy and efficiency.",
            icon: "Sliders",
            link: "/tools"
          },
          {
            title: "Behavioral Training",
            description: "Train AI agents to handle complex scenarios and edge cases effectively.",
            icon: "Brain",
            link: "/tools"
          },
          {
            title: "Continuous Learning",
            description: "Implement ongoing learning mechanisms for constant improvement.",
            icon: "RefreshCw",
            link: "/tools"
          }
        ],
        benefits: [
          {
            title: "Improved Accuracy",
            description: "Enhance agent performance through specialized training techniques.",
            icon: "Target"
          },
          {
            title: "Faster Response Times",
            description: "Optimize processing speed and response generation.",
            icon: "Zap"
          },
          {
            title: "Better Adaptability",
            description: "Train agents to handle new situations and requirements effectively.",
            icon: "Settings"
          },
          {
            title: "Quality Assurance",
            description: "Comprehensive testing and validation of trained behaviors.",
            icon: "Shield"
          }
        ],
        stats: [
          {
            value: "95%",
            label: "Training Success",
            description: "High success rate in training objectives"
          },
          {
            value: "40%",
            label: "Performance Boost",
            description: "Average improvement after training"
          },
          {
            value: "99.9%",
            label: "Reliability",
            description: "Post-training operational reliability"
          }
        ],
        faq: [
          {
            question: "How long does the training process take?",
            answer: "Training duration varies based on complexity and objectives, typically ranging from 2-8 weeks."
          },
          {
            question: "Can existing AI agents be retrained?",
            answer: "Yes, we can retrain and optimize existing AI agents to improve their performance and capabilities."
          },
          {
            question: "What metrics are used to measure training success?",
            answer: "We track accuracy, response time, task completion rate, and other custom metrics based on your requirements."
          },
          {
            question: "Is ongoing training necessary?",
            answer: "Regular training updates help maintain optimal performance and adapt to new requirements or scenarios."
          }
        ],
        cta: {
          title: "Enhance Your AI Agent Performance",
          description: "Start optimizing your AI agents today",
          primaryButton: {
            text: "Start Training",
            link: "/"
          },
          secondaryButton: {
            text: "Learn More",
            link: "/"
          }
        }
      },
    
      {
        slug: "generative-ai-training",
        metadata: {
          title: "Generative AI Training | Advanced AI Solutions | ExplainX",
          description: "Master generative AI technologies with our comprehensive training programs. Learn to leverage AI for content creation, design, and more.",
          keywords: ["generative ai", "ai training", "machine learning", "ai development", "content generation"],
          alternates: {
            canonical: "/generative-ai-training",
            openGraph: {
              type: "website",
              images: ["/images/services/gen-ai-training.jpg"]
            }
          }
        },
        heading: {
          title: "Generative AI Training",
          subtitle: "Master the future of AI-powered content creation",
          image: "/images/services/gen-ai-hero.jpg"
        },
        features: [
          {
            title: "Comprehensive Curriculum",
            description: "Learn all aspects of generative AI, from basics to advanced applications.",
            icon: "Book",
            link: "/tools"
          },
          {
            title: "Hands-on Projects",
            description: "Practice with real-world projects and applications.",
            icon: "CodeSquare",
            link: "/tools"
          },
          {
            title: "Expert Instruction",
            description: "Learn from industry experts with practical experience.",
            icon: "Users",
            link: "/tools"
          },
          {
            title: "Latest Technologies",
            description: "Stay updated with cutting-edge generative AI developments.",
            icon: "Sparkles",
            link: "/tools"
          }
        ],
        benefits: [
          {
            title: "Practical Skills",
            description: "Gain hands-on experience with popular generative AI tools and frameworks.",
            icon: "Tool"
          },
          {
            title: "Industry Expertise",
            description: "Learn best practices and industry standards for AI implementation.",
            icon: "Award"
          },
          {
            title: "Career Growth",
            description: "Enhance your professional capabilities in AI development.",
            icon: "TrendingUp"
          },
          {
            title: "Certification",
            description: "Earn recognized certification upon course completion.",
            icon: "Certificate"
          }
        ],
        stats: [
          {
            value: "1000+",
            label: "Trained Professionals",
            description: "Successful course completions"
          },
          {
            value: "95%",
            label: "Satisfaction Rate",
            description: "From course participants"
          },
          {
            value: "40+",
            label: "Course Modules",
            description: "Comprehensive curriculum"
          }
        ],
        faq: [
          {
            question: "Who should take this training?",
            answer: "This training is ideal for developers, data scientists, and professionals interested in generative AI technologies."
          },
          {
            question: "What prerequisites are required?",
            answer: "Basic programming knowledge and understanding of machine learning concepts is recommended."
          },
          {
            question: "How long is the training program?",
            answer: "The complete program spans 12 weeks, with flexible learning options available."
          },
          {
            question: "Is certification provided?",
            answer: "Yes, you'll receive a certification upon successful completion of the program."
          }
        ],
        cta: {
          title: "Start Your AI Journey Today",
          description: "Join our comprehensive generative AI training program",
          primaryButton: {
            text: "Enroll Now",
            link: "/"
          },
          secondaryButton: {
            text: "View Curriculum",
            link: "/"
          }
        }
      },
    
      {
        slug: "frontend-development",
        metadata: {
          title: "Frontend Development Services | Modern Web Solutions | ExplainX",
          description: "Expert frontend development services for modern web applications. Build responsive, scalable, and user-friendly interfaces.",
          keywords: ["frontend development", "web development", "UI design", "React", "Next.js"],
          alternates: {
            canonical: "/frontend-development",
            openGraph: {
              type: "website",
              images: ["/images/services/frontend-dev.jpg"]
            }
          }
        },
        heading: {
          title: "Frontend Development",
          subtitle: "Create exceptional user experiences with modern web technologies",
          image: "/images/services/frontend-hero.jpg"
        },
        features: [
          {
            title: "Modern Technologies",
            description: "Development using latest frameworks like React, Next.js, and more.",
            icon: "Code2",
            link: "/tools"
          },
          {
            title: "Responsive Design",
            description: "Mobile-first approach ensuring perfect display across all devices.",
            icon: "Smartphone",
            link: "/tools"
          },
          {
            title: "Performance Optimization",
            description: "Fast-loading pages with optimal performance metrics.",
            icon: "Zap",
            link: "/tools"
          },
          {
            title: "UI/UX Excellence",
            description: "Beautiful, intuitive interfaces following best design practices.",
            icon: "Layout",
            link: "/tools"
          }
        ],
        benefits: [
          {
            title: "Fast Loading",
            description: "Optimized performance for quick page loads and smooth interactions.",
            icon: "Gauge"
          },
          {
            title: "SEO Friendly",
            description: "Built with best practices for search engine optimization.",
            icon: "Search"
          },
          {
            title: "Accessibility",
            description: "WCAG compliant development for all users.",
            icon: "Accessibility"
          },
          {
            title: "Scalable Code",
            description: "Clean, maintainable code architecture.",
            icon: "Code"
          }
        ],
        stats: [
          {
            value: "100+",
            label: "Projects Completed",
            description: "Successful project deliveries"
          },
          {
            value: "99%",
            label: "Client Satisfaction",
            description: "From project stakeholders"
          },
          {
            value: "<1s",
            label: "Load Time",
            description: "Average page load speed"
          }
        ],
        faq: [
          {
            question: "What technologies do you use?",
            answer: "We primarily work with React, Next.js, TypeScript, and modern CSS frameworks like Tailwind."
          },
          {
            question: "How long does a typical project take?",
            answer: "Project timeline varies based on scope, typically ranging from 4-12 weeks."
          },
          {
            question: "Do you provide ongoing maintenance?",
            answer: "Yes, we offer maintenance and support packages to keep your application up-to-date."
          },
          {
            question: "How do you ensure quality?",
            answer: "We follow strict coding standards, perform thorough testing, and implement CI/CD practices."
          }
        ],
        cta: {
          title: "Ready to Build Your Next Web Project?",
          description: "Create exceptional user experiences with our expert team",
          primaryButton: {
            text: "Start Project",
            link: "/"
          },
          secondaryButton: {
            text: "View Portfolio",
            link: "/"
          }
        }
      },
    
      {
        slug: "consulting-services-generative-ai",
        metadata: {
          title: "AI Consulting Services | Strategic AI Solutions | ExplainX",
          description: "Expert AI consulting services to help businesses leverage artificial intelligence effectively. Strategic guidance for AI implementation and optimization.",
          keywords: ["ai consulting", "ai strategy", "technology consulting", "digital transformation", "ai implementation"],
          alternates: {
            canonical: "/consulting-services-generative-ai",
            openGraph: {
              type: "website",
              images: ["/images/services/ai-consulting.jpg"]
            }
          }
        },
        heading: {
          title: "AI Consulting Services",
          subtitle: "Strategic guidance for successful AI implementation",
          image: "/images/services/ai-consulting-hero.jpg"
        },
        features: [
          {
            title: "Strategic Planning",
            description: "Develop comprehensive AI implementation strategies aligned with business goals.",
            icon: "Strategy",
            link: "/tools"
          },
          {
            title: "Technology Assessment",
            description: "Evaluate and recommend optimal AI solutions for your specific needs.",
            icon: "Scanner",
            link: "/tools"
          },
          {
            title: "Implementation Guidance",
            description: "Expert support throughout the AI adoption and deployment process.",
            icon: "Compass",
            link: "/tools"
          },
          {
            title: "ROI Optimization",
            description: "Maximize return on AI investments through strategic optimization.",
            icon: "TrendingUp",
            link: "/tools"
          }
        ],
        benefits: [
          {
            title: "Expert Guidance",
            description: "Access to experienced AI consultants and industry specialists.",
            icon: "Users"
          },
          {
            title: "Risk Mitigation",
            description: "Identify and address potential challenges before they arise.",
            icon: "Shield"
          },
          {
            title: "Competitive Edge",
            description: "Stay ahead with cutting-edge AI strategies and solutions.",
            icon: "Award"
          },
          {
            title: "Knowledge Transfer",
            description: "Build internal expertise through comprehensive knowledge sharing.",
            icon: "GraduationCap"
          }
        ],
        stats: [
          {
            value: "200+",
            label: "Projects Completed",
            description: "Successful AI implementations"
          },
          {
            value: "45%",
            label: "Average ROI",
            description: "Client return on AI investment"
          },
          {
            value: "90%",
            label: "Success Rate",
            description: "In achieving client objectives"
          }
        ],
        faq: [
          {
            question: "How do you approach AI consulting projects?",
            answer: "We begin with a thorough assessment of your current state, business goals, and challenges. Then we develop a customized roadmap for AI implementation."
          },
          {
            question: "What industries do you serve?",
            answer: "We work across various industries including healthcare, finance, retail, manufacturing, and technology sectors."
          },
          {
            question: "How long does a typical consulting engagement last?",
            answer: "Engagement length varies based on scope and complexity, typically ranging from 3-12 months for comprehensive implementations."
          },
          {
            question: "What deliverables can we expect?",
            answer: "Deliverables include strategic roadmaps, technical specifications, implementation plans, ROI analyses, and training materials."
          }
        ],
        cta: {
          title: "Transform Your Business with AI",
          description: "Get expert guidance for your AI journey",
          primaryButton: {
            text: "Schedule Consultation",
            link: "/"
          },
          secondaryButton: {
            text: "Learn More",
            link: "/"
          }
        }
      }
  ];