import { FeaturedVideoSection } from "@/sections/featured-video-section";
import { LiveStreamSection } from "@/sections/live-stream-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getWatchPage } from "@/lib/queries";

const fallback = {
  pageTitle: "Watch Online",
  pageIntro: "Join our services and sermons from anywhere.",
  liveStream: {
    title: "Live Service",
    description: "Tune in to our live broadcast.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cta: { label: "Watch Live", href: "#" }
  },
  featuredVideo: {
    title: "Featured Message",
    description: "Be blessed by this timely word.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cta: { label: "More Sermons", href: "/blog" }
  }
};

export default async function WatchPage() {
  const page = (await getWatchPage()) || fallback;

  return (
    <>
      <SectionWrapper className="space-y-4 pb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">Watch</p>
        <h1 className="text-4xl font-bold text-[#111111] md:text-6xl">{page.pageTitle}</h1>
        <p className="text-lg text-[#444444]">{page.pageIntro}</p>
      </SectionWrapper>
      <LiveStreamSection data={page.liveStream} />
      <FeaturedVideoSection data={page.featuredVideo} />
    </>
  );
}
