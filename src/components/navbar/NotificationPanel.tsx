'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NotificationPanel() {
  const {
    notificationOpen,
    toggleNotifications,
    notifications,
    markAsRead,
    markAllAsRead,
  } = useStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Sheet open={notificationOpen} onOpenChange={toggleNotifications}>
      <SheetContent side="right" className="w-80 sm:w-96">
        <SheetHeader className="flex justify-between items-center">
          <SheetTitle className="text-primary">Notifications</SheetTitle>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </SheetHeader>

        <ScrollArea className="mt-4 h-[85vh] pr-3">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center mt-6">
              No notifications found 👍
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition
                  ${!n.read ? 'bg-muted' : ''}`}
                  onClick={() => markAsRead(n.id)}
                >
                  <Bell className="w-5 h-5 text-primary mt-1" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{n.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(n.timestamp).toLocaleString()}
                    </p>
                  </div>

                  {!n.read && <Badge variant="destructive">New</Badge>}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
