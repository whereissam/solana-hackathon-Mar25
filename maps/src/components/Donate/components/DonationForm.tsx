import React, { useState } from 'react';
import { donationOptions, frequencyOptions, paymentMethods } from '../data/sampleData';
import { pageContent } from '../constants/textContent';
import DonationOptions from '../DonationOptions';
import FrequencySelector from './FrequencySelector';
import PaymentMethodSelector from './PaymentMethodSelector';
import PersonalInfoForm from './PersonalInfoForm';

interface DonationFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(1);
  const [customAmount, setCustomAmount] = useState(0);
  const [frequency, setFrequency] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  const handleCustomAmountChange = (amount: number) => {
    setCustomAmount(amount);
  };

  const handleFrequencyChange = (freq: string) => {
    setFrequency(freq);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const donationAmount = selectedOption === 5 ? customAmount : 
      donationOptions.find(opt => opt.id === selectedOption)?.amount || 0;
    
    const formData = {
      amount: donationAmount,
      frequency,
      paymentMethod,
      personalInfo
    };
    
    onSubmit(formData);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <DonationOptions
                options={donationOptions}
                selectedOption={selectedOption}
                customAmount={customAmount}
                onOptionSelect={handleOptionSelect}
                onCustomAmountChange={handleCustomAmountChange}
              />
              
              <FrequencySelector
                options={frequencyOptions}
                selectedFrequency={frequency}
                onChange={handleFrequencyChange}
              />
              
              <div className="flex justify-between mt-6">
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={onCancel}
                >
                  {pageContent.buttons.cancel}
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleNext}
                >
                  {pageContent.buttons.next}
                </button>
              </div>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <PaymentMethodSelector
                methods={paymentMethods}
                selectedMethod={paymentMethod}
                onChange={handlePaymentMethodChange}
              />
              
              <div className="flex justify-between mt-6">
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={handleBack}
                >
                  {pageContent.buttons.back}
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleNext}
                >
                  {pageContent.buttons.next}
                </button>
              </div>
            </>
          )}
          
          {currentStep === 3 && (
            <>
              <PersonalInfoForm
                formData={personalInfo}
                onChange={handlePersonalInfoChange}
              />
              
              <div className="flex justify-between mt-6">
                <button 
                  type="button" 
                  className="btn btn-outline" 
                  onClick={handleBack}
                >
                  {pageContent.buttons.back}
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  {pageContent.buttons.donate}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default DonationForm;