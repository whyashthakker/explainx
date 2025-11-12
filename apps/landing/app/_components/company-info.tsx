import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from "@repo/ui/lib/utils";

const clients = [
  "Adobe", "PWC", "Tata Group", "PayPal", "Bajaj Allianz", "Marsh McLennan", 
  "Udemy", "Coursera", "Codecademy", "Starweaver", "MLT Digital UK"
];

export default function CompanyInfoSection() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2 
  });

  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, {
    once: true,
    amount: 0.3
  });

  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, {
    once: true,
    amount: 0.2
  });

  const clientsRef = useRef(null);
  const isClientsInView = useInView(clientsRef, {
    once: true,
    amount: 0.2
  });

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]"
      id="about"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16" ref={headerRef}>
          <motion.div 
            className="flex items-center gap-3 mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={isHeaderInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1 h-6 bg-secondaccent"></div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-white dark:text-white">ABOUT AISOLO</h3>
          </motion.div>
          
          <div className="mt-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal text-black dark:text-white font-cal"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Quality work over <span className=" ">surface</span>
              <br />
              <span className=" ">level</span> solutions
            </motion.h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: What We Build */}
          <motion.div 
            ref={contentRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
              What We Build
            </h3>
            <div className="space-y-6">
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-secondaccent mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong className="text-black dark:text-white">AI agents for automation</strong> - Intelligent systems that streamline business processes
                </p>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-2 h-2 rounded-full bg-secondaccent mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong className="text-black dark:text-white">Training & education services</strong> - Comprehensive AI learning programs
                </p>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-2 h-2 rounded-full bg-secondaccent mt-2 flex-shrink-0"></div>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong className="text-black dark:text-white">SaaS platforms</strong> - Currently building Infloq and Olly.social
                </p>
              </motion.div>
            </div>

            <motion.div 
              className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-gray-600 dark:text-gray-400 italic">
                "Our priority is to do quality work rather than surface level work. 
                We focus on creating solutions that genuinely solve problems and drive real value."
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Client Portfolio */}
          <motion.div 
            ref={clientsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isClientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
              Trusted By Industry Leaders
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We've worked with top companies around the world, delivering AI solutions that scale:
            </p>
            
            {/* Client Grid */}
            <div className="grid grid-cols-2 gap-4">
              {clients.map((client, index) => (
                <motion.div
                  key={client}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/30 hover:border-secondaccent transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isClientsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium text-black dark:text-white">{client}</span>
                </motion.div>
              ))}
            </div>

            {/* Additional Stats */}
            <motion.div 
              className="mt-8 p-6 bg-secondaccent/10 dark:bg-secondaccent/20 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isClientsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-secondaccent mb-2">5,000+</div>
                <p className="text-gray-600 dark:text-gray-400">
                  businesses served via our SaaS platform <strong>Olly Social</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}