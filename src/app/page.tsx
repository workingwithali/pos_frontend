'use client';
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ThemeToggle />
      <div className="text-5xl font-bold h-6 bg-zinc-200">Hello World</div>
    </div>
  );
}
