"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { urlFor } from "@/lib/sanity.client";
import type { Cta, HeroContent, SanityImage } from "@/types/cms";

type HeroSectionProps = {
  hero: HeroContent;
};

type HeroSlideView = {
  key: string;
  title?: string;
  subtitle?: string;
  image?: SanityImage;
  imageUrl: string | null;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

type HeroSlideSource = {
  _key?: string;
  title?: string;
  subtitle?: string;
  image?: SanityImage;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const slides = useMemo<HeroSlideView[]>(() => {
    const cmsSlides = hero.slides?.filter((slide) => slide.image) || [];
    const sourceSlides: HeroSlideSource[] = cmsSlides.length
      ? cmsSlides
      : [
          {
            title: hero.title,
            subtitle: hero.subtitle,
            image: hero.backgroundImage,
            primaryCta: hero.primaryCta,
            secondaryCta: hero.secondaryCta
          }
        ];

    return sourceSlides.map((slide, index) => {
      const image = slide.image || (index === 0 ? hero.backgroundImage : undefined);

      return {
        key: slide._key || `${slide.title}-${index}`,
        title: slide.title,
        subtitle: slide.subtitle,
        image,
        imageUrl: image ? urlFor(image)?.width(1920).height(1080).fit("crop").url() || null : null,
        primaryCta: slide.primaryCta || (!cmsSlides.length ? hero.primaryCta : undefined),
        secondaryCta: slide.secondaryCta || hero.secondaryCta
      };
    });
  }, [hero]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex] || slides[0];
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 6500);

    return () => {
      window.clearInterval(interval);
    };
  }, [hasMultipleSlides, slides.length]);

  const showPreviousSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length);
  };

  const showNextSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  return (
    <section data-hero-section className="relative -mt-20 isolate min-h-screen overflow-hidden bg-[#111111] text-white">
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, index) =>
          slide.imageUrl ? (
            <Image
              key={slide.key}
              src={slide.imageUrl}
              alt={slide.image?.alt || slide.title || "Hero slide image"}
              fill
              priority={index === 0}
              sizes="100vw"
              className={clsx(
                "object-cover opacity-0 transition-opacity duration-1000",
                index === activeIndex ? "opacity-40" : "opacity-0"
              )}
            />
          ) : null
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/65 to-black/45" />
      <SectionWrapper className="flex min-h-screen items-center py-28 md:py-36">
        <div className="max-w-3xl space-y-8">
          {activeSlide.title || activeSlide.subtitle ? (
            <div className="space-y-6">
              {activeSlide.title ? <h1 className="text-4xl font-bold leading-tight md:text-6xl">{activeSlide.title}</h1> : null}
              {activeSlide.subtitle ? <p className="text-lg leading-relaxed text-white/85 md:text-xl">{activeSlide.subtitle}</p> : null}
            </div>
          ) : null}
          {activeSlide.primaryCta || activeSlide.secondaryCta ? (
            <div className="flex flex-wrap gap-4">
              {activeSlide.primaryCta ? <Button href={activeSlide.primaryCta.href}>{activeSlide.primaryCta.label}</Button> : null}
              {activeSlide.secondaryCta ? (
                <Button href={activeSlide.secondaryCta.href} variant="secondary">
                  {activeSlide.secondaryCta.label}
                </Button>
              ) : null}
            </div>
          ) : null}
          {hasMultipleSlides ? (
            <div className="flex items-center gap-4 pt-4">
              <button
                type="button"
                onClick={showPreviousSlide}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Show previous hero slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2" aria-label="Hero slides">
                {slides.map((slide, index) => (
                  <button
                    key={slide.key}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={clsx(
                      "h-2.5 rounded-full transition-all",
                      index === activeIndex ? "w-8 bg-[#D4AF37]" : "w-2.5 bg-white/55 hover:bg-white/80"
                    )}
                    aria-label={`Show hero slide ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={showNextSlide}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/45 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Show next hero slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
      </SectionWrapper>
    </section>
  );
}
