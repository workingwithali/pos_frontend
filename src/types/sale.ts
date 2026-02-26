import { z } from "zod";

export const SaleItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const SaleSchema = z.object({
  id: z.string(),
  date: z.string(),
  items: z.array(SaleItemSchema),
  paymentMethod: z.string(),
  total: z.number(),
});

export type Sale = z.infer<typeof SaleSchema>;