// Consolidated data from Donate component

import { DonationOption, PaymentMethod } from './types';

export const donationOptions: DonationOption[] = [
  {
    id: 1,
    name: 'Basic Support',
    amount: 25,
    description: 'Provides essential resources for one person in need',
    icon: 'heart'
  },
  {
    id: 2,
    name: 'Family Support',
    amount: 50,
    description: 'Helps a family with food and supplies for a week',
    icon: 'users'
  },
  {
    id: 3,
    name: 'Community Builder',
    amount: 100,
    description: 'Supports community development projects',
    icon: 'home'
  },
  {
    id: 4,
    name: 'Sustainability Champion',
    amount: 250,
    description: 'Funds sustainable initiatives for long-term impact',
    icon: 'leaf'
  },
  {
    id: 5,
    name: 'Custom Amount',
    amount: 0,
    description: 'Choose your own donation amount',
    icon: 'edit'
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    name: 'Credit Card',
    icon: 'credit-card',
    description: 'Pay securely with your credit card',
    isActive: true
  },
  {
    id: 2,
    name: 'PayPal',
    icon: 'paypal',
    description: 'Fast and secure payment with PayPal',
    isActive: true
  },
  {
    id: 3,
    name: 'Cryptocurrency',
    icon: 'bitcoin',
    description: 'Donate using cryptocurrency',
    isActive: true
  },
  {
    id: 4,
    name: 'Bank Transfer',
    icon: 'university',
    description: 'Direct bank transfer to our account',
    isActive: false
  }
];