import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { getGivePage } from "@/lib/queries";

const fallback = {
  pageTitle: "Give",
  intro: "Give cheerfully and support the work of ministry.",
  methods: [
    {
      title: "Online Transfer",
      description: "Use your bank app to transfer securely to designated church accounts.",
      cta: { label: "Get Account Details", href: "#" }
    }
  ]
};

export default async function GivePage() {
  const page = (await getGivePage()) || fallback;

  return (
    <SectionWrapper className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">Give</p>
        <h1 className="text-4xl font-bold text-[var(--color-secondary-strong)] md:text-6xl">{page.pageTitle}</h1>
        <p className="max-w-3xl text-lg text-[var(--color-muted)]">{page.intro}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {page.methods?.map((method: { title: string; description: string; cta?: { label: string; href: string } }) => (
          <article key={method.title} className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[var(--color-secondary-strong)]">{method.title}</h2>
            <p className="text-[var(--color-muted)]">{method.description}</p>
            {method.cta ? <Button href={method.cta.href}>{method.cta.label}</Button> : null}
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
