import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Minus, AlertTriangle, Package } from "lucide-react";

interface StockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastRestocked: string;
  warehouse: string;
}

const mockStock: StockItem[] = [
  {
    id: "1",
    sku: "SKU-001",
    name: "Wireless Mouse",
    category: "Electronics",
    currentStock: 5,
    minStock: 10,
    maxStock: 100,
    unit: "pcs",
    lastRestocked: "2024-01-10",
    warehouse: "Main Warehouse",
  },
  {
    id: "2",
    sku: "SKU-002",
    name: "USB-C Cable",
    category: "Accessories",
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    unit: "pcs",
    lastRestocked: "2024-01-12",
    warehouse: "Main Warehouse",
  },
  {
    id: "3",
    sku: "SKU-003",
    name: "Laptop Stand",
    category: "Accessories",
    currentStock: 8,
    minStock: 15,
    maxStock: 80,
    unit: "pcs",
    lastRestocked: "2024-01-08",
    warehouse: "Secondary",
  },
  {
    id: "4",
    sku: "SKU-004",
    name: "Mechanical Keyboard",
    category: "Electronics",
    currentStock: 0,
    minStock: 5,
    maxStock: 50,
    unit: "pcs",
    lastRestocked: "2024-01-05",
    warehouse: "Main Warehouse",
  },
  {
    id: "5",
    sku: "SKU-005",
    name: "Monitor 27\"",
    category: "Electronics",
    currentStock: 25,
    minStock: 10,
    maxStock: 60,
    unit: "pcs",
    lastRestocked: "2024-01-15",
    warehouse: "Main Warehouse",
  },
];

export function StockList() {
  const [stock] = useState<StockItem[]>(mockStock);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [adjustmentQty, setAdjustmentQty] = useState("");
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");

  const getStockStatus = (item: StockItem) => {
    if (item.currentStock === 0) return "out";
    if (item.currentStock <= item.minStock) return "low";
    if (item.currentStock >= item.maxStock * 0.8) return "high";
    return "normal";
  };

  const filteredStock = stock.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const status = getStockStatus(item);
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "low" && (status === "low" || status === "out")) ||
      (filterStatus === "out" && status === "out") ||
      (filterStatus === "normal" && status === "normal");
    return matchesSearch && matchesFilter;
  });

  const handleAdjustStock = (item: StockItem) => {
    setSelectedItem(item);
    setAdjustmentQty("");
    setAdjustDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
            <SelectItem value="normal">Normal Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Package className="h-4 w-4" />
            <span className="text-sm">Total Items</span>
          </div>
          <p className="text-2xl font-bold">{stock.length}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-warning">
            {stock.filter((i) => getStockStatus(i) === "low").length}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">Out of Stock</span>
          </div>
          <p className="text-2xl font-bold text-destructive">
            {stock.filter((i) => getStockStatus(i) === "out").length}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Package className="h-4 w-4" />
            <span className="text-sm">Total Units</span>
          </div>
          <p className="text-2xl font-bold">
            {stock.reduce((sum, i) => sum + i.currentStock, 0)}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead className="text-right">Current Stock</TableHead>
              <TableHead className="text-right">Min / Max</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Restocked</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStock.map((item) => {
              const status = getStockStatus(item);
              return (
                <TableRow
                  key={item.id}
                  className={
                    status === "out"
                      ? "bg-destructive/5"
                      : status === "low"
                      ? "bg-warning/5"
                      : ""
                  }
                >
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.warehouse}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {item.currentStock} {item.unit}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {item.minStock} / {item.maxStock}
                  </TableCell>
                  <TableCell>
                    {status === "out" ? (
                      <Badge variant="destructive">Out of Stock</Badge>
                    ) : status === "low" ? (
                      <Badge variant="warning">Low Stock</Badge>
                    ) : (
                      <Badge variant="secondary">In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.lastRestocked}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAdjustStock(item)}
                    >
                      Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock - {selectedItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">Current Stock:</span>
              <span className="font-semibold">
                {selectedItem?.currentStock} {selectedItem?.unit}
              </span>
            </div>
            <div className="space-y-2">
              <Label>Adjustment Type</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={adjustmentType === "add" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setAdjustmentType("add")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stock
                </Button>
                <Button
                  type="button"
                  variant={adjustmentType === "remove" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setAdjustmentType("remove")}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Remove Stock
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <Input
                id="qty"
                type="number"
                placeholder="Enter quantity"
                value={adjustmentQty}
                onChange={(e) => setAdjustmentQty(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input id="reason" placeholder="e.g., Damaged goods, Recount..." />
            </div>
            <Button className="w-full" onClick={() => setAdjustDialogOpen(false)}>
              Confirm Adjustment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
