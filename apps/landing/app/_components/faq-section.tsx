"use client"

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@repo/ui/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import FAQDataMain from "../../data/faq-data";
import { FAQsProps } from "../../types/faq";
import FAQItem from "./faq-items";





export default function FAQs({ faqs }: FAQsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const initiallyShown = 5;

  // Create refs for each section to track when they're in view
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { 
    once: true, 
    amount: 0.3 
  });

  const faqListRef = useRef(null);
  const isFaqListInView = useInView(faqListRef, { 
    once: true, 
    amount: 0.1 
  });

  const showMoreBtnRef = useRef(null);
  const isShowMoreBtnInView = useInView(showMoreBtnRef, { 
    once: true, 
    amount: 0.8 
  });

  // Use provided FAQs or fallback to main FAQ data
  const faqData = faqs || FAQDataMain;

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
            <div className="w-1 h-6 bg-yellow-400"></div>
            <h3 className="text-sm font-medium uppercase tracking-wider">QUESTIONS & ANSWERS</h3>
          </motion.div>
          
          {/* Headline with mixed styling */}
          <div className="mt-8">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-normal font-cal"
              initial={{ y: 20, opacity: 0 }}
              animate={isHeaderInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="italic">Frequently</span> asked
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
              Find answers to common questions about our AI services, 
              implementation process, and engagement models.
            </motion.p>
          </div>
          
          {/* Yellow Circle Accent */}
         
        </div>

        {/* FAQ Container with creative background */}
        <div className="relative mx-auto max-w-3xl">
          {/* Decorative Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isFaqListInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-24 right-0 -translate-x-12 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-400/5 blur-3xl -z-10"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isFaqListInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute bottom-24 left-0 translate-x-12 translate-y-1/2 w-64 h-64 rounded-full bg-yellow-400/5 blur-3xl -z-10"
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
                className="border-yellow-400 text-yellow-500 hover:bg-yellow-400/10 px-8"
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