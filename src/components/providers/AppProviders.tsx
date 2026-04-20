"use client";

import { DevConsoleBrand } from "@/components/branding/DevConsoleBrand";
import { ThemeProvider } from "@/context/ThemeContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DevConsoleBrand />
      <div className="h-full min-h-0">{children}</div>
    </ThemeProvider>
  );
}
