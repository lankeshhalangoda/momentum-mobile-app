"use client";

import { motion } from "framer-motion";
import { MomentumLogoLockup } from "@/components/brand/MomentumLogoLockup";

export function SplashScreen() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-surface-page px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        <MomentumLogoLockup variant="splash" className="max-w-[min(100%,20rem)]" />
        <p className="mt-8 max-w-[28ch] text-sm leading-relaxed text-fg-muted">
          Goals, focus, and growth — engineered for clarity.
        </p>
        <div className="mt-10 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
          <span className="text-eyebrow text-fg-subtle">Loading your workspace</span>
        </div>
      </motion.div>
    </div>
  );
}
