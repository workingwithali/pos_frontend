// src/hooks/useProducts.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import  api  from "@/lib/api";
import { Product } from "@/types/product";

// Keys for caching
export const productKeys = {
    all: ["products"] as const,
    lists: () => [...productKeys.all, "list"] as const,
    details: () => [...productKeys.all, "detail"] as const,
    detail: (id: string) => [...productKeys.details(), id] as const,
};

// --- GET All Products ---
export const useGetProducts = () => {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: async (): Promise<Product[]> => {
            const { data } = await api.get("/products");
            return data;
        },
    });
};

// --- GET Single Product ---
export const useGetProduct = (id: string, enabled = true) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: async (): Promise<Product> => {
            const { data } = await api.get(`/products/${id}`);
            return data;
        },
        enabled: !!id && enabled, // Only run query if we have an ID
    });
};

// --- POST Create Product ---
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProduct: Omit<Product, "id">): Promise<Product> => {
            const { data } = await api.post("/products", newProduct);
            return data;
        },
        onSuccess: () => {
            // Invalidate the products list to refetch
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};

// --- PATCH Update Product ---
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...updateData }: Partial<Product> & { id: string }): Promise<Product> => {
            const { data } = await api.patch(`/products/${id}`, updateData);
            return data;
        },
        onSuccess: (data, variables) => {
            // Invalidate lists and the specific detail query
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
            queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
        },
    });
};

// --- DELETE Product ---
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<void> => {
            await api.delete(`/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        },
    });
};