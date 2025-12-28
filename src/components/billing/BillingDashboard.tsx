import { CreditCard, Download, TrendingUp, Users, Package, Store } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface UsageStat {
  label: string;
  current: number;
  limit: number;
  icon: React.ReactNode;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  description: string;
}

const usageStats: UsageStat[] = [
  { label: "Products", current: 847, limit: 1000, icon: <Package className="h-4 w-4" /> },
  { label: "Locations", current: 2, limit: 3, icon: <Store className="h-4 w-4" /> },
  { label: "Staff Members", current: 8, limit: 15, icon: <Users className="h-4 w-4" /> },
  { label: "Transactions", current: 12450, limit: 50000, icon: <TrendingUp className="h-4 w-4" /> },
];

const invoices: Invoice[] = [
  { id: "INV-001", date: "2024-01-01", amount: 79, status: "paid", description: "Pro Plan - January 2024" },
  { id: "INV-002", date: "2023-12-01", amount: 79, status: "paid", description: "Pro Plan - December 2023" },
  { id: "INV-003", date: "2023-11-01", amount: 79, status: "paid", description: "Pro Plan - November 2023" },
  { id: "INV-004", date: "2023-10-01", amount: 29, status: "paid", description: "Basic Plan - October 2023" },
  { id: "INV-005", date: "2023-09-01", amount: 29, status: "paid", description: "Basic Plan - September 2023" },
];

export function BillingDashboard() {
  const currentPlan = "Pro";
  const nextBillingDate = "February 1, 2024";
  const nextBillingAmount = 79;

  return (
    <div className="space-y-6">
      {/* Current Plan Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPlan}</div>
            <p className="text-xs text-muted-foreground">Active subscription</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${nextBillingAmount}</div>
            <p className="text-xs text-muted-foreground">{nextBillingDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">•••• 4242</div>
            <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billing Cycle</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Monthly</div>
            <p className="text-xs text-muted-foreground">Renews automatically</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Period</CardTitle>
          <CardDescription>Track your resource usage against plan limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {usageStats.map((stat) => {
            const percentage = Math.round((stat.current / stat.limit) * 100);
            return (
              <div key={stat.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.current.toLocaleString()} / {stat.limit.toLocaleString()}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and download past invoices</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid"
                          ? "default"
                          : invoice.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
