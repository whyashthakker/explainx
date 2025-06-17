"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Calendar, Clock, Users, Star, ArrowRight, Play } from "lucide-react";
import BootcampRegistrationForm from "./BootcampRegistrationForm";
import Image from "next/image";

export default function BootcampHero() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Early Bird Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-sm font-semibold">
              🎯 Early Bird Pricing - Save ₹2,000 - Ends June 30, 2025
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master AI in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              5 Weeks
            </span>
            <br />
            Complete AI Bootcamp
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your career with our comprehensive AI bootcamp. Learn prompting, text/image/video generation, 
            and build real AI applications. From beginner to AI expert in just 5 weeks.
          </p>

          {/* Key Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="font-semibold">20 Hours Total</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">Weekends Only</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Cohort Learning</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Lifetime Access</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={() => setIsRegistrationOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enroll Now - Early Bird ₹4,999
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-xl"
              onClick={() => window.open('https://calendly.com/explainx/discussion', '_blank')}
            >
              <Play className="w-5 h-5 mr-2" />
              Schedule Discussion
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mb-12">
            <p className="text-gray-400 mb-4">Trusted by professionals from:</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <Image src="/workshops/bootcamp/ai/brand-logos/tata-motors.png" height={48} width={48} alt="Tata" className="h-12 grayscale hover:grayscale-0 transition-all" />
              <Image src="/workshops/bootcamp/ai/brand-logos/bajaj-allianz.png" height={48} width={48} alt="Bajaj Allianz" className="h-12 grayscale hover:grayscale-0 transition-all" />
              <Image src="/workshops/bootcamp/ai/brand-logos/paypal.png" height={48} width={48} alt="PayPal" className="h-12 grayscale hover:grayscale-0 transition-all" />
              <Image src="/workshops/bootcamp/ai/brand-logos/cognizant.jpg" height={48} width={48} alt="Cognizant" className="h-12 grayscale hover:grayscale-0 transition-all" />
              <Image src="/workshops/bootcamp/ai/brand-logos/marsh.png" height={48} width={48} alt="Marsh" className="h-12 grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>

          {/* AI Tools Moving Carousel */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">Master 100+ AI Tools Including:</p>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll space-x-8">
                {/* First set of tools */}
                <div className="flex space-x-8 flex-shrink-0">
                  <img src="/workshops/bootcamp/ai/tools/claude.png" alt="Claude AI" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/chatgpt.png" alt="ChatGPT" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/cursor.png" alt="Cursor" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/dalle.png" alt="DALL-E" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/midjourney.png" alt="Midjourney" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/elevenlabs.png" alt="ElevenLabs" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/heygen.png" alt="HeyGen" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/sora.png" alt="Sora" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/runway.png" alt="Runway ML" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/copyai.png" alt="Copy.ai" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex space-x-8 flex-shrink-0">
                  <img src="/workshops/bootcamp/ai/tools/claude.png" alt="Claude AI" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/chatgpt.png" alt="ChatGPT" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/cursor.png" alt="Cursor" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/dalle.png" alt="DALL-E" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/midjourney.png" alt="Midjourney" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/elevenlabs.png" alt="ElevenLabs" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/heygen.png" alt="HeyGen" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/sora.png" alt="Sora" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/runway.png" alt="Runway ML" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/workshops/bootcamp/ai/tools/copyai.png" alt="Copy.ai" className="h-16 w-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">And 90+ more cutting-edge AI tools</p>
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