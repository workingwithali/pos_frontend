import { useState } from "react";
import { Search, Barcode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Items", count: 24 },
  { id: "beverages", name: "Beverages", count: 8 },
  { id: "food", name: "Food", count: 6 },
  { id: "electronics", name: "Electronics", count: 5 },
  { id: "clothing", name: "Clothing", count: 3 },
  { id: "accessories", name: "Accessories", count: 2 },
];

const products = [
  { id: 1, name: "Espresso", price: 3.50, category: "beverages", stock: 50, image: "☕" },
  { id: 2, name: "Cappuccino", price: 4.50, category: "beverages", stock: 45, image: "☕" },
  { id: 3, name: "Latte", price: 4.00, category: "beverages", stock: 40, image: "🥛" },
  { id: 4, name: "Croissant", price: 3.00, category: "food", stock: 20, image: "🥐" },
  { id: 5, name: "Sandwich", price: 6.50, category: "food", stock: 15, image: "🥪" },
  { id: 6, name: "Muffin", price: 2.50, category: "food", stock: 25, image: "🧁" },
  { id: 7, name: "USB Cable", price: 12.00, category: "electronics", stock: 30, image: "🔌" },
  { id: 8, name: "Earbuds", price: 25.00, category: "electronics", stock: 18, image: "🎧" },
  { id: 9, name: "T-Shirt", price: 19.99, category: "clothing", stock: 35, image: "👕" },
  { id: 10, name: "Cap", price: 14.99, category: "accessories", stock: 22, image: "🧢" },
  { id: 11, name: "Iced Tea", price: 3.00, category: "beverages", stock: 60, image: "🧊" },
  { id: 12, name: "Bagel", price: 2.75, category: "food", stock: 18, image: "🥯" },
];

interface ProductGridProps {
  onAddToCart: (product: { id: number; name: string; price: number }) => void;
}

export function ProductGrid({ onAddToCart }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Barcode className="h-4 w-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="shrink-0"
          >
            {category.name}
            <Badge 
              variant="secondary" 
              className={cn(
                "ml-2 text-xs",
                selectedCategory === category.id && "bg-primary-foreground/20 text-primary-foreground"
              )}
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="p-3 cursor-pointer hover:shadow-elegant hover:border-primary/30 transition-all duration-200 active:scale-[0.98]"
              onClick={() => onAddToCart(product)}
            >
              <div className="aspect-square bg-secondary/50 rounded-lg flex items-center justify-center text-4xl mb-2">
                {product.image}
              </div>
              <h4 className="font-medium text-sm truncate">{product.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground">{product.stock} in stock</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
