import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, CreditCard } from "lucide-react";

const dailyData = [
  { day: "Mon", sales: 2400, orders: 45 },
  { day: "Tue", sales: 1398, orders: 32 },
  { day: "Wed", sales: 3800, orders: 67 },
  { day: "Thu", sales: 3908, orders: 72 },
  { day: "Fri", sales: 4800, orders: 89 },
  { day: "Sat", sales: 5200, orders: 98 },
  { day: "Sun", sales: 3490, orders: 61 },
];

const stats = [
  { title: "Today's Sales", value: "$3,490", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Orders", value: "61", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { title: "Customers", value: "48", change: "-2.4%", trend: "down", icon: Users },
  { title: "Avg Transaction", value: "$57.21", change: "+5.1%", trend: "up", icon: CreditCard },
];

export function DailySalesReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} variant="bordered">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-sm ${
                    stat.trend === "up" ? "text-emerald-400" : "text-destructive"
                  }`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {stat.change} from yesterday
                  </div>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card variant="bordered">
        <CardHeader>
          <CardTitle>Weekly Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="sales" fill="#008767" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="bordered">
          <CardHeader>
            <CardTitle className="text-base">Sales by Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { method: "Card", amount: 12450, percentage: 52 },
              { method: "Cash", amount: 7890, percentage: 33 },
              { method: "Mobile", amount: 3580, percentage: 15 },
            ].map((item) => (
              <div key={item.method} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.method}</span>
                  <span className="text-muted-foreground">${item.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <CardTitle className="text-base">Sales by Branch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { branch: "Main Store", amount: 18200, percentage: 65 },
              { branch: "Branch 2", amount: 9800, percentage: 35 },
            ].map((item) => (
              <div key={item.branch} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.branch}</span>
                  <span className="text-muted-foreground">${item.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
