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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, FileText, Truck } from "lucide-react";

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  orderDate: string;
  expectedDate: string;
  status: "draft" | "pending" | "approved" | "shipped" | "received" | "cancelled";
  totalItems: number;
  totalAmount: number;
}

const mockOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    supplier: "TechSupply Co.",
    orderDate: "2024-01-15",
    expectedDate: "2024-01-22",
    status: "received",
    totalItems: 50,
    totalAmount: 2500.0,
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    supplier: "Global Electronics",
    orderDate: "2024-01-18",
    expectedDate: "2024-01-25",
    status: "shipped",
    totalItems: 30,
    totalAmount: 1800.0,
  },
  {
    id: "3",
    poNumber: "PO-2024-003",
    supplier: "Office Essentials",
    orderDate: "2024-01-20",
    expectedDate: "2024-01-28",
    status: "approved",
    totalItems: 100,
    totalAmount: 3200.0,
  },
  {
    id: "4",
    poNumber: "PO-2024-004",
    supplier: "TechSupply Co.",
    orderDate: "2024-01-22",
    expectedDate: "2024-02-01",
    status: "pending",
    totalItems: 25,
    totalAmount: 950.0,
  },
  {
    id: "5",
    poNumber: "PO-2024-005",
    supplier: "Premium Parts Inc.",
    orderDate: "2024-01-23",
    expectedDate: "2024-02-05",
    status: "draft",
    totalItems: 15,
    totalAmount: 1200.0,
  },
];

const statusConfig = {
  draft: { label: "Draft", variant: "outline" as const },
  pending: { label: "Pending", variant: "secondary" as const },
  approved: { label: "Approved", variant: "default" as const },
  shipped: { label: "Shipped", variant: "default" as const },
  received: { label: "Received", variant: "secondary" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
};

export function PurchaseOrderList() {
  const [orders] = useState<PurchaseOrder[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by PO number or supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Orders</div>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Pending</div>
          <p className="text-2xl font-bold">
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">In Transit</div>
          <p className="text-2xl font-bold">
            {orders.filter((o) => o.status === "shipped").length}
          </p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Value</div>
          <p className="text-2xl font-bold">
            {formatCurrency(orders.reduce((sum, o) => sum + o.totalAmount, 0))}
          </p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Expected Date</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono font-medium">
                  {order.poNumber}
                </TableCell>
                <TableCell>{order.supplier}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.expectedDate}</TableCell>
                <TableCell className="text-right">{order.totalItems}</TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(order.totalAmount)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusConfig[order.status].variant}>
                    {statusConfig[order.status].label}
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
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Print PO
                      </DropdownMenuItem>
                      {order.status === "shipped" && (
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" />
                          Mark as Received
                        </DropdownMenuItem>
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
