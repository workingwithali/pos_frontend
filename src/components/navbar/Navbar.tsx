"use client";

import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileMenu } from "./ProfileMenu";
// import NotificationPanel from "./NotificationPanel";

export function Navbar() {
  // const { theme, toggleTheme, toggleNotifications, notifications } = useStore();
  // const unread = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-card/80 backdrop-blur-md z-50">
        <div className="h-full px-3 sm:px-4 flex items-center justify-between">

          {/* Left */}
            <h1 className="text-xl font-bold text-primary">
              POS System
            </h1>

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2">

            {/* Notifications */}
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleNotifications?}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </Button> */}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Menu */}
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Notification panel */}
      {/* <NotificationPanel /> */}
    </>
  );
}
