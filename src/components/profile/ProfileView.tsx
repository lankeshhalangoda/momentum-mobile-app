"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { useSimulatedLoading } from "@/hooks/useSimulatedLoading";
import { AchievementIcon } from "@/lib/icons";
import {
  achievements,
  connectedDevices,
  privacyControls,
  progressHistory,
  screenHero,
  settingsGroups,
  user,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronDown, ChevronRight, Clock3, LogOut, X } from "lucide-react";

function getItemOptions(itemId: string): string[] {
  const map: Record<string, string[]> = {
    notif: ["Push alerts", "Email digest", "Quiet hours"],
    calendar: ["Google Calendar", "Outlook", "Apple Calendar"],
    ai: ["Direct", "Balanced", "Encouraging"],
    privacy: ["Data visibility", "Connected apps", "Permission history"],
    export: ["JSON export", "CSV export", "Delete account data"],
    help: ["FAQs", "Guides", "Contact support"],
    feedback: ["Bug report", "Feature request", "Design feedback"],
  };
  return map[itemId] ?? ["General", "Advanced", "About"];
}

export function ProfileView() {
  const loading = useSimulatedLoading(640);
  const router = useRouter();
  const [openGroup, setOpenGroup] = useState<string | null>(settingsGroups[0]?.title ?? null);
  const [openSettingItem, setOpenSettingItem] = useState<string | null>(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [settingOptionToggles, setSettingOptionToggles] = useState<Record<string, boolean>>({});

  if (loading) {
    return (
      <div className="stack-page">
        <Skeleton className="mx-auto h-24 w-24 rounded-full" />
        <Skeleton className="mx-auto h-7 w-44 rounded-lg" />
        <Skeleton className="h-36 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="stack-page">
      <header className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="relative"
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-brand/25 bg-brand-muted/40 shadow-card ring-[3px] ring-surface-card">
            <Image
              src={user.avatarUrl}
              alt={user.fullName}
              width={256}
              height={256}
              sizes="96px"
              className="h-full w-full object-cover object-top"
              priority
            />
          </div>
        </motion.div>
        <h1 className="font-display mt-5 text-[1.375rem] leading-[1.12] text-fg">
          {user.fullName}
        </h1>
        <p className="mt-2 max-w-[28ch] px-2 text-sm font-medium text-fg-muted">{screenHero.profileTagline}</p>
        <p className="mt-1.5 max-w-full break-words px-2 text-sm text-fg-muted">{user.email}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex rounded-full border border-border bg-brand-muted px-3 py-1.5 text-[0.6875rem] font-semibold text-brand">
            {user.plan}
          </span>
          <span className="inline-flex rounded-full border border-amber/35 bg-amber-muted px-3 py-1.5 text-[0.6875rem] font-semibold text-amber">
            Tier {user.tier}
          </span>
        </div>
        <div className="mt-6 w-full max-w-xs px-2">
          <div className="flex items-center justify-between text-[0.6875rem] font-medium text-fg-muted">
            <span>XP to next tier</span>
            <span className="tabular-nums text-fg">
              {user.tierXp} / {user.tierXpNext}
            </span>
          </div>
          <ProgressBar value={(user.tierXp / user.tierXpNext) * 100} className="mt-2" />
        </div>
      </header>

      <GlassCard decoration="mesh" accentDecoration="camo" className="overflow-hidden p-5">
        <h2 className="text-sm font-semibold text-fg">Account summary</h2>
        <dl className="mt-4 grid grid-cols-2 gap-3">
          <div className="min-h-[4.75rem] rounded-2xl border border-border bg-brand-muted/40 p-4">
            <dt className="text-eyebrow inline-flex items-center gap-1 text-fg-subtle">
              <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
              Member since
            </dt>
            <dd className="mt-2 text-sm font-semibold text-fg">{user.memberSince}</dd>
          </div>
          <div className="min-h-[4.75rem] rounded-2xl border border-border bg-brand-muted/40 p-4">
            <dt className="text-eyebrow inline-flex items-center gap-1 text-fg-subtle">
              <Clock3 className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
              Timezone
            </dt>
            <dd className="mt-2 text-sm font-semibold text-fg">Pacific</dd>
          </div>
        </dl>
      </GlassCard>

      <section className="space-y-3">
        <h2 className="text-eyebrow tracking-[0.12em] text-fg">Connected devices</h2>
        <GlassCard className="divide-y divide-border p-0">
          {connectedDevices.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg">{d.name}</p>
                <p className="text-xs text-fg-muted">{d.last}</p>
              </div>
              <span className="shrink-0 rounded-full bg-success-muted px-2 py-0.5 text-[0.625rem] font-bold uppercase text-success">
                {d.status}
              </span>
            </div>
          ))}
        </GlassCard>
      </section>

      <section className="space-y-3">
        <h2 className="text-eyebrow tracking-[0.12em] text-fg">Privacy controls</h2>
        <GlassCard className="divide-y divide-border p-0">
          {privacyControls.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-fg">{p.label}</p>
                <p className="text-xs text-fg-muted">{p.hint}</p>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase",
                  p.on ? "bg-brand-muted text-brand" : "bg-brand-muted/35 text-fg-subtle",
                )}
              >
                {p.on ? "On" : "Off"}
              </span>
            </div>
          ))}
        </GlassCard>
      </section>

      <section className="space-y-3">
        <h2 className="text-eyebrow tracking-[0.12em] text-fg">Progress history</h2>
        <GlassCard className="p-0">
          {progressHistory.map((h) => (
            <div
              key={h.id}
              className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5 last:border-b-0"
            >
              <div>
                <p className="text-sm font-semibold text-fg">{h.label}</p>
                <p className="text-xs text-fg-muted">{h.note}</p>
              </div>
              <span className="font-display text-lg tabular-nums text-brand">{h.score}</span>
            </div>
          ))}
        </GlassCard>
      </section>

      <section className="space-y-4">
        <h2 className="text-eyebrow tracking-[0.12em] text-fg">Achievements</h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard
                hover
                tone={a.unlocked ? "brand" : "default"}
                className={cn(
                  "flex h-[10.6rem] flex-col overflow-hidden p-4",
                  a.unlocked &&
                    "ring-1 ring-brand/35 shadow-[0_0_32px_-18px_rgba(0,217,138,0.2)] dark:shadow-[0_0_36px_-14px_rgba(61,255,179,0.18)]",
                  !a.unlocked && "opacity-[0.72] saturate-[0.65]",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-xs",
                      a.unlocked
                        ? "border-brand/25 bg-white/80 text-brand dark:bg-white/10"
                        : "border-border bg-brand-muted/40 text-fg-subtle",
                    )}
                  >
                    <AchievementIcon
                      icon={a.icon}
                      unlocked={a.unlocked}
                      className="h-5 w-5"
                    />
                  </div>
                  <span
                    className={cn(
                      "shrink-0 pt-0.5 text-[0.625rem] font-bold uppercase tracking-wide",
                      a.unlocked ? "text-success" : "text-fg-subtle",
                    )}
                  >
                    {a.unlocked ? "Unlocked" : "Locked"}
                  </span>
                </div>
                <p className="font-sans mt-4 min-h-[2.2rem] text-sm font-semibold leading-snug text-fg line-clamp-2">
                  {a.title}
                </p>
                <p className="mt-1.5 min-h-[2.1rem] text-[0.8125rem] leading-snug text-fg-muted line-clamp-2">
                  {a.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {settingsGroups.map((group) => (
        <section key={group.title}>
          <button
            type="button"
            onClick={() => {
              setOpenGroup((prev) => (prev === group.title ? null : group.title));
              setOpenSettingItem(null);
            }}
            className="mb-3 flex w-full items-center justify-between gap-3 rounded-xl px-0.5 text-left text-eyebrow tracking-[0.14em] text-fg-subtle"
            aria-expanded={openGroup === group.title}
          >
            <span>{group.title}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-fg-subtle transition-transform duration-200",
                openGroup === group.title && "rotate-180",
              )}
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
          {openGroup === group.title ? (
            <>
              <div className="divide-y divide-border/70 overflow-hidden">
                {group.items.map((item) => (
                  <div key={item.id} className="overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenSettingItem((prev) => (prev === item.id ? null : item.id))}
                      className="flex w-full min-h-[3.25rem] items-center justify-between gap-3 rounded-lg px-1.5 py-3 text-left text-sm font-semibold text-fg transition-colors duration-200 hover:bg-brand-muted/25 active:bg-brand-muted/35"
                      aria-expanded={openSettingItem === item.id}
                    >
                      <span className="min-w-0 truncate">{item.label}</span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {item.hint ? (
                          <span className="max-w-[9rem] truncate text-xs font-medium text-fg-subtle">
                            {item.hint}
                          </span>
                        ) : null}
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 text-fg-subtle transition-transform duration-200",
                            openSettingItem === item.id && "rotate-90",
                          )}
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </span>
                    </button>
                    {openSettingItem === item.id ? (
                      <div className="space-y-2 px-1 pb-2">
                        <div className="grid gap-2">
                          {getItemOptions(item.id).map((opt) => {
                            const toggleKey = `${item.id}:${opt}`;
                            const isOn = Boolean(settingOptionToggles[toggleKey]);
                            return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                setSettingOptionToggles((prev) => ({
                                  ...prev,
                                  [toggleKey]: !prev[toggleKey],
                                }))
                              }
                              className="flex items-center justify-between gap-3 rounded-lg px-1.5 py-1 text-left text-xs font-medium text-fg"
                              role="switch"
                              aria-checked={isOn}
                            >
                              <span className="truncate">{opt}</span>
                              <span
                                className={cn(
                                  "relative inline-flex h-5 w-9 shrink-0 rounded-full border transition-colors duration-200",
                                  isOn ? "border-brand/45 bg-brand-muted/80" : "border-border bg-surface-card",
                                )}
                              >
                                <span
                                  className={cn(
                                    "absolute top-[2px] h-3.5 w-3.5 rounded-full transition-[left,background-color] duration-200",
                                    isOn ? "left-[18px] bg-brand" : "left-[2px] bg-fg-subtle",
                                  )}
                                />
                              </span>
                            </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </section>
      ))}

      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={() => setLogoutConfirmOpen(true)}
        className="w-full border-transparent bg-[color:var(--brand-primary)] text-[color:var(--brand-on-primary)] shadow-[0_0_0_1px_rgba(0,217,138,0.2),0_12px_36px_-12px_rgba(0,217,138,0.45)] hover:bg-[color:var(--brand-primary-hover)]"
      >
        <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden />
        Logout
      </Button>

      {logoutConfirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
          <GlassCard className="w-full max-w-sm p-5">
            <p className="text-eyebrow text-fg-subtle">Confirm</p>
            <p className="mt-2 font-display text-lg leading-tight text-fg">Log out from this demo session?</p>
            <p className="mt-1 text-sm text-fg-muted">You will be taken to the login screen.</p>
            <div className="mt-5 flex gap-2">
              <Button type="button" variant="quiet" size="md" className="flex-1" onClick={() => setLogoutConfirmOpen(false)}>
                <X className="h-4 w-4" strokeWidth={2} aria-hidden />
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                className="flex-1 border-transparent bg-[color:var(--brand-primary)] text-[color:var(--brand-on-primary)] shadow-[0_0_0_1px_rgba(0,217,138,0.2),0_12px_36px_-12px_rgba(0,217,138,0.45)] hover:bg-[color:var(--brand-primary-hover)]"
                onClick={() => router.push("/login")}
              >
                <LogOut className="h-4 w-4" strokeWidth={2} aria-hidden />
                Confirm
              </Button>
            </div>
          </GlassCard>
        </div>
      ) : null}

      <p className="pb-1 text-center text-[0.6875rem] text-fg-subtle">
        Momentum · portfolio-ready product experience
      </p>
    </div>
  );
}
