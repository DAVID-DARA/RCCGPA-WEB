import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableRichText } from "@/components/portable-rich-text";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getEventBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity.client";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const imageUrl = event.coverImage ? urlFor(event.coverImage)?.width(1280).height(720).url() : null;

  return (
    <SectionWrapper className="max-w-4xl space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <h1 className="text-4xl font-bold text-[#111111] md:text-6xl">{event.title}</h1>
        {event.location ? <p className="text-lg text-[#444444]">{event.location}</p> : null}
      </div>
      {imageUrl ? (
        <Image src={imageUrl} alt={event.coverImage?.alt || event.title} width={1280} height={720} className="rounded-2xl object-cover" />
      ) : null}
      <p className="text-base leading-relaxed text-[#333333]">{event.excerpt}</p>
      <PortableRichText value={event.body} />
      <Button href="/events">Back to Events</Button>
    </SectionWrapper>
  );
}
