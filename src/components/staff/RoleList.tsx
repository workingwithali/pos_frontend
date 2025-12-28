import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, MoreHorizontal, Plus, Shield, Users } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: string[];
  isSystem: boolean;
}

interface RoleListProps {
  onBack: () => void;
  onCreateRole: () => void;
  onEditRole: (role: Role) => void;
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full access to all features and settings",
    usersCount: 1,
    permissions: ["all"],
    isSystem: true,
  },
  {
    id: "2",
    name: "Manager",
    description: "Manage staff, inventory, and view reports",
    usersCount: 2,
    permissions: ["pos", "products", "inventory", "customers", "reports", "staff"],
    isSystem: false,
  },
  {
    id: "3",
    name: "Cashier",
    description: "Process sales and manage customers",
    usersCount: 5,
    permissions: ["pos", "customers"],
    isSystem: false,
  },
  {
    id: "4",
    name: "Inventory Manager",
    description: "Manage stock and suppliers",
    usersCount: 1,
    permissions: ["products", "inventory"],
    isSystem: false,
  },
];

export function RoleList({ onBack, onCreateRole, onEditRole }: RoleListProps) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Staff List
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Roles & Permissions</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage user roles and their access permissions
              </p>
            </div>
            <Button onClick={onCreateRole}>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="font-medium">{role.name}</span>
                        {role.isSystem && (
                          <Badge variant="secondary" className="text-xs">
                            System
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {role.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {role.usersCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={role.isSystem}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem onClick={() => onEditRole(role)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
