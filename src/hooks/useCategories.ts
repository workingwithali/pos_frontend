// src/hooks/useCategories.ts
"use client";

import { useCategoryStore } from "@/store/categoryStore";

export const useCategories = () => {
  const { categories, addOrUpdate, deleteCategory } = useCategoryStore();

  return {
    categories,
    addOrUpdate,
    deleteCategory,
  };
};