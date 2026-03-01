// src/hooks/useSales.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Sale } from "@/types/sale";

export const salesKeys = {
  all: ["sales"] as const,
  lists: () => [...salesKeys.all, "list"] as const,
  details: () => [...salesKeys.all, "detail"] as const,
  detail: (id: string) => [...salesKeys.details(), id] as const,
  invoices: () => [...salesKeys.all, "invoice"] as const,
  invoice: (id: string) => [...salesKeys.invoices(), id] as const,
};

// --- GET All Sales ---
export const useGetSales = () => {
  return useQuery<Sale[]>({
    queryKey: salesKeys.lists(),
    queryFn: async () => {
      const { data } = await api.get("/sales");
      return data;
    },
  });
};

// --- GET Single Sale ---
export const useGetSale = (id: string, enabled = true) => {
  return useQuery<Sale>({
    queryKey: salesKeys.detail(id),
    queryFn: async () => {
      const { data } = await api.get(`/sales/${id}`);
      return data;
    },
    enabled: !!id && enabled,
  });
};

// --- GET Invoice (PDF/Blob/HTML) ---
export const useGetInvoice = (id: string, enabled = false) => {
  return useQuery({
    queryKey: salesKeys.invoice(id),
    queryFn: async () => {
      // Could be returning HTML, a PDF blob, or just receipt data.
      // Adjust standard type based on actual structure.
      const { data } = await api.get(`/sales/${id}/invoice`);
      return data;
    },
    enabled: !!id && enabled,
  });
};

// --- POST Create Sale ---
export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // payload matches what the API expects for creating a sale
    // Typically items [], paymentMethod, etc.
    mutationFn: async (payload: any): Promise<Sale> => {
      const { data } = await api.post("/sales", payload);
      return data;
    },
    onSuccess: () => {
      // Invalidate the sales list to refetch
      queryClient.invalidateQueries({ queryKey: salesKeys.lists() });
    },
  });
};