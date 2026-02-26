// src/types/settings.ts

import { z } from "zod";

export const SettingsSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  address: z.string().min(1, "Address is required"),
  currency: z.enum(["USD", "EUR", "GBP", "MAD"]),
  taxRate: z.number().min(0).max(100),
});

export type Settings = z.infer<typeof SettingsSchema>;