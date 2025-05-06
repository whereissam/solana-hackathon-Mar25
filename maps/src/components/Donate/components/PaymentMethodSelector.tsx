import React from 'react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onChange: (method: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  methods,
  selectedMethod,
  onChange
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Select your preferred way to donate
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        {methods.map(method => (
          <div
            key={method.id}
            className={`card bg-base-100 cursor-pointer transition-all ${
              selectedMethod === method.id ? 'border-2 border-primary' : 'border border-gray-200'
            }`}
            onClick={() => onChange(method.id)}
          >
            <div className="card-body p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i className={`fas fa-${method.icon} text-primary`}></i>
                </div>
                <div>
                  <h3 className="font-medium">{method.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;