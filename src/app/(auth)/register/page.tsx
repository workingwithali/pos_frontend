"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Eye, EyeOff, ArrowRight, ArrowLeft, Building2, Globe, DollarSign, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
];

const timezones = [
  { value: "America/New_York", label: "Eastern Time (US)" },
  { value: "America/Chicago", label: "Central Time (US)" },
  { value: "America/Denver", label: "Mountain Time (US)" },
  { value: "America/Los_Angeles", label: "Pacific Time (US)" },
  { value: "Europe/London", label: "London (UK)" },
  { value: "Europe/Paris", label: "Paris (EU)" },
  { value: "Asia/Tokyo", label: "Tokyo (Japan)" },
  { value: "Asia/Singapore", label: "Singapore" },
];

const businessTypes = [
  "Retail Store",
  "Restaurant / Cafe",
  "Fashion & Apparel",
  "Electronics",
  "Grocery",
  "Services",
  "Other",
];

export default function RegisterPage() {
  const navigate = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Step 1: Account details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Step 2: Business details
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("America/New_York");

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && fullName) {
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Account created successfully!", {
      description: "Let's set up your store...",
    });
    
    navigate.push("/onboarding");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">SwiftPOS</span>
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-border"}`} />
          <div className={`w-12 h-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-border"}`} />
          <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-border"}`} />
        </div>

        <Card variant="elevated" className="border border-border/50">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Create Your Account</CardTitle>
                  <CardDescription>
                    Start your 14-day free trial. No credit card required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStep1Submit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero" 
                      className="w-full" 
                      size="lg"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardContent>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Set Up Your Business</CardTitle>
                  <CardDescription>
                    Tell us about your business to customize your experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        Business Name
                      </Label>
                      <Input
                        id="businessName"
                        type="text"
                        placeholder="Acme Store"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType" className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        Business Type
                      </Label>
                      <Select value={businessType} onValueChange={setBusinessType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency" className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          Currency
                        </Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((c) => (
                              <SelectItem key={c.code} value={c.code}>
                                {c.symbol} {c.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Timezone
                        </Label>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timezones.map((tz) => (
                              <SelectItem key={tz.value} value={tz.value}>
                                {tz.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1" 
                        size="lg"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        variant="hero" 
                        className="flex-1" 
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating..." : "Create Store"}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>

                  <p className="text-center text-xs text-muted-foreground mt-6">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}
