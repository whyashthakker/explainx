"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function ContactCTA() {
  // Create refs for animation
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { 
    once: true, 
    amount: 0.3
  });

  const buttonsRef = useRef(null);
  const isButtonsInView = useInView(buttonsRef, { 
    once: true, 
    amount: 0.5
  });

  return (
    <motion.div 
      ref={cardRef}
      className="relative py-12 md:py-16 px-6 lg:px-8 bg-[#0A0A0A] rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 right-10 w-64 h-64 rounded-full bg-secondaccent/10 blur-[80px] opacity-60"
          initial={{ opacity: 0 }}
          animate={isCardInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-secondaccent/5 blur-[80px] opacity-40"
          initial={{ opacity: 0 }}
          animate={isCardInView ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-normal text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={isCardInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ready to start your <span className=" ">first</span> campaign?
        </motion.h2>
        
        <motion.p 
          className="mt-4 text-gray-300 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={isCardInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get started for free or talk to our team about your campaign goals
        </motion.p>
        
        <motion.div 
          ref={buttonsRef}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={isButtonsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            asChild
            className="w-full sm:w-auto px-6 py-5 bg-secondaccent hover:bg-secondaccent2 text-black font-medium rounded-lg"
            size="lg"
          >
            <Link href="/signup" className="flex items-center gap-2">
              Start For Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="w-full sm:w-auto px-6 py-5 border-secondaccent/40 text-secondaccent hover:bg-secondaccent/10 font-medium rounded-lg"
            size="lg"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Talk to Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}