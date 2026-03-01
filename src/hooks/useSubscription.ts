// src/hooks/useSubscription.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SubscriptionStatus {
  id: string;
  status: "active" | "trial" | "expired";
  trialEndsAt: string | null;
  subscriptionEndsAt: string | null;
}

export const useSubscriptionStatus = () => {
  return useQuery<SubscriptionStatus>({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      // Endpoint changed to GET /subscriptions/status
      const { data } = await api.get("/subscriptions/status");
      return data;
    },
  });
};

export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Endpoint changed to POST /subscriptions/subscribe
      const { data } = await api.post("/subscriptions/subscribe");
      return data;
    },
    onSuccess: () => {
      // Invalidating the specific query
      queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });

      // Keep invalidating tenant in case the tenant endpoint also relies on this information
      queryClient.invalidateQueries({ queryKey: ["tenant"] });
    },
  });
};