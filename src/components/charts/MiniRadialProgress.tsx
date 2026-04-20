"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type MiniRadialProgressProps = {
  value: number;
  className?: string;
  size?: number;
  stroke?: number;
};

/** Compact radial for goal % — pairs with sparklines without duplicating chart semantics */
export function MiniRadialProgress({ value, className, size = 76, stroke = 7 }: MiniRadialProgressProps) {
  const uid = useId().replace(/:/g, "");
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = c - (clamped / 100) * c;

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <defs>
            <linearGradient id={`${uid}-mini`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--chart-bar-from)" />
              <stop offset="100%" stopColor="var(--chart-line-end)" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            className="fill-none"
            stroke="var(--chart-track)"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            strokeLinecap="round"
            className="fill-none transition-[stroke-dashoffset] duration-700 ease-out"
            stroke={`url(#${uid}-mini)`}
            style={{
              strokeDasharray: c,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        <span className="font-display pointer-events-none absolute inset-0 flex items-center justify-center text-center text-base tabular-nums tracking-tight text-fg">
          {Math.round(clamped)}
          <span className="text-[0.65em]">%</span>
        </span>
      </div>
      <span className="mt-1.5 text-[0.625rem] font-semibold uppercase tracking-wide text-fg-subtle">Goal</span>
    </div>
  );
}
