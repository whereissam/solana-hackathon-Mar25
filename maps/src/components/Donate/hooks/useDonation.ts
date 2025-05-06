import { useState, useEffect } from 'react';

export const useDonation = () => {
  // State declarations
  const [donationAmount, setDonationAmount] = useState<number | string>(25);
  const [customAmount, setCustomAmount] = useState<boolean>(false);
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [recurringFrequency, setRecurringFrequency] = useState<string>("monthly");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Handle profile dropdown outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileIcon = document.getElementById("profileIcon");
      const profileDropdown = document.getElementById("profileDropdown");
      
      if (
        profileIcon &&
        profileDropdown &&
        !profileIcon.contains(event.target as Node) &&
        !profileDropdown.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler functions
  const handleAmountSelect = (amount: number) => {
    setCustomAmount(false);
    setDonationAmount(amount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setDonationAmount(value);
    }
  };

  const handleCharitySelect = (charityName: string) => {
    setSelectedCharity(charityName);
  };

  // Return all state and handlers
  return {
    // State values
    donationAmount,
    customAmount,
    selectedCharity,
    isRecurring,
    recurringFrequency,
    paymentMethod,
    showProfileMenu,
    selectedCategory,
    
    // Handler functions
    handleAmountSelect,
    handleCustomAmountChange,
    handleCharitySelect,
    
    // State setters
    setShowProfileMenu,
    setSelectedCategory,
    setIsRecurring,
    setRecurringFrequency,
    setPaymentMethod,
    setCustomAmount
  };
};