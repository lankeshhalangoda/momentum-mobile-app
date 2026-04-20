"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Lock, LogIn, Mail } from "lucide-react";
import { MomentumLogoLockup } from "@/components/brand/MomentumLogoLockup";
import { Button } from "@/components/ui/Button";

const DEMO_EMAIL = "demo@momentum.app";
const DEMO_PASSWORD = "momentum123";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const email = DEMO_EMAIL;
  const password = DEMO_PASSWORD;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setError("");
      router.push("/home");
      return;
    }
    setError("Invalid credentials. Please try again.");
  };

  return (
    <main className="flex min-h-[100dvh] flex-col px-3 py-3">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col overflow-hidden rounded-[1.6rem] border border-border-strong bg-surface-elevated/60 shadow-card-hover">
        <div className="flex min-h-[calc(100dvh-1.5rem)] flex-col justify-center overflow-y-auto px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="w-full">
            <div className="mb-6 mt-1 flex items-center justify-center">
              <MomentumLogoLockup variant="header" className="scale-[0.98]" />
            </div>
            <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-brand-muted/20">
              <div className="relative h-56 w-full sm:h-64">
                <Image
                  src="/illustrations/Skipping rope-bro.png"
                  alt="Skipping rope"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 420px"
                  priority={false}
                />
              </div>
            </div>
            <h1 className="font-display text-[1.4rem] leading-tight text-fg">Welcome back</h1>
            <p className="mt-1 text-sm text-fg-muted">Pick up where you left off and keep your momentum building.</p>

            <form onSubmit={submit} className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-fg-subtle">
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  disabled
                  readOnly
                  className="h-11 w-full cursor-not-allowed rounded-xl border border-border bg-surface-card/80 px-3 text-sm text-fg/85 outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-fg-subtle">
                  <Lock className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                  Password
                </span>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    disabled
                    readOnly
                    className="h-11 w-full cursor-not-allowed rounded-xl border border-border bg-surface-card/80 px-3 pr-16 text-sm text-fg/85 outline-none"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 text-[0.65rem] font-semibold text-fg-subtle">
                    <Eye className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden />
                  </span>
                </div>
              </label>
              {error ? <p className="text-xs font-semibold text-danger">{error}</p> : null}
              <Button type="submit" variant="primary" size="md" className="mt-2 w-full">
                <LogIn className="h-4 w-4" strokeWidth={2} aria-hidden />
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
