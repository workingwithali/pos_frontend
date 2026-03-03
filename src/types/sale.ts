import { z } from "zod";

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
}

export const SaleItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  price: z.number().optional(), // Frontend may still use this for UI, but backend only needs productId/quantity for create
  productName: z.string().optional(),
});

export const CreateSaleSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  discountPercent: z.number().min(0).default(0),
  paymentMethod: z.nativeEnum(PaymentMethod),
});

export type CreateSaleDto = z.infer<typeof CreateSaleSchema>;

export const SaleSchema = z.object({
  id: z.string(),
  date: z.string(),
  items: z.array(
    z.object({
      productId: z.string().optional(),
      productName: z.string().optional(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
  subtotal: z.number().optional(),
  discount: z.number().optional(),
  tax: z.number().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  total: z.number(),
});

export type Sale = z.infer<typeof SaleSchema>;