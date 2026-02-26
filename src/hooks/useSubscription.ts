// src/hooks/useSubscription.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Tenant } from "@/types/tenant";

export const useTenant = () => {
  return useQuery<Tenant>({
    queryKey: ["tenant"],
    queryFn: async () => {
      const { data } = await api.get("/tenant");
      return data;
    },
  });
};

export const useActivateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/subscription/activate");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenant"] });
    },
  });
};