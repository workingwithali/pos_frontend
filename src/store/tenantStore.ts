// src/store/tenantStore.ts

import { create } from "zustand";
import { Tenant } from "@/types/tenant";

type TenantState = {
  tenant: Tenant | null;
  setTenant: (tenant: Tenant) => void;
};

export const useTenantStore = create<TenantState>((set) => ({
  tenant: null,
  setTenant: (tenant) => set({ tenant }),
}));

