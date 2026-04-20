"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Flag } from "lucide-react";
import { CategoryMixBars } from "@/components/charts/CategoryMixBars";
import { MiniRadialProgress } from "@/components/charts/MiniRadialProgress";
import { MiniSparkline } from "@/components/charts/MiniSparkline";
import { PeerBarCompare } from "@/components/charts/PeerBarCompare";
import { SegmentedGoalRings } from "@/components/charts/SegmentedGoalRings";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlassCard } from "@/components/ui/GlassCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import { goalCategories, goals, screenHero } from "@/lib/data";
import { cn } from "@/lib/utils";

function goalAnalyticsBlock(
  gi: number,
  g: (typeof goals)[number],
) {
  const pattern = gi % 3;

  if (pattern === 0) {
    return (
      <div className="grid grid-cols-1 gap-5 border-b border-border px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <p className="text-eyebrow text-fg-subtle">7-week velocity</p>
          <MiniSparkline values={g.trend} className="mt-3 w-full" height={52} />
        </div>
        <div className="flex justify-center sm:justify-end">
          <MiniRadialProgress value={g.progress} />
        </div>
      </div>
    );
  }

  if (pattern === 1) {
    return (
      <div className="grid grid-cols-1 gap-5 border-b border-border px-5 py-5 lg:grid-cols-2">
        <PeerBarCompare selfPct={g.progress} peerPct={g.peerProgress} />
        <div className="min-w-0">
          <p className="text-eyebrow text-fg-subtle">Load trend</p>
          <MiniSparkline values={g.trend} className="mt-3 w-full" height={52} />
        </div>
      </div>
    );
  }

  const mix =
    "readingMix" in g && g.readingMix
      ? [...g.readingMix]
      : [
          { label: g.category, pct: Math.round(g.progress * 0.45) },
          { label: "Adjacent", pct: Math.round(g.progress * 0.35) },
          { label: "Reserve", pct: Math.max(8, 100 - Math.round(g.progress * 0.8)) },
        ];

  const segments =
    g.timeline?.map((t) => ({ done: t.done })) ??
    g.milestones.map((m) => ({ done: m.done }));

  return (
    <div className="grid grid-cols-1 gap-6 border-b border-border px-5 py-5 lg:grid-cols-2">
      <div>
        <p className="text-eyebrow text-fg-subtle">Focus mix</p>
        <CategoryMixBars items={mix} className="mt-3" />
      </div>
      <div>
        <p className="text-eyebrow text-fg-subtle">Checkpoint rings</p>
        <SegmentedGoalRings segments={segments} className="mt-4 justify-start" />
      </div>
    </div>
  );
}

export function GoalsView() {
  const loading = useSimulatedLoading(680);
  const [cat, setCat] = useState<(typeof goalCategories)[number]>("All");

  const filtered = useMemo(() => {
    if (cat === "All") return goals;
    return goals.filter((g) => g.category === cat);
  }, [cat]);

  if (loading) {
    return (
      <div className="stack-page">
        <Skeleton className="h-9 w-44 rounded-lg" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="stack-page">
      <header className="space-y-2.5">
        <p className="text-eyebrow">Objectives</p>
        <h1 className="font-display max-w-[22ch] text-[1.625rem] leading-[1.15] tracking-tight text-fg sm:text-[1.75rem]">
          {screenHero.goalsTitle}
        </h1>
        <p className="max-w-[40ch] text-sm leading-relaxed text-fg-muted">{screenHero.goalsSubtitle}</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {goalCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.98]",
              cat === c
                ? "border-brand bg-brand-muted text-brand shadow-[0_0_20px_-8px_rgba(0,217,138,0.35)]"
                : "border-border bg-white/80 text-fg-muted hover:border-brand/30 hover:text-fg dark:bg-white/[0.06]",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <GlassCard tone="brand" decoration="mesh" accentDecoration="side" className="relative p-5">
        <div className="relative flex items-center justify-between gap-5">
          <div className="min-w-0">
            <p className="text-eyebrow text-fg-subtle">Portfolio</p>
            <p className="font-display mt-2 text-3xl leading-none tracking-tight text-fg">
              <AnimatedCounter value={filtered.length} duration={600} /> active
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Career", "Health", "Growth"].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-brand/25 bg-brand-muted/60 px-2 py-0.5 text-[0.625rem] font-semibold text-brand"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-muted to-amber-muted p-1 shadow-[0_4px_20px_-8px_rgba(251,191,36,0.2)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-card text-lg font-semibold text-brand shadow-inner">
              A-
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-5">
        {filtered.map((g, gi) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.06, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard
              decoration={gi % 2 === 0 ? "energy" : "mesh"}
              accentDecoration={gi % 2 === 0 ? "camo" : "none"}
              className="overflow-hidden p-0"
            >
              <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-5">
                <div className="min-w-0">
                  <span className="inline-flex rounded-full border border-border bg-brand-muted px-2.5 py-1 text-[0.6875rem] font-semibold text-brand">
                    {g.category}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-semibold leading-snug text-fg">{g.title}</h3>
                  <p className="mt-1.5 text-sm text-fg-muted">Target · {g.target}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.6875rem]">
                    <span className="rounded-lg border border-border/60 bg-brand-muted/50 px-2 py-1 font-medium text-fg-muted">
                      Projected · {g.projectedCompletion}
                    </span>
                    <span className="rounded-lg border border-border/60 bg-brand-muted/50 px-2 py-1 font-medium text-fg-muted">
                      Accountability · {g.accountabilityScore}
                    </span>
                    <span className="rounded-lg border border-success/30 bg-success-muted px-2 py-1 font-semibold text-success">
                      vs peers {g.benchmarkVsPeers}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-display text-2xl leading-none tracking-tight text-fg">
                    <AnimatedCounter value={g.progress} duration={900} />%
                  </span>
                  <span className="text-[0.6875rem] font-semibold text-success">On trajectory</span>
                </div>
              </div>

              <div className="border-b border-border px-5 py-4">
                <p className="text-eyebrow text-fg-subtle">Milestone timeline</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.timeline.map((t) => (
                    <div
                      key={t.id}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium",
                        t.done
                          ? "border-success/40 bg-success-muted text-success"
                          : "border-border bg-white/50 text-fg-muted dark:bg-white/[0.06]",
                      )}
                    >
                      <Flag className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                      <span>{t.date}</span>
                      <span className="text-fg-subtle">·</span>
                      <span>{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {goalAnalyticsBlock(gi, g)}

              <div className="space-y-5 px-5 py-5">
                <div className="space-y-3">
                  {g.milestones.map((m) => (
                    <div key={m.id} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                          m.done
                            ? "bg-success text-white"
                            : "border border-border-strong bg-brand-muted/30 text-transparent",
                        )}
                      >
                        <Check className={cn("h-3.5 w-3.5", !m.done && "opacity-0")} strokeWidth={2.5} aria-hidden />
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          m.done ? "text-fg-subtle line-through" : "text-fg",
                        )}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="h-2 overflow-hidden rounded-full bg-white/50 dark:bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[color:var(--chart-bar-from)] to-[color:var(--chart-bar-to)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${g.progress}%` }}
                    transition={{
                      type: "spring",
                      stiffness: 72,
                      damping: 20,
                      delay: 0.12 + gi * 0.04,
                    }}
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No goals here yet"
          description="Switch category or add an objective to see milestones and analytics."
        />
      ) : null}
    </div>
  );
}
