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
    <article className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] shadow-sm">
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <h3 className="text-2xl font-semibold leading-tight text-[var(--color-secondary-strong)]">{event.title}</h3>
        {event.location ? <p className="text-sm text-[var(--color-muted)]">{event.location}</p> : null}
        <p className="line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">{event.excerpt}</p>
        <Link className="text-sm font-semibold text-[var(--color-accent)] hover:underline" href={`/events/${event.slug}`}>
          Register
        </Link>
      </div>
    </article>
  );
}
