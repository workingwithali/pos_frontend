"use client";

import { useEffect, useState } from "react";
import { User, Mail, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { useTenantQuery, useUpdateTenantMutation } from "@/hooks/useTenant";
import { Tenant } from "@/types/tenant";

export default function ProfilePage() {
  const { data: tenant, isLoading, error } = useTenantQuery();
  const updateTenant = useUpdateTenantMutation();

  const [form, setForm] = useState<Pick<Tenant, "id"> & {
    email?: string;
    ownerName?: string;
  }>({
    id: "",
    ownerName: "",
    email: "",
  });

  useEffect(() => {
    if (tenant) {
      setForm({
        id: tenant.id,
        ownerName: (tenant as any).ownerName ?? "",
        email: (tenant as any).email ?? "",
      });
    }
  }, [tenant]);

  const initials = (form.ownerName || "A")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = () => {
    updateTenant.mutate(form, {
      onSuccess: () => {
        toast.success("Profile updated", {
          description: "Your changes have been saved.",
        });
      },
      onError: () => {
        toast.error("Update failed", {
          description: "Something went wrong",
        });
      },
    });
  };

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Failed to load profile</p>;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="rounded-2xl bg-card p-6 shadow space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
              {initials}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-secondary border-2 border-card">
              <Camera className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Profile picture coming soon
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Full Name
            </Label>
            <Input
              value={form.ownerName}
              onChange={(e) =>
                setForm((f) => ({ ...f, ownerName: e.target.value }))
              }
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email
            </Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
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
          {updateTenant.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Info Card */}
      <div className="rounded-2xl bg-muted/50 p-4 text-sm space-y-1">
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span className="capitalize">
            {tenant?.subscriptionStatus}
          </span>
        </p>
        <p>
          <span className="font-medium">Trial Ends:</span>{" "}
          {tenant?.trialEndsAt ?? "N/A"}
        </p>
      </div>
    </div>
  );
}