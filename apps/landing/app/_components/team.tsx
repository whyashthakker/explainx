import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from "@repo/ui/lib/utils";

// Define the member type for better type safety
type Member = {
  name: string;
  role: string;
  avatar: string;
  expertise: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
};

// Reordered members in alphabetical order by first name
const members: Member[] = [
  {
    name: 'Aryan Nagbanshi',
    role: 'Development',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['Machine Learning', 'AI Architecture', 'Backend Systems'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Geeta Thakker',
    role: 'CMO & Operations',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['AI Operations', 'Business Strategy', 'Team Management'],
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Paresh Bhamare',
    role: 'Development',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['Machine Learning', 'AI Architecture', 'Backend Systems'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Pratham Ware',
    role: 'Marketing',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['AI Marketing', 'Content Strategy', 'Growth'],
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Rahul Santra',
    role: 'Development',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['Machine Learning', 'AI Architecture', 'Backend Systems'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Shriparna Jadhav',
    role: 'AI Solutions Expert',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['Client Solutions', 'AI Integration', 'Support'],
    social: {
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Yash Thakker',
    role: 'CEO & Product Lead',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['AI Strategy', 'Product Development', 'Enterprise Solutions'],
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Yogesh Gaikwad',
    role: 'Content',
    avatar: 'https://github.com/shadcn.png',
    expertise: ['AI Content', 'Video Production', 'Creative Direction'],
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
];

export default function TeamSection() {
  // Create refs for each section to track when they're in view
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const teamSectionRef = useRef(null);
  const isTeamSectionInView = useInView(teamSectionRef, { once: true, amount: 0.2 });

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header with Yellow Accent */}
        <div className="mb-16" ref={headerRef}>
          <motion.div 
            className="flex items-center gap-3 mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={isHeaderInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1 h-6 bg-secondaccent"></div>
            <h3 className="text-sm font-medium uppercase tracking-wider">OUR TEAM</h3>
          </motion.div>
          
          {/* Headline with mixed styling */}
          <div className="mt-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The <span className=" ">minds</span> behind
              <br />
              our <span className=" ">innovation</span>
            </motion.h2>
            
            {/* Description paragraph */}
            <motion.p 
              className="mt-6 text-muted-foreground max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our team of AI specialists brings together expertise across strategy, 
              development, and implementation to deliver exceptional solutions.
            </motion.p>
          </div>
        </div>

        {/* Team Members Section */}
        <motion.div
          ref={teamSectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isTeamSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {members.map((member, index) => (
              <MemberCard 
                key={index} 
                member={member} 
                index={index} 
                highlight={member.role.includes('CEO') || member.role.includes('CMO')}
                isVisible={isTeamSectionInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface MemberCardProps {
  member: Member;
  index: number;
  highlight?: boolean;
  isVisible: boolean;
}

function MemberCard({ member, index, highlight = false, isVisible }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="group"
    >
      <div className="relative mb-6 overflow-hidden rounded-xl w-[200px] h-[200px]">
        <div className={cn(
          "absolute w-[200px] h-[200px] z-10",
          "bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}></div>
        
        {/* Social Links that appear on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center gap-3 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {member.social?.twitter && (
            <a href={member.social.twitter} className="rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <Twitter className="h-4 w-4 text-white" />
            </a>
          )}
          {member.social?.linkedin && (
            <a href={member.social.linkedin} className="rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <Linkedin className="h-4 w-4 text-white" />
            </a>
          )}
          {member.social?.github && (
            <a href={member.social.github} className="rounded-full bg-white/10 p-2 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <Github className="h-4 w-4 text-white" />
            </a>
          )}
        </div>
        
        {/* Profile Image with Yellow Border for highlighted members */}
        <div className={cn(
          "w-[200px] h-[200px] overflow-hidden", // Fixed square dimensions
          highlight ? "ring-2 ring-secondaccent" : "ring-1 ring-gray-200 dark:ring-gray-800"
        )}>
          <img 
            src={member.avatar} 
            alt={member.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium">
          {member.name}
          {highlight && (
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-secondaccent"></span>
          )}
        </h4>
        
        <p className="text-secondaccent2 dark:text-secondaccent font-medium mt-1">
          {member.role}
        </p>
        
        <div className="mt-3 space-y-1">
          {member.expertise.map((exp, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-secondaccent"></span>
              {exp}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}