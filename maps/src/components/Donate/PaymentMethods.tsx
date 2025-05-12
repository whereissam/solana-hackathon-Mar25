import React from 'react';
import { PaymentMethod } from './data/types';

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  selectedMethod: number;
  onMethodSelect: (methodId: number) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods,
  selectedMethod,
  onMethodSelect
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className={`card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer ${
              !method.isActive ? 'opacity-50' : ''
            } ${selectedMethod === method.id ? 'border-2 border-primary' : 'border border-gray-200'}`}
            onClick={() => method.isActive && onMethodSelect(method.id)}
          >
            <div className="card-body p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i className={`fab fa-${method.icon} text-primary`}></i>
                </div>
                <div>
                  <h3 className="font-medium">{method.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
                {!method.isActive && (
                  <div className="badge badge-outline ml-auto">Coming Soon</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;