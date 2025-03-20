import { FAQ } from "../app/(marketing)/compare/[competitor]/utils";

export interface FAQsProps {
    faqs?: FAQ[];  // Make it optional to maintain backward compatibility
  }
  
export interface FAQItemProps {
    faq: FAQ;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
    isVisible: boolean;
  }