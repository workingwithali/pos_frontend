"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, FileSpreadsheet } from "lucide-react";
import { SalesHistoryTable } from "@/components/sales/SalesHistoryTable";
import { DailySalesReport } from "@/components/sales/DailySalesReport";
import { TopProductsReport } from "@/components/sales/TopProductsReport";
import { ProfitLossChart } from "@/components/sales/ProfitLossChart";
import { ExpensesReport } from "@/components/sales/ExpensesReport";
import { toast } from "sonner";

export default function SalesReportsPage() {
  const [activeTab, setActiveTab] = useState("history");

  const handleExportCSV = () => {
    toast.success("CSV export started", {
      description: "Your file will download shortly.",
    });
  };

  const handleExportPDF = () => {
    toast.success("PDF export started", {
      description: "Your report is being generated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Sales & Reports</h1>
              <p className="text-muted-foreground">Track sales performance and generate reports</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportCSV}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" onClick={handleExportPDF}>
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="history">Sales History</TabsTrigger>
            <TabsTrigger value="daily">Daily Sales</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
            <TabsTrigger value="profit">Profit & Loss</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <SalesHistoryTable />
          </TabsContent>

          <TabsContent value="daily" className="mt-6">
            <DailySalesReport />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <TopProductsReport />
          </TabsContent>

          <TabsContent value="profit" className="mt-6">
            <ProfitLossChart />
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            <ExpensesReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
