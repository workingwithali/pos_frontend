"use client";

import { useState } from "react";
import { useProductStore } from "@/store/product.store";
import { ProductSchema, Product } from "@/types/product";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ProductsPage = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    search,
    setSearch,
  } = useProductStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    categoryId: "",
    costPrice: "",
    price: "",
    stock: "",
  });

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      sku: "",
      categoryId: "",
      costPrice: "",
      price: "",
      stock: "",
    });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name || "",
      sku: p.sku || "",
      categoryId: p.categoryId || "",
      costPrice: p.costPrice != null ? String(p.costPrice) : "",
      price: p.price != null ? String(p.price) : "",
      stock: p.stock != null ? String(p.stock) : "",
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    try {
      const validated = ProductSchema.parse({
        id: editing?.id || `p-${Date.now()}`,
        name: form.name,
        sku: form.sku,
        categoryId: form.categoryId,
        costPrice: parseFloat(form.costPrice) || 0,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock) || 0,
        lowStockThreshold: 5,
      });

      if (editing) {
        updateProduct(validated);
        toast.success("Product updated successfully");
      } else {
        addProduct(validated);
        toast.success("Product created successfully");
      }

      setModalOpen(false);
    } catch (error: any) {
      toast.error(error?.errors?.[0]?.message || "Something went wrong");
    }
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product removed successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-card shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3 text-right">Cost</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-right">Stock</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-muted/50">
                  <td className="px-5 py-3 font-medium">{p.name}</td>
                  <td className="px-5 py-3">{p.sku}</td>
                  <td className="px-5 py-3 text-right">
                    {p.costPrice.toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {p.price.toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-right">{p.stock}</td>
                  <td className="px-5 py-3 text-right flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEdit(p)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />

            <Input
              placeholder="SKU"
              value={form.sku}
              onChange={(e) =>
                setForm((f) => ({ ...f, sku: e.target.value }))
              }
            />

            <Input
              type="number"
              placeholder="Cost Price"
              value={form.costPrice}
              onChange={(e) =>
                setForm((f) => ({ ...f, costPrice: e.target.value }))
              }
            />

            <Input
              type="number"
              placeholder="Selling Price"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: e.target.value }))
              }
            />

            <Input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm((f) => ({ ...f, stock: e.target.value }))
              }
            />

            <Button onClick={handleSave} className="w-full">
              Save Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;