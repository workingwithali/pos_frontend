// src/app/(dashboard)/sales/page.tsx
"use client";

import { useState } from "react";
import { useGetSales, useGetInvoice } from "@/hooks/useSales";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, FileText, Printer } from "lucide-react";
import { toast } from "sonner";

const SalesPage = () => {
  const { data: sales = [], isLoading, error } = useGetSales();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  // When selectedInvoiceId is set, it fetches the invoice text/html/data.
  // In many implementations it could be HTML that we dangerouslySetInnerHTML.
  // Alternatively, if it's JSON data, we would format it correctly here.
  const { data: invoiceData, isLoading: isLoadingInvoice } = useGetInvoice(
    selectedInvoiceId || "",
    !!selectedInvoiceId
  );

  const handleViewInvoice = (id: string) => {
    setSelectedInvoiceId(id);
  };

  const closeInvoice = () => {
    setSelectedInvoiceId(null);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && invoiceData) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Invoice</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
            </style>
          </head>
          <body>
            ${typeof invoiceData === 'string' ? invoiceData : JSON.stringify(invoiceData, null, 2)}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      toast.error("Failed to open print window or invoice not loaded.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-10 text-destructive">
        Failed to load sales history.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Sales History</h1>

      {sales.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground">
              No sales yet. Complete a sale from the POS terminal.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-2xl border overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {[...sales].reverse().map((sale) => (
                    <TableRow key={sale.id} className="hover:bg-muted/30">
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
                        <span className="rounded-lg bg-secondary/20 border border-secondary px-2.5 py-0.5 text-xs font-medium text-foreground capitalize">
                          {sale.paymentMethod}
                        </span>
                      </TableCell>

                      <TableCell className="text-right font-medium">
                        ${Number(sale.total).toFixed(2)}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewInvoice(sale.id)}
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Modal */}
      <Dialog open={!!selectedInvoiceId} onOpenChange={(open) => !open && closeInvoice()}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>

          <div className="p-4 bg-muted/20 border rounded-lg min-h-37.5 max-h-100 overflow-y-auto mt-2 text-sm whitespace-pre-wrap">
            {isLoadingInvoice ? (
              <div className="flex justify-center items-center h-full text-muted-foreground p-10">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading Invoice...
              </div>
            ) : invoiceData ? (
              // If the backend returns HTML string, it renders directly
              // If it returns an object, we stringify it to show details
              typeof invoiceData === "string" ? (
                <div dangerouslySetInnerHTML={{ __html: invoiceData }} />
              ) : (
                <pre className="font-mono text-xs text-muted-foreground">
                  {JSON.stringify(invoiceData, null, 2)}
                </pre>
              )
            ) : (
              <div className="text-center text-muted-foreground p-10">
                Invoice not found.
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={closeInvoice}>
              Close
            </Button>
            <Button onClick={handlePrint} disabled={isLoadingInvoice || !invoiceData}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesPage;