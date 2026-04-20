import { cn } from "@/lib/utils";

/** Disciplined surfaces: crisp glass / brand tint / deep emerald hero (never flat black in light). */
export type GlassTone = "default" | "brand" | "dark";

export type CardDecoration = "none" | "mesh" | "energy" | "contour" | "neon";

/** Secondary bottom/side atmospheric layer — stacks under content */
export type CardAccent = "none" | "camo" | "side";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  /** Softer lift — use on carousels / streak chips to avoid detached glow */
  hoverSoft?: boolean;
  as?: "div" | "section" | "article";
  tone?: GlassTone;
  decoration?: CardDecoration;
  /** Extra branded texture (camo grid / side glow) — subtle; pairs with primary decoration */
  accentDecoration?: CardAccent;
};

const decoClass: Record<CardDecoration, string | undefined> = {
  none: undefined,
  mesh: "card-deco-mesh",
  energy: "card-deco-energy",
  contour: "card-deco-contour",
  neon: "card-deco-neon",
};

const accentClass: Record<CardAccent, string | undefined> = {
  none: undefined,
  camo: "card-deco-camo",
  side: "card-deco-side-accent",
};

const toneClass: Record<GlassTone, string> = {
  default:
    "border-border/70 bg-surface-card shadow-card-depth dark:border-white/[0.09] dark:bg-surface-card",
  brand:
    "border-brand/25 bg-brand-surface shadow-card-depth dark:border-brand/18 dark:bg-brand-surface",
  /** Deep emerald / graphite-green — light & dark; forces light ink on nested .text-fg */
  dark:
    "border-emerald-900/22 bg-surface-hero text-white shadow-card-depth dark:border-emerald-950/28 [&_.text-fg]:!text-white [&_.text-fg-muted]:!text-white/72 [&_.text-fg-subtle]:!text-emerald-100/65 [&_.text-eyebrow]:!text-white/55 [&_.text-success]:!text-emerald-300",
};

export function GlassCard({
  children,
  className,
  hover = false,
  hoverSoft = false,
  as: Tag = "div",
  tone = "default",
  decoration = "none",
  accentDecoration = "none",
}: GlassCardProps) {
  const deco = decoration !== "none" ? decoClass[decoration] : null;
  const accent = accentDecoration !== "none" ? accentClass[accentDecoration] : null;
  const hasAtmosphere = Boolean(deco || accent);

  return (
    <Tag
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        toneClass[tone],
        hover &&
          !hoverSoft &&
          "cursor-pointer hover:-translate-y-px hover:shadow-[var(--shadow-card-hover)] active:scale-[0.992]",
        hover &&
          hoverSoft &&
          "cursor-pointer hover:-translate-y-px hover:shadow-[var(--shadow-float-hover)] active:scale-[0.992]",
        className,
      )}
    >
      {deco ? <div className={cn(deco, "z-0")} aria-hidden /> : null}
      {accent ? <div className={cn(accent, "z-0")} aria-hidden /> : null}
      <div className={cn("relative z-[1]", hasAtmosphere && "isolate")}>{children}</div>
    </Tag>
  );
}
