"use client";

import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
};

export function ProgressBar({
  value,
  className,
  trackClassName,
  fillClassName,
}: ProgressBarProps) {
  const numericValue = Number.isFinite(value) ? value : 0;
  const pct = Math.min(100, Math.max(0, numericValue));

  return (
    <div
      className={cn(
        "h-2 overflow-hidden rounded-full bg-[#e6e6e6] dark:bg-[#e6e6e6]",
        className,
        trackClassName,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-[color:var(--chart-bar-from)] to-[color:var(--chart-bar-to)]",
          fillClassName,
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
