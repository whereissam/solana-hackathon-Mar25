export interface Beneficiary {
    first_name: string;
    last_name: string;
    email: string;
    id?: string | number;
  }
  
  export interface FormData {
    first_name: string;
    last_name: string;
    email: string;
  }
  
  export interface FormErrors {
    first_name: string;
    last_name: string;
    email: string;
  }
  
  export interface CryptoDonationResult {
    createCryptoDonation: {
      id: string;
      amount: number;
      currency: string;
      status: string;
    };
  }