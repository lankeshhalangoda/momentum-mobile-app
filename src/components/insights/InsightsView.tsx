"use client";

import { motion } from "framer-motion";
import { HeatmapGrid } from "@/components/charts/HeatmapGrid";
import { WeeklyBars } from "@/components/charts/WeeklyBars";
import { GlassCard } from "@/components/ui/GlassCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import {
  aiHabitSuggestions,
  focusHeatmap,
  growthMetrics,
  monthlyGrowthReport,
  screenHero,
  weeklyInsight,
} from "@/lib/data";
import { cn } from "@/lib/utils";

function deltaClass(change: string) {
  if (change.startsWith("+")) return "text-success";
  if (change === "Stable") return "text-fg-subtle";
  return "text-accent";
}

const heatRows = ["W1", "W2", "W3", "W4", "W5"];

export function InsightsView() {
  const loading = useSimulatedLoading(720);

  if (loading) {
    return (
      <div className="stack-page">
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-52 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="stack-page">
      <header className="space-y-2.5">
        <p className="text-eyebrow">Analytics</p>
        <h1 className="font-display max-w-[18ch] text-[1.5625rem] leading-[1.15] tracking-tight text-fg sm:text-[1.6875rem]">
          {screenHero.insightsTitle}
        </h1>
        <p className="max-w-[40ch] text-sm leading-relaxed text-fg-muted">{screenHero.insightsSubtitle}</p>
      </header>

      <GlassCard
        tone="brand"
        decoration="mesh"
        accentDecoration="camo"
        className="relative overflow-hidden p-5 sm:p-6"
      >
        <div className="relative space-y-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-fg">Focus minutes</h2>
              <p className="mt-1 text-[0.6875rem] font-medium text-fg-subtle">7d · rolling</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-success-muted px-3 py-1.5 text-[0.6875rem] font-semibold text-success">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                WoW {weeklyInsight.weekOverWeek}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-medium text-fg-muted">Total</p>
              <p className="font-display mt-1 text-2xl leading-none tracking-tight text-fg tabular-nums">
                <AnimatedCounter
                  value={weeklyInsight.focusMinutes.reduce((a, b) => a + b, 0)}
                  duration={950}
                />
                <span className="text-base font-semibold text-fg-muted">m</span>
              </p>
            </div>
          </div>
          <WeeklyBars values={weeklyInsight.focusMinutes} labels={weeklyInsight.labels} />
        </div>
      </GlassCard>

      <GlassCard decoration="contour" accentDecoration="camo" className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-sm tracking-tight text-fg">Focus heatmap</h2>
            <p className="mt-1 text-[0.6875rem] font-medium text-fg-subtle">5w · intensity</p>
          </div>
          <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[0.625rem] font-bold text-brand">
            Live
          </span>
        </div>
        <div className="mt-5 overflow-x-auto">
          <HeatmapGrid values={focusHeatmap} rowLabels={heatRows} />
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3">
        <GlassCard decoration="mesh" accentDecoration="camo" className="overflow-hidden p-5">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
            <div className="flex shrink-0 justify-center">
              <ProgressRing
                centerMode="percent-only"
                value={weeklyInsight.consistencyScore}
                size={118}
                stroke={9}
              />
            </div>
            <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
              <h3 className="text-sm font-semibold leading-tight text-fg">Consistency</h3>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {["Habits", "Focus", "Recovery"].map((x) => (
                  <span
                    key={x}
                    className="rounded-full border border-border/60 bg-brand-muted/50 px-2 py-0.5 text-[0.625rem] font-semibold text-fg-muted"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard decoration="energy" accentDecoration="camo" className="overflow-hidden p-5">
          <div>
            <h3 className="text-sm font-semibold text-fg">Growth signals</h3>
            <p className="mt-1 text-[0.6875rem] font-medium text-fg-subtle">Composite</p>
          </div>
          <ul className="mt-5 space-y-3.5">
            {growthMetrics.map((m, i) => (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="min-w-0 truncate font-medium text-fg-muted">{m.label}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="font-display font-semibold tabular-nums text-fg">{m.value}</span>
                  <span className={cn("text-[0.6875rem] font-semibold", deltaClass(m.change))}>
                    {m.change}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard tone="dark" decoration="contour" accentDecoration="camo" className="p-5 sm:p-6">
        <p className="text-eyebrow text-white/55">Monthly</p>
        <p className="font-display mt-2 text-lg text-white">{monthlyGrowthReport.month}</p>
        <p className="mt-2 text-[0.9375rem] font-medium text-white/95">{monthlyGrowthReport.headline}</p>
        <p className="mt-1 text-sm text-brand">{monthlyGrowthReport.delta}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {monthlyGrowthReport.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-1 text-[0.6875rem] font-semibold text-white/85"
            >
              {h}
            </span>
          ))}
        </div>
      </GlassCard>

      <section className="flex flex-col gap-3">
        <h2 className="font-display px-0.5 text-sm tracking-tight text-fg">AI habit suggestions</h2>
        <div className="flex flex-col gap-3">
          {aiHabitSuggestions.map((s) => (
            <GlassCard key={s.id} decoration="neon" accentDecoration="camo" className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-fg">{s.title}</p>
                  <p className="mt-1 text-[0.6875rem] font-medium text-fg-subtle">{s.reason}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-brand-muted/50 px-2 py-0.5 text-[0.625rem] font-semibold uppercase text-fg-subtle">
                  {s.effort}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <GlassCard decoration="mesh" accentDecoration="side" className="overflow-hidden p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-fg">Coach note</h3>
        <p className="mt-3 max-w-[40ch] text-[0.9375rem] leading-snug text-fg-muted">{weeklyInsight.topInsight}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-brand/25 bg-brand-muted px-3 py-1.5 text-[0.6875rem] font-semibold text-brand shadow-[0_2px_12px_-6px_rgba(0,217,138,0.2)] dark:border-brand/35">
            Morning anchor
          </span>
          <span className="rounded-full border border-amber/30 bg-amber-muted px-3 py-1.5 text-[0.6875rem] font-semibold text-amber shadow-[0_2px_12px_-6px_rgba(251,191,36,0.2)]">
            Deep work
          </span>
        </div>
      </GlassCard>
    </div>
  );
}
