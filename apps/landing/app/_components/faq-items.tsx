import { FAQItemProps } from "../../types/faq";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@repo/ui/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import FAQDataMain from "../../data/faq-data";

import { cn } from "@repo/ui/lib/utils";
import { FAQsProps } from "../../types/faq";



const FAQItem = ({ 
  faq, 
  isOpen, 
  onToggle, 
  index,
  isVisible
}: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={cn(
        "overflow-hidden border-b border-gray-200 dark:border-gray-800 py-6",
        isOpen && "pb-8"
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between text-left"
      >
        <h3 className="text-lg font-medium pr-6">
          {faq.question}
        </h3>
        <div 
          className={cn(
            "flex-shrink-0 ml-2 mt-1 flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-200",
            isOpen ? "bg-secondaccent text-black" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          )}
        >
          {isOpen ? 
            <ChevronUp className="h-4 w-4" /> : 
            <ChevronDown className="h-4 w-4" />
          }
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <motion.div 
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-muted-foreground border-l-2 border-secondaccent pl-4"
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;