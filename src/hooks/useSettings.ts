"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import  api  from "@/lib/api";
import { Settings } from "@/types/settings";

export const useSettings = () => {
  return useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data } = await api.get("/settings");
      return data;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Settings) => {
      const { data } = await api.put("/settings", settings);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};