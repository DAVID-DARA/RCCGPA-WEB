import { BlogCard } from "@/components/cards/blog-card";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { BlogPost } from "@/types/cms";

type BlogPreviewSectionProps = {
  posts: BlogPost[];
};

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  return (
    <section className="bg-[#F8F8F8]">
      <SectionWrapper className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">Latest Articles</p>
            <h2 className="text-3xl font-bold text-[#111111] md:text-5xl">From our blog</h2>
          </div>
          <Button href="/blog" variant="ghost">
            Visit Blog
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
