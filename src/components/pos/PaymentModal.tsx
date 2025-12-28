import { useState } from "react";
import { CreditCard, Banknote, Wallet, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type PaymentMethod = "cash" | "card" | "wallet";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onComplete: (method: PaymentMethod, amountPaid: number) => void;
}

export function PaymentModal({ open, onOpenChange, total, onComplete }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("cash");
  const [cashReceived, setCashReceived] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const cashAmount = parseFloat(cashReceived) || 0;
  const change = cashAmount - total;

  const quickAmounts = [
    Math.ceil(total),
    Math.ceil(total / 10) * 10,
    Math.ceil(total / 20) * 20,
    Math.ceil(total / 50) * 50,
  ].filter((v, i, a) => a.indexOf(v) === i && v >= total).slice(0, 4);

  const handleComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete(selectedMethod, selectedMethod === "cash" ? cashAmount : total);
      setIsProcessing(false);
      setCashReceived("");
    }, 1000);
  };

  const canComplete = selectedMethod === "cash" ? cashAmount >= total : true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>

        {/* Total Display */}
        <div className="text-center py-4 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground">Amount Due</p>
          <p className="text-3xl font-bold text-primary">${total.toFixed(2)}</p>
        </div>

        {/* Payment Methods */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "cash" as const, label: "Cash", icon: Banknote },
            { id: "card" as const, label: "Card", icon: CreditCard },
            { id: "wallet" as const, label: "Wallet", icon: Wallet },
          ].map((method) => (
            <Button
              key={method.id}
              variant={selectedMethod === method.id ? "default" : "outline"}
              className={cn(
                "flex flex-col h-20 gap-1",
                selectedMethod === method.id && "ring-2 ring-primary ring-offset-2"
              )}
              onClick={() => setSelectedMethod(method.id)}
            >
              <method.icon className="h-5 w-5" />
              <span className="text-xs">{method.label}</span>
            </Button>
          ))}
        </div>

        <Separator />

        {/* Cash Payment Details */}
        {selectedMethod === "cash" && (
          <div className="space-y-3">
            <div>
              <Label>Cash Received</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={cashReceived}
                onChange={(e) => setCashReceived(e.target.value)}
                className="text-lg font-semibold mt-1"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setCashReceived(amount.toString())}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            {cashAmount >= total && (
              <div className="p-3 bg-success/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Change Due</p>
                <p className="text-xl font-bold text-success">${change.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}

        {/* Card Payment Details */}
        {selectedMethod === "card" && (
          <div className="p-6 text-center bg-secondary/30 rounded-lg">
            <CreditCard className="h-12 w-12 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">
              Tap, insert, or swipe card on terminal
            </p>
          </div>
        )}

        {/* Wallet Payment Details */}
        {selectedMethod === "wallet" && (
          <div className="p-6 text-center bg-secondary/30 rounded-lg">
            <Wallet className="h-12 w-12 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">
              Scan QR code or use NFC to pay
            </p>
          </div>
        )}

        {/* Complete Button */}
        <Button
          size="lg"
          variant="hero"
          className="w-full"
          disabled={!canComplete || isProcessing}
          onClick={handleComplete}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Complete Payment
            </span>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
