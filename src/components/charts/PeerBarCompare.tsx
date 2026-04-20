"use client";

import { cn } from "@/lib/utils";

type PeerBarCompareProps = {
  selfPct: number;
  peerPct: number;
  className?: string;
};

/** Side-by-side bars: you vs cohort — distinct from spark velocity */
export function PeerBarCompare({ selfPct, peerPct, className }: PeerBarCompareProps) {
  const a = Math.min(100, Math.max(0, selfPct));
  const b = Math.min(100, Math.max(0, peerPct));

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between text-[0.6875rem] font-semibold uppercase tracking-wide text-fg-subtle">
        <span>You</span>
        <span>Cohort</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="mb-1 flex justify-between text-xs font-medium text-fg">
            <span>Progress</span>
            <span className="tabular-nums text-brand">{a}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/60 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[color:var(--chart-bar-from)] to-[color:var(--chart-bar-to)]"
              style={{ width: `${a}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs font-medium text-fg-muted">
            <span>Avg peer</span>
            <span className="tabular-nums text-amber">{b}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/60 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand/85 to-amber/70"
              style={{ width: `${b}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
