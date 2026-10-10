import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";

type CtaSectionProps = {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
};

export function CtaSection({ title, description, cta }: CtaSectionProps) {
  return (
    <section className="bg-[var(--color-primary)]">
      <SectionWrapper className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/85">{description}</p>
        </div>
        <Button href={cta.href} variant="secondary" className="border border-white/70">
          {cta.label}
        </Button>
      </SectionWrapper>
    </section>
  );
}
