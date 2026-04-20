"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { animate, createDrawable, createTimeline } from "animejs";
import { OMENTUM_PATHS, OMENTUM_VIEW } from "@/components/brand/omentumWordmarkPaths";
import { cn } from "@/lib/utils";

const HEX_PATH = "M16 5 L25.53 10.5 L25.53 21.5 L16 27 L6.47 21.5 L6.47 10.5 Z";
const M_PATH = "M11.5 22.5V12.8L16 17.35L20.5 12.8V22.5";

type MomentumLogoLockupProps = {
  /** Splash: full staggered reveal + idle. Header: faster, lighter idle. */
  variant?: "splash" | "header";
  /** Skip motion (e.g. loading shell). */
  animate?: boolean;
  className?: string;
};

export function MomentumLogoLockup({
  variant = "header",
  animate: animateEnabled = true,
  className,
}: MomentumLogoLockupProps) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const staticMode = reduceMotion || !animateEnabled;

  const hexLineRef = useRef<SVGPathElement>(null);
  const mLineRef = useRef<SVGPathElement>(null);
  const hexFillRef = useRef<SVGPolygonElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<SVGGElement>(null);
  const lockupRef = useRef<HTMLDivElement>(null);
  const letterFillRefs = useRef<(SVGPathElement | null)[]>([]);

  const isSplash = variant === "splash";
  const iconClass = isSplash ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" : "h-11 w-11 sm:h-12 sm:w-12";
  /** Slightly smaller than the hex mark cap-height so the lockup aligns optically */
  const wordClass = isSplash ? "h-[2.1rem] w-auto sm:h-[2.2rem]" : "h-[1.1rem] w-auto sm:h-[1.14rem]";

  useEffect(() => {
    if (staticMode) return;

    const hexEl = hexLineRef.current;
    const mEl = mLineRef.current;
    const fillEl = hexFillRef.current;
    const glowEl = glowRef.current;
    const wrapEl = wrapRef.current;
    const lockEl = lockupRef.current;
    if (!hexEl || !mEl || !fillEl || !glowEl || !wrapEl || !lockEl) return;

    const hexDraw = createDrawable(hexEl)[0];
    const mDraw = createDrawable(mEl)[0];
    const glowDraw = createDrawable(glowEl)[0];

    const letterFills = letterFillRefs.current.filter(Boolean) as SVGPathElement[];

    const dHex = isSplash ? 780 : 460;
    const dM = isSplash ? 620 : 380;
    const dLetter = isSplash ? 400 : 240;
    const gapLetters = isSplash ? 48 : 28;
    const overlapM = isSplash ? 260 : 200;

    const tl = createTimeline({ autoplay: true });

    tl.add(hexDraw, {
      draw: ["0 0", "0 1"],
      duration: dHex,
      ease: "out(3)",
    });
    tl.add(
      mDraw,
      {
        draw: ["0 0", "0 1"],
        duration: dM,
        ease: "out(3)",
      },
      `-=${overlapM}`,
    );
    tl.add(
      fillEl,
      {
        opacity: [0, 1],
        duration: isSplash ? 380 : 260,
        ease: "out(2)",
      },
      isSplash ? "-=420" : "-=280",
    );

    letterFills.forEach((lf, i) => {
      tl.add(
        lf,
        {
          opacity: [0, 1],
          duration: dLetter,
          ease: "out(3)",
        },
        i === 0 ? (isSplash ? "-=120" : "-=80") : `+=${gapLetters}`,
      );
    });

    let idleGlow: ReturnType<typeof animate> | null = null;
    let idleBreath: ReturnType<typeof animate> | null = null;
    let idleSway: ReturnType<typeof animate> | null = null;

    const startIdle = () => {
      idleGlow = animate(glowDraw, {
        draw: ["0 0", "0.35 1"],
        duration: isSplash ? 2400 : 3200,
        loop: true,
        ease: "inOut(2)",
        alternate: true,
      });
      idleBreath = animate(lockEl, {
        scale: [1, 1.006, 1],
        duration: isSplash ? 10000 : 12000,
        loop: true,
        ease: "inOut(3)",
      });
      idleSway = animate(wrapEl, {
        rotate: [0, 0.35, 0],
        duration: isSplash ? 11200 : 14000,
        loop: true,
        ease: "inOut(2)",
      });
    };

    tl.then(() => {
      startIdle();
    });

    return () => {
      tl.revert();
      idleGlow?.revert();
      idleBreath?.revert();
      idleSway?.revert();
    };
  }, [staticMode, isSplash]);

  const wm = OMENTUM_VIEW;

  if (staticMode) {
    return (
      <div
        className={cn("flex items-center gap-0", className)}
        aria-label="Momentum"
        role="img"
      >
        <svg viewBox="0 0 32 32" fill="none" className={cn("shrink-0", iconClass)} aria-hidden>
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
        <svg
          viewBox={`${wm.minX} ${wm.minY} ${wm.width} ${wm.height}`}
          fill="none"
          className={cn("shrink-0 -ml-[7px] text-fg", wordClass)}
          preserveAspectRatio="xMinYMid meet"
          aria-hidden
        >
          {OMENTUM_PATHS.map(({ ch, d }) => (
            <path key={ch + d.slice(0, 12)} d={d} fill="currentColor" />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={lockupRef}
      className={cn("flex origin-center items-center gap-0", className)}
      style={{ transformOrigin: "50% 50%" }}
      aria-label="Momentum"
      role="img"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className={cn(
          "shrink-0 overflow-visible drop-shadow-[0_0_12px_rgba(0,217,138,0.2)] dark:drop-shadow-[0_0_14px_rgba(61,255,179,0.24)]",
          iconClass,
        )}
        aria-hidden
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

      <svg
        viewBox={`${wm.minX} ${wm.minY} ${wm.width} ${wm.height}`}
        fill="none"
        className={cn("shrink-0 -ml-[7px] overflow-visible", wordClass)}
        preserveAspectRatio="xMinYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={`${uid}-word-fill`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <g>
          {OMENTUM_PATHS.map(({ ch, d }, i) => (
            <path
              key={`fill-${ch}-${i}`}
              ref={(el) => {
                letterFillRefs.current[i] = el;
              }}
              d={d}
              fill={`url(#${uid}-word-fill)`}
              opacity={0}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
