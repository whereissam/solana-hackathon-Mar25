import React from 'react';

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface ValuesProps {
  values?: Value[];
}

const AboutValues: React.FC<ValuesProps> = ({ values }) => {
  // Default values if values is undefined
  const defaultValues: Value[] = [
    {
      icon: "🔍",
      title: "Transparency",
      description: "We believe in complete transparency in all charitable transactions, allowing donors to see exactly where their money goes."
    },
    {
      icon: "🔒",
      title: "Security",
      description: "Using blockchain technology, we ensure that all donations are securely processed and recorded on an immutable ledger."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "We continuously explore new technologies and approaches to improve the charitable giving experience."
    }
  ];

  // Use values if provided, otherwise use default values
  const valuesToDisplay = values || defaultValues;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in the power of community and connection to create meaningful change. Our platform bridges the gap between charitable organizations and the people who want to support them.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valuesToDisplay.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className={`${index === 0 ? 'bg-green-100' : 'bg-blue-100'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <i className={`fas ${index === 0 ? 'fa-handshake text-green-600' : index === 1 ? 'fa-map-marked-alt text-blue-600' : 'fa-hands-helping text-blue-600'} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;