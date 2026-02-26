"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Settings,
  UserCircle,
  LayoutDashboard,
  Monitor,
  FolderOpen,
  Receipt,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "POS Terminal", icon: Monitor, path: "/pos" },
  { label: "Products", icon: Package, path: "/products" },
  { label: "Categories", icon: FolderOpen, path: "/categories" },
  { label: "Sales", icon: Receipt, path: "/sales" },
  { label: "Subscription", icon: CreditCard, path: "/subscription" },
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Profile", icon: UserCircle, path: "/profile" },
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
                      {item.label}
                    </motion.span>
                  </Link>
                </TooltipTrigger>
                {/* Tooltip for icon-only state */}
                <TooltipContent
                  side="right"
                  className="hidden group-hover:hidden text-xs font-medium bg-popover text-popover-foreground"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </motion.aside>
    </TooltipProvider>
  );
}
