"use client";
import { useState } from "react";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductTable, type Product } from "@/components/products/ProductTable";
import { ProductForm } from "@/components/products/ProductForm";
import { useToast } from "@/hooks/use-toast";

// Mock products data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Organic Coffee Blend",
    sku: "COF-001",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop",
    category: "beverages",
    price: 14.99,
    costPrice: 8.50,
    stock: 45,
    lowStockThreshold: 10,
    barcode: "1234567890123",
    variants: [{ name: "Size", value: "500g" }],
  },
  {
    id: "2",
    name: "Whole Wheat Bread",
    sku: "BKR-001",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop",
    category: "bakery",
    price: 4.50,
    costPrice: 2.20,
    stock: 8,
    lowStockThreshold: 15,
    barcode: "1234567890124",
  },
  {
    id: "3",
    name: "Greek Yogurt",
    sku: "DRY-001",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop",
    category: "dairy",
    price: 6.99,
    costPrice: 3.50,
    stock: 0,
    lowStockThreshold: 10,
    barcode: "1234567890125",
    variants: [{ name: "Flavor", value: "Strawberry" }],
  },
  {
    id: "4",
    name: "Potato Chips",
    sku: "SNK-001",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100&h=100&fit=crop",
    category: "snacks",
    price: 3.99,
    costPrice: 1.80,
    stock: 120,
    lowStockThreshold: 20,
    barcode: "1234567890126",
    variants: [{ name: "Flavor", value: "BBQ" }],
  },
  {
    id: "5",
    name: "Frozen Pizza",
    sku: "FRZ-001",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop",
    category: "frozen",
    price: 8.99,
    costPrice: 4.50,
    stock: 25,
    lowStockThreshold: 10,
    barcode: "1234567890127",
    variants: [{ name: "Size", value: "Large" }],
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && product.stock > product.lowStockThreshold) ||
      (stockFilter === "low-stock" &&
        product.stock > 0 &&
        product.stock <= product.lowStockThreshold) ||
      (stockFilter === "out-of-stock" && product.stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleCreateProduct = (data: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: data.name,
      sku: data.sku,
      image: data.images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      category: data.category,
      price: data.price,
      costPrice: data.costPrice,
      stock: data.stock,
      lowStockThreshold: data.lowStockThreshold,
      barcode: data.barcode || "",
      variants: data.variants,
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p)));
      toast({
        title: "Product updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      setProducts([...products, newProduct]);
      toast({
        title: "Product created",
        description: `${data.name} has been added to your catalog.`,
      });
    }
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setProducts(products.filter((p) => p.id !== productId));
    toast({
      title: "Product deleted",
      description: `${product?.name} has been removed from your catalog.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Products</h1>
              <p className="text-sm text-muted-foreground">
                Manage your product catalog and inventory
              </p>
            </div>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          stockFilter={stockFilter}
          onStockChange={setStockFilter}
        />

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">In Stock</p>
            <p className="text-2xl font-bold text-primary">
              {products.filter((p) => p.stock > p.lowStockThreshold).length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <p className="text-2xl font-bold text-warning">
              {products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <p className="text-2xl font-bold text-destructive">
              {products.filter((p) => p.stock === 0).length}
            </p>
          </div>
        </div>

        {/* Product Table */}
        <ProductTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

        {/* Product Form */}
        <ProductForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={handleCreateProduct}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  );
}
