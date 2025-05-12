// Types for Donate component data

export interface DonationOption {
  id: number;
  name: string;
  amount: number;
  description: string;
  icon: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
}