"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/types/auth.schema";
import { Tenant } from "@/types/tenant";
import { useSignup } from "@/hooks/useAuth";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const router = useRouter();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      currency: "USD",
    }
  });

  const currencyValue = watch("currency");

  const mutation = useSignup();

  const onSubmit = (data: any) => mutation.mutate(data, {
    onSuccess: () => {
      router.push('/'); // Redirect to home page after login
      console.log('Signup successful, access token set');
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <ShoppingBag className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create your shop</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start your 14-day free trial
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl bg-card p-8 pos-shadow-md space-y-4"
        >
          <div className="space-y-2">
            <Label>Shop Name</Label>
            <Input {...register("shopName")} placeholder="My Coffee Shop" className="h-11 rounded-xl" />
            {errors.shopName && <p className="text-sm text-red-500">{errors.shopName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Owner Name</Label>
            <Input {...register("OwnerName")} placeholder="John Doe" className="h-11 rounded-xl" />
            {errors.OwnerName && <p className="text-sm text-red-500">{errors.OwnerName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input {...register("address")} placeholder="123 Main St, City" className="h-11 rounded-xl" />
            {errors.address && <p className="text-sm text-red-500">{(errors.address as any).message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" {...register("email")} placeholder="you@example.com" className="h-11 rounded-xl" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" {...register("password")} placeholder="••••••••" className="h-11 rounded-xl" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select
                value={currencyValue}
                onValueChange={(v) => setValue("currency", v as Tenant["currency"])}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="MAD">MAD (د.م)</SelectItem>
                  <SelectItem value="PKR">PKR (₨)</SelectItem>
                </SelectContent>
              </Select>
              {errors.currency && (
                <p className="text-sm text-red-500">
                  {errors.currency.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tax %</Label>
              <Input
                type="number"
                {...register("taxRate", { valueAsNumber: true })}
                placeholder="5"
                min={0}
                max={100}
                className="h-11 rounded-xl"
              />
              {errors.taxRate && <p className="text-sm text-red-500">{errors.taxRate.message}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full h-11 rounded-xl text-base font-semibold" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Shop
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};