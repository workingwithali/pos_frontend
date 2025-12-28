import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingBag,
  Edit,
  DollarSign,
} from "lucide-react";

interface CustomerProfileProps {
  customerId: string;
  onBack: () => void;
}

const mockCustomer = {
  id: "1",
  name: "Alice Johnson",
  email: "alice@email.com",
  phone: "+1 555-0101",
  address: "123 Main Street, New York, NY 10001",
  status: "active" as const,
  totalPurchases: 2450.0,
  creditBalance: 150.0,
  joinDate: "2023-06-15",
  lastVisit: "2024-01-18",
  notes: "Preferred customer, likes electronics and accessories.",
};

const mockPurchaseHistory = [
  {
    id: "INV-001",
    date: "2024-01-18",
    items: 3,
    total: 245.0,
    paymentMethod: "Card",
    status: "completed",
  },
  {
    id: "INV-002",
    date: "2024-01-10",
    items: 5,
    total: 520.0,
    paymentMethod: "Cash",
    status: "completed",
  },
  {
    id: "INV-003",
    date: "2024-01-05",
    items: 2,
    total: 89.0,
    paymentMethod: "Credit",
    status: "completed",
  },
  {
    id: "INV-004",
    date: "2023-12-28",
    items: 4,
    total: 312.0,
    paymentMethod: "Card",
    status: "completed",
  },
  {
    id: "INV-005",
    date: "2023-12-15",
    items: 1,
    total: 150.0,
    paymentMethod: "Cash",
    status: "refunded",
  },
];

const mockCreditHistory = [
  {
    id: "CR-001",
    date: "2024-01-18",
    type: "credit" as const,
    amount: 50.0,
    description: "Store credit added",
    balance: 150.0,
  },
  {
    id: "CR-002",
    date: "2024-01-05",
    type: "debit" as const,
    amount: 20.0,
    description: "Credit used on purchase",
    balance: 100.0,
  },
  {
    id: "CR-003",
    date: "2023-12-20",
    type: "credit" as const,
    amount: 120.0,
    description: "Refund to store credit",
    balance: 120.0,
  },
];

export function CustomerProfile({ customerId, onBack }: CustomerProfileProps) {
  const customer = mockCustomer;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Customer Profile</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{customer.name}</h3>
              <Badge
                variant={customer.status === "active" ? "default" : "secondary"}
                className="mt-2"
              >
                {customer.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since {customer.joinDate}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">{customer.notes}</p>
            </div>

            <Button variant="outline" className="w-full mt-6">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Purchases</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(customer.totalPurchases)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Balance</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(customer.creditBalance)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p className="text-xl font-bold">{customer.lastVisit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="purchases">
            <TabsList>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="credit">Credit History</TabsTrigger>
            </TabsList>

            <TabsContent value="purchases" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Items</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPurchaseHistory.map((purchase) => (
                        <TableRow key={purchase.id}>
                          <TableCell className="font-mono">
                            {purchase.id}
                          </TableCell>
                          <TableCell>{purchase.date}</TableCell>
                          <TableCell className="text-right">
                            {purchase.items}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {formatCurrency(purchase.total)}
                          </TableCell>
                          <TableCell>{purchase.paymentMethod}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                purchase.status === "completed"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {purchase.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="credit" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Credit Transactions</CardTitle>
                  <Button size="sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Add Credit
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCreditHistory.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono">
                            {transaction.id}
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell
                            className={`text-right font-semibold ${
                              transaction.type === "credit"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(transaction.balance)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
