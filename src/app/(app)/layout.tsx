'use client';

import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Sidebar } from '@/components/navbar/Sidebar';
// import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          className="
            flex-1 
            pt-20
            pb-8 
            px-4 md:px-6 lg:px-8 
            ml-18 
            transition-all 
            duration-300 
            ease-in-out 
            group-hover:ml-60
          "
        >
            {children}
            {/* <Toaster richColors position="top-right" /> */}
        </main>
      </div>
    </div>
  );
}
