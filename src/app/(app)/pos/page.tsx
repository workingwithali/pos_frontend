"use client";
import { useState } from "react";
import { ArrowLeft, User, Phone, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/pos/ProductGrid";
import { CartPanel, CartItem } from "@/components/pos/CartPanel";
import { PaymentModal } from "@/components/pos/PaymentModal";
import { ReceiptPreview } from "@/components/pos/ReceiptPreview";
import { toast } from "@/hooks/use-toast";

export default function POSTerminalPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [lastPayment, setLastPayment] = useState({
    method: "cash",
    amountPaid: 0,
  });

  // Customer
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState<string | undefined>();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxRate = 0.08;
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + taxAmount;

  // Cart Handlers
  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setCustomerPhone("");
    setCustomerName(undefined);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from the cart.",
    });
  };

  const handleHoldBill = () => {
    toast({
      title: "Bill on Hold",
      description: `Order with ${cartItems.length} items has been saved.`,
    });
    setCartItems([]);
    setDiscount(0);
    setCustomerPhone("");
    setCustomerName(undefined);
  };

  const handlePaymentComplete = (method: string, amountPaid: number) => {
    setLastPayment({ method, amountPaid });
    setPaymentModalOpen(false);
    setReceiptModalOpen(true);
  };

  const handleNewSale = () => {
    setReceiptModalOpen(false);
    setCartItems([]);
    setDiscount(0);
    setCustomerPhone("");
    setCustomerName(undefined);
    toast({
      title: "Ready for Next Sale",
      description: "The register is ready for a new transaction.",
    });
  };

  // Customer Phone Change
  const handleCustomerPhoneChange = (phone: string) => {
    setCustomerPhone(phone);

    // Example: mock customer lookup
    if (phone === "03001234567") {
      setCustomerName("Ali Khan");
    } else {
      setCustomerName(undefined);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold text-lg">POS Terminal</h1>
            <p className="text-xs text-muted-foreground">Register #1</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/customers" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <div>Add Customers</div>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Products */}
        <div className="flex-1 p-4 overflow-hidden">
          <ProductGrid onAddToCart={handleAddToCart} />
        </div>

        {/* Right Panel - Cart */}
        <div className="w-96 border-l p-4 bg-secondary/20">
          <CartPanel
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onHoldBill={handleHoldBill}
            onPayNow={() => setPaymentModalOpen(true)}
            discount={discount}
            onDiscountChange={setDiscount}
            customerPhone={customerPhone}
            customerName={customerName}
            onCustomerPhoneChange={handleCustomerPhoneChange}
            onClearCustomer={() => {
              setCustomerPhone("");
              setCustomerName(undefined);
            }}
          />
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        total={total}
        onComplete={handlePaymentComplete}
      />

      {/* Receipt Preview */}
      <ReceiptPreview
        open={receiptModalOpen}
        onOpenChange={setReceiptModalOpen}
        items={cartItems}
        subtotal={subtotal}
        discount={discount}
        tax={taxAmount}
        total={total}
        paymentMethod={lastPayment.method}
        amountPaid={lastPayment.amountPaid}
        change={lastPayment.amountPaid - total}
        customerName={customerName}
        onNewSale={handleNewSale}
      />
    </div>
  );
}
