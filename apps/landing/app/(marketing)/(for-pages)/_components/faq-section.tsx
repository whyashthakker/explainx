"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

interface FAQSectionProps {
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSection({ faq }: FAQSectionProps) {
  return (
    <section className="bg-background dark:bg-[#0A0A0A] py-16 md:py-24 lg:py-32">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cal text-4xl md:text-5xl mb-6 text-foreground dark:text-white">
            Frequently Asked <span className=" ">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about growing with our platform
          </p>
        </motion.div>

        <Accordion 
          type="single" 
          collapsible 
          className="w-full space-y-4"
        >
          {faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
            >
              <AccordionItem 
                value={`item-${index}`}
                className="border border-border dark:border-gray-800 rounded-xl overflow-hidden hover:border-secondaccent dark:hover:border-secondaccent2 transition-colors"
              >
                <AccordionTrigger 
                  className="text-left font-medium px-6 py-4 
                  hover:bg-secondaccent/5 
                  hover:text-yellow-600 
                  text-foreground dark:text-white 
                  data-[state=open]:text-yellow-600 
                  transition-colors"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}