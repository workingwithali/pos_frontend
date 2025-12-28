import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Eye, Download } from "lucide-react";

interface Sale {
  id: string;
  invoiceNo: string;
  date: string;
  customer: string;
  branch: string;
  staff: string;
  items: number;
  total: number;
  paymentMethod: string;
  status: "completed" | "refunded" | "pending";
}

const mockSales: Sale[] = [
  { id: "1", invoiceNo: "INV-001", date: "2024-01-15", customer: "John Doe", branch: "Main Store", staff: "Alice", items: 3, total: 156.50, paymentMethod: "Card", status: "completed" },
  { id: "2", invoiceNo: "INV-002", date: "2024-01-15", customer: "Jane Smith", branch: "Main Store", staff: "Bob", items: 5, total: 289.00, paymentMethod: "Cash", status: "completed" },
  { id: "3", invoiceNo: "INV-003", date: "2024-01-14", customer: "Mike Johnson", branch: "Branch 2", staff: "Alice", items: 2, total: 78.25, paymentMethod: "Card", status: "refunded" },
  { id: "4", invoiceNo: "INV-004", date: "2024-01-14", customer: "Sarah Williams", branch: "Main Store", staff: "Charlie", items: 7, total: 445.75, paymentMethod: "Cash", status: "completed" },
  { id: "5", invoiceNo: "INV-005", date: "2024-01-13", customer: "David Brown", branch: "Branch 2", staff: "Bob", items: 1, total: 35.00, paymentMethod: "Card", status: "pending" },
  { id: "6", invoiceNo: "INV-006", date: "2024-01-13", customer: "Emily Davis", branch: "Main Store", staff: "Alice", items: 4, total: 198.50, paymentMethod: "Mobile", status: "completed" },
];

export function SalesHistoryTable() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [branch, setBranch] = useState("all");
  const [staff, setStaff] = useState("all");

  const filteredSales = mockSales.filter((sale) => {
    const matchesSearch = sale.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      sale.customer.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = branch === "all" || sale.branch === branch;
    const matchesStaff = staff === "all" || sale.staff === staff;
    const matchesDateFrom = !dateFrom || sale.date >= dateFrom;
    const matchesDateTo = !dateTo || sale.date <= dateTo;
    return matchesSearch && matchesBranch && matchesStaff && matchesDateFrom && matchesDateTo;
  });

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

  const getStatusBadge = (status: Sale["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Completed</Badge>;
      case "refunded":
        return <Badge variant="destructive">Refunded</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoice or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-[140px]"
          />
          <span className="text-muted-foreground">to</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-[140px]"
          />
        </div>
        <Select value={branch} onValueChange={setBranch}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="Main Store">Main Store</SelectItem>
            <SelectItem value="Branch 2">Branch 2</SelectItem>
          </SelectContent>
        </Select>
        <Select value={staff} onValueChange={setStaff}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Staff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Staff</SelectItem>
            <SelectItem value="Alice">Alice</SelectItem>
            <SelectItem value="Bob">Bob</SelectItem>
            <SelectItem value="Charlie">Charlie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id} className="hover:bg-muted/30">
                <TableCell className="font-medium text-primary">{sale.invoiceNo}</TableCell>
                <TableCell className="text-muted-foreground">{sale.date}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.branch}</TableCell>
                <TableCell>{sale.staff}</TableCell>
                <TableCell className="text-center">{sale.items}</TableCell>
                <TableCell className="text-right font-medium">${sale.total.toFixed(2)}</TableCell>
                <TableCell>{sale.paymentMethod}</TableCell>
                <TableCell>{getStatusBadge(sale.status)}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
        <span className="text-muted-foreground">
          Showing {filteredSales.length} of {mockSales.length} sales
        </span>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Sales</p>
          <p className="text-2xl font-bold text-primary">${totalSales.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
