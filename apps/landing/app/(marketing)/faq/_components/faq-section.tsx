import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@repo/ui/components/ui/accordion";
import { FAQCategory } from "../../../../data/landing/faq-data";
  
  interface FAQSectionProps {
    category: FAQCategory;
  }
  
  export function FAQSection({ category }: FAQSectionProps) {
    return (
      <div className="space-y-4">
        <h2 className="font-cal text-2xl mb-6">{category.title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {category.questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }