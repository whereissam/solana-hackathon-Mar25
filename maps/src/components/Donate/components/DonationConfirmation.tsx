import React from 'react';
import { pageContent } from '../constants/textContent';

interface DonationConfirmationProps {
  donationData: {
    amount: number;
    frequency: string;
    personalInfo: {
      firstName: string;
      email: string;
    };
  };
  onDonateAgain: () => void;
}

const DonationConfirmation: React.FC<DonationConfirmationProps> = ({
  donationData,
  onDonateAgain
}) => {
  const { confirmation } = pageContent;
  
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check-circle text-success text-4xl"></i>
          </div>
          <h2 className="text-2xl font-bold mb-2">{confirmation.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {confirmation.message}
          </p>
        </div>
        
        <div className="bg-base-200 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span>Amount:</span>
            <span className="font-bold">${donationData.amount}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Frequency:</span>
            <span className="font-bold">
              {donationData.frequency === 'one-time' ? 'One Time' : 
               donationData.frequency === 'monthly' ? 'Monthly' :
               donationData.frequency === 'quarterly' ? 'Quarterly' : 'Annually'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Receipt sent to:</span>
            <span className="font-bold">{donationData.personalInfo.email}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="mb-3">{confirmation.shareMessage}</p>
          <div className="flex justify-center gap-3">
            <button className="btn btn-circle btn-outline">
              <i className="fab fa-facebook-f"></i>
            </button>
            <button className="btn btn-circle btn-outline">
              <i className="fab fa-twitter"></i>
            </button>
            <button className="btn btn-circle btn-outline">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>
        </div>
        
        <button 
          className="btn btn-primary"
          onClick={onDonateAgain}
        >
          {confirmation.donateAgain}
        </button>
      </div>
    </div>
  );
};

export default DonationConfirmation;