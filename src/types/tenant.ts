// src/types/tenant.ts

import { z } from "zod";

export const TenantSchema = z.object({
  id: z.string(),
  subscriptionStatus: z.enum(["trial", "active", "expired"]),
  trialEndsAt: z.string().nullable(),
});

export type Tenant = z.infer<typeof TenantSchema>;