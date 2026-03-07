"use client"

import { useMemo } from "react"
import {
  TrendingUp,
  Wallet,
  AlertTriangle,
  DollarSign,
  Loader2,
} from "lucide-react"

import { useGetMetrics, useGetTopSelling, useGetLowStock } from "@/hooks/useDashboardApi"
import { useTenantStore } from "@/store/tenantStore"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RevenueChart from "@/components/dashboard/revenue-chart"

const StatCard = ({
  title,
  value,
  icon: Icon,
  isLoading
}: {
  title: string
  value: string | number
  icon: React.ElementType
  isLoading?: boolean
}) => (
  <Card className="rounded-2xl pos-shadow-md">
    <CardContent className="p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        {isLoading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded mt-1" />
        ) : (
          <p className="mt-1 text-2xl font-bold">{value}</p>
        )}
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
    </CardContent>
  </Card>
)

export default function DashboardPage() {
  const { data: metrics, isLoading: isMetricsLoading } = useGetMetrics()
  const { data: topSelling = [], isLoading: isTopSellingLoading } = useGetTopSelling()
  const { data: lowStockProducts = [], isLoading: isLowStockLoading } = useGetLowStock()

  const tenant = useTenantStore((s) => s.tenant)
  const currency = tenant?.currency || "USD"

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
          value={formatCurrency(Number(metrics?.todaySales || 0), currency)}
          icon={DollarSign}
          isLoading={isMetricsLoading}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(Number(metrics?.totalRevenue || 0), currency)}
          icon={Wallet}
          isLoading={isMetricsLoading}
        />
        <StatCard
          title="Total Products"
          value={metrics?.totalProducts || 0}
          icon={TrendingUp}
          isLoading={isMetricsLoading}
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockProducts.length}
          icon={AlertTriangle}
          isLoading={isLowStockLoading}
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
          {isLowStockLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : lowStockProducts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              All products well stocked
            </p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{p.name} {p.sku && `(${p.sku})`}</span>
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
      <Card className="rounded-2xl pos-shadow-md">
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isTopSellingLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : topSelling.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No sales data available yet
            </p>
          ) : (
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
                  {topSelling.map((p: any) => (
                    <tr
                      key={p.productId}
                      className="border-b last:border-0"
                    >
                      <td className="py-3">{p.name}</td>
                      <td className="py-3 text-right font-medium">
                        {p.totalSold}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}