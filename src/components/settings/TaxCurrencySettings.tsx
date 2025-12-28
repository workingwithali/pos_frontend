import { useState } from "react";
import { Percent, DollarSign, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface TaxRate {
  id: string;
  name: string;
  rate: number;
  isDefault: boolean;
}

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
];

export function TaxCurrencySettings() {
  const { toast } = useToast();
  const [currency, setCurrency] = useState("USD");
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [roundToNearest, setRoundToNearest] = useState("0.01");
  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    { id: "1", name: "Standard Tax", rate: 8.875, isDefault: true },
    { id: "2", name: "Reduced Tax", rate: 4.5, isDefault: false },
    { id: "3", name: "Zero Tax", rate: 0, isDefault: false },
  ]);
  const [newTaxName, setNewTaxName] = useState("");
  const [newTaxRate, setNewTaxRate] = useState("");

  const handleAddTax = () => {
    if (newTaxName && newTaxRate) {
      setTaxRates([
        ...taxRates,
        {
          id: Date.now().toString(),
          name: newTaxName,
          rate: parseFloat(newTaxRate),
          isDefault: false,
        },
      ]);
      setNewTaxName("");
      setNewTaxRate("");
      toast({
        title: "Tax Rate Added",
        description: `${newTaxName} has been added.`,
      });
    }
  };

  const handleDeleteTax = (id: string) => {
    setTaxRates(taxRates.filter((t) => t.id !== id));
    toast({
      title: "Tax Rate Deleted",
      description: "The tax rate has been removed.",
    });
  };

  const handleSetDefault = (id: string) => {
    setTaxRates(
      taxRates.map((t) => ({
        ...t,
        isDefault: t.id === id,
      }))
    );
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Tax and currency settings have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Currency Settings
          </CardTitle>
          <CardDescription>
            Configure your store's currency and pricing display
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.symbol} {c.code} - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rounding">Round Prices To</Label>
              <Select value={roundToNearest} onValueChange={setRoundToNearest}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.01">$0.01 (cents)</SelectItem>
                  <SelectItem value="0.05">$0.05</SelectItem>
                  <SelectItem value="0.10">$0.10</SelectItem>
                  <SelectItem value="1.00">$1.00 (whole dollar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label>Tax-Inclusive Pricing</Label>
              <p className="text-sm text-muted-foreground">
                Display prices with tax already included
              </p>
            </div>
            <Switch checked={taxInclusive} onCheckedChange={setTaxInclusive} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Tax Rates
          </CardTitle>
          <CardDescription>
            Manage tax rates for your products and services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Name</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxRates.map((tax) => (
                <TableRow key={tax.id}>
                  <TableCell className="font-medium">{tax.name}</TableCell>
                  <TableCell>{tax.rate}%</TableCell>
                  <TableCell>
                    <Switch
                      checked={tax.isDefault}
                      onCheckedChange={() => handleSetDefault(tax.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTax(tax.id)}
                      disabled={tax.isDefault}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex gap-2 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="newTaxName">Tax Name</Label>
              <Input
                id="newTaxName"
                value={newTaxName}
                onChange={(e) => setNewTaxName(e.target.value)}
                placeholder="e.g., State Tax"
              />
            </div>
            <div className="w-32 space-y-2">
              <Label htmlFor="newTaxRate">Rate (%)</Label>
              <Input
                id="newTaxRate"
                type="number"
                step="0.01"
                value={newTaxRate}
                onChange={(e) => setNewTaxRate(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <Button onClick={handleAddTax} disabled={!newTaxName || !newTaxRate}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}