export interface DonationOption {
  id: number;
  name: string;
  description: string;
  amount: number;
  icon: string;
}

export interface DonorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isAnonymous: boolean;
}

export interface PaymentMethod {
  id: number;
  name: 'Credit Card' | 'PayPal' | 'Cryptocurrency' | 'Bank Transfer';
  icon: string;
  description: string;
  isActive: boolean;
}

export interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  isAnonymous: boolean;
}