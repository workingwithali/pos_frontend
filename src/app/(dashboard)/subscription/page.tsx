// src/app/(dashboard)/subscription/page.tsx

"use client";

import { useEffect } from "react";
import { useTenant, useActivateSubscription } from "@/hooks/useSubscription";
import { useTenantStore } from "@/store/tenantStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Check } from "lucide-react";
import { differenceInDays } from "date-fns";
import { toast } from "sonner";

const SubscriptionPage = () => {
  const { data, isLoading } = useTenant();
  const { mutateAsync, isPending } = useActivateSubscription();

  const tenant = useTenantStore((s) => s.tenant);
  const setTenant = useTenantStore((s) => s.setTenant);

  useEffect(() => {
    if (data) setTenant(data);
  }, [data, setTenant]);

  const trialDays =
    tenant?.trialEndsAt
      ? differenceInDays(new Date(tenant.trialEndsAt), new Date())
      : 0;

  const handleActivate = async () => {
    try {
      await mutateAsync();
      toast.success("Subscription Activated", {
        description: "Your plan is now active.",
      });
    } catch {
      toast.error("Error", {
        description: "Could not activate subscription.",
      });
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">
        Subscription
      </h1>

      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-card p-8 shadow-md text-center space-y-6">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <CreditCard className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-card-foreground">
              Basic Plan
            </h2>
            <p className="mt-1 text-3xl font-bold text-card-foreground">
              $29
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </p>
          </div>

          <Badge
            variant={
              tenant?.subscriptionStatus === "active"
                ? "default"
                : tenant?.subscriptionStatus === "trial"
                ? "outline"
                : "destructive"
            }
            className="rounded-lg text-sm px-3 py-1"
          >
            {tenant?.subscriptionStatus === "trial"
              ? `Trial · ${trialDays} days left`
              : tenant?.subscriptionStatus === "active"
              ? "Active"
              : "Expired"}
          </Badge>

          <ul className="space-y-2 text-left text-sm text-card-foreground">
            {[
              "Unlimited products",
              "POS Terminal",
              "Sales analytics",
              "Receipt printing",
              "Email support",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            className="w-full rounded-xl h-11 text-base font-semibold"
            disabled={
              tenant?.subscriptionStatus === "active" || isPending
            }
            onClick={handleActivate}
          >
            {tenant?.subscriptionStatus === "active"
              ? "Already Active"
              : isPending
              ? "Activating..."
              : "Activate Plan"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;