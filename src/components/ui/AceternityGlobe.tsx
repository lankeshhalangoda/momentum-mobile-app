"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

type AceternityGlobeProps = {
  className?: string;
};

/** Aceternity-style interactive globe (cobe). */
export function AceternityGlobe({ className }: AceternityGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let size = 0;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      size = rect.width;
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(canvas);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 12000,
      mapBrightness: 6,
      baseColor: [0.05, 0.18, 0.13],
      markerColor: [0.0, 0.92, 0.63],
      glowColor: [0.25, 1, 0.72],
      markers: [
        { location: [37.77, -122.42], size: 0.06 },
        { location: [51.5, -0.12], size: 0.07 },
        { location: [1.35, 103.82], size: 0.05 },
        { location: [35.68, 139.69], size: 0.06 },
      ],
      onRender: (state: { phi: number; width: number; height: number }) => {
        state.phi = phi;
        phi += 0.0045;
        state.width = size * 2;
        state.height = size * 2;
      },
    } as any);

    return () => {
      ro.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <div className={cn("relative h-28 w-28 shrink-0", className)} aria-hidden>
      <div className="absolute inset-2 rounded-full bg-brand/20 blur-xl dark:bg-brand/28" />
      <canvas ref={canvasRef} className="relative h-full w-full rounded-full" />
    </div>
  );
}
