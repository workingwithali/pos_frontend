"use client"

import { useState, useMemo, useRef } from "react"
import {
  Search,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  X,
  Printer,
} from "lucide-react"

import { usePOSStore, CartItem, Product, Sale } from "@/store/pos.store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function POSPage() {
  const { products, categories, taxRate, addSale } = usePOSStore()

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const [lastSale, setLastSale] = useState<Sale | null>(null)

  const receiptRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchCat =
        !selectedCategory || p.categoryId === selectedCategory
      return matchSearch && matchCat
    })
  }, [products, search, selectedCategory])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.product.id === product.id
      )

      if (existing) {
        if (existing.quantity >= product.stock)
          return prev

        return prev.map((c) =>
          c.product.id === product.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      }

      if (product.stock <= 0) return prev
      return [...prev, { product, quantity: 1 }]
    })
  }

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.product.id !== id) return c
          const newQty = c.quantity + delta
          if (newQty <= 0) return null
          if (newQty > c.product.stock) return c
          return { ...c, quantity: newQty }
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const subtotal = cart.reduce(
    (sum, c) => sum + c.product.price * c.quantity,
    0
  )

  const discountAmount = subtotal * (discount / 100)
  const taxAmount = (subtotal - discountAmount) * (taxRate / 100)
  const total = subtotal - discountAmount + taxAmount

  const confirmSale = (paymentMethod: "cash" | "card") => {
    if (cart.length === 0) return

    const sale: Sale = {
      id: `INV-${Date.now().toString(36).toUpperCase()}`,
      items: cart.map((c) => ({
        productName: c.product.name,
        quantity: c.quantity,
        price: c.product.price,
      })),
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      paymentMethod,
      date: new Date().toISOString(),
    }

    addSale(sale)
    setLastSale(sale)
    setCart([])
    setDiscount(0)
    setInvoiceOpen(true)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4">
      {/* Products */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-xl"
          />
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          <Button
            size="sm"
            variant={!selectedCategory ? "default" : "secondary"}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>

          {categories.map((c) => (
            <Button
              key={c.id}
              size="sm"
              variant={
                selectedCategory === c.id
                  ? "default"
                  : "secondary"
              }
              onClick={() => setSelectedCategory(c.id)}
            >
              {c.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto">
          {filtered.map((p) => (
            <Button
              key={p.id}
              variant="outline"
              className="h-auto flex flex-col items-start p-4 rounded-xl"
              onClick={() => addToCart(p)}
              disabled={p.stock <= 0}
            >
              <span className="font-semibold">
                {p.name}
              </span>
              <span className="text-primary font-bold mt-1">
                ${p.price.toFixed(2)}
              </span>
              <span className="text-xs mt-1 text-muted-foreground">
                {p.stock <= 0
                  ? "Out of stock"
                  : `${p.stock} in stock`}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-80 bg-card rounded-2xl shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Cart</h2>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {cart.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              Add products to start sale
            </p>
          )}

          {cart.map((c) => (
            <div
              key={c.product.id}
              className="flex items-center gap-2"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {c.product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${c.product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() =>
                    updateQty(c.product.id, -1)
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-6 text-center">
                  {c.quantity}
                </span>

                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() =>
                    updateQty(c.product.id, 1)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  setCart((prev) =>
                    prev.filter(
                      (x) =>
                        x.product.id !==
                        c.product.id
                    )
                  )
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tax ({taxRate}%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() => confirmSale("cash")}
            >
              <Banknote className="h-4 w-4 mr-2" />
              Cash
            </Button>

            <Button
              variant="outline"
              onClick={() => confirmSale("card")}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Card
            </Button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      <Dialog
        open={invoiceOpen}
        onOpenChange={setInvoiceOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Sale Complete ✓
            </DialogTitle>
          </DialogHeader>

          {lastSale && (
            <div className="space-y-3 text-sm">
              <div ref={receiptRef}>
                <p>
                  Invoice: {lastSale.id}
                </p>
                <p>
                  Date:{" "}
                  {new Date(
                    lastSale.date
                  ).toLocaleString()}
                </p>
                <p className="font-bold">
                  Total: $
                  {lastSale.total.toFixed(2)}
                </p>
              </div>

              <Button
                onClick={handlePrint}
                variant="outline"
                className="w-full"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}