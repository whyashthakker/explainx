//new comp

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@repo/ui/components/ui/accordion";
  
  export function PricingFAQ() {
    const faqs = [
      {
        question: "How does the credit system work?",
        answer: "Credits are our platform's currency. You purchase credits upfront (100 credits = $10) and use them to run campaigns. Credits never expire, giving you flexibility in campaign planning and execution."
      },
      {
        question: "What's included in the onboarding fee?",
        answer: "The one-time onboarding fee includes account setup, platform training, and access to our AI-powered influencer matching system. You'll also get a dedicated account manager to help optimize your campaigns."
      },
      {
        question: "How are influencer costs calculated?",
        answer: "Influencer costs are calculated based on their engagement rates, audience quality, and historical performance. Higher-performing influencers may have higher costs per click, but often deliver better ROI."
      },
      {
        question: "What happens if content goes viral?",
        answer: "If content performs exceptionally well or goes viral, additional credits may be required to cover the increased engagement. We'll notify you in advance and work with you to manage the campaign budget."
      }
    ];
  
    return (
      <div className="mb-16">
        <h2 className="text-2xl font-cal text-center mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }