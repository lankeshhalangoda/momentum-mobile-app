"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { animate, createDrawable, createTimeline } from "animejs";
import { cn } from "@/lib/utils";

type MomentumMarkProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

const HEX_PATH =
  "M16 5 L25.53 10.5 L25.53 21.5 L16 27 L6.47 21.5 L6.47 10.5 Z";
const M_PATH = "M11.5 22.5V12.8L16 17.35L20.5 12.8V22.5";

/** Solid mark + neon “M” with anime.js drawable entrance & light idle motion. */
export function MomentumMark({ className, ...props }: MomentumMarkProps) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  const hexLineRef = useRef<SVGPathElement>(null);
  const mLineRef = useRef<SVGPathElement>(null);
  const hexFillRef = useRef<SVGPolygonElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const hexEl = hexLineRef.current;
    const mEl = mLineRef.current;
    const fillEl = hexFillRef.current;
    const glowEl = glowRef.current;
    const wrapEl = wrapRef.current;
    if (!hexEl || !mEl || !fillEl || !glowEl || !wrapEl) return;

    const hexDraw = createDrawable(hexEl)[0];
    const mDraw = createDrawable(mEl)[0];
    const glowDraw = createDrawable(glowEl)[0];

    const tl = createTimeline({ autoplay: true });

    tl.add(hexDraw, {
      draw: ["0 0", "0 1"],
      duration: 780,
      ease: "out(3)",
    });
    tl.add(
      mDraw,
      {
        draw: ["0 0", "0 1"],
        duration: 620,
        ease: "out(3)",
      },
      "-=260",
    );
    tl.add(
      fillEl,
      {
        opacity: [0, 1],
        duration: 380,
        ease: "out(2)",
      },
      "-=420",
    );

    let idle: ReturnType<typeof animate> | null = null;
    let sway: ReturnType<typeof animate> | null = null;

    const startIdle = () => {
      sway = animate(wrapEl, {
        rotate: [0, 1.15, 0],
        duration: 11200,
        loop: true,
        ease: "inOut(2)",
      });
      idle = animate(glowDraw, {
        draw: ["0 0", "0.35 1"],
        duration: 2200,
        loop: true,
        ease: "inOut(2)",
        alternate: true,
      });
    };

    tl.then(() => {
      startIdle();
    });

    return () => {
      tl.revert();
      idle?.revert();
      sway?.revert();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={cn(
          "shrink-0 drop-shadow-[0_0_12px_rgba(0,217,138,0.22)] dark:drop-shadow-[0_0_14px_rgba(61,255,179,0.28)]",
          className,
        )}
        aria-hidden={props["aria-hidden"] ?? true}
      >
        <polygon
          points="16,5 25.53,10.5 25.53,21.5 16,27 6.47,21.5 6.47,10.5"
          fill="var(--logo-hex-fill)"
          stroke="var(--logo-hex-stroke)"
          strokeWidth="0.75"
        />
        <path
          d={M_PATH}
          fill="none"
          stroke="var(--logo-m-fill)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn(
        "shrink-0 overflow-visible drop-shadow-[0_0_12px_rgba(0,217,138,0.22)] dark:drop-shadow-[0_0_14px_rgba(61,255,179,0.28)]",
        className,
      )}
      aria-hidden={props["aria-hidden"] ?? true}
    >
      <defs>
        <linearGradient id={`${uid}-glow`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--logo-m-fill)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g ref={wrapRef} style={{ transformOrigin: "16px 16px" }}>
        <polygon
          ref={hexFillRef}
          points="16,5 25.53,10.5 25.53,21.5 16,27 6.47,21.5 6.47,10.5"
          fill="var(--logo-hex-fill)"
          stroke="none"
          opacity={0}
        />
        <path
          ref={hexLineRef}
          d={HEX_PATH}
          fill="none"
          stroke="var(--logo-hex-stroke)"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <path
          ref={glowRef}
          d={HEX_PATH}
          fill="none"
          stroke={`url(#${uid}-glow)`}
          strokeWidth="0.45"
          strokeLinejoin="round"
          opacity={0.55}
        />
        <path
          ref={mLineRef}
          d={M_PATH}
          fill="none"
          stroke="var(--logo-m-fill)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
