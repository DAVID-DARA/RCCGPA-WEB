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
    <section className="bg-[#D4AF37]">
      <SectionWrapper className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-[#111111] md:text-4xl">{title}</h2>
          <p className="max-w-3xl text-base leading-relaxed text-[#2A2A2A]">{description}</p>
        </div>
        <Button href={cta.href} variant="ghost" className="border border-[#111111] ring-0">
          {cta.label}
        </Button>
      </SectionWrapper>
    </section>
  );
}
