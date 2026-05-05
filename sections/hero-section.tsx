import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { urlFor } from "@/lib/sanity.client";
import type { HeroContent } from "@/types/cms";

type HeroSectionProps = {
  hero: HeroContent;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const bg = hero.backgroundImage ? urlFor(hero.backgroundImage)?.width(1920).height(1080).url() : null;

  return (
    <section data-hero-section className="relative -mt-20 isolate overflow-hidden bg-[#111111] text-white">
      {bg ? (
        <Image src={bg} alt={hero.backgroundImage?.alt || hero.title} fill priority className="-z-20 object-cover opacity-35" />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/65 to-black/45" />
      <SectionWrapper className="py-28 md:py-36">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">{hero.title}</h1>
          <p className="text-lg leading-relaxed text-white/85 md:text-xl">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            {hero.secondaryCta ? (
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
