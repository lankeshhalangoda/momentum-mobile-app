"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type HeroBackdropVariant = "mesh" | "grid" | "blueprint";

type HeroBackdropProps = {
  variant?: HeroBackdropVariant;
  className?: string;
  /** Stronger mesh/grid for layered hero stacks */
  emphasized?: boolean;
};

/**
 * Low-opacity futuristic motifs for hero / summary surfaces only.
 */
export function HeroBackdrop({
  variant = "mesh",
  className,
  emphasized = false,
}: HeroBackdropProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        emphasized ? "opacity-[0.1] dark:opacity-[0.16]" : "opacity-[0.06] dark:opacity-[0.12]",
        className,
      )}
    >
      {variant === "grid" && (
        <svg className="h-full w-full text-brand" fill="none">
          <defs>
            <pattern id={`${uid}-g`} width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0H0V22" stroke="currentColor" strokeWidth="0.4" opacity="0.9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-g)`} />
        </svg>
      )}

      {variant === "mesh" && (
        <svg className="h-full w-full text-brand" fill="none">
          <defs>
            <pattern id={`${uid}-m`} width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M0 28L28 0" stroke="currentColor" strokeWidth="0.35" opacity="0.85" />
              <path d="M0 0H28V28" stroke="currentColor" strokeWidth="0.28" opacity="0.45" />
            </pattern>
            <radialGradient id={`${uid}-fade`} cx="50%" cy="30%" r="75%">
              <stop offset="0%" stopColor="var(--surface-card)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--surface-card)" stopOpacity="0.55" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-m)`} />
          <rect width="100%" height="100%" fill={`url(#${uid}-fade)`} />
        </svg>
      )}

      {variant === "blueprint" && (
        <svg className="h-full w-full text-brand" fill="none">
          <defs>
            <pattern id={`${uid}-bp`} width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="0.9" fill="currentColor" opacity="0.55" />
              <path d="M18 2v8M14 6h8" stroke="currentColor" strokeWidth="0.35" opacity="0.45" />
              <path d="M2 18h32" stroke="currentColor" strokeWidth="0.28" opacity="0.35" />
            </pattern>
            <radialGradient id={`${uid}-fade2`} cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="var(--surface-card)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--surface-card)" stopOpacity="0.5" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-bp)`} />
          <rect width="100%" height="100%" fill={`url(#${uid}-fade2)`} />
        </svg>
      )}
    </div>
  );
}
