"use client";

import { cn } from "@/lib/utils";

type HeatmapGridProps = {
  /** rows × cols, values 0–4 */
  values: number[][];
  className?: string;
  rowLabels?: string[];
};

const levelClass = (v: number) => {
  if (v <= 0) return "bg-surface-muted/80 dark:bg-surface-muted/50";
  if (v === 1) return "bg-brand/25 dark:bg-brand/35";
  if (v === 2) return "bg-brand/40 dark:bg-brand/45";
  if (v === 3) return "bg-brand/60 dark:bg-brand/55";
  return "bg-brand dark:bg-brand shadow-[0_0_12px_-2px_rgba(0,168,107,0.45)]";
};

export function HeatmapGrid({ values, className, rowLabels }: HeatmapGridProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="inline-flex min-w-full flex-col gap-1.5">
        {values.map((row, ri) => (
          <div key={ri} className="flex items-center gap-2">
            {rowLabels?.[ri] ? (
              <span className="w-8 shrink-0 text-[0.625rem] font-medium text-fg-subtle">{rowLabels[ri]}</span>
            ) : null}
            <div className="flex flex-1 gap-1.5">
              {row.map((cell, ci) => (
                <div
                  key={ci}
                  className={cn(
                    "h-7 min-w-[1.35rem] flex-1 rounded-md transition-colors duration-300",
                    levelClass(cell),
                  )}
                  title={`Intensity ${cell}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[0.625rem] text-fg-subtle">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={cn("h-3 w-3 rounded-sm", levelClass(i))} />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
