"use client";
import { useState } from "react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What if I'm a complete beginner with no AI experience?",
    answer: "Perfect! This bootcamp is designed for all levels. We start with the fundamentals and gradually build up to advanced concepts. Our instructors have taught thousands of beginners successfully. You'll get personalized support and can always ask questions in our community."
  },
  {
    question: "How much time do I need to commit each week?",
    answer: "Just 4 hours per week - 2 hours on Saturday and 2 hours on Sunday. We've designed this schedule specifically for working professionals. You'll also have optional homework and projects that you can complete at your own pace during the week."
  },
  {
    question: "What if I miss a live session?",
    answer: "No worries! All sessions are recorded and available within 24 hours. You'll have lifetime access to all recordings. Plus, our community is active 24/7, so you can always catch up and ask questions from peers and instructors."
  },
  {
    question: "Do I need any specific software or tools?",
    answer: "Nope! We'll guide you through setting up everything you need, including free AI tools and platforms. Most tools we use have generous free tiers, and we'll show you how to access premium features when needed. A basic computer with internet access is all you need."
  },
  {
    question: "Is the early bird pricing really worth it?",
    answer: "Absolutely! You save ₹2,000 with early bird pricing, plus you get access to exclusive pre-bootcamp preparation materials. Early bird students also get priority access to instructor office hours and bonus workshops. The regular price increases to ₹6,999 after June 30th."
  },
  {
    question: "What makes this different from other AI courses?",
    answer: "Three key differences: 1) Hands-on projects you can use immediately, 2) Industry expert instructors with real company experience, 3) Lifetime community access with ongoing support. Most courses teach theory - we teach practical skills you'll use at work from day one."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes! We offer a 7-day money-back guarantee. If you're not completely satisfied after the first week, we'll refund your full payment, no questions asked. We're confident you'll love the program, but we want you to feel secure in your investment."
  },
  {
    question: "Will I get a certificate upon completion?",
    answer: "Yes! You'll receive an industry-recognized certificate from ExplainX that you can add to your LinkedIn profile and resume. The certificate validates your knowledge across all 5 weeks of the curriculum and the projects you've completed."
  },
  {
    question: "What happens after the 5 weeks are over?",
    answer: "The learning never stops! You get lifetime access to our ExplainX AI community, all course materials, future updates, and new tools as they emerge. Many graduates continue collaborating on projects and advancing their careers together."
  },
  {
    question: "Can my company sponsor my enrollment?",
    answer: "Absolutely! We provide corporate invoicing and can work directly with your company's learning & development budget. Many employers sponsor this training as professional development. We can provide a detailed curriculum outline for approval."
  }
];

export default function BootcampFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-purple-600/20">
              <HelpCircle className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers! Here are the most common questions about our AI bootcamp.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-300 mb-6">
                Can't find the answer you're looking for? Our team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://calendly.com/explainx/discussion', '_blank')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Schedule a Call
                </button>
                <button 
                  onClick={() => window.open('mailto:support@explainx.ai', '_blank')}
                  className="border border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Email Support
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 