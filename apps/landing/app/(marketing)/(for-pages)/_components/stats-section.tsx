"use client";

import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { motion } from "framer-motion";

interface StatsSectionProps {
  stats: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-background dark:bg-[#0A0A0A] py-16 md:py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-4 bg-secondaccent/10 text-secondaccent2 border-secondaccent/20"
          >
            Platform Stats
          </Badge>
          <h2 className="font-cal text-4xl md:text-5xl mb-6 text-foreground dark:text-white">
            Growing <span className=" ">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our thriving community of creators and achieve your goals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
              className="flex"
            >
              <Card 
                className="p-6 text-center hover:shadow-2xl transition-all duration-300 
                bg-background dark:bg-[#1A1A1A] 
                border border-border dark:border-gray-800 
                hover:border-secondaccent dark:hover:border-secondaccent2 
                group flex flex-col w-full h-full"
              >
                <div className="font-cal text-4xl text-secondaccent2 mb-2 group-hover:text-yellow-600 transition-colors">
                  {stat.value}
                </div>
                <div className="font-medium text-lg mb-2 text-foreground dark:text-white group-hover:text-yellow-600 transition-colors">
                  {stat.label}
                </div>
                {stat.description && (
                  <p className="text-sm text-muted-foreground mt-auto">
                    {stat.description}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}