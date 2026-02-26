import { create } from "zustand"

interface SaleItem {
  productName: string
  quantity: number
}

interface Sale {
  id: string
  date: string
  total: number
  items: SaleItem[]
}

interface Product {
  id: string
  name: string
  stock: number
  lowStockThreshold: number
}

interface DashboardState {
  sales: Sale[]
  products: Product[]
}

export const useDashboardStore = create<DashboardState>(() => ({
  sales: [],
  products: [],
}))