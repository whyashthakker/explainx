"use client"

import { Button } from "@repo/ui/components/ui/button";
import React, { useEffect } from "react";
import FAQDataMain from "../../data/faq-data";

export default function FAQs() {
  const [showAll, setShowAll] = React.useState(false);
  const initiallyShown = 5;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  }

  return (
    <div
      className="mx-auto max-w-2xl divide-y divide-border px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:pb-32"
      id="faq"
    >
      <h2 className="font-cal text-2xl leading-10">
        Frequently asked questions
      </h2>
      <dl className="mt-10 space-y-8 divide-y divide-border">
        {FAQDataMain.slice(0, showAll ? FAQDataMain.length : initiallyShown).map((faq, index) => (
          <div
            key={faq.question}
            className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8"
          >
            <dt className="text-base font-semibold leading-7 lg:col-span-5">
              {faq.question}
            </dt>
            <dd className="mt-4 lg:col-span-7 lg:mt-0">
              <p className="text-base leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </dd>
          </div>
        ))}
      </dl>
      {FAQDataMain.length > initiallyShown && (
        <div className="flex justify-start mt-8">
          <Button
            onClick={toggleShowAll}
            variant="ghost"
            className="hover:bg-transparent hover:underline"
          >
            {showAll ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </div>
  );
}