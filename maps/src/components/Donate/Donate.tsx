import React, { useState } from "react";
import Link from "next/link";
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import CharitiesSection from './CharitiesSection';
import DonationForm from './DonationForm';
import PaymentSection from './PaymentSection';
import ImpactSection from './ImpactSection';
import { useDonation } from './hooks/useDonation';

const Donate: React.FC = () => {
  const {
    donationAmount,
    customAmount,
    selectedCharity,
    isRecurring,
    recurringFrequency,
    paymentMethod,
    showProfileMenu,
    selectedCategory,
    handleAmountSelect,
    handleCustomAmountChange,
    handleCharitySelect,
    setShowProfileMenu,
    setSelectedCategory,
    setIsRecurring,
    setRecurringFrequency,
    setPaymentMethod
  } = useDonation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        
        <CategoriesSection 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        <CharitiesSection 
          selectedCategory={selectedCategory}
          selectedCharity={selectedCharity}
          handleCharitySelect={handleCharitySelect}
        />
        
        <DonationForm 
          donationAmount={donationAmount}
          customAmount={customAmount}
          handleAmountSelect={handleAmountSelect}
          handleCustomAmountChange={handleCustomAmountChange}
          isRecurring={isRecurring}
          setIsRecurring={setIsRecurring}
          recurringFrequency={recurringFrequency}
          setRecurringFrequency={setRecurringFrequency}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setCustomAmount={() => {}}
        />
        
        <PaymentSection 
          selectedMethod={paymentMethod}
          onMethodSelect={setPaymentMethod}
        />
        
        <ImpactSection />
      </main>
    </div>
  );
};

export default Donate;