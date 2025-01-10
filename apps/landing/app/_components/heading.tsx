'use client';

import { useState } from 'react';
import Image from "next/image";
import { CTAButtons } from "./cta-ab";
import { cn } from "@repo/ui/lib/utils";
import { Bot, DollarSign, Clock, Zap, CheckCircle2, Users, ArrowRight, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CostCalculator = () => {
  const [employees, setEmployees] = useState(5);
  const [workload, setWorkload] = useState(40);
  
  const traditionalCost = employees * 4000;
  const aiCost = Math.round((employees * workload / 168) * 800);
  const savings = traditionalCost - aiCost;
  const savingsPercentage = Math.round((savings / traditionalCost) * 100);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-blue-100"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">ROI Calculator</h3>
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium text-gray-900">Team Size</label>
            <span className="text-blue-600 font-medium">{employees} employees</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="font-medium text-gray-900">Weekly Hours</label>
            <span className="text-blue-600 font-medium">{workload}h / week</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            value={workload}
            onChange={(e) => setWorkload(Number(e.target.value))}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Current Cost</div>
            <div className="text-2xl font-bold text-gray-900">${traditionalCost.toLocaleString()}</div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="text-sm text-gray-500 mb-1">AI Cost</div>
            <div className="text-2xl font-bold text-blue-600">${aiCost.toLocaleString()}</div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-medium text-gray-900">Your Savings</div>
            <div className="px-3 py-1 bg-green-100 rounded-full text-green-700 font-medium">
              {savingsPercentage}% saved
            </div>
          </div>
          <div className="text-4xl font-bold text-green-600">${savings.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-1">per month</div>
        </div>
      </div>
    </motion.div>
  );
};

export const Heading = (props: {
  title?: string;
  subtitle?: string;
  image?: string;
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50" />
      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 text-left">
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-medium text-sm mb-6">
                Future of Work
              </div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-6xl font-cal font-bold text-gray-900 leading-tight mb-6"
              >
                Cut Costs by 80% with AI Workforce
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 mb-8"
              >
                Replace traditional employees with AI agents that work 24/7, scale instantly, and deliver consistent results.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <Link 
                  href="/demo"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Calculate Your Savings
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <div className="flex-1">
              <CostCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function HeroText(props: { children: React.ReactNode; className?: string; }) {
  const { className, ...rest } = props;
  return (
    <h1
      className={cn(
        "font-cal text-4xl lg:text-5xl font-bold text-gray-900 leading-tight",
        className
      )}
      {...rest}
    />
  );
}

export function HeroSubtitle(props: { children: React.ReactNode }) {
  return (
    <p
      className="text-xl text-gray-600"
      {...props}
    />
  );
}