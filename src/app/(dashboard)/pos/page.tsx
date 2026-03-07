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

import { usePOSStore, Product, Sale } from "@/store/pos.store"
import { useCreateSale, useGetSale, useGetInvoice } from "@/hooks/useSales"
import { useGetProducts } from "@/hooks/useProducts"
import { useGetCategories } from "@/hooks/useCategoriesApi"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CartItem } from "@/types/cart"

export default function POSPage() {
  const { taxRate } = usePOSStore()
  const createSale = useCreateSale()

  const { data: products = [], isLoading: productsLoading } = useGetProducts()
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategories()

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const [lastSaleId, setLastSaleId] = useState<string | null>(null)

  const { data: fullSale, isLoading: saleLoading } = useGetSale(
    lastSaleId || "",
    !!lastSaleId && invoiceOpen
  )

  const { data: invoiceBlob } = useGetInvoice(
    lastSaleId || "",
    !!lastSaleId && invoiceOpen
  )

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

  const confirmSale = async (paymentMethod: "cash" | "card") => {
    if (cart.length === 0) return

    try {
      const payload = {
        items: cart.map((c) => ({
          productId: c.product.id,
          quantity: c.quantity,
        })),
        discountPercent: discount,
        paymentMethod: paymentMethod.toUpperCase(), // important
      }

      const response = await createSale.mutateAsync(payload)

      setLastSaleId(response.id!)
      setCart([])
      setDiscount(0)
      setInvoiceOpen(true)

      toast.success("Sale processed successfully")
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Sale failed")
    }
  }

  const handlePrint = () => {
    if (invoiceBlob) {
      const url = URL.createObjectURL(invoiceBlob)
      const printWindow = window.open(url, "_blank")
      if (printWindow) {
        printWindow.addEventListener("load", () => {
          printWindow.print()
          URL.revokeObjectURL(url)
        })
      }
    } else {
      window.print()
    }
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

          {categoriesLoading ? (
            <div className="flex items-center text-sm text-muted-foreground ml-2">Loading categories...</div>
          ) : (
            categories.map((c) => (
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
            ))
          )}
        </div>

        {productsLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground animate-pulse">Loading products...</p>
          </div>
        ) : (
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
                  ${Number(p.price).toFixed(2)}
                </span>
                <span className="text-xs mt-1 text-muted-foreground">
                  {p.stock <= 0
                    ? "Out of stock"
                    : `${p.stock} in stock`}
                </span>
              </Button>
            ))}
          </div>
        )}
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
                  ${Number(c.product.price).toFixed(2)}
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

          <div className="flex justify-between text-sm items-center gap-2">
            <span>Discount (%)</span>
            <Input
              type="number"
              placeholder="0%"
              min="0"
              max="100"
              value={discount || ""}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-20 h-8 text-right rounded-lg"
            />
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-red-500 font-medium">
              <span>Discount Amount</span>
              <span>-${Number(discountAmount).toFixed(2)}</span>
            </div>
          )}

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
              disabled={createSale.isPending}
            >
              <Banknote className="h-4 w-4 mr-2" />
              Cash
            </Button>

            <Button
              variant="outline"
              onClick={() => confirmSale("card")}
              disabled={createSale.isPending}
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
        <DialogContent
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>
              Sale Complete ✓
            </DialogTitle>
          </DialogHeader>

          {saleLoading ? (
            <div className="flex justify-center py-10">
              <p className="text-muted-foreground animate-pulse">Loading receipt...</p>
            </div>
          ) : fullSale && (
            <div className="space-y-4 text-sm">
              <div ref={receiptRef} className="space-y-4 p-4 border rounded-xl bg-muted/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base">Receipt</h3>
                    <p className="text-xs text-muted-foreground">#{fullSale.invoiceNumber || fullSale.id}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(fullSale.createdAt || new Date()).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-2">
                  {fullSale.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.product?.name || `Product ${idx + 1}`} x {item.quantity}</span>
                      <span>${(Number(item.totalPrice || (item.unitPrice * item.quantity))).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${Number(fullSale.subtotal).toFixed(2)}</span>
                  </div>
                  {Number(fullSale.discountAmount) > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>Discount</span>
                      <span>-${Number(fullSale.discountAmount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${Number(fullSale.taxAmount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-1">
                    <span>Total</span>
                    <span>${Number(fullSale.totalAmount).toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-dashed">
                  <p className="text-xs font-medium uppercase">{fullSale.paymentMethod}</p>
                  <p className="text-xs text-muted-foreground mt-1">Thank you for your purchase!</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="flex-1"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
                {invoiceBlob && (
                  <Button
                    onClick={() => {
                      const url = URL.createObjectURL(invoiceBlob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `Invoice-${fullSale.invoiceNumber || fullSale.id}.pdf`
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                    variant="secondary"
                    className="flex-1"
                  >
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}