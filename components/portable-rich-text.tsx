import { PortableText } from "@portabletext/react";

type PortableRichTextProps = { value: unknown };

export function PortableRichText({ value }: PortableRichTextProps) {
  if (!value) return null;

  return (
    <div className="prose max-w-none prose-p:leading-relaxed prose-headings:text-[var(--color-secondary-strong)] prose-p:text-[var(--color-muted)]">
      <PortableText value={value as any} />
    </div>
  );
}
