import { create } from "zustand"

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  lowStockThreshold: number
  categoryId: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Sale {
  id: string
  items: {
    productName: string
    quantity: number
    price: number
  }[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paymentMethod: "cash" | "card"
  date: string
}

interface POSState {
  products: Product[]
  categories: { id: string; name: string }[]
  taxRate: number
  sales: Sale[]
  addSale: (sale: Sale) => void
}

export const usePOSStore = create<POSState>((set) => ({
  products: [],
  categories: [],
  taxRate: 10,
  sales: [],
  addSale: (sale) =>
    set((state) => ({
      sales: [...state.sales, sale],
    })),
}))