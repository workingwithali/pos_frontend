"use client";

import { useState } from "react";
import { Category } from "@/types/category";
import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/hooks/useCategoriesApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Plus, Pencil, Trash2, Loader2, RefreshCw } from "lucide-react";

export default function CategoriesPage() {
  const { data: categories = [], isLoading, isError, refetch } = useGetCategories();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");

  const isSaving = createCategory.isPending || updateCategory.isPending;

  const openAdd = () => {
    setEditing(null);
    setName("");
    setModalOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setName(c.name);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim() || isSaving) return;

    if (editing) {
      updateCategory.mutate(
        { id: editing.id, name },
        {
          onSuccess: () => setModalOpen(false),
        }
      );
    } else {
      createCategory.mutate(
        { name },
        {
          onSuccess: () => setModalOpen(false),
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteCategory.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>

        <Button onClick={openAdd} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <p className="text-destructive font-medium">Failed to load categories</p>
          <Button variant="outline" onClick={() => refetch()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed bg-card/50">
          <h3 className="text-lg font-medium text-foreground">No Categories</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Get started by adding your first category.
          </p>
          <Button variant="secondary" onClick={openAdd}>
            Create Category
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm transition-all hover:shadow-md border border-border/50"
            >
              <span className="font-medium text-card-foreground">{c.name}</span>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(c)}
                  className="h-8 w-8 rounded-lg"
                  disabled={deleteCategory.isPending && deleteCategory.variables === c.id}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(c.id)}
                  className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                  disabled={deleteCategory.isPending && deleteCategory.variables === c.id}
                >
                  {deleteCategory.isPending && deleteCategory.variables === c.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="rounded-2xl sm:max-w-sm"
          aria-describedby={undefined}

        >
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl"
                autoFocus
                disabled={isSaving}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                }}
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full rounded-xl gap-2"
              disabled={!name.trim() || isSaving}
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Category
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div >
  );
}
