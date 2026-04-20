"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressRingProps = {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  label?: string;
  sublabel?: string;
  centerMode?: "full" | "percent-only";
  /** Light text for use on dark / charcoal surfaces */
  inverse?: boolean;
};

export function ProgressRing({
  value,
  size = 168,
  stroke = 10,
  className,
  label,
  sublabel,
  centerMode = "full",
  inverse = false,
}: ProgressRingProps) {
  const uid = useId().replace(/:/g, "");
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = c - (clamped / 100) * c;

  const percentSize =
    size >= 150 ? "text-3xl" : size >= 120 ? "text-[1.65rem]" : "text-[1.375rem]";

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        "[&_svg]:drop-shadow-[0_0_14px_rgba(0,217,138,0.2)] dark:[&_svg]:drop-shadow-[0_0_16px_rgba(61,255,179,0.28)]",
        className,
      )}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`${uid}-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--ring-progress-a)" />
            <stop offset="55%" stopColor="var(--ring-progress-b)" />
            <stop offset="100%" stopColor="var(--ring-progress-c)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          className="fill-none"
          stroke="var(--ring-track)"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeLinecap="round"
          className="fill-none"
          stroke={`url(#${uid}-ring)`}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 68, damping: 19 }}
          style={{ strokeDasharray: c }}
        />
      </svg>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center",
          centerMode === "percent-only" && "px-1",
        )}
      >
        {centerMode === "full" && label && (
          <span className={cn("text-eyebrow", inverse && "!text-white/65")}>{label}</span>
        )}
        <span
          className={cn(
            "font-display tracking-[0.04em]",
            percentSize,
            centerMode === "percent-only"
              ? "mt-0 text-brand"
              : inverse
                ? "text-white"
                : "text-fg",
            centerMode === "full" && label && "mt-1",
          )}
        >
          {Math.round(clamped)}%
        </span>
        {centerMode === "percent-only" && sublabel && (
          <span
            className={cn(
              "mt-0.5 max-w-[5.75rem] px-0.5 text-center text-[0.5rem] font-medium leading-tight text-fg-muted sm:max-w-[6rem] sm:text-[0.5625rem]",
              inverse && "!text-white/72",
            )}
          >
            {sublabel}
          </span>
        )}
        {centerMode === "full" && sublabel && (
          <span
            className={cn(
              "mt-1 max-w-[7.5rem] text-[0.8125rem] leading-snug",
              inverse ? "text-white/70" : "text-fg-muted",
            )}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
