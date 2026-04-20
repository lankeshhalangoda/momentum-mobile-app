import { cn } from "@/lib/utils";

/** Static hex mark for loading routes (no client hooks). */
export function MomentumMarkStatic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <polygon
        points="16,5 25.53,10.5 25.53,21.5 16,27 6.47,21.5 6.47,10.5"
        fill="var(--logo-hex-fill)"
        stroke="var(--logo-hex-stroke)"
        strokeWidth="0.75"
      />
      <path
        d="M11.5 22.5V12.8L16 17.35L20.5 12.8V22.5"
        fill="none"
        stroke="var(--logo-m-fill)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
