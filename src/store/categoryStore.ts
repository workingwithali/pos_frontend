// src/store/categoryStore.ts
import { create } from "zustand";
import { Category } from "@/types/category";

interface CategoryState {
  categories: Category[];
  addOrUpdate: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],

  addOrUpdate: (category) =>
    set((state) => {
      const exists = state.categories.find((c) => c.id === category.id);

      if (exists) {
        return {
          categories: state.categories.map((c) =>
            c.id === category.id ? category : c
          ),
        };
      }

      return {
        categories: [...state.categories, category],
      };
    }),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}));