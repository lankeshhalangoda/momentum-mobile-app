"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Flame, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { onboardingSlides } from "@/lib/data";
import { setOnboardingComplete } from "@/lib/storage";
import { cn } from "@/lib/utils";

const icons = {
  spark: Sparkles,
  shield: Shield,
  flame: Flame,
};

const storysetArt = ["/storyset/onboarding-1.svg", "/storyset/onboarding-2.svg", "/storyset/onboarding-3.svg"];

export function OnboardingFlow() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const slide = onboardingSlides[i];
  const Icon = icons[slide.icon];

  const finish = () => {
    setOnboardingComplete();
    router.replace("/home");
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface-page px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <div className="mb-8 flex gap-1.5">
          {onboardingSlides.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                idx <= i ? "bg-brand" : "bg-brand-muted/60",
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-1 flex-col"
          >
            <div className="mx-auto w-full max-w-[17.5rem] rounded-2xl border border-border-strong bg-surface-elevated/90 p-3 shadow-card">
              <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl">
                <Image
                  src={storysetArt[i]}
                  alt=""
                  fill
                  sizes="280px"
                  className="object-contain p-1"
                  priority={i === 0}
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-surface-page/30 via-transparent to-brand/10" />
              </div>
            </div>

            <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border-strong bg-surface-elevated shadow-card">
              <Icon className="h-7 w-7 text-brand" strokeWidth={1.75} aria-hidden />
            </div>
            <h1 className="font-display mt-6 text-[1.625rem] leading-tight tracking-tight text-fg sm:text-[1.75rem]">
              {slide.title}
            </h1>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">{slide.body}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-auto flex flex-col gap-3 pt-10">
          {i < onboardingSlides.length - 1 ? (
            <Button type="button" variant="primary" className="w-full" onClick={() => setI((x) => x + 1)}>
              Continue
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          ) : (
            <Button type="button" variant="primary" className="w-full" onClick={finish}>
              Enter Momentum
            </Button>
          )}
          <button
            type="button"
            className="text-center text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            onClick={finish}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
