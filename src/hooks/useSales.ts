"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Sale } from "@/types/sale";

export const useSales = () => {
  return useQuery<Sale[]>({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data } = await api.get("/sales");
      return data;
    },
  });
};