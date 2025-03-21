"use client";
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from "@repo/ui/components/ui/button";
import { ChevronDown } from 'lucide-react';
import FAQItem from '../../../_components/faq-items';

// Define FAQ data type
type FAQ = {
  question: string;
  answer: string;
};

export function PricingFAQ() {
  // State for expanded FAQ
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const initiallyShown = 4;
  
  // Refs for animations
  const headerRef = useRef(null);
  const faqListRef = useRef(null);
  const showMoreBtnRef = useRef(null);
  
  // Check if elements are in view
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  const isFaqListInView = useInView(faqListRef, { once: true, amount: 0.2 });
  const isShowMoreBtnInView = useInView(showMoreBtnRef, { once: true, amount: 0.5 });
  
  // FAQ data
  const faqData: FAQ[] = [ 
    {
      question: "How does the pay-per-performance model work?",
      answer: "You purchase platform credits and pay influencers based on their average view count. If content outperforms expectations, you're eligible for a refund of the difference. This ensures you only pay for actual performance."
    },
    {
      question: "What platforms are supported?",
      answer: "Different plans support different platforms. Free tier includes Instagram only, Starter adds LinkedIn, Growth tier includes major platforms (Instagram, LinkedIn, Twitter, Facebook, TikTok, YouTube), and Professional supports all platforms without limits."
    },
    {
      question: "How are influencers verified?",
      answer: "All influencers on our platform go through a verification process that checks their identity, engagement authenticity, and content quality. This ensures you're working with legitimate creators who can deliver real results."
    },
    {
      question: "What happens if I need more applications or campaigns?",
      answer: "You can upgrade your plan at any time to increase your campaign and application limits. The Professional plan offers unlimited campaigns and applications for maximum flexibility."
    },
    {
      question: "Are there any long-term contracts?",
      answer: "No, all our plans are month-to-month with no long-term commitment required. You can cancel or change your subscription at any time."
    },
    {
      question: "Do credits expire?",
      answer: "No, your purchased credits never expire. You can use them whenever you need them without worrying about time limitations."
    }
  ];
  
  // Toggle FAQ expansion
  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  // Toggle showing all FAQs
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background dark:bg-[#0A0A0A]" id="faqs">
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
            <h3 className="text-sm font-medium uppercase tracking-wider">QUESTIONS & ANSWERS</h3>
          </motion.div>
          
          {/* Headline with mixed styling */}
          <div className="mt-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className=" ">Frequently</span> asked
              <br />
              questions
            </motion.h2>
            
            {/* Description paragraph */}
            <motion.p 
              className="mt-6 text-muted-foreground max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find answers to common questions about our influencer platform, 
              pay-per-performance model, and subscription plans.
            </motion.p>
          </div>
        </div>

        {/* FAQ Container with creative background */}
        <div className="relative mx-auto max-w-3xl">
          {/* Decorative Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isFaqListInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-24 right-0 -translate-x-12 -translate-y-1/2 w-64 h-64 rounded-full bg-secondaccent/5 blur-3xl -z-10"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isFaqListInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute bottom-24 left-0 translate-x-12 translate-y-1/2 w-64 h-64 rounded-full bg-secondaccent/5 blur-3xl -z-10"
          ></motion.div>
          
          {/* FAQ Items */}
          <div 
            ref={faqListRef}
            className="space-y-0 divide-y divide-gray-200 dark:divide-gray-800"
          >
            {faqData.slice(0, showAll ? faqData.length : initiallyShown).map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={expandedIndex === index}
                onToggle={() => toggleFAQ(index)}
                index={index}
                isVisible={isFaqListInView}
              />
            ))}
          </div>
          
          {/* Show More Button */}
          {faqData.length > initiallyShown && (
            <motion.div 
              ref={showMoreBtnRef}
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isShowMoreBtnInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={toggleShowAll}
                variant="outline"
                className="border-secondaccent text-secondaccent2 hover:bg-secondaccent/10 px-8"
              >
                {showAll ? "Show Less Questions" : "Show More Questions"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

