import { VideoEmbed } from "@/components/video-embed";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { VideoContent } from "@/types/cms";

type FeaturedVideoSectionProps = {
  data: VideoContent;
};

export function FeaturedVideoSection({ data }: FeaturedVideoSectionProps) {
  return (
    <section className="bg-[#111111] text-white">
      <SectionWrapper className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Featured Sermon</p>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">{data.title}</h2>
          {data.description ? <p className="text-base leading-relaxed text-white/80">{data.description}</p> : null}
          {data.cta ? (
            <Button href={data.cta.href} variant="secondary">
              {data.cta.label}
            </Button>
          ) : null}
        </div>
        <VideoEmbed youtubeUrl={data.youtubeUrl} title={data.title} />
      </SectionWrapper>
    </section>
  );
}
