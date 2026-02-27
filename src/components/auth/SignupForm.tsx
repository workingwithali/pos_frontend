"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/types/auth.schema";
import { useSignup } from "@/hooks/useAuth";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useSignup();

  const onSubmit = (data: any) => mutation.mutate({ ...data, currency: "pkr" });

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
            <Label>Email</Label>
            <Input type="email" {...register("email")} placeholder="you@example.com" className="h-11 rounded-xl" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" {...register("password")} placeholder="••••••••" className="h-11 rounded-xl" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
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