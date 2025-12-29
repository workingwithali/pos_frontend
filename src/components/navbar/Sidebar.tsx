"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  Settings,
  FileText,
  DollarSign,
  UserCircle,
  Receipt,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "POS / Sales", icon: ShoppingCart, path: "/pos" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Inventory", icon: FileText, path: "/inventory" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Sales", icon: TrendingUp, path: "/sales" },
  { name: "Expenses", icon: DollarSign, path: "/expenses" },
  { name: "Staff", icon: UserCircle, path: "/staff" },
  { name: "Billing", icon: Receipt, path: "/billing" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <motion.aside
        initial={{ width: 72 }}
        whileHover={{ width: 240 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r border-border bg-card/70 backdrop-blur-md shadow-sm overflow-hidden group"
      >
        <nav className="flex flex-col p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Tooltip key={item.path} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {/* Label — only visible when sidebar expands */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="whitespace-nowrap hidden group-hover:block"
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                </TooltipTrigger>
                {/* Tooltip for icon-only state */}
                <TooltipContent
                  side="right"
                  className="hidden group-hover:hidden text-xs font-medium bg-popover text-popover-foreground"
                >
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </motion.aside>
    </TooltipProvider>
  );
}
