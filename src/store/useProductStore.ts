import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  costPrice: number;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

interface ProductState {
  products: Product[];
  categories: { id: string; name: string }[];
  saveProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [
    { id: "1", name: "General" },
    { id: "2", name: "Electronics" },
  ],

  saveProduct: (product) =>
    set((state) => {
      const exists = state.products.find((p) => p.id === product.id);
      if (exists) {
        return {
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        };
      }
      return { products: [...state.products, product] };
    }),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));