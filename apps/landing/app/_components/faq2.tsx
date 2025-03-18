"use client"

import React, { useState } from "react";
import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import FAQDataMain from "../../data/faq-data";
import { FAQ as FAQType } from "../(marketing)/compare/[competitor]/utils";

interface FAQsProps {
  faqs?: FAQType[];  // Make it optional to maintain backward compatibility
  title?: string;
  description?: string;
}

export default function FAQs({ 
  faqs, 
  title = "This is the start of something new", 
  description = "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever." 
}: FAQsProps) {
  // Use provided FAQs or fallback to main FAQ data
  const faqData = faqs || FAQDataMain;
  const [showAll, setShowAll] = useState(false);
  const initiallyShown = 5;
  
  const displayFaqs = showAll ? faqData : faqData.slice(0, initiallyShown);

  return (
    <div className="w-full py-20 lg:py-40" id="faq">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  {title}
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  {description}
                </p>
              </div>
              <div className="">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {displayFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`index-${index}`}>
                  <AccordionTrigger>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {faqData.length > initiallyShown && (
              <div className="flex justify-start mt-6">
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="ghost"
                  className="hover:bg-transparent hover:underline"
                >
                  {showAll ? "Show less" : "Show more"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { FAQs as FAQ };