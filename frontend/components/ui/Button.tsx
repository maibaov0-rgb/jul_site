import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98]",
  outline:
    "border border-foreground/20 text-foreground hover:border-foreground/60 hover:bg-foreground/5",
  ghost: "text-foreground hover:bg-foreground/5",
};

function classes(variant: Variant, className?: string) {
  return `${base} ${variants[variant]} ${className ?? ""}`.trim();
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
};

export function LinkButton({
  variant = "primary",
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link className={classes(variant, className)} {...rest}>
      {children}
    </Link>
  );
}
