import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = "USD") {
  const symbolMap: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    MAD: "د.م",
    PKR: "₨",
  };

  const symbol = symbolMap[currency] || symbolMap["USD"];

  // Custom formatting for non-standard locales or specific requirements
  if (currency === "PKR") {
    return `₨ ${amount.toLocaleString()}`;
  }
  if (currency === "MAD") {
    return `${amount.toLocaleString()} د.م`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "PKR" ? "USD" : currency, // Fallback for Intl
  }).format(amount).replace(/[a-zA-Z$]+/, symbol);
}
