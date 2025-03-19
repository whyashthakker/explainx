import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';

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

  const serviceKeys = ['genai-marketing', 'llm-deployments', 'workflow-automation', 'vision-applications'] as const;
  type ServiceKey = (typeof serviceKeys)[number];
  
  const [activeService, setActiveService] = useState<ServiceKey>('genai-marketing');
  
  // Content for each service
  const serviceContent = {
    'genai-marketing': {
      title: 'Magical customer experiences',
      description: 'Allow your customers & audience to be part of a movie trailer with their favourite actor or create a custom lullaby for their kids. Create unique marketing experiences & content to maximise reach and engagement. This is a level of user personalisation never seen before.',
      image: '/api/placeholder/600/400',
      alt: 'GenAI Marketing Illustration'
    },
    'llm-deployments': {
      title: 'Custom LLM solutions',
      description: 'Deploy specialized language models tailored to your specific business needs. From customer service automation to content generation, our custom LLM deployments integrate seamlessly with your existing systems while maintaining the highest standards of security and performance.',
      image: '/api/placeholder/600/400',
      alt: 'Custom LLM Deployments Illustration'
    },
    'workflow-automation': {
      title: 'Streamlined processes',
      description: 'Transform your operations with intelligent workflow automation that learns and adapts to your business. Reduce manual tasks, eliminate bottlenecks, and free your team to focus on high-value activities that drive growth and innovation.',
      image: '/api/placeholder/600/400',
      alt: 'Workflow Automation Illustration'
    },
    'vision-applications': {
      title: 'Enhanced visual intelligence',
      description: 'Leverage the power of computer vision to extract insights from images and video. From quality control in manufacturing to customer behavior analysis in retail, our vision applications provide unprecedented levels of visual understanding and analytical capability.',
      image: '/api/placeholder/600/400',
      alt: 'Vision Applications Illustration'
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
          <div className="w-1 h-6 bg-yellow-400"></div>
          <h3 className="text-sm font-medium uppercase tracking-wider">WHAT WE DO</h3>
        </motion.div>
        
        {/* Headline with mixed styling */}
        <div className="mt-8">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal"
            initial={{ y: 20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We bring <span className="italic">AI, engineering &</span>
            <br />
            <span className="italic">content</span> expertise
          </motion.h2>
          
          {/* Description paragraph */}
          <motion.p 
            className="mt-6 text-muted-foreground max-w-lg"
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
              title="GenAI Marketing & Content"
              serviceId="genai-marketing"
              isActive={activeService === 'genai-marketing'}
              onClick={() => changeService('genai-marketing' as ServiceKey)}
              isVisible={isServicesListInView}
              index={0}
            />
            
            <ServiceItem 
              title="Custom LLM Deployments"
              serviceId="llm-deployments"
              isActive={activeService === 'llm-deployments'}
              onClick={() => changeService('llm-deployments')}
              isVisible={isServicesListInView}
              index={1}
            />
            
            <ServiceItem 
              title="Workflow Automation"
              serviceId="workflow-automation"
              isActive={activeService === 'workflow-automation'}
              onClick={() => changeService('workflow-automation')}
              isVisible={isServicesListInView}
              index={2}
            />
            
            <ServiceItem 
              title="Vision Applications"
              serviceId="vision-applications"
              isActive={activeService === 'vision-applications'}
              onClick={() => changeService('vision-applications')}
              isVisible={isServicesListInView}
              index={3}
            />
          </motion.div>
          
          {/* Right Column: Feature Image and Text */}
          <div ref={featureContentRef} className="lg:mt-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeService} 
                className="relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={isFeatureContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={serviceContent[activeService].image}
                  alt={serviceContent[activeService].alt}
                  className="w-full h-auto object-cover"
                />
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
                <h3 className="text-3xl md:text-4xl">
                  <span className="italic">{serviceContent[activeService].title.split(' ')[0]}</span> {serviceContent[activeService].title.split(' ').slice(1).join(' ')}
                </h3>
                
                <p className="mt-4 text-muted-foreground">
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
}

const ServiceItem = ({ title, serviceId, isActive = false, onClick, isVisible, index }: ServiceItemProps) => (
  <motion.button 
    onClick={onClick}
    className={cn(
      "group border-b pb-3 transition-all duration-300 text-left w-full",
      isActive ? "border-yellow-400" : "border-gray-200 dark:border-gray-800"
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
      <h3 className={cn(
        "text-xl md:text-2xl transition-all duration-300",
        isActive ? "font-medium" : "font-normal text-muted-foreground group-hover:text-foreground"
      )}>
        {title}
      </h3>
      
      <motion.div 
        className={cn(
          "w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-300",
          isActive 
            ? "bg-yellow-400 border-yellow-400" 
            : "border-gray-300 dark:border-gray-700 group-hover:border-yellow-400"
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
            isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
          )}
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </motion.svg>
      </motion.div>
    </div>
  </motion.button>
);