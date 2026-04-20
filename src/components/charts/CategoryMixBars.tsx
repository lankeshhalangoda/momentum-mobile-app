"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

type Mix = { label: string; pct: number };

type CategoryMixBarsProps = {
  items: Mix[];
  className?: string;
};

/** Horizontal distribution — reading mix, portfolio split, etc. */
export function CategoryMixBars({ items, className }: CategoryMixBarsProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between text-[0.8125rem] font-medium text-fg">
            <span>{item.label}</span>
            <span className="tabular-nums text-fg-muted">{item.pct}%</span>
          </div>
          <ProgressBar value={item.pct} />
        </div>
      ))}
    </div>
  );
}
