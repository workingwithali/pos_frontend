"use client";

import { useSales } from "@/hooks/useSales";
import { useSettingsStore } from "@/store/settingsStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

const SalesPage = () => {
  const { data, isLoading } = useSales();
  const sales = Array.isArray(data) ? data : [];


  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Sales History</h1>

      {sales.length === 0 ? (
        <Card className="rounded-2xl">
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground">
              No sales yet. Complete a sale from the POS terminal.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {[...sales].reverse().map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">
                        {sale.id}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {new Date(sale.date).toLocaleString()}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {sale.items.length} items
                      </TableCell>

                      <TableCell>
                        <span className="rounded-lg bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground capitalize">
                          {sale.paymentMethod}
                        </span>
                      </TableCell>

                      <TableCell className="text-right font-medium">
                        PKR
                        {sale.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalesPage;