"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MiniSparklineProps = {
  values: number[];
  className?: string;
  height?: number;
};

export function MiniSparkline({ values, className, height = 52 }: MiniSparklineProps) {
  const uid = useId().replace(/:/g, "");
  const w = 120;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = 4;
  const innerW = w - pad * 2;
  const innerH = height - pad * 2;
  const range = max - min || 1;

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * innerW;
    const y = pad + innerH - ((v - min) / range) * innerH;
    return `${x},${y}`;
  });

  const line = `M ${points.join(" L ")}`;
  const area = `${line} L ${pad + innerW} ${height} L ${pad} ${height} Z`;

  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-brand-muted/35 p-2 shadow-[inset_0_0_0_1px_rgba(0,217,138,0.08)] dark:bg-white/[0.05] dark:shadow-[inset_0_0_0_1px_rgba(61,255,179,0.1)]",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${w} ${height}`}
        className="w-full overflow-visible drop-shadow-[0_0_10px_rgba(0,217,138,0.12)] dark:drop-shadow-[0_0_12px_rgba(61,255,179,0.15)]"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-fill-start)" />
            <stop offset="100%" stopColor="var(--chart-fill-end)" />
          </linearGradient>
          <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--chart-line-start)" />
            <stop offset="100%" stopColor="var(--chart-line-end)" />
          </linearGradient>
        </defs>
        <line
          x1={pad}
          x2={w - pad}
          y1={height - pad}
          y2={height - pad}
          stroke="var(--chart-track)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <motion.path
          d={area}
          fill={`url(#${uid}-fill)`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={`url(#${uid}-stroke)`}
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
