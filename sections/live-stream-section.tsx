import { VideoEmbed } from "@/components/video-embed";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { VideoContent } from "@/types/cms";

type LiveStreamSectionProps = {
  data: VideoContent;
};

export function LiveStreamSection({ data }: LiveStreamSectionProps) {
  return (
    <SectionWrapper id="live-stream" className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">Live Now</p>
        <h2 className="text-3xl font-bold leading-tight text-[#111111] md:text-5xl">{data.title}</h2>
        {data.description ? <p className="text-base leading-relaxed text-[#444444]">{data.description}</p> : null}
        {data.cta ? <Button href={data.cta.href}>{data.cta.label}</Button> : null}
      </div>
      <VideoEmbed youtubeUrl={data.youtubeUrl} title={data.title} />
    </SectionWrapper>
  );
}
