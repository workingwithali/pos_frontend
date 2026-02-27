"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    shopName?: string;
}

export const useAuthUser = () => {
    return useQuery<User>({
        queryKey: ["authUser"],
        queryFn: async () => {
            const res = await api.get("/auth/me");
            return res.data;
        },
        retry: false, // Don't retry if not authenticated
    });
};
