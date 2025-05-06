import React from 'react';
import Image from 'next/image';

interface PaymentMethodOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface PaymentSectionProps {
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ 
  selectedMethod, 
  onMethodSelect 
}) => {
  const paymentMethods: PaymentMethodOption[] = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: 'credit-card',
      description: 'Pay securely with your credit or debit card'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'paypal',
      description: 'Fast and secure payment with PayPal'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: 'bitcoin',
      description: 'Donate using Bitcoin, Ethereum, or Solana'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: 'university',
      description: 'Direct bank transfer to our account'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Choose Payment Method
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your preferred way to donate. All payment methods are secure and encrypted.
          </p>
        </div>
        
        <div className="w-full max-w-3xl mx-auto mb-8 bg-gray-100 h-2 rounded-full overflow-hidden">
          <div className="bg-purple-600 h-full rounded-full" style={{ width: '75%' }}></div>
        </div>
        <div className="flex justify-center mb-10 text-sm text-gray-600">
          <div className="flex items-center mx-2">
            <div className="w-4 h-4 rounded-full bg-purple-600 mr-2 flex items-center justify-center">
              <i className="fas fa-check text-white text-xs"></i>
            </div>
            <span>Select Charity</span>
          </div>
          <div className="w-8 h-px bg-gray-300 mx-1 self-center"></div>
          <div className="flex items-center mx-2">
            <div className="w-4 h-4 rounded-full bg-purple-600 mr-2 flex items-center justify-center">
              <i className="fas fa-check text-white text-xs"></i>
            </div>
            <span>Choose Amount</span>
          </div>
          <div className="w-8 h-px bg-gray-300 mx-1 self-center"></div>
          <div className="flex items-center mx-2">
            <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
            <span className="font-medium">Payment Method</span>
          </div>
          <div className="w-8 h-px bg-gray-300 mx-1 self-center"></div>
          <div className="flex items-center mx-2">
            <div className="w-4 h-4 rounded-full bg-gray-200 mr-2"></div>
            <span>Confirm</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer ${
                selectedMethod === method.id 
                  ? 'ring-4 ring-purple-400 transform scale-105' 
                  : 'border border-gray-200 hover:border-purple-200'
              }`}
              onClick={() => onMethodSelect(method.id)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <i className={`fas fa-${method.icon} text-purple-600 text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{method.name}</h3>
                  {selectedMethod === method.id && (
                    <div className="ml-auto bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center">
                      <i className="fas fa-check text-xs"></i>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
                
                {method.id === 'crypto' && (
                  <div className="mt-4 flex space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="fab fa-bitcoin text-orange-500"></i>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="fab fa-ethereum text-purple-700"></i>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-circle text-purple-500"></i>
                    </div>
                  </div>
                )}
                
                {method.id === 'credit-card' && (
                  <div className="mt-4 flex space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="fab fa-cc-visa text-blue-700"></i>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="fab fa-cc-mastercard text-red-500"></i>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="fab fa-cc-amex text-blue-500"></i>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;