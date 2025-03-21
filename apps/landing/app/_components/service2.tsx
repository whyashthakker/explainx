import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';
import { Bot, BookOpen, Lightbulb, Code, Briefcase } from 'lucide-react';

export default function ServicesSection() {
  // Reference and InView hook for the entire section
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2 
  });

  // Reference and InView hook for the header
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    amount: 0.3
  });

  // Reference and InView hook for the services list
  const servicesListRef = useRef(null);
  const isServicesListInView = useInView(servicesListRef, {
    once: true,
    amount: 0.2
  });

  // Reference and InView hook for the feature content
  const featureContentRef = useRef(null);
  const isFeatureContentInView = useInView(featureContentRef, {
    once: true,
    amount: 0.2
  });

  const serviceKeys = [
    'custom-ai-agent-development', 
    'ai-agent-training', 
    'generative-ai-training', 
    'frontend-development', 
    'ai-consulting'
  ] as const;
  type ServiceKey = (typeof serviceKeys)[number];
  
  const [activeService, setActiveService] = useState<ServiceKey>('custom-ai-agent-development');
  
  // Content for each service with Lucide icons
  const serviceContent = {
    'custom-ai-agent-development': {
      title: 'Powerful Custom AI Solutions',
      description: 'Build sophisticated AI agents precisely tailored to your specific business needs. We leverage cutting-edge machine learning techniques to create intelligent systems that solve complex challenges and drive innovation.',
      icon: Bot,
      iconSize: 30,
      alt: 'Custom AI Agent Development Illustration'
    },
    'ai-agent-training': {
      title: 'Empowering AI Development Skills',
      description: 'Comprehensive training programs designed to equip your team with advanced AI development capabilities. Learn the latest techniques in AI agent creation, machine learning, and intelligent system design.',
      icon: BookOpen,
      iconSize: 30,
      alt: 'AI Agent Training Illustration'
    },
    'generative-ai-training': {
      title: 'Mastering Generative AI',
      description: 'In-depth training to help you understand and leverage generative AI technologies. From foundational concepts to advanced implementation strategies, gain the expertise to transform your business with AI.',
      icon: Lightbulb,
      iconSize: 30,
      alt: 'Generative AI Training Illustration'
    },
    'frontend-development': {
      title: 'Intuitive AI Interfaces',
      description: 'Design and develop user-friendly interfaces that make complex AI technologies accessible and engaging. We create seamless, intuitive front-end solutions that enhance user interaction with AI-powered systems.',
      icon: Code,
      iconSize: 30,
      alt: 'Frontend Development for AI Illustration'
    },
    'ai-consulting': {
      title: 'Strategic AI Guidance',
      description: 'Expert consulting to help you navigate the complex landscape of AI implementation. We provide strategic insights, assessment, and roadmapping to ensure your AI initiatives align with your business goals.',
      icon: Briefcase,
      iconSize: 30,
      alt: 'AI Consulting Illustration'
    }
  };
  
  // Handle service change with animation
  const changeService = (serviceId: ServiceKey) => {
    setActiveService(serviceId);
  }
  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]"
      id="services"
    >
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
          <h3 className="text-sm font-medium uppercase tracking-wider text-white dark:text-white">OUR SERVICES</h3>
        </motion.div>
        
        {/* Headline with mixed styling */}
        <div className="mt-8">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-black dark:text-white font-cal"
            initial={{ y: 20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We bring <span className=" ">AI, engineering &</span>
            <br />
            <span className=" ">content</span> expertise
          </motion.h2>
          
          {/* Description paragraph */}
          <motion.p 
            className="mt-6 text-gray-600 dark:text-gray-400 max-w-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Each problem is looked at from a fresh lens to provide you with a 
            solution that solves your specific requirements and integrates with 
            your existing infrastructure
          </motion.p>
        </div>
          
      
        </div>
        
        {/* Services List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
          {/* Left Column: Services List */}
          <motion.div 
            ref={servicesListRef}
            className="flex flex-col space-y-8"
            initial={{ opacity: 0 }}
            animate={isServicesListInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            <ServiceItem 
              title="Custom AI Agent Development"
              serviceId="custom-ai-agent-development"
              isActive={activeService === 'custom-ai-agent-development'}
              onClick={() => changeService('custom-ai-agent-development' as ServiceKey)}
              isVisible={isServicesListInView}
              index={0}
              icon={serviceContent['custom-ai-agent-development'].icon}
              iconSize={serviceContent['custom-ai-agent-development'].iconSize}
            />
            
            <ServiceItem 
              title="AI Agent Training"
              serviceId="ai-agent-training"
              isActive={activeService === 'ai-agent-training'}
              onClick={() => changeService('ai-agent-training')}
              isVisible={isServicesListInView}
              index={1}
              icon={serviceContent['ai-agent-training'].icon}
              iconSize={serviceContent['ai-agent-training'].iconSize}
            />
            
            <ServiceItem 
              title="Generative AI Training"
              serviceId="generative-ai-training"
              isActive={activeService === 'generative-ai-training'}
              onClick={() => changeService('generative-ai-training')}
              isVisible={isServicesListInView}
              index={2}
              icon={serviceContent['generative-ai-training'].icon}
              iconSize={serviceContent['generative-ai-training'].iconSize}
            />
            
            <ServiceItem 
              title="Frontend Development"
              serviceId="frontend-development"
              isActive={activeService === 'frontend-development'}
              onClick={() => changeService('frontend-development')}
              isVisible={isServicesListInView}
              index={3}
              icon={serviceContent['frontend-development'].icon}
              iconSize={serviceContent['frontend-development'].iconSize}
            />
            
            <ServiceItem 
              title="AI Consulting"
              serviceId="ai-consulting"
              isActive={activeService === 'ai-consulting'}
              onClick={() => changeService('ai-consulting')}
              isVisible={isServicesListInView}
              index={4}
              icon={serviceContent['ai-consulting'].icon}
              iconSize={serviceContent['ai-consulting'].iconSize}
            />
          </motion.div>
          
          {/* Right Column: Feature Icon and Text */}
          <div ref={featureContentRef} className="lg:mt-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeService} 
                className="relative overflow-hidden p-8 flex items-start justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isFeatureContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Render the appropriate Lucide icon */}
                {React.createElement(serviceContent[activeService].icon, {
                  size: 80,
                  className: "text-secondaccent"
                })}
              </motion.div>
            </AnimatePresence>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeService + "-content"} 
                className="mt-6"
                initial={{ opacity: 0, y: 15 }}
                animate={isFeatureContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-3xl md:text-4xl text-black dark:text-white">
                  <span className=" ">{serviceContent[activeService].title.split(' ')[0]}</span> {serviceContent[activeService].title.split(' ').slice(1).join(' ')}
                </h3>
                
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  {serviceContent[activeService].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceItemProps {
  title: string;
  serviceId: string;
  isActive?: boolean;
  onClick: () => void;
  isVisible: boolean;
  index: number;
  icon: React.ElementType;
  iconSize: number;
}

const ServiceItem = ({ title, serviceId, isActive = false, onClick, isVisible, index, icon, iconSize }: ServiceItemProps) => {
  // Dynamically create the icon component
  const IconComponent = icon;
  
  return (
    <motion.button 
      onClick={onClick}
      className={cn(
        "group border-b pb-3 transition-all duration-300 text-left w-full",
        isActive ? "border-secondaccent" : "border-gray-200 dark:border-gray-800"
      )}
      whileHover={{ 
        x: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Left-aligned icon */}
          <div className="mr-3">
            <IconComponent 
              size={iconSize} 
              className={cn(
                "transition-all duration-300",
                isActive ? "text-secondaccent" : "text-gray-600 dark:text-gray-400 group-hover:text-secondaccent"
              )} 
            />
          </div>
          
          {/* Title */}
          <h3 className={cn(
            "text-xl md:text-2xl transition-all duration-300",
            isActive 
              ? "font-medium text-black dark:text-white" 
              : "font-normal text-gray-600 dark:text-gray-400 group-hover:text-black group-hover:dark:text-white"
          )}>
            {title}
          </h3>
        </div>
        
        {/* Plus/minus indicator */}
        <motion.div 
          className={cn(
            "w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-300",
            isActive 
              ? "bg-secondaccent border-secondaccent" 
              : "border-gray-300 dark:border-gray-700 group-hover:border-secondaccent"
          )}
          animate={isActive ? { rotate: 90, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={cn(
              "transition-all duration-300",
              isActive ? "text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-black group-hover:dark:text-white"
            )}
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </motion.svg>
        </motion.div>
      </div>
    </motion.button>
  );
};