// src/store/settingsStore.ts

import { create } from "zustand";
import { Settings } from "@/types/settings";

type SettingsState = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    shopName: "",
    address: "",
    currency: "USD",
    taxRate: 0,
  },
  setSettings: (settings) => set({ settings }),
}));