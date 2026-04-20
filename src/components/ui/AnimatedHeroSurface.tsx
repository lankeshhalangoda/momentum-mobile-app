"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBackdrop, type HeroBackdropVariant } from "@/components/ui/HeroBackdrop";
import { cn } from "@/lib/utils";

type AnimatedHeroSurfaceProps = {
  variant?: HeroBackdropVariant;
  className?: string;
  /** Visual intensity 0–1 for animated layers */
  intensity?: number;
};

const PARTICLE_SEED = [
  [12, 18],
  [78, 22],
  [44, 55],
  [88, 68],
  [24, 72],
  [62, 38],
  [52, 12],
  [8, 48],
  [92, 42],
  [36, 82],
  [70, 58],
  [18, 32],
  [58, 88],
  [84, 14],
];

/**
 * rn-bg–style layered hero: flowing gradients, mesh, soft particles, noise.
 * Use only behind hero / summary cards; respects reduced motion.
 */
export function AnimatedHeroSurface({
  variant = "mesh",
  className,
  intensity = 1,
}: AnimatedHeroSurfaceProps) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      PARTICLE_SEED.map(([left, top], i) => ({
        id: i,
        left: `${left}%`,
        top: `${top}%`,
        delay: i * 0.35,
      })),
    [],
  );

  const op = 0.45 * intensity;
  const motionOn = !reduceMotion;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)}
    >
      {/* Flowing neon wash */}
      {motionOn ? (
        <motion.div
          className="absolute -inset-[35%] opacity-[0.14] mix-blend-screen dark:opacity-[0.2]"
          style={{
            background: `conic-gradient(from 180deg at 50% 50%, 
            rgba(0, 217, 138, ${0.2 * op}) 0deg, 
            transparent 120deg, 
            rgba(255, 77, 184, ${0.12 * op}) 220deg, 
            transparent 320deg)`,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ) : (
        <div
          className="absolute -inset-[35%] opacity-[0.1] mix-blend-screen dark:opacity-[0.16]"
          style={{
            background: `conic-gradient(from 180deg at 50% 50%, 
            rgba(0, 217, 138, ${0.18 * op}) 0deg, 
            transparent 120deg, 
            rgba(255, 77, 184, ${0.1 * op}) 220deg, 
            transparent 320deg)`,
          }}
        />
      )}

      {motionOn ? (
        <motion.div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(0, 217, 138, 0.25) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 85% 75%, rgba(255, 77, 184, 0.12) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.04, 1],
            x: ["0%", "1.5%", "0%"],
            y: ["0%", "-1%", "0%"],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 opacity-[0.32] dark:opacity-[0.42]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(0, 217, 138, 0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 85% 75%, rgba(255, 77, 184, 0.1) 0%, transparent 50%)",
          }}
        />
      )}

      <HeroBackdrop variant={variant} emphasized />

      {/* Soft noise grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Micro particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute h-1 w-1 rounded-full bg-brand shadow-[0_0_6px_rgba(0,217,138,0.6)] dark:shadow-[0_0_8px_rgba(61,255,179,0.5)]"
            style={{ left: p.left, top: p.top }}
            animate={
              motionOn
                ? {
                    opacity: [0.15, 0.55, 0.15],
                    scale: [0.85, 1.15, 0.85],
                  }
                : { opacity: 0.35 }
            }
            transition={{
              duration: 4 + (p.id % 3),
              repeat: Infinity,
              delay: p.delay * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Contour energy line */}
      <svg
        viewBox="0 0 100 48"
        className="absolute inset-0 h-full w-full opacity-[0.07] dark:opacity-[0.1]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`${uid}-hero-line`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--energy)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {motionOn ? (
          <motion.path
            d="M0 34 Q 22 14 48 30 T 100 26"
            fill="none"
            stroke={`url(#${uid}-hero-line)`}
            strokeWidth="0.55"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{
              pathLength: [0.88, 1, 0.88],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <path
            d="M0 34 Q 22 14 48 30 T 100 26"
            fill="none"
            stroke={`url(#${uid}-hero-line)`}
            strokeWidth="0.55"
            vectorEffect="non-scaling-stroke"
            opacity={0.45}
          />
        )}
      </svg>
    </div>
  );
}
