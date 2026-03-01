import { z } from "zod";

export const SaleItemSchema = z.object({
  productId: z.string().optional(),
  productName: z.string().optional(),
  name: z.string().optional(),
  quantity: z.number(),
  price: z.number(),
});

export const SaleSchema = z.object({
  id: z.string(),
  date: z.string(),
  items: z.array(SaleItemSchema),
  subtotal: z.number().optional(),
  discount: z.number().optional(),
  tax: z.number().optional(),
  paymentMethod: z.string(),
  total: z.number(),
});

export type Sale = z.infer<typeof SaleSchema>;