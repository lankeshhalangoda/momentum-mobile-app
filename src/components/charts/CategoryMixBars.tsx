"use client";

import { cn } from "@/lib/utils";

type Mix = { label: string; pct: number };

type CategoryMixBarsProps = {
  items: Mix[];
  className?: string;
};

const barTint = [
  "from-brand to-amber/90",
  "from-brand/90 to-amber/80",
  "from-brand/80 to-amber/70",
];

/** Horizontal distribution — reading mix, portfolio split, etc. */
export function CategoryMixBars({ items, className }: CategoryMixBarsProps) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {items.map((item, i) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between text-[0.8125rem] font-medium text-fg">
            <span>{item.label}</span>
            <span className="tabular-nums text-fg-muted">{item.pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/70 dark:bg-white/10">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r",
                barTint[i % barTint.length],
              )}
              style={{ width: `${item.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
