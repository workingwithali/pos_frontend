import { useState } from "react";
import { Image, FileText, Upload, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function BrandingSettings() {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [receiptHeader, setReceiptHeader] = useState("Welcome to RetailPro!");
  const [receiptFooter, setReceiptFooter] = useState("Thank you for shopping with us!\nVisit us again soon.");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [accentColor, setAccentColor] = useState("#f59e0b");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast({
        title: "Logo Uploaded",
        description: "Your logo has been uploaded successfully.",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Branding Updated",
      description: "Your branding settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Business Logo
          </CardTitle>
          <CardDescription>
            Upload your logo for receipts and the POS interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-full w-full object-contain rounded-lg"
                />
              ) : (
                <Image className="h-12 w-12 text-muted-foreground/50" />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo" className="cursor-pointer">
                <div className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors">
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </div>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
              </Label>
              <p className="text-xs text-muted-foreground">
                Recommended: 512x512px, PNG or SVG format
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Brand Colors
          </CardTitle>
          <CardDescription>
            Customize colors for your POS interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: primaryColor }}
                />
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1"
                  placeholder="#6366f1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex gap-2">
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: accentColor }}
                />
                <Input
                  id="accentColor"
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1"
                  placeholder="#f59e0b"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Receipt Customization
          </CardTitle>
          <CardDescription>
            Customize the header and footer text on printed receipts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receiptHeader">Receipt Header</Label>
            <Input
              id="receiptHeader"
              value={receiptHeader}
              onChange={(e) => setReceiptHeader(e.target.value)}
              placeholder="Welcome message or business slogan"
            />
            <p className="text-xs text-muted-foreground">
              Appears at the top of the receipt below your logo
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="receiptFooter">Receipt Footer</Label>
            <Textarea
              id="receiptFooter"
              value={receiptFooter}
              onChange={(e) => setReceiptFooter(e.target.value)}
              placeholder="Thank you message, return policy, etc."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Appears at the bottom of the receipt. Use line breaks for multiple lines.
            </p>
          </div>

          {/* Receipt Preview */}
          <div className="rounded-lg border bg-card p-4">
            <h4 className="text-sm font-medium mb-3">Receipt Preview</h4>
            <div className="mx-auto max-w-[280px] rounded border bg-background p-4 font-mono text-xs">
              <div className="text-center space-y-2">
                {logoPreview && (
                  <img src={logoPreview} alt="Logo" className="h-12 mx-auto" />
                )}
                <div className="font-bold">RETAILPRO STORE</div>
                <div className="text-muted-foreground">{receiptHeader}</div>
              </div>
              <div className="my-3 border-t border-dashed" />
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Item 1</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Item 2</span>
                  <span>$15.00</span>
                </div>
              </div>
              <div className="my-3 border-t border-dashed" />
              <div className="flex justify-between font-bold">
                <span>TOTAL</span>
                <span>$25.00</span>
              </div>
              <div className="my-3 border-t border-dashed" />
              <div className="text-center text-muted-foreground whitespace-pre-line">
                {receiptFooter}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}