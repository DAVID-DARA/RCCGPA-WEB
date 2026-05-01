import { BlogCard } from "@/components/cards/blog-card";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getPosts } from "@/lib/queries";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <SectionWrapper className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">Blog</p>
        <h1 className="text-4xl font-bold text-[#111111] md:text-6xl">Insights and Encouragement</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </SectionWrapper>
  );
}
