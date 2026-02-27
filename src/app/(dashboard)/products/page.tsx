"use client";

import { useState } from "react";
import { ProductSchema, Product } from "@/types/product";
import {
  useGetProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategoriesApi";

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
  const { data: products = [], isLoading, error } = useGetProducts();
  const { data: categories = [] } = useGetCategories();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [search, setSearch] = useState("");
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
      categoryId: categories.length > 0 ? categories[0].id : "",
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
      if (editing) {
        // Validation for update
        const validated = ProductSchema.partial().parse({
          name: form.name,
          sku: form.sku,
          categoryId: form.categoryId,
          costPrice: parseFloat(form.costPrice) || 0,
          price: parseFloat(form.price) || 0,
          stock: parseInt(form.stock) || 0,
          lowStockThreshold: 5,
        });

        // Add id explicitly because partial() might make id optional, but update needs it
        updateProduct.mutate(
          { id: editing.id, ...validated },
          {
            onSuccess: () => {
              toast.success("Product updated successfully");
              setModalOpen(false);
            },
            onError: (err: any) => {
              toast.error(err?.response?.data?.message || err.message || "Something went wrong");
            },
          }
        );
      } else {
        // Validation for create
        const validated = ProductSchema.omit({ id: true }).parse({
          name: form.name,
          sku: form.sku,
          categoryId: form.categoryId,
          costPrice: parseFloat(form.costPrice) || 0,
          price: parseFloat(form.price) || 0,
          stock: parseInt(form.stock) || 0,
          lowStockThreshold: 5,
        });

        createProduct.mutate(validated, {
          onSuccess: () => {
            toast.success("Product created successfully");
            setModalOpen(false);
          },
          onError: (err: any) => {
            toast.error(err?.response?.data?.message || err.message || "Something went wrong");
          },
        });
      }
    } catch (error: any) {
      toast.error(error?.errors?.[0]?.message || "Validation failed");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(id, {
        onSuccess: () => {
          toast.success("Product removed successfully");
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.message || err.message || "Something went wrong");
        },
      });
    }
  };

  if (error) {
    return <div className="text-destructive p-4">Error loading products.</div>;
  }

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
      <div className="rounded-2xl bg-card shadow-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Cost</th>
                <th className="px-5 py-3 text-right">Price</th>
                <th className="px-5 py-3 text-right">Stock</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">
                    Loading products...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const categoryName = categories.find((c) => c.id === p.categoryId)?.name || "Unknown";
                  return (
                    <tr key={p.id} className="border-b hover:bg-muted/30">
                      <td className="px-5 py-3 font-medium">{p.name}</td>
                      <td className="px-5 py-3">{p.sku}</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {categoryName}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        ${p.costPrice.toFixed(2)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.stock <= (p.lowStockThreshold || 5) ? 'bg-destructive/10 text-destructive' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}`}>
                          {p.stock}
                        </span>
                      </td>
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
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(p.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">SKU</label>
              <Input
                placeholder="SKU-123"
                value={form.sku}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sku: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={form.categoryId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoryId: e.target.value }))
                }
              >
                <option value="" disabled>Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cost Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={form.costPrice}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, costPrice: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Selling Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Stock</label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={createProduct.isPending || updateProduct.isPending}>
              {(createProduct.isPending || updateProduct.isPending) ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;