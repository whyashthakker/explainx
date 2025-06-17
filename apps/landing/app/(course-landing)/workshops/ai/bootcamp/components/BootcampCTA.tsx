"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { 
  ArrowRight, 
  Clock, 
  Users, 
  Star, 
  Calendar,
  Zap,
  Trophy
} from "lucide-react";
import BootcampRegistrationForm from "./BootcampRegistrationForm";

export default function BootcampCTA() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-indigo-900/30 rounded-3xl p-12 border border-purple-500/30 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-lg font-bold mb-6">
                🔥 LIMITED TIME: Early Bird Pricing Ends June 30th!
              </Badge>
              
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Become an
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI Expert?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join thousands of professionals who have transformed their careers with our 
                comprehensive 5-week AI bootcamp. Don't miss out on the early bird pricing!
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="p-4 rounded-full bg-purple-600/20 w-fit mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Immediate Impact</h3>
                <p className="text-gray-300 text-sm">Start using AI tools at work from week 1</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 rounded-full bg-blue-600/20 w-fit mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Expert Community</h3>
                <p className="text-gray-300 text-sm">Lifetime access to AI professionals network</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 rounded-full bg-green-600/20 w-fit mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Career Growth</h3>
                <p className="text-gray-300 text-sm">95% of graduates report career advancement</p>
              </div>
            </div>

            {/* Pricing Comparison */}
            <div className="bg-gray-800/50 rounded-2xl p-8 mb-10 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Early Bird Special</h3>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl font-bold text-white">₹4,999</span>
                    <span className="text-2xl text-gray-400 line-through">₹6,999</span>
                    <Badge className="bg-green-600 text-white">Save ₹2,000</Badge>
                  </div>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">20 hours of live training</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">Hands-on projects & real apps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">Lifetime community access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">Industry certification</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 text-orange-200">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">Offer expires in:</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-400 mt-2">
                      {Math.ceil((new Date("2025-06-30").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setIsRegistrationOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Enroll Now - Save ₹2,000
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-white hover:bg-gray-800 px-10 py-4 text-xl rounded-xl"
                  onClick={() => window.open('https://calendly.com/explainx/discussion', '_blank')}
                >
                  <Calendar className="w-6 h-6 mr-2" />
                  Schedule Discussion
                </Button>
              </div>
              
              <p className="text-gray-400 text-sm">
                💳 Secure payment • 📧 Instant access • 🔒 7-day money-back guarantee
              </p>
              
              <div className="flex justify-center items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>500+ enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Industry certified</span>
                </div>
              </div>
            </div>

            {/* Bottom Guarantee */}
            <div className="mt-12 text-center">
              <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                <h4 className="text-lg font-bold text-white mb-2">
                  🛡️ Risk-Free Guarantee
                </h4>
                <p className="text-green-200 text-sm">
                  Not satisfied after the first week? Get a full refund, no questions asked. 
                  We're confident you'll love the program, but your satisfaction is guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <BootcampRegistrationForm 
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </section>
  );
} 