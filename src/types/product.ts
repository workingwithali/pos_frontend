// src/types/product.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  categoryId: z.string(),
  costPrice: z.number().min(0),
  price: z.number().min(0),
  stock: z.number().min(0),
  lowStockThreshold: z.number().default(5),
});

export type Product = z.infer<typeof ProductSchema>;