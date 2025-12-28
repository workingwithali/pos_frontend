import { format } from "date-fns";
import { Printer, Mail, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "./CartPanel";

interface ReceiptPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  amountPaid: number;
  change: number;
  onNewSale: () => void;
}

export function ReceiptPreview({
  open,
  onOpenChange,
  items,
  subtotal,
  discount,
  tax,
  total,
  paymentMethod,
  amountPaid,
  change,
  onNewSale,
}: ReceiptPreviewProps) {
  const receiptNumber = `RCP-${Date.now().toString().slice(-8)}`;
  const date = format(new Date(), "MMM dd, yyyy · HH:mm");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Receipt Preview
          </DialogTitle>
        </DialogHeader>

        {/* Receipt */}
        <div className="bg-white border rounded-lg p-4 font-mono text-xs space-y-3">
          {/* Header */}
          <div className="text-center">
            <h3 className="font-bold text-base text-foreground">POSFLOW</h3>
            <p className="text-muted-foreground">123 Business Street</p>
            <p className="text-muted-foreground">City, State 12345</p>
            <p className="text-muted-foreground">Tel: (555) 123-4567</p>
          </div>

          <Separator />

          {/* Receipt Info */}
          <div className="flex justify-between text-muted-foreground">
            <span>{receiptNumber}</span>
            <span>{date}</span>
          </div>

          <Separator />

          {/* Items */}
          <div className="space-y-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-foreground">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Summary */}
          <div className="space-y-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-${((subtotal * discount) / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-sm text-foreground">
              <span>TOTAL</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          {/* Payment Info */}
          <div className="space-y-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Payment Method</span>
              <span className="capitalize">{paymentMethod}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Amount Paid</span>
              <span>${amountPaid.toFixed(2)}</span>
            </div>
            {change > 0 && (
              <div className="flex justify-between font-bold text-foreground">
                <span>Change</span>
                <span>${change.toFixed(2)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Footer */}
          <div className="text-center text-muted-foreground">
            <p>Thank you for your purchase!</p>
            <p>Please come again</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>
        <Button variant="hero" className="w-full" onClick={onNewSale}>
          Start New Sale
        </Button>
      </DialogContent>
    </Dialog>
  );
}
