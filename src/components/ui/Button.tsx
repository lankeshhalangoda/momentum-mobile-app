import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "quiet";
export type ButtonSize = "md" | "sm";

export const buttonVariants = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) =>
  cn(
    "font-sans inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-[transform,box-shadow,background-color,color,border-color,filter] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-page)]",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45",
    size === "md" && "min-h-11 rounded-xl px-5 text-sm",
    size === "sm" && "min-h-9 rounded-lg px-3.5 text-xs",
    variant === "primary" &&
      "border border-transparent bg-gradient-to-r from-[color:var(--neon-soft)] to-[color:var(--neon)] text-[color:var(--brand-on-primary)] shadow-[0_0_0_1px_rgba(0,217,138,0.2),0_12px_36px_-12px_rgba(0,217,138,0.45)] hover:brightness-[1.06] dark:from-[color:var(--neon-soft)] dark:to-[color:var(--neon-strong)] dark:shadow-[0_0_0_1px_rgba(61,255,179,0.25),0_14px_44px_-12px_rgba(61,255,179,0.35)] dark:hover:brightness-110",
    variant === "secondary" &&
      "border border-border-strong bg-surface-elevated text-fg shadow-xs hover:border-brand/40 hover:shadow-[0_0_24px_-14px_rgba(0,217,138,0.2)] dark:hover:shadow-[0_0_28px_-12px_rgba(61,255,179,0.18)]",
    variant === "ghost" &&
      "border border-transparent bg-transparent text-fg-muted hover:bg-surface-muted hover:text-brand",
    variant === "quiet" &&
      "border border-border bg-surface-muted/80 text-fg hover:border-brand/35 hover:bg-surface-muted hover:shadow-[0_0_20px_-16px_rgba(0,217,138,0.15)]",
    className,
  );

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonVariants(variant, size, className)}
      {...props}
    />
  );
});
