import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

type ProductState = {
  products: Product[];
  search: string;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  setSearch: (value: string) => void;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      search: "",

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      setSearch: (value) => set({ search: value }),
    }),
    {
      name: "product-storage",
    }
  )
);