"use client";

import { LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {  useLogout, useMe } from "@/hooks/useAuth";

export function Topbar() {
  const router = useRouter();
  const { data: user, isLoading } = useMe();
  const logoutMutation = useLogout();
  const handleLogout = async () => {
    try {
      logoutMutation.mutate(undefined, {
        onSuccess: () => {
          router.push("/login");
        },
      });
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
          <div className="flex items-center gap-2 sm:gap-4">
            {isLoading ? (
              <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
            ) : user?.data ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none gap-1">
                  <span className="font-medium text-foreground">{user.data.name || "User"}</span>
                  <span className="text-xs">{user.data.role || ""}</span>
                </div>
              </div>
            ) : null}

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
