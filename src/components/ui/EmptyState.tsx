import Image from "next/image";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
  action?: React.ReactNode;
  /** Use bundled Storyset-style SVG (default) or omit illustration */
  illustration?: "storyset" | "none";
};

export function EmptyState({ title, description, className, action, illustration = "storyset" }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand/25 bg-brand-muted/25 px-6 py-10 text-center",
        className,
      )}
    >
      {illustration === "storyset" ? (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-border/60 bg-surface-card/80 shadow-xs">
          <Image
            src="/storyset/empty-state.svg"
            alt=""
            width={72}
            height={56}
            className="object-contain opacity-90"
          />
        </div>
      ) : null}
      <p className="font-display text-[0.9375rem] text-fg">{title}</p>
      <p className="mt-2 max-w-[32ch] text-sm leading-relaxed text-fg-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
