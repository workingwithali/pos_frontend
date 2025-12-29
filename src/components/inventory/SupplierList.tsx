"use client";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  totalOrders: number;
  lastOrder: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "TechSupply Co.",
    contactPerson: "John Smith",
    email: "john@techsupply.com",
    phone: "+1 555-0101",
    address: "123 Tech Street, Silicon Valley, CA",
    status: "active",
    totalOrders: 45,
    lastOrder: "2024-01-15",
  },
  {
    id: "2",
    name: "Global Electronics",
    contactPerson: "Sarah Johnson",
    email: "sarah@globalelec.com",
    phone: "+1 555-0102",
    address: "456 Electronics Ave, New York, NY",
    status: "active",
    totalOrders: 32,
    lastOrder: "2024-01-18",
  },
  {
    id: "3",
    name: "Office Essentials",
    contactPerson: "Mike Brown",
    email: "mike@officeess.com",
    phone: "+1 555-0103",
    address: "789 Office Park, Chicago, IL",
    status: "active",
    totalOrders: 28,
    lastOrder: "2024-01-20",
  },
  {
    id: "4",
    name: "Premium Parts Inc.",
    contactPerson: "Emily Davis",
    email: "emily@premiumparts.com",
    phone: "+1 555-0104",
    address: "321 Parts Blvd, Austin, TX",
    status: "inactive",
    totalOrders: 15,
    lastOrder: "2023-12-10",
  },
];

export function SupplierList() {
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search suppliers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Suppliers</div>
          <p className="text-2xl font-bold">{suppliers.length}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Active</div>
          <p className="text-2xl font-bold">
            {suppliers.filter((s) => s.status === "active").length}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Orders</div>
          <p className="text-2xl font-bold">
            {suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>
                  <div className="font-medium">{supplier.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {supplier.contactPerson}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {supplier.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {supplier.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm max-w-50">
                    <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                    <span className="truncate">{supplier.address}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {supplier.totalOrders}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {supplier.lastOrder}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={supplier.status === "active" ? "default" : "secondary"}
                  >
                    {supplier.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
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
    </div>
  );
}
