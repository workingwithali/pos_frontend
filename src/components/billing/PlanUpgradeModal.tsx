import { ArrowUp, ArrowDown, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PlanUpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan: string;
  newPlan: string;
  onConfirm: () => void;
}

const planDetails: Record<string, { price: number; features: string[] }> = {
  free: {
    price: 0,
    features: ["1 Store location", "Up to 100 products", "Basic POS features"],
  },
  basic: {
    price: 29,
    features: ["Up to 3 locations", "Up to 1,000 products", "Advanced POS features", "Inventory management"],
  },
  pro: {
    price: 79,
    features: ["Up to 10 locations", "Unlimited products", "All POS features", "Advanced analytics", "API access"],
  },
  enterprise: {
    price: 199,
    features: ["Unlimited locations", "Unlimited products", "Custom integrations", "Dedicated support", "SLA guarantee"],
  },
};

const planOrder = ["free", "basic", "pro", "enterprise"];

export function PlanUpgradeModal({
  open,
  onOpenChange,
  currentPlan,
  newPlan,
  onConfirm,
}: PlanUpgradeModalProps) {
  const currentDetails = planDetails[currentPlan];
  const newDetails = planDetails[newPlan];
  
  // Guard against undefined plan details
  if (!currentDetails || !newDetails) {
    return null;
  }
  
  const isUpgrade = planOrder.indexOf(newPlan) > planOrder.indexOf(currentPlan);
  const priceDiff = newDetails.price - currentDetails.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isUpgrade ? (
              <ArrowUp className="h-5 w-5 text-primary" />
            ) : (
              <ArrowDown className="h-5 w-5 text-orange-500" />
            )}
            {isUpgrade ? "Upgrade" : "Downgrade"} to {newPlan.charAt(0).toUpperCase() + newPlan.slice(1)}
          </DialogTitle>
          <DialogDescription>
            {isUpgrade
              ? "Unlock more features and grow your business"
              : "You'll lose access to some features"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Price Change */}
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Plan</span>
              <span className="font-medium">${currentDetails.price}/month</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Plan</span>
              <span className="font-medium">${newDetails.price}/month</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {isUpgrade ? "Additional Cost" : "Savings"}
              </span>
              <span className={`font-bold ${isUpgrade ? "text-primary" : "text-green-600"}`}>
                {isUpgrade ? "+" : "-"}${Math.abs(priceDiff)}/month
              </span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-medium mb-2">
              {isUpgrade ? "New features you'll get:" : "Features you'll keep:"}
            </h4>
            <ul className="space-y-1">
              {newDetails.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {!isUpgrade && (
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-200">
              Note: Downgrading will take effect at the end of your current billing period.
              You won't lose access to features until then.
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={isUpgrade ? "default" : "outline"}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {isUpgrade ? "Upgrade Now" : "Confirm Downgrade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
