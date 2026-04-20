"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BarChart3, Home, ListChecks, Timer, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/goals", label: "Goals", Icon: ListChecks },
  { href: "/focus", label: "Focus", Icon: Timer },
  { href: "/insights", label: "Insights", Icon: BarChart3 },
  { href: "/profile", label: "Profile", Icon: UserRound },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-2"
      aria-label="Primary"
    >
      <div
        className={cn(
          "pointer-events-auto flex w-full max-w-[calc(100%-0.5rem)] items-stretch justify-between gap-1 rounded-2xl border border-border-strong bg-surface-elevated/96 p-1.5 shadow-nav",
        )}
      >
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[0.625rem] font-semibold tracking-tight transition-colors duration-200",
                active
                  ? "font-display text-brand"
                  : "font-sans text-fg-subtle hover:text-fg-muted",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-brand-muted shadow-[0_0_28px_-8px_rgba(0,217,138,0.35)] dark:shadow-[0_0_32px_-6px_rgba(61,255,179,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative z-10">
                <Icon
                  className={cn(
                    "mx-auto h-6 w-6 transition-[filter] duration-200",
                    active &&
                      "drop-shadow-[0_0_10px_rgba(0,217,138,0.35)] dark:drop-shadow-[0_0_12px_rgba(61,255,179,0.45)]",
                  )}
                  strokeWidth={active ? 2 : 1.75}
                  aria-hidden
                />
              </span>
              <span className="relative z-10">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
