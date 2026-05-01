import { EventCard } from "@/components/cards/event-card";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getEvents } from "@/lib/queries";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <SectionWrapper className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">Events</p>
        <h1 className="text-4xl font-bold text-[#111111] md:text-6xl">Upcoming Programs</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </SectionWrapper>
  );
}
