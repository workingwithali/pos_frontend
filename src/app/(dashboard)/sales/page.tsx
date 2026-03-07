// src/app/(dashboard)/sales/page.tsx
"use client";

import { useState } from "react";
import { useGetSales, useGetInvoice, useGetSale } from "@/hooks/useSales";
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
  const { data: fullSale, isLoading: isLoadingSale } = useGetSale(
    selectedInvoiceId || "",
    !!selectedInvoiceId
  );

  const { data: invoiceBlob, isLoading: isLoadingInvoice } = useGetInvoice(
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
    if (invoiceBlob) {
      const url = URL.createObjectURL(invoiceBlob);
      const printWindow = window.open(url, "_blank");
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.print();
          URL.revokeObjectURL(url);
        });
      }
    } else {
      toast.error("Invoice PDF not ready yet.");
    }
  };

  const handleDownload = () => {
    if (invoiceBlob && fullSale) {
      const url = URL.createObjectURL(invoiceBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${fullSale.invoiceNumber || fullSale.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
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
                        {sale.createdAt && new Date(sale.createdAt).toLocaleString()}
                        \                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {sale.items.length} items
                      </TableCell>

                      <TableCell>
                        <span className="rounded-lg bg-secondary/20 border border-secondary px-2.5 py-0.5 text-xs font-medium text-foreground capitalize">
                          {sale.paymentMethod}
                        </span>
                      </TableCell>

                      <TableCell className="text-right font-medium">
                        ${Number(sale.totalAmount).toFixed(2)}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewInvoice(sale.id!)}
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
        <DialogContent
          className="sm:max-w-106.25"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>

          <div className="p-4 bg-muted/20 border rounded-lg min-h-[300px] max-h-[500px] overflow-y-auto mt-2 text-sm">
            {isLoadingSale ? (
              <div className="flex justify-center items-center h-[200px] text-muted-foreground p-10">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading Details...
              </div>
            ) : fullSale ? (
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-bold">Invoice: {fullSale.invoiceNumber}</span>
                  <span className="text-muted-foreground">{new Date(fullSale.createdAt || "").toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  {fullSale.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.product?.name || 'Unknown Product'} x {item.quantity}</span>
                      <span>${(Number(item.totalPrice)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${Number(fullSale.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${Number(fullSale.taxAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${Number(fullSale.totalAmount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-10">
                Sale details not found.
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={closeInvoice}>
              Close
            </Button>
            <Button variant="secondary" onClick={handleDownload} disabled={isLoadingInvoice || !invoiceBlob}>
              Download PDF
            </Button>
            <Button onClick={handlePrint} disabled={isLoadingInvoice || !invoiceBlob}>
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