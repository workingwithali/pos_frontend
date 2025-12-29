"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseList, Expense } from "@/components/expenses/ExpenseList";
import { ExpenseSummary } from "@/components/expenses/ExpenseSummary";
import { ExpenseFormData } from "@/components/expenses/ExpenseForm";
import { List, BarChart3 } from "lucide-react";
import { format } from "date-fns";

const initialExpenses: Expense[] = [
  { id: "1", date: "2024-01-15", category: "Rent", description: "Monthly store rent", amount: 5000, paymentMethod: "Bank Transfer", status: "paid" },
  { id: "2", date: "2024-01-14", category: "Utilities", description: "Electricity bill", amount: 450, paymentMethod: "Card", status: "paid" },
  { id: "3", date: "2024-01-13", category: "Salaries", description: "Staff salaries", amount: 12000, paymentMethod: "Bank Transfer", status: "paid" },
  { id: "4", date: "2024-01-12", category: "Inventory", description: "Stock purchase", amount: 8500, paymentMethod: "Card", status: "pending" },
  { id: "5", date: "2024-01-10", category: "Marketing", description: "Social media ads", amount: 1200, paymentMethod: "Card", status: "paid" },
  { id: "6", date: "2024-01-08", category: "Maintenance", description: "Equipment repair", amount: 350, paymentMethod: "Cash", status: "overdue" },
  { id: "7", date: "2024-01-05", category: "Utilities", description: "Internet service", amount: 150, paymentMethod: "Card", status: "paid" },
  { id: "8", date: "2024-01-03", category: "Supplies", description: "Office supplies", amount: 280, paymentMethod: "Cash", status: "paid" },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const handleAddExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      date: format(data.date, "yyyy-MM-dd"),
      category: data.category,
      description: data.description,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      status: "pending",
      notes: data.notes,
    };
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track and manage your business expenses</p>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              Expense List
            </TabsTrigger>
            <TabsTrigger value="summary" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Summary & Charts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <ExpenseList
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </TabsContent>

          <TabsContent value="summary">
            <ExpenseSummary expenses={expenses} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
