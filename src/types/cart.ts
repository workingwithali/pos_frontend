import { z } from "zod";
import { ProductSchema } from "./product";

export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().min(1),
});

export type CartItem = z.infer<typeof CartItemSchema>;