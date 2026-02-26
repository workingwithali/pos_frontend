"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShoppingBag, Loader2 } from "lucide-react"

import { registerSchema, RegisterInput } from "@/types/auth.schema"
import { api } from "@/lib/api"
import { useAuthStore } from "@/store/auth.store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      taxRate: 10,
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const payload = {
        ...data, //
        currency:  "PKR", 
      }


      const res = await api.post("/auth/signup", payload)
      return res.data
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data)
      login(data.token, data.user)
      router.push("/")
    },
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <ShoppingBag className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Create your shop
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start your 14-day free trial
          </p>
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            mutation.mutate(data);
          })}
          className="rounded-2xl bg-card p-8 pos-shadow-md space-y-4"
        >
          <div className="space-y-2">
            <Label>Shop Name</Label>
            <Input
              {...register("shopName")}
              className="h-11 rounded-xl"
              placeholder="My Coffee Shop"
            />
            {errors.shopName && (
              <p className="text-sm text-red-500">
                {errors.shopName.message}
              </p>                            
            )}
          </div>

          <div className="space-y-2">
            <Label>Owner Name</Label>
            <Input
              {...register("OwnerName")}
              className="h-11 rounded-xl"
              placeholder="John Doe"
            />
            {errors.OwnerName && (
              <p className="text-sm text-red-500">
                {errors.OwnerName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email")}
              className="h-11 rounded-xl"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              {...register("password")}
              className="h-11 rounded-xl"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tax %</Label>
            <Input
              type="number"
              {...register("taxRate", { valueAsNumber: true })}
              className="h-11 rounded-xl"
              min={0}
              max={100}
            />
            {errors.taxRate && (
              <p className="text-sm text-red-500">
                {errors.taxRate.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl text-base font-semibold"
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Shop
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}