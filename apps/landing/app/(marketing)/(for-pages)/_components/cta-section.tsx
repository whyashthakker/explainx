"use client";

import { Button } from "@repo/ui/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

export function CTASection({ 
  title, 
  description, 
  primaryButton, 
  secondaryButton 
}: CTASectionProps) {
  return (
    <section className="bg-background dark:bg-[#0A0A0A] py-16 md:py-24 lg:py-32">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-cal text-4xl md:text-5xl mb-6 text-foreground dark:text-white">
            {title}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button 
            asChild
            size="lg" 
            className="bg-secondaccent hover:bg-secondaccent2 text-black group"
          >
            <Link href={primaryButton.link} className="flex items-center gap-2">
              {primaryButton.text}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Button>
          
          {secondaryButton && (
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-secondaccent text-secondaccent2 hover:bg-secondaccent/10 group"
            >
              <Link href={secondaryButton.link} className="flex items-center gap-2">
                {secondaryButton.text}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
}