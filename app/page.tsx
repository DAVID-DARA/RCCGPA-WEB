import Link from "next/link";
import { BlogPreviewSection } from "@/sections/blog-preview-section";
import { CtaSection } from "@/sections/cta-section";
import { EventsSection } from "@/sections/events-section";
import { FeaturedVideoSection } from "@/sections/featured-video-section";
import { HeroSection } from "@/sections/hero-section";
import { LiveStreamSection } from "@/sections/live-stream-section";
import { getActiveCampaign, getHomepageData } from "@/lib/queries";

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
  const [sanityData, campaign] = await Promise.all([getHomepageData(), getActiveCampaign()]);
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
      <HeroSection hero={data.hero} campaign={campaign} />
      <section className="bg-[var(--color-paper)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[0.8fr_1.2fr] md:items-center md:px-8 md:py-20">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">Welcome to Peace Assembly</p>
            <h2 className="text-3xl font-bold leading-tight text-[var(--color-secondary-strong)] md:text-4xl">A place to grow in faith and find family.</h2>
            <p className="text-base leading-relaxed text-[var(--color-muted)]">Whether you are exploring faith or looking for a church community, there is a place for you here.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[{ title: "Plan a visit", text: "Service times, directions and what to expect.", href: "/visit", action: "Find your way" }, { title: "Watch with us", text: "Join a service or catch up on a message.", href: "/watch", action: "Explore messages" }, { title: "Connect", text: "See what is happening in our church family.", href: "/events", action: "See events" }].map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg">
                <h3 className="font-bold text-[var(--color-secondary-strong)]">{item.title}</h3>
                <p className="mt-2 min-h-14 text-sm leading-relaxed text-[var(--color-muted)]">{item.text}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)]">{item.action} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <LiveStreamSection data={data.liveStream} />
      <FeaturedVideoSection data={data.featuredVideo} />
      <EventsSection events={data.events} />
      <BlogPreviewSection posts={data.posts} />
      <CtaSection title={data.giveCta.title} description={data.giveCta.description} cta={data.giveCta.cta} />
    </>
  );
}
