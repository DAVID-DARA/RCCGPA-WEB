import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const styles = {
  primary: "bg-[var(--color-primary)] text-white hover:brightness-90",
  secondary: "bg-transparent text-white ring-1 ring-white/70 hover:bg-white/10",
  ghost: "bg-transparent text-[var(--color-secondary)] ring-1 ring-[var(--color-secondary)]/35 hover:bg-[var(--color-secondary)]/5"
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors",
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
