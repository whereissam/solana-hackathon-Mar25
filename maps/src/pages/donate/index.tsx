import React from 'react';
import Head from 'next/head';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import DonateHero from '@/components/Donate/DonateHero';
import CategoriesSection from '@/components/Donate/CategoriesSection';
import CharitiesSection from '@/components/Donate/CharitiesSection';
import DonationForm from '@/components/Donate/DonationForm';
import PaymentSection from '@/components/Donate/PaymentSection';
import ImpactSection from '@/components/Donate/ImpactSection';
import { useDonation } from '@/components/Donate/hooks/useDonation';

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

const DonatePage: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
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
    <div className="min-h-screen bg-base-200">
      <Head>
        <title>Unify Compass - Make a Donation</title>
        <meta
          property="og:title"
          content="Unify Compass - Make a Donation"
          key="title"
        />
        <meta
          name="description"
          content="Support causes you care about with a donation through Unify Compass. Your generosity helps make a difference in communities worldwide."
        />
      </Head>
      
      <Header 
        showProfileMenu={showProfileMenu} 
        setShowProfileMenu={setShowProfileMenu}
        title="Unify Compass"
      />
      
      <main className="pt-6 pb-16">
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
      </main>
      
      <Footer />
    </div>
  );
};

export default DonatePage;