import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface RoleFormProps {
  role?: {
    id: string;
    name: string;
    description: string;
    permissions: string[];
  };
  onBack: () => void;
}

const permissionCategories = [
  {
    name: "Point of Sale",
    key: "pos",
    permissions: [
      { id: "pos.view", label: "Access POS Terminal" },
      { id: "pos.discount", label: "Apply Discounts" },
      { id: "pos.void", label: "Void Transactions" },
      { id: "pos.refund", label: "Process Refunds" },
    ],
  },
  {
    name: "Products",
    key: "products",
    permissions: [
      { id: "products.view", label: "View Products" },
      { id: "products.create", label: "Create Products" },
      { id: "products.edit", label: "Edit Products" },
      { id: "products.delete", label: "Delete Products" },
    ],
  },
  {
    name: "Inventory",
    key: "inventory",
    permissions: [
      { id: "inventory.view", label: "View Inventory" },
      { id: "inventory.adjust", label: "Adjust Stock" },
      { id: "inventory.purchase", label: "Create Purchase Orders" },
      { id: "inventory.suppliers", label: "Manage Suppliers" },
    ],
  },
  {
    name: "Customers",
    key: "customers",
    permissions: [
      { id: "customers.view", label: "View Customers" },
      { id: "customers.create", label: "Create Customers" },
      { id: "customers.edit", label: "Edit Customers" },
      { id: "customers.credit", label: "Manage Credit" },
    ],
  },
  {
    name: "Reports & Analytics",
    key: "reports",
    permissions: [
      { id: "reports.sales", label: "View Sales Reports" },
      { id: "reports.inventory", label: "View Inventory Reports" },
      { id: "reports.profit", label: "View Profit Reports" },
      { id: "reports.export", label: "Export Reports" },
    ],
  },
  {
    name: "Staff Management",
    key: "staff",
    permissions: [
      { id: "staff.view", label: "View Staff" },
      { id: "staff.create", label: "Create Staff" },
      { id: "staff.edit", label: "Edit Staff" },
      { id: "staff.roles", label: "Manage Roles" },
    ],
  },
  {
    name: "Expenses",
    key: "expenses",
    permissions: [
      { id: "expenses.view", label: "View Expenses" },
      { id: "expenses.create", label: "Create Expenses" },
      { id: "expenses.edit", label: "Edit Expenses" },
      { id: "expenses.delete", label: "Delete Expenses" },
    ],
  },
  {
    name: "Settings",
    key: "settings",
    permissions: [
      { id: "settings.general", label: "General Settings" },
      { id: "settings.payment", label: "Payment Methods" },
      { id: "settings.tax", label: "Tax Configuration" },
      { id: "settings.branches", label: "Manage Branches" },
    ],
  },
];

export function RoleForm({ role, onBack }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: role?.name || "",
    description: role?.description || "",
    permissions: new Set(role?.permissions || []),
  });

  const togglePermission = (permId: string) => {
    const newPermissions = new Set(formData.permissions);
    if (newPermissions.has(permId)) {
      newPermissions.delete(permId);
    } else {
      newPermissions.add(permId);
    }
    setFormData({ ...formData, permissions: newPermissions });
  };

  const toggleCategory = (category: typeof permissionCategories[0]) => {
    const categoryPermIds = category.permissions.map((p) => p.id);
    const allSelected = categoryPermIds.every((id) => formData.permissions.has(id));

    const newPermissions = new Set(formData.permissions);
    if (allSelected) {
      categoryPermIds.forEach((id) => newPermissions.delete(id));
    } else {
      categoryPermIds.forEach((id) => newPermissions.add(id));
    }
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please enter a role name");
      return;
    }
    if (formData.permissions.size === 0) {
      toast.error("Please select at least one permission");
      return;
    }
    toast.success(role ? "Role updated" : "Role created");
    onBack();
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Roles
      </Button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{role ? "Edit Role" : "Create New Role"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Supervisor"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this role"
                  rows={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select the permissions this role should have access to
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {permissionCategories.map((category) => {
                const categoryPermIds = category.permissions.map((p) => p.id);
                const selectedCount = categoryPermIds.filter((id) =>
                  formData.permissions.has(id)
                ).length;
                const allSelected = selectedCount === categoryPermIds.length;
                const someSelected = selectedCount > 0 && !allSelected;

                return (
                  <div key={category.key} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={category.key}
                        checked={allSelected}
                        ref={(el) => {
                          if (el) {
                            (el as HTMLButtonElement).dataset.state = someSelected
                              ? "indeterminate"
                              : allSelected
                              ? "checked"
                              : "unchecked";
                          }
                        }}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category.key} className="font-semibold cursor-pointer">
                        {category.name}
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        ({selectedCount}/{category.permissions.length})
                      </span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {category.permissions.map((perm) => (
                        <div key={perm.id} className="flex items-center gap-2">
                          <Checkbox
                            id={perm.id}
                            checked={formData.permissions.has(perm.id)}
                            onCheckedChange={() => togglePermission(perm.id)}
                          />
                          <Label
                            htmlFor={perm.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {perm.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit">{role ? "Update Role" : "Create Role"}</Button>
          <Button type="button" variant="outline" onClick={onBack}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
