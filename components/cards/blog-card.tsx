import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import type { BlogPost } from "@/types/cms";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.coverImage ? urlFor(post.coverImage)?.width(960).height(560).url() : null;
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={post.coverImage?.alt || post.title}
          width={960}
          height={560}
          className="h-56 w-full object-cover"
        />
      )}
      <div className="space-y-4 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A57C00]">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <h3 className="text-2xl font-semibold leading-tight text-[#151515]">{post.title}</h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[#505050]">{post.excerpt}</p>
        <Link className="text-sm font-semibold text-[#A57C00] hover:underline" href={`/blog/${post.slug}`}>
          Read More
        </Link>
      </div>
    </article>
  );
}
