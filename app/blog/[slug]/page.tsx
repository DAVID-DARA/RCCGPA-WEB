import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableRichText } from "@/components/portable-rich-text";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getPostBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.client";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const imageUrl = post.coverImage ? urlFor(post.coverImage)?.width(1280).height(720).url() : null;

  return (
    <SectionWrapper className="max-w-4xl space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <h1 className="text-4xl font-bold text-[#111111] md:text-6xl">{post.title}</h1>
        <p className="text-lg leading-relaxed text-[#444444]">{post.excerpt}</p>
      </div>
      {imageUrl ? (
        <Image src={imageUrl} alt={post.coverImage?.alt || post.title} width={1280} height={720} className="rounded-2xl object-cover" />
      ) : null}
      <PortableRichText value={post.body} />
    </SectionWrapper>
  );
}
