import { BlogPreviewSection } from "@/sections/blog-preview-section";
import { CtaSection } from "@/sections/cta-section";
import { EventsSection } from "@/sections/events-section";
import { FeaturedVideoSection } from "@/sections/featured-video-section";
import { HeroSection } from "@/sections/hero-section";
import { LiveStreamSection } from "@/sections/live-stream-section";
import { getHomepageData } from "@/lib/queries";

const fallbackData = {
  settings: null,
  hero: {
    title: "Experience God. Find Family. Discover Purpose.",
    subtitle: "A worship experience where lives are transformed through prayer, the Word, and community.",
    primaryCta: { label: "Watch Sermons", href: "/watch" },
    secondaryCta: { label: "Visit This Sunday", href: "/visit" }
  },
  liveStream: {
    title: "Join Our Live Service",
    description: "Worship with us live from anywhere in the world.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cta: { label: "Watch Live", href: "/watch" }
  },
  featuredVideo: {
    title: "The Supernatural Principle of Change",
    description: "Catch up on this week's featured sermon and be blessed.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    cta: { label: "Watch Sermons", href: "/watch" }
  },
  events: [],
  posts: [],
  giveCta: {
    title: "Support the mission",
    description: "Your giving helps us reach more lives with the Gospel through worship, outreach, and discipleship.",
    cta: { label: "Give Now", href: "/give" }
  }
};

export default async function HomePage() {
  const sanityData = await getHomepageData();
  const data = {
    settings: sanityData?.settings ?? fallbackData.settings,
    hero: sanityData?.hero ?? fallbackData.hero,
    liveStream: sanityData?.liveStream ?? fallbackData.liveStream,
    featuredVideo: sanityData?.featuredVideo ?? fallbackData.featuredVideo,
    events: sanityData?.events ?? fallbackData.events,
    posts: sanityData?.posts ?? fallbackData.posts,
    giveCta: sanityData?.giveCta ?? fallbackData.giveCta
  };

  return (
    <>
      <HeroSection hero={data.hero} />
      <LiveStreamSection data={data.liveStream} />
      <FeaturedVideoSection data={data.featuredVideo} />
      <EventsSection events={data.events} />
      <BlogPreviewSection posts={data.posts} />
      <CtaSection title={data.giveCta.title} description={data.giveCta.description} cta={data.giveCta.cta} />
    </>
  );
}
