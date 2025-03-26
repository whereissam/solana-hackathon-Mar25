// src/store/donationStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DonationRecord {
  id?: string;
  beneficiaryId: number;
  amount: number;
  lamports: number;
  signature: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
}

interface DonationState {
  currentDonation: DonationRecord | null;
  recentDonations: DonationRecord[];
  isProcessing: boolean;
  error: string | null;
  
  // Actions
  startDonation: (beneficiaryId: number, amount: number) => void;
  completeDonation: (signature: string, lamports: number) => void;
  failDonation: (error: string) => void;
  clearCurrentDonation: () => void;
  resetError: () => void;
}

export const useDonationStore = create<DonationState>()(
  devtools(
    (set) => ({
      currentDonation: null,
      recentDonations: [],
      isProcessing: false,
      error: null,

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
          error: null,
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
          };
        }),

      failDonation: (error: string) =>
        set((state) => ({
          currentDonation: state.currentDonation
            ? { ...state.currentDonation, status: 'failed' as const }
            : null,
          isProcessing: false,
          error,
        })),

      clearCurrentDonation: () => set({ currentDonation: null }),
      
      resetError: () => set({ error: null }),
    }),
    { name: 'donation-store' }
  )
);

export default useDonationStore;