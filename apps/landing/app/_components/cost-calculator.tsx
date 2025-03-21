'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

const CostCalculator = () => {
    const [employees, setEmployees] = useState(5);
    const [workload, setWorkload] = useState(40);
    
    const traditionalCost = employees * 4000;
    const aiCost = Math.round((employees * workload / 168) * 800);
    const savings = traditionalCost - aiCost;
    const savingsPercentage = Math.round((savings / traditionalCost) * 100);
    
    return (
      <div 
        className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-gray-700"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-secondaccent2 rounded-lg">
            <Calculator className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-white">ROI Calculator</h3>
        </div>
        
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-gray-300">Team Size</label>
              <span className="text-secondaccent font-medium">{employees} employees</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondaccent2"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-gray-300">Weekly Hours</label>
              <span className="text-secondaccent font-medium">{workload}h / week</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={workload}
              onChange={(e) => setWorkload(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-secondaccent2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Current Cost</div>
              <div className="text-2xl font-bold text-gray-100">${traditionalCost.toLocaleString()}</div>
              <div className="text-sm text-gray-400">per month</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-xl border border-yellow-900">
              <div className="text-sm text-gray-400 mb-1">AI Cost</div>
              <div className="text-2xl font-bold text-secondaccent">${aiCost.toLocaleString()}</div>
              <div className="text-sm text-gray-400">per month</div>
            </div>
          </div>
          
          <div className="bg-yellow-900 bg-opacity-20 p-6 rounded-xl border border-yellow-900">
            <div className="flex items-center justify-between mb-2">
              <div className="text-lg font-medium text-gray-200">Your Savings</div>
              <div className="px-3 py-1 bg-yellow-900 bg-opacity-50 rounded-full text-yellow-300 font-medium">
                {savingsPercentage}% saved
              </div>
            </div>
            <div className="text-4xl font-bold text-secondaccent">${savings.toLocaleString()}</div>
            <div className="text-sm text-gray-400 mt-1">per month</div>
          </div>
        </div>
      </div>
    );
  };

export default CostCalculator;