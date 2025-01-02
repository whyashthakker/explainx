import { Input } from "@repo/ui/components/ui/input";
import { useState } from "react";
import { faqData } from "../../../../data/landing/faq-data";

export function SearchFAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuestions = faqData.flatMap(category => 
    category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="w-full max-w-xl mx-auto mb-12">
      <Input
        type="search"
        placeholder="Search FAQs..."
        className="w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            {filteredQuestions.length} results found
          </p>
          {filteredQuestions.map((q, i) => (
            <div key={i} className="mb-4 p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">{q.question}</h3>
              <p className="text-sm text-muted-foreground">{q.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
