import { ReactNode } from "react";
import clsx from "clsx";

type SectionWrapperProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return <section id={id} className={clsx("mx-auto w-full max-w-7xl px-4 py-20 md:px-8", className)}>{children}</section>;
}
