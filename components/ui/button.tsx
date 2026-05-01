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
  primary: "bg-[#D4AF37] text-[#111111] hover:bg-[#c49f28]",
  secondary: "bg-transparent text-white ring-1 ring-white/70 hover:bg-white/10",
  ghost: "bg-transparent text-[#111111] ring-1 ring-[#111111]/30 hover:bg-black/5"
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
