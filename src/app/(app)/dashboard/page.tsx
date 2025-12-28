"use client";
import  Link  from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  BarChart3, 
  Package, 
  Users, 
  Settings,
  Plus,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap,
  LogOut,
  ChevronRight,
  Receipt,
  UserPlus,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Revenue data for area chart
const revenueData = [
  { name: "Mon", revenue: 1200 },
  { name: "Tue", revenue: 1800 },
  { name: "Wed", revenue: 1400 },
  { name: "Thu", revenue: 2200 },
  { name: "Fri", revenue: 2800 },
  { name: "Sat", revenue: 3200 },
  { name: "Sun", revenue: 2400 },
];

// Best selling items data
const bestSellingData = [
  { name: "Latte", sales: 124, revenue: 620 },
  { name: "Croissant", sales: 98, revenue: 392 },
  { name: "Sandwich", sales: 87, revenue: 696 },
  { name: "Espresso", sales: 76, revenue: 228 },
  { name: "Muffin", sales: 65, revenue: 195 },
];

// Category distribution data
const categoryData = [
  { name: "Beverages", value: 45, color: "primary" },
  { name: "Food", value: 30, color: "hsl(var(--accent))" },
  { name: "Snacks", value: 15, color: "hsl(var(--success))" },
  { name: "Others", value: 10, color: "hsl(var(--muted-foreground))" },
];

// Stats for summary cards
const todayStats = {
  title: "Today's Sales",
  value: "$2,847.50",
  change: "+12.5%",
  trend: "up" as const,
  transactions: 48,
  avgOrder: "$59.32",
};

const monthStats = {
  title: "This Month",
  value: "$42,680.00",
  change: "+8.7%",
  trend: "up" as const,
  transactions: 842,
  avgOrder: "$50.69",
};

// Recent invoices
const recentInvoices = [
  { id: "INV-001", customer: "John Smith", date: "Dec 12, 2025", amount: 156.00, status: "paid", items: 5 },
  { id: "INV-002", customer: "Sarah Johnson", date: "Dec 12, 2025", amount: 84.50, status: "paid", items: 3 },
  { id: "INV-003", customer: "Mike Wilson", date: "Dec 11, 2025", amount: 245.00, status: "pending", items: 8 },
  { id: "INV-004", customer: "Emily Brown", date: "Dec 11, 2025", amount: 42.75, status: "paid", items: 2 },
  { id: "INV-005", customer: "Walk-in Customer", date: "Dec 11, 2025", amount: 29.99, status: "paid", items: 1 },
];

const quickActions = [
  { label: "Open POS", icon: ShoppingCart, href: "/pos", variant: "hero" as const },
  { label: "Add Product", icon: Plus, href: "/products", variant: "outline" as const },
  { label: "Add Customer", icon: UserPlus, href: "/customers", variant: "outline" as const },
];

const navItems = [
  { label: "Dashboard", icon: BarChart3, href: "/dashboard", active: true },
  { label: "POS Terminal", icon: ShoppingCart, href: "/pos" },
  { label: "Products", icon: Package, href: "/products" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-success/10 text-success border-success/20">Paid</Badge>;
    case "pending":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex">
      

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {quickActions.map((action) => (
                <Button key={action.label} variant={action.variant} asChild>
                  <Link href={action.href}>
                    <action.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{action.label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Sales Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Today's Sales Card */}
            <Card variant="bordered" className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Today's Sales</p>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-foreground">{todayStats.value}</span>
                      <span className={`flex items-center text-sm font-medium ${
                        todayStats.trend === "up" ? "text-success" : "text-destructive"
                      }`}>
                        {todayStats.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {todayStats.change}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-xl font-semibold text-foreground">{todayStats.transactions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Order</p>
                    <p className="text-xl font-semibold text-foreground">{todayStats.avgOrder}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* This Month Card */}
            <Card variant="bordered" className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">This Month</p>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-foreground">{monthStats.value}</span>
                      <span className={`flex items-center text-sm font-medium ${
                        monthStats.trend === "up" ? "text-success" : "text-destructive"
                      }`}>
                        {monthStats.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {monthStats.change}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-xl font-semibold text-foreground">{monthStats.transactions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Order</p>
                    <p className="text-xl font-semibold text-foreground">{monthStats.avgOrder}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Revenue Chart */}
            <Card variant="bordered" className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-70">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke=""
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        formatter={(value: number | undefined) => [`$${value ?? 0}`, "Revenue"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card variant="bordered">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Category Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-50">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number | undefined) => [`${value ?? 0}%`, "Share"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm font-medium text-foreground ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Best Selling Items Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card variant="bordered">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Best Selling Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-62.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bestSellingData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis 
                        type="number" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={80}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number | undefined, name: string | undefined) => [
                          name === "sales" ? `${value ?? 0} units` : `$${value ?? 0}`,
                          name === "sales" ? "Units Sold" : "Revenue"
                        ]}
                      />
                      <Bar 
                        dataKey="sales" 
                        fill="hsl(var(--primary))" 
                        radius={[0, 4, 4, 0]}
                        barSize={24}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Invoices Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="bordered">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  Recent Invoices
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/invoices">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentInvoices.map((invoice) => (
                      <TableRow key={invoice.id} className="hover:bg-muted/50 cursor-pointer">
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                        <TableCell>{invoice.items}</TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell className="text-right font-semibold">${invoice.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
