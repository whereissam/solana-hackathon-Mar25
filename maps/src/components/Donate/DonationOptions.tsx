import React from 'react';
import { DonationOption } from './data/types';

interface DonationOptionsProps {
  options: DonationOption[];
  selectedOption: number;
  customAmount: number;
  onOptionSelect: (optionId: number) => void;
  onCustomAmountChange: (amount: number) => void;
}

const DonationOptions: React.FC<DonationOptionsProps> = ({
  options,
  selectedOption,
  customAmount,
  onOptionSelect,
  onCustomAmountChange
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Choose Donation Amount</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`card bg-base-100 shadow-md hover:shadow-lg transition-all cursor-pointer ${
              selectedOption === option.id ? 'border-2 border-primary' : 'border border-gray-200'
            }`}
            onClick={() => onOptionSelect(option.id)}
          >
            <div className="card-body p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i className={`fas fa-${option.icon} text-primary`}></i>
                </div>
                <h3 className="card-title text-lg">{option.name}</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{option.description}</p>
              {option.id !== 5 ? (
                <div className="text-xl font-bold text-primary">${option.amount}</div>
              ) : (
                <div className="form-control">
                  <div className="input-group">
                    <span className="bg-primary text-primary-content">$</span>
                    <input
                      type="number"
                      placeholder="Amount"
                      className="input input-bordered w-full"
                      value={customAmount || ''}
                      onChange={(e) => onCustomAmountChange(Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationOptions;