import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/ui/accordion";

export function PricingFAQ() {
  const faqs = [
    {
      question: "How does the pay-per-performance model work?",
      answer: "You purchase platform credits and pay influencers based on their average view count. If content outperforms expectations, you're eligible for a refund of the difference. This ensures you only pay for actual performance."
    },
    {
      question: "What platforms are supported?",
      answer: "Different plans support different platforms. Free tier includes Instagram only, Starter adds LinkedIn, Growth tier includes major platforms (Instagram, LinkedIn, Twitter, Facebook, TikTok, YouTube), and Professional supports all platforms without limits."
    },
    {
      question: "How are influencers verified?",
      answer: "All influencers on our platform go through a verification process that checks their identity, engagement authenticity, and content quality. This ensures you're working with legitimate creators who can deliver real results."
    },
    {
      question: "What happens if I need more applications or campaigns?",
      answer: "You can upgrade your plan at any time to increase your campaign and application limits. The Professional plan offers unlimited campaigns and applications for maximum flexibility."
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