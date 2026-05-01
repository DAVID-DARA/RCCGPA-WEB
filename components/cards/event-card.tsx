import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import type { EventItem } from "@/types/cms";

type EventCardProps = {
  event: EventItem;
};

export function EventCard({ event }: EventCardProps) {
  const imageUrl = event.coverImage ? urlFor(event.coverImage)?.width(960).height(560).url() : null;
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={event.coverImage?.alt || event.title}
          width={960}
          height={560}
          className="h-56 w-full object-cover"
        />
      )}
      <div className="space-y-4 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A57C00]">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <h3 className="text-2xl font-semibold leading-tight text-[#151515]">{event.title}</h3>
        {event.location ? <p className="text-sm text-[#383838]">{event.location}</p> : null}
        <p className="line-clamp-3 text-sm leading-relaxed text-[#505050]">{event.excerpt}</p>
        <Link className="text-sm font-semibold text-[#A57C00] hover:underline" href={`/events/${event.slug}`}>
          Register
        </Link>
      </div>
    </article>
  );
}
