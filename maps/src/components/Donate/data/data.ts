import { DonationOption, PaymentMethod } from './types';
import { Charity } from '../CharityCard';

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


export const charities: Charity[] = [
  {
    id: 1,
    name: "Save the Children Berlin",
    category: "Children",
    rating: 4.8,
    location: "Berlin, Germany",
    longitude: 13.4050,
    latitude: 52.52,
    description: "Providing essential support and resources to children in need across Berlin.",
    impact: "Helped over 10,000 children in the past year",
    certifications: ["Child Safety Certified", "Transparency Award 2023"],
    imagePath: "/images/charities/save-children-berlin.jpg"
  },
  {
    id: 2,
    name: "Green Berlin Initiative",
    category: "Environment",
    rating: 4.5,
    location: "Berlin, Germany",
    longitude: 13.4060,
    latitude: 52.53,
    description: "Working towards a sustainable and green future for Berlin.",
    impact: "Planted 50,000 trees and reduced carbon emissions by 15%",
    certifications: ["Environmental Excellence", "Green City Partner"],
    imagePath: "/images/charities/green-berlin.jpg"
  },
  {
    id: 3,
    name: "Berlin Health Foundation",
    category: "Healthcare",
    rating: 4.7,
    location: "Berlin, Germany",
    longitude: 13.4070,
    latitude: 52.51,
    description: "Providing accessible healthcare services to underserved communities.",
    impact: "Provided medical care to 25,000 patients",
    certifications: ["Healthcare Quality Certified", "Community Impact Award"],
    imagePath: "/images/charities/health-foundation.jpg"
  }
];