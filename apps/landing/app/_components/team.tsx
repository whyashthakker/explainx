'use client';

import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { motion } from 'framer-motion';
import { Bot, Zap, Users, DollarSign } from 'lucide-react';
import { cn } from "@repo/ui/lib/utils";

type TeamMemberProps = {
  name: string;
  role: string;
  imageUrl?: string;
  gender: 'male' | 'female';
  isFounder?: boolean;
  expertise?: string[];
};

// Updated team members data
const teamMembers = [
  {
    name: "Yash Thakker",
    role: "CEO & Product Lead",
    gender: "male",
    isFounder: true,
    expertise: ["AI Strategy", "Product Development", "Enterprise Solutions"] as string[]
  },
  {
    name: "Geeta Thakker",
    role: "CMO & Operations",
    gender: "female",
    isFounder: true,
    expertise: ["AI Operations", "Business Strategy", "Team Management"] as string[]
  },
  {
    name: "Aryan Nagbanshi",
    role: "Development",
    gender: "male",
    expertise: ["Machine Learning", "AI Architecture", "Backend Systems"] as string[]
  },
  {
    name: "Pratham Ware",
    role: "Marketing",
    gender: "male",
    expertise: ["AI Marketing", "Content Strategy", "Growth"] as string[]
  },
  {
    name: "Shri Jadhav",
    role: "AI Solutions Expert",
    gender: "female",
    expertise: ["Client Solutions", "AI Integration", "Support"] as string[]
  },
  {
    name: "Yogesh Gaikwad",
    role: "Content",
    gender: "male",
    expertise: ["AI Content", "Video Production", "Creative Direction"] as string[]
  }
] as const;

export function TeamMember({ name, role, imageUrl, gender, isFounder, expertise = [] }: TeamMemberProps) {
  const avatarUrl = imageUrl || 
    `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}` +
    `&hair=${gender === 'female' ? 'long' : 'short'}` +
    `&skinColor=variant0${Math.floor(Math.random() * 3) + 1}` +
    `&backgroundColor=blue`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "backdrop-blur-sm",
        isFounder ? "border-blue-200 bg-blue-50/50" : "bg-white/50"
      )}>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 ring-2 ring-offset-2 ring-blue-500/10">
              <AvatarImage 
                src={avatarUrl}
                alt={name}
              />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-center space-y-2">
              <h3 className="font-cal text-lg font-medium">{name}</h3>
              <p className="text-sm text-blue-600 font-medium">{role}</p>
              {expertise.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-cal text-4xl mb-4">Meet the AI Pioneers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of experts combines deep AI expertise with industry knowledge to 
            revolutionize workforce automation and enterprise solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Mission() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-blue-600" />,
      title: "AI-First Approach",
      description: "Building enterprise-grade AI agents that transform how businesses operate"
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Workforce Evolution",
      description: "Pioneering the shift from traditional employment to AI-powered solutions"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Human-AI Synergy",
      description: "Creating seamless integration between human expertise and AI capabilities"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-blue-600" />,
      title: "Cost Innovation",
      description: "Delivering enterprise-grade solutions at a fraction of traditional costs"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-cal text-center text-3xl font-medium leading-8 tracking-tight text-gray-900 sm:text-4xl mb-12">
            Revolutionizing Enterprise Workforce
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-blue-50/50 backdrop-blur-sm"
              >
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}