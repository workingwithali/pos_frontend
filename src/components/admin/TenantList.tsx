import { useState } from "react";
import { Search, MoreHorizontal, Building2, Mail, Calendar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Tenant {
  id: string;
  businessName: string;
  email: string;
  plan: string;
  status: "active" | "trial" | "expired" | "suspended";
  users: number;
  createdAt: string;
  trialEndsAt?: string;
  lastActive: string;
}

const mockTenants: Tenant[] = [
  {
    id: "1",
    businessName: "Coffee Corner",
    email: "admin@coffeecorner.com",
    plan: "Pro",
    status: "active",
    users: 5,
    createdAt: "2024-01-15",
    lastActive: "2024-01-20",
  },
  {
    id: "2",
    businessName: "Tech Store Plus",
    email: "owner@techstoreplus.com",
    plan: "Enterprise",
    status: "active",
    users: 12,
    createdAt: "2023-11-20",
    lastActive: "2024-01-20",
  },
  {
    id: "3",
    businessName: "Fresh Mart",
    email: "manager@freshmart.com",
    plan: "Basic",
    status: "trial",
    users: 2,
    createdAt: "2024-01-10",
    trialEndsAt: "2024-02-10",
    lastActive: "2024-01-19",
  },
  {
    id: "4",
    businessName: "Urban Boutique",
    email: "info@urbanboutique.com",
    plan: "Pro",
    status: "expired",
    users: 3,
    createdAt: "2023-08-05",
    lastActive: "2024-01-05",
  },
  {
    id: "5",
    businessName: "Quick Bites",
    email: "hello@quickbites.com",
    plan: "Basic",
    status: "suspended",
    users: 1,
    createdAt: "2023-12-01",
    lastActive: "2023-12-20",
  },
];

const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/20",
  trial: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  expired: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  suspended: "bg-red-500/10 text-red-500 border-red-500/20",
};

export function TenantList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTenants = mockTenants.filter((tenant) => {
    const matchesSearch =
      tenant.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{tenant.businessName}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {tenant.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{tenant.plan}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[tenant.status]} variant="outline">
                    {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {tenant.users}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {tenant.createdAt}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{tenant.lastActive}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Subscription</DropdownMenuItem>
                      <DropdownMenuItem>Impersonate</DropdownMenuItem>
                      {tenant.status === "suspended" ? (
                        <DropdownMenuItem>Reactivate</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                      )}
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
