import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  shopName: z.string().min(2, "Shop name is required"),
  OwnerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // currency: z.string().min(1, "Currency is required"),
  taxRate: z.number().min(0).max(100),
})

export type RegisterInput = z.infer<typeof signupSchema>