"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionPlans } from "@/components/billing/SubscriptionPlans";
import { BillingDashboard } from "@/components/billing/BillingDashboard";
import { PlanUpgradeModal } from "@/components/billing/PlanUpgradeModal";
import { useToast } from "@/hooks/use-toast";
import  Link  from "next/link";

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("basic");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();

  const handleSelectPlan = (planId: string) => {
    if (planId !== currentPlan) {
      setSelectedPlan(planId);
      setShowUpgradeModal(true);
    }
  };

  const handleConfirmPlanChange = () => {
    if (selectedPlan) {
      const isUpgrade = ["pro", "enterprise"].includes(selectedPlan) && ["free", "basic"].includes(currentPlan);
      setCurrentPlan(selectedPlan);
      toast({
        title: isUpgrade ? "Plan Upgraded!" : "Plan Changed",
        description: `Your subscription has been ${isUpgrade ? "upgraded" : "changed"} to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Subscription & Billing</h1>
              <p className="text-muted-foreground">Manage your subscription and billing details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Billing Dashboard</TabsTrigger>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <BillingDashboard />
          </TabsContent>

          <TabsContent value="plans">
            <SubscriptionPlans currentPlan={currentPlan} onSelectPlan={handleSelectPlan} />
          </TabsContent>
        </Tabs>
      </div>

      <PlanUpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        currentPlan={currentPlan}
        newPlan={selectedPlan || ""}
        onConfirm={handleConfirmPlanChange}
      />
    </div>
  );
}
