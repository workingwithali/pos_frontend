"use client";

import { useState } from "react";
import { Category } from "@/types/category";
import { useCategories } from "@/hooks/useCategories";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Plus, Pencil, Trash2 } from "lucide-react";

export default function CategoriesPage() {
  const { categories, addOrUpdate, deleteCategory } = useCategories();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");

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
    if (!name.trim()) return;

    const category: Category = {
      id: editing?.id || `cat-${Date.now()}`,
      name,
    };

    addOrUpdate(category);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">
          Categories
        </h1>

        <Button onClick={openAdd} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm"
          >
            <span className="font-medium text-card-foreground">
              {c.name}
            </span>

            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openEdit(c)}
                className="h-8 w-8 rounded-lg"
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteCategory(c.id)}
                className="h-8 w-8 rounded-lg text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-2xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full rounded-xl"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}