import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@repo/ui/components/ui/accordion";
  
  interface FAQSectionProps {
    faq: Array<{
      question: string;
      answer: string;
    }>;
  }
  
  export function FAQSection({ faq }: FAQSectionProps) {
    return (
      <section className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="font-cal text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">
            Everything you need to know about growing with ExplainX
          </p>
        </div>
  
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    );
  }