"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useTenantStore } from "@/store/tenantStore"
import { formatCurrency } from "@/lib/utils"

interface Props {
  data: { name: string; revenue: number }[]
}

export default function RevenueChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value?: number) => [
            formatCurrency(value || 0, useTenantStore.getState().tenant?.currency || "USD"),
            "Revenue",
          ]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--primary)"
          strokeWidth={2.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}