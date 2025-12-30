'use client';
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TenantList } from "@/components/admin/TenantList";
import { SubscriptionControls } from "@/components/admin/SubscriptionControls";
import { RevenueDashboard } from "@/components/admin/RevenueDashboard";
import { SystemLogs } from "@/components/admin/SystemLogs";
import  Link from "next/link";

export default function AdminPanelPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground">Super Admin Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="tenants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="tenants">
            <TenantList />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionControls />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueDashboard />
          </TabsContent>

          <TabsContent value="logs">
            <SystemLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
