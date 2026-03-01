import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  categoryId: z.string().optional(),

  cost: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  lowStockThreshold: z.coerce.number().min(0).default(5),
});

export type Product = z.infer<typeof ProductSchema>;