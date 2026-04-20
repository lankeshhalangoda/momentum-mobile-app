"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { CardDecoration, GlassTone } from "@/components/ui/GlassCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import { ThisWeekCard } from "@/components/home/ThisWeekCard";
import { HabitStreakIcon } from "@/lib/icons";
import {
  adaptiveDailyPlan,
  communityProof,
  dailyProgress,
  habitStreaks,
  homeStats,
  motivationalIntelligence,
  nextBestActions,
  personalizedInsight,
  priorities,
  readinessScore,
  screenHero,
} from "@/lib/data";
import { cn } from "@/lib/utils";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function confidencePct(insight: typeof personalizedInsight) {
  if (typeof insight.confidencePct === "number") return insight.confidencePct;
  const map: Record<string, number> = { High: 88, Medium: 62, Low: 38 };
  return map[insight.confidence] ?? 72;
}

function signalTierLabel(confidence: string) {
  if (confidence === "High") return "Strong signal";
  if (confidence === "Medium") return "Moderate signal";
  return "Emerging signal";
}

function ReadinessMiniGauge({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  const startX = 16;
  const endX = 144;
  const y = 92;
  const r = 64;
  const arc = Math.PI * r;
  const offset = arc * (1 - clamped / 100);

  return (
    <div className="relative w-full max-w-[10rem]">
      <svg viewBox="0 0 160 102" className="w-full">
        <defs>
          <linearGradient id="readinessMiniGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--ring-progress-a)" />
            <stop offset="55%" stopColor="var(--ring-progress-b)" />
            <stop offset="100%" stopColor="var(--ring-progress-c)" />
          </linearGradient>
        </defs>
        <path
          d={`M ${startX} ${y} A ${r} ${r} 0 0 1 ${endX} ${y}`}
          fill="none"
          stroke="var(--ring-track)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d={`M ${startX} ${y} A ${r} ${r} 0 0 1 ${endX} ${y}`}
          fill="none"
          stroke="url(#readinessMiniGaugeGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={arc}
          strokeDashoffset={offset}
          className="drop-shadow-[0_0_14px_rgba(0,217,138,0.24)] transition-[stroke-dashoffset] duration-500 ease-out dark:drop-shadow-[0_0_16px_rgba(61,255,179,0.28)]"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-8 text-center">
        <p className="font-display text-[1.75rem] leading-none tracking-tight text-brand tabular-nums sm:text-[1.95rem]">
          {Math.round(clamped)}%
        </p>
      </div>
    </div>
  );
}

const streakTones: GlassTone[] = ["default", "dark", "default"];
const streakDeco: CardDecoration[] = ["mesh", "energy", "contour"];
const statTones: GlassTone[] = ["brand", "default", "dark"];
const statDeco: CardDecoration[] = ["mesh", "energy", "neon"];

export function HomeView() {
  const loading = useSimulatedLoading(820);

  if (loading) {
    return (
      <div className="stack-page">
        <div className="space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-[min(100%,20rem)] rounded-lg" />
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="stack-page">
      <header className="space-y-2.5">
        <p className="text-eyebrow">{greeting()}</p>
        <motion.h1
          className="font-display max-w-[22ch] text-[1.5625rem] leading-[1.15] tracking-tight text-fg sm:text-[1.75rem]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {screenHero.homeTitle}
        </motion.h1>
        <p className="max-w-[40ch] text-sm leading-relaxed text-fg-muted">{screenHero.homeSubtitle}</p>
        <GlassCard
          tone="dark"
          decoration="mesh"
          accentDecoration="camo"
          className="mt-4 overflow-hidden p-0"
        >
          <div className="relative aspect-[5/2] min-h-[10.5rem] w-full sm:aspect-[21/8] sm:min-h-[12rem]">
            <Image
              src="/illustrations/fitness-week.png"
              alt=""
              fill
              className="object-cover object-[center_35%]"
              sizes="100vw"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(61,255,179,0.35) 0.85px, transparent 0.95px), linear-gradient(rgba(61,255,179,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(61,255,179,0.16) 1px, transparent 1px)",
                backgroundSize: "12px 12px, 24px 24px, 24px 24px",
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.22) 36%, rgba(0,0,0,0.9) 100%)",
                maskImage:
                  "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.22) 36%, rgba(0,0,0,0.9) 100%)",
                opacity: 0.95,
              }}
              aria-hidden
            />
          </div>
        </GlassCard>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="min-h-0 min-w-0">
          <GlassCard
            tone="brand"
            decoration="mesh"
            accentDecoration="camo"
            className="aspect-[0.92/1] w-full overflow-hidden p-2.5 sm:aspect-[0.92/1] sm:p-4"
          >
            <div className="relative grid h-full grid-rows-[auto_1fr_auto]">
              <p className="text-eyebrow tracking-[0.2em] text-fg-subtle">{readinessScore.label}</p>

              <div className="card-grid-surface mt-0 flex flex-col items-center justify-center rounded-xl border border-border/70 bg-white/35 px-1 pt-1 pb-2 dark:border-white/[0.14] dark:bg-white/[0.03]">
                <div className="-mt-1">
                  <ReadinessMiniGauge value={readinessScore.value} />
                </div>

                <div className="mt-1.5 grid w-full max-w-[10rem] grid-cols-3 gap-1">
                  {["Sleep", "Load", "Recovery"].map((item, idx) => (
                    <div
                      key={item}
                      className="rounded-lg border border-border/45 bg-white/40 px-1 py-0.5 text-center text-[0.46rem] font-semibold uppercase tracking-[0.1em] text-fg-subtle dark:border-white/10 dark:bg-white/[0.05]"
                    >
                      <span
                        className={cn(
                          "mx-auto mb-0.5 block h-2 w-2 rounded-full ring-1 ring-black/10",
                          idx === 2 ? "bg-amber" : "bg-brand",
                        )}
                        aria-hidden
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1 rounded-full border border-success/35 bg-success-muted/75 px-2 py-0.5 text-[0.58rem] font-bold text-success shadow-[0_6px_20px_-12px_rgba(0,168,107,0.45)] sm:px-2.5 sm:py-1 sm:text-[0.64rem]">
                  <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={2.2} aria-hidden />
                  {readinessScore.trend}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="min-h-0 min-w-0">
          <ThisWeekCard />
        </div>
      </div>

      <GlassCard
        tone="dark"
        decoration="energy"
        accentDecoration="camo"
        className="overflow-hidden p-5 sm:p-6"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-muted/12 to-transparent dark:from-brand-muted/18" aria-hidden />
        <div className="relative flex min-h-[9.5rem] flex-row items-center justify-between gap-3 sm:min-h-0 sm:gap-8">
          <div className="min-w-0 flex-1 space-y-1 pr-1">
            <p className="font-display text-[0.9375rem] leading-tight text-white/95">{dailyProgress.label}</p>
            <p className="text-sm text-white/72">
              {dailyProgress.tasksCompleted}/{dailyProgress.tasksTotal} priorities
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              {["Energy high", "Inbox clear", "On schedule"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/12 bg-white/[0.06] px-2.5 py-1 text-[0.625rem] font-semibold text-white/88 sm:px-3 sm:py-1.5 sm:text-[0.6875rem]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 justify-end">
            <div className="flex h-[7rem] w-[7rem] items-center justify-center sm:h-[9rem] sm:w-[9rem]">
              <ProgressRing
                value={dailyProgress.percentage}
                label="Today"
                sublabel="Momentum"
                inverse
                size={152}
                stroke={10}
                className="scale-[0.78] sm:scale-100"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3 px-0.5">
          <h2 className="font-display text-sm tracking-tight text-fg">Live streaks</h2>
          <button
            type="button"
            className="text-[0.8125rem] font-semibold text-brand transition-opacity hover:opacity-80 active:scale-[0.98]"
          >
            View all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto overflow-y-visible px-0.5 py-3 scrollbar-none [-webkit-overflow-scrolling:touch]">
          {habitStreaks.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0 shrink-0"
            >
              <GlassCard
                hover
                hoverSoft
                tone={streakTones[i % streakTones.length]}
                decoration={streakDeco[i % streakDeco.length]}
                accentDecoration="camo"
                className="shadow-float flex w-[11.25rem] flex-col p-5 sm:w-[11.75rem]"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-brand shadow-xs backdrop-blur-sm",
                    streakTones[i % streakTones.length] === "dark"
                      ? "border-white/15 bg-white/10"
                      : "border-border/60 bg-white/70 dark:border-white/10 dark:bg-white/5",
                  )}
                >
                  <HabitStreakIcon name={h.icon} className="h-5 w-5" />
                </div>
                <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                  <span className="font-display text-[2rem] leading-none tracking-tight text-fg tabular-nums">
                    <AnimatedCounter value={h.streak} duration={700 + i * 80} />
                  </span>
                  <span className="pb-1 text-[0.8125rem] font-semibold uppercase tracking-wide text-fg-muted">
                    days
                  </span>
                </div>
                <p className="mt-3 text-[0.8125rem] font-semibold leading-snug text-fg line-clamp-2">{h.name}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-display px-0.5 text-sm tracking-tight text-fg">Quick actions</h2>
        <div className="flex flex-col gap-2">
          {nextBestActions.map((a) => (
            <GlassCard key={a.id} hover hoverSoft decoration="contour" accentDecoration="camo" className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium leading-snug text-fg">{a.title}</p>
                  <p className="mt-1 text-[0.6875rem] font-medium text-fg-subtle">{a.impact}</p>
                </div>
                <span className="shrink-0 rounded-full border border-border bg-brand-muted/50 px-2.5 py-1 text-[0.6875rem] font-semibold text-brand">
                  {a.eta}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <GlassCard
        tone="brand"
        decoration="mesh"
        accentDecoration="side"
        className="overflow-hidden p-5 sm:p-6"
      >
        <div className="relative flex flex-col gap-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-eyebrow text-fg-subtle">Signal</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-muted/55 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-brand dark:border-white/12 dark:bg-white/[0.08] dark:text-brand">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-[0_0_8px_rgba(0,217,138,0.45)] dark:shadow-[0_0_10px_rgba(61,255,179,0.4)]"
                aria-hidden
              />
              {signalTierLabel(personalizedInsight.confidence)}
            </span>
          </div>

          <div className="mt-5 flex gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand opacity-90" strokeWidth={2} aria-hidden />
            <div className="min-w-0 flex-1 space-y-3">
              <p className="font-display max-w-[34ch] text-[1.0625rem] leading-snug tracking-tight text-fg sm:text-[1.125rem]">
                {personalizedInsight.headline}
              </p>
              <div className="flex flex-wrap gap-2">
                {personalizedInsight.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-brand/25 bg-brand-muted/60 px-2.5 py-1 text-[0.6875rem] font-semibold text-brand dark:border-white/10 dark:bg-white/[0.06]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-border/45 pt-5 dark:border-white/[0.1]">
            <div className="flex items-center justify-between gap-3 text-[0.6875rem] font-semibold">
              <span className="text-fg-subtle">Model confidence</span>
              <span className="tabular-nums text-fg">{confidencePct(personalizedInsight)}%</span>
            </div>
            <ProgressBar value={confidencePct(personalizedInsight)} className="h-1.5" />
            <p className="text-[0.6875rem] leading-snug text-fg-subtle">
              <span className="text-fg-muted/90">Based on </span>
              <span className="font-medium text-fg-muted">{personalizedInsight.basedOn}</span>
            </p>
          </div>
        </div>
      </GlassCard>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-3 px-0.5">
          <h2 className="font-display text-sm tracking-tight text-fg">Today · plan</h2>
          <span className="text-[0.6875rem] font-medium text-fg-subtle">Auto-ranked</span>
        </div>
        <GlassCard className="divide-y divide-border p-0">
          {adaptiveDailyPlan.map((b) => (
            <div key={b.id} className="flex gap-4 px-5 py-4">
              <span className="font-display w-12 shrink-0 text-sm tabular-nums text-brand">{b.time}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.9375rem] font-semibold leading-snug text-fg">{b.title}</p>
                <p className="mt-1 text-xs text-fg-muted">
                  {b.duration} · {b.why}
                </p>
              </div>
              <span
                className={cn(
                  "h-2 w-2 shrink-0 self-center rounded-full",
                  b.priority === "high" && "bg-brand shadow-[0_0_10px_rgba(0,217,138,0.4)]",
                  b.priority === "medium" && "bg-warning",
                  b.priority === "low" && "bg-fg-subtle",
                )}
              />
            </div>
          ))}
        </GlassCard>
      </section>

      <GlassCard decoration="energy" accentDecoration="camo" className="overflow-hidden p-5 sm:p-6">
        <div className="relative flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-eyebrow text-fg-subtle">Community</p>
            <p className="mt-2 font-display text-lg text-fg">{communityProof.headline}</p>
            <div className="mt-4 flex max-w-[10.5rem] flex-col gap-2">
              <span className="rounded-xl border border-border-strong bg-brand-muted/80 px-3 py-2 text-xs font-medium text-brand">
                <span className="font-semibold">{communityProof.membersActive}</span> active
              </span>
              <span className="rounded-xl border border-border-strong bg-brand-muted/35 px-3 py-2 text-xs font-medium text-fg dark:border-white/10 dark:bg-white/[0.06]">
                {communityProof.challengesLive} live
              </span>
              <span className="rounded-xl border border-amber/30 bg-amber-muted px-3 py-2 text-xs font-semibold text-amber">
                {communityProof.yourRank}
              </span>
              <span className="rounded-full border border-border/60 bg-brand-muted/40 px-3 py-1.5 text-[0.6875rem] font-semibold text-fg-muted dark:border-white/10 dark:bg-white/[0.05]">
                {communityProof.activityChip}
              </span>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-2 z-20 flex items-center justify-center">
            <div className="relative h-36 w-36 sm:h-40 sm:w-40">
              <Image
                src="/illustrations/brand communication-bro.png"
                alt=""
                fill
                className="object-contain drop-shadow-[0_16px_34px_rgba(0,217,138,0.3)]"
                sizes="(max-width: 640px) 144px, 160px"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard decoration="mesh" accentDecoration="camo" className="overflow-hidden p-5 sm:p-6">
        <div className="relative">
          <p className="text-eyebrow text-fg-subtle">Momentum</p>
          <p className="mt-3 font-display max-w-[32ch] text-[1.0625rem] leading-snug text-fg">
            “{motivationalIntelligence.quote}”
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {motivationalIntelligence.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-brand/25 bg-brand-muted/60 px-2.5 py-1 text-[0.6875rem] font-semibold text-brand dark:border-white/10 dark:bg-white/[0.06]"
              >
                {c}
              </span>
            ))}
            <span className="rounded-full border border-amber/30 bg-amber-muted/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-amber">
              {motivationalIntelligence.streakHighlight}
            </span>
          </div>
        </div>
      </GlassCard>

      <section className="flex flex-col gap-3">
        <h2 className="text-eyebrow tracking-[0.12em] text-fg">Priorities</h2>
        <GlassCard className="divide-y divide-border p-0">
          {priorities.map((p, i) => (
            <motion.button
              type="button"
              key={p.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-brand-muted/30 active:bg-brand-muted/50"
            >
              <span
                className={cn(
                  "mt-1.5 h-2 w-2 shrink-0 rounded-full ring-4",
                  p.urgent
                    ? "bg-danger ring-[color:var(--danger-muted)]"
                    : "bg-brand ring-[color:var(--brand-muted)]",
                )}
              />
              <span className="min-w-0 flex-1 space-y-1">
                <span className="block text-[0.9375rem] font-semibold leading-snug text-fg break-words">
                  {p.title}
                </span>
                <span className="block text-sm text-fg-muted">{p.due}</span>
              </span>
              <span className="shrink-0 self-start rounded-full border border-border bg-white/70 px-2.5 py-1 text-[0.6875rem] font-semibold text-fg-muted dark:bg-white/5">
                {p.tag}
              </span>
            </motion.button>
          ))}
        </GlassCard>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-eyebrow tracking-[0.12em] text-fg">Pulse</h2>
        <div className="grid grid-cols-3 gap-3">
          {homeStats.map((s, i) => (
            <GlassCard
              key={s.id}
              tone={statTones[i % statTones.length]}
              decoration={statDeco[i % statDeco.length]}
              hover
              hoverSoft
              accentDecoration="camo"
              className="shadow-float min-h-[5.5rem] p-4"
            >
              <p className="text-eyebrow text-fg-subtle line-clamp-2">{s.label}</p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <p className="font-display text-xl leading-none tracking-tight text-fg tabular-nums">
                  <AnimatedCounter
                    value={s.value}
                    decimals={s.decimals}
                    duration={800 + i * 100}
                    suffix={s.suffix}
                  />
                </p>
                {"trend" in s && s.trend ? (
                  <span
                    className={cn(
                      "shrink-0 text-[0.65rem] font-bold tabular-nums",
                      "trendUp" in s && s.trendUp === false ? "text-amber" : "text-success",
                    )}
                  >
                    {s.trend}
                  </span>
                ) : null}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
