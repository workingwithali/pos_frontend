'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <Topbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        import clsx from "clsx";

        <main
          className={clsx(
            "flex-1",
            "pt-20",
            "pb-8",
            "px-4 md:px-6 lg:px-8",
            "w-full",
            "transition-all duration-300 ease-in-out",
            "group-hover:ml-60"
          )}
        >
          {children}
          <Toaster richColors position="top-right" />
        </main>
      </div>
    </div>
  );
}
