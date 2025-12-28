import { useState } from "react";
import { Store, Plus, Edit2, Trash2, MapPin, Phone, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  isActive: boolean;
  isMain: boolean;
}

export function BranchManagement() {
  const { toast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "Main Store",
      address: "123 Commerce Street, New York, NY 10001",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-6PM",
      isActive: true,
      isMain: true,
    },
    {
      id: "2",
      name: "Downtown Branch",
      address: "456 Market Avenue, New York, NY 10002",
      phone: "+1 (555) 234-5678",
      hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 10AM-6PM",
      isActive: true,
      isMain: false,
    },
    {
      id: "3",
      name: "Mall Location",
      address: "789 Shopping Mall, Brooklyn, NY 11201",
      phone: "+1 (555) 345-6789",
      hours: "Mon-Sun: 10AM-9PM",
      isActive: false,
      isMain: false,
    },
  ]);
  const [showDialog, setShowDialog] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    hours: "",
  });

  const handleOpenDialog = (branch?: Branch) => {
    if (branch) {
      setEditingBranch(branch);
      setFormData({
        name: branch.name,
        address: branch.address,
        phone: branch.phone,
        hours: branch.hours,
      });
    } else {
      setEditingBranch(null);
      setFormData({ name: "", address: "", phone: "", hours: "" });
    }
    setShowDialog(true);
  };

  const handleSave = () => {
    if (editingBranch) {
      setBranches(
        branches.map((b) =>
          b.id === editingBranch.id
            ? { ...b, ...formData }
            : b
        )
      );
      toast({
        title: "Branch Updated",
        description: `${formData.name} has been updated.`,
      });
    } else {
      const newBranch: Branch = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        isMain: false,
      };
      setBranches([...branches, newBranch]);
      toast({
        title: "Branch Added",
        description: `${formData.name} has been added.`,
      });
    }
    setShowDialog(false);
  };

  const handleDelete = (id: string) => {
    const branch = branches.find((b) => b.id === id);
    if (branch?.isMain) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete the main branch.",
        variant: "destructive",
      });
      return;
    }
    setBranches(branches.filter((b) => b.id !== id));
    toast({
      title: "Branch Deleted",
      description: "The branch has been removed.",
    });
  };

  const handleToggleActive = (id: string) => {
    setBranches(
      branches.map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      )
    );
  };

  const handleSetMain = (id: string) => {
    setBranches(
      branches.map((b) => ({
        ...b,
        isMain: b.id === id,
      }))
    );
    toast({
      title: "Main Branch Updated",
      description: "The main branch has been changed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Branch Locations</h3>
          <p className="text-sm text-muted-foreground">
            Manage your store locations and their settings
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </div>

      <div className="grid gap-4">
        {branches.map((branch) => (
          <Card key={branch.id} className={!branch.isActive ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {branch.name}
                      {branch.isMain && (
                        <Badge variant="secondary">Main</Badge>
                      )}
                      {!branch.isActive && (
                        <Badge variant="outline">Inactive</Badge>
                      )}
                    </CardTitle>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={branch.isActive}
                    onCheckedChange={() => handleToggleActive(branch.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDialog(branch)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(branch.id)}
                    disabled={branch.isMain}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {branch.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {branch.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {branch.hours}
              </div>
              {!branch.isMain && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleSetMain(branch.id)}
                >
                  Set as Main Branch
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBranch ? "Edit Branch" : "Add New Branch"}
            </DialogTitle>
            <DialogDescription>
              {editingBranch
                ? "Update the branch details below."
                : "Enter the details for the new branch location."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name</Label>
              <Input
                id="branchName"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Downtown Store"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchAddress">Address</Label>
              <Input
                id="branchAddress"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Full address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchPhone">Phone</Label>
              <Input
                id="branchPhone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchHours">Operating Hours</Label>
              <Input
                id="branchHours"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({ ...formData, hours: e.target.value })
                }
                placeholder="e.g., Mon-Fri: 9AM-6PM"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.name}>
              {editingBranch ? "Save Changes" : "Add Branch"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}