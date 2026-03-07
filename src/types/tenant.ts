// src/types/tenant.ts

import { z } from "zod";

export const TenantSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Shop name is required"),
  address: z.string().min(1, "Address is required").optional(),
  currency: z.enum(["USD", "EUR", "GBP", "MAD", "PKR"]).default("USD"),
  taxRate: z.number().min(0).max(100).default(0),
  subscriptionStatus: z.enum(["trial", "active", "expired"]).optional(),
  trialEndsAt: z.string().nullable().optional(),
});

export type Tenant = z.infer<typeof TenantSchema>;