import React from "react";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";
import { contactInfo, contactHero, faqs } from "./data/data";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <ContactHero
        title={contactHero.title}
        subtitle={contactHero.subtitle}
        backgroundImage={contactHero.backgroundImage}
      />
      
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Whether you have questions about our platform, need assistance
              finding a charity, or want to explore partnership opportunities,
              we're here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContactInfo contactInfo={contactInfo} />
            <ContactForm />
          </div>
        </div>
      </section>
      
      <FAQ faqs={faqs} />
    </div>
  );
};

export default Contact;
