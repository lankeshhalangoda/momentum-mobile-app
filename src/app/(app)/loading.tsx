"use client";

import { MomentumLogoLockup } from "@/components/brand/MomentumLogoLockup";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 py-1.5">
        <MomentumLogoLockup variant="header" animate={false} />
        <p className="text-eyebrow">Loading</p>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-9 w-56 rounded-lg" />
      </div>
      <Skeleton className="h-44 w-full rounded-2xl" />
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}
