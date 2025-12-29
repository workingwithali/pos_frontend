"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerProfile } from "@/components/customers/CustomerProfile";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { Plus, ArrowLeft, Users } from "lucide-react";

type ViewMode = "list" | "profile" | "create";

export default function CustomersPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleViewProfile = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setViewMode("profile");
  };

  const handleBack = () => {
    setSelectedCustomerId(null);
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Customers</h1>
                <p className="text-muted-foreground">
                  Manage customer profiles and purchase history
                </p>
              </div>
            </div>
            {viewMode === "list" && (
              <Button onClick={() => setViewMode("create")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            )}
            {viewMode === "create" && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to List
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {viewMode === "list" && (
          <CustomerList onViewProfile={handleViewProfile} />
        )}
        {viewMode === "profile" && selectedCustomerId && (
          <CustomerProfile customerId={selectedCustomerId} onBack={handleBack} />
        )}
        {viewMode === "create" && (
          <CustomerForm onCancel={handleBack} />
        )}
      </main>
    </div>
  );
}
