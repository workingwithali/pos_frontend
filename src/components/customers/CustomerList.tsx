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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Phone, Mail } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalPurchases: number;
  creditBalance: number;
  status: "active" | "inactive";
  lastVisit: string;
  joinDate: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@email.com",
    phone: "+1 555-0101",
    totalPurchases: 2450.0,
    creditBalance: 150.0,
    status: "active",
    lastVisit: "2024-01-18",
    joinDate: "2023-06-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@email.com",
    phone: "+1 555-0102",
    totalPurchases: 890.0,
    creditBalance: 0,
    status: "active",
    lastVisit: "2024-01-15",
    joinDate: "2023-08-22",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@email.com",
    phone: "+1 555-0103",
    totalPurchases: 5670.0,
    creditBalance: 320.0,
    status: "active",
    lastVisit: "2024-01-20",
    joinDate: "2022-11-10",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@email.com",
    phone: "+1 555-0104",
    totalPurchases: 340.0,
    creditBalance: 0,
    status: "inactive",
    lastVisit: "2023-12-01",
    joinDate: "2023-09-05",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma@email.com",
    phone: "+1 555-0105",
    totalPurchases: 1230.0,
    creditBalance: 75.0,
    status: "active",
    lastVisit: "2024-01-19",
    joinDate: "2023-04-18",
  },
];

interface CustomerListProps {
  onViewProfile: (customerId: string) => void;
}

export function CustomerList({ onViewProfile }: CustomerListProps) {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Customers</div>
          <p className="text-2xl font-bold">{customers.length}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Active</div>
          <p className="text-2xl font-bold">
            {customers.filter((c) => c.status === "active").length}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Sales</div>
          <p className="text-2xl font-bold">
            {formatCurrency(customers.reduce((sum, c) => sum + c.totalPurchases, 0))}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Outstanding Credit</div>
          <p className="text-2xl font-bold">
            {formatCurrency(customers.reduce((sum, c) => sum + c.creditBalance, 0))}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Total Purchases</TableHead>
              <TableHead className="text-right">Credit Balance</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(customer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Since {customer.joinDate}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(customer.totalPurchases)}
                </TableCell>
                <TableCell className="text-right">
                  {customer.creditBalance > 0 ? (
                    <span className="font-semibold text-primary">
                      {formatCurrency(customer.creditBalance)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {customer.lastVisit}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={customer.status === "active" ? "default" : "secondary"}
                  >
                    {customer.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewProfile(customer.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
