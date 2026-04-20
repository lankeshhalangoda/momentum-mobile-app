"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/components/splash/SplashScreen";
import { hasCompletedOnboarding } from "@/lib/storage";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const t = window.setTimeout(() => {
      router.replace(hasCompletedOnboarding() ? "/home" : "/onboarding");
    }, 2200);
    return () => window.clearTimeout(t);
  }, [router]);

  return <SplashScreen />;
}
