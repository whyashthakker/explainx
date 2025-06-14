"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { CheckCircle, Calendar, Clock, Users, Trophy, BookOpen, Zap, Target, Star, Quote, Play } from "lucide-react";
import WorkshopRegistrationForm from "../../../../_components/workshop-registration-form";

export default function PromptEngineeringLandingPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-[#0A0A0A] to-blue-900/20" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-8 px-6 py-3 text-sm font-medium bg-green-900/20 text-green-300 border-green-700/30">
              🎉 FREE Workshop - Limited Seats
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              Master Prompt Engineering
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join Yash Thakker for a 2-hour intensive workshop on AI prompting essentials
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                onClick={() => setIsRegistrationOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 px-10 py-4 text-lg font-medium"
              >
                Register Free
              </Button>
              <Button variant="outline" size="lg" className="border-gray-700 hover:bg-gray-800 px-10 py-4 text-lg">
                Share Workshop
              </Button>
            </div>

            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/30 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-400">📅 When</h4>
                  <p className="text-gray-300 mb-2">June 24, 2025</p>
                  <p className="text-gray-300">11:30 AM - 1:30 PM IST</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-blue-400">💻 Format</h4>
                  <p className="text-gray-300 mb-2">Live Online Workshop</p>
                  <p className="text-gray-300">Recording Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What you'll learn</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Prompting 101: Structure & Essentials</h3>
                <p className="text-gray-300 leading-relaxed">
                  Master the fundamental structure of effective prompts and essential techniques for consistent results.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Text, Image, Video: Go-to Formulas</h3>
                <p className="text-gray-300 leading-relaxed">
                  Learn proven formulas for different content types and multimodal AI interactions.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-World Use Cases</h3>
                <p className="text-gray-300 leading-relaxed">
                  See practical applications across business, creative, and technical scenarios.
                </p>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <div className="mb-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Future Trends in AI Prompting</h3>
                <p className="text-gray-300 leading-relaxed">
                  Stay ahead with insights into emerging trends and advanced techniques.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet your instructor</h2>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700/30">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl font-bold">
                YT
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3">Yash Thakker</h3>
                <p className="text-purple-400 mb-4">AI Expert & Founder of AISOLO Technologies</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  12+ years of experience in AI & Tech, built 2 successful tech products, and trained 70,000+ students 
                  across Udemy, Coursera, and other platforms. Specializes in practical AI applications and 
                  hands-on workshops.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Badge variant="outline" className="text-sm">12+ Years Experience</Badge>
                  <Badge variant="outline" className="text-sm">70K+ Students</Badge>
                  <Badge variant="outline" className="text-sm">2 Tech Products</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect for you if...</h2>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">You're new to AI prompting</h3>
                  <p className="text-gray-300">Learn the fundamentals and get started with confidence</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">You want consistent AI results</h3>
                  <p className="text-gray-300">Stop getting random outputs and learn proven techniques</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">You're ready to level up your skills</h3>
                  <p className="text-gray-300">Take your AI usage from basic to professional level</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900/20 via-[#0A0A0A] to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to master prompt engineering?</h2>
          
          <div className="mb-12">
            <div className="text-5xl md:text-6xl font-bold mb-4 text-green-400">
              FREE
            </div>
            <p className="text-lg text-gray-300">Limited seats • First come, first served</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => setIsRegistrationOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 px-12 py-4 text-xl"
            >
              Register Now (FREE)
            </Button>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-xl font-bold mb-4">Don't miss this opportunity</h3>
            <p className="text-gray-300 leading-relaxed">
              Learn proven techniques in just 2 hours that will transform how you work with AI.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Common questions</h2>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <h3 className="text-lg font-semibold mb-3">Is this workshop really free?</h3>
              <p className="text-gray-300">
                Yes! Completely free with no hidden costs or upsells during the session.
              </p>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <h3 className="text-lg font-semibold mb-3">What if I can't attend live?</h3>
              <p className="text-gray-300">
                The workshop will be recorded and available for 7 days after the session.
              </p>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <h3 className="text-lg font-semibold mb-3">Do I need AI experience?</h3>
              <p className="text-gray-300">
                Not at all! This workshop is designed for all levels, from complete beginners to experienced users.
              </p>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/30 p-6">
              <h3 className="text-lg font-semibold mb-3">Which AI tools are covered?</h3>
              <p className="text-gray-300">
                The techniques work with ChatGPT, Claude, Gemini, and other major AI models.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration Form Modal */}
      <WorkshopRegistrationForm 
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  );
}
