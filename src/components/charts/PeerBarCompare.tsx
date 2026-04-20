"use client";

import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";

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
          <ProgressBar value={a} className="h-2.5" />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs font-medium text-fg">
            <span>Avg peer</span>
            <span className="tabular-nums text-amber">{b}%</span>
          </div>
          <ProgressBar value={b} className="h-2.5" />
        </div>
      </div>
    </div>
  );
}
