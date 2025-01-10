import * as React from 'react';
import { ArrowRight, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <div className="relative mt-12 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            AI-Powered Workforce
          </span>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-gray-50 sm:text-4xl font-cal"
        >
          Deploy AI Agents to Transform Your Business
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300"
        >
          Replace traditional employees with AI agents that work 24/7, scale instantly, 
          and cost 80% less. Get started in minutes and only pay for what you use.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/demo"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400"
          >
            Schedule Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          
          <a 
            href="/pricing" 
            className="w-full sm:w-auto text-lg font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors duration-200"
          >
            View Pricing <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* <div className="mt-8 flex items-center justify-center gap-x-8">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-blue-100 dark:bg-blue-900"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Trusted by 500+ enterprises
          </p>
        </div> */}
      </div>
    </div>
  );
}