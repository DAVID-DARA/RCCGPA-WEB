import { groq } from "next-sanity";
import { hasSanityConfig, sanityClient } from "@/lib/sanity.client";
import type { BlogPost, EventItem, HomepageData, SiteSettings } from "@/types/cms";

const settingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    tagline,
    logoText,
    footerText,
    navLinks[]{label, href}
  }
`;

const homepageQuery = groq`
  {
    "settings": *[_type == "siteSettings"][0]{
      title,
      tagline,
      logoText,
      footerText,
      navLinks[]{label, href}
    },
    "hero": *[_type == "homepage"][0].hero{
      title,
      subtitle,
      primaryCta{label, href},
      secondaryCta{label, href},
      backgroundImage
    },
    "liveStream": *[_type == "homepage"][0].liveStream{
      title,
      description,
      youtubeUrl,
      cta{label, href}
    },
    "featuredVideo": *[_type == "homepage"][0].featuredVideo{
      title,
      description,
      youtubeUrl,
      cta{label, href}
    },
    "events": *[_type == "event"] | order(date asc)[0...3]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      date,
      location,
      coverImage
    },
    "posts": *[_type == "post"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage
    },
    "giveCta": *[_type == "homepage"][0].giveCta{
      title,
      description,
      cta{label, href}
    }
  }
`;

const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage
  }
`;

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    body
  }
`;

const eventsQuery = groq`
  *[_type == "event"] | order(date asc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    location,
    coverImage
  }
`;

const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    location,
    coverImage,
    body
  }
`;

const watchQuery = groq`
  *[_type == "watchPage"][0]{
    pageTitle,
    pageIntro,
    liveStream{title, description, youtubeUrl, cta{label, href}},
    featuredVideo{title, description, youtubeUrl, cta{label, href}}
  }
`;

const giveQuery = groq`
  *[_type == "givePage"][0]{
    pageTitle,
    intro,
    methods[]{
      title,
      description,
      cta{label, href}
    }
  }
`;

const visitQuery = groq`
  *[_type == "visitPage"][0]{
    pageTitle,
    intro,
    serviceTimes[]{
      day,
      time,
      description
    },
    address,
    mapLink
  }
`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!hasSanityConfig || !sanityClient) return null;
  return sanityClient.fetch(settingsQuery);
}

export async function getHomepageData(): Promise<HomepageData | null> {
  if (!hasSanityConfig || !sanityClient) return null;
  return sanityClient.fetch(homepageQuery);
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!hasSanityConfig || !sanityClient) return [];
  return sanityClient.fetch(postsQuery);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasSanityConfig || !sanityClient) return null;
  return sanityClient.fetch(postBySlugQuery, { slug });
}

export async function getEvents(): Promise<EventItem[]> {
  if (!hasSanityConfig || !sanityClient) return [];
  return sanityClient.fetch(eventsQuery);
}

export async function getEventBySlug(slug: string): Promise<(EventItem & { body?: unknown }) | null> {
  if (!hasSanityConfig || !sanityClient) return null;
  return sanityClient.fetch(eventBySlugQuery, { slug });
}

export async function getWatchPage() {
  if (!hasSanityConfig || !sanityClient) return null;
  return sanityClient.fetch(watchQuery);
}

export async function getGivePage() {
  if (!hasSanityConfig || !sanityClient) return null;
  return sanityClient.fetch(giveQuery);
}

export async function getVisitPage() {
  if (!hasSanityConfig || !sanityClient) return null;
  return sanityClient.fetch(visitQuery);
}
