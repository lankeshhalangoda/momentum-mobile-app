"use client";

import { Clock, Flame, ListChecks, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { weeklyDashboard } from "@/lib/data";
import { cn } from "@/lib/utils";

const metrics = [
  {
    key: "focus",
    label: "Focus hrs",
    format: (w: typeof weeklyDashboard) => `${w.focusHours}h`,
    Icon: Clock,
    accent: "text-brand",
    iconBg: "border-brand/30 bg-brand-muted/70",
  },
  {
    key: "sessions",
    label: "Sessions",
    format: (w: typeof weeklyDashboard) => String(w.sessionsCompleted),
    Icon: ListChecks,
    accent: "text-brand",
    iconBg: "border-brand/25 bg-brand-muted/50",
  },
  {
    key: "streak",
    label: "Streak",
    format: (w: typeof weeklyDashboard) => String(w.streakDays),
    Icon: Flame,
    accent: "text-[color:var(--amber)]",
    iconBg: "border-[color:rgba(245,158,11,0.45)] bg-[color:rgba(245,158,11,0.18)]",
  },
  {
    key: "score",
    label: "Score",
    format: (w: typeof weeklyDashboard) => String(w.weeklyScore),
    Icon: Sparkles,
    accent: "text-brand",
    iconBg: "border-brand/30 bg-brand-muted/60",
  },
] as const;

/** This week — premium 2x2 dashboard */
export function ThisWeekCard() {
  const w = weeklyDashboard;

  return (
    <GlassCard
      decoration="mesh"
      accentDecoration="camo"
      className="aspect-[0.92/1] w-full overflow-hidden p-2.5 sm:aspect-[0.92/1] sm:p-4"
    >
      <p className="text-eyebrow tracking-[0.2em] px-0.5 text-left text-fg-subtle">{w.weekLabel}</p>
      <div className="card-grid-surface relative mt-2.5 h-[calc(100%-2.35rem)] overflow-hidden rounded-xl border border-border-strong/90 bg-white/35 dark:border-white/[0.18] dark:bg-white/[0.03]">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] w-px -translate-x-1/2 bg-black/18 dark:bg-white/[0.32]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] h-px -translate-y-1/2 bg-black/18 dark:bg-white/[0.32]" aria-hidden />

        <div className="grid h-full grid-cols-2 grid-rows-2">
          {metrics.map(({ key, label, format, Icon, accent, iconBg }) => (
            <div
              key={key}
              className="grid h-full grid-rows-[auto_auto_auto] place-items-center gap-1 px-1.5 pt-1 pb-1.5 text-center sm:gap-1.5 sm:px-2 sm:pt-2 sm:pb-2.5"
            >
            <div
              className={cn(
                "flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md border shadow-xs sm:h-6 sm:w-6 dark:border-white/10 dark:shadow-none",
                iconBg,
                accent,
              )}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
            </div>
            <p className="font-display text-[0.96rem] tabular-nums leading-none tracking-tight text-fg sm:text-[1.12rem]">
              {format(w)}
            </p>
            <p className="min-w-0 truncate text-[0.42rem] font-semibold uppercase tracking-[0.12em] text-fg-subtle sm:text-[0.48rem] sm:tracking-[0.13em]">
              {label}
            </p>
          </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
