"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { logout as apiLogout } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await apiLogout();
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-card/80 backdrop-blur-md z-50">
        <div className="h-full px-3 sm:px-4 flex items-center justify-between">
          {/* Left */}
          <h1 className="text-xl font-bold text-primary">POS System</h1>

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-red-500 rounded-full"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
