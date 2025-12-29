"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { StockList } from "@/components/inventory/StockList";
import { PurchaseOrderList } from "@/components/inventory/PurchaseOrderList";
import { PurchaseOrderForm } from "@/components/inventory/PurchaseOrderForm";
import { SupplierList } from "@/components/inventory/SupplierList";
import { SupplierForm } from "@/components/inventory/SupplierForm";
import { Package, FileText, Users, Plus, ArrowLeft } from "lucide-react";

type ViewMode = "list" | "create";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("stock");
  const [poViewMode, setPoViewMode] = useState<ViewMode>("list");
  const [supplierViewMode, setSupplierViewMode] = useState<ViewMode>("list");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Inventory & Purchases</h1>
              <p className="text-muted-foreground">
                Manage stock levels, purchase orders, and suppliers
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="stock" className="gap-2">
                <Package className="h-4 w-4" />
                Stock
              </TabsTrigger>
              <TabsTrigger value="purchases" className="gap-2">
                <FileText className="h-4 w-4" />
                Purchase Orders
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="gap-2">
                <Users className="h-4 w-4" />
                Suppliers
              </TabsTrigger>
            </TabsList>

            {activeTab === "purchases" && poViewMode === "list" && (
              <Button onClick={() => setPoViewMode("create")}>
                <Plus className="h-4 w-4 mr-2" />
                New Purchase Order
              </Button>
            )}
            {activeTab === "purchases" && poViewMode === "create" && (
              <Button variant="outline" onClick={() => setPoViewMode("list")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to List
              </Button>
            )}
            {activeTab === "suppliers" && supplierViewMode === "list" && (
              <Button onClick={() => setSupplierViewMode("create")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Supplier
              </Button>
            )}
            {activeTab === "suppliers" && supplierViewMode === "create" && (
              <Button variant="outline" onClick={() => setSupplierViewMode("list")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to List
              </Button>
            )}
          </div>

          <TabsContent value="stock" className="mt-0">
            <StockList />
          </TabsContent>

          <TabsContent value="purchases" className="mt-0">
            {poViewMode === "list" ? (
              <PurchaseOrderList />
            ) : (
              <PurchaseOrderForm onCancel={() => setPoViewMode("list")} />
            )}
          </TabsContent>

          <TabsContent value="suppliers" className="mt-0">
            {supplierViewMode === "list" ? (
              <SupplierList />
            ) : (
              <SupplierForm onCancel={() => setSupplierViewMode("list")} />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
