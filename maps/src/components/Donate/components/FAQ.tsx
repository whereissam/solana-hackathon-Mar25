import React from 'react';
import { faqContent } from '../constants/textContent';

const FAQ: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">{faqContent.title}</h2>
      <div className="grid gap-4">
        {faqContent.questions.map((faq, index) => (
          <div key={index} className="collapse collapse-plus bg-base-100">
            <input type="checkbox" /> 
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;