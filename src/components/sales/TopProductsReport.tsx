import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, Award, Package } from "lucide-react";

const topProducts = [
  { rank: 1, name: "Wireless Headphones", sku: "WH-001", unitsSold: 245, revenue: 12250, growth: 15.2 },
  { rank: 2, name: "USB-C Cable 2m", sku: "UC-002", unitsSold: 412, revenue: 8240, growth: 8.7 },
  { rank: 3, name: "Bluetooth Speaker", sku: "BS-003", unitsSold: 156, revenue: 7800, growth: -3.2 },
  { rank: 4, name: "Phone Case Premium", sku: "PC-004", unitsSold: 298, revenue: 5960, growth: 22.1 },
  { rank: 5, name: "Screen Protector", sku: "SP-005", unitsSold: 523, revenue: 5230, growth: 12.4 },
  { rank: 6, name: "Power Bank 10000mAh", sku: "PB-006", unitsSold: 134, revenue: 4690, growth: 5.8 },
  { rank: 7, name: "Laptop Stand", sku: "LS-007", unitsSold: 89, revenue: 4450, growth: -1.5 },
  { rank: 8, name: "Wireless Mouse", sku: "WM-008", unitsSold: 167, revenue: 4175, growth: 9.3 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#3b82f6" },
  { name: "Accessories", value: 28, color: "#8b5cf6" },
  { name: "Audio", value: 22, color: "#10b981" },
  { name: "Cables", value: 15, color: "#f59e0b" },
];

export function TopProductsReport() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Award className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Seller</p>
                <p className="font-semibold">Wireless Headphones</p>
                <p className="text-xs text-muted-foreground">245 units this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fastest Growing</p>
                <p className="font-semibold">Phone Case Premium</p>
                <p className="text-xs text-muted-foreground">+22.1% growth</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card variant="bordered">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Most Volume</p>
                <p className="font-semibold">Screen Protector</p>
                <p className="text-xs text-muted-foreground">523 units sold</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="bordered" className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-15">Rank</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-right">Units</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.sku} className="hover:bg-muted/30">
                    <TableCell>
                      <Badge variant={product.rank <= 3 ? "default" : "secondary"} className={
                        product.rank === 1 ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" :
                        product.rank === 2 ? "bg-slate-400/20 text-slate-400 border-slate-400/30" :
                        product.rank === 3 ? "bg-amber-600/20 text-amber-600 border-amber-600/30" : ""
                      }>
                        #{product.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                    <TableCell className="text-right">{product.unitsSold}</TableCell>
                    <TableCell className="text-right font-medium">${product.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <span className={product.growth >= 0 ? "text-emerald-400" : "text-destructive"}>
                        {product.growth >= 0 ? "+" : ""}{product.growth}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-62.5">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
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
                    formatter={(value) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className="text-muted-foreground">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
