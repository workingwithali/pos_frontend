"use client"

import { useMemo } from "react"
import {
  TrendingUp,
  Wallet,
  AlertTriangle,
  DollarSign,
} from "lucide-react"

import { useDashboardStore } from "@/store/dashboard.store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RevenueChart from "@/components/dashboard/revenue-chart"

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: string
  icon: React.ElementType
}) => (
  <Card className="rounded-2xl pos-shadow-md">
    <CardContent className="p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const { sales, products } = useDashboardStore()

  const todaySales = useMemo(() => {
    const today = new Date().toDateString()
    return sales.filter(
      (s) => new Date(s.date).toDateString() === today
    )
  }, [sales])

  const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0)
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0)

  const lowStockProducts = products.filter(
    (p) => p.stock <= p.lowStockThreshold
  )

  const topSelling = useMemo(() => {
    const map: Record<string, number> = {}

    sales.forEach((s) =>
      s.items.forEach((i) => {
        map[i.productName] =
          (map[i.productName] || 0) + i.quantity
      })
    )

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, qty]) => ({ name, qty }))
  }, [sales])

  const chartData = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    return days.map((d) => ({
      name: d,
      revenue: Math.floor(Math.random() * 500 + 100),
    }))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value={`$${todayRevenue.toFixed(2)}`}
          icon={DollarSign}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={Wallet}
        />
        <StatCard
          title="Total Products"
          value={String(products.length)}
          icon={TrendingUp}
        />
        <StatCard
          title="Low Stock Items"
          value={String(lowStockProducts.length)}
          icon={AlertTriangle}
        />
      </div>

      {/* Revenue Overview (Simple Bar Chart UI) */}
      <Card className="rounded-2xl pos-shadow-md">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={chartData} />
        </CardContent>
      </Card>

      {/* Low Stock */}
      <Card className="rounded-2xl pos-shadow-md">
        <CardHeader>
          <CardTitle>Low Stock Alert</CardTitle>
        </CardHeader>
        <CardContent>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              All products well stocked
            </p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{p.name}</span>
                  <span className="rounded-lg bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Selling */}
      {topSelling.length > 0 && (
        <Card className="rounded-2xl pos-shadow-md">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Product</th>
                    <th className="pb-3 font-medium text-right">
                      Sold
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topSelling.map((p) => (
                    <tr
                      key={p.name}
                      className="border-b last:border-0"
                    >
                      <td className="py-3">{p.name}</td>
                      <td className="py-3 text-right font-medium">
                        {p.qty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}