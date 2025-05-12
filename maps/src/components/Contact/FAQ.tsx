import React, { useState } from "react";
import { FAQType } from "./data/types";

interface FAQProps {
  faqs?: FAQType[];
}

const FAQ: React.FC<FAQProps> = ({ faqs = [] }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <div
                className={`collapse collapse-arrow ${
                  activeFaq === index ? "collapse-open" : "collapse-close"
                } bg-base-100 shadow-sm`}
              >
                <input 
                  type="checkbox" 
                  checked={activeFaq === index}
                  onChange={() => toggleFaq(index)}
                />
                <div className="collapse-title text-lg font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;