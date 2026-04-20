"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type WeeklyBarsProps = {
  values: number[];
  labels: string[];
  className?: string;
};

export function WeeklyBars({ values, labels, className }: WeeklyBarsProps) {
  const max = Math.max(...values, 1);

  return (
    <div className={cn("flex h-44 items-end justify-between gap-2 px-0.5 pb-1", className)}>
      {values.map((v, i) => {
        const h = Math.round((v / max) * 100);
        return (
          <div key={labels[i]} className="flex flex-1 flex-col items-center gap-2.5">
            <div className="relative flex h-[7.25rem] w-full items-end justify-center overflow-hidden rounded-2xl border border-border/80 bg-brand-muted/35 p-1.5 dark:bg-white/[0.06]">
              <motion.div
                className="w-full max-w-[2.35rem] rounded-xl bg-gradient-to-t from-[color:var(--chart-bar-from)] to-[color:var(--chart-bar-to)] shadow-[0_4px_18px_-6px_rgba(0,217,138,0.28)] dark:shadow-[0_6px_22px_-8px_rgba(61,255,179,0.28)]"
                initial={{ height: "4%" }}
                animate={{ height: `${Math.max(h, 6)}%` }}
                transition={{ type: "spring", stiffness: 118, damping: 19, delay: i * 0.035 }}
              />
            </div>
            <span className="text-[0.6875rem] font-semibold tabular-nums tracking-tight text-fg-subtle">
              {labels[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
