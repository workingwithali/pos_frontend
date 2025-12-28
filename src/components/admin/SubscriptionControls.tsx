import { useState } from "react";
import { CreditCard, Calendar, RefreshCw, Ban, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionAction {
  id: string;
  tenantName: string;
  action: string;
  oldPlan?: string;
  newPlan?: string;
  timestamp: string;
  performedBy: string;
}

const recentActions: SubscriptionAction[] = [
  {
    id: "1",
    tenantName: "Coffee Corner",
    action: "Plan Upgraded",
    oldPlan: "Basic",
    newPlan: "Pro",
    timestamp: "2024-01-20 14:30",
    performedBy: "admin@saas.com",
  },
  {
    id: "2",
    tenantName: "Fresh Mart",
    action: "Trial Extended",
    timestamp: "2024-01-19 10:15",
    performedBy: "support@saas.com",
  },
  {
    id: "3",
    tenantName: "Urban Boutique",
    action: "Subscription Cancelled",
    timestamp: "2024-01-18 16:45",
    performedBy: "admin@saas.com",
  },
];

export function SubscriptionControls() {
  const [selectedTenant, setSelectedTenant] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [extendDays, setExtendDays] = useState("");
  const { toast } = useToast();

  const handlePlanChange = () => {
    toast({
      title: "Plan Updated",
      description: `Subscription plan changed to ${selectedPlan}`,
    });
  };

  const handleExtendTrial = () => {
    toast({
      title: "Trial Extended",
      description: `Trial extended by ${extendDays} days`,
    });
    setExtendDays("");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial Accounts</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">8 expiring this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Pending renewal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <Ban className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">-0.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage tenant subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Tenant</Label>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a tenant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coffee-corner">Coffee Corner</SelectItem>
                  <SelectItem value="tech-store">Tech Store Plus</SelectItem>
                  <SelectItem value="fresh-mart">Fresh Mart</SelectItem>
                  <SelectItem value="urban-boutique">Urban Boutique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={!selectedTenant}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Change Plan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Subscription Plan</DialogTitle>
                    <DialogDescription>
                      Select a new plan for this tenant.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>New Plan</Label>
                      <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="basic">Basic - $29/mo</SelectItem>
                          <SelectItem value="pro">Pro - $79/mo</SelectItem>
                          <SelectItem value="enterprise">Enterprise - $199/mo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handlePlanChange}>Confirm Change</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={!selectedTenant}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Extend Trial
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Extend Trial Period</DialogTitle>
                    <DialogDescription>
                      Add extra days to the trial period.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Days to Add</Label>
                      <Input
                        type="number"
                        placeholder="14"
                        value={extendDays}
                        onChange={(e) => setExtendDays(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleExtendTrial}>Extend Trial</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="sm" disabled={!selectedTenant}>
                <CreditCard className="h-4 w-4 mr-2" />
                Add Credit
              </Button>

              <Button variant="destructive" size="sm" disabled={!selectedTenant}>
                <Ban className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
            <CardDescription>Subscription changes history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActions.map((action) => (
                <div key={action.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{action.tenantName}</p>
                    <p className="text-sm text-muted-foreground">
                      {action.action}
                      {action.oldPlan && action.newPlan && (
                        <span>
                          : <Badge variant="outline" className="mx-1">{action.oldPlan}</Badge>
                          →
                          <Badge variant="outline" className="mx-1">{action.newPlan}</Badge>
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.timestamp} by {action.performedBy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
