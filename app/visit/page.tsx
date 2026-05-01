import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getVisitPage } from "@/lib/queries";

const fallback = {
  pageTitle: "Visit Us",
  intro: "We would love to welcome you to worship with us.",
  serviceTimes: [
    { day: "Sunday", time: "8:00 AM", description: "Celebration Service" },
    { day: "Wednesday", time: "6:00 PM", description: "Bible Study" }
  ],
  address: "No. 1 Peace Assembly Way, Lagos, Nigeria",
  mapLink: "https://maps.google.com"
};

export default async function VisitPage() {
  const page = (await getVisitPage()) || fallback;

  return (
    <SectionWrapper className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A57C00]">Visit</p>
        <h1 className="text-4xl font-bold text-[#111111] md:text-6xl">{page.pageTitle}</h1>
        <p className="max-w-3xl text-lg text-[#444444]">{page.intro}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="space-y-5 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#111111]">Service Times</h2>
          {page.serviceTimes?.map((slot: { day: string; time: string; description: string }) => (
            <div key={`${slot.day}-${slot.time}`} className="border-b border-black/10 pb-4 last:border-b-0">
              <p className="font-semibold text-[#111111]">
                {slot.day} - {slot.time}
              </p>
              <p className="text-sm text-[#444444]">{slot.description}</p>
            </div>
          ))}
        </article>
        <article className="space-y-5 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#111111]">Address</h2>
          <p className="text-[#444444]">{page.address}</p>
          <Button href={page.mapLink || "https://maps.google.com"}>Open in Maps</Button>
        </article>
      </div>
    </SectionWrapper>
  );
}
