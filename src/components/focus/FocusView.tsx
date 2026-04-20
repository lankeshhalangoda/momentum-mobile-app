"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CloudRain,
  Coffee,
  Headphones,
  Radio,
  Target,
  Trees,
  Trophy,
  Waves,
} from "lucide-react";
import { MiniSparkline } from "@/components/charts/MiniSparkline";
import { GlassCard } from "@/components/ui/GlassCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import {
  ambientSounds,
  energyRecommendation,
  focusDashboard,
  focusSessions,
  screenHero,
  sessionHistory,
  smartTimerPresets,
} from "@/lib/data";
import { cn, formatDuration } from "@/lib/utils";

const ambientIcons = {
  "cloud-rain": CloudRain,
  coffee: Coffee,
  trees: Trees,
  waves: Waves,
  radio: Radio,
} as const;

export function FocusView() {
  const loading = useSimulatedLoading(700);
  const [presetSec, setPresetSec] = useState(smartTimerPresets[1].sec);
  const [remaining, setRemaining] = useState(smartTimerPresets[1].sec);
  const [running, setRunning] = useState(false);
  const [zen, setZen] = useState(false);
  const [ambientId, setAmbientId] = useState<string | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = () => {
    if (tick.current) {
      clearInterval(tick.current);
      tick.current = null;
    }
  };

  useEffect(() => {
    if (!running) {
      clearTick();
      return;
    }
    tick.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return clearTick;
  }, [running]);

  const start = useCallback(() => {
    if (remaining === 0) setRemaining(presetSec);
    setRunning(true);
  }, [remaining, presetSec]);

  const pause = useCallback(() => setRunning(false), []);

  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(presetSec);
  }, [presetSec]);

  const applyPreset = useCallback((sec: number) => {
    setPresetSec(sec);
    setRemaining(sec);
    setRunning(false);
  }, []);

  const progress = useMemo(() => {
    if (presetSec === 0) return 0;
    return Math.min(100, Math.round(((presetSec - remaining) / presetSec) * 100));
  }, [presetSec, remaining]);

  const weeklyProgressPct = useMemo(() => {
    const t = focusDashboard.weeklyTargetHours;
    if (t <= 0) return 0;
    return Math.min(100, Math.round((focusDashboard.weeklyLoggedHours / t) * 100));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && zen) setZen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zen]);

  if (loading) {
    return (
      <div className="stack-page">
        <Skeleton className="h-9 w-40 rounded-lg" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-36 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="stack-page">
      <header className="space-y-2.5">
        <p className="text-eyebrow">Deep work</p>
        <h1 className="font-display max-w-[20ch] text-[1.625rem] leading-[1.12] text-fg sm:text-[1.75rem]">
          {screenHero.focusTitle}
        </h1>
        <p className="max-w-[40ch] text-sm leading-relaxed text-fg-muted">{screenHero.focusSubtitle}</p>
      </header>

      <GlassCard
        tone="dark"
        decoration="mesh"
        accentDecoration="camo"
        className="relative overflow-hidden p-6 sm:p-7"
      >
        <div className="relative flex flex-col items-center text-center text-white">
          <div className="grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {smartTimerPresets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p.sec)}
                className={cn(
                  "flex min-h-[5.6rem] w-full flex-col items-start justify-between gap-1.5 rounded-2xl border px-4 py-3 text-left transition-[transform,background-color,color,box-shadow,border-color] duration-200 active:scale-[0.99]",
                  presetSec === p.sec
                    ? "border-brand/55 bg-brand-muted text-white shadow-[0_0_24px_-10px_rgba(0,217,138,0.45)]"
                    : "border-white/15 bg-white/5 hover:border-white/25 hover:bg-white/10",
                )}
              >
                <span className="font-display text-[2rem] leading-none font-bold tabular-nums text-white">{p.label}m</span>
                <span className="min-w-0 text-[0.6875rem] font-medium leading-tight text-white/78">{p.desc}</span>
                <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wide text-white/70">
                  {p.tag}
                </span>
              </button>
            ))}
          </div>

          <p
            className="font-display mt-10 text-[2.75rem] leading-none tracking-[0.06em] text-white tabular-nums drop-shadow-[0_0_28px_rgba(61,255,179,0.22)] sm:text-5xl"
            aria-live="polite"
          >
            {formatDuration(remaining)}
          </p>
          <p className="font-sans mt-3 text-sm font-medium text-white/65">Session · {progress}%</p>

          <div className="mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[color:var(--chart-bar-from)] to-[color:var(--chart-bar-to)]"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 110, damping: 22 }}
            />
          </div>

          <div className="mt-9 flex w-full max-w-sm flex-wrap items-center justify-center gap-3">
            {!running ? (
              <Button type="button" variant="primary" size="md" className="min-w-[9.5rem]" onClick={start}>
                Start session
              </Button>
            ) : (
              <Button type="button" variant="secondary" size="md" className="min-w-[9.5rem]" onClick={pause}>
                Pause
              </Button>
            )}
            <Button type="button" variant="quiet" size="md" onClick={reset}>
              Reset
            </Button>
            <Button type="button" variant="ghost" size="md" className="text-white/90 hover:text-white" onClick={() => setZen(true)}>
              Distraction-free
            </Button>
          </div>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3">
        <GlassCard decoration="mesh" accentDecoration="camo" className="flex w-full flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 sm:items-center">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand-muted/60 text-brand">
                <Target className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-eyebrow text-fg-subtle">Session goal</p>
                <p className="font-display mt-1 text-lg tracking-tight text-fg sm:text-xl">Weekly target</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="font-display text-3xl tabular-nums text-fg">{focusDashboard.weeklyLoggedHours}h</span>
                  <span className="text-sm font-semibold text-fg-muted">/ {focusDashboard.weeklyTargetHours}h</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-brand-muted/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-amber/90"
              style={{ width: `${weeklyProgressPct}%` }}
            />
          </div>
          <p className="mt-2 text-[0.6875rem] font-medium text-fg-subtle">Daily load (min)</p>
          <MiniSparkline values={focusDashboard.weekFocusMinutesDaily} height={48} className="mt-2 w-full" />
        </GlassCard>

        <GlassCard decoration="energy" accentDecoration="camo" className="flex w-full flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand-muted/60 text-brand">
                <Headphones className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-eyebrow text-fg-subtle">Ambient layer</p>
                <p className="font-display mt-1 text-lg tracking-tight text-fg sm:text-xl">Soundscape</p>
                <p className="mt-1 text-sm text-fg-muted">Pair with music · session-only</p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {ambientSounds.map((a) => {
              const on = ambientId === a.id;
              const Icon = ambientIcons[a.icon];
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAmbientId(on ? null : a.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-[transform,border-color,background-color] duration-200 active:scale-[0.98]",
                    on
                      ? "border-brand/50 bg-brand-muted shadow-[0_2px_12px_-6px_rgba(0,217,138,0.25)]"
                      : "border-border bg-white/70 hover:border-brand/25 dark:bg-white/[0.06]",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.8125rem] font-semibold leading-tight text-fg">{a.label}</span>
                    <span className="block text-[0.625rem] text-fg-muted">{a.mode}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard tone="brand" decoration="mesh" accentDecoration="side" className="flex w-full flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/35 bg-white/25 text-brand dark:bg-white/10">
                <Trophy className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-eyebrow text-fg-subtle">Productivity score</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <span className="font-display text-3xl tabular-nums tracking-tight text-fg sm:text-4xl">
                    <AnimatedCounter value={focusDashboard.productivityScore} duration={900} />
                  </span>
                  <span className="text-sm font-bold text-success">
                    +{focusDashboard.productivityScore - focusDashboard.productivityPrevWeek} WoW
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-[0.6875rem] font-semibold text-fg-muted">
                <span>Session quality</span>
                <span className="tabular-nums text-fg">{focusDashboard.sessionQualityPct}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/50 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[color:var(--chart-bar-from)] to-amber/90"
                  style={{ width: `${focusDashboard.sessionQualityPct}%` }}
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full border border-border/50 bg-white/45 px-2 py-0.5 text-[0.625rem] font-semibold text-fg-muted dark:bg-white/10">
                  Cohort {focusDashboard.cohortAvgQualityPct}%
                </span>
                <span className="rounded-full border border-success/30 bg-success-muted px-2 py-0.5 text-[0.625rem] font-semibold text-success">
                  {focusDashboard.sessionQualityLabel}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-brand/30 bg-brand-muted/80 px-2.5 py-1 text-[0.6875rem] font-semibold text-brand">
                {energyRecommendation.headline}
              </span>
              <span className="rounded-full border border-border/60 bg-white/40 px-2.5 py-1 text-[0.6875rem] font-medium text-fg-subtle dark:bg-white/10">
                {energyRecommendation.chip}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-[0.6875rem] font-semibold">
              <span className="rounded-full bg-brand-muted/50 px-2 py-0.5 tabular-nums text-fg">
                {focusDashboard.interruptionsWeek} interrupts
              </span>
              <span className="rounded-full bg-brand-muted/50 px-2 py-0.5 text-fg-muted">Slack</span>
              <span className="rounded-full bg-brand-muted/50 px-2 py-0.5 tabular-nums text-fg">
                {focusSessions.longestStreakMin}m max
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-sm tracking-tight text-fg">Recent sessions</h2>
        <GlassCard className="divide-y divide-border p-0">
          {sessionHistory.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="font-medium text-fg">{s.title}</p>
                <p className="text-xs text-fg-muted">{s.day}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-sm tabular-nums text-fg">{s.minutes}m</p>
                <p className="text-[0.6875rem] font-semibold text-success">{s.quality}</p>
              </div>
            </div>
          ))}
        </GlassCard>
      </section>

      <AnimatePresence>
        {zen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col border-t border-brand/25 bg-surface-card/97 px-6 py-12 text-center text-fg shadow-[0_-24px_80px_-40px_rgba(0,217,138,0.12)] backdrop-blur-2xl backdrop-saturate-150 dark:border-brand/30 dark:shadow-[0_-28px_90px_-36px_rgba(61,255,179,0.14)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-eyebrow tracking-[0.22em] text-fg-subtle">Zen</p>
            <p className="font-display mt-8 text-5xl tabular-nums tracking-[0.06em] sm:text-6xl">
              {formatDuration(remaining)}
            </p>
            <p className="mt-4 text-sm text-fg-muted">Notifications silenced · stay with the work</p>
            <div className="mt-auto flex flex-col gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button type="button" variant="secondary" size="md" onClick={() => setRunning((r) => !r)}>
                {running ? "Pause" : "Resume"}
              </Button>
              <Button type="button" variant="ghost" size="md" onClick={() => setZen(false)}>
                Exit zen · Esc
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
