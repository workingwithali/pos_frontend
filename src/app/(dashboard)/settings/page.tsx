"use client";

import { useEffect, useState } from "react";
import { useTenantQuery, useUpdateTenantMutation } from "@/hooks/useTenant";
import { useTenantStore } from "@/store/tenantStore";
import { TenantSchema, Tenant } from "@/types/tenant";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

export default function SettingsPage() {
  const { data, isLoading, error } = useTenantQuery();
  const updateTenant = useUpdateTenantMutation();

  const tenant = useTenantStore((s) => s.tenant);

  const [form, setForm] = useState<Partial<Tenant>>({});

  // Sync API -> Local form
  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  const handleSave = async () => {
    const parsed = TenantSchema.safeParse(form);

    if (!parsed.success) {
      toast.error("Validation error", {
        description: parsed.error.issues[0].message,
      });
      return;
    }

    try {
      await updateTenant.mutateAsync(parsed.data);

      toast.success("Settings saved", {
        description: "Your shop settings have been updated.",
      });
    } catch (err: any) {
      toast.error("Update failed", {
        description:
          err?.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading settings...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load settings</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="mx-auto max-w-lg rounded-2xl bg-card p-6 shadow space-y-5">
        {/* Shop Name */}
        <div className="space-y-2">
          <Label>Shop Name</Label>
          <Input
            value={form.name || ""}
            onChange={(e) =>
              setForm((s) => ({ ...s, name: e.target.value }))
            }
            className="rounded-xl"
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            value={form.address || ""}
            onChange={(e) =>
              setForm((s) => ({ ...s, address: e.target.value }))
            }
            className="rounded-xl"
          />
        </div>

        {/* Currency + Tax */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Currency</Label>
            <Select
              value={form.currency}
              onValueChange={(v) =>
                setForm((s) => ({ ...s, currency: v as Tenant["currency"] }))
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="MAD">MAD (د.م)</SelectItem>
                <SelectItem value="PKR">PKR (₨)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tax %</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={form.taxRate || 0}
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  taxRate: Number(e.target.value) || 0,
                }))
              }
              className="rounded-xl"
            />
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={updateTenant.isPending}
          className="w-full rounded-xl"
        >
          {updateTenant.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}