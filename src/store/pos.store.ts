import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { Sale } from "@/types/sale";
import { create } from "zustand";


interface POSState {
  products: Product[];
  categories: Category[];
  taxRate: number;
  sales: Sale[];

  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  addSale: (sale: Sale) => void;
}

export const usePOSStore = create<POSState>((set) => ({
  products: [],
  categories: [],
  taxRate: 10,
  sales: [],

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),

  addSale: (sale) =>
    set((state) => ({
      sales: [...state.sales, sale],
    })),
}));

export type { Product, Category, Sale };