"use client";

import { cn } from "@/lib/utils";

type SegmentedGoalRingsProps = {
  segments: { done: boolean }[];
  className?: string;
};

/** Multi-segment completion — one ring per milestone */
export function SegmentedGoalRings({ segments, className }: SegmentedGoalRingsProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-center gap-3", className)}>
      {segments.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border-2 transition-colors",
              s.done
                ? "border-brand bg-brand-muted shadow-[0_0_0_4px_rgba(0,217,138,0.08)]"
                : "border-border bg-white/50 dark:bg-white/[0.06]",
            )}
          >
            <span
              className={cn(
                "font-display text-sm tabular-nums",
                s.done ? "text-brand" : "text-fg-subtle",
              )}
            >
              {i + 1}
            </span>
          </div>
          <span className="text-[0.5625rem] font-bold uppercase tracking-wide text-fg-subtle">
            {s.done ? "Done" : "Open"}
          </span>
        </div>
      ))}
    </div>
  );
}
