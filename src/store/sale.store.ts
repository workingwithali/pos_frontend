import { create } from "zustand";

type SaleState = {
  currency: string;
  setCurrency: (currency: string) => void;
};

export const useSaleStore = create<SaleState>((set) => ({
  currency: "USD",
  setCurrency: (currency) => set({ currency }),
}));