"use client";

import Link from "next/link";
import { MomentumLogoLockup } from "@/components/brand/MomentumLogoLockup";
import { cn } from "@/lib/utils";

export function AppBrandHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "shrink-0 border-b border-border/60 bg-surface-elevated/88 px-3 pb-1 pt-[max(0.35rem,env(safe-area-inset-top))] backdrop-blur-xl",
        className,
      )}
    >
      <Link
        href="/home"
        className="group flex min-w-0 max-w-full items-center gap-0.5 py-1.5 pr-1 transition-[opacity,transform] duration-200 hover:opacity-90 active:scale-[0.995]"
        aria-label="Momentum home"
      >
        <MomentumLogoLockup variant="header" className="min-w-0 max-w-full scale-90" />
      </Link>
    </header>
  );
}
