import { z } from "zod";

export const TenantSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  address: z.string().min(1, "Address is required").optional().nullable(),
  currency: z.enum(["USD", "EUR", "GBP", "MAD", "PKR"]).default("USD"),
  taxRate: z.number().min(0).max(100).default(0),
});

export type Tenant = z.infer<typeof TenantSchema>;