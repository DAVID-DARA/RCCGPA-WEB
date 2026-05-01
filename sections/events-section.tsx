import { EventCard } from "@/components/cards/event-card";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import type { EventItem } from "@/types/cms";

type EventsSectionProps = {
  events: EventItem[];
};

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <SectionWrapper className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">Upcoming Events</p>
          <h2 className="text-3xl font-bold text-[#111111] md:text-5xl">Join us this week</h2>
        </div>
        <Button href="/events" variant="ghost">
          View All Events
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </SectionWrapper>
  );
}
