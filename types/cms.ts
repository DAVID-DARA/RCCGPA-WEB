export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type SiteSettings = {
  title: string;
  tagline: string;
  logoText?: string;
  navLinks: Cta[];
  footerText: string;
};

export type HeroContent = {
  title: string;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  backgroundImage?: SanityImage;
};

export type VideoContent = {
  title: string;
  description?: string;
  youtubeUrl: string;
  cta?: Cta;
};

export type EventItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  location?: string;
  coverImage?: SanityImage;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: SanityImage;
  body?: unknown;
};

export type HomepageData = {
  settings: SiteSettings;
  hero: HeroContent;
  liveStream: VideoContent;
  featuredVideo: VideoContent;
  events: EventItem[];
  posts: BlogPost[];
  giveCta: {
    title: string;
    description: string;
    cta: Cta;
  };
};
