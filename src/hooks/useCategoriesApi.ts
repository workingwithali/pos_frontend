import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Category } from "@/types/category";

// Keys for caching
export const categoryKeys = {
    all: ["categories"] as const,
    lists: () => [...categoryKeys.all, "list"] as const,
    details: () => [...categoryKeys.all, "detail"] as const,
    detail: (id: string) => [...categoryKeys.details(), id] as const,
};

// --- GET All Categories ---
export const useGetCategories = () => {
    return useQuery({
        queryKey: categoryKeys.lists(),
        queryFn: async (): Promise<Category[]> => {
            const { data } = await api.get("/categories");
            return data;
        },
    });
};

// --- GET Single Category ---
export const useGetCategory = (id: string, enabled = true) => {
    return useQuery({
        queryKey: categoryKeys.detail(id),
        queryFn: async (): Promise<Category> => {
            const { data } = await api.get(`/categories/${id}`);
            return data;
        },
        enabled: !!id && enabled, // Only run query if we have an ID
    });
};

// --- POST Create Category ---
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory: Omit<Category, "id">): Promise<Category> => {
            const { data } = await api.post("/categories", newCategory);
            return data;
        },
        onSuccess: () => {
            // Invalidate the categories list to refetch
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
        },
    });
};

// --- PATCH Update Category ---
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...updateData }: Partial<Category> & { id: string }): Promise<Category> => {
            const { data } = await api.patch(`/categories/${id}`, updateData);
            return data;
        },
        onSuccess: (data, variables) => {
            // Invalidate lists and the specific detail query
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
            queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
        },
    });
};

// --- DELETE Category ---
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<void> => {
            await api.delete(`/categories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
        },
    });
};
