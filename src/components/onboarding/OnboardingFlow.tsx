"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, Flame, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { onboardingSlides } from "@/lib/data";
import { setOnboardingComplete } from "@/lib/storage";
import { cn } from "@/lib/utils";

const icons = {
  spark: Sparkles,
  shield: Shield,
  flame: Flame,
};

const onboardingArt = [
  { src: "/illustrations/Skipping rope-bro.png", alt: "Skipping rope progress training" },
  { src: "/illustrations/fitness-week.png", alt: "Weekly dashboard and focus metrics" },
  { src: "/illustrations/brand communication-bro.png", alt: "Community collaboration network" },
] as const;

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
    <div className="flex min-h-[100dvh] flex-col px-3 py-3">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col overflow-hidden rounded-[1.6rem] border border-border-strong bg-surface-elevated/60 shadow-card-hover">
        <div className="flex flex-1 flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
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
              <div className="mx-auto w-full rounded-2xl border border-border-strong bg-brand-muted/15 p-2.5 shadow-card">
                <div className="relative h-48 w-full overflow-hidden rounded-xl sm:h-56">
                  <Image
                    src={onboardingArt[i].src}
                    alt={onboardingArt[i].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-contain p-2"
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
              <div className="mt-4 grid gap-2">
                {slide.points.map((point) => (
                  <div
                    key={point}
                    className="inline-flex items-start gap-2 rounded-xl border border-border-strong bg-surface-card/65 px-3 py-2"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                      strokeWidth={2.1}
                      aria-hidden
                    />
                    <p className="text-xs font-medium leading-relaxed text-fg-muted">{point}</p>
                  </div>
                ))}
              </div>
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
    </div>
  );
}
