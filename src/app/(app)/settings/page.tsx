"use client";
import { ArrowLeft, Building2, Percent, Palette, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessInfoForm } from "@/components/settings/BusinessInfoForm";
import { TaxCurrencySettings } from "@/components/settings/TaxCurrencySettings";
import { BrandingSettings } from "@/components/settings/BrandingSettings";
import { BranchManagement } from "@/components/settings/BranchManagement";
import  Link  from "next/link";

export default function SettingsPage() {
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
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Configure your business settings and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="business" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Business Info</span>
              <span className="sm:hidden">Business</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              <span className="hidden sm:inline">Tax & Currency</span>
              <span className="sm:hidden">Tax</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Branding</span>
              <span className="sm:hidden">Brand</span>
            </TabsTrigger>
            <TabsTrigger value="branches" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Branches</span>
              <span className="sm:hidden">Branches</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="business">
            <BusinessInfoForm />
          </TabsContent>

          <TabsContent value="tax">
            <TaxCurrencySettings />
          </TabsContent>

          <TabsContent value="branding">
            <BrandingSettings />
          </TabsContent>

          <TabsContent value="branches">
            <BranchManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}