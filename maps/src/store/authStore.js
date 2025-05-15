// src/store/authStore.js
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setCredentials: (userData) => set({ 
        user: userData.user, 
        token: userData.token, 
        isAuthenticated: true 
      }),
      clearCredentials: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);