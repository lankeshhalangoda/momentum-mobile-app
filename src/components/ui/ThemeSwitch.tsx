"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeSwitchProps = {
  dark: boolean;
  onToggle: () => void;
  disabled?: boolean;
  className?: string;
};

/** Track + thumb with neon “on” state and soft outer glow in dark mode. */
export function ThemeSwitch({ dark, onToggle, disabled, className }: ThemeSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        "relative h-8 w-[3.25rem] shrink-0 cursor-pointer rounded-full border border-border bg-surface-muted p-1 transition-[background-color,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        dark &&
          "border-transparent bg-gradient-to-r from-[color:var(--neon-soft)] to-[color:var(--neon)] shadow-[0_0_0_1px_rgba(0,217,138,0.25),0_0_28px_-8px_rgba(0,217,138,0.35)] dark:from-[color:var(--neon-soft)] dark:to-[color:var(--neon-strong)] dark:shadow-[0_0_0_1px_rgba(61,255,179,0.3),0_0_32px_-6px_rgba(61,255,179,0.4)]",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-1 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-surface-card text-fg-muted shadow-card ring-1 ring-border transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          dark ? "translate-x-5 text-[color:var(--brand-on-primary)]" : "translate-x-0",
        )}
      >
        {dark ? <Moon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden /> : <Sun className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />}
      </span>
    </button>
  );
}
