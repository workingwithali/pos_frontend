import { Minus, Plus, Trash2, Percent, Phone, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartPanelProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  onHoldBill: () => void;
  onPayNow: () => void;
  discount: number;
  onDiscountChange: (discount: number) => void;

  // Customer props
  customerPhone: string;
  customerName?: string;
  onCustomerPhoneChange: (phone: string) => void;
  onClearCustomer: () => void;
}

export function CartPanel({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onHoldBill,
  onPayNow,
  discount,
  onDiscountChange,
  customerPhone,
  customerName,
  onCustomerPhoneChange,
  onClearCustomer,
}: CartPanelProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxRate = 0.08; // 8% tax
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + taxAmount;

  return (
    <Card className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Current Order</h2>
        <span className="text-sm text-muted-foreground">{items.length} items</span>
      </div>

      {/* Customer Section */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="Customer phone number"
            value={customerPhone}
            onChange={(e) => onCustomerPhoneChange(e.target.value)}
            className="flex-1"
          />
          {customerPhone && (
            <Button variant="ghost" size="iconSm" onClick={onClearCustomer}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {customerName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>
              Customer: <span className="font-medium">{customerName}</span>
            </span>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <ScrollArea className="flex-1 -mx-4 px-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <span className="text-4xl mb-2">🛒</span>
            <p className="text-sm">Cart is empty</p>
            <p className="text-xs">Tap products to add them</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="iconSm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="iconSm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="w-16 text-right">
                  <span className="font-semibold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="iconSm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Discount Input */}
      <div className="mt-4 flex items-center gap-2">
        <Percent className="h-4 w-4 text-muted-foreground" />
        <Input
          type="number"
          placeholder="Discount %"
          value={discount || ""}
          onChange={(e) => onDiscountChange(Number(e.target.value))}
          className="flex-1"
          min={0}
          max={100}
        />
      </div>

      <Separator className="my-4" />

      {/* Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <span>Discount ({discount}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onHoldBill} disabled={items.length === 0}>
          Hold Bill
        </Button>
        <Button variant="outline" onClick={onClearCart} disabled={items.length === 0}>
          Clear Cart
        </Button>
      </div>
      <Button
        className="mt-2 w-full"
        size="lg"
        variant="hero"
        onClick={onPayNow}
        disabled={items.length === 0}
      >
        Pay Now · ${total.toFixed(2)}
      </Button>
    </Card>
  );
}
