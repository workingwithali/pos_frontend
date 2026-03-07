import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Tenant, TenantSchema } from "@/types/tenant";
import { useTenantStore } from "@/store/tenantStore";

// ✅ Fetch tenant profile
export const useTenantQuery = () => {
  const setTenant = useTenantStore((state) => state.setTenant);

  const query = useQuery<Tenant>({
    queryKey: ["tenant"],
    queryFn: async () => {
      const res = await api.get("/tenants/me");

      // 🔐 Zod validation
      const parsed = TenantSchema.safeParse(res.data);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid tenant data from API");
      }

      return parsed.data;
    },
  });

  if (query.data) {
    setTenant(query.data);
  }

  return query;
};

// ✅ Update tenant (example: subscription status)
export const useUpdateTenantMutation = () => {
  const setTenant = useTenantStore((state) => state.setTenant);

  return useMutation({
    mutationFn: async (payload: Partial<Tenant>) => {
      const res = await api.patch("/tenants/me", payload);

      const parsed = TenantSchema.safeParse(res.data);
      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid tenant data from API");
      }

      return parsed.data;
    },
    onSuccess: (tenant) => {
      setTenant(tenant);
    },
  });
};