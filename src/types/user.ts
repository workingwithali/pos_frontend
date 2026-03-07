import { z } from "zod";

export const UserProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
