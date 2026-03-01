import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Rehydrate token from localStorage
  accessToken:
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,

  setAccessToken: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
    set({ accessToken: token });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    set({ accessToken: null });
  },
}));