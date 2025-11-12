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
    'infloq-platform', 
    'olly-social', 
    'bgblur-tools'
  ] as const;
  type ServiceKey = (typeof serviceKeys)[number];
  
  const [activeService, setActiveService] = useState<ServiceKey>('infloq-platform');
  
  // Content for each service with Lucide icons
  const serviceContent = {
    'infloq-platform': {
      title: 'Infloq - Influencer Management',
      description: 'Complete influencer management platform streamlining creator discovery, campaign management, and performance analytics. Connect brands with the perfect creators for maximum ROI.',
      icon: Bot,
      iconSize: 30,
      alt: 'Infloq Influencer Management Platform'
    },
    'olly-social': {
      title: 'Olly Social - SMB Toolkit',
      description: 'Comprehensive social media toolkit designed for small and medium businesses. Automate posting, analyze performance, and grow your social presence with AI-powered insights.',
      icon: Briefcase,
      iconSize: 30,
      alt: 'Olly Social Media Toolkit'
    },
    'bgblur-tools': {
      title: 'BGBlur - Privacy Tools',
      description: 'Advanced privacy tools for content creators including AI background removal, blur effects, and privacy protection features. Keep your personal space private while creating professional content.',
      icon: Code,
      iconSize: 30,
      alt: 'BGBlur Privacy Tools for Creators'
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
          <h3 className="text-sm font-medium uppercase tracking-wider text-white dark:text-white">OUR TOOLS</h3>
        </motion.div>
        
        {/* Headline with mixed styling */}
        <div className="mt-8">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-black dark:text-white font-cal"
            initial={{ y: 20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className=" ">Tools</span> we've built for
            <br />
            <span className=" ">modern</span> businesses
          </motion.h2>
          
          {/* Description paragraph */}
          <motion.p 
            className="mt-6 text-gray-600 dark:text-gray-400 max-w-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Powerful SaaS tools serving 5,000+ businesses worldwide. From influencer 
            marketing to social media automation and privacy protection.
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
            <a href="https://infloq.com" target="_blank" rel="noopener noreferrer" className="block">
              <ServiceItem 
                title="Infloq.com"
                serviceId="infloq-platform"
                isActive={activeService === 'infloq-platform'}
                onClick={() => changeService('infloq-platform' as ServiceKey)}
                isVisible={isServicesListInView}
                index={0}
                icon={serviceContent['infloq-platform'].icon}
                iconSize={serviceContent['infloq-platform'].iconSize}
              />
            </a>
            
            <a href="https://olly.social" target="_blank" rel="noopener noreferrer" className="block">
              <ServiceItem 
                title="Olly.social"
                serviceId="olly-social"
                isActive={activeService === 'olly-social'}
                onClick={() => changeService('olly-social')}
                isVisible={isServicesListInView}
                index={1}
                icon={serviceContent['olly-social'].icon}
                iconSize={serviceContent['olly-social'].iconSize}
              />
            </a>
            
            <a href="https://bgblur.com" target="_blank" rel="noopener noreferrer" className="block">
              <ServiceItem 
                title="BGBlur.com"
                serviceId="bgblur-tools"
                isActive={activeService === 'bgblur-tools'}
                onClick={() => changeService('bgblur-tools')}
                isVisible={isServicesListInView}
                index={2}
                icon={serviceContent['bgblur-tools'].icon}
                iconSize={serviceContent['bgblur-tools'].iconSize}
              />
            </a>
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