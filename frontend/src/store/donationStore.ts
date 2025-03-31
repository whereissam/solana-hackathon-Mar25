// src/store/donationStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type DonationStatus = 'pending' | 'completed' | 'failed' | 'idle';

interface DonationRecord {
  id?: string;
  beneficiaryId: number;
  amount: number;
  lamports: number;
  signature: string;
  status: DonationStatus;
  timestamp: number;
}

interface DonationState {
  currentDonation: DonationRecord | null;
  recentDonations: DonationRecord[];
  isProcessing: boolean;
  status: DonationStatus | null;
  error: string | null;
  errorMessage: string | null;
  
  // Actions
  startDonation: (beneficiaryId: number, amount: number) => void;
  completeDonation: (signature: string, lamports: number) => void;
  failDonation: (error: string) => void;
  clearCurrentDonation: () => void;
  resetDonation: () => void;
  resetError: () => void;
}

export const useDonationStore = create<DonationState>()(
  devtools(
    (set) => ({
      currentDonation: null,
      recentDonations: [],
      isProcessing: false,
      status: null,
      error: null,
      errorMessage: null,

      startDonation: (beneficiaryId: number, amount: number) => 
        set({
          currentDonation: {
            beneficiaryId,
            amount,
            lamports: 0, // Will be set later
            signature: '',
            status: 'pending',
            timestamp: Date.now(),
          },
          isProcessing: true,
          status: 'pending',
          error: null,
          errorMessage: null,
        }),

      completeDonation: (signature: string, lamports: number) => 
        set((state) => {
          if (!state.currentDonation) return state;
          
          const completedDonation = {
            ...state.currentDonation,
            signature,
            lamports,
            status: 'completed' as const,
          };
          
          return {
            currentDonation: completedDonation,
            recentDonations: [completedDonation, ...state.recentDonations.slice(0, 4)],
            isProcessing: false,
            status: 'completed',
            error: null,
            errorMessage: null,
          };
        }),

      failDonation: (error: string) =>
        set((state) => ({
          currentDonation: state.currentDonation
            ? { ...state.currentDonation, status: 'failed' as const }
            : null,
          isProcessing: false,
          status: 'failed',
          error: 'donation_failed',
          errorMessage: error,
        })),

      clearCurrentDonation: () => 
        set({ 
          currentDonation: null,
          isProcessing: false 
        }),
      
      resetDonation: () => 
        set({
          currentDonation: null,
          isProcessing: false,
          status: 'idle',
          error: null,
          errorMessage: null
        }),
      
      resetError: () => 
        set({ 
          error: null, 
          errorMessage: null 
        }),
    }),
    { name: 'donation-store' }
  )
);

export default useDonationStore;