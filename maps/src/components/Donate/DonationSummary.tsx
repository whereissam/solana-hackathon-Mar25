import React from 'react';
import { DonationOption, PaymentMethod, DonorInfo } from './data/types';

interface DonationSummaryProps {
  selectedOption: DonationOption;
  customAmount: number;
  selectedMethod: PaymentMethod;
  donorInfo: DonorInfo;
  onDonate: () => void;
  isProcessing: boolean;
}

const DonationSummary: React.FC<DonationSummaryProps> = ({
  selectedOption,
  customAmount,
  selectedMethod,
  donorInfo,
  onDonate,
  isProcessing
}) => {
  const donationAmount = selectedOption.id === 5 ? customAmount : selectedOption.amount;
  
  return (
    <div className="card bg-base-100 shadow-lg border border-gray-200">
      <div className="card-body p-6">
        <h2 className="card-title text-xl mb-4">Donation Summary</h2>
        
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Donation Type:</span>
          <span className="font-medium">{selectedOption.name}</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Amount:</span>
          <span className="font-bold text-primary">${donationAmount.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
          <span className="font-medium">{selectedMethod.name}</span>
        </div>
        
        <div className="divider my-2"></div>
        
        <div className="flex justify-between mb-4">
          <span className="text-gray-600 dark:text-gray-400">Donor:</span>
          <span className="font-medium">
            {donorInfo.isAnonymous 
              ? 'Anonymous' 
              : `${donorInfo.firstName} ${donorInfo.lastName}`}
          </span>
        </div>
        
        <button 
          className={`btn btn-primary w-full ${isProcessing ? 'loading' : ''}`}
          onClick={onDonate}
          disabled={isProcessing || donationAmount <= 0}
        >
          {isProcessing ? 'Processing...' : `Donate $${donationAmount.toFixed(2)}`}
        </button>
        
        <div className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
          By donating, you agree to our Terms of Service and Privacy Policy.
          All donations are secure and encrypted.
        </div>
      </div>
    </div>
  );
};

export default DonationSummary;