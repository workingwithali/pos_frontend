import { z } from "zod";

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
}



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

export const SaleItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative(),
});

export const SaleSchema = z.object({
  id: z.string().optional(),

  invoiceNumber: z.string().min(1),

  subtotal: z.number().nonnegative(),
  discountAmount: z.number().nonnegative(),
  taxAmount: z.number().nonnegative(),
  totalAmount: z.number().nonnegative(),

  paymentMethod: z.nativeEnum(PaymentMethod),

  tenantId: z.string(),

  createdAt: z.date().optional(),

  items: z.array(SaleItemSchema).min(1),
});
export type Sale = z.infer<typeof SaleSchema>;
export type SaleItem = z.infer<typeof SaleItemSchema>;