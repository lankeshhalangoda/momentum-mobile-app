"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { AppBrandHeader } from "@/components/brand/AppBrandHeader";
import { BottomNav } from "@/components/navigation/BottomNav";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-md flex-col overflow-hidden",
        "h-[100dvh] max-h-[100dvh]",
        "md:my-6 md:h-[calc(100dvh-3.5rem)] md:max-h-[calc(100dvh-3.5rem)]",
        "md:rounded-[1.85rem] md:border md:border-border-strong md:bg-surface-elevated/55 md:shadow-card-hover",
      )}
    >
      <AppBrandHeader className="z-30 shrink-0" />

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease }}
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div
              className={cn(
                "scroll-app min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain",
                "touch-pan-y px-5 pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] pt-3",
                "scrollbar-none [-webkit-overflow-scrolling:touch]",
              )}
            >
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
