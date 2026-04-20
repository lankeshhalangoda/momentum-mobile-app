"use client";

import { ThemeProvider } from "@/context/ThemeContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="h-full min-h-0">{children}</div>
    </ThemeProvider>
  );
}
