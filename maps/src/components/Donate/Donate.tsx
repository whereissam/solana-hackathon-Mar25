import React from "react";
import DonateHero from '@/components/Donate/DonateHero';
import CategoriesSection from './CategoriesSection';
import CharitiesSection from './CharitiesSection';
import DonationForm from './DonationForm';
import PaymentSection from './PaymentSection';
import ImpactSection from './ImpactSection';
import { useDonation } from './hooks/useDonation';

// Hero section content constants
const HERO_CONTENT = {
  title: "Make a Difference Today",
  subtitle: "Your donation can change lives. Support causes you care about and see the impact of your generosity.",
  backgroundImage: "/images/donateBanner.jpg",
  stats: {
    raised: "$2.5M+",
    donors: "12K+",
    charities: "50+"
  }
};

const Donate: React.FC = () => {
  const {
    donationAmount,
    customAmount,
    selectedCharity,
    isRecurring,
    recurringFrequency,
    paymentMethod,
    selectedCategory,
    handleAmountSelect,
    handleCustomAmountChange,
    handleCharitySelect,
    setSelectedCategory,
    setIsRecurring,
    setRecurringFrequency,
    setPaymentMethod
  } = useDonation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <main className="flex-grow">
        <DonateHero 
          title={HERO_CONTENT.title}
          subtitle={HERO_CONTENT.subtitle}
          backgroundImage={HERO_CONTENT.backgroundImage}
          stats={HERO_CONTENT.stats}
        />        
        
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