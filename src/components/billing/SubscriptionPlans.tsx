import { Check, Star, Zap, Crown, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

interface SubscriptionPlansProps {
  currentPlan?: string;
  onSelectPlan: (planId: string) => void;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out",
    price: 0,
    interval: "month",
    icon: <Star className="h-6 w-6" />,
    features: [
      "1 Store location",
      "Up to 100 products",
      "Basic POS features",
      "Email support",
      "7-day data retention",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    description: "For small businesses",
    price: 29,
    interval: "month",
    icon: <Zap className="h-6 w-6" />,
    features: [
      "Up to 3 locations",
      "Up to 1,000 products",
      "Advanced POS features",
      "Inventory management",
      "Priority email support",
      "30-day data retention",
      "Basic reports",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing businesses",
    price: 79,
    interval: "month",
    icon: <Crown className="h-6 w-6" />,
    popular: true,
    features: [
      "Up to 10 locations",
      "Unlimited products",
      "All POS features",
      "Advanced inventory",
      "24/7 phone support",
      "1-year data retention",
      "Advanced analytics",
      "Staff management",
      "API access",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 199,
    interval: "month",
    icon: <Building2 className="h-6 w-6" />,
    features: [
      "Unlimited locations",
      "Unlimited products",
      "Custom integrations",
      "Dedicated support",
      "Unlimited data retention",
      "Custom reports",
      "Multi-currency support",
      "White-label options",
      "SLA guarantee",
      "On-premise option",
    ],
  },
];

export function SubscriptionPlans({ currentPlan = "free", onSelectPlan }: SubscriptionPlansProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground">
          Select the perfect plan for your business needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          return (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${
                plan.popular ? "border-primary shadow-lg" : ""
              } ${isCurrent ? "bg-muted/50" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={isCurrent ? "outline" : plan.popular ? "default" : "outline"}
                  disabled={isCurrent}
                  onClick={() => onSelectPlan(plan.id)}
                >
                  {isCurrent ? "Current Plan" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
